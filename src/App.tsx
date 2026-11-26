import { IntroCurtain } from './components/IntroCurtain';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WalkthroughScrubber } from './components/WalkthroughScrubber';
import { SignatureDishes } from './components/SignatureDishes';
import { MenuSection } from './components/MenuSection';
import { MonthlySchemeSection } from './components/MonthlySchemeSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AtmosphereSection } from './components/AtmosphereSection';
import { ContactSection } from './components/ContactSection';

export function App() {
  return (
    <div className="relative min-h-screen text-[#141311]">
      {/* GPU-composited static white-to-gold background layer (zero scroll repaint) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 12% 10%, rgba(245, 196, 81, 0.18) 0%, transparent 42%), radial-gradient(circle at 88% 28%, rgba(217, 155, 38, 0.14) 0%, transparent 45%), radial-gradient(circle at 18% 68%, rgba(245, 196, 81, 0.16) 0%, transparent 48%), radial-gradient(circle at 85% 92%, rgba(217, 155, 38, 0.2) 0%, transparent 45%), linear-gradient(180deg, #ffffff 0%, #fffcf3 35%, #fdf4dc 70%, #faf0d2 100%)',
        }}
      />
      <IntroCurtain />
      <Navbar />
      <main>
        <HeroSection />
        <WalkthroughScrubber />
        <SignatureDishes />
        <MenuSection />
        <MonthlySchemeSection />
        <ReviewsSection />
        <AtmosphereSection />
      </main>
      <ContactSection />
    </div>
  );
}

export default App;
