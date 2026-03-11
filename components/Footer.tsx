import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
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
        <p className="text-sm text-white/60 mb-2">
          Copyright © 2026 Monte Carlo Poker Club. Todos os direitos
          reservados.
        </p>
        <p className="text-sm text-white/60 mb-6">
          CNPJ: 40.184.481/0001-57
        </p>

        {/* Poker Links */}
        {/* <div className="space-y-2 mb-6">
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
        </div> */}

        {/* Legal Links */}
        {/* <div className="space-y-2 mb-6">
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
        </div> */}

        {/* Socials */}
        <div className="flex gap-3">
          <a
            href="https://wa.me/5511941213898"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <a
            href="https://x.com/montecarlo_sp?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="X"
          >
            <XIcon />
          </a>
          <a
            href="https://www.tiktok.com/@montecarlo.sp?_t=ZM-8ulevPPvixa&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="TikTok"
          >
            <TikTokIcon />
          </a>
          <a
            href="https://youtube.com/@podcastmontecarlo?si=Z_gGp35-d5VaRA3m"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="YouTube"
          >
            <YouTubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
