/**
 * MedicareFAQ Homepage
 * Design: "Clarity System" — Swiss-Inspired Information Design
 * Color-coded wayfinding: Teal (New To Medicare), Navy (Plans), Amber (Enrollment), Green (Coverage), Indigo (Library)
 * Font: Plus Jakarta Sans 400-800
 * Layout: Strict grid, clean sections, precise micro-interactions
 */

import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import TopicSection from "@/components/TopicSection";
import ZipFinderSection from "@/components/ZipFinderSection";
import ResourcesSection from "@/components/ResourcesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import { useCMSSEO } from "@/hooks/useCMSSEO";

export default function Home() {
  useCMSSEO({
    contentType: "page",
    slug: "home",
    title: "MedicareFAQ | Your Supplemental Medicare Resource Center",
    description:
      "MedicareFAQ specializes in supplemental Medicare insurance. We make Medicare plans easy to understand, as well as easy to enroll.",
    canonical: "https://www.medicarefaq.com/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    ogType: "website",
  });
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation — Desktop */}
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar />
        <HeaderBar />
        <MegaMenu />
      </header>

      {/* Navigation — Mobile */}
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
        <JourneySection />
        <TopicSection />
        <ZipFinderSection />
        <ResourcesSection />
        <TestimonialsSection />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
