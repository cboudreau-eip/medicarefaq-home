/**
 * Annual Changes Page
 * Design: Educational layout covering what changes each year in Medicare,
 * enrollment periods for making changes, and 2026 cost updates.
 * Color accent: amber/orange (#D97706) matching the Enrollment section identity.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  ArrowRightLeft,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign,
  FileText,
  Shield,
  Clock,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "What Changes Each Year?" },
  { id: "2026-costs", label: "2026 Cost Updates" },
  { id: "aep", label: "Annual Enrollment Period" },
  { id: "ma-oep", label: "MA Open Enrollment Period" },
  { id: "anoc", label: "Annual Notice of Change" },
  { id: "what-you-can-change", label: "What You Can Change" },
  { id: "should-you-change", label: "Should You Make Changes?" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const faqs = [
  {
    q: "Do I have to do anything during the Annual Enrollment Period?",
    a: "No. If you're happy with your current coverage, you don't need to take any action — your plan will automatically renew. However, it's always a good idea to review your Annual Notice of Change (ANOC) to see if your plan's costs, benefits, or formulary have changed for the upcoming year.",
  },
  {
    q: "Can I switch from Medicare Advantage to Original Medicare during AEP?",
    a: "Yes. During the Annual Enrollment Period (October 15 – December 7), you can disenroll from your Medicare Advantage plan and return to Original Medicare. If you do, you can also enroll in a standalone Part D plan and a Medigap plan. However, Medigap plans may require medical underwriting outside of your initial Medigap Open Enrollment Period.",
  },
  {
    q: "What's the difference between AEP and the MA Open Enrollment Period?",
    a: "The Annual Enrollment Period (AEP) runs October 15 – December 7 and is open to all Medicare beneficiaries. The Medicare Advantage Open Enrollment Period (MA OEP) runs January 1 – March 31 and is only for people already enrolled in a Medicare Advantage plan. During the MA OEP, you can switch MA plans or return to Original Medicare.",
  },
  {
    q: "When do changes made during AEP take effect?",
    a: "Any changes you make during the Annual Enrollment Period (October 15 – December 7) take effect on January 1 of the following year. For example, changes made during AEP 2025 take effect January 1, 2026.",
  },
  {
    q: "Can I change my Medigap plan during AEP?",
    a: "No. The Annual Enrollment Period only applies to Medicare Advantage and Part D plans. Medigap (Medicare Supplement) plans can be changed at any time during the year, but you may be subject to medical underwriting outside of your initial Medigap Open Enrollment Period. Some states have additional protections.",
  },
  {
    q: "What is the Annual Notice of Change (ANOC)?",
    a: "The ANOC is a document your Medicare Advantage or Part D plan must send you by September 30 each year. It outlines any changes to your plan for the upcoming year, including changes to premiums, copays, covered drugs, provider networks, and benefits. Review it carefully to decide if you need to make changes during AEP.",
  },
];

export default function AnnualChanges() {
  useCMSSEO({
    contentType: "page",
    slug: "annual-changes",
    title: "Medicare Annual Enrollment Period | AEP Dates & Changes | MedicareFAQ",
    description: "The Medicare Annual Enrollment Period runs October 15 – December 7 each year. Learn what changes you can make and how to review your coverage for the coming year.",
    canonical: "https://www.medicarefaq.com/medicare-enrollment/annual-enrollment-period/",
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
      <section className="relative bg-gradient-to-br from-amber-700 via-orange-800 to-amber-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-red-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-amber-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-amber-200/70">Enrollment</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-amber-100">Annual Changes</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6 text-amber-200" />
            </div>
            <span className="text-sm font-semibold text-amber-200 uppercase tracking-wider">Yearly Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Annual Changes: What Updates Each Year
          </h1>
          <p className="text-lg text-amber-100/90 max-w-2xl mb-8">
            Medicare costs, plan benefits, and coverage rules change every year. Learn what's new for 2026 and how to review and adjust your coverage during the annual enrollment windows.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#2026-costs" className="inline-flex items-center gap-2 bg-white text-amber-800 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors">
              See 2026 Changes <ArrowRight className="w-4 h-4" />
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
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">In This Guide</p>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-amber-50 text-amber-700 font-semibold"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-sm font-semibold text-amber-900 mb-1">Review Your Plan</p>
                  <p className="text-xs text-amber-700 mb-3">We'll help you compare options for 2026</p>
                  <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-bold text-amber-700">
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
                  What Changes Each Year in Medicare?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare isn't static. Every year, the Centers for Medicare & Medicaid Services (CMS) adjusts costs, updates coverage rules, and allows insurance companies to modify their plan offerings. These changes can affect your premiums, deductibles, copays, drug formularies, and provider networks.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  That's why it's important to review your coverage annually — even if you're satisfied with your current plan. A plan that worked well this year may have significant changes next year.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: DollarSign, title: "Premiums & Deductibles", desc: "Part A, Part B, Part D, and plan-specific costs are updated annually by CMS" },
                    { icon: FileText, title: "Drug Formularies", desc: "Part D and MA-PD plans can change which drugs are covered and at what tier" },
                    { icon: Shield, title: "Plan Benefits", desc: "Medicare Advantage plans may add, remove, or modify supplemental benefits" },
                    { icon: TrendingUp, title: "Provider Networks", desc: "MA plan networks can change — your doctor may no longer be in-network" },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <item.icon className="w-5 h-5 text-amber-600 mb-2" />
                      <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2026 Costs */}
              <section id="2026-costs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  2026 Medicare Cost Updates
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Here are the key Medicare cost changes for 2026, as announced by CMS:
                </p>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-800 text-white">
                        <th className="text-left p-4 font-semibold text-sm rounded-tl-lg">Cost Item</th>
                        <th className="text-left p-4 font-semibold text-sm">2025</th>
                        <th className="text-left p-4 font-semibold text-sm">2026</th>
                        <th className="text-left p-4 font-semibold text-sm rounded-tr-lg">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { item: "Part B Monthly Premium", y2025: "$185.00", y2026: "$185.00", change: "No change", color: "text-green-700" },
                        { item: "Part B Annual Deductible", y2025: "$257", y2026: "$257", change: "No change", color: "text-green-700" },
                        { item: "Part A Hospital Deductible", y2025: "$1,676", y2026: "$1,676", change: "No change", color: "text-green-700" },
                        { item: "Part A Coinsurance (Days 61–90)", y2025: "$419/day", y2026: "$419/day", change: "No change", color: "text-green-700" },
                        { item: "Part D Out-of-Pocket Cap", y2025: "$2,000", y2026: "$2,000", change: "New cap", color: "text-blue-700" },
                        { item: "Part A Premium (if applicable)", y2025: "$518/mo", y2026: "$518/mo", change: "No change", color: "text-green-700" },
                      ].map((row, i) => (
                        <tr key={i} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/50" : ""}`}>
                          <td className="p-4 text-sm font-semibold text-slate-700">{row.item}</td>
                          <td className="p-4 text-sm text-slate-600">{row.y2025}</td>
                          <td className="p-4 text-sm font-semibold text-slate-900">{row.y2026}</td>
                          <td className={`p-4 text-sm font-semibold ${row.color}`}>{row.change}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">New for 2026: Part D Out-of-Pocket Cap</p>
                      <p className="text-sm text-blue-800">
                        Starting in 2025, the Inflation Reduction Act introduced a <strong>$2,000 annual out-of-pocket cap</strong> for Part D prescription drug costs. This continues in 2026 and eliminates the catastrophic coverage phase where beneficiaries previously had to pay 5% of drug costs indefinitely.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* AEP */}
              <section id="aep" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Annual Enrollment Period (AEP)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The <strong>Annual Enrollment Period (AEP)</strong> is the main window each year when all Medicare beneficiaries can make changes to their coverage. It runs from <strong>October 15 through December 7</strong>, with changes taking effect January 1.
                </p>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-amber-600" />
                    <h3 className="font-bold text-amber-900 text-lg">October 15 – December 7</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Switch from Original Medicare to Medicare Advantage",
                      "Switch from Medicare Advantage to Original Medicare",
                      "Switch between Medicare Advantage plans",
                      "Join, switch, or drop a Part D drug plan",
                      "Changes take effect January 1",
                      "No health questions or medical underwriting",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-amber-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* MA OEP */}
              <section id="ma-oep" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Advantage Open Enrollment Period (MA OEP)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The <strong>MA OEP</strong> runs from <strong>January 1 through March 31</strong> each year. This is a secondary enrollment window available <strong>only to people already enrolled in a Medicare Advantage plan</strong>.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                  <h3 className="font-semibold text-slate-900 mb-4">During the MA OEP, You Can:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Switch to a different Medicare Advantage plan</p>
                        <p className="text-xs text-slate-500">Including plans with or without drug coverage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Drop your MA plan and return to Original Medicare</p>
                        <p className="text-xs text-slate-500">You can also enroll in a standalone Part D plan</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Important Limitation</p>
                      <p className="text-sm text-amber-800">
                        The MA OEP is only for people already on Medicare Advantage. If you're on Original Medicare, you <strong>cannot</strong> use this period to enroll in a Medicare Advantage plan. You would need to wait until the next AEP (October 15 – December 7).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ANOC */}
              <section id="anoc" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Your Annual Notice of Change (ANOC)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  If you're enrolled in a Medicare Advantage or Part D plan, your insurance company is required to send you an <strong>Annual Notice of Change (ANOC)</strong> by <strong>September 30</strong> each year. This document outlines all changes to your plan for the upcoming year.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                  <h3 className="font-semibold text-slate-900 mb-4">What to Look for in Your ANOC:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { label: "Premium changes", desc: "Monthly cost increases or decreases" },
                      { label: "Deductible changes", desc: "New annual deductible amounts" },
                      { label: "Copay/coinsurance changes", desc: "Updated cost-sharing for services" },
                      { label: "Formulary changes", desc: "Drugs added, removed, or moved to different tiers" },
                      { label: "Network changes", desc: "Providers or facilities added or removed" },
                      { label: "Benefit changes", desc: "New or discontinued supplemental benefits" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-slate-100">
                        <FileText className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* What You Can Change */}
              <section id="what-you-can-change" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What You Can (and Can't) Change
                </h2>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-800 text-white">
                        <th className="text-left p-4 font-semibold text-sm rounded-tl-lg">Action</th>
                        <th className="text-center p-4 font-semibold text-sm">AEP (Oct–Dec)</th>
                        <th className="text-center p-4 font-semibold text-sm">MA OEP (Jan–Mar)</th>
                        <th className="text-center p-4 font-semibold text-sm rounded-tr-lg">Any Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { action: "Switch MA plans", aep: true, maoep: true, anytime: false },
                        { action: "Join Medicare Advantage", aep: true, maoep: false, anytime: false },
                        { action: "Drop MA → Original Medicare", aep: true, maoep: true, anytime: false },
                        { action: "Switch Part D plans", aep: true, maoep: false, anytime: false },
                        { action: "Join a Part D plan", aep: true, maoep: false, anytime: false },
                        { action: "Switch Medigap plans", aep: false, maoep: false, anytime: true },
                        { action: "Change Original Medicare", aep: false, maoep: false, anytime: false },
                      ].map((row, i) => (
                        <tr key={i} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/50" : ""}`}>
                          <td className="p-4 text-sm font-semibold text-slate-700">{row.action}</td>
                          <td className="p-4 text-center">
                            {row.aep ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {row.maoep ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {row.anytime ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Should You Change */}
              <section id="should-you-change" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Should You Make Changes This Year?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Even if you're generally satisfied with your coverage, there are situations where reviewing and potentially switching plans makes sense:
                </p>

                <div className="space-y-3">
                  {[
                    { trigger: "Your premiums or copays are increasing significantly", action: "Compare similar plans with lower costs in your area" },
                    { trigger: "Your medications have been moved to a higher tier or removed", action: "Check other Part D or MA-PD plans that cover your drugs at a lower cost" },
                    { trigger: "Your doctor is leaving your plan's network", action: "Find a plan that includes your preferred providers" },
                    { trigger: "You've had a change in health status", action: "Review whether your current plan still provides the coverage you need" },
                    { trigger: "New plan options are available in your area", action: "Compare new plans — they may offer better benefits or lower costs" },
                    { trigger: "You're paying for benefits you don't use", action: "Consider switching to a plan that better matches your actual needs" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.trigger}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.action}</p>
                      </div>
                    </div>
                  ))}
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
                <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Need Help Reviewing Your Options?
                  </h2>
                  <p className="text-amber-100 mb-6 max-w-xl">
                    Our licensed agents can review your current coverage, compare plans available in your area for 2026, and help you make the best decision during the Annual Enrollment Period.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors">
                      <Phone className="w-4 h-4" /> Call (888) 335-8996
                    </a>
                    <Link href="/compare-rates" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                      Compare Plans <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* Related Pages */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/enrollment/turning-65" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <Calendar className="w-5 h-5 text-amber-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 text-sm mb-1">Turning 65 Enrollment</h3>
                  <p className="text-xs text-slate-500">First-time enrollment guide</p>
                </Link>
                <Link href="/enrollment/late-penalties" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 text-sm mb-1">Late Penalties</h3>
                  <p className="text-xs text-slate-500">Avoid costly penalties</p>
                </Link>
                <Link href="/medicare-plans/costs" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <DollarSign className="w-5 h-5 text-amber-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 text-sm mb-1">Medicare Costs</h3>
                  <p className="text-xs text-slate-500">Full cost breakdown</p>
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
