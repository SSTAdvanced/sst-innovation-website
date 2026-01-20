import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import FeaturesSection from "@/sections/FeaturesSection";
import PlatformsSection from "@/sections/PlatformsSection";
import PricingSection from "@/sections/PricingSection";
import PortfolioSection from "@/sections/PortfolioSection";
import FaqSection from "@/sections/FaqSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PlatformsSection />
        <PricingSection />
        <PortfolioSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
