"use client";

import Image from "next/image";
import { useState } from "react";
import { Wifi, Snowflake, Tv, Coffee, Bath, ChevronRight, ChevronLeft } from "lucide-react";

const accommodations = [
  {
    title: "Premier Family Suite with Mountain View",
    images: ["/accommodations/premier-family-suite.jpg"],
    description: "Featuring two spacious bedrooms for up to 4 adults, this elegant family suite offers breathtaking Chembra Peak and mountain views. Thoughtfully designed for comfort and relaxation, it’s the perfect retreat for a memorable family stay.",
  },
  {
    title: "Grand Family Suite with Mountain View",
    images: ["/accommodations/grand-family-suite.jpg"],
    description: "Our three-bedroom Grand Family Suite comfortably accommodates up to 6 adults, offering breathtaking mountain views and spacious interiors. Designed for larger families, it combines modern comfort, privacy, and the serene beauty of Chembra Peak for a truly memorable stay.",
  },
  {
    title: "Private Pool Villa",
    images: [
      "/accommodations/private-pool-villa.jpg",
      "/accommodations/pool-villa-1.jpg",
      "/accommodations/pool-villa-2.jpg",
      "/accommodations/pool-villa-3.jpg",
      "/accommodations/pool-villa-4.jpg"
    ],
    description: "Designed exclusively for couples, our Private Pool Villa – Chembra View features a private swimming pool, elegant interiors, and panoramic mountain views. Unwind in complete privacy while enjoying a romantic escape surrounded by the serene beauty of Chembra Peak.",
  },
];

export default function Accommodations() {
  return (
    <section id="accommodations" className="w-full py-24 md:py-32 bg-[#f9f8f6] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <h2 
            className="text-3xl md:text-5xl text-[#5d3e2e] leading-[1.2] max-w-2xl"
            style={{ fontFamily: "'Boska', serif", fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            Browse your comfortable accommodation options
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center group">
          {/* Left Arrow (Desktop only) */}
          <button className="hidden lg:flex absolute -left-16 w-12 h-12 items-center justify-center border border-[#d6d3d1] rounded-full text-[#78716c] hover:bg-[#5d3e2e] hover:text-white hover:border-[#5d3e2e] transition-all duration-300">
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {accommodations.map((room, idx) => (
              <AccommodationCard key={idx} room={room} />
            ))}
          </div>

          {/* Right Arrow (Desktop only) */}
          <button className="hidden lg:flex absolute -right-16 w-12 h-12 items-center justify-center border border-[#d6d3d1] rounded-full text-[#78716c] hover:bg-[#5d3e2e] hover:text-white hover:border-[#5d3e2e] transition-all duration-300">
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Global Action Button */}
        <div className="mt-16 flex justify-center">
          <button 
            className="px-10 py-4 bg-[#5d3e2e] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#462e22] transition-colors"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            <span className="flex items-center gap-3">
              <ChevronLeft className="w-3 h-3 opacity-70" />
              Book Now
              <ChevronRight className="w-3 h-3 opacity-70" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function AccommodationCard({ room }: { room: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="bg-white flex flex-col group/card shadow-sm hover:shadow-xl transition-shadow duration-500">
      {/* Image Slider */}
      <div className="relative h-64 md:h-72 w-full overflow-hidden group">
        <Image 
          src={room.images[currentImageIndex]}
          alt={room.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover/card:scale-105"
        />
        
        {room.images.length > 1 && (
          <>
            {/* Slider Controls */}
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/70 hover:bg-white text-zinc-800 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/70 hover:bg-white text-zinc-800 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {room.images.map((_: any, i: number) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentImageIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col flex-grow text-center items-center">
        <h3 
          className="text-2xl text-[#5d3e2e] mb-4"
          style={{ fontFamily: "'Boska', serif", fontWeight: 500 }}
        >
          {room.title}
        </h3>
        <p 
          className="text-[#78716c] text-sm leading-[1.8] mb-8"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          {room.description}
        </p>

        <div className="mt-auto w-full">
          {/* Amenities Icons */}
          <div className="flex items-center justify-center gap-4 text-[#a8a29e] mb-8">
            <Wifi className="w-4 h-4" />
            <Snowflake className="w-4 h-4" />
            <Tv className="w-4 h-4" />
            <Coffee className="w-4 h-4" />
            <Bath className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
