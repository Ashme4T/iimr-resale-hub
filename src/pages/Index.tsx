import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/hero-section";
import { DonationCarousel } from "@/components/donation-carousel";
import { FeaturedItems } from "@/components/featured-items";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <DonationCarousel />
        <FeaturedItems />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
