"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  X,
  CalendarDays,
  Sparkles,
  Pencil,
  Phone,
  Settings,
  ChevronDown,
  Trophy,
} from "lucide-react";

type RankingNav = {
  id: string;
  name: string;
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  rankings?: RankingNav[];
};

export default function Sidebar({ isOpen, onClose, rankings = [] }: SidebarProps) {
  const [appsOpen, setAppsOpen] = useState(false);
  const [politicasOpen, setPoliticasOpen] = useState(false);
  const [rankingsOpen, setRankingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const linkBase =
    "flex items-center gap-3 py-3 text-[17px] text-[#1a1a1a] hover:text-[#333] transition-colors";

  const sidebarContent = (
    <>
      {/* Overlay - clique fora fecha */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar - slide-in da esquerda */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[9999] w-[320px] max-w-full bg-[#F8F8F8] flex flex-col overflow-hidden shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-8 px-5 pb-5">
          {/* Top - CTA Button */}
          <Link
            href="/auth"
            className="flex items-center justify-center w-full py-4 px-4 rounded-xl bg-[#f9f8f0] border border-black text-[#1a1a1a] font-medium text-[17px] hover:bg-[#e5e0d5] transition-colors mb-6"
            onClick={onClose}
          >
            Entrar ou Criar Conta
          </Link>

          {/* Group 1 - User Actions */}
          <nav className="flex flex-col">
            <Link href="#" className={linkBase} onClick={onClose}>
              <CalendarDays
                size={20}
                className="text-[#1a1a1a] flex-shrink-0"
              />
              Minhas Reservas
            </Link>
            <Link href="#" className={`${linkBase} relative`} onClick={onClose}>
              <Sparkles size={20} className="text-[#1a1a1a] flex-shrink-0" />
              Preferências
              <span className="ml-auto px-2 py-0.5 rounded-md bg-[#1A1A1A] text-white text-[11px] font-medium">
                Novo
              </span>
            </Link>
          </nav>

          <div className="border-t border-gray-200 my-4" />

          {/* Group 2 - Support & Configuration */}
          <nav className="flex flex-col">
            <Link href="#" className={linkBase} onClick={onClose}>
              <Pencil size={20} className="text-[#1a1a1a] flex-shrink-0" />
              Enviar Feedback
            </Link>
            <Link href="#" className={linkBase} onClick={onClose}>
              <Phone size={20} className="text-[#1a1a1a] flex-shrink-0" />
              Contato
            </Link>
            <Link href="#" className={linkBase} onClick={onClose}>
              <Settings size={20} className="text-[#1a1a1a] flex-shrink-0" />
              Configurações
            </Link>
          </nav>

          <div className="border-t border-gray-200 my-4" />

          {/* Group 3 - Rankings */}
          {rankings.length > 0 && (
            <>
              <nav className="flex flex-col">
                <button
                  className={`${linkBase} w-full justify-between`}
                  onClick={() => setRankingsOpen(!rankingsOpen)}
                >
                  <span className="flex items-center gap-3">
                    <Trophy size={20} className="text-[#1a1a1a] flex-shrink-0" />
                    Rankings
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#666] transition-transform ${rankingsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {rankingsOpen && (
                  <div className="pl-8 py-1 flex flex-col gap-0.5">
                    {rankings.map((r) => (
                      <Link
                        key={r.id}
                        href={`/rankings/${r.id}`}
                        className="py-2.5 text-[16px] text-[#555] hover:text-[#1a1a1a] transition-colors"
                        onClick={onClose}
                      >
                        {r.name}
                      </Link>
                    ))}
                  </div>
                )}
              </nav>
              <div className="border-t border-gray-200 my-4" />
            </>
          )}

          {/* Group 4 - Information & Legal */}
          <nav className="flex flex-col">
            <Link href="/sobre" className={linkBase} onClick={onClose}>
              Sobre o Monte Carlo
            </Link>
            <Link href="#" className={linkBase} onClick={onClose}>
              Jogo Responsável
            </Link>
            <button
              className={`${linkBase} w-full justify-between`}
              onClick={() => setAppsOpen(!appsOpen)}
            >
              Apps Parceiros
              <ChevronDown
                size={18}
                className={`text-[#666] transition-transform ${appsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {appsOpen && (
              <div className="pl-0 py-2 text-[16px] text-[#555]">
                {/* Subitens expandíveis - placeholder */}
              </div>
            )}
            <button
              className={`${linkBase} w-full justify-between`}
              onClick={() => setPoliticasOpen(!politicasOpen)}
            >
              Políticas, Termos e Privacidade
              <ChevronDown
                size={18}
                className={`text-[#666] transition-transform ${politicasOpen ? "rotate-180" : ""}`}
              />
            </button>
            {politicasOpen && (
              <div className="pl-0 py-2 text-[16px] text-[#555]">
                {/* Subitens expandíveis - placeholder */}
              </div>
            )}
          </nav>

          {/* Bottom - Version */}
          <div className="mt-auto pt-6">
            <span className="text-[16px] text-gray-500">Versão 1.0.0</span>
          </div>
        </div>
      </aside>
    </>
  );

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(sidebarContent, document.body);
}
