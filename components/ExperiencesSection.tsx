"use client";

import Link from "next/link";
import Image from "next/image";
import type { FeatureCard } from "@/lib/api/pages";

const fallbackExperiences = [
  {
    id: "1",
    title: "Torneio em Destaque",
    subtitle: "Main Event | R$ 50.000 GTD",
    cta: "Ver detalhes",
    ctaLink: "/torneios/main-event",
    image:
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=600&h=800&fit=crop",
  },
  {
    id: "2",
    title: "Cash Game Premium",
    subtitle: "Mesa VIP disponível",
    cta: "Ver detalhes",
    ctaLink: "/poker/cash-game",
    image:
      "https://images.unsplash.com/photo-1609902726285-00668009f004?w=600&h=800&fit=crop",
  },
  {
    id: "3",
    title: "Show da Semana",
    subtitle: "Jazz Night - Sexta-feira",
    cta: "Ver programação",
    ctaLink: "/eventos/jazz-night",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop",
  },
  {
    id: "4",
    title: "Jantar Especial",
    subtitle: "Menu degustação exclusivo",
    cta: "Reservar",
    ctaLink: "/gastronomia/degustacao",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=800&fit=crop",
  },
];

type ExperiencesSectionProps = {
  featureCards?: FeatureCard[];
};

export default function ExperiencesSection({ featureCards }: ExperiencesSectionProps) {
  const items =
    featureCards && featureCards.length > 0
      ? featureCards.map((c) => ({
          id: c.id,
          title: c.title,
          subtitle: c.subtitle,
          cta: "Ver detalhes",
          ctaLink: c.linkHref.startsWith("/") ? c.linkHref : `/${c.linkHref}`,
          image: c.imageUrl,
        }))
      : fallbackExperiences;

  return (
    <section className="py-6 max-w-[480px] mx-auto lg:max-w-7xl lg:px-6 bg-[#fcfaf6]">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#8c8c8c]">
          Experiências que você pode gostar
        </h2>
        <Link
          href="/explorar"
          className="text-sm text-[#8c8c8c] underline underline-offset-2 hover:text-[#525252] transition-colors"
        >
          Ver tudo
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto scroll-hidden px-4 pb-2 lg:grid lg:grid-cols-4 lg:gap-4">
        {items.map((exp) => (
          <Link
            key={exp.id}
            href={exp.ctaLink}
            className="relative flex-shrink-0 w-56 lg:w-auto h-80 rounded-2xl overflow-hidden group"
          >
            <Image
              src={exp.image}
              alt={exp.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 1024px) 224px, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-5">
              <h3 className="text-2xl font-serif font-bold text-white text-center leading-tight mb-1">
                {exp.title}
              </h3>
              <p className="text-sm text-white/80 text-center mb-4">
                {exp.subtitle}
              </p>
              <span className="inline-flex items-center justify-center w-full h-11 rounded-lg border border-white/60 bg-transparent text-white text-sm font-medium group-hover:bg-white/10 group-hover:text-white transition-colors">
                {exp.cta}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
