import Link from "next/link";
import { Trophy } from "lucide-react";
import { fetchActiveRankings } from "@/lib/api/rankings";

export default async function RankingsPage() {
  const rankings = await fetchActiveRankings();

  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      <section className="relative bg-[#430904] pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-wide text-white">
            Rankings
          </h1>
          <p className="text-white/80 mt-2 text-sm lg:text-base leading-relaxed">
            Acompanhe os rankings ativos do Monte Carlo Poker Club
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-20">
        {rankings.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="h-12 w-12 text-[#ccc] mx-auto mb-4" />
            <p className="text-[#6b6660] text-lg">
              Nenhum ranking disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rankings.map((ranking) => (
              <Link
                key={ranking.id}
                href={`/rankings/${ranking.id}`}
                className="group rounded-xl bg-white border border-black/5 p-6 shadow-sm transition-all hover:shadow-md hover:border-[#8b1a1a]/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8b1a1a]/10">
                    <Trophy className="h-5 w-5 text-[#8b1a1a]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#1a1a1a] group-hover:text-[#8b1a1a] transition-colors">
                    {ranking.name}
                  </h2>
                </div>
                {ranking.description && (
                  <p className="text-sm text-[#5f5a54] line-clamp-2">
                    {ranking.description}
                  </p>
                )}
                {ranking.season && (
                  <span className="inline-block mt-3 px-3 py-0.5 rounded-full bg-[#f9f8f0] text-xs text-[#5f5a54] border border-black/5">
                    {ranking.season}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
