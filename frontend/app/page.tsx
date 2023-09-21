import Cards from "@/components/sections/Cards";
import Description from "@/components/sections/Description";
import Hero from "@/components/sections/Hero";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Preloader from "@/components/sections/Preloader";
import Roadmap from "@/components/sections/Roadmap";
import Wallet from "@/components/sections/Wallet";

export default function Home() {
  return (
    <main>
      <Preloader />
      <div className="home-content transition-all duration-1000 delay-500 opacity-0">
        <Hero />
        <Description />
        <Cards />
        <Roadmap />
        <MarqueeSection />
        <Wallet />
      </div>
    </main>
  );
}
