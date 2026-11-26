import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CmLogo } from './CmLogo';

export function IntroCurtain() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 950);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white px-6 text-center"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <CmLogo size="lg" className="shadow-lg shadow-amber-900/10" />
            <p className="font-display mt-4 text-3xl font-semibold tracking-wide text-[#141311] sm:text-4xl">
              CM Restaurant
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-700">
              Kitchen &amp; Grill
            </p>
            <div className="mt-6 h-0.5 w-36 overflow-hidden rounded-full bg-amber-200/70">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

