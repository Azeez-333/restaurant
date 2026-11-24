import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnetic } from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export function AtmosphereSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !leftColRef.current || !rightColRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(leftColRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(rightColRef.current, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="atmosphere"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-amber-200/50 bg-gradient-to-b from-[#FBF3DF] via-[#FFFDF8] to-white py-12 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Magnetic strength={0.12} scale={1.01} className="block">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                  Atmosphere &amp; Craft
                </p>
                <h2 className="font-display mt-3 text-4xl font-semibold leading-tight text-[#141311] sm:text-5xl">
                  Warm Hospitality &amp; Live Tawa Heat
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#57524B]">
                  Designed for unhurried family dinners and quick weekday lunches alike. Watch flaky
                  porotas blister on the iron griddle while aromatic curry leaves crackle in coconut
                  oil.
                </p>
              </div>
            </Magnetic>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#E7E2D8] pt-6">
              <div>
                <p className="font-display text-3xl font-semibold text-amber-700">10</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[#7A736A]">
                  Kitchen Categories
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-amber-700">Fresh</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[#7A736A]">
                  Ground Pepper &amp; Masalas
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:col-span-7">
            <div ref={leftColRef} className="space-y-4 sm:space-y-6 will-change-transform">
              <Magnetic strength={0.16} scale={1.01} className="w-full">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-[#E7E2D8] shadow-md shadow-black/5">
                  <img
                    src="/images/hero-interior.jpg"
                    alt="CM Restaurant evening dining room"
                    loading="lazy"
                    className="h-full w-full origin-top-left scale-[1.22] object-cover"
                  />
                </div>
              </Magnetic>
              <Magnetic strength={0.2} scale={1.02} className="w-full">
                <div className="rounded-3xl border border-[#E7E2D8] bg-[#FAF8F5] p-5">
                  <p className="font-display text-xl font-semibold text-[#141311]">
                    Dine-In &amp; Takeaway
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#57524B]">
                    Hot parcel packing available across all biryanis, curries, and tawa mixes.
                  </p>
                </div>
              </Magnetic>
            </div>

            <div
              ref={rightColRef}
              className="space-y-4 sm:mt-12 sm:space-y-6 will-change-transform"
            >
              <Magnetic strength={0.16} scale={1.01} className="w-full">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-[#E7E2D8] shadow-md shadow-black/5">
                  <img
                    src="/images/atmosphere-kitchen.jpg"
                    alt="Chef tossing Kuthu Porota on seasoned iron tawa"
                    loading="lazy"
                    className="h-full w-full origin-top-left scale-[1.22] object-cover"
                  />
                </div>
              </Magnetic>
              <Magnetic strength={0.16} scale={1.01} className="w-full">
                <div className="aspect-[4/4] overflow-hidden rounded-3xl border border-[#E7E2D8] shadow-md shadow-black/5">
                  <img
                    src="/images/signature-porota-curry.jpg"
                    alt="Kerala Porota and Pepper Chicken Masala"
                    loading="lazy"
                    className="h-full w-full origin-top-left scale-[1.22] object-cover"
                  />
                </div>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
