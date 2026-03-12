"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import {
  fetchActiveRestaurants,
  type Restaurant,
} from "@/lib/api/restaurants";

const FALLBACK_IMAGE =
  "https://ppvlzlzceuwxnishsotz.supabase.co/storage/v1/object/public/gallery-photos/photo-1559339352-11d035aa65de.jpeg";

export default function GastronomiaPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const data = await fetchActiveRestaurants();
      if (mounted) {
        setRestaurants(data);
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] w-full overflow-hidden">
        <video
          src="/images/video/GASTRONOMIA.mov"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h1 className="text-3xl font-bold tracking-wide text-white">
            Gastronomia
          </h1>
          <p className="mt-2 text-white/80 text-sm max-w-md mx-auto">
            Descubra os restaurantes do Monte Carlo e confira os cardápios do
            dia.
          </p>
        </div>
      </section>

      {/* Restaurantes */}
      <div className="bg-[#f9f8f0] max-w-[480px] mx-auto lg:max-w-7xl lg:px-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] px-4 pt-6 pb-4">
          Nossos Restaurantes
        </h2>

        {loading ? (
          <div className="px-4 pb-24 space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0 lg:pb-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-white overflow-hidden shadow-md border border-[#e5e0d5]"
              >
                <div className="h-48 bg-[#e5e0d5]" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 rounded bg-[#e5e0d5]" />
                  <div className="h-4 w-full rounded bg-[#e5e0d5]" />
                  <div className="h-4 w-1/2 rounded bg-[#e5e0d5]" />
                </div>
              </div>
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          <div className="px-4 pb-24">
            <div className="rounded-2xl bg-white p-8 text-center text-[#6b6660] shadow-md border border-[#e5e0d5]">
              Nenhum restaurante disponível no momento.
            </div>
          </div>
        ) : (
          <div className="px-4 space-y-4 pb-24 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0 lg:pb-16">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/gastronomia/${restaurant.id}`}
                className="bg-white overflow-hidden rounded-2xl shadow-md border border-[#e5e0d5] hover:shadow-lg transition-shadow block"
              >
                <div className="relative h-48">
                  <Image
                    src={restaurant.imageUrl || FALLBACK_IMAGE}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">
                    {restaurant.name}
                  </h3>
                  {restaurant.description && (
                    <p className="text-sm text-[#6b6660] line-clamp-2 mb-3">
                      {restaurant.description}
                    </p>
                  )}
                  {restaurant.address && (
                    <div className="flex items-center gap-1.5 text-xs text-[#8c8c8c]">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{restaurant.address}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-1 mt-4 text-sm font-medium text-[#8b1a1a]">
                    Ver cardápio
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
