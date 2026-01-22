import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ServicesPreview } from "@/components/ServicesPreview";
import { StatsSection } from "@/components/StatsSection";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <ProjectsPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
