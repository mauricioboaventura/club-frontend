import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  fetchRankingById,
  fetchRankingEntries,
  type RankingEntry,
} from "@/lib/api/rankings";

function MovementIcon({ movement }: { movement: string }) {
  if (movement === "up")
    return <TrendingUp className="h-4 w-4 text-emerald-600" />;
  if (movement === "down")
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-[#ccc]" />;
}

function PositionBadge({ position }: { position: number }) {
  if (position === 1)
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-600 font-bold text-sm">
        1
      </span>
    );
  if (position === 2)
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-400/15 text-gray-500 font-bold text-sm">
        2
      </span>
    );
  if (position === 3)
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-700/15 text-amber-700 font-bold text-sm">
        3
      </span>
    );
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center text-[#5f5a54] text-sm font-medium">
      {position}
    </span>
  );
}

function RankingTable({ entries }: { entries: RankingEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <Trophy className="h-12 w-12 text-[#ccc] mx-auto mb-4" />
        <p className="text-[#5f5a54] text-lg">
          Nenhuma entrada registrada neste ranking.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-black/10">
            <th className="text-left py-3 px-3 text-xs font-semibold text-[#5f5a54] uppercase tracking-wider w-16">
              Pos
            </th>
            <th className="text-center py-3 px-2 text-xs font-semibold text-[#5f5a54] uppercase tracking-wider w-12">
              Mov
            </th>
            <th className="text-left py-3 px-3 text-xs font-semibold text-[#5f5a54] uppercase tracking-wider">
              Jogador
            </th>
            <th className="text-right py-3 px-3 text-xs font-semibold text-[#5f5a54] uppercase tracking-wider">
              Pontos
            </th>
            <th className="text-right py-3 px-3 text-xs font-semibold text-[#5f5a54] uppercase tracking-wider hidden sm:table-cell">
              Etapas
            </th>
            <th className="text-right py-3 px-3 text-xs font-semibold text-[#5f5a54] uppercase tracking-wider hidden md:table-cell">
              Prêmio
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const isTop3 = entry.position <= 3;
            return (
              <tr
                key={entry.id}
                className={`border-b border-black/5 transition-colors hover:bg-[#f9f8f0] ${
                  isTop3 ? "bg-[#fdfcf7]" : ""
                }`}
              >
                <td className="py-3 px-3">
                  <PositionBadge position={entry.position} />
                </td>
                <td className="py-3 px-2 text-center">
                  <MovementIcon movement={entry.movement} />
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`text-sm font-medium ${
                      isTop3 ? "text-[#1a1a1a]" : "text-[#333]"
                    }`}
                  >
                    {entry.playerName}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="text-sm font-semibold text-[#1a1a1a]">
                    {entry.points.toLocaleString("pt-BR")}
                  </span>
                </td>
                <td className="py-3 px-3 text-right hidden sm:table-cell">
                  <span className="text-sm text-[#5f5a54]">{entry.stages}</span>
                </td>
                <td className="py-3 px-3 text-right hidden md:table-cell">
                  {entry.prize ? (
                    <span className="text-sm font-medium text-[#8b1a1a]">
                      {entry.prize}
                    </span>
                  ) : (
                    <span className="text-sm text-[#ccc]">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default async function RankingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [ranking, entries] = await Promise.all([
    fetchRankingById(params.id),
    fetchRankingEntries(params.id),
  ]);

  if (!ranking) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      {/* Hero */}
      <section className="relative bg-[#430904] pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 flex-shrink-0">
              <Trophy className="h-7 w-7 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {ranking.name}
              </h1>
              {ranking.description && (
                <p className="text-white/70 mt-1 text-sm sm:text-base">
                  {ranking.description}
                </p>
              )}
              {ranking.season && (
                <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-white/10 text-xs text-white/70">
                  {ranking.season}
                </span>
              )}
            </div>
          </div>

          {entries.length > 0 && (
            <div className="mt-6 flex gap-6 text-sm text-white/60">
              <span>
                <strong className="text-white/90">{entries.length}</strong> jogadores
              </span>
              {entries[0]?.prize && (
                <span>
                  Líder:{" "}
                  <strong className="text-white/90">
                    {entries[0].playerName}
                  </strong>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Tabela */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-20">
        <div className="rounded-xl bg-white border border-black/5 shadow-sm overflow-hidden">
          <RankingTable entries={entries} />
        </div>
      </section>
    </main>
  );
}
