import Image from "next/image";
import { Wifi, Snowflake, Tv, Coffee, Bath, ChevronRight, ChevronLeft } from "lucide-react";

const accommodations = [
  {
    title: "Family Suites",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    description: "With elegant decor that highlights natural accents, your extra-spacious suite sets the scene for a peaceful family stay overlooking the foggy woods.",
  },
  {
    title: "Private Pool Villa",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    description: "Unwind in a spacious setting with a private plunge pool and beautiful views of lush greenery below. Complete with a king-sized bed and premium amenities.",
  },
  {
    title: "Ethnic Standard Room",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    description: "With native decor and local touches, this stylish room makes you feel right at home in the woods. Settle in and sleep soundly in a warm, inviting space.",
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
              <div key={idx} className="bg-white flex flex-col group/card shadow-sm hover:shadow-xl transition-shadow duration-500">
                {/* Image */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden">
                  <Image 
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />
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
                    className="text-[#78716c] text-sm leading-[1.8] mb-2"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {room.description}
                  </p>
                  <button className="text-[#5d3e2e] text-xs font-semibold tracking-widest uppercase hover:underline mb-8 mt-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    More
                  </button>

                  <div className="mt-auto w-full">
                    {/* Amenities Icons */}
                    <div className="flex items-center justify-center gap-4 text-[#a8a29e] mb-8">
                      <Wifi className="w-4 h-4" />
                      <Snowflake className="w-4 h-4" />
                      <Tv className="w-4 h-4" />
                      <Coffee className="w-4 h-4" />
                      <Bath className="w-4 h-4" />
                    </div>

                    {/* Discover Button */}
                    <button 
                      className="flex items-center justify-center gap-3 w-full text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#78716c] hover:text-[#5d3e2e] transition-colors"
                      style={{ fontFamily: "'Satoshi', sans-serif" }}
                    >
                      <ChevronLeft className="w-3 h-3 opacity-50" />
                      Discover More
                      <ChevronRight className="w-3 h-3 opacity-50" />
                    </button>
                  </div>
                </div>
              </div>
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
