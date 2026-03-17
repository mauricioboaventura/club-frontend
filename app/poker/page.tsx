"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { 
  List, 
  Layers, 
  X, 
  Clock, 
  ChevronRight, 
  Spade, 
  Heart,
  Trophy
} from "lucide-react";
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

type TournamentDetailTone = "default" | "strong" | "gold";

type TournamentDetail = {
  label: string;
  value: string;
  tone?: TournamentDetailTone;
  multiline?: boolean;
};

function hasTextValue(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasNumberValue(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function formatChips(value: number): string {
  return `${value.toLocaleString("pt-BR")} fichas`;
}

function getTournamentDetails(tournament: PokerTournament): TournamentDetail[] {
  const details: TournamentDetail[] = [
    { label: "ID", value: tournament.id },
    { label: "Slug", value: tournament.slug },
    { label: "Data e Horário", value: formatTournamentDateHours(tournament.startDate) },
    { label: "Ativo", value: tournament.isActive ? "Sim" : "Não" },
    { label: "Destaque", value: tournament.isFeatured ? "Sim" : "Não" },
    { label: "Buy-in", value: formatCentsToReal(tournament.buyInCents), tone: "strong" },
    {
      label: "Garantido",
      value: formatCentsToReal(tournament.guaranteedPrizeCents),
      tone: "gold",
    },
  ];

  if (hasTextValue(tournament.status)) {
    details.push({ label: "Status", value: tournament.status });
  }

  if (hasTextValue(tournament.tournamentType)) {
    details.push({ label: "Tipo de Torneio", value: tournament.tournamentType });
  }

  if (hasTextValue(tournament.coverImageUrl)) {
    details.push({
      label: "Imagem de Capa",
      value: tournament.coverImageUrl,
      multiline: true,
    });
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

function PokerContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [viewMode, setViewMode] = useState<"torneios" | "cashgame">(
    tabParam === "cashgame" ? "cashgame" : "torneios"
  );
  const [tournaments, setTournaments] = useState<PokerTournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<PokerTournament | null>(null);
  
  // Estados do Scroll Infinito
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Sincroniza viewMode com o parâmetro da URL
  useEffect(() => {
    setViewMode(tabParam === "cashgame" ? "cashgame" : "torneios");
  }, [tabParam]);

  // Carregamento Inicial
  useEffect(() => {
    fetchPokerTournamentsPaginated(1).then(({ data, total }) => {
      setTournaments(data);
      setHasMore(data.length < total);
      setLoading(false);
    });
  }, []);

  // Função de carregar mais
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const nextPage = page + 1;
    const { data, total } = await fetchPokerTournamentsPaginated(nextPage);
    
    setTournaments((prev) => {
      const updated = [...prev, ...data];
      setHasMore(updated.length < total);
      return updated;
    });
    setPage(nextPage);
    setLoadingMore(false);
  }, [page, hasMore, loadingMore]);

  // Lógica do IntersectionObserver (Scroll Infinito) restaurada e reforçada
  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" } // Dispara 200px antes do elemento aparecer
    );

    observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, loading, loadingMore, loadMore]);

  // Agrupamento por dia
  const tournamentsByDay = tournaments.reduce((groups, t) => {
    const day = t.startDate.slice(0, 10);
    if (!groups[day]) groups[day] = [];
    groups[day].push(t);
    return groups;
  }, {} as Record<string, PokerTournament[]>);
  
  const sortedDays = Object.keys(tournamentsByDay).sort();

  // Trava o scroll do body quando o modal abre
  useEffect(() => {
    if (selectedTournament) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedTournament]);

  const selectedTournamentDetails = selectedTournament
    ? getTournamentDetails(selectedTournament)
    : [];

  return (
    <main className="min-h-screen mt-[56px] flex flex-col" style={{ background: BG_BEIGE }}>
      {/* Banner */}
      <div className="relative w-full aspect-[21/9] md:aspect-[21/6] max-h-64 bg-black">
        <Image
          src="https://ppvlzlzceuwxnishsotz.supabase.co/storage/v1/object/public/banners/banners-site-SiGMA-WEB-SPCity.png"
          alt="Banner Torneios Poker Monte Carlo"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-4 right-4 text-center hidden md:block max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-wide text-white drop-shadow-lg">
            Poker Monte Carlo
          </h1>
          <p className="text-white/90 text-sm mt-2 font-medium drop-shadow-md">
            Mesas de cash game 24 horas e torneios diários para todos os níveis.
          </p>
        </div> */}
      </div>

      <div className="w-full flex-1">
        <section className="px-4 py-6 max-w-4xl mx-auto">
          
          {/* Tabs */}
          <div 
            className="flex bg-[#e5e0d5]/60 p-1.5 rounded-xl mb-8 shadow-inner" 
            role="tablist" 
            aria-label="Modos de Jogo"
          >
            <button
              role="tab"
              aria-selected={viewMode === "torneios"}
              onClick={() => setViewMode("torneios")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm md:text-base font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F08] ${
                viewMode === "torneios"
                  ? "bg-white text-[#2A0303] shadow-sm"
                  : "text-[#6b6660] hover:text-[#1a1a1a]"
              }`}
            >
              <List className="h-5 w-5" />
              Torneios
            </button>
            <button
              role="tab"
              aria-selected={viewMode === "cashgame"}
              onClick={() => setViewMode("cashgame")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm md:text-base font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F08] ${
                viewMode === "cashgame"
                  ? "bg-white text-[#2A0303] shadow-sm"
                  : "text-[#6b6660] hover:text-[#1a1a1a]"
              }`}
            >
              <Layers className="h-5 w-5" />
              Cash Game
            </button>
          </div>

          {/* Torneios View */}
          {viewMode === "torneios" && (
            <div id="panel-torneios" role="tabpanel" tabIndex={0} className="outline-none">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse bg-white p-4 rounded-xl border border-[#e5e0d5] flex gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="h-5 w-2/3 rounded bg-[#e5e0d5]" />
                        <div className="h-4 w-1/3 rounded bg-[#e5e0d5]" />
                      </div>
                      <div className="w-16 h-10 rounded bg-[#e5e0d5]" />
                    </div>
                  ))}
                </div>
              ) : tournaments.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-white shadow-sm border border-[#e5e0d5]">
                  <Trophy className="h-12 w-12 mx-auto text-[#c5c0b8] mb-3" />
                  <p className="text-[#524e49] font-medium text-lg">Nenhum torneio agendado no momento.</p>
                  <p className="text-[#8c8c8c] text-sm mt-1">Fique de olho na nossa programação.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {sortedDays.map((day) => (
                    <div key={day}>
                      <h2 className="text-sm font-black tracking-wider uppercase text-[#6b6660] mb-3 px-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#5C0F08]" />
                        {formatTournamentDate(tournamentsByDay[day][0].startDate)}
                      </h2>
                      <div className="space-y-1">
                        {tournamentsByDay[day].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setSelectedTournament(t)}
                            className="w-full text-left group bg-white p-4 rounded-xl border border-[#e5e0d5] hover:border-[#5C0F08]/40 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F08] active:scale-[0.99] flex items-center gap-3 sm:gap-4"
                            aria-label={`Ver detalhes do torneio ${t.name}`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <h3 className="text-base font-bold text-[#1a1a1a] uppercase leading-tight group-hover:text-[#5C0F08] transition-colors">
                                  {t.name}
                                </h3>
                                {t.isFeatured && (
                                  <span className="shrink-0 text-[10px] font-bold bg-[#5C0F08] text-white px-1.5 py-0.5 rounded tracking-wider">
                                    DESTAQUE
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-4 mt-2">
                                {/* Informações de tempo */}
                                <div className="flex items-center gap-3 text-[13px] text-[#6b6660] font-medium">
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {formatTournamentTime(t.startDate)}
                                  </span>
                                  {t.lateRegister && (
                                    <span>Late até {t.lateRegister}</span>
                                  )}
                                </div>
                                
                                {/* Destaque Garantido (GTD) em Dourado */}
                                {t.guaranteedPrizeCents && t.guaranteedPrizeCents > 0 && (
                                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 border border-amber-200/60 rounded text-amber-600 w-fit">
                                    <Trophy className="h-3.5 w-3.5" />
                                    <span className="text-[11px] font-black tracking-wide uppercase">
                                      {formatCentsToReal(t.guaranteedPrizeCents)} GTD
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Buy-in */}
                            <div className="shrink-0 text-right sm:pr-2 border-l border-[#f0eee9] sm:border-none pl-3 sm:pl-0">
                              <span className="block text-[10px] font-bold text-[#8c8c8c] uppercase tracking-wider mb-0.5">Buy-in</span>
                              <span className="block text-base sm:text-lg font-black text-[#2A0303] leading-none">
                                {formatCentsToReal(t.buyInCents)}
                              </span>
                              {t.buyPromoCents != null && t.buyPromoCents > 0 && (
                                <span className="block text-[11px] font-bold text-emerald-600 mt-0.5">
                                  Promo {formatCentsToReal(t.buyPromoCents)}
                                </span>
                              )}
                            </div>

                            <ChevronRight className="hidden sm:block h-5 w-5 text-[#c5c0b8] group-hover:text-[#5C0F08] shrink-0 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Infinite scroll sentinel explicitamente posicionado */}
              {!loading && tournaments.length > 0 && hasMore && (
                <div 
                  ref={sentinelRef} 
                  className="h-10 w-full mt-4 flex items-center justify-center"
                >
                  {loadingMore && (
                    <div className="h-6 w-6 rounded-full border-2 border-[#e5e0d5] border-t-[#5C0F08] animate-spin" />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Cash Game View */}
          {viewMode === "cashgame" && (
            <div id="panel-cashgame" role="tabpanel" tabIndex={0} className="outline-none space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5e0d5] text-center">
                <p className="text-[#1a1a1a] text-lg">
                  <span className="font-bold">Aberto 24 horas</span> todos os dias da semana.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-black text-[#2A0303] mb-4 flex items-center gap-2 px-1">
                  <Spade className="h-5 w-5 fill-current" />
                  TEXAS HOLD&apos;EM
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CASH_TABLES.texas.map((table) => (
                    <div key={table.id} className="bg-white p-4 rounded-xl border border-[#e5e0d5] hover:shadow-sm transition-shadow">
                      <h3 className="font-bold text-[#1a1a1a] mb-3 text-base">{table.name}</h3>
                      <div className="flex justify-between items-center text-sm border-t border-[#f0eee9] pt-2">
                        <span className="text-[#6b6660]">Mínimo: <strong className="text-[#1a1a1a]">{table.min}</strong></span>
                        <span className="text-[#6b6660]">Máximo: <strong className="text-[#1a1a1a]">{table.max}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-black text-[#5C0F08] mb-4 flex items-center gap-2 px-1">
                  <Heart className="h-5 w-5 fill-current" />
                  OMAHA
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CASH_TABLES.omaha.map((table) => (
                    <div key={table.id} className="bg-white p-4 rounded-xl border border-[#e5e0d5] hover:shadow-sm transition-shadow">
                      <h3 className="font-bold text-[#1a1a1a] mb-3 text-base">{table.name}</h3>
                      <div className="flex justify-between items-center text-sm border-t border-[#f0eee9] pt-2">
                        <span className="text-[#6b6660]">Mínimo: <strong className="text-[#1a1a1a]">{table.min}</strong></span>
                        <span className="text-[#6b6660]">Máximo: <strong className="text-[#1a1a1a]">{table.max}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Modal */}
      {selectedTournament && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-200"
          onClick={() => setSelectedTournament(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200"
            style={{ maxHeight: '90dvh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-6 py-4 border-b border-[#e5e0d5] flex justify-between items-start rounded-t-2xl sm:rounded-2xl">
              <h2 className="text-lg font-black text-[#1a1a1a] uppercase pr-4 leading-tight">
                {selectedTournament.name}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedTournament(null)}
                className="shrink-0 p-1 -mr-2 text-[#8c8c8c] hover:text-[#1a1a1a] hover:bg-[#f0eee9] rounded-full transition-colors"
                aria-label="Fechar modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5 space-y-1">
              {selectedTournamentDetails.map((detail, index) => {
                const valueTone =
                  detail.tone === "gold"
                    ? "text-sm font-black text-amber-600"
                    : detail.tone === "strong"
                      ? "text-sm font-black text-[#2A0303]"
                      : "text-sm font-bold text-[#1a1a1a]";

                return (
                  <div
                    key={`${detail.label}-${index}`}
                    className="flex justify-between items-start gap-4 py-2.5 border-b border-[#f0eee9]"
                  >
                    <span className="text-sm text-[#6b6660]">{detail.label}</span>
                    <span
                      className={`${valueTone} text-right ${
                        detail.multiline ? "break-all" : ""
                      }`}
                    >
                      {detail.value}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="p-4 pt-0 sm:pb-6" />
          </div>
        </div>
      )}
    </main>
  );
}

export default function PokerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f9f8f0] mt-[56px]" />}>
      <PokerContent />
    </Suspense>
  );
}