"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Trophy,
  Clock,
  FileText,
  Award,
  BookOpen,
} from "lucide-react";
import {
  fetchPokerTournamentById,
  formatCentsToCompact,
  formatCentsToReal,
  formatTournamentTime,
  type PokerTournament,
} from "@/lib/api/poker-tournaments";
import { getTournamentDetails, type TournamentDetail } from "@/lib/poker-utils";

const BG_BEIGE = "#f9f8f0";

// ─── Blinds mock data ───────────────────────────────────────────────────────

type BlindLevel = { level: number; time: string; sb: string; bb: string; ante: string };
type BlindBreak = { breakLabel: string };
type BlindRow = BlindLevel | BlindBreak;

function isBreak(row: BlindRow): row is BlindBreak {
  return "breakLabel" in row;
}

function buildBlindStructure(minutesAfterEight: string): BlindRow[] {
  const t = minutesAfterEight; // "20 min" or "15 min"
  return [
    { level: 1, time: "20 min", sb: "100", bb: "200", ante: "200" },
    { level: 2, time: "20 min", sb: "200", bb: "300", ante: "300" },
    { level: 3, time: "20 min", sb: "200", bb: "400", ante: "400" },
    { level: 4, time: "20 min", sb: "300", bb: "500", ante: "500" },
    { level: 5, time: "20 min", sb: "300", bb: "600", ante: "600" },
    { level: 6, time: "20 min", sb: "400", bb: "800", ante: "800" },
    { level: 7, time: "20 min", sb: "500", bb: "1.000", ante: "1.000" },
    { level: 8, time: "20 min", sb: "600", bb: "1.200", ante: "1.200" },
    { breakLabel: "INTERVALO LATE REGISTER" },
    { level: 9, time: t, sb: "1.000", bb: "1.500", ante: "1.500" },
    { level: 10, time: t, sb: "1.000", bb: "2.000", ante: "2.000" },
    { level: 11, time: t, sb: "1.500", bb: "3.000", ante: "3.000" },
    { level: 12, time: t, sb: "2.000", bb: "4.000", ante: "4.000" },
    { level: 13, time: t, sb: "3.000", bb: "5.000", ante: "5.000" },
    { level: 14, time: t, sb: "3.000", bb: "6.000", ante: "6.000" },
    { level: 15, time: t, sb: "4.000", bb: "8.000", ante: "8.000" },
    { level: 16, time: t, sb: "5.000", bb: "10.000", ante: "10.000" },
    { level: 17, time: t, sb: "6.000", bb: "12.000", ante: "12.000" },
    { breakLabel: "INTERVALO | 10 MINUTOS" },
    { level: 18, time: t, sb: "10.000", bb: "15.000", ante: "15.000" },
    { level: 19, time: t, sb: "10.000", bb: "20.000", ante: "20.000" },
    { level: 20, time: t, sb: "10.000", bb: "25.000", ante: "25.000" },
    { level: 21, time: t, sb: "15.000", bb: "30.000", ante: "30.000" },
    { level: 22, time: t, sb: "20.000", bb: "40.000", ante: "40.000" },
    { level: 23, time: t, sb: "25.000", bb: "50.000", ante: "50.000" },
    { level: 24, time: t, sb: "30.000", bb: "60.000", ante: "60.000" },
    { level: 25, time: t, sb: "35.000", bb: "70.000", ante: "70.000" },
    { breakLabel: "INTERVALO | 10 MINUTOS" },
    { level: 26, time: t, sb: "40.000", bb: "80.000", ante: "80.000" },
    { level: 27, time: t, sb: "50.000", bb: "100.000", ante: "100.000" },
    { level: 28, time: t, sb: "60.000", bb: "120.000", ante: "120.000" },
    { level: 29, time: t, sb: "80.000", bb: "150.000", ante: "150.000" },
    { level: 30, time: t, sb: "100.000", bb: "200.000", ante: "200.000" },
    { level: 31, time: t, sb: "100.000", bb: "250.000", ante: "250.000" },
    { level: 32, time: t, sb: "150.000", bb: "300.000", ante: "300.000" },
    { level: 33, time: t, sb: "200.000", bb: "400.000", ante: "400.000" },
    { level: 34, time: t, sb: "250.000", bb: "500.000", ante: "500.000" },
    { level: 35, time: t, sb: "300.000", bb: "600.000", ante: "600.000" },
    { level: 36, time: t, sb: "400.000", bb: "800.000", ante: "800.000" },
    { level: 37, time: t, sb: "500.000", bb: "1.000.000", ante: "1.000.000" },
  ];
}



