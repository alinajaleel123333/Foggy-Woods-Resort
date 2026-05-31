export default function Introduction() {
  return (
    <section
      id="the-retreat"
      className="w-full py-24 md:py-32 lg:py-40 px-6 bg-[#f9f8f6] flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl text-[#5d3e2e] mb-8 leading-[1.2]"
          style={{ fontFamily: "'Boska', serif", fontWeight: 500, letterSpacing: '-0.02em' }}
        >
          An exclusive retreat of comfort<br className="hidden md:block" /> and sophistication
        </h2>

        <p
          className="text-[#78716c] text-sm md:text-base lg:text-[17px] leading-[1.8] md:leading-[2] tracking-wide"
          style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 400 }}
        >
          Nestled in a serene setting, our luxury lodge and hotel offer a perfect blend of elegance, comfort, and world-class hospitality. Designed for discerning travelers, each space is crafted with refined interiors, modern amenities, and breathtaking views. Whether you seek a tranquil escape, a romantic getaway, or a premium business stay, we ensure an unparalleled experience marked by personalized service and timeless sophistication. Indulge in fine dining, rejuvenate in our wellness spaces, and immerse yourself in an ambiance of pure luxury.
        </p>
      </div>
    </section>
  );
}
