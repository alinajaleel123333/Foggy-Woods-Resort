"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    url: "/hero/resort-pool.jpg",
    alt: "Foggy Woods resort exterior with sparkling swimming pool",
    label: "01",
    objectPosition: "center 65%",   // shift down to show the pool
  },
  {
    url: "/hero/room-mountain-view.jpg",
    alt: "Luxury room with panoramic mountain view from private balcony",
    label: "02",
    objectPosition: "center 45%",   // shift up slightly to show mountains through window
  },
  {
    url: "/hero/pool-suite.jpg",
    alt: "Premium pool suite with ambient pink lighting and waterfall feature",
    label: "03",
    objectPosition: "center 40%",   // shift up to show pink ceiling lighting + pool
  },
  {
    url: "/hero/resort-garden.jpg",
    alt: "Resort garden with decorative swing and lush landscaping",
    label: "04",
    objectPosition: "center 55%",   // shift down to show swing seat and lawn
  },
  {
    url: "/hero/premium-room.jpg",
    alt: "Premium room with golden accent wall and mountain views",
    label: "05",
    objectPosition: "center 55%",   // shift down to show bed and golden wall
  },
  {
    url: "/hero/pool-suite-view.jpg",
    alt: "Pool suite with private plunge pool and tropical greenery",
    label: "06",
    objectPosition: "center 45%",   // shift up to show ceiling lights + pool view
  },
  {
    url: "/hero/pool-suite-interior.jpg",
    alt: "Luxury pool suite with waterfall feature and private plunge pool",
    label: "07",
    objectPosition: "35% 55%",      // shift left + down to focus on pool & waterfall
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
              quality={100}
              unoptimized
              sizes="100vw"
              style={{ objectPosition: slide.objectPosition }}
              className={`object-cover transition-transform duration-[6000ms] ease-out ${
                isActive ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        );
      })}

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* ── Hero Content ── */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Eyebrow */}
        <p
          className="text-white/60 uppercase tracking-[0.35em] text-xs md:text-sm mb-6"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          The perfect mountain escape
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
        <a
          href="#the-retreat"
          className="px-8 py-3 border border-white/40 rounded-full text-white text-sm tracking-[0.15em] uppercase
                     hover:bg-white hover:text-zinc-900 transition-all duration-300 inline-block"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Explore the Retreat
        </a>
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
