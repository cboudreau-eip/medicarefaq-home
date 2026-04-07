/**
 * Medigap Eligibility Page
 * Route: /medicare-supplements/medigap-eligibility
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import {
  Shield, ChevronDown, Phone, ArrowRight, CheckCircle2, AlertTriangle,
  Calendar, Clock, Info, XCircle, Users
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const ELIGIBILITY_RULES = [
  {
    title: "Enrolled in Medicare Part A and Part B",
    desc: "You must be enrolled in both Medicare Part A (hospital) and Part B (medical) to purchase a Medigap policy.",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    title: "Age 65 or Older (or Qualifying Disability)",
    desc: "Most people become eligible at 65. If you're under 65 and have Medicare due to a disability, some states require insurers to sell you Medigap, but federal law doesn't guarantee it.",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Not Enrolled in Medicare Advantage",
    desc: "You cannot have both a Medigap plan and a Medicare Advantage plan at the same time. If you want Medigap, you must use Original Medicare (Parts A and B).",
    icon: XCircle,
    color: "text-red-500",
  },
  {
    title: "U.S. Resident",
    desc: "You must reside in the United States. Medigap plans are sold state by state, and your premium is based on your state of residence.",
    icon: Users,
    color: "text-purple-600",
  },
];

const OEP_FACTS = [
  { label: "When It Starts", value: "The month you turn 65 AND are enrolled in Medicare Part B" },
  { label: "Duration", value: "6 months (cannot be extended or repeated)" },
  { label: "What It Guarantees", value: "The right to buy any Medigap plan sold in your state, regardless of health" },
  { label: "Medical Underwriting", value: "None — insurers cannot deny coverage or charge higher premiums due to pre-existing conditions" },
  { label: "What Happens After", value: "Insurers can use medical underwriting and may deny coverage or charge more" },
];

const GUARANTEED_ISSUE_SITUATIONS = [
  "Your Medicare Advantage plan is leaving your area or stops covering your area",
  "You move out of your Medicare Advantage plan's service area",
  "Your employer-sponsored health plan is ending",
  "Your Medigap insurer goes bankrupt or loses its license",
  "You enrolled in Medicare Advantage when first eligible and want to switch back within 12 months",
  "You have a Medicare SELECT plan and move out of the service area",
];

const FAQS = [
  {
    q: "Can I get Medigap if I'm under 65?",
    a: "Federal law does not require insurers to sell Medigap to people under 65 who have Medicare due to a disability. However, 33 states have laws requiring insurers to offer at least some Medigap plans to under-65 Medicare beneficiaries. Premiums are typically much higher for under-65 enrollees.",
  },
  {
    q: "What if I miss my Medigap Open Enrollment Period?",
    a: "You can still apply for Medigap after your OEP ends, but insurers can use medical underwriting. They may deny your application, charge higher premiums, or exclude pre-existing conditions for up to 6 months. Some people with serious health conditions may be unable to get Medigap coverage after their OEP.",
  },
  {
    q: "Can I switch Medigap plans after I enroll?",
    a: "Yes, but you'll generally need to pass medical underwriting unless you have a guaranteed issue right. The best time to switch is during your OEP or when you have a guaranteed issue right. In some states, you can switch during your Medigap birthday rule (if your state has one).",
  },
  {
    q: "Does my Medigap plan cover my spouse?",
    a: "No. Medigap plans are individual policies — each person needs their own plan. If both you and your spouse want Medigap coverage, you each need to apply separately.",
  },
  {
    q: "What is the Medigap birthday rule?",
    a: "Several states (including California, Idaho, Illinois, Louisiana, Maryland, Nevada, Oklahoma, and Oregon) have a 'birthday rule' that gives you a window each year around your birthday to switch to a Medigap plan with equal or lesser benefits without medical underwriting. Check your state's rules for specifics.",
  },
  {
    q: "Can I be denied Medigap coverage?",
    a: "Outside of your Open Enrollment Period and guaranteed issue situations, yes — insurers can deny your Medigap application based on your health history. This is why enrolling during your OEP is so important. During your OEP, denial is not allowed.",
  },
];

export default function MedigapEligibility() {
  useCMSSEO({
    contentType: "page",
    slug: "medigap-eligibility",
    title: "Medigap Eligibility: Who Can Enroll in Medicare Supplement Insurance?",
    description: "Learn who is eligible for Medigap, when to enroll, and how medical underwriting works. Find out about your Medigap Open Enrollment Period and guaranteed issue rights.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/medigap-eligibility/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    ogType: "article",
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16 overflow-hidden">
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
            <span className="text-teal-400">Medigap Eligibility</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medigap Eligibility
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Who can enroll in Medicare Supplement insurance, when to enroll, and what happens if you miss your window.
          </p>
          <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            <Phone className="w-4 h-4" /> Speak with a Licensed Agent
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">

          {/* Basic Eligibility */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Who Is Eligible for Medigap?
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              To purchase a Medicare Supplement (Medigap) policy, you must meet a few basic requirements. Federal law establishes the minimum eligibility rules, though some states have additional protections.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {ELIGIBILITY_RULES.map((rule, i) => (
                <div key={i} className="p-5 border border-slate-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <rule.icon className={`w-6 h-6 ${rule.color} shrink-0 mt-0.5`} />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{rule.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{rule.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Enrollment Period */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              The Medigap Open Enrollment Period
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              The Medigap Open Enrollment Period (OEP) is the most important window for enrolling in a Medigap plan. During this 6-month period, you have guaranteed issue rights — meaning insurers must sell you any Medigap plan they offer, regardless of your health history.
            </p>
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl mb-6">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                <h3 className="font-bold text-blue-900 text-lg">Your 6-Month Window</h3>
              </div>
              <div className="space-y-3">
                {OEP_FACTS.map((fact, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider min-w-[140px] pt-0.5">{fact.label}</span>
                    <span className="text-sm text-blue-900">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Don't Miss Your OEP</p>
                <p className="text-sm text-amber-800">
                  Your Medigap OEP happens only once. After it ends, you may face medical underwriting and could be denied coverage or charged higher premiums. Enrolling during your OEP is the single most important step you can take to secure affordable Medigap coverage.
                </p>
              </div>
            </div>
          </div>

          {/* Guaranteed Issue Rights */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Guaranteed Issue Rights
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Outside of your OEP, you may still have guaranteed issue rights in specific situations. In these cases, insurers must sell you a Medigap plan without medical underwriting.
            </p>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {GUARANTEED_ISSUE_SITUATIONS.map((situation, i) => (
                <div key={i} className={`flex items-start gap-3 px-5 py-4 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} ${i < GUARANTEED_ISSUE_SITUATIONS.length - 1 ? "border-b border-slate-100" : ""}`}>
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">{situation}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
              <Info className="w-3 h-3" /> In most guaranteed issue situations, you have 63 days from losing your previous coverage to enroll in a Medigap plan.
            </p>
          </div>

          {/* Medical Underwriting */}
          <div className="mb-14 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              What Is Medical Underwriting?
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Medical underwriting is the process insurers use to evaluate your health history before deciding whether to sell you a Medigap plan and at what price. Outside of your OEP and guaranteed issue situations, insurers can:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Deny your Medigap application entirely",
                "Charge higher premiums based on your health history",
                "Exclude pre-existing conditions from coverage for up to 6 months",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-slate-600 text-sm">
              Common conditions that may affect underwriting include heart disease, diabetes, COPD, cancer, stroke, kidney disease, and other chronic conditions. Each insurer has its own underwriting guidelines.
            </p>
          </div>

          {/* FAQs */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-800 pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-slate-600 leading-relaxed text-sm border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-3">Ready to Enroll in Medigap?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Our licensed Medicare agents can help you understand your eligibility, find the right plan, and enroll during your Open Enrollment Period — at no cost to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link href="/medicare-supplements/compare" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
                Compare Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
