"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { heroSlides } from "@/lib/data";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section className="relative pt-14 min-h-[518px] mt-14 max-h-[518px]  flex flex-col justify-end overflow-hidden">
      {/* Background */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: s.bgGradient }}
        />
      ))}

      {/* Card visuals */}
      <div className="absolute top-[76px] left-1/2 -translate-x-1/2 w-[320px] h-[200px]">
        <div className="absolute w-[100px] h-[140px] rounded-lg bg-gradient-to-br from-[#c41e1e] to-[#8b1414] shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-2 border-white/10 flex items-center justify-center text-[2.5rem] text-white -rotate-[20deg] -translate-x-[60px] translate-y-[10px] z-[1]">
          ♠
        </div>
        <div className="absolute w-[100px] h-[140px] rounded-lg bg-gradient-to-br from-[#c41e1e] to-[#8b1414] shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-2 border-white/10 flex items-center justify-center text-[2.5rem] text-white -rotate-[5deg] -translate-x-[20px] left-1/2 top-1/2 -translate-y-1/2 z-[2]">
          ♥
        </div>
        <div className="absolute w-[100px] h-[140px] rounded-lg bg-gradient-to-br from-[#c41e1e] to-[#8b1414] shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-2 border-white/10 flex items-center justify-center text-[2.5rem] text-white rotate-[8deg] translate-x-[20px] translate-y-[5px] left-1/2 top-1/2 -translate-y-1/2 z-[3]">
          ♦
        </div>
        <div className="absolute w-[100px] h-[140px] rounded-lg bg-gradient-to-br from-[#c41e1e] to-[#8b1414] shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-2 border-white/10 flex items-center justify-center text-[2.5rem] text-white rotate-[22deg] translate-x-[60px] translate-y-[15px] right-0 z-[2]">
          ♣
        </div>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(18,18,18,0.3)] to-[rgba(18,18,18,1)]"
        style={{ backgroundPosition: "0 40%" }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 pb-7 text-center">
        <h1 className="text-[31px] font-bold leading-[1.15] mb-2.5 text-white whitespace-pre-line">
          {slide.title}
        </h1>
        <p className="text-[16px] leading-[1.5] text-text-secondary mb-5 max-w-[300px] mx-auto">
          {slide.subtitle}
        </p>
        <div className="my-10">
          <Link
            href={slide.ctaLink}
            className="border-2 border-white rounded-[12px] py-3 px-6 font-bold text-[17px]"
          >
            {slide.cta}
          </Link>
        </div>

        {/* Dots */}
        <div className="flex gap-1.5 justify-center mt-[18px]">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`hero-dot ${i === current ? "active" : ""}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
