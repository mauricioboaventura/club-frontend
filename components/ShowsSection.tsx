"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import type { FeaturedEvent } from "@/lib/api/pages";
import { useEffect } from "react";

const fallbackCards = [
  {
    id: "1",
    title: "Jazz Night",
    date: "Sexta, 14 de Fev • 21h",
    location: "Lounge Monte Carlo",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    link: "/eventos/jazz-night",
  },
  {
    id: "2",
    title: "DJ Session",
    date: "Sábado, 15 de Fev • 23h",
    location: "Área VIP",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
    link: "/eventos/dj-session",
  },
  {
    id: "3",
    title: "Stand-up Comedy",
    date: "Domingo, 16 de Fev • 20h",
    location: "Teatro MC",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
    link: "/eventos/stand-up",
  },
];

function formatEventDate(startDate: string | null): string {
  if (!startDate) return "";
  const d = new Date(startDate);
  return d.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ShowsSectionProps = {
  featuredEvents?: FeaturedEvent[];
};

export default function ShowsSection({ featuredEvents }: ShowsSectionProps) {
  useEffect(() => {
    if (featuredEvents) {
      console.log("Featured events:", featuredEvents);
    }
  }, [featuredEvents]);
  const items =
    featuredEvents && featuredEvents.length > 0
      ? featuredEvents.map((e) => ({
          id: e.id,
          title: e.title,
          date: formatEventDate(e.startDate),
          location: e.location ?? "",
          image:
            e.coverImageUrl ??
            e.event_images?.[0]?.imageUrl ??
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
          link: `/eventos/${e.id}`,
        }))
      : fallbackCards;

  return (
    <section className="py-6 pb-28 max-w-[480px] mx-auto lg:max-w-7xl lg:px-6 bg-[#fcfaf6]">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-[#8b1a1a]">
          Shows & Eventos
        </h2>
        <Link
          href="/eventos"
          className="text-sm text-[#8b1a1a] underline underline-offset-2 hover:text-[#6b1515] transition-colors"
        >
          Ver tudo
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto scroll-hidden px-4 pb-2 lg:grid lg:grid-cols-3 lg:gap-4">
        {items.map((card) => (
          <Link
            key={card.id}
            href={card.link}
            className="relative flex-shrink-0 w-72 lg:w-auto rounded-xl overflow-hidden bg-white border border-[#8b1a1a]/10 hover:border-[#8b1a1a]/20 transition-colors"
          >
            <div className="relative h-40">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 288px, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">
                {card.title}
              </h3>
              <div className="space-y-1 mb-3">
                {card.date && (
                  <div className="flex items-center gap-2 text-xs text-[#8c8c8c]">
                    <Calendar className="h-3 w-3 text-[#8b1a1a] shrink-0" />
                    <span>{card.date}</span>
                  </div>
                )}
                {card.location && (
                  <div className="flex items-center gap-2 text-xs text-[#8c8c8c]">
                    <MapPin className="h-3 w-3 text-[#8b1a1a] shrink-0" />
                    <span>{card.location}</span>
                  </div>
                )}
              </div>
              <span className="inline-flex items-center justify-center rounded-md px-3 w-full h-8 text-xs font-medium border border-[#8b1a1a]/30 text-[#8b1a1a] hover:bg-[#8b1a1a]/10 transition-colors">
                Ver evento →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
