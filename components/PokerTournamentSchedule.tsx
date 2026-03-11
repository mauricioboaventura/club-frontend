"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, List, Layers } from "lucide-react";
import SelectFilter from "@/components/SelectFilter";
import {
  formatCentsToReal,
  formatTournamentDate,
  type PokerTournament,
} from "@/lib/api/poker-tournaments";
import type { MonthOption, WeekOption, DayOption } from "@/lib/date-utils";

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
              ? "bg-[#2A0303] text-white"
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
              ? "bg-[#2A0303] text-white"
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
          <div className="grid grid-cols-2 gap-3 mb-4">
            <SelectFilter
              label="Mês"
              options={monthOptions.map((m) => ({ value: m.value, label: m.label }))}
              value={selectedMonth}
              onChange={handleMonthChange}
              placeholder="Mês"
            />
            <SelectFilter
              label="Semana"
              options={weekOptions.map((w) => ({ value: w.value, label: `de ${w.label}` }))}
              value={selectedWeek}
              onChange={handleWeekChange}
              placeholder="Semana"
            />
          </div>

          {/* Abas de dias da semana */}
          <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide -mx-4 px-4">
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
                        ? "bg-[#2A0303] text-white shadow-md"
                        : "bg-white border border-[#e5e0d5] text-[#1a1a1a] hover:border-[#2A0303]/30"
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
                    <div>
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
                      <p className="text-sm text-[#6b6660] mt-1">
                        {formatTournamentDate(t.startDate)}
                      </p>
                    </div>
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
            className="bg-white rounded-2xl p-6 max-w-md w-[calc(100%-2rem)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedTournament(null)}
              className="absolute top-4 right-4 text-[#6b6660] hover:text-[#1a1a1a]"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 pr-8">
              {selectedTournament.name}
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                <span className="text-[#6b6660]">Data e Horário</span>
                <span className="font-medium text-[#1a1a1a]">
                  {formatTournamentDate(selectedTournament.startDate)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                <span className="text-[#6b6660]">Buy-in</span>
                <span className="font-medium text-[#1a1a1a]">
                  {formatCentsToReal(selectedTournament.buyInCents)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#6b6660]">Garantido</span>
                <span className="font-medium text-[#5C0F08]">
                  {formatCentsToReal(selectedTournament.guaranteedPrizeCents)}
                </span>
              </div>
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
