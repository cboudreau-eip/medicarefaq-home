/**
 * Am I Eligible? Page
 * Design: Clean educational layout with eligibility criteria cards,
 * interactive quiz-style checklist, and comparison tables.
 */

import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronDown,
  Phone,
  ArrowRight,
  HelpCircle,
  Calendar,
  Shield,
  Heart,
  Users,
  Clock,
  AlertTriangle,
  FileText,
  Briefcase,
  Star,
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
  { id: "overview", label: "Eligibility Overview" },
  { id: "age-65", label: "Age 65+ Eligibility" },
  { id: "under-65", label: "Under 65 Eligibility" },
  { id: "esrd", label: "End-Stage Renal Disease" },
  { id: "citizenship", label: "Citizenship Requirements" },
  { id: "work-history", label: "Work History & Premiums" },
  { id: "special-situations", label: "Special Situations" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const eligibilityPaths = [
  {
    title: "Age 65 or Older",
    icon: Calendar,
    color: "bg-teal-600",
    lightBg: "bg-teal-50",
    lightText: "text-teal-700",
    description: "The most common path to Medicare eligibility. You qualify at age 65 regardless of whether you're still working.",
    requirements: [
      "U.S. citizen or permanent legal resident for 5+ continuous years",
      "Age 65 or approaching 65",
      "You or your spouse paid Medicare taxes for at least 10 years (40 quarters)",
    ],
    note: "If you're receiving Social Security benefits, you'll be automatically enrolled in Medicare Parts A and B when you turn 65.",
  },
  {
    title: "Disability (Under 65)",
    icon: Heart,
    color: "bg-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-700",
    description: "Younger individuals with qualifying disabilities can receive Medicare after a 24-month waiting period.",
    requirements: [
      "Receiving Social Security Disability Insurance (SSDI) for 24 months",
      "U.S. citizen or permanent legal resident",
      "Disability approved by the Social Security Administration",
    ],
    note: "The 24-month waiting period begins from the date you first receive SSDI benefits, not from when you applied.",
  },
  {
    title: "ALS (Lou Gehrig's Disease)",
    icon: Shield,
    color: "bg-purple-600",
    lightBg: "bg-purple-50",
    lightText: "text-purple-700",
    description: "If you've been diagnosed with ALS, you qualify for Medicare immediately — no waiting period required.",
    requirements: [
      "Diagnosed with Amyotrophic Lateral Sclerosis (ALS)",
      "Eligible for Social Security disability benefits",
      "No 24-month waiting period required",
    ],
    note: "Medicare coverage begins the same month your SSDI benefits start. This is the only condition that waives the 24-month waiting period.",
  },
  {
    title: "End-Stage Renal Disease (ESRD)",
    icon: Users,
    color: "bg-amber-600",
    lightBg: "bg-amber-50",
    lightText: "text-amber-700",
    description: "Permanent kidney failure requiring dialysis or a kidney transplant qualifies you for Medicare at any age.",
    requirements: [
      "Diagnosed with End-Stage Renal Disease (ESRD)",
      "Need regular dialysis or have had a kidney transplant",
      "You, your spouse, or your parent has paid Medicare taxes sufficiently",
    ],
    note: "Coverage typically begins the 4th month of dialysis treatments, though it can begin sooner if you receive a kidney transplant or start home dialysis training.",
  },
];

const citizenshipRequirements = [
  { requirement: "U.S. citizen", eligible: true, detail: "Born in the U.S. or naturalized" },
  { requirement: "Permanent legal resident (5+ years)", eligible: true, detail: "Must have lived in the U.S. continuously for at least 5 years" },
  { requirement: "Permanent legal resident (under 5 years)", eligible: false, detail: "Must wait until you've been a permanent resident for 5 continuous years" },
  { requirement: "Temporary visa holder", eligible: false, detail: "Not eligible for Medicare" },
  { requirement: "Undocumented resident", eligible: false, detail: "Not eligible for Medicare" },
];

const workHistoryTiers = [
  {
    quarters: "40+ quarters (10+ years)",
    partAPremium: "$0/month",
    description: "You or your spouse paid Medicare taxes for 10 or more years",
    highlight: true,
  },
  {
    quarters: "30–39 quarters (7.5–9.75 years)",
    partAPremium: "$285/month (2026)",
    description: "Reduced premium — close to the 40-quarter threshold",
    highlight: false,
  },
  {
    quarters: "Under 30 quarters",
    partAPremium: "$518/month (2026)",
    description: "Full premium required — fewer than 30 quarters of Medicare tax payments",
    highlight: false,
  },
];

const specialSituations = [
  {
    title: "Working Past 65",
    description: "If you're still working at 65 and have employer coverage through a company with 20+ employees, you may delay Medicare enrollment without penalty. Your employer plan is considered \"creditable coverage.\"",
    action: "You have a Special Enrollment Period (SEP) of 8 months after you or your spouse stops working or loses employer coverage.",
  },
  {
    title: "Veterans with VA Benefits",
    description: "VA benefits and Medicare are separate programs. You can have both, and many veterans choose to enroll in Medicare Part A (which is usually free) as a backup.",
    action: "Enrolling in at least Part A is recommended even if you primarily use VA healthcare.",
  },
  {
    title: "Federal Employees (FEHB)",
    description: "Federal Employee Health Benefits (FEHB) and Medicare can work together. FEHB continues into retirement, and adding Medicare can reduce your out-of-pocket costs.",
    action: "Most federal retirees benefit from enrolling in both Part A and Part B alongside FEHB.",
  },
  {
    title: "COBRA Coverage",
    description: "COBRA is not considered creditable coverage for Medicare purposes. If you're 65+ and on COBRA, you should enroll in Medicare during your Initial Enrollment Period to avoid late penalties.",
    action: "Do not delay Medicare enrollment because of COBRA — you may face permanent late enrollment penalties.",
  },
];

const faqs = [
  {
    question: "Can I get Medicare if I've never worked?",
    answer: "Yes, but you may need to pay a premium for Part A. If your spouse has worked and paid Medicare taxes for at least 10 years (40 quarters), you can qualify for premium-free Part A based on their work record. Otherwise, you can purchase Part A at the full premium rate.",
  },
  {
    question: "Do I need to be a U.S. citizen to get Medicare?",
    answer: "You don't need to be a citizen, but you must be a permanent legal resident (green card holder) who has lived in the United States continuously for at least 5 years. Temporary visa holders and undocumented residents are not eligible.",
  },
  {
    question: "What happens if I miss my enrollment window?",
    answer: "If you miss your Initial Enrollment Period (IEP) and don't qualify for a Special Enrollment Period, you'll have to wait for the General Enrollment Period (January 1 – March 31 each year, with coverage starting July 1). You may also face a late enrollment penalty — a 10% increase in Part B premiums for each 12-month period you were eligible but didn't enroll.",
  },
  {
    question: "Am I automatically enrolled in Medicare at 65?",
    answer: "If you're already receiving Social Security benefits when you turn 65, you'll be automatically enrolled in Medicare Parts A and B. Your Medicare card will arrive about 3 months before your 65th birthday. If you're not receiving Social Security, you'll need to actively enroll during your Initial Enrollment Period.",
  },
  {
    question: "Can I qualify for Medicare under my spouse's work record?",
    answer: "Yes. If your spouse has worked and paid Medicare taxes for at least 40 quarters (10 years), you can qualify for premium-free Part A at age 65 based on their work record — even if you've never worked yourself. This applies to current spouses, divorced spouses (if married 10+ years), and surviving spouses.",
  },
  {
    question: "I'm under 65 with a disability. When does my Medicare start?",
    answer: "Medicare begins after you've received Social Security Disability Insurance (SSDI) benefits for 24 consecutive months. The exception is ALS (Lou Gehrig's disease), which qualifies you for Medicare immediately without a waiting period.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Eligibility() {
  useSEO({
    title: "Medicare Eligibility | Who Qualifies for Medicare? | MedicareFAQ",
    description: "Find out if you qualify for Medicare. Learn about age requirements, disability eligibility, and how to enroll when you become eligible.",
    canonical: "https://www.medicarefaq.com/original-medicare/eligibility/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    ogType: "article",
  });
  const [activeSection, setActiveSection] = useState("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Track active section on scroll
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
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/medicare-101" className="hover:text-white transition-colors">New to Medicare</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-teal-300">Am I Eligible?</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-teal-300" />
            </div>
            <span className="text-sm font-semibold text-teal-300 uppercase tracking-wider">Eligibility Guide</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Am I Eligible for Medicare?
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Find out if you qualify for Medicare coverage based on your age, work history, disability status, or medical condition.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#overview" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Check Eligibility <ArrowRight className="w-4 h-4" />
            </a>
            <a href="tel:8883358996" className="inline-flex items-center gap-2 border border-slate-500 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
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
                        ? "border-teal-500 text-teal-700 font-medium"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-teal-50 rounded-xl border border-teal-100">
                <p className="text-sm font-semibold text-teal-800 mb-2">Need Help?</p>
                <p className="text-xs text-teal-700 mb-3">Our licensed agents can help determine your eligibility.</p>
                <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900">
                  <Phone className="w-4 h-4" /> (888) 335-8996
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {/* Overview */}
            <section id="overview" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Eligibility Overview</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Medicare eligibility is primarily based on <strong>age</strong>, <strong>disability status</strong>, or <strong>specific medical conditions</strong>. Most Americans become eligible at age 65, but there are several pathways to qualify earlier. Understanding which category applies to you is the first step toward getting the coverage you need.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Age 65+", value: "Most common path", icon: Calendar, color: "text-teal-600" },
                  { label: "Under 65 with disability", value: "After 24-month wait", icon: Heart, color: "text-blue-600" },
                  { label: "ALS diagnosis", value: "Immediate eligibility", icon: Shield, color: "text-purple-600" },
                  { label: "ESRD", value: "Kidney failure at any age", icon: Users, color: "text-amber-600" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Age 65+ */}
            <section id="age-65" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Age 65+ Eligibility</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The most common way to qualify for Medicare is by turning 65. If you're a U.S. citizen or permanent legal resident who has lived in the country for at least 5 continuous years, you're eligible for Medicare at age 65 — regardless of your health status or whether you're still working.
              </p>

              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" /> Automatic Enrollment
                </h3>
                <p className="text-teal-800 mb-4">
                  If you're already receiving Social Security benefits when you turn 65, you'll be <strong>automatically enrolled</strong> in Medicare Parts A and B. Your Medicare card will arrive in the mail approximately 3 months before your 65th birthday.
                </p>
                <p className="text-sm text-teal-700">
                  <strong>Important:</strong> If you don't want Part B (perhaps because you have employer coverage), you'll need to actively opt out. Otherwise, Part B premiums will be deducted from your Social Security check.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" /> Not Receiving Social Security?
                </h3>
                <p className="text-amber-800">
                  If you haven't started collecting Social Security benefits, you'll need to <strong>actively sign up</strong> for Medicare during your Initial Enrollment Period (IEP) — the 7-month window that starts 3 months before your 65th birthday and ends 3 months after.
                </p>
              </div>
            </section>

            {/* Under 65 */}
            <section id="under-65" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Under 65 Eligibility</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                You don't have to be 65 to qualify for Medicare. Younger individuals with qualifying disabilities or certain medical conditions can receive Medicare coverage. Here are the main pathways:
              </p>

              <div className="space-y-6">
                {eligibilityPaths.map((path) => (
                  <motion.div
                    key={path.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`${path.lightBg} border rounded-xl p-6`}
                    style={{ borderColor: `${path.lightBg === 'bg-teal-50' ? '#99f6e4' : path.lightBg === 'bg-blue-50' ? '#bfdbfe' : path.lightBg === 'bg-purple-50' ? '#d8b4fe' : '#fde68a'}` }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${path.color} flex items-center justify-center shrink-0`}>
                        <path.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{path.title}</h3>
                        <p className="text-slate-600 mt-1">{path.description}</p>
                      </div>
                    </div>

                    <div className="ml-16">
                      <p className="text-sm font-semibold text-slate-700 mb-2">Requirements:</p>
                      <ul className="space-y-2 mb-4">
                        {path.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>

                      <div className="bg-white/60 rounded-lg p-3 border border-white/80">
                        <p className="text-sm text-slate-600">
                          <strong className="text-slate-800">Note:</strong> {path.note}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ESRD */}
            <section id="esrd" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">End-Stage Renal Disease (ESRD)</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                End-Stage Renal Disease (ESRD) — permanent kidney failure requiring dialysis or a kidney transplant — qualifies you for Medicare at any age. This is the only medical condition (besides ALS) that provides a direct path to Medicare regardless of age or disability status.
              </p>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">When Does Coverage Begin?</h3>
                <div className="space-y-4">
                  {[
                    { scenario: "Regular dialysis", timing: "4th month of dialysis treatments", detail: "Coverage begins on the first day of the 4th month after you start dialysis." },
                    { scenario: "Home dialysis training", timing: "1st month of training", detail: "If you start a home dialysis training program, coverage can begin the month training starts." },
                    { scenario: "Kidney transplant", timing: "Month of transplant", detail: "If you receive a kidney transplant, coverage can begin the month of the transplant or up to 2 months before if hospitalized for the transplant." },
                  ].map((item) => (
                    <div key={item.scenario} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.scenario}: <span className="text-amber-700">{item.timing}</span></p>
                        <p className="text-sm text-slate-600">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Citizenship */}
            <section id="citizenship" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Citizenship & Residency Requirements</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                In addition to meeting age or disability requirements, you must also meet citizenship or residency criteria to qualify for Medicare.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                      <th className="text-center p-4 font-semibold text-slate-700">Eligible?</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citizenshipRequirements.map((item) => (
                      <tr key={item.requirement} className="border-t border-slate-100">
                        <td className="p-4 font-medium text-slate-900">{item.requirement}</td>
                        <td className="p-4 text-center">
                          {item.eligible ? (
                            <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-xs bg-green-50 px-2.5 py-1 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-600 font-semibold text-xs bg-red-50 px-2.5 py-1 rounded-full">
                              <XCircle className="w-3.5 h-3.5" /> No
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-slate-600">{item.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Work History */}
            <section id="work-history" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Work History & Part A Premiums</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Your work history (or your spouse's) determines whether you receive <strong>premium-free Part A</strong>. Medicare taxes are paid through payroll deductions (FICA), and the number of "quarters" you've worked determines your premium.
              </p>

              <div className="space-y-4">
                {workHistoryTiers.map((tier) => (
                  <div
                    key={tier.quarters}
                    className={`rounded-xl border p-6 ${
                      tier.highlight
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {tier.highlight && <Star className="w-4 h-4 text-green-600" />}
                          <h3 className="font-bold text-slate-900">{tier.quarters}</h3>
                        </div>
                        <p className="text-sm text-slate-600">{tier.description}</p>
                      </div>
                      <div className={`text-2xl font-bold shrink-0 ${tier.highlight ? "text-green-700" : "text-slate-900"}`}>
                        {tier.partAPremium}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-sm text-blue-800">
                  <strong>Spouse's Work Record:</strong> If you don't have enough work credits on your own, you may qualify for premium-free Part A based on your current spouse's, ex-spouse's (if married 10+ years), or deceased spouse's work record.
                </p>
              </div>
            </section>

            {/* Special Situations */}
            <section id="special-situations" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Special Situations</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Several common life situations can affect your Medicare eligibility and enrollment timing. Here's what you need to know:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {specialSituations.map((situation) => (
                  <div key={situation.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="w-5 h-5 text-slate-400" />
                      <h3 className="font-bold text-slate-900">{situation.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{situation.description}</p>
                    <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                      <p className="text-xs font-semibold text-teal-800 mb-1">What to Do:</p>
                      <p className="text-xs text-teal-700">{situation.action}</p>
                    </div>
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

            {/* Next Steps CTA */}
            <section id="next-steps" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-slate-900 to-teal-900 rounded-2xl p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-slate-300 mb-8 max-w-xl">
                  Now that you know you're eligible, the next step is understanding when and how to enroll. Our licensed agents can walk you through the entire process.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Call (888) 335-8996
                  </a>
                  <Link href="/new-to-medicare/turning-65" className="inline-flex items-center gap-2 border border-slate-500 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Turning 65 Timeline <ArrowRight className="w-4 h-4" />
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
