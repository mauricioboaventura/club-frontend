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

export function fetchPokerTournaments(): Promise<PokerTournament[]> {
  return withCache("poker-tournaments", _fetchPokerTournaments, TTL.DEFAULT);
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

export function formatCentsToReal(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatTournamentDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
