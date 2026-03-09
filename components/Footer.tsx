import Link from "next/link";
import Image from "next/image";
import { Facebook, Youtube, Instagram } from "lucide-react";
import { siteConfig } from "@/lib/data";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="px-4 py-8 pb-24 lg:pb-8 bg-[#2a0303] text-left">
      <div className="max-w-[480px] mx-auto lg:max-w-7xl lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/images/logo-montecarlo.png"
            alt="Monte Carlo"
            width={32}
            height={32}
            className="h-8 w-auto brightness-0 invert"
          />
          <Image
            src="/images/logo-montecarlo-text.png"
            alt="Monte Carlo"
            width={120}
            height={20}
            className="h-5 w-auto brightness-0 invert"
          />
        </div>

        {/* Responsible gaming */}
        <p className="text-sm text-white/60 mb-4">
          Se você joga, jogue com responsabilidade. O Monte Carlo Poker Club
          incentiva o jogo responsável.
        </p>

        {/* Copyright */}
        <p className="text-sm text-white/60 mb-6">
          Copyright © 2026 Monte Carlo Poker Club. Todos os direitos
          reservados.
        </p>

        {/* Poker Links */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
            Poker
          </p>
          <Link
            href="/poker?tab=torneios"
            className="block text-sm text-white/70 hover:text-white underline transition-colors"
          >
            Torneios
          </Link>
          <Link
            href="/poker?tab=cashgame"
            className="block text-sm text-white/70 hover:text-white underline transition-colors"
          >
            Cash Game
          </Link>
        </div>

        {/* Legal Links */}
        <div className="space-y-2 mb-6">
          <Link
            href="/institucional/termos"
            className="block text-sm text-white/70 hover:text-white underline transition-colors"
          >
            Termos de Uso
          </Link>
          <Link
            href="/institucional/privacidade"
            className="block text-sm text-white/70 hover:text-white underline transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/institucional/cookies"
            className="block text-sm text-white/70 hover:text-white underline transition-colors"
          >
            Política de Cookies
          </Link>
        </div>

        {/* Socials */}
        <div className="flex gap-3">
          <a
            href="#"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" strokeWidth={2} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="X"
          >
            <XIcon />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5" strokeWidth={2} />
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </footer>
  );
}
