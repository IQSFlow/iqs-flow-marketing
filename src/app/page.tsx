import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import {
  ScrollProgressBar,
  HeroSection,
  SocialProofBar,
  ProblemSection,
  PlatformSection,
  HowItWorksSection,
  IndustrySolutionsSection,
  VeniceTestimonialSection,
  FounderQuoteSection,
  AssessmentCTASection,
  StatsCTASection,
} from "./HomepageSections";

export default function HomePage() {
  return (
    <>
      <ScrollProgressBar />
      <MarketingNav />
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <PlatformSection />
      <HowItWorksSection />
      <IndustrySolutionsSection />
      <VeniceTestimonialSection />
      <FounderQuoteSection />
      <AssessmentCTASection />
      <StatsCTASection />
      <MarketingFooter />
    </>
  );
}
