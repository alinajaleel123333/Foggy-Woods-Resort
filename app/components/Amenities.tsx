import Image from "next/image";
import { Wifi, Car } from "lucide-react";

const amenities = [
  {
    title: "Nature Views",
    badge: "SCENIC",
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80",
    description: "Surrounded by the tranquil beauty of Wayanad, our resort offers premium amenities that blend comfort with nature. Relax amidst panoramic mountain views, unwind in peaceful spaces, and enjoy a stay where every moment is enhanced by the charm of Chembra Peak.",
  },
  {
    title: "Swimming Pool",
    badge: "REFRESH",
    image: "/amenities/swimming-pool.jpg",
    description: "A refreshing pool experience amidst nature, perfect for relaxation, leisure, and memorable moments with loved ones.",
  },
  {
    title: "Campfire Nights",
    badge: "WARMTH",
    image: "/amenities/campfire-ai.png",
    description: "Gather around the warm glow of the campfire and enjoy cozy evenings filled with laughter, stories, and unforgettable moments under the stars.",
  },
  {
    title: "Rooftop Sunset View",
    badge: "VIEW",
    image: "/amenities/rooftop-sunset.jpg",
    description: "Take in breathtaking sunset views from our rooftop, where the mountains and mist create the perfect setting for a peaceful evening.",
  }
];

export default function Amenities() {
  return (
    <section id="experiences" className="w-full py-24 md:py-32 bg-[#f9f8f6]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 
            className="text-4xl md:text-5xl text-[#5d3e2e] mb-4"
            style={{ fontFamily: "'Boska', serif", fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            Amenities & Facilities
          </h2>
          <p 
            className="text-[#78716c] tracking-widest uppercase text-xs md:text-sm"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Everything you need for a perfect stay
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-10">
          {amenities.map((item, idx) => (
            <div key={idx} className="flex flex-col group">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-8">
                <Image 
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* White Badge */}
                <div 
                  className="absolute bottom-4 left-4 bg-white px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase text-[#78716c] shadow-sm"
                  style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
                >
                  {item.badge}
                </div>
              </div>

              {/* Text Content */}
              <h3 
                className="text-3xl text-[#5d3e2e] mb-4"
                style={{ fontFamily: "'Boska', serif", fontWeight: 500 }}
              >
                {item.title}
              </h3>
              <p 
                className="text-[#78716c] text-[15px] leading-[1.9]"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Complimentary Facilities Banner */}
        <div className="mt-20 pt-10 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3 text-[#78716c]">
            <Wifi className="w-5 h-5 text-[#5d3e2e]" strokeWidth={1.5} />
            <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="tracking-wide text-sm uppercase">Complimentary High-Speed WiFi</span>
          </div>
          <div className="flex items-center gap-3 text-[#78716c]">
            <Car className="w-5 h-5 text-[#5d3e2e]" strokeWidth={1.5} />
            <span style={{ fontFamily: "'Satoshi', sans-serif" }} className="tracking-wide text-sm uppercase">Secure Private Parking</span>
          </div>
        </div>

      </div>
    </section>
  );
}
