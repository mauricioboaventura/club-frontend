"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, User, ChevronDown } from "lucide-react";
import Sidebar from "./Sidebar";

const POKER_LINKS = [
  { label: "Cash Game", href: "/poker#cash" },
  { label: "Torneios", href: "/poker#torneios" },
];

const NAV_LINKS = [
  { label: "Eventos", href: "/eventos" },
  { label: "Rewards", href: "/rewards" },
  { label: "Gastronomia", href: "/explorar" },
  { label: "Vida Noturna", href: "/eventos" },
];

export default function Header() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pokerOpen, setPokerOpen] = useState(false);
  const pokerRef = useRef<HTMLLIElement>(null);

  const isExplorar = pathname === "/explorar";
  const isEventos = pathname === "/eventos";
  const isRewards = pathname === "/rewards";
  const isTransparent = isExplorar || isEventos || isRewards;

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pokerRef.current && !pokerRef.current.contains(e.target as Node)) {
        setPokerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const headerBg = isTransparent ? "gradient-header" : "bg-[#430904]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] pt-[env(safe-area-inset-top,0)] ${headerBg}`}
      >
        {isTransparent && (
          <div
            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none lg:h-28"
            aria-hidden
          />
        )}

        {/* Desktop */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative z-10 flex items-center justify-between h-16">
              <Link
                href="/"
                className="flex items-center gap-2 flex-shrink-0"
              >
                <Image
                  src="/images/logo-montecarlo.png"
                  alt="Monte Carlo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <Image
                  src="/images/logo-montecarlo-text.png"
                  alt="Monte Carlo"
                  width={120}
                  height={36}
                  className="h-9 w-auto self-end translate-y-1"
                />
              </Link>

              <nav
                aria-label="Main"
                className="relative z-10 flex max-w-max flex-1 items-center justify-center mx-8"
              >
                <ul className="flex list-none items-center justify-center gap-1">
                  <li ref={pokerRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setPokerOpen((o) => !o)}
                      className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                        isTransparent
                          ? "text-white/80 hover:bg-white/10 hover:text-white"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      } ${pokerOpen || pathname.startsWith("/poker") ? "bg-white/10 text-white" : ""}`}
                      aria-expanded={pokerOpen}
                    >
                      Poker
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition duration-200 ${pokerOpen ? "rotate-180" : ""}`}
                        strokeWidth={2}
                      />
                    </button>
                    {pokerOpen && (
                      <div className="absolute left-0 top-full pt-1">
                        <ul className="min-w-[160px] rounded-md bg-black/90 py-2 shadow-lg">
                          {POKER_LINKS.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
                                onClick={() => setPokerOpen(false)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white ${
                            isTransparent ? "text-white/80" : "text-white/90"
                          } ${isActive ? "bg-white/10 text-white" : ""}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Buscar"
                >
                  <Search className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <Link
                  href="/auth"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white/60 bg-transparent px-5 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#2A0303] transition-colors"
                >
                  Entrar ou cadastrar-se
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <div className="relative z-10 flex items-center justify-between px-4 h-14 max-w-[480px] mx-auto">
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded-full border border-white/40 bg-transparent text-white hover:bg-white/10 relative flex-shrink-0 z-20"
              aria-label="Abrir menu"
              onClick={() => setSidebarOpen(true)}
            >
              <User className="h-4 w-4" strokeWidth={1.5} />
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500"
                aria-hidden="true"
              />
            </button>

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
              <Image
                src="/images/logo-montecarlo.png"
                alt="Monte Carlo"
                width={28}
                height={28}
                className="h-7 w-auto"
              />
              <Image
                src="/images/logo-montecarlo-text.png"
                alt="Monte Carlo Poker Club"
                width={96}
                height={32}
                className="h-8 w-auto self-end translate-y-1"
              />
            </Link>

            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded-md text-white hover:bg-white/10"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
