import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Percent, ShieldCheck, Utensils } from 'lucide-react';
import { Magnetic } from './Magnetic';

const STEPS = [
  {
    step: '01',
    icon: ShieldCheck,
    title: 'Security Advance',
    description:
      'Deposit a refundable security advance at CM Restaurant to open your monthly dining tab.',
  },
  {
    step: '02',
    icon: Utensils,
    title: 'Eat What You Like',
    description:
      'Not a fixed mess — order anything you want from the full menu all month, and only what you eat is noted.',
  },
  {
    step: '03',
    icon: CalendarCheck,
    title: 'Pay Next Month + 15% Off',
    description:
      'At the start of the next month, pay only for what you actually ate with a flat 15% discount.',
  },
];

export function MonthlySchemeSection() {
  const [monthlySpend, setMonthlySpend] = useState(4000);
  const discount = Math.round(monthlySpend * 0.15);
  const finalPayable = monthlySpend - discount;

  return (
    <section
      id="monthly-scheme"
      className="relative border-t border-amber-200/50 bg-transparent py-12 sm:py-18"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-amber-700/20 bg-gradient-to-br from-[#FAF8F4] via-white to-amber-50/50 p-5 shadow-sm sm:rounded-3xl sm:p-9">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Magnetic strength={0.25}>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/25 bg-amber-100/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">
                  <Percent className="h-3.5 w-3.5 text-amber-700" />
                  Monthly Dining Scheme · 15% Off
                </div>
              </Magnetic>

              <h2 className="font-display mt-3.5 text-3xl font-semibold text-[#141311] sm:text-4xl">
                Pay Only for What You Eat, With{' '}
                <span className="italic text-amber-700">15% Off Next Month</span>
              </h2>

              <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#57524B] sm:text-base">
                Not a fixed mess plan — simply place a <strong>security advance</strong>, order
                freely from our regular menu all month, pay only for what you ate at the start of
                the next month, and receive a <strong>15% discount</strong> after the month.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {STEPS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Magnetic key={item.step} strength={0.2} scale={1.02} className="w-full">
                      <div className="group h-full rounded-2xl border border-[#E7E2D8] bg-white p-4 shadow-xs transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-700 group-hover:text-white">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#9A9185]">
                            {item.step}
                          </span>
                        </div>
                        <h3 className="mt-3 text-sm font-semibold text-[#141311] transition-colors group-hover:text-amber-700">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[#57524B]">
                          {item.description}
                        </p>
                      </div>
                    </Magnetic>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5"
            >
              <Magnetic strength={0.1} scale={1.01} className="w-full">
                <div className="rounded-2xl border border-[#E2DDD3] bg-white p-6 shadow-md shadow-black/[0.04]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                      15% Savings Estimator
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      Not a Fixed Mess
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-baseline justify-between">
                      <label
                        htmlFor="monthly-spend"
                        className="text-sm font-medium text-[#4A4640]"
                      >
                        Total Eaten This Month
                      </label>
                      <span className="font-mono text-lg font-bold text-[#141311]">
                        ₹{monthlySpend.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input
                      id="monthly-spend"
                      type="range"
                      min={1500}
                      max={12000}
                      step={250}
                      value={monthlySpend}
                      onChange={(e) => setMonthlySpend(Number(e.target.value))}
                      className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E7E2D8] accent-amber-700"
                    />
                    <div className="mt-1 flex justify-between font-mono text-[11px] text-[#8A8278]">
                      <span>₹1,500</span>
                      <span>₹12,000</span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5 border-t border-[#E7E2D8] pt-4 text-sm">
                    <div className="flex justify-between text-[#57524B]">
                      <span>15% End-of-Month Discount</span>
                      <span className="font-mono font-semibold text-emerald-700">
                        - ₹{discount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-dashed border-[#E7E2D8] pt-2.5">
                      <span className="font-semibold text-[#141311]">Payable Next Month Start</span>
                      <span className="font-display text-3xl font-bold text-amber-700">
                        ₹{finalPayable.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <Magnetic strength={0.35} className="mt-5 w-full">
                    <a
                      href="#contact"
                      className="block w-full rounded-full bg-[#141311] py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-amber-700"
                    >
                      Ask at Counter to Join
                    </a>
                  </Magnetic>
                </div>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
