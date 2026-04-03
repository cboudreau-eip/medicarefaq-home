/**
 * What Does It Cost? Page
 * Design: Comprehensive cost breakdown with comparison tables,
 * premium calculators, and visual cost breakdowns for 2026.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Phone,
  ArrowRight,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Heart,
  Pill,
  Building2,
  Calculator,
  Info,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tableOfContents = [
  { id: "overview", label: "2026 Cost Overview" },
  { id: "part-a", label: "Part A Costs" },
  { id: "part-b", label: "Part B Costs" },
  { id: "part-d", label: "Part D Costs" },
  { id: "medigap", label: "Medigap Costs" },
  { id: "advantage", label: "Medicare Advantage Costs" },
  { id: "total-costs", label: "Total Monthly Costs" },
  { id: "irmaa", label: "IRMAA Surcharges" },
  { id: "savings", label: "Ways to Save" },
  { id: "faqs", label: "FAQs" },
];

const partACosts = [
  { item: "Part A Premium", amount: "$0", note: "For most people (40+ quarters of work)" },
  { item: "Part A Premium (no work history)", amount: "$518/mo", note: "If you don't qualify for premium-free Part A" },
  { item: "Hospital Deductible", amount: "$1,676", note: "Per benefit period (not per year)" },
  { item: "Days 1–60 Coinsurance", amount: "$0/day", note: "After meeting the deductible" },
  { item: "Days 61–90 Coinsurance", amount: "$419/day", note: "For each day of inpatient hospital stay" },
  { item: "Lifetime Reserve Days (91+)", amount: "$838/day", note: "60 lifetime reserve days total" },
  { item: "Skilled Nursing Facility (Days 21–100)", amount: "$209.50/day", note: "After first 20 days covered in full" },
];

const partBCosts = [
  { item: "Standard Monthly Premium", amount: "$185/mo", note: "Most beneficiaries pay this amount" },
  { item: "Annual Deductible", amount: "$257", note: "Must be met before Medicare pays" },
  { item: "Coinsurance", amount: "20%", note: "You pay 20% of Medicare-approved amount after deductible" },
  { item: "Outpatient Surgery", amount: "20%", note: "After deductible, in Medicare-approved facilities" },
  { item: "Doctor Visits", amount: "20%", note: "After deductible for office and specialist visits" },
  { item: "Durable Medical Equipment", amount: "20%", note: "Wheelchairs, walkers, hospital beds, etc." },
];

const partDCosts = [
  { item: "Average Monthly Premium", amount: "~$36.78/mo", note: "Varies by plan and location" },
  { item: "Annual Deductible", amount: "Up to $590", note: "Some plans have $0 deductible" },
  { item: "Initial Coverage Phase", amount: "25% coinsurance", note: "Until drug costs reach $5,030" },
  { item: "Coverage Gap (Donut Hole)", amount: "$0 for generics", note: "Eliminated for brand-name drugs in 2025; $2,000 OOP cap in 2026" },
  { item: "Out-of-Pocket Cap", amount: "$2,000", note: "New for 2025 — maximum you pay annually for Part D drugs" },
];

const irmaaBrackets = [
  { income: "$106,000 or less (single) / $212,000 or less (joint)", partB: "$185.00", partD: "$0.00" },
  { income: "$106,001–$133,000 / $212,001–$266,000", partB: "$259.00", partD: "$13.70" },
  { income: "$133,001–$167,000 / $266,001–$334,000", partB: "$370.00", partD: "$35.30" },
  { income: "$167,001–$200,000 / $334,001–$400,000", partB: "$480.90", partD: "$57.00" },
  { income: "$200,001–$500,000 / $400,001–$750,000", partB: "$591.90", partD: "$78.60" },
  { income: "Above $500,000 / Above $750,000", partB: "$628.90", partD: "$85.80" },
];

const totalCostScenarios = [
  {
    name: "Original Medicare + Medigap Plan G + Part D",
    monthly: "$350–$550/mo",
    annual: "$4,200–$6,600/yr",
    maxOOP: "Predictable — very low out-of-pocket after premiums",
    color: "bg-blue-600",
    items: [
      "Part B Premium: $185/mo",
      "Medigap Plan G: $100–$300/mo (varies by age/state)",
      "Part D Premium: ~$37/mo",
      "Part B Deductible: $257/yr (only out-of-pocket cost with Plan G)",
    ],
  },
  {
    name: "Medicare Advantage (Part C)",
    monthly: "$0–$150/mo",
    annual: "$0–$1,800/yr (premiums only)",
    maxOOP: "Up to $8,850 in-network MOOP in 2026",
    color: "bg-teal-600",
    items: [
      "Part B Premium: $185/mo (still required)",
      "Plan Premium: Many plans are $0/mo",
      "Copays per visit: $10–$50 depending on service",
      "Maximum Out-of-Pocket: Up to $8,850/yr in-network",
    ],
  },
  {
    name: "Original Medicare Only (No Supplement)",
    monthly: "$185/mo",
    annual: "$2,220/yr (premiums only)",
    maxOOP: "Unlimited — no cap on out-of-pocket costs",
    color: "bg-amber-600",
    items: [
      "Part B Premium: $185/mo",
      "20% coinsurance on all Part B services",
      "Hospital deductible: $1,676 per benefit period",
      "No maximum out-of-pocket limit",
    ],
  },
];

const faqs = [
  {
    question: "Is Medicare free?",
    answer: "Part A is premium-free for most people who worked and paid Medicare taxes for 10+ years (40 quarters). However, Part B has a monthly premium ($185 in 2026), and you'll also pay deductibles, coinsurance, and copays. Most people also add supplemental coverage (Medigap or Medicare Advantage) which may have additional premiums.",
  },
  {
    question: "What's the most I could pay out-of-pocket in a year?",
    answer: "With Original Medicare alone, there is NO maximum out-of-pocket limit — your costs are theoretically unlimited. With a Medigap Plan G, your only out-of-pocket cost is the $257 Part B deductible. With Medicare Advantage, the maximum out-of-pocket is capped at $8,850 in-network for 2026.",
  },
  {
    question: "Do I have to pay the Part B premium even with Medicare Advantage?",
    answer: "Yes. You must continue paying your Part B premium ($185/mo in 2026) regardless of whether you choose Original Medicare or Medicare Advantage. The Medicare Advantage plan premium is in addition to your Part B premium, though many MA plans have $0 additional premiums.",
  },
  {
    question: "What is IRMAA and will it affect me?",
    answer: "IRMAA (Income-Related Monthly Adjustment Amount) is a surcharge added to your Part B and Part D premiums if your modified adjusted gross income exceeds certain thresholds. It's based on your tax return from 2 years prior. In 2026, IRMAA kicks in for individuals earning above $106,000 or couples above $212,000.",
  },
  {
    question: "Can I get help paying for Medicare?",
    answer: "Yes. Programs like Medicare Savings Programs (MSPs), Extra Help/Low-Income Subsidy (LIS), and Medicaid can help cover premiums, deductibles, and copays. State Health Insurance Assistance Programs (SHIPs) can help you apply. Contact your local SHIP or call 1-800-MEDICARE for assistance.",
  },
  {
    question: "How much does a Medigap plan cost?",
    answer: "Medigap premiums vary significantly based on your age, location, gender, tobacco use, and the plan letter you choose. Plan G (the most popular) typically ranges from $100–$300/month. Plans are standardized by letter, so benefits are the same regardless of the insurance company — only the premium differs.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MedicareCosts() {
  useCMSSEO({
    contentType: "page",
    slug: "medicare-costs",
    title: "How Much Does Medicare Cost? 2026 Premiums & Out-of-Pocket | MedicareFAQ",
    description: "Learn what Medicare costs in 2026 — including Part A and Part B premiums, deductibles, and out-of-pocket expenses. Find out how to reduce your Medicare costs.",
    canonical: "https://www.medicarefaq.com/original-medicare/costs/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    ogType: "article",
  });
  const [activeSection, setActiveSection] = useState("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/medicare-101" className="hover:text-white transition-colors">New to Medicare</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-300">What Does It Cost?</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-300" />
            </div>
            <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">2026 Cost Guide</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            What Does Medicare Cost in 2026?
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            A complete breakdown of every Medicare premium, deductible, coinsurance, and out-of-pocket cost — plus how to minimize what you pay.
          </p>

          {/* Quick cost stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Part B Premium", value: "$185/mo" },
              { label: "Part B Deductible", value: "$257/yr" },
              { label: "Hospital Deductible", value: "$1,676" },
              { label: "Part D OOP Cap", value: "$2,000" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex gap-12">
          {/* Sticky TOC Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">In This Guide</p>
              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm py-1.5 pl-3 border-l-2 transition-colors ${
                      activeSection === item.id
                        ? "border-emerald-500 text-emerald-700 font-medium"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-sm font-semibold text-emerald-800 mb-2">Need Help?</p>
                <p className="text-xs text-emerald-700 mb-3">Our agents can help you find the most affordable coverage.</p>
                <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900">
                  <Phone className="w-4 h-4" /> (888) 335-8996
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {/* Overview */}
            <section id="overview" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">2026 Medicare Cost Overview</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Medicare isn't free — even with premium-free Part A, most beneficiaries pay <strong>several hundred dollars per month</strong> when you factor in Part B premiums, supplemental coverage, and prescription drug plans. Understanding these costs upfront helps you budget effectively and choose the right coverage.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-1">Important: Original Medicare Has No Out-of-Pocket Maximum</p>
                    <p className="text-sm text-amber-800">Unlike most private insurance, Original Medicare alone has <strong>no cap</strong> on how much you can spend out-of-pocket in a year. This is why most beneficiaries add a Medigap supplement or choose Medicare Advantage.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Part A Costs */}
            <section id="part-a" className="mb-16 scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Part A Costs (Hospital Insurance)</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                Part A covers inpatient hospital stays, skilled nursing facility care, hospice, and some home health care. Most people don't pay a premium for Part A, but there are significant deductibles and coinsurance.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-left p-4 font-semibold text-slate-700">Cost Item</th>
                      <th className="text-left p-4 font-semibold text-slate-700">2026 Amount</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partACosts.map((row) => (
                      <tr key={row.item} className="border-t border-slate-100">
                        <td className="p-4 font-medium text-slate-900">{row.item}</td>
                        <td className="p-4 text-slate-900 font-semibold">{row.amount}</td>
                        <td className="p-4 text-slate-500 text-xs">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Part B Costs */}
            <section id="part-b" className="mb-16 scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-teal-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Part B Costs (Medical Insurance)</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                Part B covers doctor visits, outpatient care, preventive services, durable medical equipment, and more. Everyone pays a monthly premium, and there's a 20% coinsurance with no annual cap.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="text-left p-4 font-semibold text-slate-700">Cost Item</th>
                      <th className="text-left p-4 font-semibold text-slate-700">2026 Amount</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partBCosts.map((row) => (
                      <tr key={row.item} className="border-t border-slate-100">
                        <td className="p-4 font-medium text-slate-900">{row.item}</td>
                        <td className="p-4 text-slate-900 font-semibold">{row.amount}</td>
                        <td className="p-4 text-slate-500 text-xs">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-teal-50 border border-teal-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-teal-800">
                    <strong>Key Takeaway:</strong> The 20% Part B coinsurance has no annual limit. A single hospital outpatient procedure could cost you thousands. This is the primary reason most people purchase a Medigap supplement or choose Medicare Advantage.
                  </p>
                </div>
              </div>
            </section>

            {/* Part D Costs */}
            <section id="part-d" className="mb-16 scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Part D Costs (Prescription Drugs)</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                Part D covers prescription medications. Plans are offered by private insurers and costs vary by plan. A major improvement starting in 2025: the annual out-of-pocket cap of $2,000.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="text-left p-4 font-semibold text-slate-700">Cost Item</th>
                      <th className="text-left p-4 font-semibold text-slate-700">2026 Amount</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partDCosts.map((row) => (
                      <tr key={row.item} className="border-t border-slate-100">
                        <td className="p-4 font-medium text-slate-900">{row.item}</td>
                        <td className="p-4 text-slate-900 font-semibold">{row.amount}</td>
                        <td className="p-4 text-slate-500 text-xs">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-800">
                    <strong>Good News:</strong> The Inflation Reduction Act introduced a $2,000 annual out-of-pocket cap for Part D prescription drugs starting in 2025. This eliminates the catastrophic coverage phase and protects you from unlimited drug costs.
                  </p>
                </div>
              </div>
            </section>

            {/* Medigap Costs */}
            <section id="medigap" className="mb-16 scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Medigap (Medicare Supplement) Costs</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                Medigap plans help cover the "gaps" in Original Medicare — deductibles, coinsurance, and copays. Plans are standardized by letter (A, B, C, D, F, G, K, L, M, N) so benefits are identical across insurers.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    plan: "Plan G",
                    label: "Most Popular",
                    premium: "$100–$300/mo",
                    covers: "Everything except Part B deductible ($257/yr)",
                    color: "border-indigo-300 bg-indigo-50",
                  },
                  {
                    plan: "Plan N",
                    label: "Budget-Friendly",
                    premium: "$75–$225/mo",
                    covers: "Most costs, but has small copays ($20 office / $50 ER)",
                    color: "border-slate-300 bg-slate-50",
                  },
                ].map((plan) => (
                  <div key={plan.plan} className={`${plan.color} border rounded-xl p-6`}>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{plan.plan}</h3>
                      <span className="text-xs font-semibold bg-white px-2 py-0.5 rounded-full text-slate-600">{plan.label}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 mb-2">{plan.premium}</p>
                    <p className="text-sm text-slate-600">{plan.covers}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-slate-500">
                Medigap premiums vary by age, location, gender, and tobacco use. Rates shown are typical ranges. The best time to enroll is during your 6-month Medigap Open Enrollment Period (starts when Part B begins).
              </p>
            </section>

            {/* Medicare Advantage Costs */}
            <section id="advantage" className="mb-16 scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Medicare Advantage (Part C) Costs</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                Medicare Advantage plans are offered by private insurers as an alternative to Original Medicare. Many have $0 premiums (beyond Part B) and include drug coverage and extra benefits, but use provider networks.
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Avg. Monthly Premium", value: "$0–$50" },
                    { label: "PCP Copay", value: "$0–$20" },
                    { label: "Specialist Copay", value: "$20–$50" },
                    { label: "Max OOP (In-Network)", value: "$8,850" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-xs text-orange-700 mb-1">{stat.label}</p>
                      <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    <strong>Remember:</strong> You still pay the Part B premium ($185/mo) even with a $0-premium Medicare Advantage plan. And while premiums are lower, you'll pay copays and coinsurance each time you use services, up to the plan's maximum out-of-pocket limit.
                  </p>
                </div>
              </div>
            </section>

            {/* Total Cost Scenarios */}
            <section id="total-costs" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Total Monthly Cost Scenarios</h2>
              <p className="text-lg text-slate-600 mb-8">
                Here's what you can expect to pay each month under the three most common Medicare coverage paths:
              </p>

              <div className="space-y-6">
                {totalCostScenarios.map((scenario) => (
                  <div key={scenario.name} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className={`${scenario.color} px-6 py-4 text-white`}>
                      <h3 className="text-lg font-bold">{scenario.name}</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Monthly Cost</p>
                          <p className="text-xl font-bold text-slate-900">{scenario.monthly}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Annual Cost</p>
                          <p className="text-xl font-bold text-slate-900">{scenario.annual}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Max Out-of-Pocket</p>
                          <p className="text-sm font-semibold text-slate-700">{scenario.maxOOP}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {scenario.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* IRMAA */}
            <section id="irmaa" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">IRMAA Surcharges (Higher-Income Beneficiaries)</h2>
              <p className="text-lg text-slate-600 mb-6">
                If your modified adjusted gross income (MAGI) exceeds certain thresholds, you'll pay higher Part B and Part D premiums. This is called IRMAA — the Income-Related Monthly Adjustment Amount. It's based on your tax return from <strong>2 years prior</strong>.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-4 font-semibold text-slate-700">Income (Single / Joint)</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Part B Premium</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Part D Surcharge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {irmaaBrackets.map((row, i) => (
                      <tr key={i} className={`border-t border-slate-100 ${i === 0 ? "bg-green-50/50" : ""}`}>
                        <td className="p-4 text-slate-900 text-xs">{row.income}</td>
                        <td className="p-4 font-semibold text-slate-900">{row.partB}</td>
                        <td className="p-4 font-semibold text-slate-900">{row.partD}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ways to Save */}
            <section id="savings" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Ways to Save on Medicare Costs</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Medicare Savings Programs (MSPs)",
                    description: "State programs that help pay Part A and/or Part B premiums, deductibles, and coinsurance for low-income beneficiaries.",
                    icon: DollarSign,
                  },
                  {
                    title: "Extra Help / Low-Income Subsidy",
                    description: "Federal program that helps pay Part D premiums, deductibles, and copays. Available to those with limited income and resources.",
                    icon: Heart,
                  },
                  {
                    title: "Compare Plans Annually",
                    description: "Plans change every year. Reviewing your options during the Annual Enrollment Period (Oct 15 – Dec 7) can save you hundreds.",
                    icon: Calculator,
                  },
                  {
                    title: "Use Preventive Services",
                    description: "Medicare covers many preventive services at no cost — annual wellness visits, screenings, and vaccinations. Using them can catch issues early and reduce long-term costs.",
                    icon: Shield,
                  },
                  {
                    title: "Choose Generic Medications",
                    description: "Ask your doctor about generic alternatives. They're typically much cheaper and work the same as brand-name drugs.",
                    icon: Pill,
                  },
                  {
                    title: "Appeal IRMAA if Income Changed",
                    description: "If your income dropped due to retirement, divorce, or other life events, you can request an IRMAA reconsideration using SSA Form SSA-44.",
                    icon: TrendingUp,
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="scroll-mt-24">
              <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-2xl p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Want a Personalized Cost Estimate?</h2>
                <p className="text-slate-300 mb-8 max-w-xl">
                  Our licensed agents can compare plans in your area and help you find the most affordable Medicare coverage for your specific situation — at no cost to you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Call (888) 335-8996
                  </a>
                  <Link href="/new-to-medicare/checklist" className="inline-flex items-center gap-2 border border-slate-500 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Getting Started Checklist <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
