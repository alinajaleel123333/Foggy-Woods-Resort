"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=85",
    alt: "Misty morning pine forest",
    label: "01",
  },
  {
    url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1920&q=85",
    alt: "Foggy forest path",
    label: "02",
  },
  {
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=85",
    alt: "Sunbeams through forest canopy",
    label: "03",
  },
  {
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=85",
    alt: "Serene forest landscape",
    label: "04",
  },
];

const SLIDE_DURATION = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return;
      setPrev(current);
      setTransitioning(true);
      setCurrent(index);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 900);
    },
    [current, transitioning]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(goNext, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* ── Slideshow Images ── */}
      {slides.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prev;

        return (
          <div
            key={slide.url}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${
              isActive ? "opacity-100 z-10" : isPrev ? "opacity-0 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              priority={i === 0}
              quality={85}
              className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${
                isActive ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        );
      })}

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/50 via-black/10 to-black/70" />
      <div className="absolute inset-0 z-20 bg-black/20" />

      {/* ── Hero Content ── */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Eyebrow */}
        <p
          className="text-white/60 uppercase tracking-[0.35em] text-xs md:text-sm mb-6"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          A Sanctuary in the Woods
        </p>

        {/* Main Title */}
        <h1
          className="text-white text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] mb-8 drop-shadow-2xl"
          style={{ fontFamily: "'Boska', serif", fontWeight: 500, letterSpacing: '-0.03em' }}
        >
          Foggy Woods
        </h1>

        {/* Tagline */}
        <p
          className="text-white/70 text-base md:text-xl tracking-[0.15em] italic max-w-md mb-12"
          style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 300 }}
        >
          where fog meets serenity
        </p>

        {/* CTA */}
        <button
          className="px-8 py-3 border border-white/40 rounded-full text-white text-sm tracking-[0.15em] uppercase
                     hover:bg-white hover:text-zinc-900 transition-all duration-300"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Explore the Retreat
        </button>
      </div>

      {/* ── Slide Counter + Dots ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        {/* Dots */}
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? "w-8 h-[3px] bg-white"
                  : "w-[3px] h-[3px] bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Slide Number (bottom-right) ── */}
      <div
        className="absolute bottom-10 right-8 md:right-12 z-30 text-white/40 text-xs tracking-widest"
        style={{ fontFamily: "'Satoshi', sans-serif" }}
      >
        {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(slides.length).padStart(2, "0")}
      </div>

      {/* ── Scroll Cue (bottom-left) ── */}
      <div
        className="absolute bottom-8 left-8 md:left-12 z-30 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-white/80 animate-[scroll-line_2s_ease-in-out_infinite]" style={{ height: "40%" }} />
        </div>
        <span
          className="text-white/40 text-[10px] uppercase tracking-[0.25em] mt-1"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Scroll
        </span>
      </div>

    </section>
  );
}
