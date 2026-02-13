"use client";

import SectionTitle from "./SectionTitle";
import SectionCard from "./SectionCard";

const gastronomyCards = [
  {
    id: 1,
    name: "Restaurante Oriol",
    description: "Culinária contemporânea com toques brasileiros",
    badge: "Aberto hoje",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
    link: "/gastronomia/oriol",
  },
  {
    id: 2,
    name: "Experiência Gastronômica MC",
    description: "Menu degustação exclusivo",
    badge: "Reservas abertas",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    link: "/gastronomia/degustacao",
  },
];

export default function GastronomySection() {
  return (
    <section className="px-4 py-7 max-w-[480px] mx-auto bg-[#fcfaf6]">
      <SectionTitle>GASTRONOMIA</SectionTitle>

      <div className="flex gap-4 overflow-x-auto scroll-hidden pb-1 -mx-4 px-4">
        {gastronomyCards.map((card) => (
          <SectionCard
            key={card.id}
            href={card.link}
            image={{ src: card.image, alt: card.name }}
            title={card.name}
            description={card.description}
            badge={card.badge}
            buttonText="Fazer reserva"
          />
        ))}
      </div>
    </section>
  );
}
