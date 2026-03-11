"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
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
  dates: "01 a 06 de Abril de 2026",
  location: "Monte Carlo Poker Club",
  address: "São Paulo, SP",
  description:
    "Seis dias de ação intensa no felt. O Sigma Poker Tour reúne jogadores de todo o Brasil para uma experiência inesquecível de torneios, cash games e muito entretenimento. Garanta já sua vaga!",
};

type ScheduleEvent = {
  time: string;
  title: string;
  buyIn?: string;
  blind?: string;
  guaranteed?: string;
  stack?: string;
  late?: string;
  modality?: string;
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
    label: "Quarta",
    date: "01/04 — Quarta-feira",
    events: [
      {
        time: "15:00",
        title: "Silver Chips",
        buyIn: "R$ 70 Promo",
        blind: "20'",
        guaranteed: "R$ 15.000",
        stack: "20K",
        late: "8 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "16:00",
        title: "King's Tournament",
        buyIn: "R$ 900 Promo",
        blind: "30'/25'",
        guaranteed: "R$ 120.000",
        stack: "20K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "19:00",
        title: "Satélite de Abertura para o Evento Principal do SPT",
        buyIn: "R$ 300",
        blind: "20'",
        guaranteed: "3 vagas garantidas para o Evento Principal",
        stack: "20K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "22:00",
        title: "Poker Night Special Edition",
        buyIn: "R$ 100 Promo",
        blind: "20'/15'",
        guaranteed: "R$ 20.000",
        stack: "15K",
        late: "8 LVL",
        modality: "Unlimited Re-Entries",
      },
    ],
  },
  {
    day: 2,
    label: "Quinta",
    date: "02/04 — Quinta-feira",
    events: [
      {
        time: "15:00",
        title: "Silver Chips",
        buyIn: "R$ 70 Promo",
        blind: "20'",
        guaranteed: "R$ 15.000",
        stack: "20K",
        late: "8 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "18:00",
        title: "Evento Principal SPT — Promo Day",
        buyIn: "R$ 2.000",
        blind: "40'",
        guaranteed: "R$ 1 MILHÃO Garantido!",
        stack: "40K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "20:00",
        title: "Satélite para o Evento Principal do SPT",
        buyIn: "R$ 300",
        blind: "20'",
        guaranteed: "3 vagas garantidas para o Evento Principal",
        stack: "20K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "22:30",
        title: "Poker Night Special Edition",
        buyIn: "R$ 70 Promo",
        blind: "20'/15'",
        stack: "15K",
        late: "8 LVL",
        modality: "Unlimited Re-Entries",
      },
    ],
  },
  {
    day: 3,
    label: "Sexta",
    date: "03/04 — Sexta-feira",
    events: [
      {
        time: "14:00",
        title: "SPT Main Event — Day 1A",
        buyIn: "R$ 2.500",
        blind: "40'",
        guaranteed: "R$ 1 MILHÃO Garantido!",
        stack: "40K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "15:00",
        title: "Satélite para o SPT Main Event",
        buyIn: "R$ 300",
        blind: "20'",
        guaranteed: "5 vagas garantidas para o Evento Principal",
        stack: "20K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "20:00",
        title: "SPT Main Event — Day 1B Turbo",
        buyIn: "R$ 2.500",
        blind: "20'",
        guaranteed: "R$ 1 MILHÃO Garantido!",
        stack: "40K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "21:00",
        title: "SPT Welcome Drinks — Powered by ATFX",
      },
      {
        time: "22:00",
        title: "ATFX Cup (Somente Convidados) — Host: Romulo Dorea",
        buyIn: "Freeroll ou R$ 5.300",
        guaranteed: "Gold Coin, 1 pacote SPT Mania + R$ 25K",
        stack: "40K",
        late: "10 LVL",
        modality: "Freezeout",
      },
      {
        time: "22:30",
        title: "Poker Night — SPT Edition",
        buyIn: "R$ 100 Promo",
        blind: "20'/15'",
        guaranteed: "R$ 20.000",
        stack: "15K",
        modality: "Unlimited Re-Entries",
      },
    ],
  },
  {
    day: 4,
    label: "Sábado",
    date: "04/04 — Sábado",
    events: [
      {
        time: "11:00",
        title: "SPT Main Event — Day 1C",
        buyIn: "R$ 2.500",
        blind: "40'",
        guaranteed: "R$ 1 MILHÃO Garantido!",
        stack: "40K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "14:00",
        title: "Campeonato Sigma Cup",
        buyIn: "R$ 1.445",
        blind: "30'",
        stack: "25K",
        late: "10 LVL",
        modality: "Freeze Out",
      },
      {
        time: "16:00",
        title: "Sigma Divas",
        buyIn: "Freeroll",
        blind: "20'",
        guaranteed: "R$ 30.000 + 1 pacote Women's Championship PokerStars Malta",
        stack: "25K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "20:00",
        title: "SPT Main Event — Day 1D Turbo",
        buyIn: "R$ 2.500",
        blind: "20'",
        guaranteed: "R$ 1 MILHÃO Garantido!",
        stack: "40K",
        late: "10 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "22:30",
        title: "Poker Night Special Edition",
        buyIn: "R$ 100 Promo",
        blind: "20'/15'",
        guaranteed: "R$ 20.000",
        stack: "15K",
        late: "8 LVL",
        modality: "Unlimited Re-Entries",
      },
    ],
  },
  {
    day: 5,
    label: "Domingo",
    date: "05/04 — Domingo",
    events: [
      {
        time: "14:00",
        title: "SPT Main Event — Day 2 (15% ITM)",
        buyIn: "Registro Encerrado",
        blind: "50'",
      },
      {
        time: "15:00",
        title: "Mystery Bounty",
        buyIn: "R$ 500 + R$ 500",
        blind: "20'",
        guaranteed: "R$ 25.000 GTD + Pacote SPT México",
        stack: "20K",
        modality: "Freeze Out",
      },
      {
        time: "17:00",
        title: "Torneio da Pizza",
        buyIn: "R$ 150",
        blind: "20'/15'",
        guaranteed: "R$ 40.000",
        stack: "15K",
        late: "8 LVL",
        modality: "Unlimited Re-Entries",
      },
      {
        time: "21:00",
        title: "SPT Influencer Meet and Greet — Powered by ATFX",
      },
      {
        time: "22:00",
        title: "Poker Night Special Edition",
        buyIn: "R$ 70 Promo",
        blind: "20'/15'",
        guaranteed: "R$ 15.000",
        stack: "20K",
        late: "8 LVL",
        modality: "Unlimited Re-Entries",
      },
    ],
  },
  {
    day: 6,
    label: "Segunda",
    date: "06/04 — Segunda-feira",
    events: [
      {
        time: "14:00",
        title: "SPT Main — Dia 3 & Mesa Final",
        buyIn: "Registro Encerrado",
        blind: "50'",
        guaranteed: "R$ 1 MILHÃO Garantido!",
        modality: "9 Jogadores — Live Stream",
      },
      {
        time: "19:00",
        title: "Cubeia Platinum Freeroll (Somente Convidados)",
        buyIn: "Freeroll",
        blind: "20'",
        stack: "30K",
        late: "10 LVL",
        modality: "Freeze Out",
      },
      {
        time: "22:00",
        title: "SPT Last Chance",
        buyIn: "R$ 70 Promo",
        blind: "20'/15'",
        guaranteed: "R$ 10.000",
        stack: "15K",
        late: "8 LVL",
        modality: "Unlimited Re-Entries",
      },
    ],
  },
];

