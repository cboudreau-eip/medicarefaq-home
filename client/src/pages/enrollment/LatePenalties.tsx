/**
 * Late Penalties Page
 * Design: Educational layout covering Part A, Part B, and Part D late enrollment
 * penalties, how they're calculated, and how to avoid them.
 * Color accent: amber/orange (#D97706) matching the Enrollment section identity.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  AlertCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  DollarSign,
  Calendar,
  Clock,
  HelpCircle,
  Briefcase,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "Understanding Late Penalties" },
  { id: "part-b-penalty", label: "Part B Late Penalty" },
  { id: "part-d-penalty", label: "Part D Late Penalty" },
  { id: "part-a-penalty", label: "Part A Late Penalty" },
  { id: "irmaa", label: "IRMAA Surcharges" },
  { id: "how-to-avoid", label: "How to Avoid Penalties" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const faqs = [
  {
    q: "How long does the Part B late enrollment penalty last?",
    a: "The Part B late enrollment penalty is permanent. It's added to your monthly Part B premium for as long as you have Medicare. The penalty is 10% of the standard premium for each full 12-month period you were eligible for Part B but didn't enroll and didn't have creditable coverage.",
  },
  {
    q: "Can the Part D penalty be removed?",
    a: "No. Like the Part B penalty, the Part D late enrollment penalty is permanent. It's added to your monthly Part D premium for as long as you have a Part D plan. The only way to avoid it is to enroll in Part D when you're first eligible or maintain creditable drug coverage.",
  },
  {
    q: "Does employer coverage protect me from penalties?",
    a: "Yes, if your employer coverage is creditable. Creditable coverage is insurance that is at least as good as Medicare. If you have creditable employer coverage through your own or your spouse's employer (with 20+ employees), you can delay Medicare enrollment without penalty. Ask your HR department for a creditable coverage letter.",
  },
  {
    q: "What if I had COBRA coverage — does that count?",
    a: "No. COBRA is not considered creditable coverage for Medicare purposes. If you relied on COBRA instead of enrolling in Medicare when first eligible, you may face late enrollment penalties. Always enroll in Medicare during your IEP if your only coverage option is COBRA.",
  },
  {
    q: "I missed my IEP and don't have creditable coverage. What now?",
    a: "You'll need to wait until the General Enrollment Period (January 1 – March 31) to sign up for Part B. Your coverage won't start until July 1. You will face a Part B late enrollment penalty based on how long you delayed. Contact us to understand your options and minimize the impact.",
  },
  {
    q: "Can I appeal a late enrollment penalty?",
    a: "In some cases, yes. If you believe you were incorrectly assessed a penalty — for example, if you had creditable coverage that wasn't properly documented — you can request a reconsideration from Medicare. You'll need to provide proof of your prior coverage.",
  },
];

export default function LatePenalties() {
  useCMSSEO({
    contentType: "page",
    slug: "late-penalties",
    title: "Medicare Late Enrollment Penalties: What They Are & How to Avoid Them | MedicareFAQ",
    description: "Missing your Medicare enrollment window can result in permanent late penalties on Part A, Part B, and Part D. Learn how the penalties work and how to avoid them.",
    canonical: "https://www.medicarefaq.com/medicare-enrollment/late-enrollment-penalty/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    ogType: "article",
  });
  const [activeSection, setActiveSection] = useState("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-800 via-red-900 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-red-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-red-200/70">Enrollment</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-red-100">Late Penalties</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-300" />
            </div>
            <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">Penalty Prevention</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Late Enrollment Penalties
          </h1>
          <p className="text-lg text-red-100/90 max-w-2xl mb-8">
            Missing your enrollment window can result in permanent penalties added to your Medicare premiums. Learn how penalties are calculated and — most importantly — how to avoid them.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#how-to-avoid" className="inline-flex items-center gap-2 bg-white text-red-800 font-semibold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors">
              How to Avoid Penalties <ArrowRight className="w-4 h-4" />
            </a>
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="flex gap-12">
            {/* Sidebar TOC */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-4">In This Guide</p>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-red-50 text-red-700 font-semibold"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-sm font-semibold text-red-900 mb-1">Worried About Penalties?</p>
                  <p className="text-xs text-red-700 mb-3">We'll help you understand your situation</p>
                  <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-bold text-red-700">
                    <Phone className="w-4 h-4" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* Overview */}
              <section id="overview" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Understanding Medicare Late Enrollment Penalties
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare has specific enrollment windows, and missing them can have lasting financial consequences. If you don't sign up for Medicare when you're first eligible — and you don't have qualifying coverage that allows you to delay — you may face <strong>permanent late enrollment penalties</strong> that are added to your monthly premiums.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  There are three types of Medicare late enrollment penalties: <strong>Part A</strong> (rare), <strong>Part B</strong> (most common), and <strong>Part D</strong> (prescription drugs). Each is calculated differently, but all are permanent additions to your monthly premium.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-red-50 rounded-xl p-5 border border-red-100 text-center">
                    <DollarSign className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-700 mb-1">10%</div>
                    <p className="text-xs text-red-600 font-semibold">Part B penalty per 12-month period</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 text-center">
                    <DollarSign className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-amber-700 mb-1">1%</div>
                    <p className="text-xs text-amber-600 font-semibold">Part D penalty per month delayed</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-center">
                    <Clock className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-700 mb-1">Forever</div>
                    <p className="text-xs text-slate-600 font-semibold">Penalties are permanent</p>
                  </div>
                </div>
              </section>

              {/* Part B Penalty */}
              <section id="part-b-penalty" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Part B Late Enrollment Penalty
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The Part B late enrollment penalty is the most common and most impactful. It applies if you didn't enroll in Part B when first eligible and didn't have creditable employer coverage.
                </p>

                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-red-900 mb-3 text-lg">How It's Calculated</h3>
                  <div className="bg-white rounded-lg p-4 border border-red-100 mb-4">
                    <p className="text-sm text-slate-700 mb-2">
                      <strong>Formula:</strong> 10% × (number of full 12-month periods you delayed) × standard Part B premium
                    </p>
                    <p className="text-sm text-slate-700">
                      <strong>2026 Standard Premium:</strong> $185.00/month
                    </p>
                  </div>

                  <h4 className="font-semibold text-red-900 mb-3">Example Scenarios:</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-red-100">
                      <p className="text-sm font-semibold text-slate-900">Delayed 2 years (24 months)</p>
                      <p className="text-sm text-slate-600">Penalty: 20% of $185 = <strong className="text-red-700">$37.00/month extra — permanently</strong></p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-100">
                      <p className="text-sm font-semibold text-slate-900">Delayed 5 years (60 months)</p>
                      <p className="text-sm text-slate-600">Penalty: 50% of $185 = <strong className="text-red-700">$92.50/month extra — permanently</strong></p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-100">
                      <p className="text-sm font-semibold text-slate-900">Delayed 10 years (120 months)</p>
                      <p className="text-sm text-slate-600">Penalty: 100% of $185 = <strong className="text-red-700">$185.00/month extra — permanently</strong></p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">The Penalty Grows Over Time</p>
                      <p className="text-sm text-amber-800">
                        Because the penalty is a percentage of the standard premium, it increases as the standard premium increases each year. A 20% penalty on today's premium will cost even more in future years as premiums rise.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Part D Penalty */}
              <section id="part-d-penalty" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Part D Late Enrollment Penalty
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The Part D penalty applies if you went <strong>63 or more consecutive days</strong> without Part D or other creditable prescription drug coverage after your Initial Enrollment Period ended.
                </p>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-amber-900 mb-3 text-lg">How It's Calculated</h3>
                  <div className="bg-white rounded-lg p-4 border border-amber-100 mb-4">
                    <p className="text-sm text-slate-700 mb-2">
                      <strong>Formula:</strong> 1% × national base beneficiary premium × number of months without coverage
                    </p>
                    <p className="text-sm text-slate-700">
                      <strong>2026 National Base Premium:</strong> ~$34.70/month
                    </p>
                  </div>

                  <h4 className="font-semibold text-amber-900 mb-3">Example Scenarios:</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-amber-100">
                      <p className="text-sm font-semibold text-slate-900">Delayed 12 months</p>
                      <p className="text-sm text-slate-600">Penalty: 12% of $34.70 = <strong className="text-amber-700">~$4.16/month extra — permanently</strong></p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-amber-100">
                      <p className="text-sm font-semibold text-slate-900">Delayed 36 months (3 years)</p>
                      <p className="text-sm text-slate-600">Penalty: 36% of $34.70 = <strong className="text-amber-700">~$12.49/month extra — permanently</strong></p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Penalty Is Recalculated Annually</p>
                      <p className="text-sm text-blue-800">
                        The Part D penalty is recalculated each year based on the current national base beneficiary premium. As the base premium changes, your penalty amount adjusts accordingly — but the percentage stays the same.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Part A Penalty */}
              <section id="part-a-penalty" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Part A Late Enrollment Penalty (Rare)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Most people get Part A premium-free because they or their spouse paid Medicare taxes for 40+ quarters (10 years). The Part A penalty only applies to those who must <strong>pay a premium for Part A</strong> and delayed enrollment.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Part A Penalty Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Penalty Rate: 10% surcharge</p>
                        <p className="text-xs text-slate-500">Added to the Part A premium for twice the number of years you delayed enrollment</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Duration: Not permanent</p>
                        <p className="text-xs text-slate-500">Unlike Parts B and D, the Part A penalty is temporary — lasting twice the number of years you delayed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">2026 Part A Premium: Up to $518/month</p>
                        <p className="text-xs text-slate-500">Only applies to those who didn't work 40+ quarters paying Medicare taxes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* IRMAA */}
              <section id="irmaa" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  IRMAA: Income-Related Surcharges
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  While not technically a "penalty," the <strong>Income-Related Monthly Adjustment Amount (IRMAA)</strong> is an additional charge added to your Part B and Part D premiums if your income exceeds certain thresholds. It's based on your tax return from two years prior.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-800 text-white">
                        <th className="text-left p-4 font-semibold text-sm rounded-tl-lg">Income (Individual)</th>
                        <th className="text-left p-4 font-semibold text-sm">Income (Married)</th>
                        <th className="text-left p-4 font-semibold text-sm rounded-tr-lg">Part B Monthly Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { single: "$106,000 or less", married: "$212,000 or less", premium: "$185.00 (standard)" },
                        { single: "$106,001 – $133,500", married: "$212,001 – $267,000", premium: "$259.00" },
                        { single: "$133,501 – $167,000", married: "$267,001 – $334,000", premium: "$370.00" },
                        { single: "$167,001 – $200,000", married: "$334,001 – $400,000", premium: "$480.90" },
                        { single: "$200,001 – $500,000", married: "$400,001 – $750,000", premium: "$591.90" },
                        { single: "$500,001+", married: "$750,001+", premium: "$628.90" },
                      ].map((row, i) => (
                        <tr key={i} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/50" : ""}`}>
                          <td className="p-4 text-sm text-slate-700">{row.single}</td>
                          <td className="p-4 text-sm text-slate-700">{row.married}</td>
                          <td className="p-4 text-sm font-semibold text-slate-900">{row.premium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">IRMAA Is Based on Your Tax Return From 2 Years Ago</p>
                      <p className="text-sm text-blue-800">
                        Your 2026 IRMAA is based on your 2024 tax return. If your income has decreased significantly (due to retirement, for example), you can request a reconsideration by filing Form SSA-44 with Social Security.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Avoid */}
              <section id="how-to-avoid" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How to Avoid Late Enrollment Penalties
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The good news: penalties are entirely avoidable if you understand the rules and act within your enrollment windows.
                </p>

                <div className="space-y-4">
                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-1">Enroll During Your Initial Enrollment Period</h3>
                        <p className="text-sm text-green-800">Sign up for Parts A, B, and D during your 7-month IEP around your 65th birthday. This is the simplest way to avoid all penalties.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-1">Maintain Creditable Coverage If Delaying</h3>
                        <p className="text-sm text-green-800">If you're working past 65 with employer coverage (20+ employees), keep that coverage active. Get a creditable coverage letter from your employer as proof.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-1">Use Your Special Enrollment Period</h3>
                        <p className="text-sm text-green-800">When your employer coverage ends, enroll in Medicare within your 8-month SEP. Don't wait — the clock starts when your employment or coverage ends.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-1">Don't Rely on COBRA</h3>
                        <p className="text-sm text-green-800">COBRA is not creditable coverage. If you're 65+ and your employment has ended, enroll in Medicare — don't use COBRA as a substitute.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-1">Get Professional Help</h3>
                        <p className="text-sm text-green-800">A licensed Medicare agent can review your situation, confirm your enrollment deadlines, and ensure you don't miss any critical windows.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section id="faqs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
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
                        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Next Steps CTA */}
              <section id="next-steps" className="mb-8">
                <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Don't Risk Permanent Penalties
                  </h2>
                  <p className="text-red-100 mb-6 max-w-xl">
                    Our licensed Medicare agents can review your enrollment timeline, confirm whether you have creditable coverage, and help you enroll before any penalty windows close — all at no cost to you.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-red-700 font-semibold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors">
                      <Phone className="w-4 h-4" /> Call (888) 335-8996
                    </a>
                    <Link href="/enrollment/turning-65" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                      Enrollment Guide <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* Related Pages */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/enrollment/turning-65" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/50 transition-colors">
                  <Calendar className="w-5 h-5 text-red-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-red-700 text-sm mb-1">Turning 65 Enrollment</h3>
                  <p className="text-xs text-slate-500">Your Initial Enrollment Period</p>
                </Link>
                <Link href="/enrollment/working-past-65" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/50 transition-colors">
                  <Briefcase className="w-5 h-5 text-red-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-red-700 text-sm mb-1">Working Past 65</h3>
                  <p className="text-xs text-slate-500">Employer coverage coordination</p>
                </Link>
                <Link href="/enrollment/how-to-enroll" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/50 transition-colors">
                  <Shield className="w-5 h-5 text-red-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-red-700 text-sm mb-1">How to Enroll</h3>
                  <p className="text-xs text-slate-500">Step-by-step enrollment guide</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
