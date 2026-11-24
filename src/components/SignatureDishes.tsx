import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SIGNATURE_DISHES } from '../data/menuData';
import { Magnetic } from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.signature-row');

      cards.forEach((row) => {
        const media = row.querySelector<HTMLElement>('.signature-media');
        const texts = row.querySelectorAll<HTMLElement>('.signature-text');

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: 'inset(10% 0% 10% 0%)', scale: 1.05, opacity: 0.45 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
                once: true,
              },
            }
          );
        }

        if (texts.length > 0) {
          gsap.fromTo(
            texts,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signatures"
      ref={sectionRef}
      className="relative border-t border-amber-200/50 bg-gradient-to-b from-white via-[#FFFDF7] to-[#FCF6E6] py-12 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Magnetic strength={0.12} scale={1.01} className="block max-w-2xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
              House Signatures
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-[#141311] sm:mt-3 sm:text-5xl">
              Dishes Guests Come Back For
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#57524B] sm:mt-4 sm:text-base">
              Slow-cooked biryanis, blistered Kerala porotas, and freshly crushed black pepper
              masalas straight from the CM Restaurant kitchen.
            </p>
          </div>
        </Magnetic>

        <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-16">
          {SIGNATURE_DISHES.map((dish, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={dish.id}
                className="signature-row grid items-center gap-6 lg:grid-cols-12 lg:gap-14"
              >
                <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <Magnetic strength={0.14} scale={1.01} className="w-full">
                    <div className="signature-media group relative aspect-[16/11] overflow-hidden rounded-3xl border border-[#E7E2D8] bg-[#F5F3EF] shadow-lg shadow-black/5">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        className="h-full w-full origin-top-left scale-[1.22] object-cover transition-transform duration-700 group-hover:scale-[1.26]"
                      />
                      <span className="absolute top-4 left-4 rounded-full border border-[#E7E2D8] bg-white/90 px-3.5 py-1 text-xs font-semibold tracking-wide text-amber-800 shadow-sm backdrop-blur-sm">
                        {dish.badge}
                      </span>
                    </div>
                  </Magnetic>
                </div>

                <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <p className="signature-text text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                    {dish.category}
                  </p>
                  <h3 className="signature-text font-display mt-3 text-3xl font-semibold text-[#141311] sm:text-4xl">
                    {dish.name}
                  </h3>
                  <p className="signature-text mt-4 text-base leading-relaxed text-[#57524B]">
                    {dish.description}
                  </p>
                  <div className="signature-text mt-6 flex items-center gap-6 border-t border-[#E7E2D8] pt-5">
                    <div>
                      <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A736A]">
                        Menu Price
                      </span>
                      <span className="font-display text-2xl font-semibold text-amber-700">
                        {dish.price}
                      </span>
                    </div>
                    <Magnetic strength={0.38} className="ml-auto">
                      <a
                        href="#menu"
                        className="inline-block rounded-full border border-[#D8D2C7] bg-[#FAF8F5] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#141311] transition-colors hover:border-amber-700 hover:bg-amber-700 hover:text-white"
                      >
                        See Full Menu
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
