import { withCache, TTL } from "./cache";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.rdc-dev.com.br/api";
const BANNERS_API_URL = `${API_BASE}/banners`;

export type Banner = {
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

type BannersResponse = {
  data: Banner[];
  count: number;
};

export type HeroSlide = {
  id: string | number;
  image: string;
  imageAlt?: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  highlight?: string;
};

export async function fetchBanners(section: string): Promise<HeroSlide[]> {
  return withCache(
    `banners:${section}`,
    () => _fetchBanners(section),
    TTL.LONG,
  );
}

async function _fetchBanners(section: string): Promise<HeroSlide[]> {
  try {
    const res = await fetch(`${BANNERS_API_URL}?page=1&limit=10`, {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error(`Banners API error: ${res.status}`);
    }

    const json: BannersResponse = await res.json();
    const filtered = (json.data ?? [])
      .filter((b) => b.section === section && b.isActive === true)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    if (filtered.length === 0) {
      return [];
    }

    return filtered.map((b) => ({
      id: b.id,
      image: b.imageUrl,
      imageAlt: b.imageAlt ?? undefined,
      title: b.title,
      subtitle: b.subtitle ?? "",
      cta: b.ctaLabel ?? "Saiba mais",
      ctaLink: b.ctaLink ?? "#",
      highlight: b.highlight ?? undefined,
    }));
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchBanners]", err);
    }
    return [];
  }
}
