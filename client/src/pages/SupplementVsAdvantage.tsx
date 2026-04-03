/**
 * Medicare Supplement vs Medicare Advantage Page
 * Design: In-depth comparison with pros/cons, scenarios, and decision framework.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  Shield,
  Heart,
  DollarSign,
  MapPin,
  Stethoscope,
  AlertTriangle,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const comparisonRows = [
  { feature: "Monthly Premium", supplement: "Higher ($75 – $300+/mo)", advantage: "Lower ($0 – $150+/mo)" },
  { feature: "Out-of-Pocket When You Use Care", supplement: "Very low (near $0 with Plan G)", advantage: "Higher (copays + coinsurance)" },
  { feature: "Annual Out-of-Pocket Max", supplement: "Effectively near $0", advantage: "$8,850 in-network (2026)" },
  { feature: "Doctor Freedom", supplement: "Any Medicare-accepting doctor nationwide", advantage: "Network-based (HMO/PPO)" },
  { feature: "Referrals Required?", supplement: "Never", advantage: "HMO: Yes / PPO: No" },
  { feature: "Prescription Drug Coverage", supplement: "No — need separate Part D", advantage: "Usually included (MA-PD)" },
  { feature: "Dental, Vision, Hearing", supplement: "Not included", advantage: "Often included" },
  { feature: "Fitness Benefits", supplement: "Not included", advantage: "Often included (SilverSneakers)" },
  { feature: "Works When Traveling?", supplement: "Yes — nationwide", advantage: "Limited outside service area" },
  { feature: "Prior Authorization", supplement: "Rarely (follows Medicare rules)", advantage: "Frequently required" },
  { feature: "Plan Changes Annually?", supplement: "No — benefits are standardized", advantage: "Yes — networks, costs, formularies change" },
  { feature: "Guaranteed Issue Rights", supplement: "6-month window at 65 (federal)", advantage: "Annual enrollment periods" },
  { feature: "Medical Underwriting", supplement: "After open enrollment, usually yes", advantage: "No — guaranteed issue during enrollment" },
  { feature: "Best For", supplement: "People who want predictability & freedom", advantage: "People who want low premiums & extras" },
];

const supplementPros = [
  "Predictable costs — you know exactly what you'll pay each month",
  "See any Medicare-accepting doctor or specialist nationwide",
  "No network restrictions, referrals, or prior authorizations",
  "Benefits never change — standardized by the federal government",
  "Ideal for frequent travelers or snowbirds",
  "Low to zero out-of-pocket costs when you receive care",
];

const supplementCons = [
  "Higher monthly premiums than Medicare Advantage",
  "No prescription drug coverage — need separate Part D plan",
  "No dental, vision, or hearing benefits included",
  "Medical underwriting may apply if you don't enroll during open enrollment",
  "No fitness or wellness program benefits",
];

const advantagePros = [
  "Low or $0 monthly premiums (in addition to Part B)",
  "All-in-one coverage: hospital, medical, drugs, and often dental/vision/hearing",
  "Annual out-of-pocket maximum protects against catastrophic costs",
  "Extra benefits like fitness programs, meal delivery, transportation",
  "No medical underwriting — guaranteed issue during enrollment periods",
  "Some plans offer over-the-counter allowances and telehealth",
];

const advantageCons = [
  "Network restrictions — must use in-network doctors (especially HMO)",
  "May require referrals to see specialists (HMO plans)",
  "Prior authorization often required for procedures and medications",
  "Plan benefits, networks, and formularies can change every year",
  "Limited coverage outside your plan's service area",
  "Higher out-of-pocket costs when you actually use services",
];

const faqs = [
  {
    q: "Can I switch from Medicare Advantage to Medigap?",
    a: "Yes, but it may be difficult. In most states, you'll need to pass medical underwriting to get a Medigap policy after your initial open enrollment period. Some states (like California, Connecticut, and New York) have guaranteed issue rights that make switching easier. The MA Open Enrollment Period (Jan 1 – Mar 31) allows you to drop MA and return to Original Medicare, but getting Medigap is the challenge.",
  },
  {
    q: "Which option costs less overall?",
    a: "It depends on your health. If you're healthy and rarely see doctors, Medicare Advantage typically costs less due to lower premiums. If you have chronic conditions, see specialists frequently, or have planned surgeries, Medigap often costs less overall because your out-of-pocket costs are minimal regardless of how much care you need.",
  },
  {
    q: "Do I need Part D with Medicare Supplement?",
    a: "Yes. Medigap plans do not include prescription drug coverage. You need a standalone Part D plan to cover medications. Without Part D, you'll face a permanent late enrollment penalty if you go 63+ days without creditable drug coverage.",
  },
  {
    q: "Which is better for someone with chronic conditions?",
    a: "Generally, Medicare Supplement (Medigap) is better for people with chronic conditions. The predictable, low out-of-pocket costs and freedom to see any specialist without referrals or prior authorization make managing ongoing health conditions easier and less expensive.",
  },
  {
    q: "What if I can't afford Medigap premiums?",
    a: "Medicare Advantage is a strong alternative if Medigap premiums are too high. Many MA plans have $0 premiums and include drug coverage plus extras. You can also look into Medicare Savings Programs (MSP) that help pay Part B premiums, or Medicaid dual-eligible plans.",
  },
];

export default function SupplementVsAdvantage() {
  useCMSSEO({
    contentType: "page",
    slug: "supplement-vs-advantage",
    title: "Medicare Supplement vs. Medicare Advantage | Which Is Better? | MedicareFAQ",
    description: "Should you choose Medicare Supplement (Medigap) or Medicare Advantage? Compare costs, coverage, flexibility, and networks to find the right plan for you.",
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/supplement-vs-advantage/",
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Supplement vs. Advantage</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Supplement vs. Medicare Advantage
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            The most important decision in Medicare: comprehensive Medigap coverage with freedom, or all-in-one Advantage plans with lower premiums. Here's how to choose.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#comparison" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              See Full Comparison <ArrowRight className="w-4 h-4" />
            </a>
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Medigap Card */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Medicare Supplement</h2>
                  <p className="text-sm text-blue-700">(Medigap)</p>
                </div>
              </div>
              <p className="text-slate-600 mb-6">
                Fills the "gaps" in Original Medicare — deductibles, copays, and coinsurance. You keep Original Medicare as your primary insurance and Medigap pays most or all of what Medicare doesn't.
              </p>
              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-green-800">Pros:</p>
                {supplementPros.map((pro, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700">{pro}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-red-800">Cons:</p>
                {supplementCons.map((con, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700">{con}</span>
                  </div>
                ))}
              </div>
              <Link href="/medicare-plans/medicare-supplement" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 mt-6 hover:text-blue-900 transition-colors">
                Learn more about Medigap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Advantage Card */}
            <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Medicare Advantage</h2>
                  <p className="text-sm text-teal-700">(Part C)</p>
                </div>
              </div>
              <p className="text-slate-600 mb-6">
                An alternative to Original Medicare offered by private insurers. Bundles Part A, Part B, and usually Part D into one plan. Often includes extra benefits like dental, vision, and hearing.
              </p>
              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-green-800">Pros:</p>
                {advantagePros.map((pro, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700">{pro}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-red-800">Cons:</p>
                {advantageCons.map((con, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700">{con}</span>
                  </div>
                ))}
              </div>
              <Link href="/medicare-plans/medicare-advantage" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 mt-6 hover:text-teal-900 transition-colors">
                Learn more about Medicare Advantage <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl mb-16">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Important: This Decision May Be Permanent</p>
                <p className="text-sm text-amber-800">
                  If you choose Medicare Advantage and later want to switch to Original Medicare + Medigap, you may not be able to get a Medigap policy without medical underwriting (in most states). This means you could be denied coverage or charged higher premiums based on your health. <strong>Make this decision carefully during your initial enrollment.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div id="comparison">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
              Side-by-Side Comparison
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-16">
              <table className="w-full text-sm">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="text-left py-4 px-4 font-semibold min-w-[180px]">Feature</th>
                    <th className="py-4 px-4 font-semibold text-center min-w-[200px] bg-blue-800">
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4" /> Medicare Supplement
                      </div>
                    </th>
                    <th className="py-4 px-4 font-semibold text-center min-w-[200px] bg-teal-700">
                      <div className="flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4" /> Medicare Advantage
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="py-3 px-4 text-slate-900 font-medium">{row.feature}</td>
                      <td className="py-3 px-4 text-slate-600 text-center text-xs">{row.supplement}</td>
                      <td className="py-3 px-4 text-slate-600 text-center text-xs">{row.advantage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Still Not Sure? Let Us Help You Decide.
            </h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">
              Our licensed agents specialize in helping people choose between Medigap and Medicare Advantage. We'll analyze your doctors, medications, and budget to give you a personalized recommendation — at no cost.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link href="/medicare-plans/compare" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                Compare All Plan Types <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
