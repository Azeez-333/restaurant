import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { TiltCard } from './TiltCard';
import { ComboBuilder } from './ComboBuilder';

const FOOD_HIGHLIGHTS = [
  {
    title: 'Main Course & Kaada',
    subtitle: 'Chicken Biryani, Kaada Biryani, Ghee Rice & Fried Rice',
    image: '/images/signature-biryani.jpg',
  },
  {
    title: 'Curries & Indian Breads',
    subtitle: 'Pepper Chicken, Butter Chicken, Kerala Porota & Appam',
    image: '/images/signature-porota-curry.jpg',
  },
  {
    title: 'Tawa Mixes & Veg / Egg',
    subtitle: 'Kuthu Porota, Puttu Mix, Egg Roast & Paneer Curries',
    image: '/images/signature-veg-egg.jpg',
  },
];

export function MenuSection() {
  const [showBoardModal, setShowBoardModal] = useState(false);

  return (
    <section
      id="menu"
      className="relative border-t border-amber-200/50 bg-transparent py-12 sm:py-18"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <Magnetic strength={0.12} scale={1.01} className="block max-w-2xl">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                CM Restaurant Menu
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-[#141311] sm:text-5xl">
                Our Complete Kitchen Menu
              </h2>
              <p className="mt-2 text-sm text-[#57524B] sm:text-base">
                Every biryani, tawa mix, curry, fry, and hand-flaked bread —{' '}
                <span className="font-medium text-amber-800">parcel charges extra.</span>
              </p>
            </div>
          </Magnetic>

          <Magnetic strength={0.38}>
            <button
              type="button"
              onClick={() => setShowBoardModal(true)}
              className="group inline-flex items-center gap-2 self-start rounded-full border border-[#D8D2C7] bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#141311] shadow-xs transition-all hover:border-amber-700 hover:bg-amber-700 hover:text-white lg:self-auto"
            >
              <Maximize2 className="h-3.5 w-3.5 text-amber-700 transition-colors group-hover:text-white" />
              <span>Zoom Menu Board</span>
            </button>
          </Magnetic>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-3">
          {FOOD_HIGHLIGHTS.map((item, idx) => (
            <Magnetic key={item.title} strength={0.18} scale={1.01} className="w-full">
              <TiltCard className="rounded-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="group overflow-hidden rounded-2xl border border-amber-200/60 bg-white shadow-xs transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full origin-top-left scale-[1.22] object-cover transition-transform duration-700 group-hover:scale-[1.26]"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-xl font-semibold text-[#141311] transition-colors group-hover:text-amber-700">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#57524B]">{item.subtitle}</p>
                  </div>
                </motion.div>
              </TiltCard>
            </Magnetic>
          ))}
        </div>

        <div className="mt-7">
          <Magnetic strength={0.08} scale={1.005} className="w-full">
            <div
              onClick={() => setShowBoardModal(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setShowBoardModal(true);
              }}
              aria-label="Open full size CM Restaurant menu board"
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E7E2D8] bg-[#141311] p-2 shadow-lg shadow-black/10 sm:p-3"
            >
              <img
                src="/images/menu-board.jpg"
                alt="CM Restaurant complete menu board"
                className="w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.005]"
              />
              <div className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#141311] shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:right-5 sm:bottom-5 sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-xs">
                <Maximize2 className="h-3 w-3 text-amber-700 sm:h-3.5 sm:w-3.5" />
                <span>Tap to Zoom Menu</span>
              </div>
            </div>
          </Magnetic>
        </div>

        <ComboBuilder />
      </div>

      <AnimatePresence>
        {showBoardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBoardModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-[#141311] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowBoardModal(false)}
                aria-label="Close menu board photo"
                className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#141311] shadow hover:bg-amber-700 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src="/images/menu-board.jpg"
                alt="CM Restaurant complete menu board"
                className="max-h-[90vh] w-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
