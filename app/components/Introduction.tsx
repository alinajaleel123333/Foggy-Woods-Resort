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
          Surrounded by the breathtaking beauty of Wayanad and overlooking the majestic Chembra Peak, Foggy Woods Resort offers a peaceful retreat where luxury meets nature. Our elegant private pool villas, stunning rooftop sunset views, and thoughtfully designed accommodations create the perfect escape for families and couples seeking comfort, privacy, and unforgettable moments. Wake up to panoramic mountain vistas, unwind in the tranquility of the misty hills, and experience warm hospitality that makes every stay truly special. Whether you&apos;re planning a romantic getaway, a family vacation, or a relaxing weekend retreat, Foggy Woods Resort promises an experience filled with serenity, comfort, and lasting memories.
        </p>
      </div>
    </section>
  );
}
