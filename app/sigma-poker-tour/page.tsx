"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  ChevronRight,
  Star,
  Spade,
} from "lucide-react";

/* ─────────── Dados estáticos do evento ─────────── */

const EVENT_INFO = {
  title: "Sigma Poker Tour",
  subtitle: "Onde os melhores talentos do poker se encontram para fazer história",
  dates: "03 a 07 de Abril de 2026",
  location: "Monte Carlo Poker Club",
  address: "São Paulo, SP",
  description:
    "Quatro dias de ação intensa no felt. O Sigma Poker Tour reúne jogadores de todo o Brasil para uma experiência inesquecível de torneios, cash games e muito entretenimento. Garanta já sua vaga!",
};

type ScheduleEvent = {
  time: string;
  title: string;
  buyIn?: string;
  guaranteed?: string;
};

type DaySchedule = {
  day: number;
  label: string;
  date: string;
  events: ScheduleEvent[];
};

const SCHEDULE: DaySchedule[] = [
  {
    day: 1,
    label: "Dia 1",
    date: "17/04 — Sexta-feira",
    events: [
      {
        time: "14:00",
        title: "Opening Event — NLH",
        buyIn: "R$ 500 + 50",
        guaranteed: "R$ 100.000",
      },
      {
        time: "17:00",
        title: "Satélite Main Event",
        buyIn: "R$ 200 + 20",
      },
      {
        time: "21:00",
        title: "Night Turbo — NLH",
        buyIn: "R$ 300 + 30",
        guaranteed: "R$ 50.000",
      },
    ],
  },
  {
    day: 2,
    label: "Dia 2",
    date: "18/04 — Sábado",
    events: [
      {
        time: "12:00",
        title: "Main Event — Day 1A",
        buyIn: "R$ 1.500 + 150",
        guaranteed: "R$ 500.000",
      },
      {
        time: "15:00",
        title: "High Roller — NLH",
        buyIn: "R$ 3.000 + 300",
        guaranteed: "R$ 200.000",
      },
      {
        time: "21:00",
        title: "Bounty Hunter — NLH",
        buyIn: "R$ 600 + 60",
        guaranteed: "R$ 80.000",
      },
    ],
  },
  {
    day: 3,
    label: "Dia 3",
    date: "19/04 — Domingo",
    events: [
      {
        time: "12:00",
        title: "Main Event — Day 1B",
        buyIn: "R$ 1.500 + 150",
        guaranteed: "R$ 500.000",
      },
      {
        time: "15:00",
        title: "Omaha Pot Limit",
        buyIn: "R$ 800 + 80",
        guaranteed: "R$ 60.000",
      },
      {
        time: "21:00",
        title: "Super Satélite Main Event",
        buyIn: "R$ 300 + 30",
      },
    ],
  },
  {
    day: 4,
    label: "Dia 4",
    date: "20/04 — Segunda-feira",
    events: [
      {
        time: "12:00",
        title: "Main Event — Day 2 (Final Day)",
        buyIn: "—",
        guaranteed: "R$ 500.000",
      },
      {
        time: "14:00",
        title: "Last Chance Turbo",
        buyIn: "R$ 400 + 40",
        guaranteed: "R$ 40.000",
      },
      {
        time: "20:00",
        title: "Encerramento & Premiação",
      },
    ],
  },
];

/* ─────────── Componente principal ─────────── */

