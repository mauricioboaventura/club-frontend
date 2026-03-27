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
  MessageSquareText,
} from "lucide-react";
import {
  fetchPokerTournamentById,
  formatCentsToCompact,
  formatCentsToReal,
  formatTournamentTime,
  type PokerTournament,
} from "@/lib/api/poker-tournaments";
import { getTournamentDetails, type TournamentDetail } from "@/lib/poker-utils";
import {
  fetchBlindStructureWithLevels,
  type BlindStructure,
} from "@/lib/api/blind-structures";

const BG_BEIGE = "#f9f8f0";

// ─── Tab types ──────────────────────────────────────────────────────────────

type DetailTab = "info" | "blinds";
// type DetailTab = "info" | "blinds" | "ranking" | "regulamento";

const TABS: { key: DetailTab; label: string; icon: React.ReactNode }[] = [
  { key: "info", label: "Informações", icon: <FileText className="h-4 w-4" /> },
  { key: "blinds", label: "Blinds", icon: <Clock className="h-4 w-4" /> },
  // { key: "ranking", label: "Ranking", icon: <Award className="h-4 w-4" /> },
  // { key: "regulamento", label: "Regulamento", icon: <BookOpen className="h-4 w-4" /> },
];

function getDefaultObservationByDate(startDate: string): string {
  const match = startDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const month = Number(match[2]);
    const day = Number(match[3]);
    if (month === 4 && day >= 1 && day <= 4) {
      return "Será jogado até 15% do field";
    }
  }

  return "Será premiado de 15% a 18% do field";
}

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
  const defaultObservation = getDefaultObservationByDate(tournament.startDate);

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
          <div className="rounded-xl p-3 lg:p-4 text-center border border-amber-400/70 shadow-md bg-gradient-to-b from-amber-100 to-amber-50 ring-1 ring-amber-300/40">
            <span className="block text-[10px] lg:text-xs font-black text-amber-600 uppercase tracking-wider mb-1">Garantido</span>
            <span className="block text-base lg:text-xl font-black text-amber-700 leading-tight">
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

        {/* Promo card — mobile only */}
        {tournament.buyPromoCents != null && tournament.buyPromoCents > 0 && (
          <div className="sm:hidden rounded-xl p-3 text-center border border-[#e5e0d5] shadow-sm bg-white">
            <span className="block text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: "#650201" }}>Buyin Promo 1º nível</span>
            <span className="block text-base font-black text-[#2A0303] leading-tight">
              {formatCentsToReal(tournament.buyPromoCents)}
            </span>
          </div>
        )}

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
          <>
            <InfoPanel details={details} />
            <ObservationsPanel observations={tournament.observations ?? defaultObservation} />
          </>
        )}

        {activeTab === "blinds" && (
          <BlindsPanel blindStructureId={tournament.blindStructureId ?? null} />
        )}

        {/* {activeTab === "ranking" && (
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
        )} */}
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
            if (detail.tone === "promo") {
              return (
                <div
                  key={`${detail.label}-${index}`}
                  className="col-span-full hidden sm:flex justify-between items-center gap-4 py-3 px-4 my-1 rounded-xl bg-emerald-50 border border-emerald-200/60"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-emerald-700">{detail.label}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-1.5 py-0.5 rounded">Promo</span>
                  </div>
                  <span className="text-sm font-black text-emerald-700 text-right">
                    {detail.value}
                  </span>
                </div>
              );
            }

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

// ─── Observations Panel ─────────────────────────────────────────────────────

function ObservationsPanel({ observations }: { observations: string | null }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e0d5] shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-[#e5e0d5] bg-[#fcfaf6] flex items-center gap-2">
        <MessageSquareText className="h-4 w-4 text-[#5C0F08]" />
        <span className="text-xs font-black uppercase tracking-wider text-[#5C0F08]">Observação</span>
      </div>
      <div className="px-5 py-4">
        <p className={`text-sm ${observations ? "text-[#1a1a1a]" : "text-[#8c8c8c] italic"}`}>
          {observations ?? "Sem observações"}
        </p>
      </div>
    </div>
  );
}

// ─── Blinds Panel ───────────────────────────────────────────────────────────

function formatNumber(value: number | null | undefined): string {
  if (value == null) return "—";
  return value.toLocaleString("pt-BR");
}

function BlindsPanel({ blindStructureId }: { blindStructureId: string | null }) {
  const [structure, setStructure] = useState<BlindStructure | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blindStructureId) {
      setLoading(false);
      return;
    }
    fetchBlindStructureWithLevels(blindStructureId).then((data) => {
      setStructure(data);
      setLoading(false);
    });
  }, [blindStructureId]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#e5e0d5] shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-[#e5e0d5] bg-[#fcfaf6]">
          <div className="h-4 w-40 rounded bg-[#e5e0d5] animate-pulse" />
        </div>
        <div className="px-5 py-4 space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-8 rounded bg-[#e5e0d5] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!structure || structure.blind_structure_levels.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#e5e0d5] shadow-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <Clock className="h-12 w-12 text-[#c5c0b8]" />
          <h3 className="text-lg font-bold text-[#2A0303] mt-3">Estrutura de Blinds</h3>
          <p className="text-sm text-[#6b6660] mt-1 text-center">
            A estrutura de blinds deste torneio ainda não está disponível.
          </p>
        </div>
      </div>
    );
  }

  const levels = [...structure.blind_structure_levels].sort(
    (a, b) => a.position - b.position,
  );

  return (
    <div className="bg-white rounded-2xl border border-[#e5e0d5] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#e5e0d5] bg-[#fcfaf6]">
        <span className="text-xs font-black uppercase tracking-wider text-[#5C0F08]">
          {structure.name}
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
            {levels.map((row) => {
              if (row.type === "break") {
                return (
                  <tr key={row.id} className="bg-[#5C0F08]/5">
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
                  key={row.id}
                  className="border-b border-[#f0eee9] last:border-b-0 hover:bg-[#fcfaf6] transition-colors"
                >
                  <td className="px-3 py-2 font-bold text-[#2A0303]">
                    {row.level != null ? String(row.level).padStart(2, "0") : "—"}
                  </td>
                  <td className="px-3 py-2 text-[#6b6660]">{row.duration ?? "—"}</td>
                  <td className="px-3 py-2 text-right font-medium text-[#1a1a1a]">{formatNumber(row.smallBlind)}</td>
                  <td className="px-3 py-2 text-right font-medium text-[#1a1a1a]">{formatNumber(row.bigBlind)}</td>
                  <td className="px-3 py-2 text-right font-medium text-[#1a1a1a]">{formatNumber(row.ante)}</td>
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
