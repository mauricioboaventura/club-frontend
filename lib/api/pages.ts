import type { HeroSlide } from "./banners";

const PAGES_API_URL = "https://api.rdc-dev.com.br/api/pages/home";

export type HeroBanner = {
  id: string;
  section: string;
  imageUrl: string;
  imageAlt: string | null;
  highlight: string | null;
  title: string;
  subtitle: string | null;
  ctaLabel: string | null;
  ctaLink: string | null;
  sortOrder: number;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
};

export type FeatureCard = {
  id: string;
  pageSlug: string;
  sectionSlug: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string | null;
  linkHref: string;
  sortOrder: number;
  isActive: boolean;
};

export type TextBlock = {
  id: string;
  pageSlug: string;
  sectionSlug: string;
  title: string;
  content: string;
  imageUrl: string | null;
  imageAlt: string | null;
  sortOrder: number;
  isActive: boolean;
};

type HeroBannersResponse = {
  data: HeroBanner[];
  count: number;
};

type FeatureCardsResponse = {
  data: FeatureCard[];
  count: number;
};

type TextBlocksResponse = {
  data: TextBlock[];
  count: number;
};

export type HomePageData = {
  heroBanners: HeroSlide[];
  featureCards: FeatureCard[];
  textBlocks: TextBlock[];
};

function mapHeroBannerToSlide(b: HeroBanner): HeroSlide {
  return {
    id: b.id,
    image: b.imageUrl,
    imageAlt: b.imageAlt ?? undefined,
    title: b.title,
    subtitle: b.subtitle ?? "",
    cta: b.ctaLabel ?? "Saiba mais",
    ctaLink: b.ctaLink ?? "#",
    highlight: b.highlight ?? undefined,
  };
}

export async function fetchHomePage(): Promise<HomePageData> {
  try {
    const res = await fetch(PAGES_API_URL, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Pages API error: ${res.status}`);
    }

    const json = await res.json();

    const heroRaw: HeroBannersResponse = json.heroBanners ?? { data: [], count: 0 };
    const featureRaw: FeatureCardsResponse = json.featureCards ?? { data: [], count: 0 };
    const textRaw: TextBlocksResponse = json.textBlocks ?? { data: [], count: 0 };

    const heroBanners = (heroRaw.data ?? [])
      .filter((b) => b.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(mapHeroBannerToSlide);

    const featureCards = (featureRaw.data ?? [])
      .filter((c) => c.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const textBlocks = (textRaw.data ?? [])
      .filter((t) => t.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      heroBanners,
      featureCards,
      textBlocks,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchHomePage]", err);
    }
    return {
      heroBanners: [],
      featureCards: [],
      textBlocks: [],
    };
  }
}
