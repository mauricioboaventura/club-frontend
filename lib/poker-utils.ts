import {
  formatCentsToCompact,
  formatCentsToReal,
  formatTournamentDate,
  type PokerTournament,
} from "@/lib/api/poker-tournaments";

export type TournamentDetailTone = "default" | "strong" | "gold";

export type TournamentDetail = {
  label: string;
  value: string;
  tone?: TournamentDetailTone;
};

function hasTextValue(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasNumberValue(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function formatChips(value: number): string {
  return `${value.toLocaleString("pt-BR")} fichas`;
}

export function getTournamentDetails(tournament: PokerTournament): TournamentDetail[] {
  const details: TournamentDetail[] = [
    { label: "Data", value: formatTournamentDate(tournament.startDate) },
    { label: "Buy-in", value: formatCentsToReal(tournament.buyInCents), tone: "strong" },
    {
      label: "Garantido",
      value: formatCentsToCompact(tournament.guaranteedPrizeCents),
      tone: "gold",
    },
  ];

  if (hasTextValue(tournament.tournamentType)) {
    details.push({ label: "Tipo de Torneio", value: tournament.tournamentType });
  }

  if (hasTextValue(tournament.lateRegister)) {
    details.push({ label: "Late Register", value: tournament.lateRegister });
  }

  if (hasTextValue(tournament.blindDuration)) {
    details.push({ label: "Duração dos Blinds", value: tournament.blindDuration });
  }

  if (hasNumberValue(tournament.startingStack)) {
    details.push({ label: "Stack Inicial", value: formatChips(tournament.startingStack) });
  }

  if (hasNumberValue(tournament.buyPromoChips)) {
    details.push({ label: "Buy Promo (Fichas)", value: formatChips(tournament.buyPromoChips) });
  }

  if (hasNumberValue(tournament.buyPromoCents)) {
    details.push({ label: "Buy Promo", value: formatCentsToReal(tournament.buyPromoCents) });
  }

  if (hasNumberValue(tournament.rebuyChips)) {
    details.push({ label: "Rebuy (Fichas)", value: formatChips(tournament.rebuyChips) });
  }

  if (hasNumberValue(tournament.rebuyCents)) {
    details.push({ label: "Rebuy", value: formatCentsToReal(tournament.rebuyCents) });
  }

  if (hasNumberValue(tournament.rebuyPromoChips)) {
    details.push({
      label: "Rebuy Promo (Fichas)",
      value: formatChips(tournament.rebuyPromoChips),
    });
  }

  if (hasNumberValue(tournament.rebuyPromoCents)) {
    details.push({ label: "Rebuy Promo", value: formatCentsToReal(tournament.rebuyPromoCents) });
  }

  if (hasNumberValue(tournament.addonChips)) {
    details.push({ label: "Addon (Fichas)", value: formatChips(tournament.addonChips) });
  }

  if (hasNumberValue(tournament.addonCents)) {
    details.push({ label: "Addon", value: formatCentsToReal(tournament.addonCents) });
  }

  if (hasNumberValue(tournament.staffTaxChips)) {
    details.push({ label: "Taxa Staff (Fichas)", value: formatChips(tournament.staffTaxChips) });
  }

  if (hasNumberValue(tournament.staffTaxCents)) {
    details.push({ label: "Taxa Staff", value: formatCentsToReal(tournament.staffTaxCents) });
  }

  if (hasNumberValue(tournament.bonusRankingChips)) {
    details.push({
      label: "Bônus Ranking (Fichas)",
      value: formatChips(tournament.bonusRankingChips),
    });
  }

  if (hasNumberValue(tournament.timeChipChips)) {
    details.push({ label: "Time Chip (Fichas)", value: formatChips(tournament.timeChipChips) });
  }

  if (tournament.hasRabbit !== null) {
    details.push({ label: "Rabbit", value: tournament.hasRabbit ? "Sim" : "Não" });
  }

  if (hasNumberValue(tournament.chipLeaderBonusCents)) {
    details.push({
      label: "Bônus Chip Leader",
      value: formatCentsToReal(tournament.chipLeaderBonusCents),
      tone: "gold",
    });
  }

  return details;
}
