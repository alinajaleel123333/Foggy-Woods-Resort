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
        a: "Foggy Woods Resort is a peaceful escape nestled amidst the misty hills of Meppadi, Wayanad. We offer comfortable stays, warm hospitality, and the perfect blend of nature and relaxation with breathtaking views of Chembra Peak."
      },
      {
        q: "How can I book a stay?",
        a: "You can book directly through our website by clicking the 'Book Your Stay' button, or by reaching out to our booking team at foggywoods1@gmail.com or calling us at +91 9074450023 / +91 9074410023."
      }
    ]
  },
  {
    category: "Check-In & Stay Details",
    questions: [
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
        a: "We offer four curated categories of rooms: \n1. Grand Family Suite with Mountain View: Spacious three-bedroom suite for up to 6 adults.\n2. Premier Family Suite: Perfect for families of up to 4 adults.\n3. Private Pool Villa: Designed exclusively for couples with a private pool.\n4. Double Deluxe Room: Cozy retreat for couples and small families."
      },
      {
        q: "What amenities are included in my stay?",
        a: "All guests receive complimentary high-speed WiFi, secure private parking, access to the refreshing swimming pool, starlit campfire gatherings, and breathtaking rooftop sunset views of Chembra Peak."
      },
      {
        q: "What makes the location of Foggy Woods special?",
        a: "Our resort is situated in the serene environment of Meppadi, Wayanad. Every part of the resort, from our rooftop to our swimming pool, is designed to offer sweeping, panoramic views of the famous Chembra Peak and the surrounding lush nature."
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
            Find details on our accommodations, policies, and experiences at Foggy Woods Resort. If you need further assistance, please don't hesitate to contact our team.
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