export default function SigmaPokerTourPage() {
  const [activeDay, setActiveDay] = useState(0);

  function scrollToForm() {
    document
      .getElementById("inscricao")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-[#f9f8f0] text-[#1a1a1a]">
      {/* ── Navbar simples ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a0505]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-montecarlo.png"
              alt="Monte Carlo Poker Club"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={scrollToForm}
            className="text-sm font-semibold text-white bg-[#8b1a1a] hover:bg-[#a52222] px-5 py-2 rounded-full transition-colors"
          >
            Inscreva-se
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] lg:min-h-[80vh] flex items-end">
        {/* Background — trocar pela imagem real quando disponível */}
        <div className="absolute inset-0 bg-[#1a0505]">
          <Image
            src="https://ppvlzlzceuwxnishsotz.supabase.co/storage/v1/object/public/banners/banners-site-SiGMA-WEB-SPCity.png"
            alt="Sigma Poker Tour"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />

        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-16 pt-24">
          <span className="inline-flex items-center gap-1.5 text-[#e5b62a] text-sm font-semibold uppercase tracking-wider mb-4">
            <Trophy className="h-4 w-4" />
            Evento Exclusivo
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
            {EVENT_INFO.title}
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-white/85 max-w-2xl leading-relaxed">
            {EVENT_INFO.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#e5b62a]" />
              {EVENT_INFO.dates}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#e5b62a]" />
              {EVENT_INFO.location} — {EVENT_INFO.address}
            </span>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#8b1a1a] hover:bg-[#a52222] text-white font-bold rounded-full transition-colors text-base"
            >
              Garantir minha vaga
              <ChevronRight className="h-4 w-4" />
            </button>
            <a
              href="#agenda"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-full transition-colors text-base"
            >
              Ver programação
            </a>
          </div>
        </div>
      </section>

      {/* ── Sobre o Evento ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] text-center mb-4">
            Sobre o Evento
          </h2>
          <p className="text-center text-[#5f5a54] max-w-3xl mx-auto leading-relaxed mb-12">
            {EVENT_INFO.description}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                icon: Calendar,
                label: "4 dias",
                sub: "de torneios intensos",
              },
              {
                icon: Trophy,
                label: "R$ 500K",
                sub: "garantidos no Main Event",
              },
              {
                icon: Users,
                label: "500+",
                sub: "jogadores esperados",
              },
              {
                icon: Star,
                label: "10+",
                sub: "torneios programados",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#f9f8f0] border border-[#8b1a1a]/10"
              >
                <div className="w-12 h-12 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center mb-3">
                  <item.icon className="h-5 w-5 text-[#8b1a1a]" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-[#1a1a1a]">
                  {item.label}
                </span>
                <span className="text-sm text-[#5f5a54] mt-1">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agenda / Programação ── */}
      <section id="agenda" className="py-16 lg:py-24 bg-[#f9f8f0] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] text-center mb-4">
            Programação
          </h2>
          <p className="text-center text-[#5f5a54] mb-10">
            Confira os torneios e horários de cada dia
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2 scroll-hidden">
            {SCHEDULE.map((day, idx) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(idx)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeDay === idx
                    ? "bg-[#8b1a1a] text-white"
                    : "bg-white text-[#5f5a54] border border-[#8b1a1a]/15 hover:border-[#8b1a1a]/30"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>

          {/* Schedule content */}
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-sm font-medium text-[#8b1a1a] mb-6">
              {SCHEDULE[activeDay].date}
            </p>

            <div className="space-y-4">
              {SCHEDULE[activeDay].events.map((evt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-[#8b1a1a]/5"
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="text-lg font-bold text-[#8b1a1a]">
                      {evt.time}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#1a1a1a]">
                      {evt.title}
                    </h4>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-[#5f5a54]">
                      {evt.buyIn && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-[#1a1a1a]">
                            Buy-in:
                          </span>{" "}
                          {evt.buyIn}
                        </span>
                      )}
                      {evt.guaranteed && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-[#1a1a1a]">
                            GTD:
                          </span>{" "}
                          {evt.guaranteed}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA intermediário ── */}
      <section className="py-16 bg-[#1a0505] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Não fique de fora!
          </h2>
          <p className="text-white/75 mb-8 leading-relaxed">
            As vagas são limitadas. Preencha o formulário abaixo para garantir
            sua participação no Sigma Poker Tour e receber todas as informações
            em primeira mão.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#8b1a1a] hover:bg-[#a52222] text-white font-bold rounded-full transition-colors text-base"
          >
            Inscreva-se agora
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* ── Formulário de Inscrição (RD Station embed) ── */}
      <section
        id="inscricao"
        className="py-16 lg:py-24 bg-white scroll-mt-16"
      >
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] text-center mb-3">
            Inscreva-se
          </h2>
          <p className="text-center text-[#5f5a54] mb-10">
            Preencha seus dados para garantir sua vaga e receber atualizações
            do evento.
          </p>

          {/*
            ╔══════════════════════════════════════════════════════╗
            ║  FORMULÁRIO RD STATION — PLACEHOLDER                ║
            ║                                                      ║
            ║  Cole aqui o código embed gerado pelo RD Station.    ║
            ║  Campos esperados: Nome, Email, Telefone, CPF.       ║
            ║                                                      ║
            ║  O script do RD Station já está carregado globalmente ║
            ║  no layout.tsx. Basta colar o HTML do formulário.     ║
            ╚══════════════════════════════════════════════════════╝
          */}
          <div
            id="rd-station-form"
            className="min-h-[400px] rounded-2xl border-2 border-dashed border-[#8b1a1a]/20 bg-[#f9f8f0] flex items-center justify-center p-8"
          >
            <div className="text-center text-[#5f5a54]">
              <div className="w-16 h-16 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-[#8b1a1a]" />
              </div>
              <p className="font-semibold text-[#1a1a1a] mb-1">
                Formulário de inscrição
              </p>
              <p className="text-sm">
                O formulário do RD Station será exibido aqui.
              </p>
              <p className="text-xs mt-2 text-[#5f5a54]/60">
                Cole o código embed do RD Station dentro desta div.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Informações adicionais ── */}
      <section className="py-16 bg-[#f9f8f0]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 border border-[#8b1a1a]/10">
              <MapPin className="h-6 w-6 text-[#8b1a1a] mb-3" />
              <h3 className="font-bold text-[#1a1a1a] mb-2">Local</h3>
              <p className="text-sm text-[#5f5a54] leading-relaxed">
                {EVENT_INFO.location}
                <br />
                {EVENT_INFO.address}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 border border-[#8b1a1a]/10">
              <Clock className="h-6 w-6 text-[#8b1a1a] mb-3" />
              <h3 className="font-bold text-[#1a1a1a] mb-2">Horários</h3>
              <p className="text-sm text-[#5f5a54] leading-relaxed">
                Torneios a partir das 12h
                <br />
                Portas abertas 1h antes de cada evento
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 border border-[#8b1a1a]/10">
              <Trophy className="h-6 w-6 text-[#8b1a1a] mb-3" />
              <h3 className="font-bold text-[#1a1a1a] mb-2">Premiação</h3>
              <p className="text-sm text-[#5f5a54] leading-relaxed">
                Mais de R$ 1 milhão em premiação
                <br />
                Main Event com R$ 500K garantidos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer simplificado ── */}
      <footer className="bg-[#1a0505] text-white/60 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/images/logo-montecarlo.png"
              alt="Monte Carlo Poker Club"
              width={140}
              height={36}
              className="h-9 w-auto mx-auto"
            />
          </Link>
          <p className="text-sm mb-2">
            {EVENT_INFO.title} — {EVENT_INFO.dates}
          </p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Monte Carlo Poker Club. Todos os
            direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
