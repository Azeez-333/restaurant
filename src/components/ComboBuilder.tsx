import { useState } from 'react';
import { Minus, Plus, RotateCcw, Sparkles } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface ComboItem {
  id: string;
  name: string;
  price: number;
}

const COMBO_ITEMS: ComboItem[] = [
  { id: 'kerala-porota', name: 'Kerala Porota', price: 18 },
  { id: 'appam', name: 'Appam', price: 15 },
  { id: 'pepper-chicken', name: 'Pepper Chicken (Half)', price: 140 },
  { id: 'chicken-biryani', name: 'Chicken Biryani', price: 160 },
  { id: 'kaada-biryani', name: 'Kaada Biryani', price: 210 },
  { id: 'kuthu-porota', name: 'Chicken Kuthu Porota', price: 120 },
  { id: 'egg-roast', name: 'Egg Roast', price: 70 },
  { id: 'paneer-butter', name: 'Paneer Butter Masala', price: 130 },
];

export function ComboBuilder() {
  const [counts, setCounts] = useState<Record<string, number>>({
    'kerala-porota': 2,
    'pepper-chicken': 1,
  });

  const updateCount = (id: string, delta: number) => {
    setCounts((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: next };
    });
  };

  const total = COMBO_ITEMS.reduce(
    (sum, item) => sum + item.price * (counts[item.id] || 0),
    0
  );
  const discounted = Math.round(total * 0.85);

  return (
    <div className="mt-8 rounded-2xl border border-amber-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-xs sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            <Sparkles className="h-3.5 w-3.5" />
            Quick Tawa Combo Estimator
          </div>
          <p className="mt-1 text-xs text-[#57524B] sm:text-sm">
            Tap items from our menu to preview a meal total &amp; your 15% Monthly Plan rate.
          </p>
        </div>

        <Magnetic strength={0.3}>
          <button
            type="button"
            onClick={() => setCounts({})}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E2DDD3] bg-[#FAF8F5] px-3.5 py-1.5 text-xs font-medium text-[#4A4640] transition-colors hover:border-amber-700 hover:text-amber-700"
          >
            <RotateCcw className="h-3 w-3" />
            Clear
          </button>
        </Magnetic>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {COMBO_ITEMS.map((item) => {
          const qty = counts[item.id] || 0;
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                qty > 0
                  ? 'border-amber-600/40 bg-amber-50/50'
                  : 'border-[#EFECE6] bg-white'
              }`}
            >
              <div className="min-w-0 pr-2">
                <p className="truncate text-xs font-semibold text-[#141311] sm:text-sm">
                  {item.name}
                </p>
                <p className="font-mono text-xs text-amber-700">₹{item.price}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => updateCount(item.id, -1)}
                  disabled={qty === 0}
                  aria-label={`Remove ${item.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E2DDD3] bg-white text-[#141311] transition-colors hover:border-amber-700 disabled:opacity-35"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center font-mono text-xs font-semibold text-[#141311]">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => updateCount(item.id, 1)}
                  aria-label={`Add ${item.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#141311] text-white transition-colors hover:bg-amber-700"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#EFECE6] pt-4">
        <div className="flex items-baseline gap-6">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-[#7A736A]">
              Regular Total
            </span>
            <span className="font-mono text-lg font-semibold text-[#141311]">
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              With 15% Monthly Plan
            </span>
            <span className="font-display text-2xl font-bold text-amber-700">
              ₹{discounted.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        <span className="text-[11px] font-medium text-[#7A736A]">
          Parcel charges extra on takeaway
        </span>
      </div>
    </div>
  );
}

