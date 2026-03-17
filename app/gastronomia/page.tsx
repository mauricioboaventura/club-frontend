"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ChevronRight,
  Utensils,
  Wine,
  Flame,
  Leaf,
  Star,
  Clock,
} from "lucide-react";
import {
  fetchActiveRestaurants,
  type Restaurant,
} from "@/lib/api/restaurants";
import { fetchExecutiveMenus, type ExecutiveMenu } from "@/lib/api/dish-images";
import DishCarousel from "@/components/DishCarousel";

const FALLBACK_IMAGE =
  "https://ppvlzlzceuwxnishsotz.supabase.co/storage/v1/object/public/gallery-photos/photo-1559339352-11d035aa65de.jpeg";

export default function GastronomiaPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [executiveMenus, setExecutiveMenus] = useState<ExecutiveMenu[]>([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const [restaurantData, menuData] = await Promise.all([
        fetchActiveRestaurants(),
        fetchExecutiveMenus(),
      ]);
      if (mounted) {
        setRestaurants(restaurantData);
        setExecutiveMenus(menuData);
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <video
          src="/images/video/GASTRONOMIA.mov"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e5b62a] font-medium mb-3">
            Monte Carlo Poker Club
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-wide text-white">
            Gastronomia
          </h1>
          {/* <p className="mt-3 text-white/80 text-sm lg:text-base max-w-lg mx-auto leading-relaxed">
            Onde a alta culinária encontra a sofisticação do entretenimento.
            Uma jornada sensorial que celebra o prazer à mesa.
          </p> */}
          {/* Âncoras */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              { label: "Nossa Filosofia", href: "#filosofia" },
              { label: "A Experiência", href: "#experiencia" },
              { label: "Restaurantes", href: "#restaurantes" },
              { label: "Bar & Carta de Vinhos", href: "#bar" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-1.5 rounded-full border border-white/30 text-white/80 text-sm hover:bg-white/10 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ INTRODUÇÃO EDITORIAL ═══════════ */}
      <section className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b1a1a] font-medium mb-4">
            A Arte de Receber
          </p>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Muito além do jogo, uma experiência gastronômica de excelência.
          </h2>
          <div className="space-y-4 text-[#525252] text-sm lg:text-base leading-relaxed">
            <p>
              No Monte Carlo Poker Club, acreditamos que uma noite memorável vai
              muito além das cartas na mesa. A gastronomia é parte essencial da
              nossa identidade — um pilar de sofisticação que transforma cada
              visita em uma experiência completa para os sentidos.
            </p>
            <p>
              Inspirados pela tradição culinária europeia e pela riqueza dos
              sabores brasileiros, nossos restaurantes oferecem desde pratos
              autorais elaborados com técnicas contemporâneas até clássicos
              reconfortantes preparados com ingredientes selecionados. Cada
              detalhe, do mise en place à apresentação final, reflete o mesmo
              padrão de excelência que define o Monte Carlo.
            </p>
            <p>
              Aqui, a mesa é um convite ao convívio, à celebração e ao prazer.
              Seja antes de um grande torneio, durante uma pausa no cash game
              ou como destino por si só, nossos espaços gastronômicos são
              pensados para receber você com o requinte que merece.
            </p>
          </div>

          {/* ── Restaurantes ── */}
          {loading ? (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl bg-[#e5e0d5]/40 overflow-hidden shadow-sm border border-[#e5e0d5]"
                >
                  <div className="h-40 bg-[#e5e0d5]" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-[#e5e0d5]" />
                    <div className="h-3 w-full rounded bg-[#e5e0d5]" />
                  </div>
                </div>
              ))}
            </div>
          ) : restaurants.length > 0 && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {restaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  href={`/gastronomia/${restaurant.id}`}
                  className="bg-white overflow-hidden rounded-2xl shadow-sm border border-[#e5e0d5] hover:shadow-md transition-shadow block group"
                >
                  <div className="relative h-40">
                    <Image
                      src={restaurant.imageUrl || FALLBACK_IMAGE}
                      alt={restaurant.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#8b1a1a]">
                        <Utensils className="h-3 w-3" />
                        Menu Executivo
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-[#1a1a1a] mb-0.5">
                      {restaurant.name}
                    </h3>
                    {restaurant.description && (
                      <p className="text-xs text-[#6b6660] line-clamp-2 mb-2">
                        {restaurant.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      {/* {restaurant.address && (
                        <div className="flex items-center gap-1 text-xs text-[#8c8c8c]">
                          <MapPin className="h-3 w-3" />
                          <span className="line-clamp-1">{restaurant.address}</span>
                        </div>
                      )} */}
                      <div className="flex items-center gap-0.5 text-xs font-medium text-[#8b1a1a] ml-auto">
                        Ver menu
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ GALERIA DE PRATOS ═══════════ */}
      <section id="restaurantes" className="scroll-mt-24 py-12 lg:py-20 bg-[#fcfaf6] border-y border-black/5">
        <div className="max-w-[480px] mx-auto lg:max-w-4xl lg:px-6">
          <div className="px-4 mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b1a1a] font-medium mb-3">
              Alta Gastronomia
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-2 leading-tight">
              Nossos Pratos
            </h2>
            <p className="text-[#525252] text-sm lg:text-base leading-relaxed max-w-2xl">
              Cada prato é uma obra de arte — criações autorais dos nossos chefs
              que celebram sabor, técnica e apresentação impecável.
            </p>
          </div>

          <DishCarousel items={executiveMenus} />
        </div>
      </section>

      {/* ═══════════ DESTAQUES ═══════════ */}
      <section className="bg-[#430904] py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e5b62a] font-medium mb-3 text-center">
            Diferenciais
          </p>
          <h2 className="text-xl lg:text-2xl font-bold text-white text-center mb-10">
            O Que Torna Nossa Gastronomia Única
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                icon: Flame,
                label: "Cozinha Autoral",
                desc: "Pratos exclusivos criados por chefs com apresentações artísticas e sabores marcantes.",
              },
              {
                icon: Leaf,
                label: "Ingredientes Frescos",
                desc: "Seleção diária de insumos de alta qualidade, priorizando produtores locais e sazonalidade.",
              },
              {
                icon: Wine,
                label: "Carta de Vinhos",
                desc: "Rótulos criteriosamente escolhidos de vinícolas renomadas do Brasil e do mundo.",
              },
              {
                icon: Clock,
                label: "Serviço Contínuo",
                desc: "Gastronomia disponível durante toda a operação do clube, sem interrupções.",
              },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-[#e5b62a]/20 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-[#e5b62a]" />
                </div>
                <span className="text-sm font-semibold text-white">
                  {label}
                </span>
                <span className="text-xs text-white/60 mt-1 leading-snug">
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FILOSOFIA ═══════════ */}
      <section id="filosofia" className="scroll-mt-24 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop"
                  alt="Prato sofisticado servido no Monte Carlo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#e5b62a]/90 text-[#1a1a1a] text-xs font-semibold uppercase tracking-wide">
                    Cozinha Contemporânea
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8b1a1a] font-medium mb-3">
                Nossa Filosofia
              </p>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight">
                Tradição e Inovação em Cada Prato
              </h2>
              <div className="space-y-4 text-[#525252] text-sm lg:text-base leading-relaxed">
                <p>
                  Nossa filosofia culinária nasce da convicção de que a
                  gastronomia é uma forma de arte — e, como toda arte, deve
                  emocionar. Buscamos o equilíbrio perfeito entre a tradição
                  que respeita as raízes e a inovação que surpreende o paladar.
                </p>
                <p>
                  Cada prato que sai das nossas cozinhas é resultado de um
                  processo cuidadoso: da escolha criteriosa dos ingredientes à
                  técnica apurada de preparo, passando por uma apresentação que
                  encanta antes mesmo da primeira garfada. Trabalhamos com
                  produtores locais, valorizamos a sazonalidade dos ingredientes
                  e trazemos referências da alta gastronomia internacional
                  adaptadas ao melhor do terroir brasileiro.
                </p>
                <p>
                  Mais do que alimentar, queremos criar memórias. Uma refeição
                  no Monte Carlo é um momento de pausa, de apreciação e de
                  celebração — um ritual que honra a tradição dos grandes
                  salões europeus com a hospitalidade calorosa que nos define.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ A EXPERIÊNCIA ═══════════ */}
      <section
        id="experiencia"
        className="scroll-mt-24 bg-[#fcfaf6] py-12 lg:py-20 border-y border-black/5"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b1a1a] font-medium mb-3">
            A Experiência
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Ambientes Pensados para o Prazer à Mesa
          </h2>
          <div className="space-y-4 text-[#525252] text-sm lg:text-base leading-relaxed mb-8">
            <p>
              Cada espaço gastronômico do Monte Carlo foi projetado para
              proporcionar uma experiência sensorial completa. A iluminação
              intimista, a acústica cuidadosamente planejada e o design de
              interiores que mescla elementos clássicos com toques
              contemporâneos criam o cenário ideal para refeições inesquecíveis.
            </p>
            <p>
              Nossos ambientes respeitam a privacidade de quem busca uma
              refeição tranquila a dois e, ao mesmo tempo, acolhem grupos que
              desejam celebrar juntos. Mesas espaçosas, um serviço atencioso
              sem ser invasivo e uma curadoria musical que complementa o clima
              — tudo converge para que você se sinta verdadeiramente recebido.
            </p>
          </div>

          {/* Mini galeria */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop",
                alt: "Ambiente sofisticado de restaurante",
                caption: "Salão Principal",
              },
              {
                src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&auto=format&fit=crop",
                alt: "Mesa preparada com detalhes",
                caption: "Mise en Place",
              },
              {
                src: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&auto=format&fit=crop",
                alt: "Bar com iluminação quente",
                caption: "Bar Lounge",
              },
            ].map((img) => (
              <div
                key={img.caption}
                className="relative rounded-xl overflow-hidden aspect-[4/3]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-medium">
                  {img.caption}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CARDÁPIO DO DIA ═══════════ */}
      <section className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8b1a1a] font-medium mb-3">
                Sempre Renovado
              </p>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight">
                Cardápios que Respeitam as Estações
              </h2>
              <div className="space-y-4 text-[#525252] text-sm lg:text-base leading-relaxed">
                <p>
                  Nossos cardápios são renovados diariamente, acompanhando a
                  sazonalidade dos ingredientes e a criatividade da nossa
                  equipe. A cada visita, uma nova proposta gastronômica espera
                  por você — desde opções executivas completas e equilibradas
                  até pratos à la carte que exploram sabores ousados e
                  combinações inéditas.
                </p>
                <p>
                  O compromisso com a frescura dos ingredientes garante que
                  cada proteína, guarnição e salada atinja o seu ponto máximo
                  de sabor. Trabalhamos com fornecedores que compartilham dos
                  nossos valores de qualidade e sustentabilidade, assegurando
                  que o melhor da natureza chegue ao seu prato.
                </p>
                <p>
                  Acompanhe os cardápios da semana diretamente pela nossa
                  plataforma e planeje sua próxima refeição no Monte Carlo.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop"
                  alt="Prato elaborado com ingredientes frescos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ BAR & VINHOS ═══════════ */}
      <section
        id="bar"
        className="scroll-mt-24 bg-[#2A0303] py-12 lg:py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop"
                  alt="Taça de vinho em ambiente elegante"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <p className="text-xs uppercase tracking-[0.3em] text-[#e5b62a] font-medium mb-3">
                Bar & Carta de Vinhos
              </p>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                Drinks de Autor e Rótulos Selecionados
              </h2>
              <div className="space-y-4 text-white/70 text-sm lg:text-base leading-relaxed">
                <p>
                  Nosso bar é comandado por mixologistas que dominam a arte de
                  criar coquetéis que contam histórias. De releituras de
                  clássicos como o Old Fashioned e o Negroni a criações
                  autorais que homenageiam o universo do poker e de Mônaco,
                  cada drink é uma experiência em si.
                </p>
                <p>
                  A carta de vinhos reúne rótulos cuidadosamente selecionados
                  de regiões vinícolas consagradas — Bordeaux, Toscana,
                  Mendoza, Vale dos Vinhedos — escolhidos para harmonizar
                  perfeitamente com os pratos dos nossos restaurantes. Nossos
                  sommeliers estão sempre à disposição para guiar sua escolha e
                  tornar a experiência ainda mais especial.
                </p>
                <p>
                  Para quem prefere destilados, oferecemos uma seleção premium
                  de whiskeys single malt, cognacs e licores raros — porque no
                  Monte Carlo, cada gole é celebrado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EQUIPE CULINÁRIA ═══════════ */}
      <section className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b1a1a] font-medium mb-3">
            Nos Bastidores
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Uma Equipe Apaixonada pela Alta Gastronomia
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="w-full lg:w-2/3">
              <div className="space-y-4 text-[#525252] text-sm lg:text-base leading-relaxed">
                <p>
                  Por trás de cada prato, cada sobremesa e cada coquetel há uma
                  equipe dedicada de profissionais que compartilham a mesma
                  paixão: transformar ingredientes em emoções. Nossos chefs
                  trazem bagagens diversas — da formação em escolas
                  internacionais à experiência em restaurantes estrelados — e
                  encontram no Monte Carlo o cenário ideal para criar
                  livremente.
                </p>
                <p>
                  A cozinha é tratada como um ateliê, onde criatividade e
                  técnica se encontram diariamente. Nossos profissionais
                  participam de workshops, viagens gastronômicas e programas de
                  aperfeiçoamento contínuo, mantendo-se sempre na vanguarda
                  das tendências culinárias sem perder a essência que nos
                  define: sabor, qualidade e apresentação impecável.
                </p>
                <p>
                  Dos confeiteiros que finalizam sobremesas com precisão
                  milimétrica aos bartenders que equilibram notas aromáticas em
                  cada coquetel, cada membro da equipe tem papel fundamental
                  na orquestração de uma experiência gastronômica que merece
                  ser vivida — e repetida.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                {[
                  {
                    icon: Utensils,
                    label: "Chefs especializados",
                  },
                  {
                    icon: Wine,
                    label: "Sommeliers dedicados",
                  },
                  {
                    icon: Star,
                    label: "Atendimento premiado",
                  },
                  {
                    icon: Leaf,
                    label: "Foco em sustentabilidade",
                  },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-black/5 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#8b1a1a]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-[#8b1a1a]" />
                    </div>
                    <span className="text-sm font-medium text-[#1a1a1a]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ COMPROMISSO ═══════════ */}
      <section className="bg-[#fcfaf6] py-12 lg:py-20 border-y border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e5b62a] font-medium mb-3">
            Nosso Compromisso
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight max-w-2xl mx-auto">
            Excelência em Cada Detalhe, do Primeiro ao Último Prato
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-[#525252] text-sm lg:text-base leading-relaxed text-left">
            <p>
              No Monte Carlo, a gastronomia não é um complemento — é um dos
              pilares fundamentais da experiência que oferecemos. Trabalhamos
              com os mais altos padrões de higiene, segurança alimentar e
              sustentabilidade, assegurando que cada ingrediente seja
              rastreável e cada processo, transparente.
            </p>
            <p>
              Oferecemos opções que contemplam diferentes restrições e
              preferências alimentares, incluindo alternativas vegetarianas,
              pratos sem glúten e menus adaptáveis. Nosso objetivo é que todos
              os nossos convidados encontrem à mesa não apenas o que desejam,
              mas algo que supere suas expectativas.
            </p>
            <p>
              Do aroma que recebe na entrada ao sabor que permanece na memória,
              cada experiência gastronômica no Monte Carlo é projetada para
              ser tão sofisticada e envolvente quanto a própria essência do
              clube. Porque aqui, cada refeição é uma aposta certeira no
              prazer.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA FINAL ═══════════ */}
      <section className="bg-[#430904] py-12 lg:py-16 pb-24 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e5b62a] font-medium mb-3">
            Venha nos Visitar
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
            Sua Mesa Está Reservada
          </h2>
          <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-xl mx-auto mb-6">
            Descubra pessoalmente por que a gastronomia do Monte Carlo é
            considerada uma das mais sofisticadas do cenário de entretenimento
            brasileiro. Estamos prontos para recebê-lo.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/5511941213898"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 py-2 bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white hover:text-[#2A0303] rounded-full px-6 text-sm font-medium transition-colors"
            >
              Falar pelo WhatsApp
            </a>
            <Link
              href="/sobre#localizacao"
              className="inline-flex items-center justify-center h-10 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white/80 hover:bg-white/10 rounded-full px-6 text-sm font-medium transition-colors"
            >
              Como Chegar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
