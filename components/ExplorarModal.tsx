"use client";

import Image from "next/image";
import {
  X,
  Target,
  ChevronRight,
  Clock,
  Trophy,
  Star,
  Users,
} from "lucide-react";

const MODAL_BG = "#f9f8f0";
const FOREGROUND = "#1a1a1a";
const MUTED = "#6b6660";
const BORDER = "#e5e0d5";

type ExplorarModalProps = {
  onClose: () => void;
};

export default function ExplorarModal({ onClose }: ExplorarModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] animate-slide-up"
      style={{ background: MODAL_BG }}
    >
      <div className="h-full overflow-y-auto" style={{ background: MODAL_BG }}>
        {/* Sticky header */}
        <div
          className="sticky top-0 z-[100] border-b backdrop-blur-sm"
          style={{
            background: `${MODAL_BG}f2`,
            borderColor: BORDER,
          }}
        >
          <div className="flex items-center justify-between p-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 transition-colors hover:text-mc-gold"
              style={{ color: FOREGROUND }}
              aria-label="Fechar"
            >
              <X className="h-6 w-6" strokeWidth={2} />
            </button>
            <h1 className="font-semibold text-lg" style={{ color: FOREGROUND }}>
              Poker Monte Carlo
            </h1>
            <div className="w-6" aria-hidden />
          </div>
        </div>

        {/* Hero banner */}
        <div className="relative h-64">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#f9f8f0] via-[#f9f8f080] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: FOREGROUND }}
            >
              Poker Monte Carlo
            </h2>
            <p style={{ color: MUTED }}>
              A experiência definitiva em poker de alto nível
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          <p className="leading-relaxed" style={{ color: MUTED }}>
            O Monte Carlo Poker Club oferece a mais completa experiência em
            poker do Brasil. Com mesas de cash game funcionando 24 horas,
            torneios semanais com premiações expressivas e um programa de
            fidelidade exclusivo, você encontra aqui o ambiente perfeito para
            elevar seu jogo.
          </p>

          {/* Modalidades de Poker */}
          <section>
            <h3
              className="text-xl font-semibold mb-4 flex items-center gap-2"
              style={{ color: FOREGROUND }}
            >
              <Target className="h-5 w-5 text-mc-gold" strokeWidth={2} />
              Modalidades de Poker
            </h3>
            <div className="space-y-3">
              {[
                {
                  emoji: "🃏",
                  title: "Texas Hold'em",
                  desc: "A modalidade mais popular do mundo",
                },
                {
                  emoji: "🎴",
                  title: "Omaha",
                  desc: "Quatro cartas, mais ação",
                },
                {
                  emoji: "🎯",
                  title: "Short Deck",
                  desc: "Hold'em com baralho reduzido",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border shadow-sm flex items-center gap-4 p-4 bg-white"
                  style={{ borderColor: BORDER }}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold" style={{ color: FOREGROUND }}>
                      {item.title}
                    </h4>
                    <p className="text-sm" style={{ color: MUTED }}>
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-5 w-5 shrink-0"
                    style={{ color: MUTED }}
                    strokeWidth={2}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Cash Games */}
          <section>
            <h3
              className="text-xl font-semibold mb-4 flex items-center gap-2"
              style={{ color: FOREGROUND }}
            >
              <Clock className="h-5 w-5 text-mc-gold" strokeWidth={2} />
              Cash Games
            </h3>
            <div
              className="rounded-lg border shadow-sm overflow-hidden bg-white"
              style={{ borderColor: BORDER }}
            >
              <div className="h-32 relative">
                <Image
                  src="https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&q=80"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 480px) 100vw, 480px"
                />
              </div>
              <div className="p-4">
                <h4
                  className="font-semibold mb-2"
                  style={{ color: FOREGROUND }}
                >
                  Mesas Abertas 24h
                </h4>
                <p className="text-sm mb-4" style={{ color: MUTED }}>
                  Diversas mesas com blinds variados, do iniciante ao high
                  stakes. Venha jogar a qualquer hora.
                </p>
                {/* <button
                  type="button"
                  className="w-full h-10 px-4 py-2 rounded-md text-sm font-medium bg-mc-gold text-[#1a1a1a] hover:bg-mc-gold-light transition-colors"
                >
                  Ver mesas disponíveis
                </button> */}
              </div>
            </div>
          </section>

          {/* Torneios */}
          <section>
            <h3
              className="text-xl font-semibold mb-4 flex items-center gap-2"
              style={{ color: FOREGROUND }}
            >
              <Trophy className="h-5 w-5 text-mc-gold" strokeWidth={2} />
              Torneios
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: "Monte Carlo Weekly",
                  buyin: "R$ 500",
                  when: "Sábado, 20h",
                  garantido: "R$ 50.000",
                },
                {
                  title: "High Roller Sunday",
                  buyin: "R$ 2.000",
                  when: "Domingo, 19h",
                  garantido: "R$ 150.000",
                },
                {
                  title: "Freeroll Mensal",
                  buyin: "Gratuito",
                  when: "Último sábado do mês",
                  garantido: "R$ 10.000",
                },
              ].map((t) => (
                <div
                  key={t.title}
                  className="rounded-lg border shadow-sm p-4 bg-white"
                  style={{ borderColor: BORDER }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold" style={{ color: FOREGROUND }}>
                      {t.title}
                    </h4>
                    <span className="text-sm font-semibold text-mc-gold">
                      {t.buyin}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: MUTED }}>
                    {t.when}
                  </p>
                  <p className="text-sm text-mc-gold">
                    Garantido: {t.garantido}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full h-10 px-4 py-2 mt-4 rounded-md text-sm font-medium border border-mc-gold text-mc-gold bg-white hover:bg-mc-gold hover:text-[#1a1a1a] transition-colors"
            >
              Ver agenda completa
            </button>
          </section>

          {/* Programa de Fidelidade */}
          <section>
            <h3
              className="text-xl font-semibold mb-4 flex items-center gap-2"
              style={{ color: FOREGROUND }}
            >
              <Star className="h-5 w-5 text-mc-gold" strokeWidth={2} />
              Programa de Fidelidade
            </h3>
            <div
              className="rounded-lg border shadow-sm p-4 bg-gradient-to-br from-mc-gold/10 to-transparent"
              style={{ borderColor: "rgba(196,162,101,0.3)" }}
            >
              <h4 className="font-semibold mb-2" style={{ color: FOREGROUND }}>
                Monte Carlo Rewards
              </h4>
              <p className="text-sm mb-4" style={{ color: MUTED }}>
                Acumule pontos jogando e troque por buy-ins, experiências
                gastronômicas e convites para eventos exclusivos.
              </p>
              <button
                type="button"
                className="w-full h-10 px-4 py-2 rounded-md text-sm font-medium border border-mc-gold text-mc-gold bg-white hover:bg-mc-gold hover:text-[#1a1a1a] transition-colors"
              >
                Conhecer benefícios
              </button>
            </div>
          </section>

          {/* Poker Challenges */}
          <section className="pb-24">
            <h3
              className="text-xl font-semibold mb-4 flex items-center gap-2"
              style={{ color: FOREGROUND }}
            >
              <Users className="h-5 w-5 text-mc-gold" strokeWidth={2} />
              Poker Challenges
            </h3>
            <div
              className="rounded-lg border shadow-sm p-4 bg-white"
              style={{ borderColor: BORDER }}
            >
              <h4 className="font-semibold mb-2" style={{ color: FOREGROUND }}>
                Rankings & Desafios
              </h4>
              <p className="text-sm mb-4" style={{ color: MUTED }}>
                Participe de desafios especiais, suba no ranking mensal e
                dispute premiações exclusivas. Os melhores jogadores ganham
                reconhecimento e prêmios.
              </p>
              <button
                type="button"
                className="w-full h-10 px-4 py-2 rounded-md text-sm font-medium bg-mc-gold text-[#1a1a1a] hover:bg-mc-gold-light transition-colors"
              >
                Ver desafios ativos
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
