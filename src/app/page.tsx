import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import {
  HeroSection,
  SocialProofBar,
  ProblemSection,
  PlatformSection,
  HowItWorksSection,
  IndustrySolutionsSection,
  FounderQuoteSection,
  AssessmentCTASection,
  StatsCTASection,
} from "./HomepageSections";

export default function HomePage() {
  return (
    <>
      <MarketingNav />
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <PlatformSection />
      <HowItWorksSection />
      <IndustrySolutionsSection />
      <FounderQuoteSection />
      <AssessmentCTASection />
      <StatsCTASection />
      <MarketingFooter />
    </>
  );
}
