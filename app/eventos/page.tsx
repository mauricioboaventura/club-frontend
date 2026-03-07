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

const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    id: "fallback-1",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=900&fit=crop",
    imageAlt: "Noite de Jazz Especial",
    title: "Noite de Jazz Especial",
    subtitle:
      "Aproveite uma noite de jazz especial no Monte Carlo com os melhores músicos da cidade!",
    cta: "Garantir Entrada",
    ctaLink: "#",
  },
  {
    id: "fallback-2",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=900&fit=crop",
    imageAlt: "Menu Degustação Especial",
    title: "Menu Degustação Especial",
    subtitle:
      "Uma experiência gastronômica única com os chefs do Monte Carlo.",
    cta: "Garantir Entrada",
    ctaLink: "#",
  },
  {
    id: "fallback-3",
    image:
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&h=900&fit=crop",
    imageAlt: "DJ Night Premium",
    title: "DJ Night Premium",
    subtitle:
      "As melhores batidas para uma noite inesquecível no Monte Carlo",
    cta: "Garantir Entrada",
    ctaLink: "#",
  },
];

const FALLBACK_EVENTOS: EventItem[] = [
  {
    id: "fallback-e1",
    categoryId: null,
    title: "Noite de Jazz",
    slug: "noite-de-jazz",
    description: null,
    shortDescription: null,
    coverImageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop",
    startDate: "2026-02-15T21:00:00",
    endDate: null,
    location: null,
    priceInfo: null,
    isFeatured: false,
    isActive: true,
    tags: null,
    event_categories: { id: "cat-show", name: "Show", slug: "show", color: null },
  },
  {
    id: "fallback-e2",
    categoryId: null,
    title: "Menu Degustação Especial",
    slug: "menu-degustacao",
    description: null,
    shortDescription: null,
    coverImageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop",
    startDate: "2026-02-20T20:00:00",
    endDate: null,
    location: null,
    priceInfo: null,
    isFeatured: false,
    isActive: true,
    tags: null,
    event_categories: {
      id: "cat-gastro",
      name: "Gastronomia",
      slug: "gastronomia",
      color: null,
    },
  },
  {
    id: "fallback-e3",
    categoryId: null,
    title: "DJ Night com Resident",
    slug: "dj-night-resident",
    description: null,
    shortDescription: null,
    coverImageUrl:
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&auto=format&fit=crop",
    startDate: "2026-02-22T23:00:00",
    endDate: null,
    location: null,
    priceInfo: null,
    isFeatured: false,
    isActive: true,
    tags: null,
    event_categories: {
      id: "cat-nightlife",
      name: "Nightlife",
      slug: "nightlife",
      color: null,
    },
  },
];

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
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const slides = heroSlides.length > 0 ? heroSlides : FALLBACK_HERO_SLIDES;

  const categoriasMap = useMemo(
    () => new Map(categorias.map((categoria) => [categoria.id, categoria.name])),
    [categorias]
  );

  const categoriasDisponiveis = useMemo(() => {
    const fromApi = categorias.map((c) => c.name);
    const fromEvents = (eventos.length > 0 ? eventos : FALLBACK_EVENTOS)
      .map(
        (evento) =>
          evento.event_categories?.name ??
          (evento.categoryId ? categoriasMap.get(evento.categoryId) : undefined)
      )
      .filter((categoria): categoria is string => Boolean(categoria));

    return ["Todas", ...Array.from(new Set([...fromApi, ...fromEvents]))];
  }, [categorias, categoriasMap, eventos]);

  const eventosFiltrados = useMemo(() => {
    const source = eventos.length > 0 ? eventos : FALLBACK_EVENTOS;

    return source.filter((evento) => {
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
    setHeroIndex(Math.max(0, Math.min(index, slides.length - 1)));
  };

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      const pageData = await fetchEventosPage();
      if (!isMounted) return;

      setHeroSlides(pageData.heroBanners);
      setEventos(pageData.events);
      setCategorias(pageData.eventCategories);
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (heroIndex > slides.length - 1) {
      setHeroIndex(0);
    }
  }, [heroIndex, slides.length]);

  // Autoplay + progress bar (igual ao hero do Poker)
  useEffect(() => {
    if (slides.length === 0) return;
    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / HERO_AUTOPLAY_MS) * 100, 100);
      setProgress(p);
    }, 50);

    const slideTimer = setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % slides.length);
    }, HERO_AUTOPLAY_MS);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [heroIndex, slides.length]);

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
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-[0_0_100%] min-w-0 relative h-full"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt ?? slide.title}
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
              {slides[heroIndex]?.title}
            </h1>
            <p className="text-white/80 text-sm tracking-wide max-w-xs mx-auto">
              {slides[heroIndex]?.subtitle}
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 border px-4 py-2 w-full max-w-sm mx-auto h-12 text-base font-medium tracking-wide border-white/60 bg-transparent text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Garantir Entrada
            </button>
            <div className="flex justify-center gap-2 pt-2 w-full max-w-2xl mx-auto px-4">
              {slides.map((slide, i) => (
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

      {/* Próximos Eventos */}
      <div className="bg-[#f9f8f0] max-w-[480px] mx-auto lg:max-w-7xl lg:px-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] px-4 pt-6 pb-4">
          Próximos Eventos
        </h2>
        <div className="grid grid-cols-1 gap-3 px-4 pb-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => {
              setCategoriaSelecionada("Todas");
              setDataSelecionada("Todas as datas");
            }}
            className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#8b1a1a]/30 bg-white text-[#1a1a1a] text-sm font-medium hover:bg-[#f5f0e8] transition-colors shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
            Limpar filtros
          </button>
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
        </div>
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
            <div className="col-span-full rounded-2xl bg-white p-8 text-center text-[#6b6660]">
              Nenhum evento encontrado para os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
