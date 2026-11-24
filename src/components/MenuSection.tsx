import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { ComboBuilder } from './ComboBuilder';

const FLOATING_GROUPS = [
  {
    id: 'group-1',
    image: '/images/dishes-group-1.jpg',
    alt: 'Chicken Biryani, Chicken Tikka, Butter Chicken, Vegetable Fried Rice, and Spring Rolls',
    recipes: [
      'Chicken Biryani',
      'Chicken Tikka',
      'Butter Chicken',
      'Vegetable Fried Rice',
      'Spring Rolls',
    ],
    floatClass: 'animate-float-slow',
  },
  {
    id: 'group-2',
    image: '/images/dishes-group-2.jpg',
    alt: 'Chicken 65, Butter Naan, Chicken Hakka Noodles, Dal Curry, and Paneer Tikka',
    recipes: [
      'Chicken 65',
      'Butter Naan',
      'Chicken Hakka Noodles',
      'Dal Curry',
      'Paneer Tikka',
    ],
    floatClass: 'animate-float-delayed',
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

        {/* Floating Isolated Recipes Showcase */}
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
          {FLOATING_GROUPS.map((group) => (
            <div key={group.id} className="flex flex-col items-center">
              <Magnetic strength={0.16} scale={1.02} className="w-full">
                <div className={`${group.floatClass} w-full`}>
                  <img
                    src={group.image}
                    alt={group.alt}
                    loading="lazy"
                    className="mx-auto w-full max-w-xl object-contain mix-blend-multiply drop-shadow-xl"
                  />
                </div>
              </Magnetic>

              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {group.recipes.map((recipe) => (
                  <Magnetic key={recipe} strength={0.28}>
                    <span className="inline-block rounded-full border border-amber-300/60 bg-white/85 px-3.5 py-1 text-xs font-semibold text-[#141311] shadow-xs backdrop-blur-xs transition-colors hover:border-amber-700 hover:text-amber-700">
                      {recipe}
                    </span>
                  </Magnetic>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9">
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
