import Link from "next/link";
import {
  AppDownloadButton,
  appStoreIcon,
  googlePlayIcon,
} from "./AppDownloadButton";

type CtaBlockProps = {
  title: string;
  buttonText: string;
  href: string;
};

function CtaBlock({ title, buttonText, href }: CtaBlockProps) {
  return (
    <div className="flex flex-col gap-2 min-h-[88px] justify-center">
      <h3 className="text-[18px] font-bold text-white">{title}</h3>
      <Link
        href={href}
        className="inline-flex items-center justify-center w-fit py-2.5 px-8 rounded-full border border-white/30 text-white text-[14px] font-medium hover:border-white transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}

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
    href: "#",
  },
];

export function CtaSection() {
  return (
    <section className="bg-[#2a0303] px-4 py-8 max-w-[480px] mx-auto">
      <div className="flex flex-col gap-[25px]">
        {ctaBlocks.map((block) => (
          <CtaBlock
            key={block.id}
            title={block.title}
            buttonText={block.buttonText}
            href={block.href}
          />
        ))}
      </div>
    </section>
  );
}
