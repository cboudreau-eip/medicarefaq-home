/**
 * Turning 65 Timeline Page
 * Design: Visual timeline with milestone cards, countdown-style layout,
 * and actionable steps for people approaching their 65th birthday.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Phone,
  ArrowRight,
  Calendar,
  Clock,
  AlertTriangle,
  FileText,
  Shield,
  Heart,
  DollarSign,
  Mail,
  ClipboardList,
  Star,
  MapPin,
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
  { id: "overview", label: "Timeline Overview" },
  { id: "12-months", label: "12 Months Before" },
  { id: "iep", label: "Initial Enrollment Period" },
  { id: "3-months-before", label: "3 Months Before" },
  { id: "birthday-month", label: "Your Birthday Month" },
  { id: "3-months-after", label: "3 Months After" },
  { id: "after-enrollment", label: "After Enrollment" },
  { id: "penalties", label: "Late Enrollment Penalties" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const timelineMilestones = [
  {
    period: "12 Months Before You Turn 65",
    color: "bg-blue-600",
    dotColor: "bg-blue-500",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
    icon: FileText,
    priority: "Planning Phase",
    tasks: [
      {
        title: "Research your Medicare options",
        description: "Start learning about Original Medicare (Parts A & B), Medicare Supplement (Medigap), Medicare Advantage (Part C), and Part D prescription drug plans.",
      },
      {
        title: "Review your current coverage",
        description: "If you have employer coverage, COBRA, VA benefits, or marketplace insurance, understand how they'll interact with Medicare.",
      },
      {
        title: "Check your Social Security status",
        description: "If you're already receiving Social Security benefits, you'll be automatically enrolled in Medicare Parts A and B. If not, you'll need to sign up manually.",
      },
      {
        title: "Estimate your costs",
        description: "Review 2026 Medicare premiums, deductibles, and out-of-pocket costs. Consider whether you'll need supplemental coverage.",
      },
    ],
  },
  {
    period: "3 Months Before Your 65th Birthday",
    color: "bg-teal-600",
    dotColor: "bg-teal-500",
    borderColor: "border-teal-200",
    bgColor: "bg-teal-50",
    icon: Calendar,
    priority: "IEP Begins — Take Action",
    tasks: [
      {
        title: "Your Initial Enrollment Period (IEP) starts",
        description: "Your 7-month IEP begins 3 months before your 65th birthday month. This is the best time to enroll to avoid coverage gaps.",
      },
      {
        title: "Sign up for Medicare Part A and Part B",
        description: "Apply online at ssa.gov, by phone at 1-800-772-1213, or at your local Social Security office. If receiving Social Security, you may be auto-enrolled.",
      },
      {
        title: "Choose supplemental coverage",
        description: "Decide between a Medicare Supplement (Medigap) plan or a Medicare Advantage plan. Compare plans available in your area.",
      },
      {
        title: "Enroll in Part D if needed",
        description: "If you choose Original Medicare + Medigap, you'll need a standalone Part D plan for prescription drug coverage. Medicare Advantage plans often include drug coverage.",
      },
    ],
  },
  {
    period: "Your 65th Birthday Month",
    color: "bg-amber-600",
    dotColor: "bg-amber-500",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50",
    icon: Star,
    priority: "Key Milestone",
    tasks: [
      {
        title: "Medicare coverage can begin",
        description: "If you enrolled during the first 3 months of your IEP, your coverage starts on the 1st of your birthday month (or the 1st of the prior month if your birthday is on the 1st).",
      },
      {
        title: "Receive your Medicare card",
        description: "Your red, white, and blue Medicare card should arrive in the mail. Keep it safe — you'll need it for doctor visits and when enrolling in additional plans.",
      },
      {
        title: "Medigap Open Enrollment begins",
        description: "Your 6-month Medigap Open Enrollment Period starts the month your Part B coverage begins. During this window, insurance companies cannot deny you coverage or charge more due to pre-existing conditions.",
      },
    ],
  },
  {
    period: "3 Months After Your 65th Birthday",
    color: "bg-red-600",
    dotColor: "bg-red-500",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
    icon: AlertTriangle,
    priority: "Deadline Approaching",
    tasks: [
      {
        title: "IEP ends — last chance to enroll without penalty",
        description: "Your Initial Enrollment Period closes 3 months after your birthday month. If you haven't enrolled yet, do so immediately to minimize coverage gaps.",
      },
      {
        title: "Late enrollment may delay coverage",
        description: "If you enroll in the last 3 months of your IEP, your coverage won't start until 1-3 months after you sign up.",
      },
      {
        title: "Review your coverage choices",
        description: "Make sure your doctors accept Medicare and that your prescriptions are covered by your Part D or Medicare Advantage plan.",
      },
    ],
  },
];

const iepChart = [
  { month: "Month 1 (3 months before)", enrollBy: "Before birthday month", coverageStarts: "1st of birthday month", recommended: true },
  { month: "Month 2 (2 months before)", enrollBy: "Before birthday month", coverageStarts: "1st of birthday month", recommended: true },
  { month: "Month 3 (1 month before)", enrollBy: "Before birthday month", coverageStarts: "1st of birthday month", recommended: true },
  { month: "Month 4 (birthday month)", enrollBy: "During birthday month", coverageStarts: "1 month after enrollment", recommended: false },
  { month: "Month 5 (1 month after)", enrollBy: "1 month after birthday", coverageStarts: "2 months after enrollment", recommended: false },
  { month: "Month 6 (2 months after)", enrollBy: "2 months after birthday", coverageStarts: "3 months after enrollment", recommended: false },
  { month: "Month 7 (3 months after)", enrollBy: "3 months after birthday", coverageStarts: "3 months after enrollment", recommended: false },
];

const penalties = [
  {
    part: "Part B Late Enrollment Penalty",
    description: "If you don't sign up for Part B when you're first eligible and don't have creditable coverage, you'll pay a 10% premium surcharge for each full 12-month period you could have had Part B but didn't.",
    example: "If you waited 2 years to enroll, your Part B premium would be 20% higher than the standard premium — for the rest of the time you have Medicare.",
    permanent: true,
  },
  {
    part: "Part D Late Enrollment Penalty",
    description: "If you go 63+ consecutive days without creditable prescription drug coverage, you'll pay a penalty when you eventually enroll in Part D.",
    example: "The penalty is 1% of the national base beneficiary premium ($36.78 in 2026) multiplied by the number of months you went without coverage.",
    permanent: true,
  },
];

const faqs = [
  {
    question: "What if my birthday is on the 1st of the month?",
    answer: "If your birthday falls on the 1st of the month, your Initial Enrollment Period starts one month earlier than you might expect. For example, if you turn 65 on June 1st, your IEP runs from February through August (instead of March through September). Your coverage would also begin one month earlier.",
  },
  {
    question: "I'm still working at 65. Do I need to enroll?",
    answer: "If you have health insurance through your current employer (or your spouse's employer) and the company has 20 or more employees, you can delay Medicare enrollment without penalty. You'll get a Special Enrollment Period (SEP) of 8 months once you or your spouse stops working or you lose employer coverage. However, you should still consider signing up for premium-free Part A.",
  },
  {
    question: "What if I have COBRA when I turn 65?",
    answer: "COBRA is NOT considered creditable coverage for Medicare purposes. You should enroll in Medicare during your IEP even if you have COBRA. Failing to do so could result in late enrollment penalties and a gap in coverage.",
  },
  {
    question: "Can I change my mind after enrolling?",
    answer: "You can disenroll from Part B during the General Enrollment Period (January 1 – March 31). For Medicare Advantage and Part D plans, you can make changes during the Annual Enrollment Period (October 15 – December 7) or during the Medicare Advantage Open Enrollment Period (January 1 – March 31).",
  },
  {
    question: "How do I sign up for Medicare?",
    answer: "You can enroll online at ssa.gov (the easiest method), by calling Social Security at 1-800-772-1213, or by visiting your local Social Security office in person. If you're already receiving Social Security benefits, you'll be automatically enrolled.",
  },
  {
    question: "Will I get a Medicare card in the mail?",
    answer: "Yes. If you're automatically enrolled, your Medicare card will arrive about 3 months before your 65th birthday. If you enroll manually, your card will arrive after your application is processed. Your card shows your Medicare number and the dates your Part A and Part B coverage began.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Turning65() {
  useCMSSEO({
    contentType: "page",
    slug: "turning-65",
    title: "Turning 65 and Medicare | What You Need to Do | MedicareFAQ",
    description: "Turning 65? Learn everything you need to know about enrolling in Medicare, your coverage options, and the steps to take before your 65th birthday.",
    canonical: "https://www.medicarefaq.com/medicare-enrollment/turning-65/",
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
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/medicare-101" className="hover:text-white transition-colors">New to Medicare</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-teal-300">Turning 65 Timeline</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-teal-300" />
            </div>
            <span className="text-sm font-semibold text-teal-300 uppercase tracking-wider">Enrollment Timeline</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Turning 65? Here's Your Medicare Timeline
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            A month-by-month guide to everything you need to do before, during, and after your 65th birthday to ensure seamless Medicare coverage.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#overview" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              View Timeline <ArrowRight className="w-4 h-4" />
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
                <p className="text-xs text-teal-700 mb-3">Our licensed agents can guide you through enrollment.</p>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Timeline Overview</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Your <strong>Initial Enrollment Period (IEP)</strong> is a 7-month window centered around your 65th birthday. It starts 3 months before your birthday month and ends 3 months after. Enrolling early in this window ensures your coverage starts on time with no gaps.
              </p>

              {/* Visual IEP diagram */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Your 7-Month Enrollment Window</h3>
                <div className="flex items-center gap-1 overflow-x-auto pb-2">
                  {["3 mo before", "2 mo before", "1 mo before", "Birthday Month", "1 mo after", "2 mo after", "3 mo after"].map((label, i) => (
                    <div
                      key={label}
                      className={`flex-1 min-w-[100px] text-center p-3 rounded-lg text-xs font-medium ${
                        i < 3
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : i === 3
                          ? "bg-amber-100 text-amber-800 border-2 border-amber-400"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      <div className="font-bold">{label}</div>
                      <div className="text-[10px] mt-1 opacity-75">
                        {i < 3 ? "Best time" : i === 3 ? "Your birthday" : "Coverage delayed"}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  Enrolling in the first 3 months ensures coverage starts on the 1st of your birthday month.
                </p>
              </div>
            </section>

            {/* Timeline Milestones */}
            {timelineMilestones.map((milestone, idx) => (
              <section
                key={milestone.period}
                id={idx === 0 ? "12-months" : idx === 1 ? "3-months-before" : idx === 2 ? "birthday-month" : "3-months-after"}
                className="mb-16 scroll-mt-24"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${milestone.color} flex items-center justify-center shrink-0`}>
                    <milestone.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${milestone.dotColor.replace('bg-', 'text-')}`}>
                      {milestone.priority}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{milestone.period}</h2>
                  </div>
                </div>

                <div className="space-y-4 ml-0 md:ml-16">
                  {milestone.tasks.map((task, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`${milestone.bgColor} ${milestone.borderColor} border rounded-xl p-5`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-full ${milestone.color} flex items-center justify-center shrink-0 mt-0.5`}>
                          <span className="text-white text-xs font-bold">{i + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-1">{task.title}</h3>
                          <p className="text-sm text-slate-600">{task.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}

            {/* IEP Chart */}
            <section id="iep" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Initial Enrollment Period (IEP) Chart</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                When you enroll during your IEP determines when your coverage starts. Enrolling early is always better — here's a month-by-month breakdown:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-4 font-semibold text-slate-700">IEP Month</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Coverage Starts</th>
                      <th className="text-center p-4 font-semibold text-slate-700">Recommended?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iepChart.map((row) => (
                      <tr key={row.month} className={`border-t border-slate-100 ${row.recommended ? "bg-green-50/50" : ""}`}>
                        <td className="p-4 font-medium text-slate-900">{row.month}</td>
                        <td className="p-4 text-slate-600">{row.coverageStarts}</td>
                        <td className="p-4 text-center">
                          {row.recommended ? (
                            <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-xs bg-green-50 px-2.5 py-1 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Best
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-xs bg-amber-50 px-2.5 py-1 rounded-full">
                              <Clock className="w-3.5 h-3.5" /> Delayed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* After Enrollment */}
            <section id="after-enrollment" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">After You Enroll</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Once you've enrolled in Medicare, there are a few important things to take care of in the weeks and months that follow:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Set up your MyMedicare.gov account", description: "Access your claims, coverage details, and preventive services schedule online.", icon: FileText },
                  { title: "Schedule your Welcome to Medicare visit", description: "A free preventive visit within the first 12 months of Part B coverage. Includes health risk assessment and screenings.", icon: Heart },
                  { title: "Review your prescription coverage", description: "Make sure your medications are covered by your Part D or Medicare Advantage plan's formulary.", icon: ClipboardList },
                  { title: "Notify your current insurer", description: "If you're transitioning from employer coverage or marketplace insurance, coordinate the end date with your Medicare start date.", icon: Mail },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Penalties */}
            <section id="penalties" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Late Enrollment Penalties</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Missing your enrollment window can result in <strong>permanent premium increases</strong>. These penalties are added to your monthly premiums for as long as you have Medicare.
              </p>

              <div className="space-y-4">
                {penalties.map((penalty) => (
                  <div key={penalty.part} className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-bold text-red-900">{penalty.part}</h3>
                      {penalty.permanent && (
                        <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Permanent</span>
                      )}
                    </div>
                    <p className="text-red-800 mb-3">{penalty.description}</p>
                    <div className="bg-white/60 rounded-lg p-3 border border-red-100">
                      <p className="text-sm text-red-700"><strong>Example:</strong> {penalty.example}</p>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Personalized Guidance?</h2>
                <p className="text-slate-300 mb-8 max-w-xl">
                  Every situation is different. Our licensed Medicare agents can review your specific timeline, help you choose the right plan, and ensure you don't miss any deadlines.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Call (888) 335-8996
                  </a>
                  <Link href="/new-to-medicare/costs" className="inline-flex items-center gap-2 border border-slate-500 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    What Does It Cost? <ArrowRight className="w-4 h-4" />
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
