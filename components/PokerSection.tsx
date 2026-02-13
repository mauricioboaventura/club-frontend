import Link from "next/link";
import { pokerSections } from "@/lib/data";

export default function PokerSection() {
  return (
    <section className="px-4 py-7 max-w-[480px] mx-auto bg-[#fcfaf6]">
      <div className="mb-3">
        <h2 className="text-[15px] uppercase font-extrabold tracking-[0.5px] text-[#8c8c8c]">
          POKER
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {pokerSections.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="rounded-[14px] bg-[#2d2d2d] p-4 min-h-[128px] flex flex-col justify-between hover:bg-[#252525] transition-colors"
          >
            <h3 className="text-[16px] font-bold text-white mb-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-[12px] text-[#b8b8b8] leading-[1.5] mb-4">
              {item.description}
            </p>
            <span className="text-[12px] font-bold text-center text-white">
              {item.linkLabel}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
