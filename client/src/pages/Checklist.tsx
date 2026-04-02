/**
 * Getting Started Checklist Page
 * Design: Interactive checklist with progress tracking,
 * step-by-step guidance, and printable format.
 */

import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  ChevronDown,
  Phone,
  ArrowRight,
  Printer,
  Download,
  Calendar,
  FileText,
  Shield,
  Heart,
  DollarSign,
  Pill,
  Users,
  Clock,
  AlertTriangle,
  Star,
  BookOpen,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  details?: string;
  link?: { label: string; href: string };
  priority: "essential" | "recommended" | "optional";
}

interface ChecklistPhase {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  items: ChecklistItem[];
}

const phases: ChecklistPhase[] = [
  {
    id: "learn",
    title: "Phase 1: Learn the Basics",
    subtitle: "Understand how Medicare works before making decisions",
    icon: BookOpen,
    color: "bg-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    items: [
      {
        id: "learn-parts",
        title: "Understand the 4 parts of Medicare",
        description: "Learn what Part A (hospital), Part B (medical), Part C (Advantage), and Part D (drugs) each cover.",
        details: "Part A and Part B together are called 'Original Medicare.' Part C (Medicare Advantage) is an alternative to Original Medicare offered by private insurers. Part D covers prescription drugs.",
        link: { label: "Read Medicare 101 Guide", href: "/medicare-101" },
        priority: "essential",
      },
      {
        id: "learn-original-vs-advantage",
        title: "Understand Original Medicare vs. Medicare Advantage",
        description: "These are two different paths — you'll choose one or the other. Know the pros and cons of each.",
        details: "Original Medicare + Medigap gives you nationwide access to any Medicare-accepting provider with predictable costs. Medicare Advantage uses networks but often includes extra benefits like dental, vision, and hearing.",
        priority: "essential",
      },
      {
        id: "learn-medigap",
        title: "Learn about Medigap (Medicare Supplement) plans",
        description: "If you choose Original Medicare, Medigap fills the coverage gaps. Plans are standardized by letter.",
        details: "Plan G is the most popular Medigap plan. It covers nearly all out-of-pocket costs except the Part B annual deductible ($257 in 2026). Plan N is a lower-premium alternative with small copays.",
        priority: "essential",
      },
      {
        id: "learn-costs",
        title: "Review 2026 Medicare costs",
        description: "Know the premiums, deductibles, and out-of-pocket costs you'll be responsible for.",
        link: { label: "See 2026 Cost Breakdown", href: "/new-to-medicare/costs" },
        priority: "essential",
      },
    ],
  },
  {
    id: "prepare",
    title: "Phase 2: Prepare Your Information",
    subtitle: "Gather documents and review your current situation",
    icon: FileText,
    color: "bg-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    items: [
      {
        id: "prep-ss",
        title: "Check your Social Security status",
        description: "If you're already receiving Social Security, you'll be auto-enrolled in Parts A & B. If not, you'll need to sign up manually.",
        details: "Create or log into your my Social Security account at ssa.gov to check your status and enrollment options.",
        priority: "essential",
      },
      {
        id: "prep-employer",
        title: "Review your current health insurance",
        description: "If you have employer coverage, understand how it coordinates with Medicare and whether you need to enroll now.",
        details: "If your employer has 20+ employees, your employer plan is primary and you can delay Medicare Part B without penalty. If fewer than 20 employees, Medicare is primary and you should enroll at 65.",
        priority: "essential",
      },
      {
        id: "prep-medications",
        title: "Make a list of your current medications",
        description: "You'll need this to compare Part D plans and ensure your drugs are covered at the lowest cost.",
        details: "Include the drug name, dosage, frequency, and pharmacy you use. You can use Medicare.gov's Plan Finder tool to compare Part D plans based on your specific medications.",
        priority: "essential",
      },
      {
        id: "prep-doctors",
        title: "List your current doctors and specialists",
        description: "If you're considering Medicare Advantage, you'll need to verify your providers are in-network.",
        details: "With Original Medicare + Medigap, you can see any doctor who accepts Medicare (over 97% do). With Medicare Advantage, you're typically limited to the plan's provider network.",
        priority: "recommended",
      },
      {
        id: "prep-budget",
        title: "Set a monthly healthcare budget",
        description: "Determine how much you can afford for premiums, copays, and out-of-pocket costs.",
        details: "Consider both monthly premiums and potential out-of-pocket costs. A lower premium plan may cost more when you need care. A higher premium plan (like Medigap) provides more predictable costs.",
        priority: "recommended",
      },
    ],
  },
  {
    id: "enroll",
    title: "Phase 3: Enroll in Medicare",
    subtitle: "Sign up for coverage during your enrollment window",
    icon: Calendar,
    color: "bg-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    items: [
      {
        id: "enroll-ab",
        title: "Enroll in Medicare Part A and Part B",
        description: "Sign up online at ssa.gov, by calling 1-800-772-1213, or at your local Social Security office.",
        details: "Your Initial Enrollment Period (IEP) is a 7-month window: 3 months before your 65th birthday month, your birthday month, and 3 months after. Enroll in the first 3 months for the earliest coverage start date.",
        link: { label: "View Enrollment Timeline", href: "/new-to-medicare/turning-65" },
        priority: "essential",
      },
      {
        id: "enroll-path",
        title: "Choose your coverage path",
        description: "Decide between Original Medicare + Medigap + Part D, or Medicare Advantage (Part C).",
        details: "This is the most important decision you'll make. Consider your health needs, preferred doctors, budget, travel habits, and risk tolerance. Our licensed agents can help you compare options at no cost.",
        priority: "essential",
      },
      {
        id: "enroll-supplement",
        title: "Enroll in supplemental coverage",
        description: "If choosing Original Medicare, apply for a Medigap plan during your 6-month Open Enrollment Period.",
        details: "Your Medigap OEP starts the month your Part B begins. During this window, insurers cannot deny you or charge more for pre-existing conditions. After this window closes, you may face medical underwriting.",
        priority: "essential",
      },
      {
        id: "enroll-partd",
        title: "Enroll in a Part D prescription drug plan",
        description: "If you chose Original Medicare + Medigap, you'll need a standalone Part D plan for drug coverage.",
        details: "Use Medicare.gov's Plan Finder to compare Part D plans in your area based on your medications. If you chose Medicare Advantage, drug coverage is usually included in your plan.",
        priority: "essential",
      },
    ],
  },
  {
    id: "setup",
    title: "Phase 4: Set Up Your Coverage",
    subtitle: "Get everything in order once you're enrolled",
    icon: Shield,
    color: "bg-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    items: [
      {
        id: "setup-card",
        title: "Receive and review your Medicare card",
        description: "Your red, white, and blue Medicare card will arrive in the mail. Verify the information is correct.",
        priority: "essential",
      },
      {
        id: "setup-mymedicare",
        title: "Create your MyMedicare.gov account",
        description: "Access your claims, coverage details, preventive services schedule, and plan information online.",
        priority: "recommended",
      },
      {
        id: "setup-welcome",
        title: "Schedule your 'Welcome to Medicare' preventive visit",
        description: "A free one-time visit within the first 12 months of Part B. Includes health risk assessment and referrals.",
        details: "This is different from your Annual Wellness Visit (which you can get every year after your first 12 months). Both are covered at 100% with no deductible or copay.",
        priority: "recommended",
      },
      {
        id: "setup-notify",
        title: "Notify your previous insurer",
        description: "Coordinate the end date of your old coverage with the start date of your Medicare coverage to avoid gaps or double-paying.",
        priority: "essential",
      },
      {
        id: "setup-dental",
        title: "Consider standalone dental, vision, and hearing coverage",
        description: "Original Medicare doesn't cover routine dental, vision, or hearing. You may want to add separate policies.",
        details: "Medicare Advantage plans often include these benefits. If you chose Original Medicare + Medigap, you'll need to purchase separate dental/vision/hearing policies or pay out-of-pocket.",
        priority: "optional",
      },
    ],
  },
  {
    id: "maintain",
    title: "Phase 5: Maintain Your Coverage",
    subtitle: "Stay on top of your Medicare year after year",
    icon: Star,
    color: "bg-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    items: [
      {
        id: "maintain-aep",
        title: "Review your coverage every fall during AEP",
        description: "The Annual Enrollment Period (Oct 15 – Dec 7) is your chance to switch Medicare Advantage or Part D plans.",
        details: "Plans change their formularies, networks, premiums, and benefits every year. Even if you're happy with your current plan, review the Annual Notice of Change (ANOC) letter to see what's different.",
        priority: "essential",
      },
      {
        id: "maintain-wellness",
        title: "Schedule your Annual Wellness Visit",
        description: "A free yearly visit to review your health, update your prevention plan, and screen for cognitive issues.",
        priority: "recommended",
      },
      {
        id: "maintain-preventive",
        title: "Use your free preventive services",
        description: "Medicare covers many screenings, vaccinations, and preventive services at no cost. Take advantage of them.",
        priority: "recommended",
      },
      {
        id: "maintain-scams",
        title: "Watch out for Medicare fraud and scams",
        description: "Never share your Medicare number with unsolicited callers. Medicare will never call you to sell plans or ask for payment over the phone.",
        priority: "essential",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Checklist() {
  useSEO({
    title: "Medicare Enrollment Checklist | Steps to Enroll in Medicare | MedicareFAQ",
    description: "Use our Medicare enrollment checklist to make sure you don't miss any important steps when signing up for Medicare. Get ready for coverage in minutes.",
    canonical: "https://www.medicarefaq.com/medicare-enrollment/checklist/",
    ogImage: OG_DEFAULT,
    ogType: "article",
  });
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("medicare-checklist");
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activePhase, setActivePhase] = useState("learn");

  useEffect(() => {
    localStorage.setItem("medicare-checklist", JSON.stringify(Array.from(checked)));
  }, [checked]);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = phases.length - 1; i >= 0; i--) {
        const el = document.getElementById(phases[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActivePhase(phases[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalItems = phases.reduce((sum, p) => sum + p.items.length, 0);
  const completedItems = checked.size;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  const getPhaseProgress = (phase: ChecklistPhase) => {
    const completed = phase.items.filter((item) => checked.has(item.id)).length;
    return { completed, total: phase.items.length };
  };

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/medicare-101" className="hover:text-white transition-colors">New to Medicare</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-purple-300">Getting Started Checklist</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-300" />
            </div>
            <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Interactive Checklist</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Your Medicare Getting Started Checklist
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            A step-by-step checklist to guide you through learning about, enrolling in, and setting up your Medicare coverage. Check items off as you go — your progress is saved automatically.
          </p>

          {/* Progress bar */}
          <div className="max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">Your Progress</span>
              <span className="text-sm font-bold text-white">{completedItems} of {totalItems} completed ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 to-teal-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex gap-12">
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Phases</p>
              <nav className="space-y-1">
                {phases.map((phase) => {
                  const progress = getPhaseProgress(phase);
                  return (
                    <a
                      key={phase.id}
                      href={`#${phase.id}`}
                      className={`block text-sm py-2 pl-3 border-l-2 transition-colors ${
                        activePhase === phase.id
                          ? "border-purple-500 text-purple-700 font-medium"
                          : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{phase.title.replace(/Phase \d: /, "")}</span>
                        <span className="text-xs text-slate-400 ml-1">{progress.completed}/{progress.total}</span>
                      </div>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-8 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-sm font-semibold text-purple-800 mb-2">Need Help?</p>
                <p className="text-xs text-purple-700 mb-3">Our licensed agents can walk you through every step.</p>
                <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900">
                  <Phone className="w-4 h-4" /> (888) 335-8996
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {phases.map((phase) => {
              const progress = getPhaseProgress(phase);
              const isComplete = progress.completed === progress.total;

              return (
                <section key={phase.id} id={phase.id} className="mb-16 scroll-mt-24">
                  {/* Phase Header */}
                  <div className="flex items-start gap-4 mb-2">
                    <div className={`w-12 h-12 rounded-xl ${phase.color} flex items-center justify-center shrink-0`}>
                      <phase.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{phase.title}</h2>
                        {isComplete && (
                          <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500">{phase.subtitle}</p>
                    </div>
                  </div>

                  {/* Phase progress */}
                  <div className="ml-0 md:ml-16 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${phase.color}`}
                          style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                        />
                      </div>
                      <span>{progress.completed}/{progress.total}</span>
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-3 ml-0 md:ml-16">
                    {phase.items.map((item) => {
                      const isChecked = checked.has(item.id);
                      const isExpanded = expandedItems.has(item.id);

                      return (
                        <div
                          key={item.id}
                          className={`${phase.bgColor} ${phase.borderColor} border rounded-xl overflow-hidden transition-all ${
                            isChecked ? "opacity-75" : ""
                          }`}
                        >
                          <div className="p-5">
                            <div className="flex items-start gap-3">
                              <button
                                onClick={() => toggleCheck(item.id)}
                                className="mt-0.5 shrink-0 transition-transform hover:scale-110"
                              >
                                {isChecked ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                                ) : (
                                  <Circle className="w-6 h-6 text-slate-300" />
                                )}
                              </button>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`font-bold ${isChecked ? "text-slate-500 line-through" : "text-slate-900"}`}>
                                    {item.title}
                                  </h3>
                                  <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                                    item.priority === "essential"
                                      ? "bg-red-100 text-red-700"
                                      : item.priority === "recommended"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-slate-100 text-slate-500"
                                  }`}>
                                    {item.priority}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600 mb-2">{item.description}</p>

                                {(item.details || item.link) && (
                                  <button
                                    onClick={() => toggleExpand(item.id)}
                                    className="text-xs font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1"
                                  >
                                    {isExpanded ? "Show less" : "Learn more"}
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                  </button>
                                )}
                              </div>
                            </div>

                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-3 ml-9 pl-4 border-l-2 border-slate-200"
                              >
                                {item.details && (
                                  <p className="text-sm text-slate-600 mb-3">{item.details}</p>
                                )}
                                {item.link && (
                                  <Link
                                    href={item.link.href}
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-800"
                                  >
                                    {item.link.label} <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                )}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* CTA */}
            <section className="scroll-mt-24">
              <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-slate-300 mb-8 max-w-xl">
                  Our licensed Medicare agents can help you work through this checklist, compare plans in your area, and find the best coverage for your needs — at no cost to you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Call (888) 335-8996
                  </a>
                  <Link href="/medicare-101" className="inline-flex items-center gap-2 border border-slate-500 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Back to Medicare 101 <ArrowRight className="w-4 h-4" />
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
