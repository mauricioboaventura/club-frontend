"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Camera } from "lucide-react";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop",
    title: "Torneio Mensal",
    subtitle: "R$ 50.000 garantidos. Inscreva-se agora e garanta sua vaga.",
    cta: "Ver torneios",
  },
  {
    image: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&auto=format&fit=crop",
    title: "Cash Game 24h",
    subtitle: "Mesas disponíveis agora com diversos limites para todos os níveis.",
    cta: "Ver mesas",
  },
  {
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&auto=format&fit=crop",
    title: "Programa de Fidelidade",
    subtitle: "Ganhe pontos a cada mão jogada e troque por benefícios exclusivos.",
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

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=400&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
  "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
  "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=400&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=80",
];

const BG_BEIGE = "#f9f8f0";
const TEXT_DARK = "#1a1a1a";
const TEXT_MUTED = "#6b6660";

export default function PokerPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = (index: number) => {
    setHeroIndex(Math.max(0, Math.min(index, HERO_SLIDES.length - 1)));
  };

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
    <main className="min-h-screen pt-14 pb-20">
      <Header />

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
          {/* Pagination - bar progress style */}
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
                  className="h-full bg-white transition-all duration-300 ease-linear"
                  style={{ width: heroIndex === i ? "100%" : "0%" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content area - light beige */}
      <div className="max-w-[480px] mx-auto" style={{ background: BG_BEIGE }}>
        {/* Two feature cards */}
        <section className="p-4 grid grid-cols-2 gap-3">
          {FEATURE_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="relative aspect-square rounded-xl overflow-hidden block shadow-md"
            >
              <Image
                src={card.image}
                alt=""
                fill
                className="object-cover blur-[2px] brightness-75"
                sizes="(max-width: 480px) 50vw, 240px"
              />
              <div className="absolute inset-0 p-4 flex items-start justify-between">
                <span className="text-white font-semibold text-lg">
                  {card.title}
                </span>
                <ChevronRight
                  className="w-5 h-5 text-white shrink-0"
                  strokeWidth={2}
                />
              </div>
            </Link>
          ))}
        </section>

        {/* Text sections */}
        <section className="px-4 pb-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3" style={{ color: TEXT_DARK }}>
              Poker Monte Carlo
            </h3>
            <p
              className="text-[15px] leading-relaxed mb-4"
              style={{ color: TEXT_MUTED }}
            >
              Experimente o poker de alto nível no Monte Carlo Poker Club. Com
              mesas de cash game funcionando 24 horas e torneios diários,
              oferecemos a melhor experiência para jogadores de todos os níveis.
            </p>
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 480px) 100vw, 480px"
              />
            </div>
          </div>

          <div id="cash" className="mb-8">
            <h3 className="text-xl font-bold mb-3" style={{ color: TEXT_DARK }}>
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

          <div id="torneios" className="mb-8">
            <h3 className="text-xl font-bold mb-3" style={{ color: TEXT_DARK }}>
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

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3" style={{ color: TEXT_DARK }}>
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

        {/* Photo gallery */}
        <section className="px-4 pb-10">
          <h3
            className="text-xl font-bold mb-4 flex items-center gap-2"
            style={{ color: TEXT_DARK }}
          >
            <Camera
              className="h-5 w-5"
              style={{ color: TEXT_DARK }}
              strokeWidth={2}
            />
            Galeria de Fotos
          </h3>
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border text-sm"
              style={{ borderColor: "#ccc", color: TEXT_MUTED }}
            >
              Temas...
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border text-sm"
              style={{ borderColor: "#ccc", color: TEXT_MUTED }}
            >
              Ano...
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border text-sm"
              style={{ borderColor: "#ccc", color: TEXT_MUTED }}
            >
              Mês...
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {GALLERY_IMAGES.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 50vw, 240px"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="w-full mt-6 py-3.5 rounded-lg border-2 border-[#430904] text-[#430904] font-medium text-sm bg-transparent hover:bg-[#430904]/10 transition-colors"
          >
            Ver mais fotos
          </button>
        </section>
      </div>

      <Footer />
    </main>
  );
}
