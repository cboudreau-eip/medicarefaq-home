/**
 * Guides Landing Page — /library/guides
 * Design: Indigo accent (#4F46E5) matching Medicare Library section identity.
 * Educational resource hub with guide cards linking to existing content pages.
 */

import { useEffect } from "react";
import { Link } from "wouter";
import {
  FileText,
  ChevronDown,
  ArrowRight,
  Phone,
  BookOpen,
  Shield,
  DollarSign,
  Calendar,
  Heart,
  Users,
  Pill,
  CheckCircle2,
  Clock,
  Star,
  Download,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const featuredGuides = [
  {
    title: "Medicare Supplement Guide 2026",
    description: "A comprehensive guide to all 12 Medigap plan letters, what they cover, how they're priced, and how to choose the right one for your needs and budget.",
    icon: Shield,
    category: "Medigap",
    readTime: "15 min read",
    href: "/medicare-plans/medicare-supplement",
    color: "#7C3AED",
    topics: ["Plan comparison (A through N)", "How pricing works", "Best plans for most people", "When to enroll"],
  },
  {
    title: "Understanding Medicare Costs in 2026",
    description: "Everything you need to know about Medicare premiums, deductibles, coinsurance, and out-of-pocket maximums for 2026 — plus strategies to minimize your costs.",
    icon: DollarSign,
    category: "Costs",
    readTime: "12 min read",
    href: "/faqs/medicare-costs-in-2026-premiums-deductibles-and-key-changes",
    color: "#059669",
    topics: ["Part A & B premiums", "Deductibles & coinsurance", "IRMAA surcharges", "Cost-saving strategies"],
  },
  {
    title: "When to Enroll in Medicare",
    description: "Your complete enrollment timeline — from your Initial Enrollment Period to Special Enrollment Periods, Annual Enrollment, and everything in between.",
    icon: Calendar,
    category: "Enrollment",
    readTime: "10 min read",
    href: "/enrollment/turning-65",
    color: "#D97706",
    topics: ["Initial Enrollment Period", "Special Enrollment Periods", "Annual Enrollment Period", "Avoiding late penalties"],
  },
  {
    title: "Medicare vs. Medicaid",
    description: "These two programs sound similar but work very differently. Learn who qualifies for each, what they cover, and whether you can have both at the same time.",
    icon: Users,
    category: "Basics",
    readTime: "8 min read",
    href: "/medicare-101",
    color: "#0891B2",
    topics: ["Eligibility differences", "Coverage comparison", "Dual eligibility", "How they coordinate"],
  },
];

const topicGuides = [
  {
    title: "Original Medicare Explained",
    description: "How Parts A and B work together to cover hospital and medical services.",
    icon: Shield,
    href: "/medicare-plans/original-medicare",
    category: "Medicare Basics",
  },
  {
    title: "Medicare Advantage Guide",
    description: "How Part C plans bundle your coverage and what to watch for.",
    icon: Heart,
    href: "/medicare-plans/medicare-advantage",
    category: "Plan Types",
  },
  {
    title: "Part D Prescription Drug Guide",
    description: "Understanding formularies, coverage stages, and choosing the right drug plan.",
    icon: Pill,
    href: "/medicare-plans/part-d",
    category: "Prescriptions",
  },
  {
    title: "Medigap vs. Medicare Advantage",
    description: "The crucial differences and questions to ask before choosing a path.",
    icon: BookOpen,
    href: "/faqs/medicare-supplement-vs-medicare-advantage-crucial-questions-to-ask-before-enrolling",
    category: "Comparison",
  },
  {
    title: "Medicare Eligibility Guide",
    description: "Who qualifies, when you become eligible, and special circumstances.",
    icon: CheckCircle2,
    href: "/new-to-medicare/eligibility",
    category: "Getting Started",
  },
  {
    title: "Working Past 65 Guide",
    description: "How employer coverage coordinates with Medicare and when to enroll.",
    icon: Clock,
    href: "/enrollment/working-past-65",
    category: "Enrollment",
  },
  {
    title: "Medicare Supplement Plan Comparison",
    description: "Side-by-side comparison of the most popular Medigap plans.",
    icon: Star,
    href: "/medicare-plans/best-supplement-plans",
    category: "Medigap",
  },
  {
    title: "Compare All Medicare Plans",
    description: "Original Medicare, Medigap, Medicare Advantage, and Part D compared.",
    icon: FileText,
    href: "/medicare-plans/compare",
    category: "Comparison",
  },
  {
    title: "Late Enrollment Penalties",
    description: "How penalties are calculated and strategies to avoid them.",
    icon: DollarSign,
    href: "/enrollment/late-penalties",
    category: "Enrollment",
  },
];

export default function Guides() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-violet-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-indigo-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-indigo-200/70">Medicare Library</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-indigo-100">Guides</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-indigo-200" />
            </div>
            <span className="text-sm font-semibold text-indigo-200 uppercase tracking-wider">Medicare Library</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Guides & Resources
          </h1>
          <p className="text-lg text-indigo-100/90 max-w-2xl mb-8">
            In-depth, expert-written guides that break down every aspect of Medicare. Whether you're new to Medicare or reviewing your options, start here.
          </p>
          <div className="flex items-center gap-6 text-sm text-indigo-200/80">
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {featuredGuides.length + topicGuides.length} Guides</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Written by Licensed Agents</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Updated for 2026</span>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Essential Reading</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
            Featured Guides
          </h2>
          <p className="text-slate-500 mb-10 max-w-2xl">
            Our most comprehensive resources, covering the topics that matter most to Medicare beneficiaries.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredGuides.map((guide, i) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={i}
                  href={guide.href}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${guide.color}12` }}>
                      <Icon className="w-6 h-6" style={{ color: guide.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: guide.color }}>{guide.category}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-400">{guide.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{guide.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{guide.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {guide.topics.map((topic, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                    Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Topic Guides */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
            Browse All Guides
          </h2>
          <p className="text-slate-500 mb-10 max-w-2xl">
            Explore our full library of Medicare guides organized by topic.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topicGuides.map((guide, i) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={i}
                  href={guide.href}
                  className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider">{guide.category}</span>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{guide.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">{guide.description}</p>
                  <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:text-indigo-700">
                    Read Guide <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-8 md:p-10 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Need Personalized Guidance?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-xl">
              Our licensed Medicare agents can walk you through your options, answer your questions, and help you find the right plan — all at no cost to you.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link href="/enrollment/how-to-enroll" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                How to Enroll <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