// ─── Tab types ──────────────────────────────────────────────────────────────

type DetailTab = "info" | "blinds" | "ranking" | "regulamento";

const TABS: { key: DetailTab; label: string; icon: React.ReactNode }[] = [
  { key: "info", label: "Informações", icon: <FileText className="h-4 w-4" /> },
  { key: "blinds", label: "Blinds", icon: <Clock className="h-4 w-4" /> },
  { key: "ranking", label: "Ranking", icon: <Award className="h-4 w-4" /> },
  { key: "regulamento", label: "Regulamento", icon: <BookOpen className="h-4 w-4" /> },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function TournamentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [tournament, setTournament] = useState<PokerTournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DetailTab>("info");

  useEffect(() => {
    if (!params.id) return;
    fetchPokerTournamentById(params.id).then((data) => {
      setTournament(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen mt-[56px] flex flex-col" style={{ background: BG_BEIGE }}>
        <div className="px-4 py-6 max-w-4xl mx-auto w-full space-y-6">
          {/* Back button skeleton */}
          <div className="h-5 w-32 rounded bg-[#e5e0d5] animate-pulse" />
          {/* Hero skeleton */}
          <div className="w-full aspect-[21/9] rounded-2xl bg-[#e5e0d5] animate-pulse" />
          {/* Stats skeleton */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-[#e5e0d5] animate-pulse" />
            ))}
          </div>
          {/* Tabs skeleton */}
          <div className="h-12 rounded-xl bg-[#e5e0d5] animate-pulse" />
          {/* Content skeleton */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 rounded bg-[#e5e0d5] animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!tournament) {
    return (
      <main className="min-h-screen mt-[56px] flex flex-col items-center justify-center" style={{ background: BG_BEIGE }}>
        <Trophy className="h-16 w-16 text-[#c5c0b8] mb-4" />
        <h1 className="text-xl font-bold text-[#2A0303] mb-2">Torneio não encontrado</h1>
        <p className="text-[#6b6660] text-sm mb-6">O torneio que você procura não existe ou foi removido.</p>
        <button
          onClick={() => router.push("/poker")}
          className="px-6 py-2.5 bg-[#5C0F08] text-white rounded-xl font-bold text-sm hover:bg-[#7a1810] transition-colors"
        >
          Voltar para Poker
        </button>
      </main>
    );
  }

  const details = getTournamentDetails(tournament);

  return (
    <main className="min-h-screen mt-[56px] flex flex-col" style={{ background: BG_BEIGE }}>
      {/* Cover image */}
      {tournament.coverImageUrl && (
        <div className="relative w-full aspect-[21/9] md:aspect-[21/7] max-h-72 bg-black">
          <Image
            src={tournament.coverImageUrl}
            alt={tournament.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="px-4 py-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Back button */}
        <button
          onClick={() => router.push("/poker")}
          className="flex items-center gap-1.5 text-sm font-bold text-[#6b6660] hover:text-[#5C0F08] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        {/* Tournament name */}
        <h1 className="text-xl sm:text-2xl font-black text-[#1a1a1a] uppercase leading-tight">
          {tournament.name}
        </h1>

        {/* Highlighted stats */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          <div className="bg-white rounded-xl p-3 lg:p-4 text-center border border-[#e5e0d5] shadow-sm">
            <span className="block text-[10px] lg:text-xs font-bold text-[#8c8c8c] uppercase tracking-wider mb-1">Buy-in</span>
            <span className="block text-base lg:text-xl font-black text-[#2A0303] leading-tight">
              {formatCentsToReal(tournament.buyInCents)}
            </span>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 lg:p-4 text-center border border-amber-200/60 shadow-sm">
            <span className="block text-[10px] lg:text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">Garantido</span>
            <span className="block text-base lg:text-xl font-black text-amber-600 leading-tight">
              {formatCentsToCompact(tournament.guaranteedPrizeCents)}
            </span>
          </div>
          <div className="bg-white rounded-xl p-3 lg:p-4 text-center border border-[#e5e0d5] shadow-sm">
            <span className="block text-[10px] lg:text-xs font-bold text-[#8c8c8c] uppercase tracking-wider mb-1">Horário</span>
            <span className="block text-base lg:text-xl font-black text-[#1a1a1a] leading-tight">
              {formatTournamentTime(tournament.startDate)}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#e5e0d5]/60 p-1 rounded-xl shadow-inner overflow-x-auto" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F08] whitespace-nowrap px-2 ${
                activeTab === tab.key
                  ? "bg-white text-[#2A0303] shadow-sm"
                  : "text-[#6b6660] hover:text-[#1a1a1a]"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        {activeTab === "info" && (
          <InfoPanel details={details} />
        )}

        {activeTab === "blinds" && (
          <BlindsPanel />
        )}

        {activeTab === "ranking" && (
          <PlaceholderPanel
            icon={<Award className="h-12 w-12 text-[#c5c0b8]" />}
            title="Ranking"
            message="Esta funcionalidade estará disponível em breve."
          />
        )}

        {activeTab === "regulamento" && (
          <PlaceholderPanel
            icon={<BookOpen className="h-12 w-12 text-[#c5c0b8]" />}
            title="Regulamento"
            message="O regulamento deste torneio ainda não está disponível."
          />
        )}
      </div>
    </main>
  );
}

// ─── Info Panel ─────────────────────────────────────────────────────────────

function InfoPanel({ details }: { details: TournamentDetail[] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e0d5] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 px-5 py-4">
        {details
          .filter((d) => d.label !== "Buy-in" && d.label !== "Garantido")
          .map((detail, index) => {
            const valueTone =
              detail.tone === "gold"
                ? "text-sm font-black text-amber-600"
                : detail.tone === "strong"
                  ? "text-sm font-black text-[#2A0303]"
                  : "text-sm font-bold text-[#1a1a1a]";

            return (
              <div
                key={`${detail.label}-${index}`}
                className="flex justify-between items-start gap-4 py-2.5 border-b border-[#f0eee9] last:border-b-0"
              >
                <span className="text-sm text-[#6b6660]">{detail.label}</span>
                <span className={`${valueTone} text-right`}>
                  {detail.value}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// ─── Blinds Panel ───────────────────────────────────────────────────────────

function BlindsPanel() {
  const rows = buildBlindStructure("20 min");

  return (
    <div className="bg-white rounded-2xl border border-[#e5e0d5] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#e5e0d5] bg-[#fcfaf6]">
        <span className="text-xs font-black uppercase tracking-wider text-[#5C0F08]">
          Estrutura de Blinds
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e5e0d5] bg-[#fcfaf6]">
              <th className="px-3 py-2.5 text-left text-[10px] font-black uppercase tracking-wider text-[#8c8c8c]">Nível</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-black uppercase tracking-wider text-[#8c8c8c]">Tempo</th>
              <th className="px-3 py-2.5 text-right text-[10px] font-black uppercase tracking-wider text-[#8c8c8c]">Small Blind</th>
              <th className="px-3 py-2.5 text-right text-[10px] font-black uppercase tracking-wider text-[#8c8c8c]">Big Blind</th>
              <th className="px-3 py-2.5 text-right text-[10px] font-black uppercase tracking-wider text-[#8c8c8c]">Ante</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              if (isBreak(row)) {
                return (
                  <tr key={`break-${idx}`} className="bg-[#5C0F08]/5">
                    <td colSpan={5} className="px-3 py-2.5 text-center">
                      <span className="text-[11px] font-black uppercase tracking-widest text-[#5C0F08]">
                        {row.breakLabel}
                      </span>
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={`level-${row.level}`}
                  className="border-b border-[#f0eee9] last:border-b-0 hover:bg-[#fcfaf6] transition-colors"
                >
                  <td className="px-3 py-2 font-bold text-[#2A0303]">
                    {String(row.level).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-2 text-[#6b6660]">{row.time}</td>
                  <td className="px-3 py-2 text-right font-medium text-[#1a1a1a]">{row.sb}</td>
                  <td className="px-3 py-2 text-right font-medium text-[#1a1a1a]">{row.bb}</td>
                  <td className="px-3 py-2 text-right font-medium text-[#1a1a1a]">{row.ante}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Placeholder Panel ──────────────────────────────────────────────────────

function PlaceholderPanel({
  icon,
  title,
  message,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e0d5] shadow-sm overflow-hidden">
      {/* Skeleton bars for visual effect */}
      <div className="px-5 pt-5 space-y-3 opacity-30">
        <div className="h-4 w-3/4 rounded bg-[#e5e0d5] animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-[#e5e0d5] animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-[#e5e0d5] animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-[#e5e0d5] animate-pulse" />
      </div>

      {/* Message */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
        {icon}
        <h3 className="text-lg font-bold text-[#2A0303] mt-3">{title}</h3>
        <p className="text-sm text-[#6b6660] mt-1 text-center">{message}</p>
      </div>
    </div>
  );
}
