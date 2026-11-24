import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Magnetic } from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !mediaRef.current || !contentRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 12,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        yPercent: -10,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#FAF9F6] pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-12">
        <div ref={contentRef} className="relative z-10 lg:col-span-6 will-change-transform">
          <Magnetic strength={0.28}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              Welcome to CM Restaurant
            </motion.div>
          </Magnetic>

          <Magnetic strength={0.14} scale={1.01} className="block">
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-semibold leading-[1.03] tracking-tight text-[#141311] sm:text-6xl xl:text-7xl"
            >
              Hand-Flaked Porota,
              <span className="block italic text-amber-700">Smoky Tawa &amp; Spice</span>
            </motion.h1>
          </Magnetic>

          <Magnetic strength={0.12} scale={1.01} className="block">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#57524B] sm:text-lg"
            >
              From slow-steamed Kaada Biryani and crispy Kuthu Porota tossed on seasoned iron, to
              homestyle rice meals and pepper-roasted curries — crafted fresh every day at CM
              Restaurant.
            </motion.p>
          </Magnetic>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.42}>
              <a
                href="#walkthrough"
                className="inline-block rounded-full bg-[#141311] px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-md transition-colors hover:bg-amber-700"
              >
                Step Inside the Dining Room
              </a>
            </Magnetic>
            <Magnetic strength={0.42}>
              <a
                href="#menu"
                className="inline-block rounded-full border border-[#D8D2C7] bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-[#141311] transition-colors hover:border-amber-700 hover:text-amber-700"
              >
                Browse Full Menu
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <Magnetic strength={0.14} scale={1.01} className="w-full">
            <div
              ref={mediaRef}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#E7E2D8] bg-[#F2EFE9] shadow-2xl shadow-black/10 will-change-transform"
            >
              <img
                src="/images/hero-interior.jpg"
                alt="Dining room at CM Restaurant"
                decoding="async"
                className="h-full w-full origin-top-left scale-[1.22] object-cover object-center transition-transform duration-700 group-hover:scale-[1.26]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/30 bg-white/90 px-5 py-3.5 backdrop-blur-md">
                <div>
                  <p className="font-display text-lg font-semibold text-[#141311]">CM Restaurant</p>
                  <p className="text-xs text-[#57524B]">Dine-In &amp; Hot Takeaway Parcels</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  10 Categories
                </span>
              </div>
            </div>
          </Magnetic>
        </motion.div>
      </div>

      <Magnetic strength={0.35} className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <motion.a
          href="#walkthrough"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="flex flex-col items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6E675E] transition-colors hover:text-amber-700"
        >
          <span>Scroll to Explore</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DED8CE] bg-white shadow-sm"
          >
            <ArrowDown className="h-4 w-4 text-amber-700" />
          </motion.span>
        </motion.a>
      </Magnetic>
    </section>
  );
}
