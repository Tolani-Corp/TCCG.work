import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Projects />
      <Testimonials />
      <CTA />
    </>
  );
}
