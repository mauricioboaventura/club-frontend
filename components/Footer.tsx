import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { siteConfig } from "@/lib/data";

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#2a0303] px-4 pt-8 pb-24 max-w-[480px] mx-auto text-left">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/images/logo-montecarlo.png"
          alt=""
          width={40}
          height={40}
          className="shrink-0 h-10 w-auto"
        />
        <Image
          src="/images/logo-montecarlo-text.png"
          alt="Monte Carlo Poker Club"
          width={180}
          height={40}
          className="h-10 w-auto object-contain object-left"
        />
      </div>

      {/* Responsible gaming */}
      <p className="text-[15px] text-white/70 leading-relaxed mb-4 max-w-[360px]">
        Se você joga, jogue com responsabilidade. O Monte Carlo Poker Club
        incentiva o jogo responsável.
      </p>

      {/* Copyright */}
      <p className="text-[15px] text-white/70 mb-5">
        Copyright © 2026 Monte Carlo Poker Club. Todos os direitos reservados.
      </p>

      {/* Legal Links */}
      <div className="flex flex-col gap-2 mb-6">
        <Link
          href="/institucional/termos"
          className="text-[15px] text-white/70 underline hover:text-white/90 transition-colors w-fit"
        >
          Termos de Uso
        </Link>
        <Link
          href="/institucional/privacidade"
          className="text-[15px] text-white/70 underline hover:text-white/90 transition-colors w-fit"
        >
          Política de Privacidade
        </Link>
        <Link
          href="/institucional/cookies"
          className="text-[15px] text-white/70 underline hover:text-white/90 transition-colors w-fit"
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
          <Facebook size={18} />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="X"
        >
          <XIcon size={16} />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="YouTube"
        >
          <YoutubeIcon size={18} />
        </a>
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
      </div>
    </footer>
  );
}
