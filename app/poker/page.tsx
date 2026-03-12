"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { List, Layers, X } from "lucide-react";
import {
  fetchPokerTournamentsPaginated,
  formatCentsToReal,
  formatTournamentDate,
  formatTournamentDateHours,
  formatTournamentTime,
  type PokerTournament,
} from "@/lib/api/poker-tournaments";

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

function PokerContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [viewMode, setViewMode] = useState<"torneios" | "cashgame">(
    tabParam === "cashgame" ? "cashgame" : "torneios"
  );
  const [tournaments, setTournaments] = useState<PokerTournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<PokerTournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Sync viewMode with URL tab param (handles client-side navigation)
  useEffect(() => {
    setViewMode(tabParam === "cashgame" ? "cashgame" : "torneios");
  }, [tabParam]);

  // Fetch tournaments from API
  useEffect(() => {
    fetchPokerTournamentsPaginated(1).then(({ data, total }) => {
      setTournaments(data);
      setHasMore(data.length < total);
      setLoading(false);
    });
  }, []);

  const loadMore = useCallback(async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    const { data, total } = await fetchPokerTournamentsPaginated(nextPage);
    setTournaments((prev) => {
      const updated = [...prev, ...data];
      setHasMore(updated.length < total);
      return updated;
    });
    setPage(nextPage);
    setLoadingMore(false);
  }, [page]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, loadMore]);

  const tournamentsByDay = tournaments.reduce((groups, t) => {
    const day = t.startDate.slice(0, 10);
    if (!groups[day]) groups[day] = [];
    groups[day].push(t);
    return groups;
  }, {} as Record<string, PokerTournament[]>);
  const sortedDays = Object.keys(tournamentsByDay).sort();

  return (
    <main className="min-h-screen mt-[56px]">
      {/* Static Header */}
      <div className="relative">
        <div className="relative w-full h-56">
          <Image
            src="https://ppvlzlzceuwxnishsotz.supabase.co/storage/v1/object/public/banners/banners-site-SiGMA-WEB-SPCity.png"
            alt="Torneios"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute bottom-4 left-4 right-4 text-center hidden xl:block">
            <h1 className="text-2xl font-bold text-white">Poker Monte Carlo</h1>
            <p className="text-white/80 text-sm mt-1">
              Experimente o poker de alto nível no Monte Carlo Poker Club. Com mesas de cash game funcionando 24 horas e torneios diários, oferecemos a melhor experiência para jogadores de todos os níveis.
            </p>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="w-full" style={{ background: BG_BEIGE }}>

        {/* Intro section */}
        <section className="px-4 pt-4 max-w-6xl mx-auto">
          {/* <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-[#525252]">
              Poker Monte Carlo
            </h3>
            <p className="text-[16px] leading-relaxed mb-4 text-[#8c8c8c]">
              Experimente o poker de alto nível no Monte Carlo Poker Club. Com
              mesas de cash game funcionando 24 horas e torneios diários,
              oferecemos a melhor experiência para jogadores de todos os níveis.
            </p>
          </div> */}
        </section>

        {/* Toggle Torneios / Cash Game */}
        <section id="torneios" className="px-4 pb-8 max-w-6xl mx-auto">
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setViewMode("torneios")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-base font-medium transition-colors ${
                viewMode === "torneios"
                  ? "bg-[#2A0303] text-white"
                  : "border border-[#c5c0b8] text-[#6b6660]"
              }`}
            >
              <List className="h-5 w-5" />
              Torneios
            </button>
            <button
              id="cash"
              type="button"
              onClick={() => setViewMode("cashgame")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-base font-medium transition-colors ${
                viewMode === "cashgame"
                  ? "bg-[#2A0303] text-white"
                  : "border border-[#c5c0b8] text-[#6b6660]"
              }`}
            >
              <Layers className="h-5 w-5" />
              Cash Game
            </button>
          </div>

          {/* Torneios View */}
          {viewMode === "torneios" && (
          <>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse p-5 rounded-2xl border border-[#e5e0d5] shadow-sm bg-white"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="h-6 w-3/4 rounded bg-[#e5e0d5] mb-2" />
                        <div className="h-4 w-1/2 rounded bg-[#e5e0d5]" />
                      </div>
                      <div className="h-7 w-16 rounded bg-[#e5e0d5] ml-3" />
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-[#e5e0d5]">
                      <div className="flex-1">
                        <div className="h-4 w-12 rounded bg-[#e5e0d5] mb-1" />
                        <div className="h-6 w-24 rounded bg-[#e5e0d5]" />
                      </div>
                      <div className="flex-1 text-right">
                        <div className="h-4 w-16 rounded bg-[#e5e0d5] mb-1 ml-auto" />
                        <div className="h-6 w-28 rounded bg-[#e5e0d5] ml-auto" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : tournaments.length === 0 ? (
              <p className="text-center text-[#6b6660] py-8 rounded-2xl bg-white shadow-md border border-[#e5e0d5]">
                Nenhum torneio disponível no momento.
              </p>
            ) : (
              <div className="space-y-8">
                {sortedDays.map((day) => (
                  <div key={day}>
                    <h2 className="text-base font-bold uppercase tracking-widest text-[#5C0F08] mb-3 px-1">
                      {formatTournamentDate(tournamentsByDay[day][0].startDate)}
                    </h2>
                    <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                      {tournamentsByDay[day].map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTournament(t)}
                          className="p-5 rounded-2xl border border-[#5C0F08] shadow-sm cursor-pointer hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-[#5C0F08]">
                                  {t.name}
                                </h3>
                                {t.isFeatured && (
                                  <span className="bg-[#2A0303] text-white text-xs font-medium px-2 py-0.5 rounded">
                                    Destaque
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-xl font-bold text-[#430904] ml-3 shrink-0">
                              {formatTournamentTime(t.startDate)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-[#e5e0d5]">
                            <div>
                              <p className="text-sm text-[#6b6660]">Buy-in</p>
                              <p className="text-base font-semibold text-[#1a1a1a]">
                                {formatCentsToReal(t.buyInCents)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-[#6b6660]">Garantido</p>
                              <p className="text-base font-semibold text-[#B8860B]">
                                {formatCentsToReal(t.guaranteedPrizeCents)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Infinite scroll sentinel */}
            {!loading && tournaments.length > 0 && (
              <div ref={sentinelRef} className="h-1" />
            )}
            {loadingMore && (
              <div className="flex justify-center mt-6">
                <span className="text-sm text-[#6b6660]">Carregando...</span>
              </div>
            )}
          </>
          )}

          {/* Cash Game View */}
          {viewMode === "cashgame" && (
            <div>
              <div className="text-center mb-8 space-y-1">
                <p className="text-[#1a1a1a]">
                  <span className="font-bold">PROGRAMAÇÃO:</span> 24 horas por dia
                </p>
                <p className="text-[#1a1a1a]">
                  <span className="font-bold">MODALIDADES:</span> Texas Hold&apos;em e Omaha
                </p>
              </div>

              {/* Omaha Tables */}
              <div className="mb-8">
                <h2 className="text-center font-bold text-[#1a1a1a] mb-6">
                  MESAS OMAHA:
                </h2>
                <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                  {CASH_TABLES.omaha.map((table) => (
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
                  {CASH_TABLES.texas.map((table) => (
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
        </section>
      </div>

      {/* Tournament Detail Modal */}
      {selectedTournament && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setSelectedTournament(null)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="fixed inset-0 overflow-y-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex min-h-full items-start justify-center px-4 py-8">
              <div
                className="bg-white rounded-2xl p-6 max-w-md w-full relative my-auto"
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
                  {formatTournamentDateHours(selectedTournament.startDate)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                <span className="text-[#6b6660]">Buy-in</span>
                <span className="font-medium text-[#1a1a1a]">
                  {formatCentsToReal(selectedTournament.buyInCents)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                <span className="text-[#6b6660]">Garantido</span>
                <span className="font-medium text-[#B8860B]">
                  {formatCentsToReal(selectedTournament.guaranteedPrizeCents)}
                </span>
              </div>

              {selectedTournament.startingStack && (
                <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                  <span className="text-[#6b6660]">Stack Inicial</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {(selectedTournament.startingStack / 1000).toFixed(0)}K
                  </span>
                </div>
              )}

              {selectedTournament.blindDuration && (
                <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                  <span className="text-[#6b6660]">Duração dos Blinds</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {selectedTournament.blindDuration}
                  </span>
                </div>
              )}

              {selectedTournament.lateRegister && (
                <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                  <span className="text-[#6b6660]">Late Register</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {selectedTournament.lateRegister}
                  </span>
                </div>
              )}

              {selectedTournament.buyPromoCents && (
                <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                  <span className="text-[#6b6660]">Buy Promo (1º Nível)</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {formatCentsToReal(selectedTournament.buyPromoCents)}
                    {selectedTournament.buyPromoChips && (
                      <span className="text-xs text-[#6b6660] ml-1">
                        ({(selectedTournament.buyPromoChips / 1000).toFixed(0)}K fichas)
                      </span>
                    )}
                  </span>
                </div>
              )}

              {selectedTournament.rebuyCents && (
                <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                  <span className="text-[#6b6660]">Rebuy</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {formatCentsToReal(selectedTournament.rebuyCents)}
                    {selectedTournament.rebuyChips && (
                      <span className="text-xs text-[#6b6660] ml-1">
                        ({(selectedTournament.rebuyChips / 1000).toFixed(0)}K fichas)
                      </span>
                    )}
                  </span>
                </div>
              )}

              {selectedTournament.rebuyPromoCents && (
                <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                  <span className="text-[#6b6660]">Rebuy Promo</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {formatCentsToReal(selectedTournament.rebuyPromoCents)}
                    {selectedTournament.rebuyPromoChips && (
                      <span className="text-xs text-[#6b6660] ml-1">
                        ({(selectedTournament.rebuyPromoChips / 1000).toFixed(0)}K fichas)
                      </span>
                    )}
                  </span>
                </div>
              )}

              {selectedTournament.addonCents && (
                <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                  <span className="text-[#6b6660]">Addon</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {formatCentsToReal(selectedTournament.addonCents)}
                    {selectedTournament.addonChips && (
                      <span className="text-xs text-[#6b6660] ml-1">
                        ({(selectedTournament.addonChips / 1000).toFixed(0)}K fichas)
                      </span>
                    )}
                  </span>
                </div>
              )}

              {selectedTournament.staffTaxCents && (
                <div className="flex justify-between items-center py-2 border-b border-[#e5e0d5]">
                  <span className="text-[#6b6660]">Taxa Staff</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {formatCentsToReal(selectedTournament.staffTaxCents)}
                    {selectedTournament.staffTaxChips && (
                      <span className="text-xs text-[#6b6660] ml-1">
                        ({(selectedTournament.staffTaxChips / 1000).toFixed(0)}K fichas)
                      </span>
                    )}
                  </span>
                </div>
              )}

              {(selectedTournament.bonusRankingChips || selectedTournament.timeChipChips || selectedTournament.hasRabbit || selectedTournament.chipLeaderBonusCents) && (
                <div className="pt-2">
                  <p className="text-xs font-semibold text-[#6b6660] mb-2 uppercase">Bônus e Extras</p>
                  <div className="space-y-2">
                    {selectedTournament.bonusRankingChips && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#6b6660]">Bônus Ranking</span>
                        <span className="text-sm font-medium text-[#1a1a1a]">
                          {(selectedTournament.bonusRankingChips / 1000).toFixed(0)}K fichas
                        </span>
                      </div>
                    )}
                    {selectedTournament.timeChipChips && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#6b6660]">Time Chip</span>
                        <span className="text-sm font-medium text-[#1a1a1a]">
                          {(selectedTournament.timeChipChips / 1000).toFixed(0)}K fichas
                        </span>
                      </div>
                    )}
                    {selectedTournament.hasRabbit && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#6b6660]">Rabbit</span>
                        <span className="text-sm font-medium text-green-700">Sim</span>
                      </div>
                    )}
                    {selectedTournament.chipLeaderBonusCents && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#6b6660]">Chip Leader Bônus</span>
                        <span className="text-sm font-medium text-[#5C0F08]">
                          {formatCentsToReal(selectedTournament.chipLeaderBonusCents)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* <Link
              href="/auth"
              className="w-full mt-6 h-12 rounded-full bg-[#2A0303] hover:bg-[#420804] text-white font-semibold text-base transition-colors flex items-center justify-center"
            >
              Realizar inscrição!
            </Link> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function PokerPage() {
  return (
    <Suspense>
      <PokerContent />
    </Suspense>
  );
}
