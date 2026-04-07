/**
 * Medicare Supplement Plans 2026 Page
 * Route: /medicare-supplements/medicare-supplement-plans-2026
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Shield, ChevronDown, Phone, ArrowRight, TrendingUp, DollarSign, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const COST_CHANGES_2026 = [
  { item: "Part A Deductible", value2025: "$1,632", value2026: "$1,676", change: "+$44 (+2.7%)", impact: "Plans that cover Part A deductible (B, C, D, F, G, M, N, HD-F, HD-G) now cover $44 more per hospital admission." },
  { item: "Part B Deductible", value2025: "$240", value2026: "$257", change: "+$17 (+7.1%)", impact: "Plans C and F cover this. All others require you to pay $257 before Part B coverage begins." },
  { item: "HD Plan Deductible", value2025: "$2,800", value2026: "$2,870", change: "+$70 (+2.5%)", impact: "HD-G and HD-F enrollees must pay $2,870 before plan coverage begins." },
  { item: "Plan K Out-of-Pocket Max", value2025: "$6,940", value2026: "$7,060", change: "+$120 (+1.7%)", impact: "Plan K enrollees have a higher cap before 100% coverage kicks in." },
  { item: "Plan L Out-of-Pocket Max", value2025: "$3,470", value2026: "$3,530", change: "+$60 (+1.7%)", impact: "Plan L enrollees have a slightly higher OOP cap in 2026." },
  { item: "SNF Coinsurance (Days 21–100)", value2025: "$204/day", value2026: "$209.50/day", change: "+$5.50/day", impact: "Plans that cover SNF coinsurance (C, D, F, G, M, N, HD-F, HD-G) cover this increased daily rate." },
];

const POPULAR_PLANS_2026 = [
  {
    letter: "G",
    slug: "plan-g",
    label: "Best Overall",
    labelColor: "bg-teal-500",
    premium: "$100–$300/mo",
    summary: "The most popular plan for new enrollees. Covers everything except the Part B deductible. No networks, no referrals.",
  },
  {
    letter: "N",
    slug: "plan-n",
    label: "Best Value",
    labelColor: "bg-green-500",
    premium: "$75–$225/mo",
    summary: "Lower premiums than Plan G with small copays for office and ER visits. Best for healthy enrollees.",
  },
  {
    letter: "HD-G",
    slug: "high-deductible-plan-g",
    label: "Lowest Premium",
    labelColor: "bg-emerald-600",
    premium: "$30–$80/mo",
    summary: "Same coverage as Plan G after a $2,870 deductible. Dramatically lower premiums for healthy enrollees.",
  },
];

const WHAT_CHANGED = [
  {
    title: "Plan F Still Unavailable to New Enrollees",
    desc: "Plan F and Plan C remain unavailable to anyone who became eligible for Medicare after January 1, 2020. This rule has not changed for 2026.",
  },
  {
    title: "Plan G Remains the Top Choice",
    desc: "Plan G continues to be the most popular Medigap plan for new enrollees, offering comprehensive coverage with only the Part B deductible as an out-of-pocket cost.",
  },
  {
    title: "High Deductible Plans Growing in Popularity",
    desc: "HD-G has seen increased enrollment as premiums for standard Plan G have risen. The $2,870 deductible is manageable for healthy enrollees who save significantly on monthly premiums.",
  },
  {
    title: "Premium Increases Vary by Insurer",
    desc: "Medigap premiums are not standardized — each insurer sets its own rates. Premium increases in 2026 ranged from 0% to 8%+ depending on the carrier and state. Shopping and comparing quotes remains essential.",
  },
];

export default function MedigapPlans2026() {
  useCMSSEO({
    contentType: "page",
    slug: "medicare-supplement-plans-2026",
    title: "Medicare Supplement Plans 2026: Changes, Costs & What's New",
    description: "See what's changing with Medicare Supplement plans in 2026, including updated deductibles, out-of-pocket maximums, and premium trends for all Medigap plan letters.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/medicare-supplement-plans-2026/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    ogType: "article",
  });

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
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Plans 2026</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-wider px-3 py-1 rounded-full bg-teal-600">
              2026 Update
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Supplement Plans 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Updated deductibles, out-of-pocket maximums, and what's changed for Medigap plans in 2026.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Compare 2026 Rates
            </a>
            <Link href="/medicare-supplements/compare" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              Compare All Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">

          {/* Key 2026 Numbers */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Key 2026 Medicare Cost Numbers
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              CMS adjusts Medicare cost-sharing amounts annually. These changes directly affect what Medigap plans cover and what you pay out of pocket.
            </p>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-900 text-white grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-wider">Cost Item</span>
                <span className="text-xs font-bold uppercase tracking-wider text-center">2025</span>
                <span className="text-xs font-bold uppercase tracking-wider text-center">2026</span>
                <span className="text-xs font-bold uppercase tracking-wider text-center">Change</span>
              </div>
              {COST_CHANGES_2026.map((row, i) => (
                <div key={i} className={`px-4 py-4 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} border-b border-slate-100 last:border-0`}>
                  <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-start mb-2">
                    <span className="font-semibold text-slate-800 text-sm">{row.item}</span>
                    <span className="text-sm text-slate-500 text-center">{row.value2025}</span>
                    <span className="text-sm font-bold text-slate-900 text-center">{row.value2026}</span>
                    <span className="text-xs font-semibold text-amber-700 text-center whitespace-nowrap">{row.change}</span>
                  </div>
                  <p className="text-xs text-slate-500 col-span-4 pl-0">{row.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Changed */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              What Changed for Medigap in 2026
            </h2>
            <div className="space-y-5">
              {WHAT_CHANGED.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 border border-slate-200 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Popular Plans 2026 */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Most Popular Medigap Plans in 2026
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {POPULAR_PLANS_2026.map((plan) => (
                <div key={plan.letter} className="p-6 border border-slate-200 rounded-xl hover:border-teal-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-slate-900">Plan {plan.letter}</span>
                    <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${plan.labelColor}`}>{plan.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{plan.premium}/mo</p>
                  <p className="text-sm text-slate-600 mb-4">{plan.summary}</p>
                  <Link href={`/medicare-supplements/${plan.slug}`} className="inline-flex items-center gap-1 text-teal-700 font-semibold text-sm hover:underline">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Trends */}
          <div className="mb-14 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
              <h2 className="text-xl font-bold text-blue-900">2026 Premium Trends</h2>
            </div>
            <p className="text-slate-700 mb-4 text-sm leading-relaxed">
              Medigap premiums are set by individual insurance companies and vary significantly by state, age, gender, and tobacco use. In 2026, premium increases ranged from modest (0–3%) to significant (6–8%+) depending on the carrier and plan letter.
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Plan G premiums increased 3–6% on average across most states",
                "Plan N saw smaller increases due to its cost-sharing structure",
                "HD-G premiums remained relatively stable, making it increasingly attractive",
                "Older Plan F enrollees saw some of the steepest increases as the risk pool ages",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-blue-100">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800">
                The same Plan G can vary by 50% or more between insurers in the same zip code. Comparing quotes annually is the most effective way to control your Medigap costs.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-3">Compare 2026 Medigap Rates</h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Our licensed Medicare agents compare 2026 rates from multiple carriers at no cost to you. Find the best plan for your needs and budget.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link href="/compare-rates" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
                Compare Rates Online <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
