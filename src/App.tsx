import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WalkthroughScrubber } from './components/WalkthroughScrubber';
import { SignatureDishes } from './components/SignatureDishes';
import { MenuSection } from './components/MenuSection';
import { MonthlySchemeSection } from './components/MonthlySchemeSection';
import { AtmosphereSection } from './components/AtmosphereSection';
import { ContactSection } from './components/ContactSection';

export function App() {
  return (
    <div className="min-h-screen bg-white text-[#141311]">
      <Navbar />
      <main>
        <HeroSection />
        <WalkthroughScrubber />
        <SignatureDishes />
        <MenuSection />
        <MonthlySchemeSection />
        <AtmosphereSection />
      </main>
      <ContactSection />
    </div>
  );
}

export default App;
