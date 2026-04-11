import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { FoySystemSection } from "@/components/sections/FoySystemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AiAssistantSection } from "@/components/sections/AiAssistantSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { LifestyleSection } from "@/components/sections/LifestyleSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/Footer";

function SectionSeparator() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6 bg-transparent relative z-10 pointer-events-none">
      <div className="w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <SectionSeparator />
        
        <ProblemSection />
        <TransformationSection />
        <FoySystemSection />
        <SectionSeparator />
        
        <ServicesSection />
        <SectionSeparator />

        <FounderSection />
        <SectionSeparator />
        
        <AiAssistantSection />
        <BeforeAfterSection />
        <LifestyleSection />
        <TestimonialsSection />
        
        <CtaSection />
        <BookingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
