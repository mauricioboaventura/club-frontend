"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, List, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import SelectFilter from "@/components/SelectFilter";
import {
  formatCentsToReal,
  formatTournamentDate,
  formatTournamentTime,
  type PokerTournament,
} from "@/lib/api/poker-tournaments";
import type { MonthOption, WeekOption, DayOption } from "@/lib/date-utils";
import { getWeeksOfMonth } from "@/lib/date-utils";

type Props = {
  viewMode: "torneios" | "cashgame";
  dayTournaments: PokerTournament[];
  weekTournaments: PokerTournament[];
  selectedMonth: string;
  selectedWeek: string;
  selectedDay: string;
  monthOptions: MonthOption[];
  weekOptions: WeekOption[];
  days: DayOption[];
  cashTables: {
    omaha: { id: number; name: string; min: string; max: string }[];
    texas: { id: number; name: string; min: string; max: string }[];
  };
};

type TournamentDetail = {
  label: string;
  value: string;
  tone?: "default" | "accent";
};

type TournamentDetailSection = {
  title: string;
  items: TournamentDetail[];
};

const chipFormatter = new Intl.NumberFormat("pt-BR");

function getTextOrNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function formatHumanizedText(value: string | null | undefined): string | null {
  const text = getTextOrNull(value);
  return text ? text.replace(/[_-]+/g, " ") : null;
}

function formatOptionalCurrency(value: number | null | undefined): string | null {
  return typeof value === "number" ? formatCentsToReal(value) : null;
}

function formatOptionalChips(value: number | null | undefined): string | null {
  return typeof value === "number"
    ? `${chipFormatter.format(value)} fichas`
    : null;
}

function formatChipsAndCurrency(
  chips: number | null | undefined,
  cents: number | null | undefined,
): string | null {
  const parts = [formatOptionalChips(chips), formatOptionalCurrency(cents)].filter(
    (part): part is string => Boolean(part),
  );

  return parts.length > 0 ? parts.join(" / ") : null;
}

function formatBoolean(value: boolean | null | undefined): string | null {
  if (typeof value !== "boolean") {
    return null;
  }

  return value ? "Sim" : "Não";
}

function getDetail(
  label: string,
  value: string | null,
  tone: TournamentDetail["tone"] = "default",
): TournamentDetail | null {
  return value ? { label, value, tone } : null;
}

function buildTournamentDetailSections(
  tournament: PokerTournament,
): TournamentDetailSection[] {
  const generalItems = [
    getDetail("Data e horário", formatTournamentDate(tournament.startDate)),
    getDetail("Buy-in", formatCentsToReal(tournament.buyInCents)),
    getDetail(
      "Garantido",
      formatCentsToReal(tournament.guaranteedPrizeCents),
      "accent",
    ),
    getDetail("Status", formatHumanizedText(tournament.status)),
    getDetail("Tipo de torneio", formatHumanizedText(tournament.tournamentType)),
  ].filter((item): item is TournamentDetail => Boolean(item));

  const structureItems = [
    getDetail("Registro tardio", getTextOrNull(tournament.lateRegister)),
    getDetail("Duração dos blinds", getTextOrNull(tournament.blindDuration)),
    getDetail("Stack inicial", formatOptionalChips(tournament.startingStack)),
    getDetail(
      "Buy promo",
      formatChipsAndCurrency(tournament.buyPromoChips, tournament.buyPromoCents),
    ),
    getDetail(
      "Rebuy",
      formatChipsAndCurrency(tournament.rebuyChips, tournament.rebuyCents),
    ),
    getDetail(
      "Rebuy promo",
      formatChipsAndCurrency(
        tournament.rebuyPromoChips,
        tournament.rebuyPromoCents,
      ),
    ),
    getDetail(
      "Addon",
      formatChipsAndCurrency(tournament.addonChips, tournament.addonCents),
    ),
    getDetail(
      "Taxa staff",
      formatChipsAndCurrency(tournament.staffTaxChips, tournament.staffTaxCents),
    ),
    getDetail(
      "Bônus ranking",
      formatOptionalChips(tournament.bonusRankingChips),
    ),
    getDetail("Time chip", formatOptionalChips(tournament.timeChipChips)),
    getDetail("Rabbit", formatBoolean(tournament.hasRabbit)),
    getDetail(
      "Bônus chip leader",
      formatOptionalCurrency(tournament.chipLeaderBonusCents),
    ),
  ].filter((item): item is TournamentDetail => Boolean(item));

  return [
    { title: "Informações gerais", items: generalItems },
    { title: "Estrutura do torneio", items: structureItems },
  ].filter((section) => section.items.length > 0);
}

