/**
 * Medicare Part B (Medical Insurance) Page
 * Design: Comprehensive guide covering outpatient coverage, 2026 premiums,
 * eligibility, enrollment, and IRMAA surcharges.
 */

import { useState } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  Stethoscope,
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
  TrendingUp,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "What Is Part B?" },
  { id: "coverage", label: "What Part B Covers" },
  { id: "costs", label: "2026 Premiums & Costs" },
  { id: "irmaa", label: "IRMAA Income Surcharges" },
  { id: "eligibility", label: "Who Qualifies" },
  { id: "enrollment", label: "When to Enroll" },
  { id: "penalty", label: "Late Enrollment Penalty" },
  { id: "faqs", label: "Frequently Asked Questions" },
];

const coverageItems = [
  { covered: true, item: "Doctor visits (primary care and specialists)" },
  { covered: true, item: "Outpatient hospital services and surgery" },
  { covered: true, item: "Preventive care (annual wellness visit, screenings, vaccines)" },
  { covered: true, item: "Durable medical equipment (wheelchairs, walkers, CPAP machines)" },
  { covered: true, item: "Lab tests, X-rays, and diagnostic imaging" },
  { covered: true, item: "Mental health services (outpatient)" },
  { covered: true, item: "Ambulance services (when medically necessary)" },
  { covered: true, item: "Physical, occupational, and speech therapy (outpatient)" },
  { covered: true, item: "Diabetes supplies and self-management training" },
  { covered: false, item: "Prescription drugs (covered by Part D)" },
  { covered: false, item: "Routine dental, vision, and hearing care" },
  { covered: false, item: "Cosmetic surgery" },
  { covered: false, item: "Acupuncture (except for chronic low back pain)" },
  { covered: false, item: "Long-term custodial care" },
];

const irmaaBrackets = [
  { income: "$106,000 or less", mfj: "$212,000 or less", premium: "$185.00", surcharge: "$0" },
  { income: "$106,001 – $133,000", mfj: "$212,001 – $266,000", premium: "$259.00", surcharge: "$74.00" },
  { income: "$133,001 – $167,000", mfj: "$266,001 – $334,000", premium: "$370.00", surcharge: "$185.00" },
  { income: "$167,001 – $200,000", mfj: "$334,001 – $400,000", premium: "$480.90", surcharge: "$295.90" },
  { income: "$200,001 – $500,000", mfj: "$400,001 – $750,000", premium: "$591.90", surcharge: "$406.90" },
  { income: "Above $500,000", mfj: "Above $750,000", premium: "$628.90", surcharge: "$443.90" },
];

const faqs = [
  {
    q: "What is the Medicare Part B premium in 2026?",
    a: "The standard Medicare Part B premium in 2026 is $185.00 per month. Higher-income beneficiaries pay more through IRMAA surcharges, which are based on income reported two years prior (2024 income for 2026 premiums).",
  },
  {
    q: "What is the Part B deductible in 2026?",
    a: "The Medicare Part B deductible in 2026 is $257. After you meet the deductible, Medicare typically pays 80% of approved costs and you pay the remaining 20% coinsurance — with no out-of-pocket cap.",
  },
  {
    q: "Can I delay Part B enrollment if I have employer coverage?",
    a: "Yes. If you or your spouse is actively working and covered by an employer group health plan based on that current employment, you can delay Part B without penalty. You'll have a Special Enrollment Period (SEP) to sign up when that coverage ends.",
  },
  {
    q: "What happens if I miss my Part B enrollment window?",
    a: "If you don't enroll during your Initial Enrollment Period and don't qualify for a Special Enrollment Period, you'll face a late enrollment penalty. Your Part B premium increases 10% for each full 12-month period you were eligible but didn't enroll — and this penalty is permanent.",
  },
  {
    q: "Does Part B cover preventive care at no cost?",
    a: "Yes. Medicare Part B covers many preventive services at no cost to you — including the annual wellness visit, flu shots, mammograms, colonoscopies, and various cancer screenings — when you see a Medicare-participating provider.",
  },
  {
    q: "What is the Part B 20% coinsurance?",
    a: "After you meet the $257 deductible, Medicare Part B pays 80% of approved charges for covered services. You're responsible for the remaining 20%. There is no out-of-pocket maximum, so a serious illness can result in significant costs. A Medigap plan can cover this 20% coinsurance.",
  },
];

