import Image from "next/image";
import type { TextBlock } from "@/lib/api/pages";

type TextBlocksSectionProps = {
  textBlocks: TextBlock[];
};

export default function TextBlocksSection({ textBlocks }: TextBlocksSectionProps) {
  if (textBlocks.length === 0) return null;

  return (
    <section className="py-6 max-w-[480px] mx-auto lg:max-w-7xl lg:px-6 bg-[#fcfaf6]">
      <div className="px-4 space-y-8 lg:grid lg:grid-cols-1 lg:gap-8">
        {textBlocks.map((block) => (
          <article
            key={block.id}
            className="rounded-2xl overflow-hidden bg-white border border-[#e5e5e5] shadow-sm"
          >
            {block.imageUrl && (
              <div className="relative h-48 lg:h-64">
                <Image
                  src={block.imageUrl}
                  alt={block.imageAlt ?? block.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1280px"
                />
              </div>
            )}
            <div className="p-5 lg:p-6">
              <h2 className="text-xl lg:text-2xl font-serif font-bold text-[#1a1a1a] mb-3">
                {block.title}
              </h2>
              <div className="text-[#525252] text-sm lg:text-base leading-relaxed whitespace-pre-line">
                {block.content}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
