"use client";

import Link from "next/link";
import {
  Mic,
  UtensilsCrossed,
  Globe,
  PartyPopper,
  Trophy,
  Layers,
} from "lucide-react";

const discoverCategories = [
  { id: 1, label: "Shows", icon: Mic, href: "/eventos" },
  { id: 2, label: "Gastronomia", icon: UtensilsCrossed, href: "/gastronomia" },
  { id: 3, label: "Nightlife", icon: Globe, href: "/eventos" },
  { id: 4, label: "Torneios", icon: Trophy, href: "/poker?tab=torneios" },
  { id: 5, label: "Cash Game", icon: Layers, href: "/poker?tab=cashgame" },
  { id: 6, label: "Eventos", icon: PartyPopper, href: "/eventos" },
];

export default function DiscoverSection() {
  return (
    <section className="py-6 max-w-[480px] mx-auto lg:max-w-7xl lg:px-6 bg-[#fcfaf6] hidden lg:block">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#8c8c8c]">
          Descubra
        </h2>
        <Link
          href="/eventos"
          className="text-sm font-medium text-[#2a0303] underline underline-offset-2 hover:text-[#2a0303]/80 transition-colors"
        >
          Ver tudo
        </Link>
      </div>
      <div className="flex gap-6 overflow-x-auto scroll-hidden pb-2 px-4 lg:justify-center lg:gap-10">
        {discoverCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex flex-col items-center gap-3 min-w-[80px] group"
            >
              <Icon
                className="h-10 w-10 text-[#1a1a1a] stroke-[1.5] group-hover:text-[#8b1a1a] transition-colors"
                strokeWidth={1.5}
              />
              <span className="text-sm text-[#1a1a1a] font-medium text-center leading-tight group-hover:text-[#8b1a1a] transition-colors">
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