export default function PokerTournamentSchedule({
  viewMode: initialViewMode,
  dayTournaments,
  selectedMonth,
  selectedWeek,
  selectedDay,
  monthOptions,
  weekOptions,
  days,
  cashTables,
}: Props) {
  const router = useRouter();
  const [selectedTournament, setSelectedTournament] =
    useState<PokerTournament | null>(null);
  const [viewMode, setViewMode] = useState(initialViewMode);
  const tournamentDetailSections = selectedTournament
    ? buildTournamentDetailSections(selectedTournament)
    : [];

  function navigate(params: {
    month?: string;
    week?: string;
    day?: string;
    view?: string;
  }) {
    const sp = new URLSearchParams();
    if (params.month ?? selectedMonth) sp.set("month", params.month ?? selectedMonth);
    if (params.week ?? selectedWeek) sp.set("week", params.week ?? selectedWeek);
    if (params.day ?? selectedDay) sp.set("day", params.day ?? selectedDay);
    if (params.view ?? viewMode) sp.set("view", params.view ?? viewMode);
    router.replace(`/poker?${sp.toString()}`, { scroll: false });
  }

  function handleMonthChange(monthValue: string) {
    // Ao mudar o mês, solta a semana e dia para o server resolver defaults
    const sp = new URLSearchParams();
    sp.set("month", monthValue);
    sp.set("view", viewMode);
    router.replace(`/poker?${sp.toString()}`, { scroll: false });
  }

  function handleWeekChange(weekValue: string) {
    // Ao mudar a semana, solta o dia para o server resolver default
    const sp = new URLSearchParams();
    sp.set("month", selectedMonth);
    sp.set("week", weekValue);
    sp.set("view", viewMode);
    router.replace(`/poker?${sp.toString()}`, { scroll: false });
  }

  const currentWeekIndex = weekOptions.findIndex((w) => w.value === selectedWeek);
  const currentMonthIndex = monthOptions.findIndex((m) => m.value === selectedMonth);

  const hasPrevWeek = currentWeekIndex > 0;
  const hasNextWeek = currentWeekIndex < weekOptions.length - 1;
  const hasPrevMonth = currentMonthIndex > 0;
  const hasNextMonth = currentMonthIndex < monthOptions.length - 1;

  // Pode voltar se tem semana anterior OU mês anterior
  const canGoPrev = hasPrevWeek || hasPrevMonth;
  // Pode avançar se tem próxima semana OU próximo mês
  const canGoNext = hasNextWeek || hasNextMonth;

  function handlePrevWeek() {
    if (hasPrevWeek) {
      handleWeekChange(weekOptions[currentWeekIndex - 1].value);
    } else if (hasPrevMonth) {
      const prevMonthOpt = monthOptions[currentMonthIndex - 1];
      const [yearStr, monthStr] = prevMonthOpt.value.split("-");
      const prevWeeks = getWeeksOfMonth(Number(yearStr), Number(monthStr) - 1);
      // Encontra a última semana do mês anterior que não seja a semana atual
      const targetWeek = [...prevWeeks].reverse().find((w) => w.value !== selectedWeek);
      if (targetWeek) {
        const sp = new URLSearchParams();
        sp.set("month", prevMonthOpt.value);
        sp.set("week", targetWeek.value);
        sp.set("view", viewMode);
        router.replace(`/poker?${sp.toString()}`, { scroll: false });
      }
    }
  }

  function handleNextWeek() {
    if (hasNextWeek) {
      handleWeekChange(weekOptions[currentWeekIndex + 1].value);
    } else if (hasNextMonth) {
      const nextMonthOpt = monthOptions[currentMonthIndex + 1];
      const [yearStr, monthStr] = nextMonthOpt.value.split("-");
      const nextWeeks = getWeeksOfMonth(Number(yearStr), Number(monthStr) - 1);
      // Encontra a primeira semana do próximo mês que não seja a semana atual
      const targetWeek = nextWeeks.find((w) => w.value !== selectedWeek);
      if (targetWeek) {
        const sp = new URLSearchParams();
        sp.set("month", nextMonthOpt.value);
        sp.set("week", targetWeek.value);
        sp.set("view", viewMode);
        router.replace(`/poker?${sp.toString()}`, { scroll: false });
      }
    }
  }

  function handleDayChange(dayISO: string) {
    navigate({ day: dayISO });
  }

  function handleViewChange(mode: "torneios" | "cashgame") {
    setViewMode(mode);
    navigate({ view: mode });
  }

  return (
    <section id="torneios" className="px-4 pb-8 max-w-6xl mx-auto">
      {/* Toggle Torneios / Cash Game */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleViewChange("torneios")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            viewMode === "torneios"
              ? "bg-[#430904] text-white"
              : "border border-[#c5c0b8] text-[#6b6660]"
          }`}
        >
          <List className="h-4 w-4" />
          Torneios
        </button>
        <button
          id="cash"
          type="button"
          onClick={() => handleViewChange("cashgame")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            viewMode === "cashgame"
              ? "bg-[#430904] text-white"
              : "border border-[#c5c0b8] text-[#6b6660]"
          }`}
        >
          <Layers className="h-4 w-4" />
          Cash Game
        </button>
      </div>

      {/* ===== TORNEIOS VIEW ===== */}
      {viewMode === "torneios" && (
        <div>
          {/* Filtros: Mês e Semana */}
          {/* <div className="grid grid-cols-2 gap-3 mb-4">
            <SelectFilter
              label="Mês"
              options={monthOptions.map((m) => ({ value: m.value, label: m.label }))}
              value={selectedMonth}
              onChange={handleMonthChange}
              placeholder="Mês"
            />
            <SelectFilter
              label="Semana"
              options={weekOptions.map((w) => ({ value: w.value, label: `${w.label}` }))}
              value={selectedWeek}
              onChange={handleWeekChange}
              placeholder="Semana"
            />
          </div> */}

          {/* Navegação de semana */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevWeek}
              disabled={!canGoPrev}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                canGoPrev
                  ? "text-[#430904] hover:text-[#5C0F08]"
                  : "text-[#c5c0b8] cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>
            <span className="text-sm font-medium text-[#1a1a1a]">
              {weekOptions[currentWeekIndex]?.label}
            </span>
            <button
              type="button"
              onClick={handleNextWeek}
              disabled={!canGoNext}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                canGoNext
                  ? "text-[#430904] hover:text-[#5C0F08]"
                  : "text-[#c5c0b8] cursor-not-allowed"
              }`}
            >
              Próxima
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Abas de dias da semana */}
          <div className="flex gap-1.5 justify-center overflow-x-auto pb-3 mb-4 scrollbar-hide">
            {days.map((d) => {
              const isSelected = d.date === selectedDay;
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => handleDayChange(d.date)}
                  className={`
                    flex flex-col items-center justify-center min-w-[52px] px-2 py-2 rounded-xl text-xs font-medium transition-colors shrink-0 relative
                    ${
                      isSelected
                        ? "bg-[#430904] text-white shadow-md"
                        : "bg-white border border-[#e5e0d5] text-[#1a1a1a] hover:border-[#430904]/30"
                    }
                  `}
                >
                  <span className="text-[10px] uppercase tracking-wide opacity-80">
                    {d.dayName}
                  </span>
                  <span className="text-base font-bold leading-tight">
                    {d.dayNumber}
                  </span>
                  {d.isToday && (
                    <span
                      className={`absolute -bottom-0.5 w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-white" : "bg-[#5C0F08]"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Lista de torneios do dia */}
          <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            {dayTournaments.length === 0 ? (
              <p className="col-span-full text-center text-[#6b6660] py-8 rounded-2xl bg-white shadow-md border border-[#e5e0d5]">
                Nenhum torneio neste dia.
              </p>
            ) : (
              dayTournaments.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTournament(t)}
                  className="p-4 rounded-xl border border-[#5C0F08] shadow-sm cursor-pointer hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#1a1a1a]">
                          {t.name}
                        </h3>
                        {t.isFeatured && (
                          <span className="bg-[#2A0303] text-white text-xs font-medium px-2 py-0.5 rounded">
                            Destaque
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6b6660] mt-1">
                        {formatTournamentDate(t.startDate)}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-[#430904] ml-3 shrink-0">
                      {formatTournamentTime(t.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#e5e0d5]">
                    <div>
                      <p className="text-xs text-[#6b6660]">Buy-in</p>
                      <p className="font-medium text-[#1a1a1a]">
                        {formatCentsToReal(t.buyInCents)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#6b6660]">Garantido</p>
                      <p className="font-medium text-[#5C0F08]">
                        {formatCentsToReal(t.guaranteedPrizeCents)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ===== CASH GAME VIEW ===== */}
      {viewMode === "cashgame" && (
        <div>
          <div className="text-center mb-8 space-y-1">
            <p className="text-[#1a1a1a]">
              <span className="font-bold">PROGRAMAÇÃO:</span> 24 horas por dia
            </p>
            <p className="text-[#1a1a1a]">
              <span className="font-bold">MODALIDADES:</span> Texas
              Hold&apos;em e Omaha
            </p>
          </div>

          {/* Omaha Tables */}
          <div className="mb-8">
            <h2 className="text-center font-bold text-[#1a1a1a] mb-6">
              MESAS OMAHA:
            </h2>
            <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              {cashTables.omaha.map((table) => (
                <div key={table.id}>
                  <h3 className="font-medium text-[#1a1a1a] mb-2">
                    {table.name}
                  </h3>
                  <p className="text-[#1a1a1a]">
                    <span className="font-bold">Mínimo:</span> {table.min}
                  </p>
                  <p className="text-[#1a1a1a]">
                    <span className="font-bold">Máximo:</span> {table.max}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Texas Tables */}
          <div className="mb-8">
            <h2 className="text-center font-bold text-[#1a1a1a] mb-6">
              MESAS TEXAS:
            </h2>
            <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              {cashTables.texas.map((table) => (
                <div key={table.id}>
                  <h3 className="font-medium text-[#1a1a1a] mb-2">
                    {table.name}
                  </h3>
                  <p className="text-[#1a1a1a]">
                    <span className="font-bold">Mínimo:</span> {table.min}
                  </p>
                  <p className="text-[#1a1a1a]">
                    <span className="font-bold">Máximo:</span> {table.max}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tournament Detail Modal */}
      {selectedTournament && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTournament(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-[calc(100%-2rem)] relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedTournament(null)}
              className="absolute top-4 right-4 rounded-full bg-white/90 p-1 text-[#6b6660] hover:text-[#1a1a1a]"
            >
              <X className="h-5 w-5" />
            </button>

            {selectedTournament.coverImageUrl && (
              <div className="-mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl bg-[#f9f8f0]">
                <img
                  src={selectedTournament.coverImageUrl}
                  alt={selectedTournament.name}
                  className="h-48 w-full object-cover"
                />
              </div>
            )}

            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 pr-8">
              {selectedTournament.name}
            </h2>

            <div className="space-y-4">
              {tournamentDetailSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b6660] mb-2">
                    {section.title}
                  </h3>
                  <div className="divide-y divide-[#e5e0d5]">
                    {section.items.map((item) => (
                      <div
                        key={`${section.title}-${item.label}`}
                        className="flex justify-between items-center py-2.5"
                      >
                        <span className="text-sm text-[#6b6660]">
                          {item.label}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            item.tone === "accent"
                              ? "text-[#5C0F08]"
                              : "text-[#1a1a1a]"
                          }`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedTournament(null)}
              className="w-full mt-6 h-12 rounded-full bg-[#2A0303] hover:bg-[#420804] text-white font-semibold text-base transition-colors"
            >
              Realizar inscrição!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