export default function PartB() {
  useCMSSEO({ contentType: "page", slug: "part-b", title: "Medicare Part B (Medical Insurance) 2026 | Premiums, Coverage & Enrollment", description: "Complete guide to Medicare Part B: 2026 premium of $185/month, what it covers, IRMAA surcharges, enrollment periods, and the late enrollment penalty." });

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
              <span className="text-white">Part B</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/30 rounded-xl p-3">
                <Stethoscope className="w-8 h-8 text-blue-200" />
              </div>
              <span className="text-blue-200 text-sm font-medium uppercase tracking-wide">Medical Insurance</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Medicare Part B</h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-6">
              Outpatient medical insurance covering doctor visits, preventive care, lab tests, and durable medical equipment. The standard 2026 premium is $185/month.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-[#E8871E] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
                Get Free Guidance
              </a>
              <Link href="/medicare-supplements/compare" className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                Cover the 20% Gap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-blue-50 border-b border-blue-100 py-6 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "2026 Monthly Premium", value: "$185.00", sub: "standard amount" },
              { label: "2026 Deductible", value: "$257", sub: "annual" },
              { label: "Your Coinsurance", value: "20%", sub: "after deductible" },
              { label: "Late Penalty", value: "10%/year", sub: "permanent surcharge" },
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
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">What Is Medicare Part B?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Medicare Part B is the medical insurance component of Original Medicare. While Part A covers inpatient hospital care, Part B covers outpatient services — everything from routine doctor visits and lab tests to preventive screenings and durable medical equipment. Part B is optional, but most people enroll because the late enrollment penalty is permanent and the coverage is essential.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike Part A, Part B always has a monthly premium. The standard premium in 2026 is $185.00/month, though higher-income beneficiaries pay more through IRMAA (Income-Related Monthly Adjustment Amount) surcharges.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">The 20% Gap</p>
                    <p className="text-sm text-blue-800">After meeting the $257 deductible, Medicare pays 80% of approved costs. You pay the remaining 20% with no annual cap. A Medigap supplement plan can cover this 20% coinsurance entirely.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Coverage */}
            <section id="coverage">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">What Medicare Part B Covers</h2>
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
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">2026 Medicare Part B Costs</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Monthly Premium", value: "$185.00", note: "Standard amount; higher for high earners" },
                  { label: "Annual Deductible", value: "$257", note: "You pay 100% of costs until this is met" },
                  { label: "Coinsurance", value: "20%", note: "Your share after the deductible; no cap" },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-[#1B3A6B] mb-1">{item.value}</div>
                    <div className="font-semibold text-gray-800 text-sm mb-1">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.note}</div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-1">No Out-of-Pocket Maximum</p>
                    <p className="text-sm text-amber-800">The 20% coinsurance has no annual cap. If you have a serious illness requiring frequent specialist visits or expensive procedures, your costs can be substantial. Medigap Plan G or Plan N can significantly limit your exposure.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* IRMAA */}
            <section id="irmaa">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">IRMAA: Income-Related Premium Surcharges</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If your modified adjusted gross income (MAGI) exceeds certain thresholds, you pay a higher Part B premium. These surcharges are called IRMAA (Income-Related Monthly Adjustment Amount). Medicare uses your income from two years prior — so 2026 premiums are based on your 2024 tax return.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#1B3A6B] text-white">
                      <th className="text-left p-3 rounded-tl-lg">Individual Income (2024)</th>
                      <th className="text-left p-3">Married Filing Jointly</th>
                      <th className="text-left p-3">Monthly Premium</th>
                      <th className="text-left p-3 rounded-tr-lg">IRMAA Surcharge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {irmaaBrackets.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 text-gray-800 border-b border-gray-100">{row.income}</td>
                        <td className="p-3 text-gray-700 border-b border-gray-100">{row.mfj}</td>
                        <td className="p-3 font-semibold text-[#1B3A6B] border-b border-gray-100">{row.premium}</td>
                        <td className="p-3 border-b border-gray-100">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${row.surcharge === "$0" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                            {row.surcharge}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">IRMAA also applies to Part D premiums. You can appeal an IRMAA determination if your income has decreased due to a life-changing event (retirement, divorce, death of spouse).</p>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Who Qualifies for Medicare Part B?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You're eligible for Part B if you're eligible for Part A. This includes U.S. citizens and permanent residents who are age 65 or older, or under 65 with a qualifying disability, ESRD, or ALS. Unlike Part A, Part B always has a premium — there's no premium-free version.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="font-semibold text-blue-900 mb-2">Part B Is Optional — But Declining Has Consequences</p>
                <p className="text-sm text-blue-800">You can decline Part B when you first become eligible, but if you don't have other creditable coverage (like employer insurance), you'll face a permanent late enrollment penalty when you eventually enroll.</p>
              </div>
            </section>

            {/* Enrollment */}
            <section id="enrollment">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">When to Enroll in Part B</h2>
              <div className="space-y-4">
                {[
                  { title: "Initial Enrollment Period (IEP)", desc: "A 7-month window: 3 months before your 65th birthday month, your birthday month, and 3 months after. Enroll early to avoid a gap in coverage." },
                  { title: "Special Enrollment Period (SEP)", desc: "If you have employer coverage through active employment, you can delay Part B and enroll during an 8-month SEP after that coverage ends or employment ends — whichever comes first." },
                  { title: "General Enrollment Period (GEP)", desc: "If you miss your IEP and don't qualify for a SEP, you can enroll January 1 – March 31 each year. Coverage starts July 1. A late enrollment penalty applies." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="bg-[#1B3A6B] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Penalty */}
            <section id="penalty">
              <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Late Enrollment Penalty</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-red-900 text-lg mb-2">10% Per Year — Permanently</p>
                    <p className="text-sm text-red-800 mb-3">
                      For every 12-month period you were eligible for Part B but didn't enroll (without creditable coverage), your premium increases by 10%. This penalty is added to your monthly premium for as long as you have Part B.
                    </p>
                    <p className="text-sm text-red-800">
                      <strong>Example:</strong> If you delayed Part B for 2 years without creditable coverage, your premium would be $185 × 1.20 = $222/month in 2026 — and this higher rate stays with you permanently.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                The penalty does not apply if you had creditable coverage (like employer group health insurance based on active employment) during the delay period.
              </p>
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
          </article>
        </div>

        {/* CTA Banner */}
        <section className="bg-[#1B3A6B] text-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Questions About Your Part B Coverage?</h2>
            <p className="text-blue-100 mb-6">Our licensed Medicare agents can explain your benefits, help you understand IRMAA, and find the right Medigap plan to cover the 20% coinsurance — at no cost to you.</p>
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
