"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { MapPin, Utensils, ChevronLeft, ChevronRight } from "lucide-react";
import {
  fetchRestaurantById,
  fetchWeeklyMenus,
  type Restaurant,
  type DailyMenu,
} from "@/lib/api/restaurants";
import MenuCard from "@/components/MenuCard";

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatWeekRange(monday: Date): string {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  return `${fmt(monday)} — ${fmt(sunday)}`;
}

export default function RestaurantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menus, setMenus] = useState<DailyMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekStart, setWeekStart] = useState<Date>(() => getMonday(new Date()));
  const [menusLoading, setMenusLoading] = useState(false);
  const [notFoundState, setNotFoundState] = useState(false);

  // Carregar restaurante uma vez
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const r = await fetchRestaurantById(params.id);
      if (!mounted) return;
      if (!r) {
        setNotFoundState(true);
      } else {
        setRestaurant(r);
      }
      setLoading(false);
    };
    load();
    return () => { mounted = false; };
  }, [params.id]);

  // Carregar cardápios da semana selecionada
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setMenusLoading(true);
      const data = await fetchWeeklyMenus(toDateString(weekStart), params.id);
      if (!mounted) return;
      setMenus(data);
      setMenusLoading(false);
    };
    load();
    return () => { mounted = false; };
  }, [weekStart, params.id]);

  const prevWeek = () => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const nextWeek = () => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const goToCurrentWeek = () => setWeekStart(getMonday(new Date()));

  const isCurrentWeek = useMemo(
    () => toDateString(weekStart) === toDateString(getMonday(new Date())),
    [weekStart],
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f9f8f0]">
        <div className="h-[50vh] min-h-[320px] bg-[#e5e0d5] animate-pulse" />
        <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
          <div className="h-6 w-1/3 rounded bg-[#e5e0d5] animate-pulse" />
          <div className="h-40 rounded-2xl bg-[#e5e0d5] animate-pulse" />
        </div>
      </main>
    );
  }

  if (notFoundState || !restaurant) {
    return (
      <main className="min-h-screen bg-[#f9f8f0] flex items-center justify-center">
        <p className="text-[#6b6660]">Restaurante não encontrado.</p>
      </main>
    );
  }

  const imageUrl =
    restaurant.imageUrl ??
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] w-full">
        <Image
          src={imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-wide">{restaurant.name}</h1>
          {restaurant.description && (
            <p className="mt-2 max-w-3xl text-sm text-white/90">
              {restaurant.description}
            </p>
          )}
        </div>
      </section>

      {/* Info */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        {restaurant.address && (
          <div className="flex items-center gap-2 rounded-2xl bg-white p-4 shadow-md border border-[#e5e0d5] text-sm text-[#6b6660]">
            <MapPin className="h-4 w-4 text-[#8b1a1a] shrink-0" />
            <span>{restaurant.address}</span>
          </div>
        )}
      </section>

      {/* Cardápios */}
      <section className="mx-auto max-w-4xl px-4 pb-24 lg:pb-16">
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="h-5 w-5 text-[#8b1a1a]" />
          <h2 className="font-serif text-lg lg:text-xl font-bold text-[#1a1a1a] leading-tight">Cardápios</h2>
        </div>

        {/* Navegação por semana */}
        <div className="flex items-center justify-between rounded-xl bg-white shadow-md border border-[#e5e0d5] px-4 py-3 mb-5">
          <button
            type="button"
            onClick={prevWeek}
            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#f5f0e8] text-[#1a1a1a] transition-colors"
            aria-label="Semana anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="text-center">
            <p className="text-sm font-semibold text-[#1a1a1a] capitalize">
              {formatWeekRange(weekStart)}
            </p>
            {!isCurrentWeek && (
              <button
                type="button"
                onClick={goToCurrentWeek}
                className="text-xs text-[#8b1a1a] font-medium hover:underline mt-0.5"
              >
                Voltar para semana atual
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={nextWeek}
            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#f5f0e8] text-[#1a1a1a] transition-colors"
            aria-label="Próxima semana"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Cardápios da semana */}
        {menusLoading ? (
          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-white overflow-hidden shadow-md border border-[#e5e0d5]"
              >
                <div className="h-14 bg-[#430904]/20" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-2/3 rounded bg-[#e5e0d5]" />
                  <div className="h-4 w-full rounded bg-[#e5e0d5]" />
                  <div className="h-4 w-1/2 rounded bg-[#e5e0d5]" />
                </div>
              </div>
            ))}
          </div>
        ) : menus.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-[#6b6660] shadow-md border border-[#e5e0d5]">
            Nenhum cardápio disponível para esta semana.
          </div>
        ) : (
          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            {menus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
