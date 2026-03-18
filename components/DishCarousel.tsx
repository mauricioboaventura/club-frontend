"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ExecutiveMenu } from "@/lib/api/dish-images";

type DishCarouselProps = {
  items: ExecutiveMenu[];
};

/* Circular offset: how far `itemIndex` is from `current` in a ring of `total` */
function getOffset(itemIndex: number, current: number, total: number) {
  let diff = itemIndex - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function DishCarousel({ items }: DishCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const isDragging = useRef(false);
  const touchStartX = useRef(0);
  const isTransitioning = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const didDrag = useRef(false);

  const len = items.length;
  const realIndex =
    len === 0
      ? 0
      : internalIndex <= 0
        ? len - 1
        : internalIndex >= len + 1
          ? 0
          : internalIndex - 1;

  /* ── Desktop detection ── */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
      setInternalIndex(index + 1);
    },
    [len],
  );

  /* ── Mobile: clone-based wrap reset ── */
  const handleTransitionEnd = useCallback(() => {
    isTransitioning.current = false;
    if (internalIndex >= len + 1) {
      setAnimate(false);
      setInternalIndex(1);
    } else if (internalIndex <= 0) {
      setAnimate(false);
      setInternalIndex(len);
    }
  }, [internalIndex, len]);

  /* ── Desktop: timeout-based wrap reset ── */
  useEffect(() => {
    if (!isDesktop || len === 0) return;
    if (internalIndex < 1 || internalIndex > len) {
      const timer = setTimeout(() => {
        setAnimate(false);
        setInternalIndex(internalIndex >= len + 1 ? 1 : len);
        requestAnimationFrame(() => {
          isTransitioning.current = false;
        });
      }, 550);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      isTransitioning.current = false;
    }, 550);
    return () => clearTimeout(timer);
  }, [isDesktop, internalIndex, len]);

  // Auto-advance
  useEffect(() => {
    if (lightboxIndex !== null) return;
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next, lightboxIndex]);

  // Reset on items change
  useEffect(() => {
    setInternalIndex(1);
    setAnimate(true);
  }, [len]);

  /* ── Touch handling (mobile) ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning.current) return;
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    didDrag.current = false;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const diff = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 5) didDrag.current = true;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const containerWidth = containerRef.current?.offsetWidth ?? 1;
    const threshold = containerWidth * 0.15;
    if (dragOffset < -threshold) next();
    else if (dragOffset > threshold) prev();
    setDragOffset(0);
  };

  /* ── Mouse drag handling (desktop carousel) ── */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTransitioning.current) return;
    e.preventDefault();
    touchStartX.current = e.clientX;
    isDragging.current = true;
    didDrag.current = false;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diff = e.clientX - touchStartX.current;
    if (Math.abs(diff) > 5) didDrag.current = true;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const containerWidth = containerRef.current?.offsetWidth ?? 1;
    const threshold = containerWidth * 0.15;
    if (dragOffset < -threshold) next();
    else if (dragOffset > threshold) prev();
    setDragOffset(0);
  };

  /* ── Open lightbox by index ── */
  const handleImageClick = (index: number) => {
    if (didDrag.current) return;
    setLightboxIndex(index);
  };

  /* ── Lightbox navigation ── */
  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % len : null));
  }, [len]);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + len) % len : null));
  }, [len]);

  /* ── Keyboard: lightbox nav + close ── */
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      else if (e.key === "ArrowRight") lightboxNext();
      else if (e.key === "ArrowLeft") lightboxPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, lightboxNext, lightboxPrev]);

  const lightboxItem =
    lightboxIndex !== null ? items[lightboxIndex] : null;

  /* ── Empty / loading state ── */
  if (len === 0) {
    return (
      <div className="flex gap-4 overflow-hidden px-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse flex-shrink-0 w-[70vw] sm:w-[45vw] lg:w-[30%] aspect-square rounded-2xl bg-[#e5e0d5]"
          />
        ))}
      </div>
    );
  }

  // Extended slides for mobile: [clone of last, ...real, clone of first]
  const extended = [items[len - 1], ...items, items[0]];

  return (
    <>
      {/* ════════════ MOBILE CAROUSEL (< lg) ════════════ */}
      <div
        ref={!isDesktop ? containerRef : undefined}
        className={`relative w-full overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing${isDesktop ? " hidden" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className={`flex${animate && !isDragging.current ? " transition-transform duration-500 ease-out" : ""}`}
          style={{
            transform: `translate3d(calc(-${internalIndex * 100}% + ${dragOffset}px), 0, 0)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((item, i) => {
            const realI =
              i === 0 ? len - 1 : i === extended.length - 1 ? 0 : i - 1;
            return (
              <div
                key={`m-${item.id}-${i}`}
                className="relative flex-[0_0_100%] min-w-0 px-2"
              >
                <button
                  type="button"
                  onClick={() => handleImageClick(realI)}
                  className="relative w-full rounded-2xl overflow-hidden shadow-md border border-[#e5e0d5] cursor-pointer group block bg-[#f3f0e8]"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title || `Prato ${realI + 1}`}
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    sizes="90vw"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Dots (mobile) */}
        {len > 1 && (
          <div className="flex justify-center gap-1.5 pt-4 pb-1">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === realIndex
                    ? "h-2 w-5 bg-[#8b1a1a]"
                    : "w-2 h-2 bg-[#8b1a1a]/25"
                }`}
                aria-label={`Prato ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ════════════ DESKTOP COVERFLOW (lg+) ════════════ */}
      <div
        ref={isDesktop ? containerRef : undefined}
        className={`relative w-full select-none${isDesktop ? "" : " hidden"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Coverflow track — cards stacked via grid */}
        <div className="grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1 cursor-grab active:cursor-grabbing">
          {items.map((item, i) => {
            const offset = getOffset(i, realIndex, len);
            const isVisible = Math.abs(offset) <= 1;
            const isCenter = offset === 0;

            return (
              <div
                key={`d-${item.id}`}
                className="w-[55%] pointer-events-auto"
                style={{
                  transform: `translateX(${offset * 45}%) scale(${isCenter ? 1 : 0.85})`,
                  zIndex: isCenter ? 10 : isVisible ? 5 : 0,
                  opacity: isCenter ? 1 : isVisible ? 0.55 : 0,
                  transition: animate
                    ? "transform 500ms ease-out, opacity 500ms ease-out"
                    : "none",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (didDrag.current) return;
                    if (isCenter) handleImageClick(i);
                    else goTo(i);
                  }}
                  className={`relative w-full rounded-2xl overflow-hidden shadow-lg border border-[#e5e0d5] bg-[#f3f0e8] block ${isCenter ? "cursor-pointer group" : "cursor-pointer"}`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title || `Prato ${i + 1}`}
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105"
                    sizes="33vw"
                    draggable={false}
                  />
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Arrow buttons (desktop) */}
        {len > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md text-[#8b1a1a] transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md text-[#8b1a1a] transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots (desktop) */}
        {len > 1 && (
          <div className="flex justify-center gap-1.5 pt-6 pb-1">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === realIndex
                    ? "h-2 w-5 bg-[#8b1a1a]"
                    : "w-2 h-2 bg-[#8b1a1a]/25"
                }`}
                aria-label={`Prato ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ════════════ LIGHTBOX ════════════ */}
      {lightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-lg lg:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-10 right-0 lg:-right-10 lg:top-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev arrow */}
            {len > 1 && (
              <button
                type="button"
                onClick={lightboxPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+8px)] lg:-translate-x-[calc(100%+16px)] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Next arrow */}
            {len > 1 && (
              <button
                type="button"
                onClick={lightboxNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+8px)] lg:translate-x-[calc(100%+16px)] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
                aria-label="Próximo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* Image */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-black/50 flex items-center justify-center">
              <Image
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title || "Prato em destaque"}
                width={1200}
                height={1200}
                className="w-full h-auto max-h-[80vh] object-contain"
                sizes="(max-width: 1024px) 95vw, 640px"
                priority
              />
            </div>

            {/* Details + counter */}
            <div className="mt-3 text-center">
              {lightboxItem.title && (
                <p className="text-white/90 text-sm font-medium">
                  {lightboxItem.title}
                </p>
              )}
              <p className="text-white/50 text-xs mt-0.5">
                {lightboxItem.description || "Monte Carlo Poker Club"}
              </p>
              {len > 1 && (
                <p className="text-white/40 text-xs mt-2">
                  {lightboxIndex + 1} / {len}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
