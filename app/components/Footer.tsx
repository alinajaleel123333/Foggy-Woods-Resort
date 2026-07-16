import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "The Retreat", href: "/#the-retreat" },
    { label: "Accommodations", href: "/#accommodations" },
    { label: "Experiences", href: "/#experiences" },
  ],
  information: [
    { label: "About Us", href: "/#the-retreat" },
    { label: "FAQ", href: "/faq" },
  ],
  contact: [
    { label: "Contact", href: "/#contact" },
    { label: "Book Your Stay", href: "/#contact" },
    { label: "Gift Cards", href: "#" },
    { label: "Careers", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a2416] text-white">
      {/* ── Main Footer Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 
              className="text-3xl md:text-4xl mb-6"
              style={{ fontFamily: "'Boska', serif", fontWeight: 500, letterSpacing: '-0.02em' }}
            >
              Foggy Woods
            </h3>
            <p 
              className="text-white/60 text-sm leading-relaxed"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Nestled amidst the misty hills of Meppadi, Wayanad, Foggy Woods Resort offers a peaceful escape with breathtaking views of Chembra Peak. Experience comfortable stays, warm hospitality, and the perfect blend of nature and relaxation.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 
              className="text-white/90 text-sm uppercase tracking-[0.25em] mb-6"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 
              className="text-white/90 text-sm uppercase tracking-[0.25em] mb-6"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Information
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.information.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-white/90 text-sm uppercase tracking-[0.25em] mb-6"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 mt-1 shrink-0" strokeWidth={1.5} />
                <span 
                  className="text-white/60 text-sm leading-relaxed"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Meppadi Rd, Wayanad, Chundale<br />
                  Kunnampetta, Kerala 673123
                </span>
              </li>
              {/* Email */}
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/40 shrink-0" strokeWidth={1.5} />
                <a 
                  href="mailto:foggywoods1@gmail.com"
                  className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  foggywoods1@gmail.com
                </a>
              </li>
              {/* Phone */}
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/40 shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <a 
                    href="tel:+919074450023"
                    className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    +91 9074450023
                  </a>
                  <a 
                    href="tel:+919074410023"
                    className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    +91 9074410023
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p 
              className="text-white/40 text-xs tracking-wider"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              © {new Date().getFullYear()} Foggy Woods. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="#" 
                className="text-white/40 text-xs hover:text-white/60 transition-colors duration-300"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-white/40 text-xs hover:text-white/60 transition-colors duration-300"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
