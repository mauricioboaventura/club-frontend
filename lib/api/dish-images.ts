import { withCache, TTL } from "./cache";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.rdc-dev.com.br/api";

export type ExecutiveMenu = {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  isActive: boolean;
  startsAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
};

export function fetchExecutiveMenus(): Promise<ExecutiveMenu[]> {
  return withCache("executive-menus:list", _fetchExecutiveMenus, TTL.DEFAULT);
}

async function _fetchExecutiveMenus(): Promise<ExecutiveMenu[]> {
  try {
    const res = await fetch(
      `${API_BASE}/executive-menus?limit=100&orderBy=createdAt&orderDirection=desc`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) {
      throw new Error(`Executive Menus API error: ${res.status}`);
    }

    const json = await res.json();
    const items: ExecutiveMenu[] = Array.isArray(json)
      ? json
      : json.data ?? [];

    return items.filter((m) => m.isActive && m.imageUrl);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchExecutiveMenus]", err);
    }
    return [];
  }
}
