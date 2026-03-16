"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { HeroSlide } from "@/lib/api/banners";

type HeroCarouselProps = {
  initialSlides?: HeroSlide[];
};

export default function HeroCarousel({ initialSlides }: HeroCarouselProps) {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides ?? []);
  // internalIndex operates on the extended array: [lastClone, ...slides, firstClone]
  // so real slide 0 is at internalIndex 1
  const [internalIndex, setInternalIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const dragAxis = useRef<"x" | "y" | null>(null);
  const isTransitioning = useRef(false);
  const paused = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const len = slides.length;
  // The "real" slide index (0-based) for content display and dots
  const realIndex =
    len === 0
      ? 0
      : internalIndex <= 0
        ? len - 1
        : internalIndex >= len + 1
          ? 0
          : internalIndex - 1;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (initialSlides && initialSlides.length > 0) {
      setSlides(initialSlides);
    }
  }, [initialSlides]);

  useEffect(() => {
    setInternalIndex(1);
    setAnimate(true);
  }, [len]);

  const next = useCallback(() => {
    if (isTransitioning.current || len === 0) return;
    isTransitioning.current = true;
    setAnimate(true);
    setInternalIndex((c) => c + 1);
  }, [len]);

  const prev = useCallback(() => {
    if (isTransitioning.current || len === 0) return;
    isTransitioning.current = true;
    setAnimate(true);
    setInternalIndex((c) => c - 1);
  }, [len]);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning.current || len === 0) return;
      isTransitioning.current = true;
      setAnimate(true);
      setInternalIndex(index + 1); // +1 because of prepended clone
    },
    [len],
  );

  // After transition ends, snap to the real position if we're on a clone
  const handleTransitionEnd = useCallback(() => {
    isTransitioning.current = false;
    if (internalIndex >= len + 1) {
      // We're on the cloned first slide → jump to real first
      setAnimate(false);
      setInternalIndex(1);
    } else if (internalIndex <= 0) {
      // We're on the cloned last slide → jump to real last
      setAnimate(false);
      setInternalIndex(len);
    }
  }, [internalIndex, len]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) next();
    }, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning.current) return;
    paused.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    dragAxis.current = null;
    isDragging.current = true;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    if (!dragAxis.current) {
      // Wait for a small movement before locking the gesture axis.
      if (Math.abs(diffX) < 6 && Math.abs(diffY) < 6) return;
      dragAxis.current = Math.abs(diffX) > Math.abs(diffY) ? "x" : "y";
    }

    if (dragAxis.current !== "x") return;

    // During horizontal swipe, prevent page vertical scroll jitter.
    e.preventDefault();
    setDragOffset(diffX);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (dragAxis.current !== "x") {
      dragAxis.current = null;
      setDragOffset(0);
      return;
    }

    const containerWidth = containerRef.current?.offsetWidth ?? 1;
    const threshold = containerWidth * 0.15;

    if (dragOffset < -threshold) {
      next();
    } else if (dragOffset > threshold) {
      prev();
    }
    dragAxis.current = null;
    paused.current = false;
    setDragOffset(0);
  };

  if (slides.length === 0) return null;

  // Extended slides: [clone of last, ...real slides, clone of first]
  const extendedSlides = [slides[len - 1], ...slides, slides[0]];
  const slide = slides[realIndex] ?? slides[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full max-h-screen overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="overflow-hidden">
        <div
          className={`flex${animate && !isDragging.current ? " transition-transform duration-500 ease-out" : ""}`}
          style={{
            transform: `translate3d(calc(-${internalIndex * 100}% + ${dragOffset}px), 0px, 0px)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((s, i) => (
            <div
              key={`${s.id}-${i}`}
              className="relative flex-[0_0_100%] min-w-0 aspect-[4/5] lg:aspect-[21/9]"
            >
              <Image
                src={isMobile && s.mobileImage ? s.mobileImage : s.image}
                alt={s.imageAlt ?? s.title.replace(/\n/g, " ")}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 1}
              />
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
          <p className="text-white/80 text-sm tracking-wide max-w-xs mx-auto hidden sm:block">
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
                  i === realIndex
                    ? "h-2 w-6 bg-white"
                    : "w-2 h-2 bg-white/30"
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
