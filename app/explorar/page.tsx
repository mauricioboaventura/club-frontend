"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import ExplorarModal from "@/components/ExplorarModal";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80",
    highlight: "POKER",
    title: "Monte Carlo Poker Club",
    subtitle: "A experiência definitiva em poker de alto nível",
  },
  {
    image:
      "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&q=80",
    highlight: "TORNEIOS",
    title: "Torneios Monte Carlo",
    subtitle: "Competições semanais com premiações exclusivas",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541278107931-e006523892df?w=800&q=80",
    highlight: "CASH GAME",
    title: "Cash Games 24h",
    subtitle: "Mesas abertas a qualquer hora do dia",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    highlight: "SHOWS",
    title: "Shows & Entretenimento",
    subtitle: "Noites memoráveis com artistas exclusivos",
  },
  {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    highlight: "GASTRONOMIA",
    title: "Gastronomia & Restaurantes",
    subtitle: "Alta gastronomia em ambiente exclusivo",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&q=80",
    highlight: "FIDELIDADE",
    title: "Programa de Fidelidade",
    subtitle: "Benefícios exclusivos para membros",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80",
    highlight: "CHALLENGE",
    title: "Poker Challenges",
    subtitle: "Desafios especiais com rankings e premiações",
  },
];

export default function ExplorarPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(
            (entry.target as HTMLElement).dataset.slideIndex,
          );
          if (!Number.isNaN(index)) setActiveIndex(index);
        });
      },
      { root: el, rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    const slides = el.querySelectorAll("[data-slide-index]");
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-black pb-20">
      <Header />
      {/* Carousel: full viewport, scrolls under transparent header */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {SLIDES.map((slide, index) => (
          <section
            key={index}
            data-slide-index={index}
            className="relative h-screen w-full snap-start snap-always flex flex-col justify-end"
          >
            {/* Background image - extends behind header */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={index < 2}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
                aria-hidden
              />
            </div>

            {/* Content - mesma altura em todos os cards */}
            <div
              className="absolute inset-0 flex flex-col justify-end px-6 z-10"
              style={{
                paddingBottom: "calc(12rem + env(safe-area-inset-bottom, 0px))",
              }}
            >
              <span className="text-mc-gold text-xs font-bold uppercase tracking-widest mb-3">
                {slide.highlight}
              </span>
              <h1 className="text-white text-3xl font-bold leading-tight mb-2">
                {slide.title}
              </h1>
              <p className="text-white/80 text-base mb-6 max-w-[80%]">
                {slide.subtitle}
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="self-start bg-mc-gold text-white font-semibold px-8 py-3 rounded-full hover:bg-mc-gold-light transition-all duration-300"
              >
                Explorar
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* Seta animada - borda inferior, só no primeiro slide */}
      {activeIndex === 0 && (
        <div
          className="fixed left-1/2 -translate-x-1/2 bottom-24 z-40 flex justify-center"
          aria-hidden
        >
          <span className="inline-block text-white/90 animate-bounce">
            <ChevronDown size={28} strokeWidth={2} />
          </span>
        </div>
      )}

      {modalOpen && (
        <ExplorarModal onClose={() => setModalOpen(false)} />
      )}

      {/* Right-side pagination: active = vertical gold pill, inactive = small circles */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            onClick={() => {
              containerRef.current?.children[index]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "h-4 bg-mc-gold"
                : "h-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
