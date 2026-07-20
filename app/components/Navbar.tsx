"use client";

import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Retreat", href: "/#the-retreat" },
  { label: "Accommodations", href: "/#accommodations" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Contact", href: "/#contact" },
  { label: "FAQs", href: "/faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <>
      {/* ── Top Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-[#f9f8f6]/95 backdrop-blur-md border-b border-zinc-200/60 shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
            <Image
              src="/logo.jpg"
              alt="Foggy Woods logo"
              width={36}
              height={36}
              className="rounded-full object-cover"
              unoptimized
            />
            <span
              className={`text-xl md:text-2xl tracking-wide transition-colors duration-300 ${
                isScrolled ? "text-zinc-900" : "text-white"
              }`}
              style={{ fontFamily: "'Boska', serif", fontWeight: 500, letterSpacing: '-0.01em' }}
            >
              Foggy Woods Resort
            </span>
          </Link>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Mobile: icon-only pill | Desktop: full label */}
            <a
              href="https://wa.me/9074450023"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book your stay on WhatsApp"
              className={`inline-flex items-center gap-2 rounded-full font-semibold border transition-all duration-300
                px-3 py-2 md:px-5 md:py-2
                text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase
                ${
                  isScrolled
                    ? "border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white"
                    : "border-white/70 text-white hover:bg-white hover:text-zinc-900"
                }`}
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              {/* WhatsApp icon (always visible) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 flex-shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.853L.057 23.571a.75.75 0 0 0 .921.921l5.717-1.475A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.528-5.218-1.443l-.374-.223-3.893 1.004 1.025-3.784-.244-.389A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {/* Text hidden on mobile, shown on md+ */}
              <span className="hidden md:inline">Book Your Stay</span>
            </a>

            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              className={`flex flex-col justify-center gap-[5px] w-8 h-8 group transition-colors duration-300`}
            >
              <span className={`block w-7 h-[1.5px] transition-colors duration-300 ${isScrolled ? "bg-zinc-900" : "bg-white"}`} />
              <span className={`block w-5 h-[1.5px] transition-colors duration-300 ${isScrolled ? "bg-zinc-900" : "bg-white"}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* ── Sidebar Overlay ── */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          sidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Dark scrim */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-500 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[320px] md:w-[380px] bg-[#1a2416] flex flex-col justify-between
                      transition-transform duration-500 ease-in-out ${
                        sidebarOpen ? "translate-x-0" : "translate-x-full"
                      }`}
        >
          {/* Close button */}
          <div className="flex justify-end p-8">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-10 gap-1 flex-1 justify-center">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="group flex items-center gap-4 py-3 border-b border-white/10 last:border-0"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span
                  className="text-3xl md:text-4xl text-white/90 group-hover:text-white transition-all duration-300 leading-tight"
                  style={{ fontFamily: "'Boska', serif", fontWeight: 500, letterSpacing: '-0.02em' }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom accent */}
          <div className="px-10 pb-10">
            <a
              href="https://wa.me/9074450023"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 border border-white/20 rounded-full text-white/70 text-sm tracking-widest uppercase hover:bg-white/10 hover:text-white transition-all duration-300 text-center"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Book Your Stay
            </a>
            <p className="text-white/30 text-xs mt-6 tracking-wider" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              Where fog meets serenity
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
