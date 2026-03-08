import { withCache, TTL } from "./cache";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.rdc-dev.com.br/api";

export type Ranking = {
  id: string;
  name: string;
  type?: string;
  season?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RankingEntry = {
  id: string;
  rankingId: string;
  position: number;
  previousPosition?: number;
  movement: string;
  playerName: string;
  points: number;
  stages: number;
  prize?: string;
  createdAt: string;
  updatedAt: string;
};

export function fetchActiveRankings(): Promise<Ranking[]> {
  return withCache("rankings:list", _fetchActiveRankings, TTL.SHORT);
}

async function _fetchActiveRankings(): Promise<Ranking[]> {
  try {
    const res = await fetch(`${API_BASE}/rankings?orderBy=name&orderDirection=asc`, {
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      throw new Error(`Rankings API error: ${res.status}`);
    }

    const json = await res.json();
    const items: Ranking[] = Array.isArray(json) ? json : json.data ?? [];
    return items.filter((r) => r.isActive);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchActiveRankings]", err);
    }
    return [];
  }
}

export function fetchRankingById(id: string): Promise<Ranking | null> {
  return withCache(`rankings:${id}`, () => _fetchRankingById(id), TTL.SHORT);
}

async function _fetchRankingById(id: string): Promise<Ranking | null> {
  try {
    const res = await fetch(`${API_BASE}/rankings/${encodeURIComponent(id)}`, {
      next: { revalidate: 120 },
    });

    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Ranking API error: ${res.status}`);
    }

    const json: Ranking = await res.json();
    return json?.id ? json : null;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchRankingById]", err);
    }
    return null;
  }
}

export function fetchRankingEntries(rankingId: string): Promise<RankingEntry[]> {
  return withCache(
    `ranking-entries:${rankingId}`,
    () => _fetchRankingEntries(rankingId),
    TTL.SHORT,
  );
}

async function _fetchRankingEntries(rankingId: string): Promise<RankingEntry[]> {
  try {
    const res = await fetch(
      `${API_BASE}/ranking-entries/ranking/${encodeURIComponent(rankingId)}`,
      { next: { revalidate: 120 } },
    );

    if (!res.ok) {
      throw new Error(`Ranking entries API error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchRankingEntries]", err);
    }
    return [];
  }
}
