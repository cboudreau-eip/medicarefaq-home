/**
 * Compare Medicare Plans Page
 * Design: Side-by-side comparison of all Medicare plan types with
 * interactive comparison table and decision guide.
 */

import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  Shield,
  Heart,
  Pill,
  Users,
  DollarSign,
  Star,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const comparisonData = [
  { feature: "Administered By", om: "Federal Government", ma: "Private Insurance Companies", medigap: "Private Insurance Companies", partd: "Private Insurance Companies" },
  { feature: "Monthly Premium", om: "Part B: $185/mo", ma: "$0 – $150+/mo (plus Part B)", medigap: "$75 – $300+/mo (plus Part B)", partd: "~$46/mo average" },
  { feature: "Annual Deductible", om: "Part A: $1,676 / Part B: $257", ma: "Varies by plan ($0 – $500+)", medigap: "Plan G: $257 (Part B only)", partd: "Up to $590" },
  { feature: "Doctor Choice", om: "Any Medicare-accepting doctor", ma: "In-network preferred (HMO/PPO)", medigap: "Any Medicare-accepting doctor", partd: "Plan pharmacy network" },
  { feature: "Referrals Needed?", om: "No", ma: "HMO: Yes / PPO: No", medigap: "No", partd: "N/A" },
  { feature: "Out-of-Pocket Maximum", om: "No limit", ma: "$8,850 max (in-network)", medigap: "Near $0 with Plan G", partd: "$2,000/year" },
  { feature: "Prescription Drugs", om: "Not included", ma: "Usually included", medigap: "Not included", partd: "Yes — standalone" },
  { feature: "Dental/Vision/Hearing", om: "Not included", ma: "Often included", medigap: "Not included", partd: "Not included" },
  { feature: "Works Nationwide?", om: "Yes", ma: "Usually local/regional", medigap: "Yes", partd: "Varies by plan" },
  { feature: "Guaranteed Renewable?", om: "Yes", ma: "Yes (annual changes)", medigap: "Yes", partd: "Yes (annual changes)" },
];

const scenarios = [
  {
    title: "You want maximum freedom",
    desc: "See any doctor, any hospital, anywhere in the U.S. No networks, no referrals, no prior authorizations.",
    recommendation: "Original Medicare + Medigap + Part D",
    color: "bg-blue-50 border-blue-200",
    icon: Shield,
  },
  {
    title: "You want the lowest monthly cost",
    desc: "Keep premiums as low as possible. Willing to use a network of doctors and accept copays when you use services.",
    recommendation: "Medicare Advantage (Part C)",
    color: "bg-teal-50 border-teal-200",
    icon: DollarSign,
  },
  {
    title: "You want all-in-one simplicity",
    desc: "One card, one plan. Hospital, medical, drugs, dental, vision, and hearing all bundled together.",
    recommendation: "Medicare Advantage (Part C)",
    color: "bg-green-50 border-green-200",
    icon: Heart,
  },
  {
    title: "You have expensive medications",
    desc: "You take specialty or brand-name drugs and want to minimize prescription costs with the $2,000 annual cap.",
    recommendation: "Original Medicare + Medigap + Part D (or MA-PD)",
    color: "bg-purple-50 border-purple-200",
    icon: Pill,
  },
  {
    title: "You travel or live in multiple states",
    desc: "You spend time in different states and need coverage that works everywhere, not just locally.",
    recommendation: "Original Medicare + Medigap + Part D",
    color: "bg-amber-50 border-amber-200",
    icon: Users,
  },
  {
    title: "You're healthy and want extras",
    desc: "You're in good health, rarely see doctors, and want dental, vision, hearing, and fitness benefits.",
    recommendation: "Medicare Advantage (Part C)",
    color: "bg-rose-50 border-rose-200",
    icon: Star,
  },
];

