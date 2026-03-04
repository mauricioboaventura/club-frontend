"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const MAIS_REWARDS_CARDS = [
  {
    image:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&auto=format&fit=crop",
    title: "Jogos Grátis MC Rewards",
    description:
      "Jogue gratuitamente para acumular pontos de fidelidade e resgatar recompensas reais.",
    cta: "Ver Detalhes",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&auto=format&fit=crop",
    title: "Tarifa Flexível MC Rewards",
    description: "Até 15% de desconto nas melhores tarifas, exclusivo para membros.",
    cta: "Saiba mais",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop",
    title: "Perguntas Frequentes",
    description: "Saiba mais sobre o programa MC Rewards.",
    cta: "Saiba mais",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop",
    title: "Jogo Responsável",
    description: "Se o jogo não parece mais uma diversão, talvez seja hora de parar.",
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
    <main
      className="min-h-screen bg-[#f9f8f0] lg:pt-16 pb-24 lg:pb-16"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 3.5rem)",
      }}
    >
      {/* Hero */}
      <div className="relative">
        <div className="relative w-full h-[28rem] lg:h-[32rem]">
          <Image
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop"
            alt="MC Rewards"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:px-0">
          <div className="max-w-[480px] mx-auto lg:max-w-7xl lg:mx-auto lg:px-6">
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
            <p className="text-white/90 text-sm lg:text-base leading-relaxed mb-4 max-w-2xl">
              Mais oportunidades para ganhar recompensas. Mais formas de
              resgatar.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/auth"
                className="inline-flex items-center justify-center gap-2 h-10 py-2 bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white hover:text-[#2A0303] rounded-full px-6 text-sm font-medium transition-colors"
              >
                Entrar ou Registrar
              </Link>
              <Link
                href="#niveis"
                className="inline-flex items-center justify-center gap-2 h-10 py-2 bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white hover:text-[#2A0303] rounded-full px-6 text-sm font-medium transition-colors"
              >
                Todos os Níveis e Benefícios
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recompensas que Levam Você */}
      <div className="px-4 py-8 lg:py-16 lg:max-w-7xl lg:mx-auto lg:px-6">
        <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#525252] mb-3">
          Recompensas que Levam Você a Todos os Lugares.
        </h2>
        <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#525252] mb-4">
          Ganhe Mais, Aproveite Mais
        </h3>
        <p className="text-[#8C8C8C] text-sm lg:text-base leading-relaxed max-w-3xl mb-6">
          Agora cada momento que você vive conosco conta para algo mais. De
          estadias luxuosas a experiências gastronômicas e jogos de mesa
          envolventes, sua aventura gera recompensas. Pronto para reviver a
          ação? Resgate seus Pontos MC Rewards e aproveite tudo de novo.*
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/auth"
            className="inline-flex items-center justify-center h-10 py-2 bg-[#2A0303] text-white hover:bg-[#420804] rounded-full px-6 text-sm font-medium transition-colors"
          >
            Entrar ou Registrar
          </Link>
          <Link
            href="#regras"
            className="inline-flex items-center justify-center h-10 py-2 border border-[#525252] text-[#525252] hover:bg-[#525252] hover:text-white rounded-full px-6 text-sm font-medium transition-colors"
          >
            Regras do Programa
          </Link>
        </div>
      </div>

      {/* Ganhe do Seu Jeito */}
      <div className="px-4 py-8 lg:py-16 lg:max-w-7xl lg:mx-auto lg:px-6">
        <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#525252] mb-6">
          Ganhe do Seu Jeito.
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <div className="text-center p-8">
                <Image
                  src="/images/logo-montecarlo.png"
                  alt="MC"
                  width={48}
                  height={48}
                  className="h-12 w-auto mx-auto mb-4 brightness-0 invert"
                />
                <p className="text-white text-2xl lg:text-3xl font-bold tracking-wider">
                  MC REWARDS
                </p>
                <p className="text-[#E0B230] text-xl lg:text-2xl font-bold mt-2">
                  MARCOS
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-[#8C8C8C] text-sm lg:text-base leading-relaxed mb-6">
              Com mais formas de ganhar, avance no seu Status de Nível. À medida
              que sobe de nível, desbloqueie benefícios exclusivos criados para
              tornar sua jornada com o MC Rewards ainda melhor. Além disso, com
              os Marcos de Recompensas, ganhar Créditos de Nível nunca foi tão
              gratificante.
            </p>
            <Link
              href="#marcos"
              className="inline-flex items-center justify-center h-10 py-2 border border-[#525252] text-[#525252] hover:bg-[#525252] hover:text-white rounded-full px-6 text-sm font-medium transition-colors"
            >
              Saiba mais sobre Marcos
            </Link>
          </div>
        </div>
      </div>

      {/* Mais Benefícios */}
      <div className="px-4 py-8 lg:py-16 lg:max-w-7xl lg:mx-auto lg:px-6">
        <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#525252] mb-6">
          Mais Benefícios. Mais Razões para Subir de Nível.
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <p className="text-[#8C8C8C] text-sm lg:text-base leading-relaxed mb-6">
              O MC Rewards tem mais formas de ganhar, acelerando seu caminho para
              benefícios novos e exclusivos.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                className="text-sm text-[#525252] underline underline-offset-2 font-medium"
              >
                FAQ Como Ganhar
              </button>
              <Link
                href="#niveis"
                className="inline-flex items-center justify-center h-9 px-3 rounded-full border border-[#525252] text-[#525252] hover:bg-[#525252] hover:text-white text-sm font-medium transition-colors"
              >
                Níveis e Benefícios
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=600&auto=format&fit=crop"
              alt="Benefícios"
              width={600}
              height={450}
              className="w-full rounded-xl aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Promoções Atuais */}
      <div className="px-4 py-8 lg:py-16 lg:max-w-7xl lg:mx-auto lg:px-6">
        <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#525252] mb-6">
          Promoções Atuais
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1611174743420-3d7df880ce32?w=400&auto=format&fit=crop"
              alt="Leve o Monte Carlo para casa"
              width={400}
              height={225}
              className="w-full rounded-xl aspect-[16/9] object-cover mb-4"
            />
            <h3 className="font-semibold text-[#525252] text-lg mb-2">
              Leve o Monte Carlo para casa
            </h3>
            <p className="text-sm text-[#8C8C8C] leading-relaxed mb-4">
              Registre-se agora e comece a apostar nos seus esportes favoritos
              com o app BetMC.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center h-10 py-2 bg-[#2A0303] text-white hover:bg-[#420804] rounded-full px-6 text-sm font-medium transition-colors"
            >
              Registrar
            </Link>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&auto=format&fit=crop"
              alt="Ofertas exclusivas"
              width={400}
              height={225}
              className="w-full rounded-xl aspect-[16/9] object-cover mb-4"
            />
            <h3 className="font-semibold text-[#525252] text-lg mb-2">
              Ofertas exclusivas
            </h3>
            <p className="text-sm text-[#8C8C8C] leading-relaxed mb-4">
              Desbloqueie acesso exclusivo a tarifas especiais e ofertas
              reservadas para membros MC Rewards.
            </p>
            <Link
              href="#ofertas"
              className="inline-flex items-center justify-center h-10 py-2 bg-[#2A0303] text-white hover:bg-[#420804] rounded-full px-6 text-sm font-medium transition-colors"
            >
              Ver ofertas
            </Link>
          </div>
        </div>
      </div>

      {/* Cartões MC Rewards */}
      <div className="px-4 py-8 lg:py-16 lg:max-w-7xl lg:mx-auto lg:px-6">
        <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#525252] mb-6">
          Cartões MC Rewards e Gift Cards
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&auto=format&fit=crop"
              alt="Acelerador de status de nível"
              width={400}
              height={225}
              className="w-full rounded-xl aspect-[16/9] object-cover mb-4"
            />
            <h3 className="font-semibold text-[#525252] text-lg mb-2">
              Acelerador de status de nível
            </h3>
            <p className="text-sm text-[#8C8C8C] leading-relaxed mb-4">
              Agora até 31 de março de 2026, apenas nos destinos MC Rewards.
            </p>
            <Link
              href="#acelerador"
              className="inline-flex items-center justify-center h-10 py-2 bg-[#2A0303] text-white hover:bg-[#420804] rounded-full px-6 text-sm font-medium transition-colors"
            >
              Saiba mais
            </Link>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop"
              alt="Ganhe até 30.000 pontos bônus"
              width={400}
              height={225}
              className="w-full rounded-xl aspect-[16/9] object-cover mb-4"
            />
            <h3 className="font-semibold text-[#525252] text-lg mb-2">
              Ganhe até 30.000 pontos bônus
            </h3>
            <p className="text-sm text-[#8C8C8C] leading-relaxed mb-4">
              Com os cartões de crédito MC Rewards e desbloqueie vantagens e
              status exclusivos.
            </p>
            <Link
              href="#pontos"
              className="inline-flex items-center justify-center h-10 py-2 bg-[#2A0303] text-white hover:bg-[#420804] rounded-full px-6 text-sm font-medium transition-colors"
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </div>

      {/* Mais MC Rewards */}
      <div className="px-4 py-8 lg:py-16 lg:max-w-7xl lg:mx-auto lg:px-6">
        <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#525252] mb-6">
          Mais MC Rewards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MAIS_REWARDS_CARDS.map((card, i) => (
            <article
              key={i}
              className="overflow-hidden border-0 shadow-sm bg-[#F7F7F7] rounded-xl flex flex-col"
            >
              <div className="relative h-48">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-[#525252] text-sm mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-[#8C8C8C] leading-relaxed mb-4 flex-1">
                  {card.description}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center h-9 px-3 w-full rounded-full border border-[#525252] text-[#525252] hover:bg-[#525252] hover:text-white text-xs font-medium transition-colors"
                >
                  {card.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="text-xs text-[#8C8C8C] mt-8">
          *Sujeito às regras do Programa MC Rewards.
        </p>
      </div>

      {/* Mais Informações */}
      <div className="px-4 py-6 lg:max-w-7xl lg:mx-auto lg:px-6">
        <div>
          {MAIS_INFOS.map((label, i) => (
            <button
              key={i}
              type="button"
              className="w-full flex items-center justify-between py-4 text-left transition-colors hover:bg-white/50 rounded-lg"
            >
              <span className="text-[#525252] text-sm underline underline-offset-2">
                {label}
              </span>
              <ChevronRight className="h-4 w-4 text-[#8C8C8C]" strokeWidth={2} />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
