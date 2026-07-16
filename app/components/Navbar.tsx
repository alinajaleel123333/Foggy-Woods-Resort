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
          <div className="flex items-center gap-6">
            <Link
              href="/#contact"
              className={`hidden md:inline-flex items-center px-5 py-2 rounded-full text-xs tracking-[0.2em] uppercase font-semibold border transition-all duration-300 ${
                isScrolled
                  ? "border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white"
                  : "border-white/70 text-white hover:bg-white hover:text-zinc-900"
              }`}
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Book Your Stay
            </Link>

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
            <button
              className="w-full py-3 border border-white/20 rounded-full text-white/70 text-sm tracking-widest uppercase hover:bg-white/10 hover:text-white transition-all duration-300"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Book Your Stay
            </button>
            <p className="text-white/30 text-xs mt-6 tracking-wider" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              Where fog meets serenity
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
