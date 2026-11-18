import { Hero } from "@/components/home/hero";
import { FeaturedServices } from "@/components/home/featured-services";
import { CategoryShowcase } from "@/components/home/category-section";
import { StorySection, WhyChooseSection } from "@/components/home/experience-section";
import { BookingProcess, TestimonialSection, FinalCta } from "@/components/home/testimonial-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <CategoryShowcase />
      <WhyChooseSection />
      <StorySection />
      <BookingProcess />
      <TestimonialSection />
      <FinalCta />
    </>
  );
}