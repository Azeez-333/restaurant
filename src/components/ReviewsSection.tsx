import { Quote } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface ReviewItem {
  name: string;
  initials: string;
  role: string;
  quote: string;
}

const TOP_REVIEWS: ReviewItem[] = [
  {
    name: 'Ananya Rao',
    initials: 'AR',
    role: 'Regular Guest, Bengaluru',
    quote:
      '“The Kaada Biryani and crispy Kerala Porota are unreal. Everything arrives piping hot from the tawa with freshly ground black pepper—easily my favourite dinner spot.”',
  },
  {
    name: 'Vikramaditya Nair',
    initials: 'VN',
    role: 'Product Designer, Kochi',
    quote:
      '“Ordered Chicken Kuthu Porota and Pepper Chicken curry for the whole team. Rich roasted masala, generous portions, and zero artificial heaviness.”',
  },
  {
    name: 'Aarav Mehta',
    initials: 'AM',
    role: 'Food Enthusiast, Mumbai',
    quote:
      '“The 15% Monthly Plan is genius—not a rigid mess, I just eat whatever I crave from the menu all month and pay 15% less at the start of next month.”',
  },
  {
    name: 'Farhan Siddiqui',
    initials: 'FS',
    role: 'Software Engineer',
    quote:
      '“Afternoon Boil Rice Meals and Egg Roast taste just like home cooking. Clean dining hall, fast parcel packing, and super fair prices.”',
  },
];

const BOTTOM_REVIEWS: ReviewItem[] = [
  {
    name: 'Siddharth Sen',
    initials: 'SS',
    role: 'Sound Designer, Kolkata',
    quote:
      '“Butter Chicken with flaky Wheat Porota and Garlic Chicken dry are our weekend staples. The spice balance and tenderness never miss.”',
  },
  {
    name: 'Arjun Krishnan',
    initials: 'AK',
    role: 'Filmmaker, Chennai',
    quote:
      '“Every time friends visit, we order Puttu Chicken Mix, Appam, and Kadai Paneer. Freshly made on the spot and consistently delicious.”',
  },
  {
    name: 'Tanvi Deshmukh',
    initials: 'TD',
    role: 'Brand Consultant, Hyderabad',
    quote:
      '“Love how transparent CM Restaurant is—great vegetarian options like Paneer Butter Masala and Gobi Manchurian alongside classic Kerala specials.”',
  },
  {
    name: 'Meera Joshi',
    initials: 'MJ',
    role: 'Interior Stylist',
    quote:
      '“Warm lighting, clean tables, and welcoming staff. Whether dine-in or takeaway, the quality and aroma stay top-notch every single time.”',
  },
];

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="mx-2.5 w-[300px] shrink-0 rounded-2xl border border-[#E7E2D8] bg-white/95 p-5 shadow-sm sm:mx-3 sm:w-[360px] sm:p-6">
      <Quote className="h-5 w-5 text-amber-700/70" />
      <p className="mt-3 text-xs leading-relaxed text-[#3E3A35] sm:text-sm">
        {review.quote}
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-[#F0ECE4] pt-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#141311] text-xs font-bold tracking-wider text-amber-300">
          {review.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#141311]">{review.name}</p>
          <p className="truncate text-xs text-[#7A736A]">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-t border-amber-200/50 bg-transparent py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Magnetic strength={0.12} scale={1.01} className="block max-w-2xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
              Guest Love
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-[#141311] sm:text-5xl">
              What Our Diners Say
            </h2>
            <p className="mt-2 text-sm text-[#57524B] sm:text-base">
              Real stories from daily regulars, families, and 15% Monthly Plan members.
            </p>
          </div>
        </Magnetic>
      </div>

      {/* Top Row: Scrolls Left */}
      <div className="marquee-wrapper mt-9 overflow-hidden">
        <div className="animate-marquee-left">
          {[...TOP_REVIEWS, ...TOP_REVIEWS].map((review, idx) => (
            <ReviewCard key={`top-${idx}-${review.name}`} review={review} />
          ))}
        </div>
      </div>

      {/* Bottom Row: Scrolls Right */}
      <div className="marquee-wrapper mt-5 overflow-hidden">
        <div className="animate-marquee-right">
          {[...BOTTOM_REVIEWS, ...BOTTOM_REVIEWS].map((review, idx) => (
            <ReviewCard key={`bot-${idx}-${review.name}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

