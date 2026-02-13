import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import DiscoverSection from "@/components/DiscoverSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import PokerSection from "@/components/PokerSection";
import GastronomySection from "@/components/GastronomySection";
import ShowsSection from "@/components/ShowsSection";
import { CtaSection } from "@/components/CtaSections";
import AccordionSection from "@/components/AccordionSection";
import Footer from "@/components/Footer";
import AppDownload from "@/components/AppDownloadButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-mc-bg pb-20">
      <Header />
      <HeroCarousel />
      <DiscoverSection />
      <ExperiencesSection />
      <PokerSection />
      <GastronomySection />
      <ShowsSection />
      <CtaSection />
      <AccordionSection />
      <AppDownload />
      <Footer />
    </main>
  );
}
