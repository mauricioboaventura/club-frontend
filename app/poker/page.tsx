"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  List, 
  Layers, 
  X, 
  Clock, 
  ChevronRight, 
  Spade, 
  Heart,
  Trophy,
  Radio,
  LayoutGrid,
  CalendarClock,
  Check
} from "lucide-react";
import {
  fetchPokerTournamentsPaginated,
  formatCentsToReal,
  formatTournamentDate,
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

const LIVE_TABLES = [
  { id: 1, modality: "Texas Hold'em", blind: "5/10", players: 8, maxPlayers: 9, openMinutesAgo: 180 },
  { id: 2, modality: "Texas Hold'em", blind: "10/20", players: 7, maxPlayers: 9, openMinutesAgo: 300 },
  { id: 3, modality: "Omaha", blind: "5/10", players: 6, maxPlayers: 9, openMinutesAgo: 90 },
  { id: 4, modality: "Texas Hold'em", blind: "25/50", players: 9, maxPlayers: 9, openMinutesAgo: 480 },
  { id: 5, modality: "Omaha", blind: "10/20", players: 5, maxPlayers: 9, openMinutesAgo: 120 },
  { id: 6, modality: "Texas Hold'em", blind: "50/100", players: 4, maxPlayers: 9, openMinutesAgo: 30 },
];

function formatOpenTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}h${m > 0 ? `${m.toString().padStart(2, "0")}min` : ""}`;
  return `${m}min`;
}



function PokerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const [viewMode, setViewMode] = useState<"torneios" | "cashgame">(
    tabParam === "cashgame" ? "cashgame" : "torneios"
  );
  const [tournaments, setTournaments] = useState<PokerTournament[]>([]);

  // Cash game sub-tabs
  const [cashSubTab, setCashSubTab] = useState<"modalidades" | "aovivo">("modalidades");
  const [reserveTableId, setReserveTableId] = useState<number | null>(null);
  const [reserveName, setReserveName] = useState("");
  const [reserveCpf, setReserveCpf] = useState("");
  const [reserveSubmitted, setReserveSubmitted] = useState(false);

  function formatCpfInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  }

  function handleReserveSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (reserveName.trim().length < 2 || reserveCpf.replace(/\D/g, "").length !== 11) return;
    setReserveSubmitted(true);
  }

  function closeReserveModal() {
    setReserveTableId(null);
    setReserveName("");
    setReserveCpf("");
    setReserveSubmitted(false);
  }
  
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

  // Trava o scroll do body quando qualquer modal abre
  useEffect(() => {
    if (reserveTableId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [reserveTableId]);

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
                            onClick={() => router.push(`/poker/${t.id}`)}
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
            <div id="panel-cashgame" role="tabpanel" tabIndex={0} className="outline-none space-y-6">
              {/* Sub-tabs: Modalidades / Ao Vivo */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCashSubTab("modalidades")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                    cashSubTab === "modalidades"
                      ? "bg-[#2A0303] text-white border-[#2A0303] shadow-md"
                      : "bg-white text-[#6b6660] border-[#e5e0d5] hover:text-[#2A0303] hover:border-[#c5c0b8]"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  Modalidades
                </button>
                <button
                  onClick={() => setCashSubTab("aovivo")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                    cashSubTab === "aovivo"
                      ? "bg-[#2A0303] text-white border-[#2A0303] shadow-md"
                      : "bg-white text-[#6b6660] border-[#e5e0d5] hover:text-[#2A0303] hover:border-[#c5c0b8]"
                  }`}
                >
                  <Radio className="h-4 w-4" />
                  Ao Vivo
                </button>
              </div>

              {/* ── Modalidades ── */}
              {cashSubTab === "modalidades" && (
                <div className="space-y-8">
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

              {/* ── Ao Vivo ── */}
              {cashSubTab === "aovivo" && (
                <div className="relative">
                  {/* Overlay "Em desenvolvimento" */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/60 backdrop-blur-[2px]">
                    <Radio className="h-10 w-10 text-[#5C0F08] mb-3" />
                    <span className="text-lg font-black text-[#2A0303] uppercase tracking-wide">Em desenvolvimento</span>
                    <span className="text-sm text-[#6b6660] mt-1">Esta funcionalidade estará disponível em breve.</span>
                  </div>

                  <div className="space-y-3 select-none pointer-events-none blur-[3px]">
                    <div className="flex items-center gap-2 px-1">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <span className="text-sm font-bold text-[#1a1a1a]">{LIVE_TABLES.length} mesas abertas agora</span>
                    </div>

                    <div className="space-y-2">
                      {LIVE_TABLES.map((table) => {
                        const isOmaha = table.modality === "Omaha";
                        return (
                          <div
                            key={table.id}
                            className="bg-white rounded-xl border border-[#e5e0d5] p-4 flex items-center gap-4"
                          >
                            <div className="shrink-0 h-10 w-10 rounded-full bg-[#f0eee9] flex items-center justify-center">
                              {isOmaha ? (
                                <Heart className="h-5 w-5 text-[#5C0F08] fill-current" />
                              ) : (
                                <Spade className="h-5 w-5 text-[#2A0303] fill-current" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-[#1a1a1a] text-sm">{table.modality}</span>
                                <span className="text-xs font-black text-[#5C0F08] bg-[#5C0F08]/10 px-2 py-0.5 rounded">
                                  {table.blind}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-[#6b6660]">
                                <span className="flex items-center gap-1">
                                  <CalendarClock className="h-3 w-3" />
                                  Aberta há {formatOpenTime(table.openMinutesAgo)}
                                </span>
                              </div>
                            </div>

                            <div className="shrink-0 px-4 py-2 rounded-lg text-xs font-bold bg-[#e5e0d5] text-[#8c8c8c]">
                              Reservar
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Reserve Modal */}
      {reserveTableId !== null && (() => {
        const table = LIVE_TABLES.find((t) => t.id === reserveTableId);
        if (!table) return null;
        return (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={closeReserveModal}
          >
            <div
              className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-[#e5e0d5] flex justify-between items-center rounded-t-2xl">
                <h2 className="text-base font-black text-[#1a1a1a] uppercase">
                  Reservar Mesa
                </h2>
                <button
                  type="button"
                  onClick={closeReserveModal}
                  className="p-1 -mr-2 text-[#8c8c8c] hover:text-[#1a1a1a] hover:bg-[#f0eee9] rounded-full transition-colors"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 py-5">
                {reserveSubmitted ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a1a]">Reserva confirmada!</h3>
                    <p className="text-sm text-[#6b6660]">
                      Mesa <strong>{table.modality} {table.blind}</strong> reservada para <strong>{reserveName}</strong>.
                    </p>
                    <button
                      onClick={closeReserveModal}
                      className="mt-4 px-6 py-2.5 bg-[#5C0F08] text-white rounded-xl font-bold text-sm hover:bg-[#7a1810] transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="bg-[#fcfaf6] rounded-xl p-4 border border-[#e5e0d5] mb-5 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white border border-[#e5e0d5] flex items-center justify-center shrink-0">
                        {table.modality === "Omaha" ? (
                          <Heart className="h-5 w-5 text-[#5C0F08] fill-current" />
                        ) : (
                          <Spade className="h-5 w-5 text-[#2A0303] fill-current" />
                        )}
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-[#1a1a1a]">{table.modality} {table.blind}</span>
                        <span className="block text-xs text-[#6b6660]">Aberta há {formatOpenTime(table.openMinutesAgo)}</span>
                      </div>
                    </div>

                    <form onSubmit={handleReserveSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="reserve-name" className="block text-xs font-bold text-[#6b6660] uppercase tracking-wider mb-1.5">
                          Nome completo
                        </label>
                        <input
                          id="reserve-name"
                          type="text"
                          required
                          minLength={2}
                          value={reserveName}
                          onChange={(e) => setReserveName(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full px-4 py-3 rounded-xl border border-[#e5e0d5] bg-white text-sm text-[#1a1a1a] placeholder:text-[#c5c0b8] focus:outline-none focus:ring-2 focus:ring-[#5C0F08] focus:border-transparent transition-shadow"
                        />
                      </div>
                      <div>
                        <label htmlFor="reserve-cpf" className="block text-xs font-bold text-[#6b6660] uppercase tracking-wider mb-1.5">
                          CPF
                        </label>
                        <input
                          id="reserve-cpf"
                          type="text"
                          required
                          inputMode="numeric"
                          value={reserveCpf}
                          onChange={(e) => setReserveCpf(formatCpfInput(e.target.value))}
                          placeholder="000.000.000-00"
                          className="w-full px-4 py-3 rounded-xl border border-[#e5e0d5] bg-white text-sm text-[#1a1a1a] placeholder:text-[#c5c0b8] focus:outline-none focus:ring-2 focus:ring-[#5C0F08] focus:border-transparent transition-shadow"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={reserveName.trim().length < 2 || reserveCpf.replace(/\D/g, "").length !== 11}
                        className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:bg-[#e5e0d5] disabled:text-[#8c8c8c] disabled:cursor-not-allowed bg-[#5C0F08] text-white hover:bg-[#7a1810] active:scale-[0.98] shadow-sm"
                      >
                        Confirmar Reserva
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}
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