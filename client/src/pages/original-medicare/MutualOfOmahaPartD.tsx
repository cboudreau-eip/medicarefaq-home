/**
 * Mutual of Omaha Part D Page — /original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Pill, ArrowRight, CheckCircle2, Star, Phone, ChevronDown } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { useState } from "react";

const planHighlights = [
  "Multiple Part D plan options to fit different budgets and drug needs",
  "Nationwide pharmacy network including major chains and independent pharmacies",
  "Mail-order pharmacy option for 90-day supplies of maintenance medications",
  "Preferred pharmacy network for lower copays",
  "Online formulary lookup tool to check drug coverage before enrolling",
  "24/7 customer service available by phone",
];

const faqs = [
  {
    q: "Does Mutual of Omaha offer Medicare Part D plans?",
    a: "Yes. Mutual of Omaha offers Medicare Part D prescription drug plans in many states. Plan availability and premiums vary by location. You can compare available plans using the Medicare Plan Finder at medicare.gov or by calling our specialists.",
  },
  {
    q: "How do I find out if my medications are covered by a Mutual of Omaha Part D plan?",
    a: "Each Mutual of Omaha Part D plan has a formulary (drug list) that specifies which medications are covered and at what tier. You can check the formulary on the Mutual of Omaha website or use the Medicare Plan Finder to compare drug coverage across plans.",
  },
  {
    q: "Can I use any pharmacy with a Mutual of Omaha Part D plan?",
    a: "Mutual of Omaha Part D plans have a network of participating pharmacies. You can use any pharmacy in the network, but using preferred pharmacies typically results in lower copays. Mail-order pharmacy is available for 90-day supplies of maintenance medications.",
  },
  {
    q: "When can I enroll in a Mutual of Omaha Part D plan?",
    a: "You can enroll in a Part D plan during your Initial Enrollment Period (when you first become eligible for Medicare), the Annual Enrollment Period (October 15 – December 7), or a qualifying Special Enrollment Period.",
  },
  {
    q: "Does Mutual of Omaha offer Medicare Supplement plans in addition to Part D?",
    a: "Yes. Mutual of Omaha is one of the most popular Medicare Supplement (Medigap) insurance companies. They offer multiple Medigap plan letters including Plan G, Plan N, and others. Many beneficiaries choose both a Medigap plan and a Part D plan from Mutual of Omaha.",
  },
];

export default function MutualOfOmahaPartD() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Mutual of Omaha Medicare Part D Plans | MedicareFAQ",
    description: "Learn about Mutual of Omaha Medicare Part D prescription drug plans. Compare coverage options, premiums, and pharmacy networks for Mutual of Omaha Part D plans.",
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha",
    ogType: "article",
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
              <Link href="/original-medicare/medicare-parts/medicare-part-d" className="hover:text-white">Medicare Part D</Link>
              <span>/</span>
              <span className="text-white">Mutual of Omaha</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <Pill className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">Mutual of Omaha Medicare Part D Plans</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  Mutual of Omaha offers Medicare Part D prescription drug plans with competitive premiums and a broad pharmacy network. Learn about their Part D options and how to find the right plan for your medications.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* About Mutual of Omaha */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">About Mutual of Omaha Medicare Part D</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mutual of Omaha is one of the most recognized names in Medicare insurance, best known for their Medicare Supplement (Medigap) plans. They also offer Medicare Part D prescription drug plans in many states, providing beneficiaries with a convenient option to bundle their Medigap and drug coverage with a single trusted carrier.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mutual of Omaha Part D plans are designed to be straightforward and affordable, with a focus on covering the most commonly used medications. Their plans include access to a large pharmacy network and a mail-order option for maintenance medications.
            </p>
          </section>

          {/* Plan Highlights */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Plan Highlights</h2>
            <ul className="space-y-2">
              {planHighlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={16} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 2026 Part D Key Facts */}
          <section className="mb-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="text-blue-600" size={20} />
              <h2 className="text-xl font-bold text-[#1B3A6B]">2026 Medicare Part D Key Facts</h2>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Regardless of which carrier you choose, all Part D plans must follow Medicare rules:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Maximum Deductible", value: "$590" },
                { label: "Annual Out-of-Pocket Cap", value: "$2,000" },
                { label: "Catastrophic Coverage", value: "$0 after cap" },
                { label: "Average National Premium", value: "~$46/month" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                  <div className="font-bold text-[#1B3A6B]">{item.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Medigap Cross-sell */}
          <section className="mb-10 bg-teal-50 border border-teal-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">Mutual of Omaha Medicare Supplement Plans</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Mutual of Omaha is one of the top-rated Medicare Supplement insurance companies in the country. Many beneficiaries choose to pair a Mutual of Omaha Medigap plan (such as Plan G or Plan N) with a Part D drug plan for comprehensive coverage.
            </p>
            <Link
              href="/medicare-supplements/medicare-supplement-carriers/mutual-of-omaha"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              View Mutual of Omaha Medigap Plans <ArrowRight size={16} />
            </Link>
          </section>

          {/* FAQs */}
          <section className="mb-10">
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

          {/* Related Links */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Related Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Medicare Part D Overview", href: "/original-medicare/medicare-parts/medicare-part-d" },
                { label: "Part D Costs 2026", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-costs" },
                { label: "Mutual of Omaha Medigap", href: "/medicare-supplements/medicare-supplement-carriers/mutual-of-omaha" },
                { label: "Compare Part D Plans", href: "/compare-rates" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors text-sm text-gray-700 hover:text-teal-700 font-medium"
                >
                  <ArrowRight className="text-teal-500 shrink-0" size={14} />
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Compare Part D Plans in Your Area</h3>
            <p className="text-blue-200 mb-6">
              Our licensed specialists can help you compare Mutual of Omaha Part D plans and other options available in your ZIP code.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+18005551234"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone size={18} />
                Speak with a Specialist
              </a>
              <Link
                href="/compare-rates"
                className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Compare Plans <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
