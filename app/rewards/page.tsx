"use client";

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BENEFICIOS = [
  {
    image:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&auto=format&fit=crop",
    title: "Novas formas de ganhar",
    description:
      "Acumule mais recompensas com suas experiências em gastronomia, hospedagem e jogos em todas as propriedades Monte Carlo.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&auto=format&fit=crop",
    title: "Novos benefícios exclusivos",
    description:
      "De taxas de resort isentas a celebração de nível e créditos de viagem, o MC Rewards oferece novos benefícios incríveis.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop",
    title: "Até 20% de desconto em reservas",
    description:
      "Membros recebem as melhores tarifas disponíveis ao reservar diretamente com o Monte Carlo.",
  },
];

const OFERTAS = [
  {
    image:
      "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?w=400&auto=format&fit=crop",
    title: "Leve o Monte Carlo para casa",
    description:
      "Registre-se agora e comece a apostar nos seus esportes favoritos com o app BetMC.",
    cta: "Registrar",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&auto=format&fit=crop",
    title: "Ofertas exclusivas",
    description:
      "Desbloqueie acesso exclusivo a tarifas especiais e ofertas reservadas para membros MC Rewards.",
    cta: "Ver ofertas",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&auto=format&fit=crop",
    title: "Acelerador de status de nível",
    description:
      "Agora até 31 de março de 2026, apenas nos destinos MC Rewards.",
    cta: "Saiba mais",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop",
    title: "Ganhe até 30.000 pontos bônus",
    description:
      "Com os cartões de crédito MC Rewards e desbloqueie vantagens e status exclusivos.",
    cta: "Saiba mais",
  },
];

const MAIS_INFOS = [
  "Perguntas Frequentes MC Rewards",
  "Saiba Mais Sobre o MC Rewards",
  "Programa para Militares e Veteranos",
  "Cartão Mastercard MC Rewards",
  "Regras do Programa",
];

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-[#121212]">


      {/* Hero */}
      <div className="relative h-[31rem]">
        <Image
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop"
          alt="MC Rewards"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/images/logo-montecarlo.png"
              alt="MC Logo"
              width={64}
              height={64}
              className="h-16 w-auto brightness-0 invert"
            />
            <span className="text-white text-[2.5rem] font-bold tracking-wider">
              MC REWARDS
            </span>
          </div>
          <p className="text-white text-sm leading-relaxed mb-4 font-medium">
            Ganhe com suas experiências em gastronomia, hospedagem e jogos no MC
            Rewards. Reinventamos completamente as oportunidades de jogar,
            acumular e resgatar recompensas.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center text-[14px] justify-center font-bold gap-2 border h-10 py-2 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-[#2A0303] rounded-full px-6 transition-colors"
          >
            Entrar ou Registrar
          </Link>
        </div>
      </div>

      {/* Benefícios + Ofertas e mais - wrapper único para evitar linha entre seções */}
      <div className="bg-[#f9f8f0]">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-sans text-xl font-bold text-[#525252]">
              Benefícios
            </h2>
            <button
              type="button"
              className="text-sm text-[#525252] underline underline-offset-2"
            >
              Ver todos os benefícios
            </button>
          </div>
          <div className="space-y-4">
            {BENEFICIOS.map((b, i) => (
              <article
                key={i}
                className="flex overflow-hidden border-0 shadow-sm bg-[#F7F7F7] rounded-xl"
              >
                <Image
                  src={b.image}
                  alt={b.title}
                  width={112}
                  height={112}
                  className="w-28 h-28 object-cover flex-shrink-0"
                />
                <div className="p-3 flex flex-col justify-center flex-1">
                  <h3 className="font-semibold text-[#525252] text-sm mb-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#8C8C8C] leading-relaxed font-medium">
                    {b.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Ofertas e mais */}
        <div className="py-6">
        <h2 className="font-sans text-xl font-bold text-[#525252] px-4 mb-4">
          Ofertas e mais
        </h2>
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 scroll-hidden">
          {OFERTAS.map((o, i) => (
            <article
              key={i}
              className="flex-shrink-0 w-64 overflow-hidden border-0 shadow-sm bg-[#F7F7F7] rounded-xl"
            >
              <div className="relative w-full h-32">
                <Image
                  src={o.image}
                  alt={o.title}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#525252] text-sm mb-2">
                  {o.title}
                </h3>
                <p className="text-xs text-[#8C8C8C] leading-relaxed mb-3 font-medium">
                  {o.description}
                </p>
                <button
                  type="button"
                  className="w-full h-9 px-3 bg-[#f9f8f0] rounded-full border border-[#525252] text-[#525252] hover:bg-[#525252] hover:text-white text-xs font-medium transition-colors"
                >
                  {o.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
        </div>

        {/* Mais informações */}
        <div className="px-4 py-6">
          <h2 className="font-sans text-xl font-bold text-[#525252] mb-4">
            Mais informações
          </h2>
          <div>
            {MAIS_INFOS.map((label, i) => (
              <button
                key={i}
                type="button"
                className="w-full flex items-center justify-between py-4 text-left transition-colors hover:bg-white/50 rounded-lg border-b-0 border-transparent"
              >
                <span className="text-[#525252] text-sm underline underline-offset-2">
                  {label}
                </span>
                <ChevronRight
                  className="h-4 w-4 text-[#8C8C8C]"
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
