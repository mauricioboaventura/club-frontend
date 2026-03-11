import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Phone, Mail, Star, Users, Trophy, Utensils } from "lucide-react";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      {/* Hero */}
      <section className="relative bg-[#430904] pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Sobre o Monte Carlo
          </h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base max-w-xl">
            Conheça nossa história, nossa estrutura e tudo o que fazemos para
            oferecer a melhor experiência em poker e entretenimento.
          </p>
          {/* Âncoras rápidas */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: "Nossa História", href: "#nossa-historia" },
              { label: "Estrutura", href: "#estrutura" },
              { label: "Localização", href: "#localizacao" },
              { label: "Fale Conosco", href: "#contato" },
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#8b1a1a] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </Link>

        {/* Nossa História */}
        <section id="nossa-historia" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 pb-2 border-b border-black/10">
            Nossa História
          </h2>
          <div className="space-y-4 text-[#3a3a3a] leading-relaxed">
            <p>
              O Monte Carlo Poker Club nasceu da paixão genuína pelo poker e
              pela busca de um entretenimento sofisticado no Brasil. Desde sua
              fundação, o clube foi concebido para ser muito mais do que uma
              casa de jogos — é um ponto de encontro de cultura, gastronomia e
              experiências memoráveis.
            </p>
            <p>
              Inspirados nos grandes clubes internacionais, trouxemos ao Brasil
              um conceito inédito: unir a emoção das mesas de poker com a
              elegância de um ambiente premium, onde cada detalhe é pensado
              para proporcionar o melhor.
            </p>
            <p>
              Ao longo de nossa trajetória, consolidamos nossa posição como
              referência em torneios de alto nível, cash games e eventos
              exclusivos, atraindo jogadores de todo o Brasil e do mundo.
            </p>
          </div>
        </section>

        {/* Diferenciais */}
        <section>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 pb-2 border-b border-black/10">
            Nossa Missão & Diferenciais
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Trophy, label: "Torneios GTD", desc: "Premiações garantidas todo mês" },
              { icon: Clock, label: "24 horas", desc: "Cash games sem horário para parar" },
              { icon: Utensils, label: "Gastronomia", desc: "Alta culinária no coração do clube" },
              { icon: Users, label: "Comunidade", desc: "Programa MC Rewards exclusivo" },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-white border border-black/5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8b1a1a]/10 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-[#8b1a1a]" />
                </div>
                <span className="text-sm font-semibold text-[#1a1a1a]">{label}</span>
                <span className="text-xs text-[#5f5a54] mt-1 leading-snug">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Estrutura */}
        <section id="estrutura" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 pb-2 border-b border-black/10">
            Estrutura do Clube
          </h2>
          <div className="space-y-4 text-[#3a3a3a] leading-relaxed">
            <p>
              Nossa estrutura foi projetada para oferecer conforto, segurança e
              a melhor experiência possível a cada visita.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {[
                { title: "Salas de Torneio", desc: "Espaços amplos com mesas profissionais, iluminação dedicada e sistema de som ambiente." },
                { title: "Area de Cash Game", desc: "Mesas disponíveis 24 horas, com diferentes stakes para todos os perfis de jogadores." },
                { title: "Restaurante & Bar", desc: "Gastronomia contemporânea servida durante toda a operação do clube." },
                { title: "Lounge VIP", desc: "Ambiente exclusivo para membros e convidados especiais com serviço personalizado." },
                { title: "Estacionamento", desc: "Estacionamento próprio e conveniado com manobrista para maior comodidade." },
                { title: "Segurança", desc: "Câmeras e equipe de segurança 24 horas garantindo um ambiente tranquilo e protegido." },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl bg-white border border-black/5 shadow-sm">
                  <Star className="h-4 w-4 text-[#8b1a1a] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{title}</p>
                    <p className="text-sm text-[#5f5a54] mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Localização */}
        <section id="localizacao" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 pb-2 border-b border-black/10">
            Localização
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex gap-3 p-5 rounded-xl bg-white border border-black/5 shadow-sm flex-1">
              <MapPin className="h-5 w-5 text-[#8b1a1a] mt-0.5 flex-shrink-0" />
              <div className="space-y-1 text-[#3a3a3a]">
                <p className="font-semibold text-[#1a1a1a]">Monte Carlo Poker Club</p>
                <p className="text-sm">São Paulo — SP</p>
                <p className="text-sm text-[#5f5a54]">
                  Entre em contato para obter o endereço completo e informações de acesso.
                </p>
                <div className="flex gap-2 flex-wrap mt-3">
                  <a
                    href="https://wa.me/5511941213898"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-1.5 rounded-lg bg-[#8b1a1a] text-white text-xs font-medium hover:bg-[#6d1414] transition-colors"
                  >
                    Falar pelo WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 pb-2 border-b border-black/10">
            Fale Conosco
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="tel:+5511941213898"
              className="flex items-center gap-4 p-5 rounded-xl bg-white border border-black/5 shadow-sm hover:border-[#8b1a1a]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#8b1a1a]/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-[#8b1a1a]" />
              </div>
              <div>
                <p className="text-xs text-[#5f5a54] font-medium uppercase tracking-wide">Telefone</p>
                <p className="text-sm font-semibold text-[#1a1a1a] mt-0.5">+55 (11) 9 4121-3898</p>
              </div>
            </a>
            <a
              href="mailto:contato@montecarloeventos.com"
              className="flex items-center gap-4 p-5 rounded-xl bg-white border border-black/5 shadow-sm hover:border-[#8b1a1a]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#8b1a1a]/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-[#8b1a1a]" />
              </div>
              <div>
                <p className="text-xs text-[#5f5a54] font-medium uppercase tracking-wide">E-mail</p>
                <p className="text-sm font-semibold text-[#1a1a1a] mt-0.5">contato@montecarloeventos.com</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
