"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import SelectFilter from "@/components/SelectFilter";
import type { HeroSlide } from "@/lib/api/banners";
import {
  fetchEventosPage,
  type EventItem,
  type EventCategory,
} from "@/lib/api/pages";

const HERO_AUTOPLAY_MS = 4000;

const DATE_OPTIONS = ["Todas as datas", "Hoje", "Próximos 7 dias", "Este mês"];

function formatEventDate(date: string | null): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function matchesDateFilter(startDate: string | null, filter: string): boolean {
  if (!startDate || filter === "Todas as datas") return true;
  const date = new Date(startDate);
  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();

  if (filter === "Hoje") {
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  }

  if (filter === "Próximos 7 dias") {
    const sevenDaysAhead = new Date(now);
    sevenDaysAhead.setDate(now.getDate() + 7);
    return date >= now && date <= sevenDaysAhead;
  }

  if (filter === "Este mês") {
    return (
      date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
    );
  }

  return true;
}

export default function EventosPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [eventos, setEventos] = useState<EventItem[]>([]);
  const [categorias, setCategorias] = useState<EventCategory[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [dataSelecionada, setDataSelecionada] = useState("Todas as datas");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const categoriasMap = useMemo(
    () => new Map(categorias.map((categoria) => [categoria.id, categoria.name])),
    [categorias]
  );

  const categoriasDisponiveis = useMemo(() => {
    const fromApi = categorias.map((c) => c.name);
    const fromEvents = eventos
      .map(
        (evento) =>
          evento.event_categories?.name ??
          (evento.categoryId ? categoriasMap.get(evento.categoryId) : undefined)
      )
      .filter((categoria): categoria is string => Boolean(categoria));

    return ["Todas", ...Array.from(new Set([...fromApi, ...fromEvents]))];
  }, [categorias, categoriasMap, eventos]);

  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) => {
      const categoriaEvento =
        evento.event_categories?.name ??
        (evento.categoryId ? categoriasMap.get(evento.categoryId) : undefined) ??
        "Sem categoria";

      const matchesCategoria =
        categoriaSelecionada === "Todas" || categoriaEvento === categoriaSelecionada;
      const matchesData = matchesDateFilter(evento.startDate, dataSelecionada);

      return matchesCategoria && matchesData;
    });
  }, [categoriaSelecionada, categoriasMap, dataSelecionada, eventos]);

  const goToSlide = (index: number) => {
    setHeroIndex(Math.max(0, Math.min(index, heroSlides.length - 1)));
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      const pageData = await fetchEventosPage();
      if (!isMounted) return;

      setHeroSlides(pageData.heroBanners);
      setEventos(pageData.events);
      setCategorias(pageData.eventCategories);
      setLoading(false);
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (heroIndex > heroSlides.length - 1) {
      setHeroIndex(0);
    }
  }, [heroIndex, heroSlides.length]);

  // Autoplay + progress bar (igual ao hero do Poker)
  useEffect(() => {
    if (heroSlides.length === 0) return;
    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / HERO_AUTOPLAY_MS) * 100, 100);
      setProgress(p);
    }, 50);

    const slideTimer = setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, HERO_AUTOPLAY_MS);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [heroIndex, heroSlides.length]);

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
      {loading ? (
        <div className="relative w-full h-[50vh] min-h-[320px] overflow-hidden bg-[#e5e0d5] animate-pulse">
          <div className="absolute inset-x-0 bottom-0 pb-12 px-6">
            <div className="text-center space-y-4">
              <div className="h-8 w-64 bg-white/20 rounded mx-auto" />
              <div className="h-4 w-80 bg-white/20 rounded mx-auto" />
              <div className="h-12 w-80 bg-white/20 rounded-lg mx-auto" />
            </div>
          </div>
        </div>
      ) : heroSlides.length === 0 ? (
        <div className="relative w-full h-[50vh] min-h-[320px] overflow-hidden bg-gradient-to-b from-[#430904] to-[#2a0303]">
          <div className="absolute inset-x-0 bottom-0 pb-12 px-6">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold tracking-wide text-white">
                Eventos Monte Carlo
              </h1>
              <p className="text-white/80 text-sm tracking-wide max-w-xs mx-auto">
                Acompanhe os próximos eventos
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="relative w-full h-[50vh] min-h-[320px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={heroTrackRef}
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translate3d(${-heroIndex * 100}%, 0px, 0px)` }}
          >
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className="flex-[0_0_100%] min-w-0 relative h-full"
              >
                <Image
                  src={isMobile && slide.mobileImage ? slide.mobileImage : slide.image}
                  alt={slide.imageAlt ?? slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0" />
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 pb-12 px-6">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold tracking-wide text-white">
                {heroSlides[heroIndex]?.title}
              </h1>
              <p className="text-white/80 text-sm tracking-wide max-w-xs mx-auto">
                {heroSlides[heroIndex]?.subtitle}
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 border px-4 py-2 w-full max-w-sm mx-auto h-12 text-base font-medium tracking-wide border-white/60 bg-transparent text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Garantir Entrada
              </button>
              <div className="flex justify-center gap-2 pt-2 w-full max-w-2xl mx-auto px-4">
                {heroSlides.length > 1 && heroSlides.map((slide, i) => (
                  <button
                    key={slide.id}
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
      )}

      {/* Próximos Eventos */}
      <div className="bg-[#f9f8f0] max-w-[480px] mx-auto lg:max-w-7xl lg:px-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] px-4 pt-6 pb-4">
          Próximos Eventos
        </h2>
        <div className="grid grid-cols-2 gap-3 px-4 pb-4 md:grid-cols-3">
          <SelectFilter
            label="Categoria"
            options={categoriasDisponiveis}
            value={categoriaSelecionada}
            onChange={setCategoriaSelecionada}
          />
          <SelectFilter
            label="Data"
            options={DATE_OPTIONS}
            value={dataSelecionada}
            onChange={setDataSelecionada}
          />
          {/* <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#6b6660]">Filtros:</span>
            <button
              type="button"
              onClick={() => {
                setCategoriaSelecionada("Todas");
                setDataSelecionada("Todas as datas");
              }}
              className="flex items-center gap-2 h-9 px-3 rounded-md border border-[#e5e0d5] bg-white text-[#1a1a1a] text-xs font-medium hover:bg-[#f5f0e8] transition-colors shrink-0"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
              Limpar filtros
            </button>
          </div> */}
        </div>

        {loading ? (
          <div className="px-4 space-y-4 pb-24 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0 lg:pb-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-white overflow-hidden shadow-sm border border-[#e5e0d5]"
              >
                <div className="h-48 bg-[#e5e0d5]" />
                <div className="p-4 space-y-3">
                  <div className="h-6 w-3/4 rounded bg-[#e5e0d5] mx-auto" />
                  <div className="h-4 w-1/2 rounded bg-[#e5e0d5] mx-auto" />
                  <div className="h-6 w-20 rounded-full bg-[#e5e0d5] mx-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 space-y-4 pb-24 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0 lg:pb-16">
            {eventosFiltrados.map((evento) => {
              const categoriaEvento =
                evento.event_categories?.name ??
                (evento.categoryId ? categoriasMap.get(evento.categoryId) : undefined) ??
                "Sem categoria";

              return (
                <Link
                  key={evento.id}
                  href={`/eventos/${evento.id}`}
                  className="bg-white overflow-hidden rounded-2xl border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow block"
                >
                  <div className="relative h-48">
                    <Image
                      src={
                        evento.coverImageUrl ??
                        evento.event_images?.[0]?.imageUrl ??
                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop"
                      }
                      alt={evento.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
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
                      <p className="text-white/70 text-sm">
                        {formatEventDate(evento.startDate)}
                      </p>
                      <div className="flex justify-center gap-2 mt-3">
                        <span className="inline-flex items-center rounded-full border border-white/30 px-2.5 py-0.5 text-xs font-semibold text-white/80 bg-transparent">
                          {categoriaEvento}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            {eventosFiltrados.length === 0 && (
              <div className="col-span-full rounded-2xl bg-white p-8 text-center text-[#6b6660] shadow-md border border-[#e5e0d5]">
                Nenhum evento encontrado para os filtros selecionados.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
