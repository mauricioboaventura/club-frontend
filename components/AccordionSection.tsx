"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { accordionItems } from "@/lib/data";

type AccordionItemProps = {
  title: string;
  links: { label: string; href: string }[];
  isOpen: boolean;
  onToggle: () => void;
};

function AccordionItem({
  title,
  links,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left text-[17px] font-bold text-white hover:text-white/90 transition-colors"
      >
        {title}
        <ChevronDown
          size={20}
          className={`shrink-0 text-white transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 px-4"
        style={{ maxHeight: isOpen ? "240px" : "0" }}
      >
        <div className="pb-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-normal text-white/95 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AccordionSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="bg-[#2a0303] w-full mx-auto lg:max-w-full border-t border-b border-white/10">
      {/* Desktop: 4-column grid */}
      <div className="hidden lg:block border-b border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-8">
          {accordionItems.map((item) => (
            <div key={item.id}>
              <h4 className="font-semibold text-white mb-4">{item.title}</h4>
              <ul className="space-y-3">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="lg:hidden">
        {accordionItems.map((item) => (
          <AccordionItem
            key={item.id}
            title={item.title}
            links={item.links}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>
    </section>
  );
}
