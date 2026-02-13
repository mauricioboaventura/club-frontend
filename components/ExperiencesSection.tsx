"use client";

import Link from "next/link";
import Image from "next/image";

const experiences = [
  {
    id: 1,
    title: "Cash Game Premium",
    subtitle: "Mesa VIP disponível",
    cta: "Ver detalhes",
    ctaLink: "/poker/cash-game",
    image:
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    title: "Show da Semana",
    subtitle: "Jazz Night - Sexta-feira",
    cta: "Ver programação",
    ctaLink: "/eventos/jazz-night",
    image:
      "https://images.unsplash.com/photo-1609902726285-00668009f004?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    title: "Jantar Especial",
    subtitle: "Menu degustação exclusivo",
    cta: "Reservar",
    ctaLink: "/gastronomia/degustacao",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=800&fit=crop",
  },
  {
    id: 4,
    title: "Torneio em Destaque",
    subtitle: "Main Event | R$ 50.000 GTD",
    cta: "Ver detalhes",
    ctaLink: "/torneios/main-event",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop",
  },
];

export default function ExperiencesSection() {
  return (
    <section className="px-4 py-7 max-w-[480px] mx-auto bg-[#fcfaf6]">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-[15px] uppercase font-extrabold tracking-[0.5px] text-[#8c8c8c]">
          EXPERIÊNCIAS QUE VOCÊ PODE GOSTAR
        </h2>
        <Link
          href="/experiencias"
          className="text-[15px] text-[#8c8c8c] font-normal underline underline-offset-2"
        >
          Ver tudo
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto scroll-hidden pb-1 -mx-4 px-4">
        {experiences.map((exp) => (
          <Link
            key={exp.id}
            href={exp.ctaLink}
            className="flex-shrink-0 w-[224px] rounded-xl overflow-hidden shadow-[2px_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[4px_6px_16px_rgba(0,0,0,0.12)] transition-shadow"
          >
            <div className="relative aspect-[3/4] min-h-[240px]">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/75" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-[25px] font-bold text-white text-center mb-1 leading-tight">
                  {exp.title}
                </h3>
                <p className="text-[15px] text-white/95 text-center leading-snug mb-4">
                  {exp.subtitle}
                </p>
                <Link href={'#'} className="inline-flex justify-center rounded-lg border-2 w-full border-white/30 px-4 py-2 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
                  {exp.cta}
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
