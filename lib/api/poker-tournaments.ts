import { withCache, TTL } from "./cache";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.rdc-dev.com.br/api";
const TOURNAMENTS_API_URL = `${API_BASE}/poker-tournaments`;

export type PokerTournament = {
  id: string;
  name: string;
  slug: string;
  startDate: string;
  buyInCents: number;
  guaranteedPrizeCents: number;
  isFeatured: boolean;
  isActive: boolean;
  status: string;
  tournamentType: string;
  coverImageUrl: string | null;
  // Novos campos da grade
  lateRegister: string | null;
  blindDuration: string | null;
  buyPromoChips: number | null;
  buyPromoCents: number | null;
  startingStack: number | null;
  rebuyChips: number | null;
  rebuyCents: number | null;
  rebuyPromoChips: number | null;
  rebuyPromoCents: number | null;
  addonChips: number | null;
  addonCents: number | null;
  staffTaxChips: number | null;
  staffTaxCents: number | null;
  bonusRankingChips: number | null;
  timeChipChips: number | null;
  hasRabbit: boolean | null;
  chipLeaderBonusCents: number | null;
};

type TournamentsResponse = {
  data: PokerTournament[];
  count: number;
};

export type PaginatedTournaments = {
  data: PokerTournament[];
  total: number;
};

const PAGE_SIZE = 10;

export function fetchPokerTournaments(): Promise<PokerTournament[]> {
  return withCache("poker-tournaments", _fetchPokerTournaments, TTL.DEFAULT);
}

export async function fetchPokerTournamentById(
  id: string,
): Promise<PokerTournament | null> {
  const cacheKey = `poker-tournament-${id}`;
  return withCache(cacheKey, () => _fetchById(id), TTL.DEFAULT);
}

async function _fetchById(id: string): Promise<PokerTournament | null> {
  try {
    const res = await fetch(`${TOURNAMENTS_API_URL}/${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json ?? null;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchPokerTournamentById]", err);
    }
    return null;
  }
}

export async function fetchPokerTournamentsPaginated(
  page: number,
  limit: number = PAGE_SIZE,
): Promise<PaginatedTournaments> {
  const cacheKey = `poker-tournaments-p${page}-l${limit}`;
  return withCache(cacheKey, () => _fetchPaginated(page, limit), TTL.DEFAULT);
}

async function _fetchPaginated(
  page: number,
  limit: number,
): Promise<PaginatedTournaments> {
  try {
    const res = await fetch(
      `${TOURNAMENTS_API_URL}?page=${page}&limit=${limit}&orderBy=startDate&orderDirection=asc`,
    );

    if (!res.ok) {
      throw new Error(`Poker Tournaments API error: ${res.status}`);
    }

    const json: TournamentsResponse = await res.json();
    const data = (json.data ?? []).filter((t) => t.isActive !== false);
    return { data, total: json.count ?? 0 };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchPokerTournamentsPaginated]", err);
    }
    return { data: [], total: 0 };
  }
}

async function _fetchPokerTournaments(): Promise<PokerTournament[]> {
  try {
    const res = await fetch(
      `${TOURNAMENTS_API_URL}?page=1&limit=50&orderBy=startDate&orderDirection=asc`,
      { next: { revalidate: 300 } },
    );

    if (!res.ok) {
      throw new Error(`Poker Tournaments API error: ${res.status}`);
    }

    const json: TournamentsResponse = await res.json();
    return (json.data ?? []).filter((t) => t.isActive !== false);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchPokerTournaments]", err);
    }
    return [];
  }
}

export async function fetchWeekTournaments(
  weekStart: string,
  weekEnd: string
): Promise<PokerTournament[]> {
  try {
    const res = await fetch(
      `${TOURNAMENTS_API_URL}/week?weekStart=${encodeURIComponent(weekStart)}&weekEnd=${encodeURIComponent(weekEnd)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Poker Tournaments week API error: ${res.status}`);
    }

    const json: TournamentsResponse = await res.json();
    return json.data ?? [];
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchWeekTournaments]", err);
    }
    return [];
  }
}

export function formatCentsToReal(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatTournamentDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function formatTournamentDateHours(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTournamentTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCentsToCompact(cents: number | null | undefined): string {
  if (cents == null || !Number.isFinite(cents)) return "R$ 0";
  const reais = cents / 100;
  if (reais >= 1_000_000) {
    const v = reais / 1_000_000;
    return `R$ ${Number.isInteger(v) ? v : v.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (reais >= 1_000) {
    const v = reais / 1_000;
    return `R$ ${Number.isInteger(v) ? v : v.toFixed(1).replace(/\.0$/, "")}K`;
  }
  return formatCentsToReal(cents);
}