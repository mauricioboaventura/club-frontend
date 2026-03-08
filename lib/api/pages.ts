import type { HeroSlide } from "./banners";
import type { Restaurant } from "./restaurants";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.rdc-dev.com.br/api";

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

export type FeaturedEvent = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  location: string | null;
  isActive: boolean;
  isFeatured: boolean;
  event_images?: { id: string; imageUrl: string; imageAlt: string | null }[];
};

export type CtaSection = {
  id: string;
  pageSlug: string;
  title: string;
  ctaLabel: string | null;
  ctaLink: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type AccordionItem = {
  id: string;
  pageSlug: string;
  sectionSlug: string | null;
  title: string;
  content: string;
  sortOrder: number;
  isActive: boolean;
};

export type EventCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconUrl: string | null;
  color: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type EventItem = {
  id: string;
  categoryId: string | null;
  title: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  coverImageUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  location: string | null;
  priceInfo: string | null;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[] | null;
  event_images?: { id: string; imageUrl: string; imageAlt: string | null }[];
  event_categories?: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
    description?: string | null;
  } | null;
};

type PaginatedResponse<T> = {
  data: T[];
  count: number;
};

export type HomePageData = {
  heroBanners: HeroSlide[];
  featureCards: FeatureCard[];
  textBlocks: TextBlock[];
  featuredEvents: FeaturedEvent[];
  ctaSections: CtaSection[];
  accordionItems: AccordionItem[];
  restaurants: Restaurant[];
};

export type EventosPageData = {
  heroBanners: HeroSlide[];
  events: EventItem[];
  featuredEvents: FeaturedEvent[];
  eventCategories: EventCategory[];
  ctaSections: CtaSection[];
  accordionItems: AccordionItem[];
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
    const res = await fetch(`${API_BASE}/pages/home`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Pages API error: ${res.status}`);
    }

    const json = await res.json();

    const heroRaw: PaginatedResponse<HeroBanner> = json.heroBanners ?? { data: [], count: 0 };
    const featureRaw: PaginatedResponse<FeatureCard> = json.featureCards ?? { data: [], count: 0 };
    const textRaw: PaginatedResponse<TextBlock> = json.textBlocks ?? { data: [], count: 0 };
    const ctaRaw: PaginatedResponse<CtaSection> = json.ctaSections ?? { data: [], count: 0 };
    const accordionRaw: PaginatedResponse<AccordionItem> = json.accordionItems ?? { data: [], count: 0 };

    // featuredEvents vem como array direto (não paginado)
    const featuredEvents: FeaturedEvent[] = json.featuredEvents ?? [];

    const restaurants: Restaurant[] = (json.restaurants ?? []).filter(
      (r: Restaurant) => r.isActive === true,
    );

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

    const ctaSections = (ctaRaw.data ?? [])
      .filter((c) => c.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const accordionItems = (accordionRaw.data ?? [])
      .filter((a) => a.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder);

      
    return {
      heroBanners,
      featureCards,
      textBlocks,
      featuredEvents,
      ctaSections,
      accordionItems,
      restaurants,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[fetchHomePage]", err);
    }
    return {
      heroBanners: [],
      featureCards: [],
      textBlocks: [],
      featuredEvents: [],
      ctaSections: [],
      accordionItems: [],
      restaurants: [],
    };
  }
}

export async function fetchEventosPage(): Promise<EventosPageData> {
  try {
    const res = await fetch(`${API_BASE}/pages/eventos`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Pages API error: ${res.status}`);
    }

    const json = await res.json();

    const heroRaw: PaginatedResponse<HeroBanner> = json.heroBanners ?? { data: [], count: 0 };
    const eventsRaw: PaginatedResponse<EventItem> = json.events ?? { data: [], count: 0 };
    const categoriesRaw: PaginatedResponse<EventCategory> = json.eventCategories ?? {
      data: [],
      count: 0,
    };
    const ctaRaw: PaginatedResponse<CtaSection> = json.ctaSections ?? { data: [], count: 0 };
    const accordionRaw: PaginatedResponse<AccordionItem> = json.accordionItems ?? { data: [], count: 0 };
    const featuredEvents: FeaturedEvent[] = json.featuredEvents ?? [];

    const heroBanners = (heroRaw.data ?? [])
      .filter((b) => b.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(mapHeroBannerToSlide);

    const events = (eventsRaw.data ?? []).filter((e) => e.isActive === true);

    const eventCategories = (categoriesRaw.data ?? [])
      .filter((c) => c.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const ctaSections = (ctaRaw.data ?? [])
      .filter((c) => c.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const accordionItems = (accordionRaw.data ?? [])
      .filter((a) => a.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      heroBanners,
      events,
      featuredEvents,
      eventCategories,
      ctaSections,
      accordionItems,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[fetchEventosPage]", err);
    }
    return {
      heroBanners: [],
      events: [],
      featuredEvents: [],
      eventCategories: [],
      ctaSections: [],
      accordionItems: [],
    };
  }
}

export async function fetchEventById(id: string): Promise<EventItem | null> {
  try {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      next: { revalidate: 60 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Event API error: ${res.status}`);
    }

    const json = (await res.json()) as EventItem;
    if (!json?.id) {
      return null;
    }

    return json;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[fetchEventById]", err);
    }
    return null;
  }
}
