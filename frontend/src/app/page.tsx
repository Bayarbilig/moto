import About from "./components/About";
import { BrandTabs } from "./components/BrandTabs";
import { CountdownSection } from "./components/CountDown";
import { HeroSection } from "./components/HeroSection";
import { ProductSection } from "./components/ProductSection";

export default function Home() {
  return (
    <div className="bg-black w-[100%] overflow-hidden">
      <HeroSection />
      <About />
      <BrandTabs />
      <ProductSection />
      <CountdownSection />
    </div>
  );
}
