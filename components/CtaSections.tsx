import Link from "next/link";

const ctaBlocks = [
  {
    id: 1,
    title: "Monte Carlo Rewards",
    buttonText: "Conheça o programa",
    href: "/rewards",
  },
  {
    id: 2,
    title: "Entre ou cadastre-se",
    buttonText: "Receber ofertas",
    href: "/auth",
  },
];

export function CtaSection() {
  return (
    <div className="border-b border-white/10 px-4 py-8 bg-[#2a0303]">
      <div className="max-w-4xl mx-auto">
        {ctaBlocks.map((block, i) => (
          <div key={block.id} className={i > 0 ? "mt-8" : ""}>
            <h3 className="text-lg font-semibold text-white mb-3">
              {block.title}
            </h3>
            <Link
              href={block.href}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-white/30 rounded-full text-sm text-white hover:bg-white/10 transition-colors"
            >
              {block.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
