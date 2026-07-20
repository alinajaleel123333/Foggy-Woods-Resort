"use client";

import Image from "next/image";
import { useState } from "react";
import { Wifi, Snowflake, Tv, Coffee, Bath, ChevronRight, ChevronLeft } from "lucide-react";

const accommodations = [
  {
    title: "Premier Family Suite with Mountain View",
    images: [
      "/accommodations/premier-family-suite.jpg",
      "/accommodations/premier-family-suite-2.jpg"
    ],
    description: "Featuring two spacious bedrooms for up to 4 adults and 2 children, this elegant family suite offers breathtaking Chembra Peak and mountain views. Thoughtfully designed for comfort and relaxation, it’s the perfect retreat for a memorable family stay.",
  },
  {
    title: "Grand Family Suite with Mountain View",
    images: [
      "/accommodations/grand-family-suite.jpg",
      "/accommodations/grand-family-suite-2.jpg",
      "/accommodations/grand-family-suite-3.jpg"
    ],
    description: "Our three-bedroom Grand Family Suite comfortably accommodates up to 6 adults and 2 children, offering breathtaking mountain views and spacious interiors. Designed for larger families, it combines modern comfort, privacy, and the serene beauty of Chembra Peak for a truly memorable stay.",
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
    description: "Designed exclusively for couples, our Private Pool Villa – Chembra Peak View features a private swimming pool, elegant interiors, and panoramic mountain views. Unwind in complete privacy while enjoying a romantic escape surrounded by the serene beauty of Chembra Peak.",
  },
  {
    title: "Double Deluxe Room",
    images: ["/accommodations/double-deluxe-room.jpg"],
    description: "Perfect for couples and small families of up to 2 adults, our Deluxe Mountain View Room offers a cozy and elegant retreat with breathtaking views of Chembra Peak. Thoughtfully designed with modern comforts and a peaceful ambiance.",
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
          {accommodations.map((room, idx) => (
            <AccommodationCard key={idx} room={room} />
          ))}
        </div>

        {/* Global Action Button */}
        <div className="mt-16 flex justify-center">
          <a 
            href="https://wa.me/9074450023"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-[#5d3e2e] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#462e22] transition-colors inline-block"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            <span className="flex items-center gap-3">
              <ChevronLeft className="w-3 h-3 opacity-70" />
              Book Now
              <ChevronRight className="w-3 h-3 opacity-70" />
            </span>
          </a>
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
          quality={90}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
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

          {/* Per-card Book Now */}
          <a
            href="https://wa.me/9074450023"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 border border-[#5d3e2e] text-[#5d3e2e] text-xs tracking-[0.2em] uppercase hover:bg-[#5d3e2e] hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.853L.057 23.571a.75.75 0 0 0 .921.921l5.717-1.475A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.528-5.218-1.443l-.374-.223-3.893 1.004 1.025-3.784-.244-.389A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
