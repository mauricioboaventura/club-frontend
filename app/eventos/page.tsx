"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

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
    <main className="min-h-screen bg-[#121212]">
      <Header />

      {/* Hero Carousel - 85vh */}
      <div className="relative w-full h-[85vh] overflow-hidden">
        <div
          ref={heroTrackRef}
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${-heroIndex * 100}%, 0px, 0px)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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
            <div className="flex justify-center gap-2 pt-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goToSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    heroIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Próximos Eventos - light bg */}
      <div className="bg-[#f9f8f0]">
        <h2 className="text-xl font-bold text-[#525252] px-4 pt-6 pb-4">
          Próximos Eventos
        </h2>
        <div className="flex gap-2 overflow-x-auto scroll-hidden px-4 pb-4">
          <button
            type="button"
            className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#430904]/30 bg-white text-[#1a1a1a] text-sm font-medium hover:bg-[#f5f0e8] transition-colors shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
            Filtrar
          </button>
          <button
            type="button"
            className="flex items-center gap-1 h-9 px-4 rounded-full border border-[#430904]/30 bg-white text-[#1a1a1a] text-sm font-medium hover:bg-[#f5f0e8] transition-colors shrink-0"
          >
            Categoria
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="flex items-center gap-1 h-9 px-4 rounded-full border border-[#430904]/30 bg-white text-[#1a1a1a] text-sm font-medium hover:bg-[#f5f0e8] transition-colors shrink-0"
          >
            Data
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <div className="px-4 space-y-4 pb-10">
          {EVENTOS.map((evento, i) => (
            <article
              key={i}
              className="bg-[#1e1e1e] overflow-hidden rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={evento.image}
                  alt={evento.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 100vw, 480px"
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((j) => (
                    <span
                      key={j}
                      className={`rounded-full ${
                        j === 0 ? "w-5 h-1 bg-white" : "w-1 h-1 bg-white/50"
                      }`}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
              <div
                className="relative p-4 text-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1e1e1e 0%, #252525 50%, #1a1a1a 100%)",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h4v4H0V0zm8 0h4v4H8V0zm8 0h4v4h-4V0zM0 8h4v4H0V8zm8 0h4v4H8V8zm8 0h4v4h-4V8zM0 16h4v4H0v-4zm8 0h4v4H8v-4zm8 0h4v4h-4v-4z' fill='%23333' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                }}
              >
                <div className="relative z-10 font-sans">
                  <h3 className="text-xl font-bold text-white mb-1">
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
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
