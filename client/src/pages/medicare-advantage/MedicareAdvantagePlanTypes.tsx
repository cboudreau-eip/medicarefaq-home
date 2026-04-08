/**
 * Medicare Advantage Plan Types Overview — /medicare-part-c/medicare-advantage-plan-types
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { LayoutGrid, ArrowRight, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { useState } from "react";

const planTypes = [
  {
    id: "hmo",
    name: "HMO (Health Maintenance Organization)",
    href: "/medicare-part-c/medicare-advantage-hmo-plans",
    tagline: "Lower costs, network restrictions",
    color: "border-teal-400 bg-teal-50",
    headerColor: "bg-teal-600",
    pros: [
      "Lower monthly premiums than PPO plans",
      "Lower out-of-pocket costs for in-network care",
      "Coordinated care through a primary care physician",
      "Prescription drug coverage usually included",
    ],
    cons: [
      "Must use in-network providers (except emergencies)",
      "Requires referrals to see specialists",
      "Cannot see out-of-network doctors without paying full cost",
    ],
    bestFor: "Beneficiaries who want lower costs and are comfortable with a network of providers.",
  },
  {
    id: "ppo",
    name: "PPO (Preferred Provider Organization)",
    href: "/medicare-part-c/medicare-advantage-ppo-plans",
    tagline: "More flexibility, higher costs",
    color: "border-blue-400 bg-blue-50",
    headerColor: "bg-blue-600",
    pros: [
      "Can see any Medicare-accepting provider",
      "No referrals needed for specialists",
      "Lower costs for in-network providers",
      "More flexibility than HMO plans",
    ],
    cons: [
      "Higher premiums than HMO plans",
      "Higher cost-sharing for out-of-network care",
      "Still have an annual out-of-pocket maximum",
    ],
    bestFor: "Beneficiaries who want flexibility to see specialists without referrals.",
  },
  {
    id: "pffs",
    name: "PFFS (Private Fee-for-Service)",
    href: "/medicare-part-c/medicare-advantage-pffs-plans",
    tagline: "Flexible, but provider acceptance varies",
    color: "border-purple-400 bg-purple-50",
    headerColor: "bg-purple-600",
    pros: [
      "Can see any Medicare-accepting provider who accepts the plan's terms",
      "No network restrictions in most cases",
      "No referrals required",
    ],
    cons: [
      "Providers must agree to the plan's payment terms",
      "Not all providers accept PFFS plans",
      "Can be more expensive than HMO plans",
    ],
    bestFor: "Beneficiaries in rural areas with limited network options.",
  },
  {
    id: "snp",
    name: "SNP (Special Needs Plan)",
    href: "/medicare-part-c/medicare-advantage-snp-plans",
    tagline: "Tailored for specific health conditions",
    color: "border-amber-400 bg-amber-50",
    headerColor: "bg-amber-600",
    pros: [
      "Tailored benefits for specific conditions (diabetes, heart disease, etc.)",
      "Coordinated care for complex health needs",
      "May include additional benefits relevant to the condition",
      "Available for dual eligibles (Medicare + Medicaid)",
    ],
    cons: [
      "Must meet eligibility criteria to enroll",
      "Limited availability — not available in all areas",
      "Network restrictions apply",
    ],
    bestFor: "Beneficiaries with chronic conditions, dual eligibles (Medicare + Medicaid), or those in institutional care.",
  },
];

const comparisonTable = {
  headers: ["Feature", "HMO", "PPO", "PFFS", "SNP"],
  rows: [
    ["Network required", "Yes", "Preferred", "No (varies)", "Yes"],
    ["Referrals needed", "Usually", "No", "No", "Usually"],
    ["Out-of-network care", "Emergency only", "Yes (higher cost)", "Yes (if accepted)", "Emergency only"],
    ["Typical premium", "Low", "Medium-High", "Varies", "Low-Medium"],
    ["Drug coverage", "Usually included", "Usually included", "Sometimes", "Usually included"],
    ["Availability", "Most areas", "Most areas", "Some areas", "Limited areas"],
  ],
};

export default function MedicareAdvantagePlanTypes() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Medicare Advantage Plan Types: HMO, PPO, PFFS, SNP | MedicareFAQ",
    description: "Compare all Medicare Advantage plan types: HMO, PPO, PFFS, and SNP plans. Learn the differences, pros and cons, and which plan type is right for your situation.",
    canonical: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plan-types",
    ogType: "article",
  });

  const faqs = [
    { q: "Which Medicare Advantage plan type is most popular?", a: "HMO plans are the most common Medicare Advantage plan type, followed by PPO plans. Together they account for the vast majority of Medicare Advantage enrollment. HMOs typically offer lower premiums while PPOs offer more flexibility." },
    { q: "Can I switch between Medicare Advantage plan types?", a: "Yes. During the Annual Enrollment Period (October 15 – December 7), you can switch from one Medicare Advantage plan type to another. Changes take effect January 1. You can also switch during the Medicare Advantage Open Enrollment Period (January 1 – March 31)." },
    { q: "Do all Medicare Advantage plans include prescription drug coverage?", a: "Most Medicare Advantage plans include Part D prescription drug coverage (called MA-PD plans). However, some plans do not include drug coverage. If you choose a plan without drug coverage, you cannot enroll in a standalone Part D plan." },
    { q: "What is the difference between an HMO-POS and a standard HMO?", a: "An HMO-POS (Point of Service) is a variation of the HMO that allows some out-of-network care, usually at a higher cost. Standard HMOs generally do not cover out-of-network care except in emergencies." },
  ];

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
          <div className="max-w-5xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/medicare-part-c/medicare-advantage-plans" className="hover:text-white">Medicare Advantage</Link>
              <span>/</span>
              <span className="text-white">Plan Types</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <LayoutGrid className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">Medicare Advantage Plan Types</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  Medicare Advantage plans come in four main types: HMO, PPO, PFFS, and SNP. Each has different rules about which providers you can see, whether you need referrals, and how much you pay.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Plan Type Cards */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-6">The Four Types of Medicare Advantage Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planTypes.map((plan) => (
                <div key={plan.id} className={`border-2 rounded-xl overflow-hidden ${plan.color}`}>
                  <div className={`${plan.headerColor} text-white px-5 py-3`}>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-white/80 text-sm">{plan.tagline}</p>
                  </div>
                  <div className="p-5">
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Pros</div>
                      <ul className="space-y-1">
                        {plan.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                            <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={13} />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cons</div>
                      <ul className="space-y-1">
                        {plan.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                            <XCircle className="text-red-400 mt-0.5 shrink-0" size={13} />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 mb-3">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Best For</div>
                      <p className="text-sm text-gray-700">{plan.bestFor}</p>
                    </div>
                    <Link
                      href={plan.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                    >
                      Learn more about {plan.name.split(" (")[0]} plans <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B3A6B] text-white">
                    {comparisonTable.headers.map((h, i) => (
                      <th key={i} className="px-4 py-2.5 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.rows.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      {row.map((cell, ci) => (
                        <td key={ci} className={`px-4 py-2.5 border-b border-gray-100 ${ci === 0 ? "font-medium text-gray-800" : "text-gray-600"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      size={18}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-3 text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Find the Right Medicare Advantage Plan</h3>
            <p className="text-blue-200 mb-6">
              Compare HMO, PPO, and other Medicare Advantage plans available in your area with help from our licensed specialists.
            </p>
            <Link
              href="/compare-rates"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Compare Plans <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
