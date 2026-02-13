"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, User } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Header() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100]  ${
          isTransparent ? "bg-transparent" : "bg-[#430904]"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 max-w-[480px] mx-auto relative">
          {/* Esquerda: Ícone de usuário com badge de notificação */}
          <button
            type="button"
            className="w-9 h-9 flex items-center border border-white/30 rounded-full justify-center text-white/90 hover:text-white transition-opacity relative flex-shrink-0 z-20"
            aria-label="Abrir menu"
            onClick={() => setSidebarOpen(true)}
          >
            <User size={22} strokeWidth={1.5} />
            <span
              className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500"
              aria-hidden="true"
            />
          </button>

          {/* Centro: Logos lado a lado - pointer-events-none para não bloquear cliques no botão */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none"
          >
            <Image
              src="/images/logo-montecarlo.png"
              alt="Monte Carlo emblem"
              width={36}
              height={36}
              className="object-contain h-[30px] pointer-events-auto"
            />
            <div className="pt-2 pointer-events-auto">
              <Image
                src="/images/logo-montecarlo-text.png"
                alt="Monte Carlo Poker Club"
                width={120}
                height={32}
                className="object-contain h-8 w-auto"
              />
            </div>
          </Link>

          {/* Direita: Ícone de busca */}
          <button
            className="w-9 h-9 flex items-center justify-center text-white/90 hover:text-white transition-opacity flex-shrink-0"
            aria-label="Buscar"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
