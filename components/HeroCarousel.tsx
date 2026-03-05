"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { heroSlides } from "@/lib/data";
import { fetchBanners, type HeroSlide } from "@/lib/api/banners";

const fallbackSlides: HeroSlide[] = heroSlides.map((s) => ({
  id: s.id,
  image: s.image,
  title: s.title,
  subtitle: s.subtitle,
  cta: s.cta,
  ctaLink: s.ctaLink,
}));

export default function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>(fallbackSlides);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    fetchBanners("HOME_HERO").then((data) => {
      if (data.length > 0) {
        setSlides(data);
      }
    });
  }, []);

  useEffect(() => {
    setCurrent((c) => Math.min(c, Math.max(0, slides.length - 1)));
  }, [slides.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(Math.max(0, Math.min(index, slides.length - 1)));
    },
    [slides.length],
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else setCurrent((c) => (c - 1 + slides.length) % slides.length);
    }
  };

  const slide = slides[current] ?? slides[0];

  return (
    <section
      className="relative w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(-${current * 100}%, 0px, 0px)` }}
        >
          {slides.map((s) => (
            <div
              key={s.id}
              className="relative flex-[0_0_100%] min-w-0 aspect-[4/5] lg:aspect-[21/9]"
            >
              <Image
                src={s.image}
                alt={s.imageAlt ?? s.title.replace(/\n/g, " ")}
                fill
                className="object-cover"
                sizes="100vw"
                priority={slides[0]?.id === s.id}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom content - overlays the slider */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 lg:pb-16">
        <div className="text-center space-y-4 lg:max-w-2xl lg:mx-auto">
          <div className="space-y-1">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-wide text-white whitespace-pre-line">
              {slide.title}
            </h1>
          </div>
          <p className="text-white/80 text-sm tracking-wide max-w-xs mx-auto">
            {slide?.subtitle}
          </p>
          <Link
            href={slide?.ctaLink ?? "#"}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md h-10 mt-4 px-8 py-3 text-base font-semibold tracking-wide border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#121212] transition-all duration-300"
          >
            {slide?.cta}
          </Link>
          <div className="flex justify-center gap-2 pt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "h-2 w-6 bg-white" : "w-2 h-2 bg-white/30"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
