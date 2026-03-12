import Link from "next/link";
import { ArrowLeft, Sofa } from "lucide-react";

export default function LoungesPage() {
  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      <section className="relative bg-[#430904] pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-wide text-white">
            Lounges
          </h1>
          <p className="text-white/80 mt-2 text-sm lg:text-base leading-relaxed">
            Ambientes exclusivos para relaxar e socializar
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
          <Sofa className="h-12 w-12 text-[#ccc] mx-auto mb-4" />
          <h2 className="font-serif text-xl lg:text-2xl font-bold text-[#1a1a1a] mb-2 leading-tight">
            Em breve
          </h2>
          <p className="text-[#6b6660] max-w-md mx-auto">
            Nossos lounges exclusivos estão sendo preparados. Em breve você
            poderá conhecer os espaços e fazer sua reserva.
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
