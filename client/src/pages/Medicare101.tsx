/**
 * Medicare 101 Guide Page
 * Design: Clean educational layout with visual hierarchy, card-based sections,
 * comparison tables, and a sticky table of contents sidebar.
 * Content sourced and consolidated from medicarefaq.com/original-medicare/
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Stethoscope,
  Pill,
  FileText,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Users,
  AlertTriangle,
  Phone,
  ArrowRight,
  HelpCircle,
  Building2,
  Calendar,
  ClipboardList,
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
  { id: "what-is-medicare", label: "What Is Medicare?" },
  { id: "four-parts", label: "The Four Parts of Medicare" },
  { id: "eligibility", label: "Who Is Eligible?" },
  { id: "enrollment", label: "Enrollment Periods" },
  { id: "costs", label: "Costs & Premiums" },
  { id: "supplement-vs-advantage", label: "Supplement vs. Advantage" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const medicareParts = [
  {
    part: "Part A",
    title: "Hospital Insurance",
    icon: Building2,
    color: "bg-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-700",
    description:
      "Covers inpatient hospital stays, skilled nursing facility care, hospice care, and some home health care.",
    covers: [
      "Inpatient hospital stays",
      "Skilled nursing facility care (up to 100 days)",
      "Hospice care",
      "Some home health care services",
    ],
    doesNotCover: [
      "Long-term care (custodial care)",
      "Most dental, vision, and hearing",
      "Private-duty nursing",
    ],
    cost: "Most people pay $0 in premiums (if you or your spouse paid Medicare taxes for 10+ years). The 2026 deductible is $1,676 per benefit period.",
  },
  {
    part: "Part B",
    title: "Medical Insurance",
    icon: Stethoscope,
    color: "bg-teal-600",
    lightBg: "bg-teal-50",
    lightText: "text-teal-700",
    description:
      "Covers doctor visits, outpatient care, preventive services, and durable medical equipment.",
    covers: [
      "Doctor and specialist visits",
      "Outpatient surgery and procedures",
      "Preventive services (screenings, vaccines)",
      "Durable medical equipment (wheelchairs, walkers)",
      "Mental health services",
      "Ambulance services",
    ],
    doesNotCover: [
      "Most dental, vision, and hearing",
      "Cosmetic surgery",
      "Routine foot care",
      "Care outside the U.S. (with limited exceptions)",
    ],
    cost: "The standard 2026 monthly premium is $185.00. After the $257 annual deductible, Medicare covers 80% and you pay 20%.",
  },
  {
    part: "Part C",
    title: "Medicare Advantage",
    icon: Shield,
    color: "bg-amber-600",
    lightBg: "bg-amber-50",
    lightText: "text-amber-700",
    description:
      "An alternative to Original Medicare offered by private insurers. Bundles Part A, Part B, and usually Part D into one plan.",
    covers: [
      "Everything Part A and Part B cover",
      "Often includes Part D (prescription drugs)",
      "May include dental, vision, and hearing",
      "May include fitness programs (e.g., SilverSneakers)",
      "Annual out-of-pocket maximum",
    ],
    doesNotCover: [
      "Out-of-network care (HMO plans)",
      "Services not covered by Original Medicare",
      "Coverage may vary by plan and region",
    ],
    cost: "Many plans have $0 premiums (you still pay your Part B premium). Copays and coinsurance vary by plan. Annual out-of-pocket max applies.",
  },
  {
    part: "Part D",
    title: "Prescription Drug Coverage",
    icon: Pill,
    color: "bg-rose-600",
    lightBg: "bg-rose-50",
    lightText: "text-rose-700",
    description:
      "Covers prescription medications through private insurance plans approved by Medicare.",
    covers: [
      "Brand-name prescription drugs",
      "Generic prescription drugs",
      "Specialty medications",
      "Vaccines covered under Part D",
    ],
    doesNotCover: [
      "Drugs not on the plan's formulary",
      "Over-the-counter medications",
      "Drugs covered under Part A or Part B",
    ],
    cost: "Monthly premiums vary by plan (national average around $55/month in 2026). Deductibles, copays, and coinsurance vary. Late enrollment penalties may apply.",
  },
];

const enrollmentPeriods = [
  {
    title: "Initial Enrollment Period (IEP)",
    icon: Calendar,
    timing: "7-month window around your 65th birthday",
    description:
      "Your first chance to enroll in Medicare. It starts 3 months before the month you turn 65, includes your birthday month, and ends 3 months after. This is the most important enrollment window — missing it can result in penalties and coverage gaps.",
    tip: "Enroll during the first 3 months of your IEP for coverage to start on the 1st of your birthday month.",
  },
  {
    title: "Annual Enrollment Period (AEP)",
    icon: Clock,
    timing: "October 15 – December 7 each year",
    description:
      "During this period, you can switch from Original Medicare to Medicare Advantage (or vice versa), change your Medicare Advantage plan, or join, switch, or drop a Part D plan. Changes take effect January 1.",
    tip: "Review your Annual Notice of Change letter each fall to see if your plan's costs or coverage are changing.",
  },
  {
    title: "Special Enrollment Period (SEP)",
    icon: FileText,
    timing: "Triggered by qualifying life events",
    description:
      "If you experience certain life events — such as losing employer coverage, moving to a new area, or qualifying for Medicaid — you may be eligible for a Special Enrollment Period. This allows you to make changes outside the standard enrollment windows.",
    tip: "If you're still working past 65 with employer coverage, you typically get an 8-month SEP after that coverage ends.",
  },
  {
    title: "General Enrollment Period (GEP)",
    icon: ClipboardList,
    timing: "January 1 – March 31 each year",
    description:
      "If you missed your Initial Enrollment Period and don't qualify for a Special Enrollment Period, you can sign up during the General Enrollment Period. Coverage begins July 1. Late enrollment penalties may apply.",
    tip: "Avoid the GEP if possible — enrolling late can mean higher premiums for the rest of your life.",
  },
];

const faqs = [
  {
    question: "What is the difference between Original Medicare and Medicare Advantage?",
    answer:
      "Original Medicare (Parts A & B) is the federal program that covers hospital and medical services. You can see any doctor that accepts Medicare nationwide. Medicare Advantage (Part C) is offered by private insurers and bundles Part A, B, and usually Part D into one plan — often with extra benefits like dental and vision, but with network restrictions.",
  },
  {
    question: "Is Medicare free?",
    answer:
      "Part A is premium-free for most people who paid Medicare taxes for at least 10 years. However, Part B has a monthly premium ($185.00 in 2026), and you'll still have deductibles, copays, and coinsurance. Medicare Supplement plans and Part D plans have additional premiums.",
  },
  {
    question: "When should I sign up for Medicare?",
    answer:
      "Most people should enroll during their Initial Enrollment Period — the 7-month window around their 65th birthday. If you're still working and have employer coverage, you may be able to delay enrollment without penalty, but you should consult with a licensed agent to understand your options.",
  },
  {
    question: "Do I need a referral to see a specialist?",
    answer:
      "With Original Medicare, no — you can see any specialist who accepts Medicare without a referral. With Medicare Advantage HMO plans, you typically need a referral from your primary care doctor. PPO plans usually allow specialist visits without referrals, though you may pay more out-of-network.",
  },
  {
    question: "What doesn't Medicare cover?",
    answer:
      "Original Medicare does not cover most dental, vision, or hearing services. It also doesn't cover long-term care (custodial care), cosmetic surgery, or care outside the United States (with limited exceptions). Many people add a Medicare Supplement plan or choose Medicare Advantage to fill these gaps.",
  },
  {
    question: "What is a Medicare Supplement (Medigap) plan?",
    answer:
      "A Medicare Supplement plan is a private insurance policy that helps pay for costs that Original Medicare doesn't cover — like the 20% coinsurance, deductibles, and excess charges. Plans are standardized by letter (A, B, C, D, F, G, K, L, M, N), with Plan G being the most popular for new enrollees.",
  },
  {
    question: "Can I have both Medicare Supplement and Medicare Advantage?",
    answer:
      "No. You cannot use a Medicare Supplement plan with a Medicare Advantage plan. You must choose one path: Original Medicare + Medigap, or Medicare Advantage. Each has its own pros and cons depending on your healthcare needs, budget, and preferences.",
  },
  {
    question: "What happens if I miss my enrollment period?",
    answer:
      "If you miss your Initial Enrollment Period and don't have qualifying coverage, you may face a late enrollment penalty — a permanent surcharge added to your monthly premiums. For Part B, the penalty is 10% for each 12-month period you could have had coverage but didn't. For Part D, it's 1% of the national base premium per month of delay.",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Medicare101() {
  useCMSSEO({
    contentType: "page",
    slug: "medicare-101",
    title: "Medicare101 | MedicareFAQ",
    description: "Medicare provides health insurance coverage for Americans over age 65 and individuals with qualified disabilities. Learn everything you need to know about Medicare.",
    canonical: "https://www.medicarefaq.com/medicare101/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicare-101.jpg",
    ogType: "article",
  });
  const [activeSection, setActiveSection] = useState("what-is-medicare");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    tableOfContents.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation — Desktop */}
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar />
        <HeaderBar />
        <MegaMenu />
      </header>

      {/* Navigation — Mobile */}
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0B1F3F] text-white py-20 lg:py-28 relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="max-w-6xl mx-auto px-4 relative">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm text-slate-400 mb-8"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Medicare 101 Guide</span>
            </motion.nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-teal-400" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase">
                Beginner's Guide
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6"
            >
              Medicare 101: Everything
              <br className="hidden lg:block" />
              You Need to Know
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8"
            >
              Your complete guide to understanding Medicare — from the four parts
              of coverage to enrollment periods, costs, and choosing the right
              plan for your needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#four-parts"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:8883358996"
                className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Talk to an Agent
              </a>
            </motion.div>
          </div>
        </section>

        {/* Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="flex gap-12 lg:gap-16">
            {/* Sticky Table of Contents — Desktop */}
            <aside className="hidden xl:block w-64 shrink-0">
              <nav className="sticky top-40">
                <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">
                  In This Guide
                </h3>
                <ul className="space-y-1">
                  {tableOfContents.map(({ id, label }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`block text-sm py-2 px-3 rounded-lg transition-all ${
                          activeSection === id
                            ? "bg-teal-50 text-teal-700 font-medium"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Need Help?
                  </p>
                  <p className="text-sm text-slate-600 mb-3">
                    Our licensed agents can answer your Medicare questions at no cost.
                  </p>
                  <a
                    href="tel:8883358996"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700"
                  >
                    <Phone className="w-4 h-4" />
                    (888) 335-8996
                  </a>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* Section: What Is Medicare? */}
              <section id="what-is-medicare" className="mb-20">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={0}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                    What Is Medicare?
                  </h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                    <p>
                      Medicare is the federal health insurance program for Americans
                      aged 65 and older, as well as certain younger individuals with
                      disabilities or specific medical conditions. Signed into law by
                      President Lyndon B. Johnson in 1965, Medicare has provided
                      healthcare coverage to millions of Americans for over 50 years.
                    </p>
                    <p>
                      <strong className="text-slate-800">Original Medicare</strong> consists of two
                      parts: <strong className="text-slate-800">Part A</strong> (hospital insurance) and{" "}
                      <strong className="text-slate-800">Part B</strong> (medical insurance). Together,
                      they cover a wide range of inpatient and outpatient services. With
                      Original Medicare, you can visit any doctor or hospital in the
                      country that accepts Medicare — no referrals or prior
                      authorizations required.
                    </p>
                    <p>
                      However, Original Medicare doesn't cover everything. It leaves
                      you responsible for 20% of outpatient costs with no annual
                      out-of-pocket maximum. That's why many beneficiaries add
                      supplemental coverage — either a{" "}
                      <strong className="text-slate-800">Medicare Supplement (Medigap)</strong> plan or
                      a <strong className="text-slate-800">Medicare Advantage (Part C)</strong> plan —
                      to help manage costs and fill coverage gaps.
                    </p>
                  </div>

                  {/* Key stats bar */}
                  <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Americans Covered", value: "67M+" },
                      { label: "Established", value: "1965" },
                      { label: "Parts of Medicare", value: "4" },
                      { label: "Doctors Accept It", value: "97%" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-slate-50 rounded-xl p-4 text-center"
                      >
                        <p className="text-2xl font-bold text-slate-900">{value}</p>
                        <p className="text-xs text-slate-500 mt-1">{label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* Section: The Four Parts */}
              <section id="four-parts" className="mb-20">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={0}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                    The Four Parts of Medicare
                  </h2>
                  <p className="text-lg text-slate-500 mb-10">
                    Medicare is divided into four distinct parts, each covering
                    different aspects of your healthcare needs.
                  </p>
                </motion.div>

                <div className="space-y-8">
                  {medicareParts.map((part, i) => (
                    <motion.div
                      key={part.part}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={fadeUp}
                      custom={i}
                      className="border border-slate-200 rounded-2xl overflow-hidden"
                    >
                      {/* Part header */}
                      <div className={`${part.color} px-6 py-4 flex items-center gap-3`}>
                        <part.icon className="w-5 h-5 text-white" />
                        <h3 className="text-lg font-bold text-white">
                          {part.part}: {part.title}
                        </h3>
                      </div>

                      <div className="p-6">
                        <p className="text-slate-600 leading-relaxed mb-6">
                          {part.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          {/* What it covers */}
                          <div>
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              What It Covers
                            </h4>
                            <ul className="space-y-2">
                              {part.covers.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm text-slate-600"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* What it doesn't cover */}
                          <div>
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
                              <XCircle className="w-4 h-4 text-red-500" />
                              What It Doesn't Cover
                            </h4>
                            <ul className="space-y-2">
                              {part.doesNotCover.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm text-slate-600"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Cost info */}
                        <div className={`${part.lightBg} rounded-xl p-4`}>
                          <p className="text-sm">
                            <span className={`font-semibold ${part.lightText}`}>
                              <DollarSign className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                              Cost:
                            </span>{" "}
                            <span className="text-slate-600">{part.cost}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Section: Eligibility */}
              <section id="eligibility" className="mb-20">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={0}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                    Who Is Eligible for Medicare?
                  </h2>
                  <p className="text-lg text-slate-500 mb-8">
                    Most Americans become eligible at age 65, but there are other
                    qualifying circumstances.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        icon: Users,
                        title: "Age 65 or Older",
                        description:
                          "U.S. citizens and permanent residents who have lived in the U.S. for at least 5 consecutive years are eligible for Medicare at age 65.",
                      },
                      {
                        icon: Heart,
                        title: "Under 65 with Disabilities",
                        description:
                          "If you've been receiving Social Security Disability Insurance (SSDI) benefits for at least 24 months, you automatically qualify for Medicare regardless of age.",
                      },
                      {
                        icon: Stethoscope,
                        title: "End-Stage Renal Disease (ESRD)",
                        description:
                          "Individuals diagnosed with permanent kidney failure requiring dialysis or a kidney transplant are eligible for Medicare at any age.",
                      },
                      {
                        icon: Shield,
                        title: "Amyotrophic Lateral Sclerosis (ALS)",
                        description:
                          "Individuals diagnosed with ALS (Lou Gehrig's disease) automatically qualify for Medicare as soon as their SSDI benefits begin — no 24-month waiting period.",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUp}
                        custom={i}
                        className="flex gap-4 p-5 bg-slate-50 rounded-xl"
                      >
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Documents needed */}
                  <div className="mt-8 border border-amber-200 bg-amber-50 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-1">
                          Documents You'll Need to Apply
                        </h4>
                        <p className="text-sm text-amber-800">
                          To apply for Medicare, you'll need proof of U.S. citizenship
                          or legal residency, a birth certificate, and your driver's
                          license or state-issued ID. You can apply online at
                          ssa.gov, by phone, or in person at your local Social
                          Security office.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* Section: Enrollment Periods */}
              <section id="enrollment" className="mb-20">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={0}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                    Medicare Enrollment Periods
                  </h2>
                  <p className="text-lg text-slate-500 mb-10">
                    Understanding when you can enroll is just as important as
                    understanding what Medicare covers. Missing your window can
                    result in lifelong penalties.
                  </p>
                </motion.div>

                <div className="space-y-6">
                  {enrollmentPeriods.map((period, i) => (
                    <motion.div
                      key={period.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={fadeUp}
                      custom={i}
                      className="border border-slate-200 rounded-xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                          <period.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">
                            {period.title}
                          </h3>
                          <p className="text-sm font-medium text-teal-600 mb-3">
                            {period.timing}
                          </p>
                          <p className="text-slate-600 leading-relaxed mb-4">
                            {period.description}
                          </p>
                          <div className="bg-teal-50 rounded-lg p-3">
                            <p className="text-sm text-teal-800">
                              <strong>Pro Tip:</strong> {period.tip}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Section: Costs & Premiums */}
              <section id="costs" className="mb-20">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={0}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                    Medicare Costs & Premiums in 2026
                  </h2>
                  <p className="text-lg text-slate-500 mb-8">
                    Here's a snapshot of the key costs you can expect with
                    Original Medicare in 2026.
                  </p>

                  {/* Cost comparison table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#0B1F3F] text-white">
                          <th className="text-left py-3 px-4 text-sm font-semibold rounded-tl-xl">
                            Cost Type
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold">
                            Part A
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold rounded-tr-xl">
                            Part B
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Monthly Premium", "$0 for most*", "$185.00"],
                          ["Annual Deductible", "$1,676 per benefit period", "$257"],
                          ["Coinsurance", "$0 for first 60 days", "20% of approved amount"],
                          ["Out-of-Pocket Max", "No limit", "No limit"],
                        ].map(([type, partA, partB], i) => (
                          <tr
                            key={type}
                            className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                          >
                            <td className="py-3 px-4 text-sm font-medium text-slate-800">
                              {type}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600">
                              {partA}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600">
                              {partB}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">
                    *Part A is premium-free if you or your spouse paid Medicare
                    taxes for at least 40 quarters (10 years). Higher-income
                    earners may pay more for Part B (IRMAA surcharge).
                  </p>

                  {/* Cost gap callout */}
                  <div className="mt-8 bg-rose-50 border border-rose-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-rose-900 mb-1">
                          The 20% Gap
                        </h4>
                        <p className="text-sm text-rose-800 leading-relaxed">
                          Original Medicare covers 80% of approved outpatient
                          costs — leaving you responsible for the remaining 20%
                          with <strong>no annual out-of-pocket maximum</strong>.
                          For a $100,000 surgery, that's $20,000 out of your
                          pocket. This is why most beneficiaries add a Medicare
                          Supplement plan or choose Medicare Advantage.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* Section: Supplement vs. Advantage */}
              <section id="supplement-vs-advantage" className="mb-20">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={0}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                    Medicare Supplement vs. Medicare Advantage
                  </h2>
                  <p className="text-lg text-slate-500 mb-8">
                    The two main paths to supplementing your Original Medicare
                    coverage. Here's how they compare.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#0B1F3F] text-white">
                          <th className="text-left py-3 px-4 text-sm font-semibold rounded-tl-xl">
                            Feature
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold">
                            Medicare Supplement
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold rounded-tr-xl">
                            Medicare Advantage
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          [
                            "How It Works",
                            "Supplements Original Medicare — pays what Medicare doesn't",
                            "Replaces Original Medicare — private insurer manages your benefits",
                          ],
                          [
                            "Doctor Network",
                            "Any doctor that accepts Medicare nationwide",
                            "Usually limited to plan's network (HMO/PPO)",
                          ],
                          [
                            "Monthly Premium",
                            "Higher (varies by plan, age, location)",
                            "Often $0 (you still pay Part B premium)",
                          ],
                          [
                            "Out-of-Pocket Costs",
                            "Low to none (Plan G covers nearly everything)",
                            "Copays, coinsurance at time of service",
                          ],
                          [
                            "Out-of-Pocket Max",
                            "Effectively $0 with comprehensive plans",
                            "Required by law (varies by plan)",
                          ],
                          [
                            "Prescription Drugs",
                            "Requires separate Part D plan",
                            "Usually included",
                          ],
                          [
                            "Extra Benefits",
                            "Not included",
                            "Often includes dental, vision, hearing, fitness",
                          ],
                          [
                            "Referrals Needed",
                            "No",
                            "Yes (HMO) / No (PPO)",
                          ],
                          [
                            "Best For",
                            "Those who want predictable costs and nationwide access",
                            "Those who want lower premiums and bundled benefits",
                          ],
                        ].map(([feature, supplement, advantage], i) => (
                          <tr
                            key={feature}
                            className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                          >
                            <td className="py-3 px-4 text-sm font-medium text-slate-800">
                              {feature}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600">
                              {supplement}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600">
                              {advantage}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/faqs/medicare-supplement-vs-medicare-advantage-crucial-questions-to-ask-before-enrolling"
                      className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-5 py-3 rounded-lg transition-colors text-sm"
                    >
                      Read Full Comparison
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </section>

              {/* Section: FAQs */}
              <section id="faqs" className="mb-20">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={0}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-slate-500 mb-8">
                    Quick answers to the most common Medicare questions.
                  </p>
                </motion.div>

                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={fadeUp}
                      custom={i}
                      className="border border-slate-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                          <span className="font-medium text-slate-800">
                            {faq.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                            openFaq === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 pt-0">
                          <div className="pl-8 text-slate-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Section: Next Steps */}
              <section id="next-steps">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={0}
                  className="bg-[#0B1F3F] rounded-2xl p-8 lg:p-12 text-white"
                >
                  <h2 className="text-3xl font-bold mb-4 tracking-tight">
                    Ready to Find the Right Medicare Plan?
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-8 max-w-2xl">
                    Understanding Medicare is the first step. The next step is
                    finding the plan that fits your specific healthcare needs and
                    budget. Our licensed agents can compare plans from top
                    carriers in your area — at no cost to you.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="tel:8883358996"
                      className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call (888) 335-8996
                    </a>
                    <Link
                      href="/faqs"
                      className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                      Browse All FAQs
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 grid sm:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Shield,
                        label: "Licensed in 48 States",
                      },
                      {
                        icon: Users,
                        label: "60,000+ Clients Served",
                      },
                      {
                        icon: Star,
                        label: "5.0 Satisfaction Rating",
                      },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-teal-400" />
                        <span className="text-sm text-slate-300">{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
