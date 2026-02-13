"use client";

import Link from "next/link";
import Image from "next/image";
import CardButton from "./CardButton";

type SectionCardProps = {
  href: string;
  image: { src: string; alt: string };
  title: React.ReactNode;
  description: React.ReactNode;
  badge?: string;
  buttonText: string;
  buttonIcon?: React.ReactNode;
};

export default function SectionCard({
  href,
  image,
  title,
  description,
  badge,
  buttonText,
  buttonIcon,
}: SectionCardProps) {
  return (
    <Link
      href={href}
      className="flex-shrink-0 w-[280px] flex flex-col bg-white rounded-2xl overflow-hidden border border-[#1a1a1a]/10"
    >
      {/* Image */}
      <div className="relative h-[128px] rounded-t-2xl overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-4 flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-[15px] font-bold text-[#4a4a4a] leading-tight flex-1 min-w-0">
              {title}
            </h3>
            {badge != null && badge !== "" && (
              <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full bg-[#EDE8DB] text-black text-[11px] font-normal">
                {badge}
              </span>
            )}
          </div>
          {typeof description === "string" ? (
            <p className="text-[13px] text-[#8c8c8c] leading-snug">
              {description}
            </p>
          ) : (
            <div className="text-[13px] text-[#8c8c8c] leading-snug">
              {description}
            </div>
          )}
        </div>
        <CardButton icon={buttonIcon}>{buttonText}</CardButton>
      </div>
    </Link>
  );
}
