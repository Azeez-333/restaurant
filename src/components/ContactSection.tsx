import { Clock, MapPin, Phone, ShoppingBag } from 'lucide-react';
import { Magnetic } from './Magnetic';

export function ContactSection() {
  return (
    <footer
      id="contact"
      className="border-t border-[#E7E2D8] bg-[#F6F4EF] pt-16 pb-10 text-[#141311]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Magnetic strength={0.12} scale={1.01} className="block">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                  Visit &amp; Takeaway
                </p>
                <h2 className="font-display mt-3 text-4xl font-semibold text-[#141311]">
                  Come Hungry, Leave Happy.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#57524B]">
                  Whether you&apos;re stopping by CM Restaurant for afternoon rice meals or picking up
                  a hot parcel of Kaada Biryani and Kerala Porota for dinner, our tawa is always ready.
                </p>
              </div>
            </Magnetic>
            <Magnetic strength={0.25} className="mt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/25 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-800">
                <ShoppingBag className="h-3.5 w-3.5" />
                Parcel Charges Extra on Takeaway Orders
              </div>
            </Magnetic>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-7">
            <Magnetic strength={0.18} scale={1.02} className="w-full">
              <div className="h-full rounded-2xl border border-[#E7E2D8] bg-white p-6 shadow-xs">
                <Clock className="h-5 w-5 text-amber-700" />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#141311]">
                  Kitchen Hours
                </h3>
                <p className="mt-2 text-sm text-[#57524B]">
                  Lunch &amp; Meals
                  <br />
                  Dinner &amp; Tawa Specials
                </p>
                <p className="mt-2 text-xs text-[#7A736A]">Open Daily</p>
              </div>
            </Magnetic>

            <Magnetic strength={0.18} scale={1.02} className="w-full">
              <div className="h-full rounded-2xl border border-[#E7E2D8] bg-white p-6 shadow-xs">
                <MapPin className="h-5 w-5 text-amber-700" />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#141311]">
                  Location
                </h3>
                <p className="mt-2 text-sm text-[#57524B]">
                  Add your CM Restaurant street address &amp; Google Maps link here.
                </p>
              </div>
            </Magnetic>

            <Magnetic strength={0.18} scale={1.02} className="w-full">
              <div className="h-full rounded-2xl border border-[#E7E2D8] bg-white p-6 shadow-xs">
                <Phone className="h-5 w-5 text-amber-700" />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#141311]">
                  Direct Orders
                </h3>
                <p className="mt-2 text-sm text-[#57524B]">
                  Add your phone number for table &amp; parcel enquiries.
                </p>
                <Magnetic strength={0.35} className="mt-4">
                  <a
                    href="#menu"
                    className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-700 hover:underline"
                  >
                    View Menu &rarr;
                  </a>
                </Magnetic>
              </div>
            </Magnetic>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#E7E2D8] pt-8 text-xs text-[#7A736A] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} CM Restaurant. All rights reserved.</p>
          <Magnetic strength={0.35}>
            <a href="#hero" className="inline-block transition-colors hover:text-amber-700">
              Back to Top &uarr;
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
