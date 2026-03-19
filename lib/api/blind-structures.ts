import { withCache, TTL } from "./cache";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.rdc-dev.com.br/api";

export type BlindStructureLevel = {
  id: string;
  blindStructureId: string;
  position: number;
  type: "level" | "break";
  level: number | null;
  duration: string | null;
  smallBlind: number | null;
  bigBlind: number | null;
  ante: number | null;
  breakLabel: string | null;
};

export type BlindStructure = {
  id: string;
  name: string;
  blind_structure_levels: BlindStructureLevel[];
};

export async function fetchBlindStructureWithLevels(
  id: string,
): Promise<BlindStructure | null> {
  const cacheKey = `blind-structure-${id}`;
  return withCache(cacheKey, () => _fetchById(id), TTL.DEFAULT);
}

async function _fetchById(id: string): Promise<BlindStructure | null> {
  try {
    const res = await fetch(
      `${API_BASE}/blind-structures/${encodeURIComponent(id)}`,
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json ?? null;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchBlindStructureWithLevels]", err);
    }
    return null;
  }
}
