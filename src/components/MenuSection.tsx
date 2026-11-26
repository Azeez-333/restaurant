import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, ShoppingBag, X } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { TiltCard } from './TiltCard';

interface TopPickDish {
  name: string;
  priceLabel: string;
  image: string;
  delayClass: string;
  featured?: boolean;
}

const TOP_PICKS: TopPickDish[] = [
  {
    name: 'Chicken Biryani',
    priceLabel: '₹160',
    image: '/images/dishes/chicken-biryani.jpg',
    delayClass: 'animate-float-slow',
    featured: true,
  },
  {
    name: 'Chicken Tikka',
    priceLabel: "Chef's Special",
    image: '/images/dishes/chicken-tikka.png',
    delayClass: 'animate-float-delayed',
  },
  {
    name: 'Butter Chicken',
    priceLabel: '₹140 / ₹240',
    image: '/images/dishes/butter-chicken.jpg',
    delayClass: 'animate-float-slow',
    featured: true,
  },
  {
    name: 'Vegetable Fried Rice',
    priceLabel: '₹90',
    image: '/images/dishes/veg-fried-rice.jpg',
    delayClass: 'animate-float-delayed',
  },
  {
    name: 'Spring Rolls',
    priceLabel: "Chef's Special",
    image: '/images/dishes/spring-rolls.jpg',
    delayClass: 'animate-float-slow',
  },
  {
    name: 'Chicken 65',
    priceLabel: "Chef's Special",
    image: '/images/dishes/chicken-65.png',
    delayClass: 'animate-float-delayed',
  },
  {
    name: 'Butter Naan',
    priceLabel: "Chef's Special",
    image: '/images/dishes/butter-naan.jpg',
    delayClass: 'animate-float-slow',
  },
  {
    name: 'Chicken Hakka Noodles',
    priceLabel: "Chef's Special",
    image: '/images/dishes/hakka-noodles.jpg',
    delayClass: 'animate-float-delayed',
  },
  {
    name: 'Dal Curry',
    priceLabel: '₹60',
    image: '/images/dishes/dal-curry.png',
    delayClass: 'animate-float-slow',
  },
  {
    name: 'Paneer Tikka',
    priceLabel: "Chef's Special",
    image: '/images/dishes/paneer-tikka.jpg',
    delayClass: 'animate-float-delayed',
  },
];

export function MenuSection() {
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (name: string) => {
    setLiked((prev) => ({ ...prev, [name]: !prev[name] }));
  };

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
                Our Top Picks &amp; Specials
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-[#141311] sm:text-5xl">
                Our Top Picks &amp; Kitchen Menu
              </h2>
              <p className="mt-2 text-sm text-[#57524B] sm:text-base">
                Signature plates and guest favourites —{' '}
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
              <BookOpen className="h-3.5 w-3.5 text-amber-700 transition-colors group-hover:text-white" />
              <span>Menu</span>
            </button>
          </Magnetic>
        </div>

        {/* Top Picks & Specials Cards (Individual Cropped Plates + Price + Bag Action) */}
        <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {TOP_PICKS.map((dish, idx) => {
            const isLiked = Boolean(liked[dish.name]);
            return (
              <Magnetic key={dish.name} strength={0.18} scale={1.02} className="w-full">
                <TiltCard className="rounded-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.32) }}
                    className="group relative flex flex-col justify-between rounded-3xl border border-amber-200/50 bg-[#F9F8F5]/95 p-3.5 shadow-xs transition-shadow duration-300 hover:bg-white hover:shadow-lg sm:p-4"
                  >
                    {/* Top Row: Heart Favorite */}
                    <div className="flex items-center justify-between">
                      {dish.featured ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                          Top Pick
                        </span>
                      ) : (
                        <span />
                      )}
                      <button
                        type="button"
                        onClick={() => toggleLike(dish.name)}
                        aria-label={`Favorite ${dish.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[#4A4640] transition-colors hover:bg-amber-50 hover:text-rose-600"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            isLiked ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Dish Photo */}
                    <div className="my-2 flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl sm:h-32">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        className="h-full w-full origin-top scale-[1.08] object-cover transition-transform duration-500 group-hover:scale-[1.12]"
                      />
                    </div>

                    {/* Bottom Row: Dish Name, Menu Price & Bag Icon */}
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-[#141311] transition-colors group-hover:text-amber-700 sm:text-[15px]">
                          {dish.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-xs font-bold text-[#141311] sm:text-sm">
                          {dish.priceLabel}
                        </p>
                      </div>

                      <a
                        href="#contact"
                        aria-label={`Order ${dish.name}`}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                          dish.featured
                            ? 'bg-[#141311] text-white hover:bg-amber-700'
                            : 'border border-[#E2DDD3] bg-white text-[#141311] hover:bg-[#141311] hover:text-white'
                        }`}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.div>
                </TiltCard>
              </Magnetic>
            );
          })}
        </div>
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
