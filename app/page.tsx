import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import DiscoverSection from "@/components/DiscoverSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import PokerSection from "@/components/PokerSection";
import GastronomySection from "@/components/GastronomySection";
import ShowsSection from "@/components/ShowsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-mc-bg">
      <Header />
      <HeroCarousel />
      <DiscoverSection />
      <ExperiencesSection />
      <PokerSection />
      <GastronomySection />
      <ShowsSection />
    </main>
  );
}
