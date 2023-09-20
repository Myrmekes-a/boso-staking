import Cards from "@/components/sections/Cards";
import Description from "@/components/sections/Description";
import Hero from "@/components/sections/Hero";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Roadmap from "@/components/sections/Roadmap";
import Wallet from "@/components/sections/Wallet";

export default function Home() {
  return (
    <main>
      <Hero />
      <Description />
      <Cards />
      <Roadmap />
      <MarqueeSection />
      <Wallet />
    </main>
  );
}

