"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { ExecutiveMenu } from "@/lib/api/dish-images";

type DishCarouselProps = {
  items: ExecutiveMenu[];
};

export default function DishCarousel({ items }: DishCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<ExecutiveMenu | null>(null);
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

  // Auto-advance
  useEffect(() => {
    if (lightboxItem) return; // pause when lightbox open
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, lightboxItem]);

  // Reset on images change
  useEffect(() => {
    setInternalIndex(1);
    setAnimate(true);
  }, [len]);

  /* ── Touch handling ── */
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

    if (dragOffset < -threshold) {
      next();
    } else if (dragOffset > threshold) {
      prev();
    }
    setDragOffset(0);
  };

  /* ── Mouse drag handling (desktop) ── */
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

    if (dragOffset < -threshold) {
      next();
    } else if (dragOffset > threshold) {
      prev();
    }
    setDragOffset(0);
  };

  const handleImageClick = (item: ExecutiveMenu) => {
    if (didDrag.current) return; // ignore clicks after drag
    setLightboxItem(item);
  };

  /* ── Lightbox close on Escape ── */
  useEffect(() => {
    if (!lightboxItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxItem(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxItem]);

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

  // Extended slides: [clone of last, ...real, clone of first]
  const extended = [items[len - 1], ...items, items[0]];

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Track */}
        <div
          className={`flex${animate && !isDragging.current ? " transition-transform duration-500 ease-out" : ""}`}
          style={{
            transform: `translate3d(calc(-${internalIndex * 100}% + ${dragOffset}px), 0, 0)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((item, i) => {
            const realI = i === 0 ? len - 1 : i === extended.length - 1 ? 0 : i - 1;
            return (
              <div
                key={`${item.id}-${i}`}
                className="relative flex-[0_0_100%] min-w-0 px-2"
              >
                <button
                  type="button"
                  onClick={() => handleImageClick(items[realI])}
                  className="relative w-full rounded-2xl overflow-hidden shadow-md border border-[#e5e0d5] cursor-pointer group block bg-[#f3f0e8]"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title || `Prato ${realI + 1}`}
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    sizes="(max-width: 1024px) 90vw, 33vw"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Dots */}
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

      {/* ── Lightbox ── */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative w-full max-w-lg lg:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              className="absolute -top-10 right-0 lg:-right-10 lg:top-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

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

            {/* Details */}
            <div className="mt-3 text-center">
              {lightboxItem.title && (
                <p className="text-white/90 text-sm font-medium">
                  {lightboxItem.title}
                </p>
              )}
              <p className="text-white/50 text-xs mt-0.5">
                {lightboxItem.description || "Monte Carlo Poker Club"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
