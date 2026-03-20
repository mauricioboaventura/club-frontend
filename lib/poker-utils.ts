import {
  formatCentsToCompact,
  formatCentsToReal,
  formatTournamentDate,
  type PokerTournament,
} from "@/lib/api/poker-tournaments";

export type TournamentDetailTone = "default" | "strong" | "gold" | "promo";

export type TournamentDetail = {
  label: string;
  value: string;
  tone?: TournamentDetailTone;
};

function hasTextValue(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasPositiveNumber(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function formatChips(value: number): string {
  return `${value.toLocaleString("pt-BR")} fichas`;
}

export function formatChipsCompact(value: number): string {
  if (value >= 1_000_000) {
    const v = value / 1_000_000;
    const formatted = Number.isInteger(v) ? String(v) : v.toFixed(1).replace(/\.0$/, "").replace(".", ",");
    return `${formatted} ${v === 1 ? "milhão" : "milhões"}`;
  }
  if (value >= 1_000) {
    const v = value / 1_000;
    return `${Number.isInteger(v) ? v : v.toFixed(1).replace(/\.0$/, "").replace(".", ",")}K`;
  }
  return String(value);
}

function formatCombined(
  cents: number | null | undefined,
  chips: number | null | undefined,
): string | null {
  const hasCents = hasPositiveNumber(cents);
  const hasChips = hasPositiveNumber(chips);
  if (!hasCents && !hasChips) return null;
  if (hasCents && hasChips) return `${formatCentsToReal(cents)}/${formatChipsCompact(chips)} fichas`;
  if (hasCents) return formatCentsToReal(cents);
  return `${formatChipsCompact(chips!)} fichas`;
}

export function getTournamentDetails(tournament: PokerTournament): TournamentDetail[] {
  const details: TournamentDetail[] = [];

  // Buy-in Promo — combinado em 1 linha, destacado como "1º nível" (topo absoluto)
  const buyPromoFormatted = formatCombined(tournament.buyPromoCents, tournament.buyPromoChips);
  if (buyPromoFormatted) {
    details.push({ label: "Buy-in Promo (1º nível)", value: buyPromoFormatted, tone: "promo" });
  }

  details.push(
    { label: "Data", value: formatTournamentDate(tournament.startDate) },
    { label: "Buy-in", value: formatCentsToReal(tournament.buyInCents), tone: "strong" },
    {
      label: "Garantido",
      value: formatCentsToCompact(tournament.guaranteedPrizeCents),
      tone: "gold",
    },
  );

  if (hasTextValue(tournament.tournamentType)) {
    details.push({ label: "Tipo de Torneio", value: tournament.tournamentType });
  }

  if (hasTextValue(tournament.lateRegister)) {
    details.push({ label: "Late Register", value: tournament.lateRegister });
  }

  if (hasTextValue(tournament.blindDuration)) {
    details.push({ label: "Duração dos Blinds", value: tournament.blindDuration });
  }

  if (hasPositiveNumber(tournament.startingStack)) {
    details.push({ label: "Stack Inicial", value: `${formatChipsCompact(tournament.startingStack)} fichas` });
  }

  // Rebuy — combinado em 1 linha
  const rebuyFormatted = formatCombined(tournament.rebuyCents, tournament.rebuyChips);
  if (rebuyFormatted) {
    details.push({ label: "Rebuy", value: rebuyFormatted });
  }

  // Rebuy Promo — combinado em 1 linha
  const rebuyPromoFormatted = formatCombined(tournament.rebuyPromoCents, tournament.rebuyPromoChips);
  if (rebuyPromoFormatted) {
    details.push({ label: "Rebuy Promo", value: rebuyPromoFormatted });
  }

  // Addon — combinado em 1 linha
  const addonFormatted = formatCombined(tournament.addonCents, tournament.addonChips);
  if (addonFormatted) {
    details.push({ label: "Addon", value: addonFormatted });
  }

  // Taxa Staff — combinado em 1 linha
  const staffTaxFormatted = formatCombined(tournament.staffTaxCents, tournament.staffTaxChips);
  if (staffTaxFormatted) {
    details.push({ label: "Taxa ADM", value: staffTaxFormatted });
  }

  if (hasPositiveNumber(tournament.bonusRankingChips)) {
    details.push({
      label: "Bônus Ranking",
      value: `${formatChipsCompact(tournament.bonusRankingChips)} fichas`,
    });
  }

  if (hasPositiveNumber(tournament.timeChipChips)) {
    details.push({ label: "Time Chip", value: `${formatChipsCompact(tournament.timeChipChips)} fichas` });
  }

  if (tournament.hasRabbit !== null) {
    details.push({ label: "Rabbit", value: tournament.hasRabbit ? "Sim" : "Não" });
  }

  if (hasPositiveNumber(tournament.chipLeaderBonusCents)) {
    details.push({
      label: "Bônus Chip Leader",
      value: formatCentsToReal(tournament.chipLeaderBonusCents),
      tone: "gold",
    });
  }

  return details;
}
