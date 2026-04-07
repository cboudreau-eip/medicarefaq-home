/**
 * Medicare Part A (Hospital Insurance) Page
 * Design: Comprehensive guide covering hospital coverage, costs, eligibility,
 * and enrollment for Medicare Part A.
 */

import { useState } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  Building2,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Clock,
  Shield,
  Heart,
  FileText,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "What Is Part A?" },
  { id: "coverage", label: "What Part A Covers" },
  { id: "costs", label: "2026 Costs" },
  { id: "eligibility", label: "Who Qualifies" },
  { id: "enrollment", label: "When to Enroll" },
  { id: "not-covered", label: "What Part A Doesn't Cover" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const coverageItems = [
  { covered: true, item: "Inpatient hospital stays (semi-private room, meals, nursing care)" },
  { covered: true, item: "Skilled nursing facility (SNF) care after a qualifying hospital stay" },
  { covered: true, item: "Hospice care for terminal illness" },
  { covered: true, item: "Home health care (limited, medically necessary)" },
  { covered: true, item: "Inpatient mental health care" },
  { covered: true, item: "Blood transfusions (after first 3 pints)" },
  { covered: false, item: "Long-term custodial care (nursing home care)" },
  { covered: false, item: "Private-duty nursing" },
  { covered: false, item: "Private room (unless medically necessary)" },
  { covered: false, item: "Personal care items (TV, phone in hospital room)" },
  { covered: false, item: "Most dental, vision, and hearing care" },
];

const benefitPeriods = [
  { days: "Days 1–60", cost: "$0 (after $1,676 deductible)", label: "Full Coverage" },
  { days: "Days 61–90", cost: "$419/day coinsurance", label: "Coinsurance Applies" },
  { days: "Days 91–150", cost: "$838/day (lifetime reserve days)", label: "Reserve Days" },
  { days: "Beyond 150 days", cost: "You pay all costs", label: "No Coverage" },
];

const snfBenefits = [
  { days: "Days 1–20", cost: "$0", label: "Full Coverage" },
  { days: "Days 21–100", cost: "$209.50/day coinsurance", label: "Coinsurance Applies" },
  { days: "Beyond 100 days", cost: "You pay all costs", label: "No Coverage" },
];

const faqs = [
  {
    q: "Is Medicare Part A free?",
    a: "Most people get Part A premium-free if they or their spouse worked and paid Medicare taxes for at least 10 years (40 quarters). If you have fewer than 30 quarters of work history, you pay $285/month in 2026. With 30–39 quarters, you pay $522/month.",
  },
  {
    q: "What is a benefit period under Part A?",
    a: "A benefit period begins the day you're admitted as an inpatient and ends when you've been out of the hospital or SNF for 60 consecutive days. There's no limit to the number of benefit periods you can have, but you pay a new deductible for each one.",
  },
  {
    q: "Does Part A cover skilled nursing facility care?",
    a: "Yes, but only after a qualifying inpatient hospital stay of at least 3 days. Part A covers SNF care for up to 100 days per benefit period — the first 20 days at no cost, then $209.50/day for days 21–100 in 2026.",
  },
  {
    q: "What's the difference between inpatient and observation status?",
    a: "Inpatient status means you've been formally admitted to the hospital, which counts toward the 3-day qualifying stay for SNF coverage. Observation status means you're under outpatient care, even if you sleep in a hospital bed — and it does not count toward the SNF qualifying stay.",
  },
  {
    q: "Can I get Part A if I'm under 65?",
    a: "Yes. You automatically qualify for Part A if you've received Social Security disability benefits for 24 months, or if you have End-Stage Renal Disease (ESRD) or ALS (Lou Gehrig's disease) at any age.",
  },
  {
    q: "What are lifetime reserve days?",
    a: "Lifetime reserve days are 60 additional hospital days beyond the standard 90-day benefit period. You can use them only once in your lifetime. In 2026, you pay $838/day for each reserve day used.",
  },
];

export default function PartA() {
  useCMSSEO({ contentType: "page", slug: "part-a", title: "Medicare Part A (Hospital Insurance) 2026 | Coverage, Costs & Eligibility", description: "Understand Medicare Part A hospital insurance: what it covers, 2026 deductibles and coinsurance, eligibility requirements, and how to enroll." });

  const [activeSection, setActiveSection] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        <section className="bg-[#1B3A6B] text-white py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/original-medicare" className="hover:text-white">Original Medicare</Link>
              <span>/</span>
              <span className="text-white">Part A</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/30 rounded-xl p-3">
                <Building2 className="w-8 h-8 text-blue-200" />
              </div>
              <span className="text-blue-200 text-sm font-medium uppercase tracking-wide">Hospital Insurance</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Medicare Part A</h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-6">
              Hospital insurance that covers inpatient care, skilled nursing facilities, hospice, and some home health services. Most people get Part A at no premium cost.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-[#E8871E] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
                Get Free Guidance
              </a>
              <Link href="/medicare-supplements/compare" className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                Compare Supplement Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-blue-50 border-b border-blue-100 py-6 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "2026 Deductible", value: "$1,676", sub: "per benefit period" },
              { label: "Premium-Free If", value: "40 Quarters", sub: "of Medicare taxes paid" },
              { label: "SNF Coverage", value: "Up to 100 Days", sub: "after 3-day hospital stay" },
              { label: "Hospice Coverage", value: "Unlimited", sub: "with terminal diagnosis" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-[#1B3A6B]">{stat.value}</div>
                <div className="text-xs font-semibold text-gray-700 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-12 flex gap-10">
          {/* TOC */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">On This Page</p>
              <ul className="space-y-1">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-sm text-gray-600 hover:text-[#1B3A6B] block py-1 transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="flex-1 min-w-0 space-y-12">
            {/* Overview */}
            <section id="overview">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">What Is Medicare Part A?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Medicare Part A is the hospital insurance component of Original Medicare. It covers inpatient care in hospitals, skilled nursing facilities, and hospice programs, as well as some home health services. Part A is one of two parts of Original Medicare — the other being Part B, which covers outpatient medical services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most people who are 65 or older and have worked for at least 10 years (40 quarters) paying Medicare taxes receive Part A without paying a monthly premium. This is often called "premium-free Part A." If you don't meet the work history requirement, you can still enroll in Part A by paying a monthly premium.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Part A vs. Part B</p>
                    <p className="text-sm text-blue-800">Part A covers <strong>inpatient</strong> (hospital) services. Part B covers <strong>outpatient</strong> (doctor visits, lab tests, preventive care). Together, they form "Original Medicare." Most people need both.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Coverage */}
            <section id="coverage">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">What Medicare Part A Covers</h2>
              <div className="grid gap-3">
                {coverageItems.map((item, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-lg border ${item.covered ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                    {item.covered ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    )}
                    <span className={`text-sm ${item.covered ? "text-green-900" : "text-red-900"}`}>{item.item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Costs */}
            <section id="costs">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">2026 Medicare Part A Costs</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Hospital Inpatient Costs (Per Benefit Period)</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#1B3A6B] text-white">
                      <th className="text-left p-3 rounded-tl-lg">Hospital Days</th>
                      <th className="text-left p-3">Your Cost</th>
                      <th className="text-left p-3 rounded-tr-lg">Coverage Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benefitPeriods.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 font-medium text-gray-800 border-b border-gray-100">{row.days}</td>
                        <td className="p-3 text-gray-700 border-b border-gray-100">{row.cost}</td>
                        <td className="p-3 border-b border-gray-100">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            row.label === "Full Coverage" ? "bg-green-100 text-green-700" :
                            row.label === "No Coverage" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"
                          }`}>{row.label}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Skilled Nursing Facility (SNF) Costs</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#1B3A6B] text-white">
                      <th className="text-left p-3 rounded-tl-lg">SNF Days</th>
                      <th className="text-left p-3">Your Cost</th>
                      <th className="text-left p-3 rounded-tr-lg">Coverage Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snfBenefits.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 font-medium text-gray-800 border-b border-gray-100">{row.days}</td>
                        <td className="p-3 text-gray-700 border-b border-gray-100">{row.cost}</td>
                        <td className="p-3 border-b border-gray-100">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            row.label === "Full Coverage" ? "bg-green-100 text-green-700" :
                            row.label === "No Coverage" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"
                          }`}>{row.label}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-1">No Out-of-Pocket Maximum</p>
                    <p className="text-sm text-amber-800">Original Medicare Part A has no annual out-of-pocket cap. A long hospital stay or multiple benefit periods in one year can result in significant costs. A Medicare Supplement (Medigap) plan can cover these gaps.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Who Qualifies for Medicare Part A?</h2>
              <div className="space-y-4">
                {[
                  { icon: Clock, title: "Age 65 with Work History", desc: "You or your spouse worked and paid Medicare taxes for at least 10 years (40 quarters). You receive premium-free Part A." },
                  { icon: Heart, title: "Disability (Under 65)", desc: "You've received Social Security Disability Insurance (SSDI) benefits for 24 consecutive months. Enrollment is automatic." },
                  { icon: Shield, title: "ESRD or ALS", desc: "You have End-Stage Renal Disease (permanent kidney failure requiring dialysis or transplant) or ALS (Lou Gehrig's disease) at any age." },
                  { icon: DollarSign, title: "Premium Part A (No Work History)", desc: "If you don't meet the work history requirement, you can buy Part A. In 2026: $285/month (30–39 quarters) or $522/month (fewer than 30 quarters)." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="bg-[#1B3A6B]/10 rounded-lg p-2 shrink-0">
                      <item.icon className="w-5 h-5 text-[#1B3A6B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Enrollment */}
            <section id="enrollment">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">When to Enroll in Part A</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you're already receiving Social Security benefits when you turn 65, you're automatically enrolled in Part A (and Part B) — no action required. If you're not yet receiving Social Security, you need to actively sign up during your Initial Enrollment Period (IEP).
              </p>
              <div className="bg-[#1B3A6B] text-white rounded-xl p-6 mb-4">
                <h3 className="font-bold text-lg mb-3">Initial Enrollment Period (IEP)</h3>
                <p className="text-blue-100 text-sm mb-3">A 7-month window centered on your 65th birthday month:</p>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="font-bold">3 Months Before</div>
                    <div className="text-blue-200 text-xs">Your birthday month</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 border border-white/30">
                    <div className="font-bold">Birthday Month</div>
                    <div className="text-blue-200 text-xs">Best time to enroll</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="font-bold">3 Months After</div>
                    <div className="text-blue-200 text-xs">Coverage may be delayed</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Unlike Part B, there is generally no late enrollment penalty for Part A if you qualify for premium-free coverage. However, if you must pay a premium for Part A and delay enrollment, you may face a 10% penalty added to your premium for twice the number of years you delayed.
              </p>
            </section>

            {/* Not Covered */}
            <section id="not-covered">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">What Part A Doesn't Cover</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Medicare Part A has significant coverage gaps that can result in large out-of-pocket costs. Understanding these gaps is the first step toward choosing the right supplemental coverage.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Long-Term Custodial Care", desc: "Nursing home care for activities of daily living (bathing, dressing, eating) is not covered. Only skilled nursing care is covered, and only for up to 100 days." },
                  { title: "No Out-of-Pocket Cap", desc: "There's no limit on what you can spend in a year. Multiple benefit periods or a very long hospital stay can cost tens of thousands of dollars." },
                  { title: "Private Room Upgrade", desc: "Part A covers a semi-private room. If you want a private room, you pay the difference unless it's medically necessary." },
                  { title: "Custodial Home Care", desc: "Part A covers skilled home health care (physical therapy, wound care) but not custodial care (help with daily activities) at home." },
                ].map((item, i) => (
                  <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-5">
                    <p className="font-semibold text-red-900 mb-2">{item.title}</p>
                    <p className="text-sm text-red-800">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-teal-50 border border-teal-200 rounded-xl p-5">
                <p className="font-semibold text-teal-900 mb-2">How to Fill These Gaps</p>
                <p className="text-sm text-teal-800 mb-3">A Medicare Supplement (Medigap) plan can cover Part A deductibles, coinsurance, and hospital costs beyond the benefit period. Plans like Medigap Plan G cover nearly all Part A out-of-pocket costs.</p>
                <Link href="/medicare-supplements/plan-g" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-900">
                  Learn about Medigap Plan G <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Next Steps */}
            <section id="next-steps">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Next Steps</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "Learn About Part B", desc: "Understand outpatient medical coverage and the Part B premium.", href: "/original-medicare/medicare-parts/medicare-part-b", icon: FileText },
                  { title: "Add a Supplement Plan", desc: "Cover Part A deductibles and coinsurance with a Medigap plan.", href: "/medicare-supplements", icon: Shield },
                  { title: "Compare All Plans", desc: "See how Original Medicare compares to Medicare Advantage.", href: "/compare-rates", icon: ArrowRight },
                ].map((item, i) => (
                  <Link key={i} href={item.href} className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#1B3A6B]/30 transition-all group">
                    <div className="bg-[#1B3A6B]/10 rounded-lg p-2 w-fit mb-3 group-hover:bg-[#1B3A6B]/20 transition-colors">
                      <item.icon className="w-5 h-5 text-[#1B3A6B]" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>

        {/* CTA Banner */}
        <section className="bg-[#1B3A6B] text-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Questions About Your Part A Coverage?</h2>
            <p className="text-blue-100 mb-6">Our licensed Medicare agents can explain your benefits, help you understand your costs, and find the right supplement plan to cover Part A gaps — at no cost to you.</p>
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-[#E8871E] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
              <Phone className="w-5 h-5" />
              Call (888) 335-8996
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
