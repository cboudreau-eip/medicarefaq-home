/**
 * HTML Sitemap Page — /sitemap
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Map, ArrowRight } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const sitemapSections = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Compare Rates", href: "/compare-rates" },
      { label: "Contact Us", href: "/contact" },
      { label: "About Us", href: "/about-us" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "News", href: "/news" },
      { label: "Online Guides", href: "/online-guides" },
      { label: "Blog", href: "/blog" },
      { label: "Videos", href: "/videos" },
      { label: "Podcasts", href: "/podcasts" },
      { label: "Scholarship Opportunities", href: "/scholarship-opportunities" },
    ],
  },
  {
    title: "New to Medicare",
    links: [
      { label: "New to Medicare Overview", href: "/new-to-medicare" },
      { label: "Turning 65", href: "/new-to-medicare/turning-65" },
      { label: "Medicare Under 65", href: "/new-to-medicare/medicare-under-65" },
      { label: "Medicare vs Medicaid", href: "/new-to-medicare/medicare-vs-medicaid" },
      { label: "Medicare FEHB", href: "/new-to-medicare/medicare-fehb" },
      { label: "Medicare and VA Benefits", href: "/new-to-medicare/medicare-va-benefits" },
    ],
  },
  {
    title: "Original Medicare",
    links: [
      { label: "Original Medicare Overview", href: "/original-medicare" },
      { label: "Medicare Coverage", href: "/original-medicare/medicare-coverage" },
      { label: "Medicare Costs", href: "/original-medicare/medicare-costs" },
      { label: "Medicare Eligibility", href: "/original-medicare/medicare-eligibility" },
      { label: "Medicare Parts Overview", href: "/original-medicare/medicare-parts" },
      { label: "Medicare Enrollment Periods", href: "/original-medicare/medicare-enrollment-periods" },
      { label: "Medicare Part A", href: "/original-medicare/medicare-parts/medicare-part-a" },
      { label: "Medicare Part B", href: "/original-medicare/medicare-parts/medicare-part-b" },
      { label: "Apply for Medicare Part B", href: "/original-medicare/medicare-parts/apply-for-medicare-part-b" },
      { label: "Medicare Part D Overview", href: "/original-medicare/medicare-parts/medicare-part-d" },
      { label: "Part D Costs", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-costs" },
      { label: "Medicare Donut Hole", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-donut-hole" },
      { label: "Part D Enrollment Periods", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-enrollment-periods" },
      { label: "Part D Eligibility", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-eligibility" },
      { label: "Part D Coverage Gap", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-coverage-gap" },
    ],
  },
  {
    title: "Medicare Supplement (Medigap)",
    links: [
      { label: "Medicare Supplement Overview", href: "/medicare-supplements" },
      { label: "Medigap Plan G", href: "/medicare-supplements/medicare-supplement-plans/plan-g" },
      { label: "Medigap Plan F", href: "/medicare-supplements/medicare-supplement-plans/plan-f" },
      { label: "Medigap Plan N", href: "/medicare-supplements/medicare-supplement-plans/plan-n" },
      { label: "Medigap Plan C", href: "/medicare-supplements/medicare-supplement-plans/plan-c" },
      { label: "Medigap Plan D", href: "/medicare-supplements/medicare-supplement-plans/plan-d" },
      { label: "Medigap Plan B", href: "/medicare-supplements/medicare-supplement-plans/plan-b" },
      { label: "Medigap Plan A", href: "/medicare-supplements/medicare-supplement-plans/plan-a" },
      { label: "Medigap Plan K", href: "/medicare-supplements/medicare-supplement-plans/plan-k" },
      { label: "Medigap Plan L", href: "/medicare-supplements/medicare-supplement-plans/plan-l" },
      { label: "Medigap Plan M", href: "/medicare-supplements/medicare-supplement-plans/plan-m" },
      { label: "High-Deductible Plan G", href: "/medicare-supplements/medicare-supplement-plans/high-deductible-plan-g" },
      { label: "High-Deductible Plan F", href: "/medicare-supplements/medicare-supplement-plans/high-deductible-plan-f" },
      { label: "Compare Medigap Plans", href: "/medicare-supplements/compare-medigap-plans" },
      { label: "Medigap Eligibility", href: "/medicare-supplements/medigap-eligibility" },
      { label: "Medigap Plans 2026", href: "/medicare-supplements/medicare-supplement-plans-2026" },
      { label: "Medigap Carriers", href: "/medicare-supplements/medicare-supplement-carriers" },
    ],
  },
  {
    title: "Medicare Advantage",
    links: [
      { label: "Medicare Advantage Overview", href: "/medicare-part-c/medicare-advantage-plans" },
      { label: "Medicare Advantage Plan Types", href: "/medicare-part-c/medicare-advantage-plan-types" },
      { label: "HMO Plans", href: "/medicare-part-c/medicare-advantage-hmo-plans" },
      { label: "PPO Plans", href: "/medicare-part-c/medicare-advantage-ppo-plans" },
      { label: "PFFS Plans", href: "/medicare-part-c/medicare-advantage-pffs-plans" },
      { label: "SNP Plans", href: "/medicare-part-c/medicare-advantage-snp-plans" },
      { label: "Medicare Advantage Costs", href: "/medicare-part-c/medicare-advantage-costs" },
      { label: "Medicare Advantage Eligibility", href: "/medicare-part-c/medicare-advantage-eligibility" },
      { label: "Medicare Advantage Enrollment", href: "/medicare-part-c/medicare-advantage-enrollment" },
      { label: "Medicare Advantage vs Original Medicare", href: "/medicare-part-c/medicare-advantage-vs-original-medicare" },
    ],
  },
  {
    title: "Enrollment",
    links: [
      { label: "Enrollment Overview", href: "/enrollment" },
      { label: "Turning 65 Enrollment", href: "/enrollment/turning-65" },
      { label: "Late Enrollment Penalties", href: "/enrollment/late-penalties" },
      { label: "Employer Coverage & Medicare", href: "/enrollment/employer-coverage" },
      { label: "Special Enrollment Periods", href: "/enrollment/special-enrollment-periods" },
    ],
  },
  {
    title: "Caregiver Guide",
    links: [
      { label: "Caregiver Guide Overview", href: "/caregiver-guide" },
      { label: "Understanding Medicare for Caregivers", href: "/caregiver-guide/understanding-medicare" },
      { label: "Helping a Parent Enroll", href: "/caregiver-guide/helping-parent-enroll" },
      { label: "Managing Medicare Benefits", href: "/caregiver-guide/managing-medicare-benefits" },
      { label: "Medicare and Long-Term Care", href: "/caregiver-guide/medicare-long-term-care" },
      { label: "Caregiver Resources", href: "/caregiver-guide/caregiver-resources" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Jagger Esch", href: "/about-us/jagger-esch" },
      { label: "Meet the Editorial Team", href: "/meet-the-editorial-team" },
      { label: "Client Care Team", href: "/client-care-team" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Third-Party Partners", href: "/third-party-partners" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export default function SitemapPage() {
  useSEO({
    title: "Sitemap | MedicareFAQ",
    description: "Browse the complete MedicareFAQ sitemap. Find all Medicare guides, articles, plan comparisons, and informational pages organized by topic.",
    canonical: "https://www.medicarefaq.com/sitemap",
    ogType: "website",
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar />
        <HeaderBar />
        <MegaMenu />
      </header>
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#1B3A6B] text-white py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Sitemap</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <Map className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">MedicareFAQ Sitemap</h1>
                <p className="text-blue-100">Browse all pages and resources on MedicareFAQ.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sitemap Grid */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapSections.map((section, si) => (
              <div key={si}>
                <h2 className="text-sm font-bold text-[#1B3A6B] uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-1.5">
                  {section.links.map((link, li) => (
                    <li key={li}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 text-sm group"
                      >
                        <ArrowRight className="text-gray-300 group-hover:text-teal-400 shrink-0 transition-colors" size={12} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
