import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import {
  HeroSection,
  SocialProofBar,
  ProblemSection,
  PlatformSection,
  HowItWorksSection,
  IndustrySolutionsSection,
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
      <StatsCTASection />
      <MarketingFooter />
    </>
  );
}
