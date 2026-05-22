"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/site-config";

const SLIDE_MS = 7000;
const GLITCH_MS = 420;

type HeroSlideshowProps = {
  slides: readonly HeroSlide[];
  sizes: string;
};

export function HeroSlideshow({ slides, sizes }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return;

    let glitchTimer: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setGlitching(true);
      glitchTimer = setTimeout(() => {
        setIndex((current) => (current + 1) % slides.length);
        setGlitching(false);
      }, GLITCH_MS);
    }, SLIDE_MS);

    return () => {
      clearInterval(interval);
      if (glitchTimer) clearTimeout(glitchTimer);
    };
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className={[
        "hero-slideshow",
        glitching && "hero-slideshow--glitch",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-live="off"
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.filename}
          src={`/${slide.filename}`}
          alt={slide.alt}
          fill
          sizes={sizes}
          priority={i === 0}
          fetchPriority={i === 0 ? "high" : "auto"}
          className={[
            "hero-slideshow__slide",
            i === index && "hero-slideshow__slide--active",
          ]
            .filter(Boolean)
            .join(" ")}
          draggable={false}
        />
      ))}
      <div className="hero-slideshow__scanlines" aria-hidden="true" />
    </div>
  );
}
