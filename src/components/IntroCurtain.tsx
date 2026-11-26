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
    }, 1450);

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
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* CM Logo & Brand Above */}
            <div className="mb-3 flex items-center gap-3">
              <CmLogo size="lg" className="h-14 w-14 p-1.5 shadow-md shadow-amber-900/10" />
              <div className="text-left">
                <p className="font-display text-3xl font-semibold tracking-wide text-[#141311] sm:text-4xl">
                  CM Restaurant
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-700">
                  Food and Snacks
                </p>
              </div>
            </div>

            {/* Larger Animated Frying Pan Below Logo */}
            <motion.img
              src="/images/loading-pan.png"
              alt="Cooking pan animation"
              animate={{
                rotate: [0, -7, 3, -5, 0],
                y: [0, -10, 0, -6, 0],
              }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-40 w-auto object-contain sm:h-52"
            />

            <div className="mt-4 h-0.5 w-48 overflow-hidden rounded-full bg-amber-100">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
