import Link from "next/link";
import { pokerSections } from "@/lib/data";

export default function PokerSection() {
  return (
    <section className="py-6 max-w-[480px] mx-auto lg:max-w-7xl lg:px-6 bg-[#fcfaf6]">
      <div className="hidden lg:flex items-center justify-between px-4 mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#8c8c8c]">
          Poker
        </h2>
        <Link
          href="/poker"
          className="text-sm text-[#8c8c8c] underline underline-offset-2 hover:text-[#525252] transition-colors"
        >
          Ver tudo
        </Link>
      </div>
      {/* Mobile: card único com nome POKER centralizado */}
      <div className="lg:hidden px-4">
        <Link
          href="/poker"
          className="relative rounded-xl overflow-hidden flex items-center justify-center h-40 cursor-pointer hover:scale-[1.02] transition-transform group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${pokerSections[0].image}')`,
              backgroundColor: "#1a1510",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"
            aria-hidden
          />
          <span className="relative z-10 text-4xl font-black uppercase tracking-widest text-white drop-shadow-lg">
            Poker
          </span>
        </Link>
      </div>

      {/* Desktop: grid original com 2 itens */}
      <div className="hidden lg:grid grid-cols-2 gap-3 px-4">
        {pokerSections.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="relative rounded-xl overflow-hidden p-4 flex flex-col h-32 cursor-pointer hover:scale-[1.02] transition-transform group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${item.image}')`,
                backgroundColor: "#1a1510",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"
              aria-hidden
            />
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <h3 className="text-base font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-white/70 mb-auto leading-relaxed">
                {item.description}
              </p>
              <span className="inline-flex items-center justify-center rounded-md px-3 w-full h-8 text-xs font-medium text-white group-hover:bg-white/10 mt-2 transition-colors">
                {item.linkLabel}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
