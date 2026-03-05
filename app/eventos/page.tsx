"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

const HERO_AUTOPLAY_MS = 4000;

const HERO_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=900&fit=crop",
    title: "Noite de Jazz Especial",
    description:
      "Aproveite uma noite de jazz especial no Monte Carlo com os melhores músicos da cidade!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=900&fit=crop",
    title: "Menu Degustação Especial",
    description:
      "Uma experiência gastronômica única com os chefs do Monte Carlo.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&h=900&fit=crop",
    title: "DJ Night Premium",
    description:
      "As melhores batidas para uma noite inesquecível no Monte Carlo",
  },
];

const EVENTOS = [
  {
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop",
    title: "Noite de Jazz",
    date: "15 de Fevereiro • 21:00",
    category: "Show",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop",
    title: "Menu Degustação Especial",
    date: "20 de Fevereiro • 20:00",
    category: "Gastronomia",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&auto=format&fit=crop",
    title: "DJ Night com Resident",
    date: "22 de Fevereiro • 23:00",
    category: "Nightlife",
  },
  {
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop",
    title: "Aniversário Monte Carlo",
    date: "28 de Fevereiro • 20:00",
    category: "Evento Especial",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop",
    title: "Live Music Friday",
    date: "1 de Março • 22:00",
    category: "Show",
  },
  {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop",
    title: "Wine & Dine Experience",
    date: "5 de Março • 19:30",
    category: "Gastronomia",
  },
];

export default function EventosPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = (index: number) => {
    setHeroIndex(Math.max(0, Math.min(index, HERO_SLIDES.length - 1)));
  };

  // Autoplay + progress bar (igual ao hero do Poker)
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
    <main className="min-h-screen bg-[#f9f8f0]">
      {/* Hero Carousel - autoplay */}
      <div
        className="relative w-full h-[85vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={heroTrackRef}
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${-heroIndex * 100}%, 0px, 0px)` }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative h-full"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 pb-12 px-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold tracking-wide text-white">
              {HERO_SLIDES[heroIndex].title}
            </h1>
            <p className="text-white/80 text-sm tracking-wide max-w-xs mx-auto">
              {HERO_SLIDES[heroIndex].description}
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 border px-4 py-2 w-full max-w-sm mx-auto h-12 text-base font-medium tracking-wide border-white/60 bg-transparent text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Garantir Entrada
            </button>
            <div className="flex justify-center gap-2 pt-2 w-full max-w-2xl mx-auto px-4">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goToSlide(i)}
                  className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
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
      </div>

      {/* Próximos Eventos */}
      <div className="bg-[#f9f8f0] max-w-[480px] mx-auto lg:max-w-7xl lg:px-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] px-4 pt-6 pb-4">
          Próximos Eventos
        </h2>
        <div className="flex gap-2 overflow-x-auto scroll-hidden px-4 pb-4 lg:justify-start">
          <button
            type="button"
            className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#8b1a1a]/30 bg-white text-[#1a1a1a] text-sm font-medium hover:bg-[#f5f0e8] transition-colors shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
            Filtrar
          </button>
          <button
            type="button"
            className="flex items-center gap-1 h-9 px-4 rounded-full border border-[#8b1a1a]/30 bg-white text-[#1a1a1a] text-sm font-medium hover:bg-[#f5f0e8] transition-colors shrink-0"
          >
            Categoria
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="flex items-center gap-1 h-9 px-4 rounded-full border border-[#8b1a1a]/30 bg-white text-[#1a1a1a] text-sm font-medium hover:bg-[#f5f0e8] transition-colors shrink-0"
          >
            Data
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <div className="px-4 space-y-4 pb-24 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0 lg:pb-16">
          {EVENTOS.map((evento, i) => (
            <Link
              key={i}
              href="#"
              className="bg-white overflow-hidden rounded-2xl border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow block"
            >
              <div className="relative h-48">
                <Image
                  src={evento.image}
                  alt={evento.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  <span className="w-5 h-1 bg-white rounded-full" />
                  <span className="w-1 h-1 bg-white/50 rounded-full" />
                  <span className="w-1 h-1 bg-white/50 rounded-full" />
                  <span className="w-1 h-1 bg-white/50 rounded-full" />
                  <span className="w-1 h-1 bg-white/50 rounded-full" />
                </div>
              </div>
              <div
                className="relative p-4 text-center overflow-hidden"
                style={{
                  backgroundImage: "url('/assets/mc-pattern-dark-CpniB2E9.jpeg')",
                  backgroundColor: "#1a1a1a",
                  backgroundSize: "cover",
                }}
              >
                <div className="relative z-10">
                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    {evento.title}
                  </h3>
                  <p className="text-white/70 text-sm">{evento.date}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <span className="inline-flex items-center rounded-full border border-white/30 px-2.5 py-0.5 text-xs font-semibold text-white/80 bg-transparent">
                      {evento.category}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
