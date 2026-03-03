"use client";

import Link from "next/link";
import Image from "next/image";

const gastronomyCards = [
  {
    id: 1,
    name: "Restaurante Oriol",
    description: "Culinária contemporânea com toques brasileiros",
    badge: "Aberto hoje",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    link: "/gastronomia/oriol",
  },
  {
    id: 2,
    name: "Experiência Gastronômica MC",
    description: "Menu degustação exclusivo",
    badge: "Reservas abertas",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
    link: "/gastronomia/degustacao",
  },
];

export default function GastronomySection() {
  return (
    <section className="py-6 max-w-[480px] mx-auto lg:max-w-7xl lg:px-6 bg-[#fcfaf6]">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-[#8c8c8c] mb-4 px-4">
        Gastronomia
      </h2>
      <div className="flex gap-4 overflow-x-auto scroll-hidden px-4 pb-2 lg:grid lg:grid-cols-3 lg:gap-4">
        {gastronomyCards.map((card) => (
          <Link
            key={card.id}
            href={card.link}
            className="relative flex-shrink-0 w-72 lg:w-auto rounded-xl overflow-hidden bg-white border border-[#8b1a1a]/10 hover:border-[#8b1a1a]/20 transition-colors"
          >
            <div className="relative h-32">
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 288px, 33vw"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-[#1a1a1a]">
                  {card.name}
                </h3>
                <span className="inline-flex items-center rounded-full font-semibold text-[10px] px-2 py-0.5 bg-[#8b1a1a]/10 text-[#8b1a1a] whitespace-nowrap">
                  {card.badge}
                </span>
              </div>
              <p className="text-xs text-[#8c8c8c] mb-3 line-clamp-2">
                {card.description}
              </p>
              <span className="inline-flex items-center justify-center rounded-md px-3 w-full h-8 text-xs font-medium border border-[#8b1a1a]/30 text-[#8b1a1a] hover:bg-[#8b1a1a]/10 transition-colors">
                Fazer reserva
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
