import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { CategorySelector } from "@/components/home/category-selector";
import { PopularServices } from "@/components/home/popular-services";
import { StorySection, WhyChooseSection } from "@/components/home/experience-section";
import { BookingProcess, FinalCta } from "@/components/home/testimonial-section";
import { BrandQualitySection } from "@/components/home/brand-quality-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategorySelector />
      <PopularServices />
      <WhyChooseSection />
      <StorySection />
      <BookingProcess />
      <BrandQualitySection />
      <FinalCta />
    </>
  );
}