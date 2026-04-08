/**
 * Third-Party Partners Page — /third-party-partners
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Handshake, Shield, CheckCircle2, ArrowRight, ExternalLink, AlertCircle } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const partnerCategories = [
  {
    title: "Insurance Carriers",
    desc: "MedicareFAQ works with leading Medicare insurance carriers to offer clients a wide selection of Medicare Supplement, Medicare Advantage, and Part D plans.",
    examples: [
      "Mutual of Omaha",
      "Aetna",
      "Humana",
      "UnitedHealthcare",
      "Cigna",
      "Blue Cross Blue Shield affiliates",
      "Accendo Insurance",
      "Medico Insurance",
    ],
  },
  {
    title: "Technology Partners",
    desc: "We partner with technology providers to deliver a seamless online experience for plan comparison, enrollment, and account management.",
    examples: [
      "Plan comparison tools",
      "Enrollment platforms",
      "Quote engines",
      "CRM systems",
    ],
  },
  {
    title: "Content & Research Partners",
    desc: "Our editorial team collaborates with healthcare research organizations and data providers to ensure our content reflects the most current Medicare information.",
    examples: [
      "CMS data sources",
      "Healthcare research databases",
      "Industry publications",
    ],
  },
];

const disclosures = [
  "MedicareFAQ is a licensed insurance agency. We are compensated by insurance carriers when clients enroll in plans through our agency.",
  "Compensation from carriers does not influence our recommendations. We always recommend the plan that best fits the client's needs.",
  "Not all insurance carriers or plans are available in all states. Plan availability varies by location.",
  "MedicareFAQ is not affiliated with or endorsed by the U.S. government, Medicare, or the Centers for Medicare & Medicaid Services (CMS).",
  "Third-party links on this website are provided for informational purposes only. MedicareFAQ is not responsible for the content of external websites.",
  "Insurance products are subject to state availability and carrier underwriting. Premiums and benefits may vary.",
];

export default function ThirdPartyPartners() {
  useSEO({
    title: "Third-Party Partners & Disclosures | MedicareFAQ",
    description: "Learn about MedicareFAQ's insurance carrier partnerships, technology partners, and important disclosures about our business relationships and compensation.",
    canonical: "https://www.medicarefaq.com/third-party-partners",
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
        <section className="bg-[#1B3A6B] text-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Third-Party Partners</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <Handshake className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">Third-Party Partners &amp; Disclosures</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  MedicareFAQ is committed to transparency about our business relationships. This page describes our partnerships with insurance carriers and other third parties, and includes important disclosures about how we operate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Partner Categories */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-6">Our Partners</h2>
            <div className="space-y-6">
              {partnerCategories.map((cat, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{cat.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.examples.map((ex, ei) => (
                      <span key={ei} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How We're Compensated */}
          <section className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="text-blue-600" size={22} />
              <h2 className="text-xl font-bold text-[#1B3A6B]">How We Are Compensated</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              MedicareFAQ is a licensed insurance agency. When you enroll in a Medicare plan through our agency, we receive a commission from the insurance carrier. This commission is built into the plan's pricing — it does not cost you anything extra compared to enrolling directly with the carrier.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our compensation structure is designed to align our interests with yours. We are paid a similar commission regardless of which plan you choose, which means we have no financial incentive to recommend one plan over another. Our goal is to help you find the plan that is genuinely best for your situation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Some content on MedicareFAQ.com may include advertising or sponsored content. Any such content is clearly labeled. Our editorial content is not influenced by advertisers or sponsors.
            </p>
          </section>

          {/* Important Disclosures */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-amber-500" size={22} />
              <h2 className="text-xl font-bold text-[#1B3A6B]">Important Disclosures</h2>
            </div>
            <ul className="space-y-3">
              {disclosures.map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                  <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={15} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Carrier Pages */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Learn About Our Carrier Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "Mutual of Omaha", href: "/medicare-supplements/medicare-supplement-carriers/mutual-of-omaha" },
                { name: "Aetna", href: "/medicare-supplements/medicare-supplement-carriers/aetna" },
                { name: "Humana", href: "/medicare-supplements/medicare-supplement-carriers/humana" },
                { name: "UnitedHealthcare", href: "/medicare-supplements/medicare-supplement-carriers/unitedhealthcare" },
                { name: "Cigna", href: "/medicare-supplements/medicare-supplement-carriers/cigna" },
                { name: "All Carriers", href: "/medicare-supplements/medicare-supplement-carriers" },
              ].map((carrier, i) => (
                <Link
                  key={i}
                  href={carrier.href}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors text-sm text-gray-700 hover:text-teal-700 font-medium"
                >
                  <ArrowRight className="text-teal-500 shrink-0" size={14} />
                  {carrier.name}
                </Link>
              ))}
            </div>
          </section>

          {/* External Links */}
          <section className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">Official Government Resources</h2>
            <p className="text-gray-600 text-sm mb-4">
              For official Medicare information, we recommend the following government resources:
            </p>
            <ul className="space-y-2">
              {[
                { name: "Medicare.gov — Official Medicare Website", url: "https://www.medicare.gov" },
                { name: "CMS.gov — Centers for Medicare & Medicaid Services", url: "https://www.cms.gov" },
                { name: "SSA.gov — Social Security Administration", url: "https://www.ssa.gov" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                  >
                    <ExternalLink size={13} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Questions About Our Partnerships?</h3>
            <p className="text-blue-200 mb-6">
              If you have questions about our business relationships or disclosures, please contact us.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