const faqs = [
  {
    q: "Can I have Medicare Advantage and Medigap at the same time?",
    a: "No. You cannot have both. Medigap works only with Original Medicare. If you enroll in Medicare Advantage, you must drop your Medigap policy. Be cautious — you may not be able to get Medigap back later without medical underwriting.",
  },
  {
    q: "Which option is cheaper overall?",
    a: "It depends on your health. Medicare Advantage has lower monthly premiums but higher costs when you use services (copays, coinsurance). Original Medicare + Medigap has higher monthly premiums but very low out-of-pocket costs when you need care. If you're healthy, MA may cost less. If you have frequent medical needs, Medigap often saves money.",
  },
  {
    q: "Can I switch between Medicare Advantage and Original Medicare?",
    a: "Yes. You can switch during the Annual Enrollment Period (Oct 15 – Dec 7) or the MA Open Enrollment Period (Jan 1 – Mar 31). However, switching back to Original Medicare + Medigap may require medical underwriting for the Medigap policy in most states.",
  },
  {
    q: "Do I need Part D with every option?",
    a: "With Original Medicare + Medigap, yes — you need a standalone Part D plan for drug coverage. With Medicare Advantage, most plans already include Part D (MA-PD plans). Either way, having drug coverage is important to avoid the permanent late enrollment penalty.",
  },
];

export default function ComparePlans() {
  useSEO({
    title: "Compare Medicare Plans | Supplement vs. Advantage | MedicareFAQ",
    description: "Compare Medicare Supplement and Medicare Advantage plans side by side. Find out which type of coverage is right for your health needs and budget.",
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/compare/",
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Compare Plans</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Compare Medicare Plan Types
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Side-by-side comparison of Original Medicare, Medicare Advantage, Medigap, and Part D. Find the right combination for your needs, budget, and lifestyle.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            Plan-by-Plan Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-16">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold min-w-[180px]">Feature</th>
                  <th className="py-4 px-4 font-semibold text-center min-w-[160px]">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="w-5 h-5 text-blue-300" />
                      <span>Original Medicare</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold text-center min-w-[160px]">
                    <div className="flex flex-col items-center gap-1">
                      <Heart className="w-5 h-5 text-teal-300" />
                      <span>Medicare Advantage</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold text-center min-w-[160px] bg-teal-700">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="w-5 h-5 text-teal-200" />
                      <span>Medigap (Supplement)</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold text-center min-w-[160px]">
                    <div className="flex flex-col items-center gap-1">
                      <Pill className="w-5 h-5 text-purple-300" />
                      <span>Part D (Drugs)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="py-3 px-4 text-slate-900 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-slate-600 text-center text-xs">{row.om}</td>
                    <td className="py-3 px-4 text-slate-600 text-center text-xs">{row.ma}</td>
                    <td className="py-3 px-4 text-slate-600 text-center text-xs bg-teal-50/30">{row.medigap}</td>
                    <td className="py-3 px-4 text-slate-600 text-center text-xs">{row.partd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Decision Guide */}
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            Which Option Is Right for You?
          </h2>
          <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
            Your ideal Medicare setup depends on your priorities. Find your scenario below:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {scenarios.map((s, i) => (
              <div key={i} className={`p-6 rounded-xl border ${s.color}`}>
                <s.icon className="w-8 h-8 text-slate-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{s.desc}</p>
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">Recommended:</p>
                  <p className="text-sm font-semibold text-slate-900">{s.recommendation}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {[
              { title: "Original Medicare", href: "/medicare-plans/original-medicare", icon: Shield, color: "text-blue-600" },
              { title: "Medicare Supplement", href: "/medicare-plans/medicare-supplement", icon: Shield, color: "text-teal-600" },
              { title: "Medicare Advantage", href: "/medicare-plans/medicare-advantage", icon: Heart, color: "text-teal-600" },
              { title: "Part D Drug Plans", href: "/medicare-plans/part-d", icon: Pill, color: "text-purple-600" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/30 transition-colors group">
                <link.icon className={`w-6 h-6 ${link.color}`} />
                <div>
                  <p className="font-semibold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">{link.title}</p>
                  <p className="text-xs text-slate-500">Learn more →</p>
                </div>
              </Link>
            ))}
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
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Not Sure Which Plan Is Right for You?
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Our licensed Medicare agents can analyze your specific situation — doctors, medications, budget, and preferences — and recommend the best plan combination at no cost to you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
