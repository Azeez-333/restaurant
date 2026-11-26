import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { CmLogo } from './CmLogo';

const NAV_LINKS = [
  { label: 'Walkthrough', href: '#walkthrough' },
  { label: 'Signatures', href: '#signatures' },
  { label: 'Menu', href: '#menu' },
  { label: '15% Plan', href: '#monthly-scheme' },
  { label: 'Visit', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScroll = () => {
      rafId = null;
      const y = window.scrollY;
      setScrolled(y > 24);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (y / maxScroll) * 100)) : 0;
      if (progressRef.current) {
        progressRef.current.style.width = `${pct}%`;
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`relative mx-auto flex max-w-6xl items-center justify-between overflow-hidden rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled
            ? 'border-amber-200/80 bg-white/92 shadow-lg shadow-amber-900/[0.06] backdrop-blur-xl'
            : 'border-amber-200/60 bg-white/80 shadow-md shadow-amber-900/[0.04] backdrop-blur-md'
        }`}
      >
        <Magnetic strength={0.32}>
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-[#141311] focus:outline-none"
          >
            <CmLogo
              size="sm"
              className="transition-colors duration-300 group-hover:bg-amber-700 group-hover:text-white"
            />
            <span className="font-display text-lg font-bold tracking-wide text-[#141311] transition-colors group-hover:text-amber-700 sm:text-xl">
              CM Restaurant
            </span>
          </a>
        </Magnetic>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.href} strength={0.4}>
              <a
                href={link.href}
                className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[#4A4640] transition-colors hover:bg-amber-50 hover:text-amber-700"
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </nav>

        <div className="hidden md:block">
          <Magnetic strength={0.42}>
            <a
              href="#menu"
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#141311] px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-amber-700"
            >
              <span>Explore Menu</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2DDD3] bg-[#FAF8F5] text-[#141311] md:hidden"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        {/* Golden Scroll Progress Thread */}
        <div
          ref={progressRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700"
          style={{ width: '0%' }}
        />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-amber-200/70 bg-white/95 p-5 shadow-xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 text-base font-medium text-[#141311] transition-colors hover:bg-amber-50 hover:text-amber-700"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#menu"
                onClick={() => setMobileOpen(false)}
                className="mt-1 rounded-full bg-[#141311] px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white"
              >
                Explore Menu
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
