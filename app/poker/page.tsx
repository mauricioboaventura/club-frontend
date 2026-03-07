"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { pokerTournaments } from "./poker-tournaments.service";

const HERO_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop",
    title: "Torneio Mensal",
    subtitle: "R$ 50.000 garantidos. Inscreva-se agora e garanta sua vaga.",
    cta: "Ver torneios",
  },
  {
    image:
      "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&auto=format&fit=crop",
    title: "Cash Game 24h",
    subtitle:
      "Mesas disponíveis agora com diversos limites para todos os níveis.",
    cta: "Ver mesas",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&auto=format&fit=crop",
    title: "Programa de Fidelidade",
    subtitle:
      "Ganhe pontos a cada mão jogada e troque por benefícios exclusivos.",
    cta: "Saiba mais",
  },
];

const FEATURE_CARDS = [
  {
    title: "Cash Game",
    image:
      "https://images.unsplash.com/photo-1541278107931-e006523892df?w=600&q=80",
    href: "/poker#cash",
  },
  {
    title: "Torneios",
    image:
      "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=600&q=80",
    href: "/poker#torneios",
  },
];

const HERO_AUTOPLAY_MS = 4000;
const BG_BEIGE = "#f9f8f0";
const TEXT_MUTED = "#6b6660";

export default function PokerPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = (index: number) => {
    setHeroIndex(Math.max(0, Math.min(index, HERO_SLIDES.length - 1)));
  };

  // Autoplay + progress bar
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / HERO_AUTOPLAY_MS) * 100, 100);
      setProgress(p);
    }, 50);

    const slideTimer = setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, HERO_AUTOPLAY_MS);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [heroIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(heroIndex + 1);
      else goToSlide(heroIndex - 1);
    }
  };

  return (
    <main className="min-h-screen mt-[56px]">
      {/* Hero Carousel - transform-based like reference HTML */}
      <div className="relative">
        <div
          className="relative w-full"
          role="region"
          aria-roledescription="carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              ref={heroTrackRef}
              className="flex -ml-4 transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${-heroIndex * 100}%, 0px, 0px)`,
              }}
            >
              {HERO_SLIDES.map((slide, index) => (
                <div
                  key={index}
                  role="group"
                  aria-roledescription="slide"
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4"
                >
                  <div className="relative h-72">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-12 left-4 right-4 text-center">
                      <h3 className="text-white font-bold text-xl mb-2">
                        {slide.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 leading-relaxed">
                        {slide.subtitle}
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border h-10 py-2 border-white text-white bg-transparent hover:bg-white hover:text-black rounded-lg px-6 transition-colors"
                      >
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Pagination - bar progress style (fills over 4s, then auto next) */}
          <div className="absolute bottom-3 left-4 right-4 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
                aria-label={`Slide ${i + 1}`}
              >
                <div
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{
                    width:
                      heroIndex === i
                        ? `${progress}%`
                        : heroIndex > i
                          ? "100%"
                          : "0%",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content area - light beige */}
      <div className="max-w-[480px] mx-auto " style={{ background: BG_BEIGE }}>
        {/* Two feature cards */}
        <section className="px-4 pt-4 grid grid-cols-2 gap-4 mb-8">
          {FEATURE_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="relative aspect-square overflow-hidden rounded-2xl block shadow-sm cursor-pointer group hover:scale-[1.02] transition-transform"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 480px) 50vw, 240px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <h3 className="text-white font-semibold">{card.title}</h3>
                <ChevronRight
                  className="w-5 h-5 text-white/80 shrink-0"
                  strokeWidth={2}
                />
              </div>
            </Link>
          ))}
        </section>

        {/* Text sections */}
        <section className="px-4 ">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-[#525252]">
              Poker Monte Carlo
            </h3>
            <p className="text-[16px] leading-relaxed mb-4 text-[#8c8c8c]">
              Experimente o poker de alto nível no Monte Carlo Poker Club. Com
              mesas de cash game funcionando 24 horas e torneios diários,
              oferecemos a melhor experiência para jogadores de todos os níveis.
            </p>
            <div className="relative w-full rounded-2xl h-[192px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80"
                alt=""
                fill
                className="object-cover"
                sizes=""
              />
            </div>
          </div>

          <div id="cash" className="mb-6">
            <h3 className="text-[18px] font-semibold mb-2 text-[#525252]">
              Cash Games
            </h3>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: TEXT_MUTED }}
            >
              Nossas mesas de cash game oferecem Texas Hold&apos;em e Omaha em
              diversos limites. Jogue quando quiser, pelo tempo que desejar, com
              a flexibilidade que só o cash game proporciona.
            </p>
          </div>

          <div id="torneios" className="mb-6">
            <h3 className="text-[18px] font-semibold mb-2 text-[#525252]">
              Torneios
            </h3>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: TEXT_MUTED }}
            >
              De sit-and-gos rápidos e torneios de grande premiação, nossa grade
              oferece competições para todos os perfis. Confira nossa agenda e
              participe dos melhores disputas da cidade.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-[18px] font-semibold mb-3 text-[#525252]">
              A Experiência do Jogador
            </h3>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: TEXT_MUTED }}
            >
              No Monte Carlo, cada detalhe foi pensado para sua comodidade:
              dealers profissionais, fichas de qualidade premium, ambiente
              climatizado e serviço de bar e restaurante à disposição.
            </p>
          </div>
        </section>

        <section className="px-4 pb-8">
          <h3 className="text-xl font-bold mb-4 text-[#525252]">Agenda de Torneios</h3>

          <div className="rounded-xl border border-[#5C0F08]/25 bg-white p-4 mb-4">
            <p className="text-[#525252] mb-1">
              <span className="font-bold">PROGRAMAÇÃO:</span> 24 horas por dia
            </p>
            <p className="text-[#525252]">
              <span className="font-bold">MODALIDADES:</span> Texas Hold&apos;em e Omaha
            </p>
          </div>

          <div className="space-y-3">
            {pokerTournaments.map((tournament) => (
              <article
                key={tournament.id}
                className="p-4 rounded-xl border border-[#5C0F08] bg-white shadow-sm"
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h4 className="font-semibold text-[#2A0303]">{tournament.name}</h4>
                  {tournament.highlight && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#5C0F08] text-white">
                      Destaque
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6b6660] mb-3">
                  {new Date(tournament.date).toLocaleDateString("pt-BR", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  • {tournament.time}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-[#e7e2da]">
                  <div>
                    <p className="text-xs text-[#6b6660]">Buy-in</p>
                    <p className="font-medium text-[#2A0303]">{tournament.buyIn}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6b6660]">Garantido</p>
                    <p className="font-medium text-[#5C0F08]">{tournament.guaranteed}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
