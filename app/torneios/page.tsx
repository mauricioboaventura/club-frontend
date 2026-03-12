import Image from "next/image";
import { fetchWeekTournaments } from "@/lib/api/poker-tournaments";
import { fetchBanners } from "@/lib/api/banners";
import {
  formatDateISO,
  getWeekRange,
  getWeeksOfMonth,
  getMonthOptions,
  getDaysOfWeek,
} from "@/lib/date-utils";
import PokerTournamentSchedule from "@/components/PokerTournamentSchedule";

const CASH_TABLES = {
  omaha: [
    { id: 1, name: "OMAHA 5/5", min: "R$ 300,00", max: "R$ 2.000,00" },
    { id: 2, name: "OMAHA 5/10", min: "R$ 500,00", max: "R$ 5.000,00" },
    { id: 3, name: "OMAHA 10/25", min: "R$ 1.000,00", max: "R$ 15.000,00" },
    { id: 4, name: "OMAHA 25/50", min: "R$ 2.000,00", max: "R$ 30.000,00" },
  ],
  texas: [
    { id: 5, name: "TEXAS HOLD'EM 5/5", min: "R$ 300,00", max: "R$ 1.000,00" },
    { id: 6, name: "TEXAS HOLD'EM 5/10", min: "R$ 500,00", max: "R$ 3.000,00" },
    { id: 7, name: "TEXAS HOLD'EM 10/20", min: "R$ 1.000,00", max: "R$ 10.000,00" },
    { id: 8, name: "TEXAS HOLD'EM 25/50", min: "R$ 2.000,00", max: "R$ 20.000,00" },
    { id: 9, name: "TEXAS HOLD'EM 50/100", min: "R$ 5.000,00", max: "R$ 50.000,00" },
  ],
};

const BG_BEIGE = "#f9f8f0";

type SearchParams = Promise<{
  month?: string;
  week?: string;
  day?: string;
  view?: string;
}>;

export default async function PokerPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const today = new Date();
  const todayISO = formatDateISO(today);

  // --- Resolver mês ---
  const monthOptions = getMonthOptions(4);
  const selectedMonth =
    params.month && monthOptions.some((m) => m.value === params.month)
      ? params.month
      : monthOptions[0].value;
  const monthOpt = monthOptions.find((m) => m.value === selectedMonth)!;

  // --- Resolver semana ---
  const weekOptions = getWeeksOfMonth(monthOpt.year, monthOpt.month);
  let selectedWeek = params.week;

  if (!selectedWeek || !weekOptions.some((w) => w.value === selectedWeek)) {
    // Se o mês selecionado é o mês atual, seleciona a semana que contém hoje
    if (
      monthOpt.year === today.getFullYear() &&
      monthOpt.month === today.getMonth()
    ) {
      const currentWeek = getWeekRange(today);
      const currentWeekKey = `${formatDateISO(currentWeek.start)}_${formatDateISO(currentWeek.end)}`;
      const match = weekOptions.find((w) => w.value === currentWeekKey);
      selectedWeek = match ? match.value : weekOptions[0].value;
    } else {
      selectedWeek = weekOptions[0].value;
    }
  }

  const weekOpt = weekOptions.find((w) => w.value === selectedWeek)!;

  // --- Resolver dia ---
  const days = getDaysOfWeek(weekOpt.start);
  let selectedDay = params.day;

  if (!selectedDay || !days.some((d) => d.date === selectedDay)) {
    // Se a semana contém hoje, seleciona hoje; senão, primeiro dia
    const todayInWeek = days.find((d) => d.date === todayISO);
    selectedDay = todayInWeek ? todayISO : days[0].date;
  }

  // --- Fetch server-side ---
  const weekStart = `${weekOpt.start}T00:00:00`;
  const weekEnd = `${weekOpt.end}T23:59:59`;
  const [weekTournaments, heroBanners] = await Promise.all([
    fetchWeekTournaments(weekStart, weekEnd),
    fetchBanners("poker"),
  ]);
  const heroBanner = heroBanners[0] ?? null;

  // Filtragem por dia no servidor
  const dayTournaments = weekTournaments.filter((t) => {
    const tDate = formatDateISO(new Date(t.startDate));
    return tDate === selectedDay;
  });

  // --- View mode ---
  const viewMode = params.view === "cashgame" ? "cashgame" : "torneios";

  return (
    <main className="min-h-screen mt-[56px]">
      {/* Hero Banner */}
      <div className="relative">
        <div className="relative w-full h-56">
          <Image
            src={heroBanner?.image ?? "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop"}
            alt={heroBanner?.imageAlt ?? "Poker Monte Carlo"}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <h1 className="text-2xl font-bold text-white">
              {heroBanner?.title ?? "Poker Monte Carlo"}
            </h1>
            {(heroBanner?.subtitle) ? (
              <p className="text-white/80 text-sm mt-1 hidden md:block">
                {heroBanner.subtitle}
              </p>
            ) : (
              <p className="text-white/80 text-sm mt-1 hidden md:block">
                Experimente o poker de alto nível no Monte Carlo Poker Club. Com
                mesas de cash game funcionando 24 horas e torneios diários,
                oferecemos a melhor experiência para jogadores de todos os níveis.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="w-full" style={{ background: BG_BEIGE }}>
        <section className="px-4 pt-4 max-w-6xl mx-auto" />

        <PokerTournamentSchedule
          viewMode={viewMode as "torneios" | "cashgame"}
          dayTournaments={dayTournaments}
          weekTournaments={weekTournaments}
          selectedMonth={selectedMonth}
          selectedWeek={selectedWeek}
          selectedDay={selectedDay}
          monthOptions={monthOptions}
          weekOptions={weekOptions}
          days={days}
          cashTables={CASH_TABLES}
        />
      </div>
    </main>
  );
}
