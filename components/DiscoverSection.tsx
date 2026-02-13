"use client";

import Link from "next/link";
import { Mic, UtensilsCrossed, Ticket, Armchair } from "lucide-react";

const discoverCategories = [
  { id: 1, label: "Shows", icon: Mic, href: "/shows" },
  { id: 2, label: "Gastronomia", icon: UtensilsCrossed, href: "/gastronomia" },
  { id: 3, label: "Pacotes", icon: Ticket, href: "/pacotes" },
  { id: 4, label: "Lounges", icon: Armchair, href: "/lounges" },
];

export default function DiscoverSection() {
  return (
    <section className="py-5 px-4 max-w-[480px] mx-auto bg-[#fcfaf6]">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-[15px] uppercase font-extrabold tracking-[0.5px] text-[#8c8c8c]">
          DESCUBRA
        </h2>
        <Link
          href="/descubra"
          className="text-[15px] text-[#2a0303] font-normal underline underline-offset-2"
        >
          Ver tudo
        </Link>
      </div>
      <div className="flex gap-6 justify-between">
        {discoverCategories.map((cat) => {
          const Icon = cat.icon;

          return (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex flex-col items-center gap-3 min-w-[72px] group"
            >
              <div className="flex items-center justify-center transition-all group-hover:rounded-lg group-hover:border-2 group-hover:border-dashed group-hover:border-[#7e52d8] group-hover:p-2 group-hover:bg-[#7e52d8]/10">
                <Icon
                  size={40}
                  strokeWidth={1.5}
                  className="h-10 w-10 text-[#4a4a4a] transition-colors group-hover:text-[#7e52d8]"
                />
              </div>
              <span className="text-[15px] text-[#4a4a4a] font-normal">
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
