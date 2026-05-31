import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import Accommodations from "./components/Accommodations";
import Amenities from "./components/Amenities";
import ContactCTA from "./components/ContactCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Introduction />
      <Accommodations />
      <Amenities />
      <ContactCTA />
    </main>
  );
}

