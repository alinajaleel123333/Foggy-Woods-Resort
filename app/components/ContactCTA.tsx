import { MoveRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="contact" className="w-full flex flex-col md:flex-row min-h-[600px] lg:min-h-[750px] bg-[#f9f8f6]">
      {/* ── Left Side: Map with Overlay ── */}
      <div className="relative w-full md:w-1/2 h-[500px] md:h-auto overflow-hidden">
        
        {/* Google Map Embed */}
        <iframe
          src="https://maps.google.com/maps?q=Foggy+Woods+Resort,+Meppadi+Rd,+Chundale,+Kunnampetta,+Kerala+673123&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full grayscale-[30%] contrast-125 saturate-50"
        ></iframe>
        
        {/* Dark Gradient Overlay for Text Readability (pointer-events-none so map remains interactive) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
        
        {/* Thin Border Frame Overlay (matching the screenshot) */}
        <div className="absolute inset-6 lg:inset-10 border border-white/20 pointer-events-none" />

        {/* Text Overlay */}
        <div className="absolute bottom-14 left-14 lg:bottom-20 lg:left-20 pointer-events-none">
          <h2 
            className="text-white text-5xl md:text-6xl lg:text-8xl drop-shadow-lg leading-none"
            style={{ fontFamily: "'Boska', serif", fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            Let's Connect
          </h2>
        </div>
      </div>

      {/* ── Right Side: Contact Details ── */}
      <div className="w-full md:w-1/2 p-12 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center">
        <div className="flex flex-col gap-16 lg:gap-20 w-full max-w-lg mx-auto">
          
          {/* Visit */}
          <div className="flex items-start gap-6 lg:gap-12 group cursor-default">
            <h3 
              className="text-4xl lg:text-5xl text-[#5d3e2e] w-[120px] lg:w-[140px] shrink-0"
              style={{ fontFamily: "'Boska', serif", fontWeight: 500 }}
            >
              Visit
            </h3>
            <div className="pt-2 lg:pt-3 shrink-0">
              <MoveRight className="w-6 h-6 text-[#a8a29e] group-hover:text-[#5d3e2e] group-hover:translate-x-2 transition-all duration-500" strokeWidth={1.5} />
            </div>
            <div 
              className="text-[#78716c] text-sm lg:text-base leading-[2] flex-1 pt-1"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              <p>Meppadi Rd, Wayanad, Chundale</p>
              <p>Kunnampetta, Kerala 673123</p>
            </div>
          </div>

          {/* Write */}
          <div className="flex items-start gap-6 lg:gap-12 group cursor-default">
            <h3 
              className="text-4xl lg:text-5xl text-[#5d3e2e] w-[120px] lg:w-[140px] shrink-0"
              style={{ fontFamily: "'Boska', serif", fontWeight: 500 }}
            >
              Write
            </h3>
            <div className="pt-2 lg:pt-3 shrink-0">
              <MoveRight className="w-6 h-6 text-[#a8a29e] group-hover:text-[#5d3e2e] group-hover:translate-x-2 transition-all duration-500" strokeWidth={1.5} />
            </div>
            <div 
              className="text-[#78716c] text-sm lg:text-base leading-[2] flex-1 pt-1"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              <a href="mailto:foggywoods1@gmail.com" className="block hover:text-[#5d3e2e] cursor-pointer transition-colors w-max">foggywoods1@gmail.com</a>
            </div>
          </div>

          {/* Call */}
          <div className="flex items-start gap-6 lg:gap-12 group cursor-default">
            <h3 
              className="text-4xl lg:text-5xl text-[#5d3e2e] w-[120px] lg:w-[140px] shrink-0"
              style={{ fontFamily: "'Boska', serif", fontWeight: 500 }}
            >
              Call
            </h3>
            <div className="pt-2 lg:pt-3 shrink-0">
              <MoveRight className="w-6 h-6 text-[#a8a29e] group-hover:text-[#5d3e2e] group-hover:translate-x-2 transition-all duration-500" strokeWidth={1.5} />
            </div>
            <div 
              className="text-[#78716c] text-sm lg:text-base leading-[2] flex-1 pt-1"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              <p className="hover:text-[#5d3e2e] cursor-pointer transition-colors w-max">+91 9074450023</p>
              <p className="hover:text-[#5d3e2e] cursor-pointer transition-colors w-max">+91 9074410023</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
