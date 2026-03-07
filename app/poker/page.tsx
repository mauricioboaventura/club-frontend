"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { List, Layers, X } from "lucide-react";
import {
  fetchPokerTournaments,
  formatCentsToReal,
  formatTournamentDate,
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

export default function PokerPage() {
  const [viewMode, setViewMode] = useState<"torneios" | "cashgame">("torneios");
  const [tournaments, setTournaments] = useState<PokerTournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<PokerTournament | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch tournaments from API
  useEffect(() => {
    fetchPokerTournaments().then((data) => {
      setTournaments(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen mt-[56px]">
      {/* Static Header */}
      <div className="relative">
        <div className="relative w-full h-56">
          <Image
            src="https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop"
            alt="Torneios"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
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
              onClick={() => setViewMode("cashgame")}
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

          {/* Torneios View */}
          {viewMode === "torneios" && (
            <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
              {loading ? (
                // Loading skeleton
                [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse p-4 rounded-xl border border-[#e5e0d5] shadow-sm bg-white"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="h-5 w-3/4 rounded bg-[#e5e0d5] mb-2" />
                        <div className="h-4 w-1/2 rounded bg-[#e5e0d5]" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#e5e0d5] mt-2">
                      <div className="flex-1">
                        <div className="h-3 w-12 rounded bg-[#e5e0d5] mb-1" />
                        <div className="h-5 w-20 rounded bg-[#e5e0d5]" />
                      </div>
                      <div className="flex-1 text-right">
                        <div className="h-3 w-16 rounded bg-[#e5e0d5] mb-1 ml-auto" />
                        <div className="h-5 w-24 rounded bg-[#e5e0d5] ml-auto" />
                      </div>
                    </div>
                  </div>
                ))
              ) : tournaments.length === 0 ? (
                <p className="col-span-full text-center text-[#6b6660] py-8 rounded-2xl bg-white shadow-md border border-[#e5e0d5]">
                  Nenhum torneio disponível no momento.
                </p>
              ) : (
                tournaments.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTournament(t)}
                  className="p-4 rounded-xl border border-[#5C0F08] shadow-sm cursor-pointer hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#1a1a1a]">{t.name}</h3>
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
    </main>
  );
}
