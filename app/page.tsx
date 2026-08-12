import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { FeaturedAutomations } from "@/components/sections/featured-automations";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { TechStack } from "@/components/sections/tech-stack";
import { Writing } from "@/components/sections/writing";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <FeaturedProducts />
      <FeaturedAutomations />
      <Services />
      <About />
      <Journey />
      <TechStack />
      <Writing />
      <Contact />
    </main>
  );
}
