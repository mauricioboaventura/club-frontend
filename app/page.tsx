import HeroCarousel from "@/components/HeroCarousel";
import DiscoverSection from "@/components/DiscoverSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import PokerSection from "@/components/PokerSection";
import GastronomySection from "@/components/GastronomySection";
import ShowsSection from "@/components/ShowsSection";
import TextBlocksSection from "@/components/TextBlocksSection";
import { fetchHomePage } from "@/lib/api/pages";

export default async function Home() {
  const { heroBanners, featureCards, textBlocks } = await fetchHomePage();

  return (
    <main className="min-h-screen bg-[#fcfaf6] mt-[56px]">
      <HeroCarousel initialSlides={heroBanners} />
      <DiscoverSection />
      <ExperiencesSection featureCards={featureCards} />
      {textBlocks.length > 0 && <TextBlocksSection textBlocks={textBlocks} />}
      <PokerSection />
      <GastronomySection />
      <ShowsSection />
    </main>
  );
}
