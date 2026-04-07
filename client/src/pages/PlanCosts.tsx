/**
 * Medicare Plan Costs Page (under Medicare Plans section)
 * Design: Focused on plan-specific cost comparisons — what you pay
 * with each plan type and how to minimize costs.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  ChevronDown,
  Phone,
  ArrowRight,
  DollarSign,
  Shield,
  Heart,
  Pill,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const costScenarios = [
  {
    title: "Original Medicare Only",
    subtitle: "No supplemental coverage",
    monthly: "$185",
    monthlyLabel: "Part B premium only",
    annual: "No limit",
    annualLabel: "Out-of-pocket maximum",
    risk: "high",
    items: [
      { label: "Part A Premium", value: "$0 (most people)" },
      { label: "Part B Premium", value: "$185/month" },
      { label: "Part A Deductible", value: "$1,676/benefit period" },
      { label: "Part B Deductible", value: "$257/year" },
      { label: "Part B Coinsurance", value: "20% with no limit" },
      { label: "Hospital Days 61-90", value: "$419/day" },
      { label: "Prescription Drugs", value: "Not covered" },
    ],
    color: "border-red-200 bg-red-50",
  },
  {
    title: "Original Medicare + Medigap G + Part D",
    subtitle: "Most comprehensive option",
    monthly: "$361 – $481",
    monthlyLabel: "Part B + Medigap + Part D",
    annual: "~$257",
    annualLabel: "Part B deductible only",
    risk: "low",
    items: [
      { label: "Part B Premium", value: "$185/month" },
      { label: "Medigap Plan G Premium", value: "$130 – $250/month" },
      { label: "Part D Premium", value: "~$46/month" },
      { label: "Part B Deductible", value: "$257/year" },
      { label: "Everything Else", value: "$0 (covered by Medigap)" },
      { label: "Drug Out-of-Pocket Cap", value: "$2,000/year" },
    ],
    color: "border-green-200 bg-green-50",
  },
  {
    title: "Medicare Advantage (Part C)",
    subtitle: "All-in-one alternative",
    monthly: "$185 – $335",
    monthlyLabel: "Part B + MA premium",
    annual: "$8,850",
    annualLabel: "In-network OOP max",
    risk: "medium",
    items: [
      { label: "Part B Premium", value: "$185/month" },
      { label: "MA Plan Premium", value: "$0 – $150+/month" },
      { label: "PCP Copay", value: "$0 – $30/visit" },
      { label: "Specialist Copay", value: "$20 – $50/visit" },
      { label: "Hospital Stay", value: "$200 – $400/day" },
      { label: "Drug Coverage", value: "Usually included" },
      { label: "Dental/Vision/Hearing", value: "Often included" },
    ],
    color: "border-blue-200 bg-blue-50",
  },
];

const savingsTips = [
  {
    title: "Compare Medigap Rates Annually",
    desc: "The same Plan G can cost 40% more from one company vs. another. Always compare at least 3-5 carriers. Rates vary by company, age, gender, and ZIP code.",
    icon: TrendingDown,
  },
  {
    title: "Check for Medicare Savings Programs",
    desc: "If your income is below $1,715/month (single), you may qualify for QMB, SLMB, or QI programs that pay your Part B premium and sometimes deductibles and coinsurance.",
    icon: DollarSign,
  },
  {
    title: "Apply for Extra Help (Part D)",
    desc: "If your income is below $22,590/year (single), you may qualify for Extra Help that covers Part D premiums, deductibles, and copays. This saves an average of $5,300/year.",
    icon: Pill,
  },
  {
    title: "Review Part D Plans Every Year",
    desc: "Formularies and premiums change annually. A plan that was cheapest last year may not be this year. Use Medicare.gov's Plan Finder tool during AEP (Oct 15 – Dec 7).",
    icon: Shield,
  },
  {
    title: "Avoid the Part D Late Penalty",
    desc: "Going 63+ days without creditable drug coverage triggers a permanent penalty of ~1% per month. Even if you don't take medications now, enroll in a low-cost Part D plan.",
    icon: AlertTriangle,
  },
  {
    title: "Consider High-Deductible Plan G",
    desc: "If you're healthy, HD Plan G costs $40-80/month vs. $130-250 for regular Plan G. You'll pay a $2,870 deductible, but the premium savings often exceed the deductible risk.",
    icon: Heart,
  },
];

const faqs = [
  {
    q: "What is the total cost of Medicare per month?",
    a: "It depends on your coverage choice. Original Medicare alone is $185/month (Part B). With Medigap Plan G + Part D, expect $361-481/month total. With Medicare Advantage, expect $185-335/month total. These are 2026 figures and don't include IRMAA surcharges for higher-income beneficiaries.",
  },
  {
    q: "Is Medicare Advantage really free?",
    a: "No. Even $0-premium MA plans require you to pay the Part B premium ($185/month). The '$0 premium' means no additional premium beyond Part B. You'll also pay copays, coinsurance, and deductibles when you use services — which can add up to $8,850/year in-network.",
  },
  {
    q: "Which option costs less if I'm sick?",
    a: "Medigap (especially Plan G) almost always costs less if you have significant medical needs. Your out-of-pocket is capped at ~$257/year regardless of how much care you need. With Medicare Advantage, a major illness or surgery could cost you thousands in copays up to the $8,850 max.",
  },
  {
    q: "What is IRMAA and will it affect me?",
    a: "IRMAA (Income-Related Monthly Adjustment Amount) is a surcharge on Part B and Part D premiums for higher-income beneficiaries. If your modified adjusted gross income exceeds $106,000 (single) or $212,000 (married), you'll pay $74-$419 extra per month for Part B and $13-$81 extra for Part D.",
  },
];

export default function PlanCosts() {
  useCMSSEO({
    contentType: "page",
    slug: "plan-costs",
    title: "Medicare Plan Costs 2026 | Premiums, Deductibles & More | MedicareFAQ",
    description: "Understand Medicare costs for 2026 including Part A and Part B premiums, deductibles, and out-of-pocket expenses for Supplement and Advantage plans.",
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/costs/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    ogType: "article",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Medicare Costs</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">Cost Comparison</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Costs by Plan Type
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            See exactly what you'll pay with each Medicare option in 2026. Compare premiums, deductibles, copays, and total out-of-pocket costs side by side.
          </p>
        </div>
      </section>

      {/* Cost Scenarios */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            What You'll Pay: Three Scenarios
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            Your total Medicare costs depend on which coverage path you choose. Here's a realistic breakdown of each option:
          </p>
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {costScenarios.map((scenario, i) => (
              <div key={i} className={`rounded-2xl border-2 ${scenario.color} overflow-hidden`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-lg">{scenario.title}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      scenario.risk === "low" ? "bg-green-200 text-green-800" :
                      scenario.risk === "medium" ? "bg-amber-200 text-amber-800" :
                      "bg-red-200 text-red-800"
                    }`}>
                      {scenario.risk === "low" ? "Low Risk" : scenario.risk === "medium" ? "Medium Risk" : "High Risk"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">{scenario.subtitle}</p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">{scenario.monthlyLabel}</p>
                      <p className="text-xl font-bold text-slate-900">{scenario.monthly}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">{scenario.annualLabel}</p>
                      <p className="text-xl font-bold text-slate-900">{scenario.annual}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {scenario.items.map((item, j) => (
                      <div key={j} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-medium text-slate-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Savings Tips */}
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            6 Ways to Lower Your Medicare Costs
          </h2>
          <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
            Smart strategies that can save you hundreds or thousands per year:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {savingsTips.map((tip, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 hover:border-teal-200 hover:shadow-md transition-all">
                <tip.icon className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>

          {/* IRMAA Table */}
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            2026 IRMAA Surcharges
          </h2>
          <p className="text-slate-600 text-center mb-6 max-w-2xl mx-auto">
            Higher-income beneficiaries pay more for Part B and Part D. These surcharges are based on your tax return from 2 years ago:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-16 max-w-3xl mx-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Income (Single / Married)</th>
                  <th className="py-3 px-4 font-semibold text-center">Part B Premium</th>
                  <th className="py-3 px-4 font-semibold text-center">Part D Surcharge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["≤ $106,000 / $212,000", "$185.00", "$0.00"],
                  ["$106,001 – $133,500 / $212,001 – $267,000", "$259.00", "$13.70"],
                  ["$133,501 – $167,000 / $267,001 – $334,000", "$370.00", "$35.30"],
                  ["$167,001 – $200,000 / $334,001 – $400,000", "$480.90", "$57.00"],
                  ["$200,001 – $500,000 / $400,001 – $750,000", "$591.90", "$78.60"],
                  ["> $500,000 / > $750,000", "$628.90", "$85.80"],
                ].map(([income, partB, partD], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="py-3 px-4 text-slate-700 text-xs">{income}</td>
                    <td className="py-3 px-4 text-slate-900 font-semibold text-center">{partB}</td>
                    <td className="py-3 px-4 text-slate-900 font-semibold text-center">{partD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FAQs */}
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3 mb-16">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Get a Personalized Cost Estimate
            </h2>
            <p className="text-green-100 mb-6 max-w-xl mx-auto">
              Your actual Medicare costs depend on your location, health, medications, and income. Our licensed agents can give you a personalized cost breakdown at no charge.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link href="/compare-rates" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                Compare All Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
