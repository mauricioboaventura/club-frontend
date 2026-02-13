"use client";

import { Calendar, MapPin } from "lucide-react";
import SectionTitle from "./SectionTitle";
import SectionCard from "./SectionCard";

const showCards = [
  {
    id: 1,
    title: "Jazz Night",
    date: "Sexta, 14 de Fev. · 21h",
    location: "Lounge Monte Carlo",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    link: "/eventos/jazz-night",
  },
  {
    id: 2,
    title: "DJ Session",
    date: "Sábado, 15 de Fev. · 23h",
    location: "Área VIP",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
    link: "/eventos/dj-session",
  },
  {
    id: 3,
    title: "Stand-up",
    date: "Domingo, 16 de Fev. · 20h",
    location: "Teatro Monte Carlo",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
    link: "/eventos/stand-up",
  },
];

export default function ShowsSection() {
  return (
    <section className="px-4 py-7 max-w-[480px] mx-auto bg-[#fcfaf6]">
      <SectionTitle>SHOWS & EVENTOS</SectionTitle>

      <div className="flex gap-4 overflow-x-auto scroll-hidden pb-1 -mx-4 px-4">
        {showCards.map((card) => (
          <SectionCard
            key={card.id}
            href={card.link}
            image={{ src: card.image, alt: card.title }}
            title={card.title}
            description={
              <>
                <div className="flex items-center gap-2 mb-1.5">
                  <Calendar size={14} className="shrink-0 text-[#8c8c8c]" />
                  {card.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0 text-[#8c8c8c]" />
                  {card.location}
                </div>
              </>
            }
            buttonText="Ver evento →"
          />
        ))}
      </div>
    </section>
  );
}
