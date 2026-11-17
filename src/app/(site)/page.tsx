import { Hero } from "@/components/home/hero";
import { FeaturedServices } from "@/components/home/featured-services";
import { CategorySection } from "@/components/home/category-section";
import { ExperienceSection } from "@/components/home/experience-section";
import {
  HomeCta,
  TestimonialSection,
} from "@/components/home/testimonial-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <CategorySection />
      <ExperienceSection />
      <TestimonialSection />
      <HomeCta />
    </>
  );
}
