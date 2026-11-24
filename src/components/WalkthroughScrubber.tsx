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

export function WalkthroughScrubber() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const [isReady, setIsReady] = useState(false);
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
    const container = containerRef.current;
    const pinEl = pinRef.current;
    if (!video || !container || !pinEl || reducedMotion) return;

    let duration = 0;
    let targetTime = 0;
    let currentTime = 0;
    let rafId: number | null = null;
    let trigger: ScrollTrigger | null = null;
    let isSeeking = false;
    let lastSeekAt = 0;
    let activeIdx = 0;

    // Throttled rAF seek (~30fps max) prevents H.264 decoder backlog & scroll lag
    const renderFrame = (now: number) => {
      if (duration > 0) {
        const diff = targetTime - currentTime;
        if (Math.abs(diff) > 0.008) {
          currentTime += diff * 0.24;
          const clamped = Math.max(0, Math.min(duration - 0.02, currentTime));
          if (
            !isSeeking &&
            now - lastSeekAt >= 33 &&
            Math.abs(video.currentTime - clamped) > 0.02
          ) {
            isSeeking = true;
            lastSeekAt = now;
            video.currentTime = clamped;
          }
        }
      }
      rafId = window.requestAnimationFrame(renderFrame);
    };

    const handleSeeked = () => {
      isSeeking = false;
    };

    const setupScrollTrigger = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      duration = video.duration;
      video.pause();
      setIsReady(true);

      trigger?.kill();
      trigger = ScrollTrigger.create({
        trigger: container,
        pin: pinEl,
        start: 'top top',
        end: () => (window.innerWidth < 768 ? '+=1200' : '+=2000'),
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          targetTime = p * Math.max(0, duration - 0.02);

          // Direct DOM updates avoid React re-renders on every scroll tick
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

    const handleLoadedMetadata = () => setupScrollTrigger();
    const handleError = () => setHasError(true);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);

    if (video.readyState >= 1) {
      setupScrollTrigger();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
      trigger?.kill();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [reducedMotion]);

  const activeStage = WALKTHROUGH_STAGES[stageIndex] ?? WALKTHROUGH_STAGES[0];

  return (
    <section
      id="walkthrough"
      ref={containerRef}
      className="relative border-t border-[#E7E2D8] bg-white text-[#141311]"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#F5F3EF]"
      >
        {!hasError ? (
          <video
            ref={videoRef}
            src="/videos/walkthrough.mp4"
            muted
            playsInline
            preload="auto"
            controls={reducedMotion}
            className="h-full w-full origin-top-left scale-[1.14] object-cover object-center will-change-transform"
          />
        ) : (
          <img
            src="/images/hero-interior.jpg"
            alt="CM Restaurant interior fallback"
            className="h-full w-full origin-top-left scale-[1.22] object-cover object-center"
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        <div className="pointer-events-none absolute top-16 left-0 right-0 z-10 mx-auto flex max-w-7xl items-center justify-between px-4 sm:top-20 sm:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E7E2D8] bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-800 shadow-sm backdrop-blur-md sm:px-4 sm:py-1.5 sm:text-[11px]">
            <Compass className="h-3.5 w-3.5 text-amber-700" />
            CM Restaurant Walkthrough
          </div>
          {!reducedMotion && (
            <div className="hidden items-center gap-2 rounded-full border border-[#E7E2D8] bg-white/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A4640] shadow-sm backdrop-blur-md sm:inline-flex">
              <Film className="h-3.5 w-3.5 text-amber-700" />
              {isReady ? 'Scroll to Move Through Space' : 'Buffering Walkthrough...'}
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 mx-auto max-w-7xl px-4 sm:bottom-14 sm:px-10">
          <div className="max-w-xl rounded-2xl border border-[#E7E2D8] bg-white/92 p-4 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-300 sm:p-8">
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
              <div className="mt-5">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A736A]">
                  <span>Walkthrough Progress</span>
                  <span ref={progressTextRef} className="font-mono text-[#141311]">
                    0%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E7E2D8]">
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
