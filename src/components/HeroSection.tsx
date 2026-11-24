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
        yPercent: 10,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        yPercent: -8,
        opacity: 0.25,
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
      className="relative flex flex-col justify-center overflow-hidden bg-transparent pt-24 pb-10 sm:pt-28 sm:pb-14 lg:min-h-[100svh]"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:gap-12 sm:px-8 lg:grid-cols-12">
        <div ref={contentRef} className="relative z-10 lg:col-span-6 will-change-transform">
          <Magnetic strength={0.28}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-amber-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-800 sm:mb-6 sm:px-4 sm:py-1.5 sm:text-xs"
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
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#141311] sm:text-6xl xl:text-7xl"
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
              className="mt-4 max-w-xl text-sm leading-relaxed text-[#57524B] sm:mt-6 sm:text-lg"
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
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
          >
            <Magnetic strength={0.42}>
              <a
                href="#walkthrough"
                className="inline-block rounded-full bg-[#141311] px-5 py-3 text-xs font-semibold tracking-wide text-white shadow-md transition-colors hover:bg-amber-700 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Step Inside the Dining Room
              </a>
            </Magnetic>
            <Magnetic strength={0.42}>
              <a
                href="#menu"
                className="inline-block rounded-full border border-[#D8D2C7] bg-white px-5 py-3 text-xs font-semibold tracking-wide text-[#141311] transition-colors hover:border-amber-700 hover:text-amber-700 sm:px-7 sm:py-3.5 sm:text-sm"
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
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E7E2D8] bg-[#F2EFE9] shadow-xl shadow-black/10 will-change-transform sm:rounded-3xl sm:shadow-2xl"
            >
              <img
                src="/images/hero-interior.jpg"
                alt="Dining room at CM Restaurant"
                decoding="async"
                className="h-full w-full origin-top-left scale-[1.22] object-cover object-center transition-transform duration-700 group-hover:scale-[1.26]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-xl border border-white/30 bg-white/90 px-3.5 py-2.5 backdrop-blur-md sm:right-5 sm:bottom-5 sm:left-5 sm:rounded-2xl sm:px-5 sm:py-3.5">
                <div>
                  <p className="font-display text-base font-semibold text-[#141311] sm:text-lg">
                    CM Restaurant
                  </p>
                  <p className="text-[11px] text-[#57524B] sm:text-xs">
                    Dine-In &amp; Hot Takeaway Parcels
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800 sm:px-3 sm:text-xs">
                  10 Categories
                </span>
              </div>
            </div>
          </Magnetic>
        </motion.div>
      </div>

      <div className="mt-8 flex justify-center lg:absolute lg:bottom-6 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2">
        <Magnetic strength={0.35}>
          <motion.a
            href="#walkthrough"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="flex flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6E675E] transition-colors hover:text-amber-700 sm:text-[11px]"
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
      </div>
    </section>
  );
}
