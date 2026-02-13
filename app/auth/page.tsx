"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  Building2,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#f9f8f0] text-[#1a1a1a]">
      <div className="max-w-[480px] mx-auto pb-24">
        {/* Header */}
        <header className="flex items-center gap-4 pt-6 pb-4 px-4 ">
          <Link
            href="/"
            className="p-2 -m-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft size={20} color="#525252" strokeWidth={2} />
          </Link>
          <h1 className="text-[18px] font-semibold text-[#525252]">
            Entrar ou Registrar
          </h1>
        </header>
        <div className="h-px bg-[#1a1a1a]/10 mb-8" />

        {/* Email form */}
        <form className="space-y-4 mb-8 px-4">
          <label
            htmlFor="email"
            className="block text-[14px] font-medium text-[#525252]"
          >
            Digite seu email para entrar no MC Rewards ou criar uma nova conta
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] placeholder:text-[#888] text-[16px] border-0 border-b-2 border-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a] transition-colors"
          />
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-full bg-[#3a1313] text-white font-semibold text-[15px] hover:bg-[#333] transition-colors"
          >
            Próximo
          </button>
        </form>
        <div className="h-px bg-[#d9d9d9] mb-8 mx-4" />

        {/* Decorative image */}
        <div className="rounded-2xl mx-4 overflow-hidden mb-8 h-[160px] relative bg-[#e5e0d5]">
          <Image
            src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover w-full"
            sizes=""
          />
        </div>

        {/* MC Rewards section */}
        <section>
          <h2 className="text-[20px] font-bold text-[#525252] mb-4 px-4">
            Faça mais com MC Rewards
          </h2>
          <ul className="space-y-4 px-4">
            {[
              {
                icon: Sparkles,
                text: "Acesse ofertas e desafios personalizados",
              },
              {
                icon: Building2,
                text: "Reserve tarifas exclusivas para membros",
              },
              {
                icon: Ticket,
                text: "Desbloqueie pré-venda de ingressos e ofertas de entretenimento",
              },
              {
                icon: UtensilsCrossed,
                text: "Ganhe recompensas resgatáveis em quartos, gastronomia e mais",
              },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e5e0d5] flex items-center justify-center">
                  <Icon size={13} className="text-[#1a1a1a]" strokeWidth={2} />
                </span>
                <span className="text-[14px] text-[#1a1a1a]">{text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
