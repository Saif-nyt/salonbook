import { Hero } from "@/components/home/hero";
import { BrandStatement } from "@/components/home/brand-statement";
import { PopularServices } from "@/components/home/popular-services";
import { CategorySelector } from "@/components/home/category-selector";
import { BurgundyPromoSection } from "@/components/home/burgundy-promo-section";
import { StorySection, WhyChooseSection } from "@/components/home/experience-section";
import { BrandQualitySection } from "@/components/home/brand-quality-section";
import { BookingProcess, FinalCta } from "@/components/home/testimonial-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <PopularServices />
      <CategorySelector />
      <BurgundyPromoSection />
      <StorySection />
      <WhyChooseSection />
      <BrandQualitySection />
      <BookingProcess />
      <FinalCta />
    </>
  );
}