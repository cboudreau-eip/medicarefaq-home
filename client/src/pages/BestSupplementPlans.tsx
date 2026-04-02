/**
 * Best Medicare Supplement Plans 2026 Page
 * Design: Ranked plan comparison with detailed breakdowns of each Medigap letter plan.
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
  Star,
  Trophy,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const planComparison = [
  { benefit: "Part A Coinsurance & Hospital Costs", g: true, n: true, f: true, gHd: true },
  { benefit: "Part B Coinsurance/Copayment", g: true, n: "75%", f: true, gHd: true },
  { benefit: "Part A Deductible ($1,676)", g: true, n: true, f: true, gHd: true },
  { benefit: "Part B Deductible ($257)", g: false, n: false, f: true, gHd: false },
  { benefit: "Part B Excess Charges", g: true, n: false, f: true, gHd: true },
  { benefit: "Blood (First 3 Pints)", g: true, n: true, f: true, gHd: true },
  { benefit: "Skilled Nursing Facility Coinsurance", g: true, n: true, f: true, gHd: true },
  { benefit: "Foreign Travel Emergency (80%)", g: true, n: true, f: true, gHd: true },
  { benefit: "Part A Hospice Coinsurance", g: true, n: true, f: true, gHd: true },
];

const topPlans = [
  {
    rank: 1,
    name: "Plan G",
    badge: "Most Popular",
    avgPremium: "$130 – $250/mo",
    deductible: "$257 Part B deductible",
    color: "border-teal-400 bg-teal-50",
    badgeColor: "bg-teal-600",
    desc: "The gold standard of Medigap. Plan G covers everything except the Part B deductible ($257/year). After paying that small deductible, you have virtually zero out-of-pocket costs for the rest of the year. Plan G has been the most popular Medigap plan since Plan F closed to new enrollees in 2020.",
    bestFor: "Most Medicare beneficiaries who want comprehensive, predictable coverage",
    pros: ["Covers nearly everything — only $257/year out-of-pocket", "Nationwide coverage — any Medicare doctor", "No referrals or prior authorization", "Premiums often lower than Plan F was"],
    cons: ["Must pay the $257 Part B deductible", "No prescription drug coverage", "Higher premiums than Plan N"],
  },
  {
    rank: 2,
    name: "Plan N",
    badge: "Best Value",
    avgPremium: "$90 – $180/mo",
    deductible: "$257 Part B deductible + small copays",
    color: "border-blue-400 bg-blue-50",
    badgeColor: "bg-blue-600",
    desc: "Plan N offers strong coverage at a lower premium than Plan G. The trade-off: you pay small copays for office visits ($20) and ER visits ($50 if not admitted), and Plan N doesn't cover Part B excess charges. For most people, the premium savings outweigh these small copays.",
    bestFor: "Budget-conscious beneficiaries who want strong coverage at a lower premium",
    pros: ["20-30% lower premiums than Plan G", "Still covers Part A deductible, coinsurance, SNF", "Nationwide coverage — any Medicare doctor", "Small copays are predictable and manageable"],
    cons: ["$20 copay for some office visits", "$50 ER copay if not admitted", "Doesn't cover Part B excess charges"],
  },
  {
    rank: 3,
    name: "Plan F",
    badge: "Most Comprehensive",
    avgPremium: "$170 – $350/mo",
    deductible: "$0 — everything covered",
    color: "border-amber-400 bg-amber-50",
    badgeColor: "bg-amber-600",
    desc: "Plan F covers everything — literally zero out-of-pocket costs after your premium. However, it's only available to people who became Medicare-eligible before January 1, 2020. Because the pool is shrinking (no new enrollees), premiums tend to increase faster than Plan G.",
    bestFor: "Those eligible before 2020 who want absolute zero out-of-pocket costs",
    pros: ["100% coverage — zero out-of-pocket costs", "Covers Part B deductible (Plan G doesn't)", "Covers Part B excess charges", "Maximum peace of mind"],
    cons: ["Only available if Medicare-eligible before Jan 1, 2020", "Premiums rising faster than Plan G", "Shrinking risk pool drives costs up", "Paying more for just $257 of extra coverage vs Plan G"],
  },
  {
    rank: 4,
    name: "High-Deductible Plan G",
    badge: "Lowest Premium",
    avgPremium: "$40 – $80/mo",
    deductible: "$2,870 annual deductible (2026)",
    color: "border-slate-300 bg-slate-50",
    badgeColor: "bg-slate-600",
    desc: "High-Deductible Plan G has the same benefits as regular Plan G, but with a much lower premium. The catch: you pay a $2,870 annual deductible before the plan kicks in. After the deductible, coverage is identical to Plan G. This is a good option for healthy people who want catastrophic protection.",
    bestFor: "Healthy beneficiaries who want low premiums with catastrophic protection",
    pros: ["Lowest Medigap premiums available", "Same comprehensive coverage as Plan G after deductible", "Good catastrophic protection", "Premium savings can exceed the deductible for healthy people"],
    cons: ["$2,870 annual deductible before coverage starts", "Higher out-of-pocket risk than Plan G or N", "Not ideal for people with frequent medical needs", "Must budget for potential deductible costs"],
  },
];

const faqs = [
  {
    q: "Is Plan G or Plan N better?",
    a: "Plan G is better if you want maximum coverage and minimal out-of-pocket costs. Plan N is better if you want to save 20-30% on premiums and don't mind small copays ($20 office visits, $50 ER). If you see your doctor frequently or want zero surprises, Plan G is the safer choice. If you're healthy and budget-conscious, Plan N offers excellent value.",
  },
  {
    q: "Can I still get Plan F?",
    a: "Only if you became Medicare-eligible before January 1, 2020. If you turned 65 or qualified for Medicare before that date, you can still enroll in Plan F. However, most experts recommend Plan G instead — it's nearly identical coverage for a lower premium, and the only difference is the $257 Part B deductible.",
  },
  {
    q: "When is the best time to buy a Medigap plan?",
    a: "During your 6-month Medigap Open Enrollment Period, which starts the month you turn 65 AND are enrolled in Part B. During this window, insurance companies cannot deny you coverage or charge more due to health conditions. After this period, you may face medical underwriting.",
  },
  {
    q: "Do Medigap premiums increase with age?",
    a: "It depends on the pricing method. 'Attained-age' plans increase as you get older. 'Issue-age' plans are based on your age when you buy (cheaper long-term). 'Community-rated' plans charge everyone the same regardless of age. Ask about the pricing method before enrolling.",
  },
  {
    q: "Which insurance companies offer the best Medigap rates?",
    a: "Because Medigap plans are standardized (Plan G is the same benefits regardless of company), the main differentiator is price. Top-rated companies include AARP/UnitedHealthcare, Mutual of Omaha, Cigna, Aetna, and Blue Cross Blue Shield. Rates vary significantly by company, location, age, and gender — always compare at least 3-5 companies.",
  },
];

export default function BestSupplementPlans() {
  useSEO({
    title: "Best Medicare Supplement Plans 2026 | Top Medigap Plans Ranked | MedicareFAQ",
    description: "Find the best Medicare Supplement plans for 2026. We compare Plan G, Plan N, and other top Medigap options by cost, coverage, and value.",
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/best-supplement-plans/",
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Best Supplement Plans</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">2026 Rankings</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Best Medicare Supplement Plans for 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Expert-ranked comparison of Medigap Plan G, Plan N, Plan F, and High-Deductible Plan G. Find the right balance of coverage and cost.
          </p>
        </div>
      </section>

      {/* Plan Rankings */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            Top Medigap Plans Ranked
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto mb-16">
            {topPlans.map((plan) => (
              <div key={plan.rank} className={`rounded-2xl border-2 ${plan.color} overflow-hidden`}>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-slate-200 shadow-sm">
                        <span className="text-xl font-bold text-slate-700">#{plan.rank}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                          <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${plan.badgeColor}`}>{plan.badge}</span>
                        </div>
                        <p className="text-sm text-slate-600">{plan.deductible}</p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-slate-500">Avg. Monthly Premium</p>
                      <p className="text-lg font-bold text-slate-900">{plan.avgPremium}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">{plan.desc}</p>
                  <div className="bg-white rounded-xl p-4 mb-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Best For:</p>
                    <p className="text-sm font-medium text-slate-800">{plan.bestFor}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-green-800 mb-2">Pros:</p>
                      <div className="space-y-1.5">
                        {plan.pros.map((pro, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <span className="text-xs text-slate-700">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-800 mb-2">Cons:</p>
                      <div className="space-y-1.5">
                        {plan.cons.map((con, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                            <span className="text-xs text-slate-700">{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Comparison Table */}
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            Benefits Comparison Table
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-16 max-w-4xl mx-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Benefit</th>
                  <th className="py-3 px-4 font-semibold text-center">Plan G</th>
                  <th className="py-3 px-4 font-semibold text-center">Plan N</th>
                  <th className="py-3 px-4 font-semibold text-center">Plan F*</th>
                  <th className="py-3 px-4 font-semibold text-center">HD Plan G</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {planComparison.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.benefit}</td>
                    {[row.g, row.n, row.f, row.gHd].map((val, j) => (
                      <td key={j} className="py-3 px-4 text-center">
                        {val === true ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                        ) : val === false ? (
                          <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                        ) : (
                          <span className="text-xs font-medium text-amber-700">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 text-center mb-16">*Plan F only available to those Medicare-eligible before January 1, 2020</p>

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
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Get Your Personalized Medigap Quote
            </h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Medigap rates vary by company, age, location, and gender. Our licensed agents compare rates from top carriers to find you the best price for the same standardized benefits.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link href="/medicare-plans/supplement-vs-advantage" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                Supplement vs. Advantage <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
