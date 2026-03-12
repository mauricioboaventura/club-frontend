import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export default function PacotesPage() {
  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      <section className="relative bg-[#430904] pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-wide text-white">
            Pacotes
          </h1>
          <p className="text-white/80 mt-2 text-sm lg:text-base leading-relaxed">
            Pacotes exclusivos do Monte Carlo Poker Club
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#8b1a1a] hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </Link>

        <div className="text-center py-16">
          <Package className="h-12 w-12 text-[#ccc] mx-auto mb-4" />
          <h2 className="font-serif text-xl lg:text-2xl font-bold text-[#1a1a1a] mb-2 leading-tight">
            Em breve
          </h2>
          <p className="text-[#6b6660] max-w-md mx-auto">
            Estamos preparando pacotes especiais para você. Em breve você poderá
            conferir todas as opções disponíveis com condições exclusivas.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-2.5 rounded-lg bg-[#8b1a1a] text-white text-sm font-medium hover:bg-[#6d1414] transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </section>
    </main>
  );
}
