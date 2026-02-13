"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Camera } from "lucide-react";
import SelectFilter from "@/components/SelectFilter";

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

const TORNEIO_OPTIONS = [
  "Todos os torneios",
  "Monte Carlo Weekly",
  "High Roller Sunday",
  "Freeroll Mensal",
  "Main Event",
  "Deepstack",
];
const ANO_OPTIONS = ["Todos", "2026", "2025", "2024"];
const MES_OPTIONS = [
  "Todos os meses",
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function PokerPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [torneio, setTorneio] = useState(TORNEIO_OPTIONS[0]);
  const [ano, setAno] = useState(ANO_OPTIONS[0]);
  const [mes, setMes] = useState(MES_OPTIONS[0]);
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

        {/* Photo gallery */}
        <section className=" pb-8">
          <h3 className="text-xl px-4 font-bold mb-4 flex items-center gap-2 text-[#525252]">
            <Camera className="h-5 w-5" color="#525252" strokeWidth={2} />
            Galeria de Fotos
          </h3>
          <div className="flex px-4 gap-4 mb-4 flex-wrap">
            <div className="flex-1 min-w-[120px]">
              <SelectFilter
                label="Torneio"
                options={TORNEIO_OPTIONS}
                value={torneio}
                onChange={setTorneio}
                placeholder="Todos os..."
              />
            </div>
            <div className="flex-1 min-w-[100px]">
              <SelectFilter
                label="Ano"
                options={ANO_OPTIONS}
                value={ano}
                onChange={setAno}
                placeholder="Todos"
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              <SelectFilter
                label="Mês"
                options={MES_OPTIONS}
                value={mes}
                onChange={setMes}
                placeholder="Todos os..."
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i} className="relative aspect-[1/1] overflow-hidden">
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
          <div className="px-4">
            <button
              type="button"
              className="w-full mt-6 py-2 rounded-lg border border-[#430904] text-[#430904] font-medium text-sm bg-transparent hover:bg-[#430904]/10 transition-colors"
            >
              Ver mais fotos
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
