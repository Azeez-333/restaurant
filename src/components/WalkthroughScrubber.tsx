import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WalkthroughStage {
  range: [number, number];
  eyebrow: string;
  title: string;
  caption: string;
}

const WALKTHROUGH_STAGES: WalkthroughStage[] = [
  {
    range: [0, 0.34],
    eyebrow: '01 · Arrival',
    title: 'Step Into CM Restaurant',
    caption: 'Clean modern dining space with warm lighting and an unhurried neighbourhood welcome.',
  },
  {
    range: [0.34, 0.68],
    eyebrow: '02 · Dining Hall',
    title: 'Crafted for Gathering',
    caption: 'Comfortable tables built for sharing steaming biryani pots, curries, and flaky porota.',
  },
  {
    range: [0.68, 1.01],
    eyebrow: '03 · The Kitchen Line',
    title: 'Where Spice Meets Iron',
    caption: 'Freshly ground black pepper, curry leaves, and live tawa heat right before your plate.',
  },
];

const TARGET_FRAMES = 72;

export function WalkthroughScrubber() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [framesCached, setFramesCached] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const pinEl = pinRef.current;
    if (!video || !canvas || !container || !pinEl || reducedMotion) return;

    let cancelled = false;
    let duration = 0;
    let targetProgress = 0;
    let smoothProgress = 0;
    let rafId: number | null = null;
    let trigger: ScrollTrigger | null = null;
    let isSeeking = false;
    let lastSeekAt = 0;
    let activeIdx = 0;
    let lastDrawnFrame = -1;

    const bitmaps: ImageBitmap[] = [];

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = pinEl.clientWidth;
      const h = pinEl.clientHeight;
      if (w > 0 && h > 0) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        lastDrawnFrame = -1;
      }
    };

    const drawCoverCrop = (source: ImageBitmap | HTMLVideoElement, srcW: number, srcH: number) => {
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx || srcW === 0 || srcH === 0) return;

      // Crop bottom-right 12% to remove corner watermark while keeping full quality
      const sw = srcW / 1.12;
      const sh = srcH / 1.12;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / sw, ch / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.drawImage(source, 0, 0, sw, sh, dx, dy, dw, dh);
    };

    // Pre-extract crisp frames in the background so mobile & desktop scrub at 60fps
    const extractFramesInBackground = async () => {
      if (!video.duration || Number.isNaN(video.duration)) return;

      const extractor = document.createElement('video');
      extractor.src = video.currentSrc || '/videos/walkthrough.mp4';
      extractor.muted = true;
      extractor.playsInline = true;
      extractor.preload = 'auto';

      await new Promise<void>((resolve) => {
        if (extractor.readyState >= 2) {
          resolve();
          return;
        }
        const onReady = () => {
          extractor.removeEventListener('loadeddata', onReady);
          resolve();
        };
        extractor.addEventListener('loadeddata', onReady);
        extractor.load();
      });

      if (cancelled || !extractor.videoWidth) return;

      const vw = extractor.videoWidth;
      const vh = extractor.videoHeight;
      const step = Math.max(0.01, (extractor.duration - 0.04) / (TARGET_FRAMES - 1));

      for (let i = 0; i < TARGET_FRAMES; i++) {
        if (cancelled) break;
        const t = Math.min(extractor.duration - 0.02, i * step);

        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            extractor.removeEventListener('seeked', onSeeked);
            resolve();
          };
          extractor.addEventListener('seeked', onSeeked);
          extractor.currentTime = t;
        });

        if (cancelled) break;
        try {
          const bmp = await createImageBitmap(extractor, 0, 0, vw, vh);
          bitmaps.push(bmp);
          if (i === 0 && canvas.width > 0) {
            drawCoverCrop(bmp, vw, vh);
          }
        } catch {
          break;
        }
      }

      extractor.src = '';
      if (!cancelled && bitmaps.length >= 20) {
        setFramesCached(true);
      }
    };

    const renderFrame = (now: number) => {
      smoothProgress += (targetProgress - smoothProgress) * 0.22;

      if (bitmaps.length >= 20) {
        const frameIdx = Math.min(
          bitmaps.length - 1,
          Math.max(0, Math.round(smoothProgress * (bitmaps.length - 1)))
        );
        if (frameIdx !== lastDrawnFrame && bitmaps[frameIdx]) {
          lastDrawnFrame = frameIdx;
          drawCoverCrop(bitmaps[frameIdx], bitmaps[frameIdx].width, bitmaps[frameIdx].height);
        }
      } else if (duration > 0) {
        const targetTime = smoothProgress * Math.max(0, duration - 0.02);
        if (
          !isSeeking &&
          now - lastSeekAt >= 36 &&
          Math.abs(video.currentTime - targetTime) > 0.025
        ) {
          isSeeking = true;
          lastSeekAt = now;
          video.currentTime = targetTime;
        }
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (bitmaps.length < 20 && video.videoWidth) {
        drawCoverCrop(video, video.videoWidth, video.videoHeight);
      }
    };

    const setupScrollTrigger = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      duration = video.duration;
      video.pause();
      sizeCanvas();
      if (video.videoWidth) {
        drawCoverCrop(video, video.videoWidth, video.videoHeight);
      }
      setIsReady(true);
      void extractFramesInBackground();

      trigger?.kill();
      trigger = ScrollTrigger.create({
        trigger: container,
        pin: pinEl,
        start: 'top top',
        end: () => (window.innerWidth < 768 ? '+=1300' : '+=2000'),
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          targetProgress = p;

          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.min(100, Math.max(2, p * 100))}%`;
          }
          if (progressTextRef.current) {
            progressTextRef.current.textContent = `${Math.round(p * 100)}%`;
          }

          const nextIdx = WALKTHROUGH_STAGES.findIndex(
            (stage) => p >= stage.range[0] && p < stage.range[1]
          );
          if (nextIdx !== -1 && nextIdx !== activeIdx) {
            activeIdx = nextIdx;
            setStageIndex(nextIdx);
          }
        },
      });

      if (rafId === null) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    const handleLoadedData = () => setupScrollTrigger();
    const handleError = () => setHasError(true);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);
    window.addEventListener('resize', sizeCanvas);

    if (video.readyState >= 2) {
      setupScrollTrigger();
    }

    return () => {
      cancelled = true;
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
      window.removeEventListener('resize', sizeCanvas);
      trigger?.kill();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      for (const bmp of bitmaps) {
        bmp.close();
      }
    };
  }, [reducedMotion]);

  const activeStage = WALKTHROUGH_STAGES[stageIndex] ?? WALKTHROUGH_STAGES[0];

  return (
    <section
      id="walkthrough"
      ref={containerRef}
      className="relative border-t border-amber-200/50 bg-[#FFFDF7] text-[#141311]"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100dvh] min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#FBF3DF]"
      >
        {!hasError ? (
          <>
            <video
              ref={videoRef}
              src="/videos/walkthrough.mp4"
              muted
              playsInline
              preload="auto"
              controls={reducedMotion}
              className={
                reducedMotion
                  ? 'absolute inset-0 h-full w-full origin-top-left scale-[1.12] object-cover object-center'
                  : 'pointer-events-none absolute h-px w-px opacity-0'
              }
            />
            {!reducedMotion && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full block"
              />
            )}
          </>
        ) : (
          <img
            src="/images/hero-interior.jpg"
            alt="CM Restaurant interior fallback"
            className="absolute inset-0 h-full w-full origin-top-left scale-[1.22] object-cover object-center"
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        <div className="pointer-events-none absolute top-16 left-0 right-0 z-10 mx-auto flex max-w-7xl items-center justify-between px-4 sm:top-20 sm:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-800 shadow-sm backdrop-blur-md sm:px-4 sm:py-1.5 sm:text-[11px]">
            <Compass className="h-3.5 w-3.5 text-amber-700" />
            CM Restaurant Walkthrough
          </div>
          {!reducedMotion && (
            <div className="hidden items-center gap-2 rounded-full border border-amber-200/80 bg-white/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A4640] shadow-sm backdrop-blur-md sm:inline-flex">
              <Film className="h-3.5 w-3.5 text-amber-700" />
              {framesCached
                ? 'Scroll to Move Through Space'
                : isReady
                  ? 'Optimizing Frames...'
                  : 'Loading Walkthrough...'}
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 mx-auto max-w-7xl px-4 sm:bottom-14 sm:px-10">
          <div className="max-w-xl rounded-2xl border border-amber-200/70 bg-gradient-to-br from-white/95 to-[#FFF9EB]/95 p-4 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-300 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 sm:text-xs">
              {activeStage.eyebrow}
            </p>
            <h2 className="font-display mt-1 text-2xl font-semibold text-[#141311] sm:mt-1.5 sm:text-4xl">
              {activeStage.title}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-[#57524B] sm:mt-2 sm:text-base">
              {activeStage.caption}
            </p>

            {!reducedMotion && (
              <div className="mt-4 sm:mt-5">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A736A]">
                  <span>Walkthrough Progress</span>
                  <span ref={progressTextRef} className="font-mono text-[#141311]">
                    0%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-amber-100">
                  <div
                    ref={progressBarRef}
                    className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-500"
                    style={{ width: '2%' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