/* ─────────── Componente principal ─────────── */

export default function SigmaPokerTourPage() {
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    // Se o script já estiver carregado por outra página (navegação SPA),
    // o onLoad do Script não dispara — então inicializamos aqui diretamente.
    if (typeof (window as any).RDStationForms !== "undefined") {
      new (window as any).RDStationForms(
        "sigma-d22a495d576c4dcaefa5",
        "null"
      ).createForm();
    }
  }, []);

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
      <section className="relative min-h-[90vh] lg:min-h-[80vh] flex items-end mt-8">
        {/* Background — trocar pela imagem real quando disponível */}
        <div className="absolute inset-0 bg-[#1a0505]">
          {/* Desktop */}
          <Image
            src="https://ppvlzlzceuwxnishsotz.supabase.co/storage/v1/object/public/banners/banners-site-SiGMA-WEB-SPCity.png"
            alt="Sigma Poker Tour"
            fill
            className="object-cover object-top hidden md:block"
            priority
            sizes="100vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Mobile */}
          <Image
            src="https://ppvlzlzceuwxnishsotz.supabase.co/storage/v1/object/public/banners/banners-site-SiGMA-MOBILE-SPCity.png"
            alt="Sigma Poker Tour"
            fill
            className="object-cover object-top block md:hidden"
            priority
            sizes="100vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#1a0505]/50" />
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

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                icon: Calendar,
                label: "6 dias",
                sub: "de torneios intensos",
              },
              {
                icon: Trophy,
                label: "R$ 1M",
                sub: "garantidos no Evento Principal",
              },
              {
                icon: Star,
                label: "+30 torneios",
                sub: "incluindo satélites e side events",
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
          <div className="max-w-4xl mx-auto">
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
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 text-sm text-[#5f5a54]">
                      {evt.buyIn && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-[#1a1a1a]">
                            Buy-in:
                          </span>{" "}
                          {evt.buyIn}
                        </span>
                      )}
                      {evt.blind && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-[#1a1a1a]">
                            Blind:
                          </span>{" "}
                          {evt.blind}
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
                      {evt.stack && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-[#1a1a1a]">
                            Stack:
                          </span>{" "}
                          {evt.stack}
                        </span>
                      )}
                      {evt.late && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-[#1a1a1a]">
                            Late:
                          </span>{" "}
                          {evt.late}
                        </span>
                      )}
                    </div>
                    {evt.modality && (
                      <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#8b1a1a]/10 text-[#8b1a1a]">
                        {evt.modality}
                      </span>
                    )}
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

          <div role="main" id="sigma-d22a495d576c4dcaefa5" />
          <Script
            src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js"
            strategy="afterInteractive"
            onLoad={() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              new (window as any).RDStationForms(
                "sigma-d22a495d576c4dcaefa5",
                "null"
              ).createForm();
            }}
          />
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
                Main Event com R$ 1 milhão garantido
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
