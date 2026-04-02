/**
 * Turning 65 Enrollment Page
 * Design: Educational layout with timeline visualization, enrollment windows,
 * and clear step-by-step guidance for first-time Medicare enrollees.
 * Color accent: amber/orange (#D97706) matching the Enrollment section identity.
 */

import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import {
  Calendar,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  FileText,
  Users,
  HelpCircle,
  Briefcase,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "Your Initial Enrollment Period" },
  { id: "timeline", label: "7-Month Enrollment Timeline" },
  { id: "when-coverage-starts", label: "When Coverage Starts" },
  { id: "auto-enrollment", label: "Automatic Enrollment" },
  { id: "what-to-enroll-in", label: "What to Enroll In" },
  { id: "medigap-window", label: "Your Medigap Window" },
  { id: "checklist", label: "Turning 65 Checklist" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const faqs = [
  {
    q: "When should I start the Medicare enrollment process?",
    a: "You should begin researching your Medicare options about 6 months before you turn 65. Your Initial Enrollment Period (IEP) opens 3 months before your 65th birthday month, so you'll want to have a plan in place by then. Enrolling during the first 3 months of your IEP ensures coverage starts on the 1st day of your birth month.",
  },
  {
    q: "Do I have to sign up for Medicare when I turn 65?",
    a: "Not necessarily. If you have creditable employer coverage through your own job (or your spouse's employer with 20+ employees), you can delay Medicare Part B without penalty. However, most people should enroll in Part A since it's premium-free and doesn't affect employer coverage. If you don't have creditable coverage, you should enroll during your IEP to avoid late penalties.",
  },
  {
    q: "What happens if I miss my Initial Enrollment Period?",
    a: "If you miss your IEP and don't qualify for a Special Enrollment Period, you'll have to wait until the General Enrollment Period (January 1 – March 31) to sign up. Your coverage won't start until July 1, and you may face a permanent Part B late enrollment penalty of 10% for each full 12-month period you were eligible but didn't enroll.",
  },
  {
    q: "Will I be automatically enrolled in Medicare at 65?",
    a: "If you're already receiving Social Security benefits when you turn 65, you'll be automatically enrolled in Medicare Parts A and B. Your Medicare card will arrive about 3 months before your 65th birthday. If you're not receiving Social Security, you'll need to actively sign up.",
  },
  {
    q: "Can I enroll in Medicare Part A only and delay Part B?",
    a: "Yes. Many people who are still working with employer coverage enroll in Part A (which is premium-free) while delaying Part B. This is perfectly fine as long as your employer coverage is creditable. When your employer coverage ends, you'll get a Special Enrollment Period to sign up for Part B without penalty.",
  },
  {
    q: "My birthday is on the 1st of the month. Does that change my IEP?",
    a: "Yes. If your birthday falls on the 1st of the month, your IEP begins one month earlier than usual. For example, if you turn 65 on June 1, your IEP starts February 1 (four months before your birth month) instead of March 1. Your coverage would also begin one month earlier.",
  },
];

const timelineSteps = [
  {
    month: "Month 1–3",
    label: "3 Months Before Birthday",
    description: "Your IEP opens. Enroll now for the earliest possible coverage start date. This is the ideal time to sign up.",
    status: "ideal",
  },
  {
    month: "Month 4",
    label: "Your Birthday Month",
    description: "You can still enroll, but coverage won't start until the 1st of the following month.",
    status: "ok",
  },
  {
    month: "Month 5–7",
    label: "3 Months After Birthday",
    description: "Last chance to enroll during your IEP. Coverage starts the 1st of the month after you enroll. Don't wait until the last month.",
    status: "caution",
  },
];

export default function Turning65Enrollment() {
  useSEO({
    title: "Turning 65 and Medicare: When and How to Enroll | MedicareFAQ",
    description: "Learn exactly when to enroll in Medicare when turning 65, what your Initial Enrollment Period covers, and how to avoid costly late penalties.",
    canonical: "https://www.medicarefaq.com/medicare-enrollment/turning-65/",
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
      <section className="relative bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-amber-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-amber-200/70">Enrollment</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-amber-100">Turning 65</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-200" />
            </div>
            <span className="text-sm font-semibold text-amber-200 uppercase tracking-wider">Initial Enrollment</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Turning 65? Here's How to Enroll in Medicare
          </h1>
          <p className="text-lg text-amber-100/90 max-w-2xl mb-8">
            Your Initial Enrollment Period is a 7-month window around your 65th birthday. Learn exactly when it opens, what to sign up for, and how to avoid costly mistakes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#timeline" className="inline-flex items-center gap-2 bg-white text-amber-800 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors">
              View Your Timeline <ArrowRight className="w-4 h-4" />
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
                  <p className="text-sm font-semibold text-amber-900 mb-1">Need Help Enrolling?</p>
                  <p className="text-xs text-amber-700 mb-3">Our licensed agents walk you through every step</p>
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
                  Your Initial Enrollment Period (IEP)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  When you turn 65, you become eligible for Medicare — and your <strong>Initial Enrollment Period (IEP)</strong> is the first and most important window to sign up. This 7-month period is centered around your 65th birthday and is the ideal time to enroll in Medicare Parts A and B, as well as any supplemental coverage you may need.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  The IEP begins <strong>3 months before</strong> the month you turn 65, includes your birthday month, and extends <strong>3 months after</strong>. Missing this window can result in delayed coverage, gaps in protection, and permanent late enrollment penalties.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl mb-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">First-of-the-Month Birthday Exception</p>
                      <p className="text-sm text-amber-800">
                        If your 65th birthday falls on the <strong>1st of the month</strong>, your IEP starts one month earlier. For example, a June 1 birthday means your IEP begins February 1 instead of March 1, and your coverage can start May 1 instead of June 1.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">7</div>
                    <p className="text-sm text-slate-600">Month enrollment window</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">3</div>
                    <p className="text-sm text-slate-600">Months before your birthday to start</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">$0</div>
                    <p className="text-sm text-slate-600">Part A premium for most people</p>
                  </div>
                </div>
              </section>

              {/* Timeline */}
              <section id="timeline" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Your 7-Month Enrollment Timeline
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Timing matters. When you enroll within your IEP determines when your coverage begins. Here's how the 7-month window breaks down:
                </p>

                <div className="space-y-4 mb-8">
                  {timelineSteps.map((step, i) => (
                    <div
                      key={i}
                      className={`relative p-6 rounded-xl border-2 ${
                        step.status === "ideal"
                          ? "border-green-200 bg-green-50/50"
                          : step.status === "ok"
                          ? "border-amber-200 bg-amber-50/50"
                          : "border-red-200 bg-red-50/50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          step.status === "ideal"
                            ? "bg-green-100 text-green-700"
                            : step.status === "ok"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {step.status === "ideal" ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : step.status === "ok" ? (
                            <Clock className="w-5 h-5" />
                          ) : (
                            <AlertTriangle className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              step.status === "ideal"
                                ? "bg-green-100 text-green-700"
                                : step.status === "ok"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                              {step.month}
                            </span>
                            <span className={`text-xs font-semibold ${
                              step.status === "ideal"
                                ? "text-green-600"
                                : step.status === "ok"
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}>
                              {step.status === "ideal" ? "Best Time to Enroll" : step.status === "ok" ? "Still OK" : "Don't Wait"}
                            </span>
                          </div>
                          <h3 className="font-semibold text-slate-900 mb-1">{step.label}</h3>
                          <p className="text-sm text-slate-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* When Coverage Starts */}
              <section id="when-coverage-starts" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  When Does Your Coverage Start?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Your coverage effective date depends on when during your IEP you enroll. The earlier you sign up, the sooner your benefits begin:
                </p>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-800 text-white">
                        <th className="text-left p-4 font-semibold text-sm rounded-tl-lg">When You Enroll</th>
                        <th className="text-left p-4 font-semibold text-sm rounded-tr-lg">Coverage Starts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100 bg-green-50/30">
                        <td className="p-4 text-sm text-slate-700">1–3 months before your birthday month</td>
                        <td className="p-4 text-sm font-semibold text-green-700">1st day of your birthday month</td>
                      </tr>
                      <tr className="border-b border-slate-100 bg-amber-50/30">
                        <td className="p-4 text-sm text-slate-700">During your birthday month</td>
                        <td className="p-4 text-sm font-semibold text-amber-700">1st of the following month</td>
                      </tr>
                      <tr className="border-b border-slate-100 bg-amber-50/30">
                        <td className="p-4 text-sm text-slate-700">1 month after your birthday month</td>
                        <td className="p-4 text-sm font-semibold text-amber-700">2 months after enrollment</td>
                      </tr>
                      <tr className="border-b border-slate-100 bg-red-50/30">
                        <td className="p-4 text-sm text-slate-700">2–3 months after your birthday month</td>
                        <td className="p-4 text-sm font-semibold text-red-700">3 months after enrollment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Example</p>
                      <p className="text-sm text-blue-800">
                        If you turn 65 in <strong>June 2026</strong>, your IEP runs from March 1 to September 30, 2026. If you enroll in April (before your birthday month), your coverage starts June 1. If you wait until August, your coverage won't start until November 1.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Automatic Enrollment */}
              <section id="auto-enrollment" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Automatic Enrollment: Do You Qualify?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Not everyone needs to actively sign up. If you meet certain conditions, you'll be <strong>automatically enrolled</strong> in Medicare Parts A and B when you turn 65:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-900">You WILL Be Auto-Enrolled If:</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span>You're already receiving Social Security retirement benefits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span>You're receiving Railroad Retirement Board benefits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span>You've received Social Security Disability for 24+ months</span>
                      </li>
                    </ul>
                    <p className="text-xs text-green-700 mt-3">Your Medicare card arrives ~3 months before your 65th birthday.</p>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <h3 className="font-semibold text-amber-900">You MUST Sign Up If:</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-amber-800">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span>You haven't started collecting Social Security yet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span>You plan to delay Social Security past age 65</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span>You want Part A only (declining Part B for now)</span>
                      </li>
                    </ul>
                    <p className="text-xs text-amber-700 mt-3">Sign up at ssa.gov, by phone, or at your local Social Security office.</p>
                  </div>
                </div>
              </section>

              {/* What to Enroll In */}
              <section id="what-to-enroll-in" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Should You Enroll In?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  When you first become eligible, you have several coverage decisions to make. Here's a breakdown of your options:
                </p>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Medicare Part A (Hospital Insurance)</h3>
                        <p className="text-sm text-slate-600 mb-2">
                          Covers inpatient hospital stays, skilled nursing facility care, hospice, and some home health care. <strong>Premium-free</strong> for most people who worked 10+ years (40 quarters) paying Medicare taxes.
                        </p>
                        <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">Recommended for everyone at 65</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Medicare Part B (Medical Insurance)</h3>
                        <p className="text-sm text-slate-600 mb-2">
                          Covers doctor visits, outpatient care, preventive services, durable medical equipment, and more. Standard 2026 premium is <strong>$185/month</strong>. Can be delayed if you have creditable employer coverage.
                        </p>
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded">Enroll at 65 unless you have employer coverage</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Medicare Part D (Prescription Drug Coverage)</h3>
                        <p className="text-sm text-slate-600 mb-2">
                          Standalone drug plans that cover prescription medications. Premiums vary by plan. If you delay without creditable drug coverage, you'll face a permanent late enrollment penalty.
                        </p>
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded">Enroll when Part B starts unless you have creditable drug coverage</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-rose-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Supplemental Coverage (Choose One Path)</h3>
                        <p className="text-sm text-slate-600 mb-2">
                          You'll choose between a <strong>Medicare Supplement (Medigap)</strong> plan to fill gaps in Original Medicare, or a <strong>Medicare Advantage (Part C)</strong> plan that replaces Original Medicare with an all-in-one alternative. You cannot have both.
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Link href="/medicare-plans/supplement-vs-advantage" className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors">
                            Compare Supplement vs. Advantage →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medigap Window */}
              <section id="medigap-window" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Your Medigap Open Enrollment Window
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  If you choose Original Medicare + Medigap, your <strong>Medigap Open Enrollment Period</strong> is critical. It begins the first day of the month your Medicare Part B is effective and lasts for <strong>6 months</strong>.
                </p>

                <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-teal-900 mb-3">During Your Medigap OEP, You Have Guaranteed Issue Rights:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "No health questions or medical underwriting",
                      "Cannot be denied coverage for any reason",
                      "Cannot be charged more due to health conditions",
                      "Can choose any Medigap plan available in your state",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-teal-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900 mb-1">Don't Miss This Window</p>
                      <p className="text-sm text-red-800">
                        After your 6-month Medigap OEP closes, insurance companies can use medical underwriting to decide whether to sell you a policy and how much to charge. You could be denied coverage or face higher premiums based on your health history.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Checklist */}
              <section id="checklist" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Your Turning 65 Checklist
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Follow these steps to ensure a smooth transition to Medicare:
                </p>

                <div className="space-y-3">
                  {[
                    { time: "6 months before 65", task: "Start researching Medicare options — Original Medicare, Medigap, Medicare Advantage, and Part D plans" },
                    { time: "3 months before 65", task: "Your IEP opens. Enroll in Part A and Part B (unless delaying Part B with employer coverage)" },
                    { time: "3 months before 65", task: "If choosing Medigap, compare plans and rates in your area" },
                    { time: "3 months before 65", task: "If choosing Medicare Advantage, compare plans in your ZIP code" },
                    { time: "3 months before 65", task: "Enroll in a Part D prescription drug plan (unless your MA plan includes drug coverage)" },
                    { time: "When Part B starts", task: "Your 6-month Medigap Open Enrollment Period begins — enroll in Medigap if desired" },
                    { time: "After enrollment", task: "Notify your employer if transitioning from employer coverage to Medicare" },
                    { time: "After enrollment", task: "Review your Medicare card and coverage details when they arrive" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-amber-700">
                        {i + 1}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{item.time}</span>
                        <p className="text-sm text-slate-700 mt-0.5">{item.task}</p>
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
                <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Ready to Enroll? We Can Help.
                  </h2>
                  <p className="text-amber-100 mb-6 max-w-xl">
                    Our licensed Medicare agents will walk you through the enrollment process, compare plans in your area, and help you make the right choice — all at no cost to you.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors">
                      <Phone className="w-4 h-4" /> Call (888) 335-8996
                    </a>
                    <Link href="/enrollment/how-to-enroll" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                      How to Enroll Guide <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* Related Pages */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/enrollment/working-past-65" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <Briefcase className="w-5 h-5 text-amber-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 text-sm mb-1">Working Past 65</h3>
                  <p className="text-xs text-slate-500">Medicare & employer coverage coordination</p>
                </Link>
                <Link href="/enrollment/late-penalties" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 text-sm mb-1">Late Penalties</h3>
                  <p className="text-xs text-slate-500">Avoid costly late enrollment penalties</p>
                </Link>
                <Link href="/medicare-plans/compare" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <Shield className="w-5 h-5 text-amber-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 text-sm mb-1">Compare Plans</h3>
                  <p className="text-xs text-slate-500">Side-by-side plan comparison</p>
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
