import Link from "next/link";
import { ChevronLeft, HelpCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqData = [
  {
    category: "General & Booking",
    questions: [
      {
        q: "What is Foggy Woods?",
        a: "Foggy Woods is a luxury nature retreat tucked away in misty pine forests. We offer an exclusive experience of elegance, comfort, and world-class hospitality, blending refined modern interiors with pristine natural beauty."
      },
      {
        q: "How can I book a stay?",
        a: "You can book directly through our website by clicking the 'Book Your Stay' button, or by reaching out to our booking team at booking@foggywoods.com or call +1 (555) 123-4567."
      }
    ]
  },
  {
    category: "Check-In & Stay Details",
    questions: [
      {
        q: "What are the check-in and check-out times?",
        a: "Check-in begins at 3:00 PM. Check-out is by 11:00 AM. Early check-in or late check-out may be arranged upon request, subject to room availability."
      },
      {
        q: "What is your cancellation policy?",
        a: "Reservations can be fully refunded if cancelled at least 7 days prior to your scheduled arrival. Cancellations made within 7 days of arrival will be charged for the first night of the stay."
      },
      {
        q: "Are pets allowed at the resort?",
        a: "To preserve the surrounding natural wildlife and maintain a serene, allergen-free environment for all our guests, we do not allow pets on the resort property."
      }
    ]
  },
  {
    category: "Accommodations & Amenities",
    questions: [
      {
        q: "What types of rooms are available?",
        a: "We offer three curated categories of rooms: \n1. Family Suites: Extra-spacious rooms with natural accents, designed for families.\n2. Private Pool Villa: Premium villas featuring a private plunge pool, king-sized bed, and views of the valley.\n3. Ethnic Standard Room: Stylish rooms featuring local native decor and warm, cozy finishes."
      },
      {
        q: "What amenities are included in my stay?",
        a: "All guests receive complimentary high-speed WiFi, secure private parking, access to the temperature-controlled scenic swimming pool, and access to our nightly starlit campfire gatherings."
      },
      {
        q: "Do you have dining and spa facilities?",
        a: "Yes, we feature fine dining spaces serving locally sourced organic cuisine and wellness spa rooms designed for body and mind rejuvenation."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f8f6]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 bg-[#1a2416] text-white text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(93,62,46,0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs tracking-[0.2em] uppercase mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 
            className="text-4xl md:text-6xl mb-4 font-medium"
            style={{ fontFamily: "'Boska', serif", letterSpacing: '-0.02em' }}
          >
            Frequently Asked Questions
          </h1>
          <p 
            className="text-white/70 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Find details on check-in, policies, rooms, and experiences at Foggy Woods. If you need further assistance, our AI assistant is here to help.
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <main className="flex-1 py-16 md:py-24 max-w-4xl mx-auto px-6 w-full">
        <div className="space-y-16">
          {faqData.map((categoryGroup, index) => (
            <div key={index} className="space-y-6">
              <h2 
                className="text-2xl md:text-3xl text-[#5d3e2e] border-b border-[#e7e5e4] pb-3"
                style={{ fontFamily: "'Boska', serif", fontWeight: 500 }}
              >
                {categoryGroup.category}
              </h2>
              <div className="space-y-8">
                {categoryGroup.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="flex gap-4 items-start group">
                    <div className="mt-1 bg-[#5d3e2e]/10 p-2 rounded-lg text-[#5d3e2e] shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 
                        className="text-lg md:text-xl text-zinc-800 font-medium mb-2"
                        style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
                      >
                        {faq.q}
                      </h3>
                      <p 
                        className="text-zinc-600 text-sm md:text-base leading-relaxed whitespace-pre-line"
                        style={{ fontFamily: "'Satoshi', sans-serif" }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
