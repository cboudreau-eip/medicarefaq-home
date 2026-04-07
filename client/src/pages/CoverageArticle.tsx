/**
 * Coverage Q&A Article Template
 * Design: Follows the Coverage Q&A wireframe — dark navy header with breadcrumbs,
 * Quick Answer box with coverage badges, Coverage Comparison table, plan-by-plan breakdowns,
 * cost comparison table, sticky TOC + Quick Reference sidebar, FAQ accordion,
 * related coverage topics, CTA banner, author bios
 * Clarity System design language
 */

import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import {
  Clock,
  User,
  Calendar,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Phone,
  ArrowRight,
  Shield,
  Heart,
  Users,
  HandHelping,
  Lightbulb,
  Info,
  ExternalLink,
  Bookmark,
  Search,
  DollarSign,
  FileText,
  Stethoscope,
  Ear,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

/* ─── Types ─── */
interface TOCItem {
  id: string;
  label: string;
}

/* ─── Table of Contents ─── */
const tableOfContents: TOCItem[] = [
  { id: "quick-answer", label: "Quick Answer" },
  { id: "coverage-comparison", label: "Coverage by Plan" },
  { id: "understanding-coverage", label: "Understanding Coverage" },
  { id: "medicare-advantage", label: "Medicare Advantage" },
  { id: "costs", label: "Costs & Pricing" },
  { id: "alternatives", label: "Alternatives" },
  { id: "related-equipment", label: "Related Equipment" },
  { id: "medicaid-programs", label: "Medicaid & State Programs" },
  { id: "making-decision", label: "Making the Decision" },
  { id: "faqs", label: "FAQs" },
  { id: "related-topics", label: "Related Topics" },
];

/* ─── FAQ Component ─── */
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F5F7FA] transition-colors"
      >
        <span className="font-semibold text-[#1B2A4A] text-[15px] pr-4">
          {question}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#6B7280] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#6B7280] shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 text-[#4B5563] text-[15px] leading-relaxed border-t border-[#E5E7EB]">
          <div className="pt-3">{answer}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Coverage Badge ─── */
function CoverageBadge({
  label,
  covered,
  partial,
}: {
  label: string;
  covered: boolean;
  partial?: boolean;
}) {
  if (partial) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <AlertTriangle className="w-3.5 h-3.5" />
        {label}: Some Plans
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
        covered
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      {covered ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <XCircle className="w-3.5 h-3.5" />
      )}
      {label}: {covered ? "Covered" : "Not Covered"}
    </span>
  );
}

/* ─── Plan Section Card ─── */
function PlanSection({
  icon: Icon,
  iconColor,
  title,
  coverageLabel,
  coverageType,
  children,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  coverageLabel: string;
  coverageType: "covered" | "not-covered" | "partial";
  children: React.ReactNode;
}) {
  const coverageBg =
    coverageType === "covered"
      ? "bg-emerald-50 text-emerald-700"
      : coverageType === "partial"
      ? "bg-amber-50 text-amber-700"
      : "bg-red-50 text-red-700";

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <Icon className="w-5 h-5" style={{ color: iconColor }} />
          </div>
          <h3 className="font-bold text-[#1B2A4A] text-lg">{title}</h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${coverageBg}`}
        >
          {coverageLabel}
        </span>
      </div>
      <div className="p-5 text-[#4B5563] text-[15px] leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function CoverageArticle() {
  useSEO({
    title: "Does Medicare Cover Life Alert? 2026 Cost & Coverage Guide | MedicareFAQ",
    description: "Is Life Alert cost covered by Medicare? Learn what Medicare pays for, what it does not cover, and typical medical alert system costs in 2026.",
    canonical: "https://www.medicarefaq.com/faqs/does-medicare-cover-medical-alert-systems/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/does-medicare-cover-wearable-alert-devices.jpg",
    ogType: "article",
  });
  const [activeSection, setActiveSection] = useState("");
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll spy for TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );

    tableOfContents.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
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
        {/* ─── Article Header ─── */}
        <section className="bg-[#1B2A4A] py-10 md:py-14">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Top bar label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                  Coverage Q&A
                </span>
                <span className="text-white/40 text-xs">
                  Integrated Template for "Does Medicare Cover X?" Pages
                </span>
              </div>

              {/* Breadcrumbs */}
              <nav className="text-sm text-white/50 mb-5 flex items-center gap-2 flex-wrap">
                <Link
                  href="/"
                  className="hover:text-white/80 transition-colors"
                >
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link
                  href="/faqs"
                  className="hover:text-white/80 transition-colors"
                >
                  FAQs
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link
                  href="/faqs"
                  className="hover:text-white/80 transition-colors"
                >
                  Medicare Coverage
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/70">
                  Does Medicare Cover Life Alert?
                </span>
              </nav>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white leading-tight mb-5">
                Does Medicare Cover Life Alert?
              </h1>
              <p className="text-white/60 text-lg max-w-3xl mb-6">
                2026 Cost & Coverage Guide
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Updated March 10, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Written By: David Haass
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Reviewed By: Ashlee Zareczny
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />7 min read
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Content + Sidebar ─── */}
        <section className="py-8 md:py-12">
          <div className="container max-w-6xl mx-auto">
            <div className="flex gap-8 lg:gap-10">
              {/* ─── Main Article Content ─── */}
              <article className="flex-1 min-w-0">
                {/* Quick Answer */}
                <div
                  id="quick-answer"
                  className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-[#D97706]" />
                    <h2 className="font-bold text-[#1B2A4A] text-lg">
                      Quick Answer
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <CoverageBadge label="Original Medicare" covered={false} />
                    <CoverageBadge
                      label="Medicare Advantage"
                      covered={false}
                      partial
                    />
                    <CoverageBadge label="Medigap" covered={false} />
                  </div>
                  <p className="text-[#4B5563] text-[15px] leading-relaxed">
                    <strong>No, Original Medicare does not cover Life Alert</strong>{" "}
                    or personal emergency response systems. Medicare classifies
                    medical alert systems as convenience items rather than medically
                    necessary equipment. However, some{" "}
                    <strong>Medicare Advantage plans</strong> may include medical
                    alert benefits as supplemental services, though coverage varies
                    by plan and location.
                  </p>
                </div>

                {/* Coverage Comparison Table */}
                <div
                  id="coverage-comparison"
                  className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-8 shadow-sm"
                >
                  <div className="bg-[#1B2A4A] px-6 py-4 flex items-center gap-3">
                    <BarChartIcon className="w-5 h-5 text-white" />
                    <h2 className="font-bold text-white text-lg">
                      Coverage Comparison by Plan Type
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#F5F7FA] border-b border-[#E5E7EB]">
                          <th className="text-left px-6 py-3 font-semibold text-[#1B2A4A]">
                            Plan Type
                          </th>
                          <th className="text-center px-4 py-3 font-semibold text-[#1B2A4A]">
                            Medical Alert Coverage
                          </th>
                          <th className="text-left px-6 py-3 font-semibold text-[#1B2A4A]">
                            Notes
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#E5E7EB]">
                          <td className="px-6 py-4 font-medium text-[#1B2A4A]">
                            Original Medicare (Part A & B)
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex items-center gap-1 text-red-600 font-semibold text-xs">
                              <XCircle className="w-4 h-4" /> Not Covered
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#6B7280]">
                            Classified as convenience item, not medically necessary
                          </td>
                        </tr>
                        <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                          <td className="px-6 py-4 font-medium text-[#1B2A4A]">
                            Medicare Supplement (Medigap)
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex items-center gap-1 text-red-600 font-semibold text-xs">
                              <XCircle className="w-4 h-4" /> Not Covered
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#6B7280]">
                            Only covers what Original Medicare covers
                          </td>
                        </tr>
                        <tr className="border-b border-[#E5E7EB]">
                          <td className="px-6 py-4 font-medium text-[#1B2A4A]">
                            Medicare Advantage (Part C)
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-xs">
                              <AlertTriangle className="w-4 h-4" /> Sometimes
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#6B7280]">
                            Varies by plan and location; check supplemental benefits
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-[#1B2A4A]">
                            Medicaid (with Medicare)
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-xs">
                              <AlertTriangle className="w-4 h-4" /> Sometimes
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#6B7280]">
                            Varies by state; may be available through waiver programs
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Understanding Your Coverage Options */}
                <h2
                  id="understanding-coverage"
                  className="text-2xl font-bold text-[#1B2A4A] mb-6 mt-10"
                >
                  Understanding Your Coverage Options
                </h2>

                <div className="space-y-5 mb-10">
                  {/* Original Medicare */}
                  <PlanSection
                    icon={Shield}
                    iconColor="#1B2A4A"
                    title="Original Medicare (Part A & B)"
                    coverageLabel="Does NOT cover medical alerts"
                    coverageType="not-covered"
                  >
                    <p>
                      Original Medicare (Parts A and B) does not provide coverage
                      for medical alert systems or personal emergency response
                      devices. Beneficiaries are responsible for 100% of these
                      costs as Original Medicare classifies them as convenience
                      items rather than medically necessary equipment.
                    </p>
                    <p>
                      Medicare treats medical alert systems as convenience items
                      rather than medically necessary equipment. Medicare Part B
                      covers durable medical equipment that your doctor prescribes
                      for medical conditions, but personal emergency response
                      systems do not meet these requirements.
                    </p>
                    <p>
                      According to Medicare.gov, items that are primarily for
                      convenience or comfort, such as medical alert systems, are
                      excluded from coverage. The distinction matters because
                      Medicare focuses on treating medical conditions rather than
                      preventing potential emergencies.
                    </p>
                  </PlanSection>

                  {/* Medicare Advantage */}
                  <PlanSection
                    icon={Users}
                    iconColor="#059669"
                    title="Medicare Advantage (Part C)"
                    coverageLabel="Some plans offer benefits"
                    coverageType="partial"
                  >
                    <p>
                      Your best chance for Medicare-related coverage of medical
                      alert systems comes through Medicare Advantage plans. Many
                      Medicare Advantage insurers offer supplemental benefits that
                      go beyond what Original Medicare covers, and some include
                      medical alert devices as part of their wellness programs.
                    </p>
                    <p>
                      These benefits typically work in one of two ways: some plans
                      provide a specific medical alert device at no extra cost,
                      while others offer a monthly allowance that you can apply
                      toward the device of your choice.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-2">
                      <p className="text-sm text-amber-800">
                        <strong>Before enrolling:</strong> Coverage varies
                        significantly between plans and geographic areas. A Medicare
                        Advantage plan in Florida might offer comprehensive medical
                        alert benefits, while a similar plan in your state might
                        not. Review each plan's Summary of Benefits carefully.
                      </p>
                    </div>
                  </PlanSection>

                  {/* Medicare Supplement */}
                  <PlanSection
                    icon={Heart}
                    iconColor="#C41230"
                    title="Medicare Supplement (Medigap)"
                    coverageLabel="Does NOT cover medical alerts"
                    coverageType="not-covered"
                  >
                    <p>
                      Medicare Supplement plans (also known as Medigap) do not
                      cover medical alert systems. These policies only cover the
                      cost-sharing gaps in what Original Medicare covers. Because
                      Medicare does not cover medical alert systems, Medigap
                      policies do not cover them either.
                    </p>
                    <p>
                      You can, however, enroll in a separate insurance policy that
                      includes hearing, vision, and dental coverage, providing
                      coverage for the more significant gaps in Original Medicare.
                    </p>
                  </PlanSection>

                  {/* Medicaid */}
                  <PlanSection
                    icon={HandHelping}
                    iconColor="#7C3AED"
                    title="Medicaid & State Programs"
                    coverageLabel="Varies by state"
                    coverageType="partial"
                  >
                    <p>
                      If you qualify for Medicaid along with Medicare, you might
                      have additional options. Some state Medicaid programs include
                      personal emergency response systems as covered services,
                      especially for beneficiaries who want to remain in their homes
                      instead of moving to assisted living.
                    </p>
                    <p>
                      Medicaid waiver programs in many states specifically focus on
                      helping seniors age in place safely. These programs might
                      cover medical alert systems, home modifications, and other
                      services that support independent living.
                    </p>
                  </PlanSection>
                </div>

                {/* Medicare Advantage Details */}
                <h2
                  id="medicare-advantage"
                  className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10"
                >
                  How to Find Medicare Advantage Plans with Alert Benefits
                </h2>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-10 shadow-sm">
                  <ol className="space-y-4">
                    {[
                      "Gather a list of Medicare Advantage plans available in your area using the Medicare Plan Finder tool or by contacting your local State Health Insurance Assistance Program (SHIP).",
                      "Review the Summary of Benefits for each plan, focusing on the \"supplemental benefits\" or \"wellness benefits\" sections.",
                      "Look specifically for mentions of medical alert systems, personal emergency response systems, or similar devices.",
                      "Contact the plan directly if you have questions about coverage details or device options.",
                      "Compare the benefits, costs, and provider networks before enrolling in a plan that meets your needs.",
                    ].map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="w-8 h-8 rounded-full bg-[#1B2A4A] text-white text-sm font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-[#4B5563] text-[15px] leading-relaxed pt-1">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Cost Comparison Table */}
                <div
                  id="costs"
                  className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-8 shadow-sm"
                >
                  <div className="bg-[#1B2A4A] px-6 py-4 flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-white" />
                    <h2 className="font-bold text-white text-lg">
                      Medical Alert System Costs at a Glance
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#F5F7FA] border-b border-[#E5E7EB]">
                          <th className="text-left px-6 py-3 font-semibold text-[#1B2A4A]">
                            Provider
                          </th>
                          <th className="text-left px-4 py-3 font-semibold text-[#1B2A4A]">
                            Monthly Fee
                          </th>
                          <th className="text-left px-4 py-3 font-semibold text-[#1B2A4A]">
                            Setup Fee
                          </th>
                          <th className="text-left px-4 py-3 font-semibold text-[#1B2A4A]">
                            Key Features
                          </th>
                          <th className="text-center px-4 py-3 font-semibold text-[#1B2A4A]">
                            Medicare Coverage
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            provider: "Life Alert",
                            monthly: "$50–$100",
                            setup: "$100–$200",
                            features: "24/7 monitoring, GPS, medication reminders",
                            covered: false,
                          },
                          {
                            provider: "Medical Guardian",
                            monthly: "$30–$50",
                            setup: "$0–$100",
                            features:
                              "Fall detection, mobile options, caregiver app",
                            covered: false,
                          },
                          {
                            provider: "Lively (GreatCall)",
                            monthly: "$25–$40",
                            setup: "$0–$50",
                            features:
                              "Mobile devices, health monitoring, GPS",
                            covered: false,
                          },
                          {
                            provider: "Philips Lifeline",
                            monthly: "$30–$60",
                            setup: "$50–$100",
                            features: "Home and mobile systems, auto alert",
                            covered: false,
                          },
                          {
                            provider: "Smartphone Apps",
                            monthly: "$0–$10",
                            setup: "$0",
                            features:
                              "Fall detection, emergency contacts, app-based",
                            covered: false,
                          },
                        ].map((row, i) => (
                          <tr
                            key={i}
                            className={`border-b border-[#E5E7EB] ${
                              i % 2 === 1 ? "bg-[#FAFAFA]" : ""
                            }`}
                          >
                            <td className="px-6 py-4 font-medium text-[#1B2A4A]">
                              {row.provider}
                            </td>
                            <td className="px-4 py-4 text-[#4B5563] font-semibold">
                              {row.monthly}
                            </td>
                            <td className="px-4 py-4 text-[#6B7280]">
                              {row.setup}
                            </td>
                            <td className="px-4 py-4 text-[#6B7280] text-xs">
                              {row.features}
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className="text-red-600 text-xs font-semibold">
                                Not covered
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-3 bg-[#F5F7FA] text-xs text-[#6B7280] border-t border-[#E5E7EB]">
                    Costs may vary by location, promotions, and selected features.
                    Prices as of 2026.
                  </div>
                </div>

                {/* Alternatives */}
                <h2
                  id="alternatives"
                  className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10"
                >
                  Alternative Medical Alert Systems
                </h2>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                  <p className="text-[#4B5563] text-[15px] leading-relaxed mb-4">
                    Life Alert is not the only medical alert system available, and
                    other companies offer similar services that Medicare also does
                    not cover. However, exploring alternatives might help you find
                    more affordable options that fit your budget better.
                  </p>
                  <p className="text-[#4B5563] text-[15px] leading-relaxed mb-4">
                    Companies like Medical Guardian, Lively (formerly GreatCall),
                    and Philips offer medical alert devices with various features
                    and price points. Some focus on basic emergency response, while
                    others include health monitoring, medication reminders, and
                    family communication features.
                  </p>
                  <p className="text-[#4B5563] text-[15px] leading-relaxed mb-4">
                    Smartphone-based medical alert apps represent another option
                    that costs significantly less than traditional systems. These
                    apps can detect falls, allow you to call for help, and notify
                    emergency contacts, though they require you to carry your phone
                    and keep it charged.
                  </p>

                  {/* What to look for */}
                  <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-5 mt-4">
                    <h4 className="font-bold text-[#1B2A4A] text-sm mb-3 flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#2563EB]" />
                      What to Look For When Comparing Systems
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Compare monthly and setup costs for each system",
                        "Check response times and the reliability of the monitoring center",
                        "Review coverage areas — does the device work inside and outside your home?",
                        "Assess battery life and whether the device is waterproof",
                        "Consider additional features like fall detection, medication reminders, or caregiver apps",
                        "Research the company's reputation and customer service quality",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[#4B5563] text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Related Equipment */}
                <h2
                  id="related-equipment"
                  className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10"
                >
                  When Medicare Might Cover Related Equipment
                </h2>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                  <p className="text-[#4B5563] text-[15px] leading-relaxed mb-4">
                    While Medicare does not cover medical alert systems, it does
                    cover certain medical equipment that might address some of your
                    safety concerns. Understanding what Medicare does cover can help
                    you make informed decisions about your overall safety plan.
                  </p>
                  <p className="text-[#4B5563] text-[15px] leading-relaxed mb-4">
                    Medicare covers durable medical equipment like hospital beds,
                    wheelchairs, walkers, and grab bars when your doctor prescribes
                    them for a medical condition. If you have mobility issues that
                    increase your fall risk, your doctor might prescribe equipment
                    that Medicare will cover.
                  </p>

                  {/* Important Exception Callout */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-800 text-sm mb-1">
                          Medicare-Covered Alternatives for Fall Prevention
                        </h4>
                        <p className="text-emerald-700 text-sm leading-relaxed">
                          Physical therapy and occupational therapy covered by
                          Medicare can help you improve balance and reduce fall
                          risk. These services address the underlying causes of fall
                          risk rather than just responding to emergencies after they
                          happen. Talk to your doctor about a referral.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medicaid & State Programs */}
                <h2
                  id="medicaid-programs"
                  className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10"
                >
                  Medicaid and State Programs
                </h2>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                  <p className="text-[#4B5563] text-[15px] leading-relaxed mb-4">
                    If you qualify for Medicaid along with Medicare, you might have
                    additional options for medical alert system coverage. Some state
                    Medicaid programs include personal emergency response systems as
                    covered services, especially for beneficiaries who want to
                    remain in their homes instead of moving to assisted living.
                  </p>
                  <p className="text-[#4B5563] text-[15px] leading-relaxed mb-4">
                    Veterans might qualify for medical alert system coverage through
                    VA benefits or veteran-specific programs. The VA sometimes
                    covers assistive technology and safety equipment for veterans
                    with service-connected disabilities.
                  </p>

                  <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-lg p-5 mt-4">
                    <h4 className="font-bold text-[#5B21B6] text-sm mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      How to Check Your State's Coverage
                    </h4>
                    <ol className="space-y-2">
                      {[
                        "Visit your state Medicaid office website or call their customer service line",
                        "Ask about coverage for personal emergency response systems or medical alert devices",
                        "Inquire about Medicaid waiver programs or aging-in-place services",
                        "Check if your state has specific programs for seniors that include safety equipment",
                      ].map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[#4B5563] text-sm"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Making the Decision */}
                <h2
                  id="making-decision"
                  className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10"
                >
                  Making the Decision Without Medicare Coverage
                </h2>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                  <p className="text-[#4B5563] text-[15px] leading-relaxed mb-4">
                    Since Medicare does not cover Life Alert or similar systems, you
                    need to decide whether the monthly cost fits your budget and
                    provides enough value for your situation. Consider your living
                    situation, health status, family support, and financial
                    resources when making this decision.
                  </p>

                  <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-5 mt-4">
                    <h4 className="font-bold text-[#92400E] text-sm mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Questions to Ask Yourself Before Buying
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Do I live alone or spend significant time alone?",
                        "Do I have mobility or balance issues?",
                        "Do I take medications that increase my risk of falls?",
                        "Is there family or support nearby who can check on me?",
                        "Can I afford the ongoing monthly costs?",
                        "Will I remember to wear or use the device consistently?",
                      ].map((q, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[#78350F] text-sm"
                        >
                          <span className="text-[#D97706] mt-1">•</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* FAQs */}
                <div id="faqs" className="mb-10 mt-10">
                  <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
                    <span className="text-[#D97706]">✦</span> Frequently Asked
                    Questions
                  </h2>
                  <div className="space-y-3">
                    <FAQItem
                      question="Does Medicare Advantage cover Life Alert better than Original Medicare?"
                      answer="Some Medicare Advantage plans include medical alert benefits as supplemental services, while Original Medicare does not cover these devices at all. However, coverage varies significantly between plans and locations, so you need to review each plan's benefits carefully."
                    />
                    <FAQItem
                      question="Can I use my Medicare savings account for Life Alert?"
                      answer="If you have a Medicare Medical Savings Account plan, you can use the account funds for Life Alert since you can spend the money on any qualified medical expense. However, these account balances are limited and you might prefer to save them for other medical costs."
                    />
                    <FAQItem
                      question="Will my Medicare supplement plan cover medical alert systems?"
                      answer="No, Medicare supplement plans only cover services that Original Medicare covers. Since Medicare does not cover medical alert systems, your Medigap policy will not provide coverage for these devices either."
                    />
                    <FAQItem
                      question="Are there any tax deductions for medical alert systems?"
                      answer="Medical alert systems might qualify as deductible medical expenses on your tax return if you itemize deductions and your total medical expenses exceed the threshold. Consult with a tax professional to understand how this applies to your specific situation."
                    />
                    <FAQItem
                      question="Do I need a prescription for Medicare to cover a medical alert system?"
                      answer="Even with a doctor's prescription, Medicare does not cover personal emergency response systems because they are not considered medically necessary durable medical equipment under Medicare guidelines."
                    />
                    <FAQItem
                      question="What happens to my medical alert system if I switch Medicare plans?"
                      answer="If you switch from a Medicare Advantage plan that included medical alert benefits to Original Medicare or a different plan, you will lose that coverage and need to pay for the service yourself or find alternative coverage."
                    />
                  </div>
                </div>

                {/* Helpful Vote */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm text-center">
                  <p className="text-[#1B2A4A] font-semibold mb-3">
                    Was this article helpful?
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setHelpfulVote("yes")}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        helpfulVote === "yes"
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : "border-[#E5E7EB] text-[#6B7280] hover:border-emerald-300 hover:text-emerald-600"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Yes (77)
                    </button>
                    <button
                      onClick={() => setHelpfulVote("no")}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        helpfulVote === "no"
                          ? "bg-red-50 border-red-300 text-red-700"
                          : "border-[#E5E7EB] text-[#6B7280] hover:border-red-300 hover:text-red-600"
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      No
                    </button>
                  </div>
                  {helpfulVote && (
                    <p className="text-sm text-[#6B7280] mt-3">
                      Thank you for your feedback!
                    </p>
                  )}
                </div>

                {/* Author Bios */}
                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white font-bold text-sm">
                        DH
                      </div>
                      <div>
                        <p className="font-bold text-[#1B2A4A] text-sm">
                          David Haass
                        </p>
                        <span className="text-xs bg-[#C41230] text-white px-2 py-0.5 rounded-full">
                          Author
                        </span>
                      </div>
                    </div>
                    <p className="text-[#6B7280] text-xs leading-relaxed">
                      David Haass is the Chief Technology Officer and Co-Founder of
                      Elite Insurance Partners and MedicareFAQ.com. He is a member
                      and regular contributor to Forbes Finance Council.
                    </p>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#059669] flex items-center justify-center text-white font-bold text-sm">
                        AZ
                      </div>
                      <div>
                        <p className="font-bold text-[#1B2A4A] text-sm">
                          Ashlee Zareczny
                        </p>
                        <span className="text-xs bg-[#059669] text-white px-2 py-0.5 rounded-full">
                          Reviewer
                        </span>
                      </div>
                    </div>
                    <p className="text-[#6B7280] text-xs leading-relaxed">
                      Ashlee Zareczny is the Director of Operations for
                      MedicareFAQ. As a licensed Medicare agent in all 50 states,
                      she is dedicated to educating those eligible for Medicare.
                    </p>
                  </div>
                </div>

                {/* Related Coverage Topics */}
                <div id="related-topics" className="mb-10 mt-10">
                  <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-[#C41230]" />
                    Related Coverage Topics
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        icon: Stethoscope,
                        title: "Does Medicare Cover Dental?",
                        description:
                          "Learn about dental coverage options under Medicare and Supplement plans.",
                        color: "#1B2A4A",
                      },
                      {
                        icon: Eye,
                        title: "Does Medicare Cover Vision?",
                        description:
                          "Explore what eye care services Medicare covers and your options for vision insurance.",
                        color: "#059669",
                      },
                      {
                        icon: Ear,
                        title: "Does Medicare Cover Hearing Aids?",
                        description:
                          "Find out what Medicare Part B covers for cochlear implants and what it doesn't cover.",
                        color: "#D97706",
                      },
                      {
                        icon: FileText,
                        title: "Medicare Coverage for Hearing Tests",
                        description:
                          "Understand when Medicare pays for diagnostic hearing exams vs. routine tests.",
                        color: "#7C3AED",
                      },
                    ].map((topic, i) => (
                      <a
                        key={i}
                        href="/faqs"
                        className="group bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#C41230]/30 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${topic.color}10`,
                            }}
                          >
                            <topic.icon
                              className="w-5 h-5"
                              style={{ color: topic.color }}
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1B2A4A] text-sm mb-1 group-hover:text-[#C41230] transition-colors">
                              {topic.title}
                            </h4>
                            <p className="text-[#6B7280] text-xs leading-relaxed">
                              {topic.description}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[#C41230] text-xs font-semibold mt-2">
                              Read more{" "}
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </article>

              {/* ─── Sidebar ─── */}
              <aside className="hidden lg:block w-[280px] shrink-0">
                <div className="sticky top-[180px] space-y-6">
                  {/* ON THIS PAGE */}
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold tracking-wider text-[#6B7280] uppercase mb-4">
                      On This Page
                    </h3>
                    <nav className="space-y-1">
                      {tableOfContents.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left text-sm py-1.5 px-3 rounded-md transition-all ${
                            activeSection === item.id
                              ? "bg-[#C41230]/10 text-[#C41230] font-semibold border-l-2 border-[#C41230]"
                              : "text-[#6B7280] hover:text-[#1B2A4A] hover:bg-[#F5F7FA]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Quick Reference */}
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold tracking-wider text-[#6B7280] uppercase mb-4">
                      Quick Reference
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">
                          Original Medicare does <strong>not</strong> cover
                          medical alert systems
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">
                          Some Medicare Advantage plans <strong>may</strong>{" "}
                          cover them
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-[#1B2A4A] shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">
                          Life Alert costs{" "}
                          <strong>$50–$100/mo</strong> out of pocket
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[#4B5563]">
                          Cochlear implants <strong>are</strong> covered by
                          Part B when medically necessary
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Related Topics */}
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold tracking-wider text-[#6B7280] uppercase mb-4">
                      Related Topics
                    </h3>
                    <ul className="space-y-2">
                      {[
                        { label: "Medicare Dental Coverage", href: "/faqs/does-medicare-cover-dental-implants" },
                        { label: "Medicare Vision Coverage", href: "/faqs" },
                        { label: "Medicare Advantage Plans", href: "/medicare-plans/medicare-advantage" },
                        { label: "Medicare Supplement Plans", href: "/medicare-plans/medicare-supplement" },
                        { label: "Medicare Guide & FAQs", href: "/faqs" },
                      ].map((topic, i) => (
                        <li key={i}>
                          <a
                            href={topic.href}
                            className="text-sm text-[#2563EB] hover:text-[#1B2A4A] hover:underline transition-colors flex items-center gap-1"
                          >
                            <ChevronRight className="w-3 h-3" />
                            {topic.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Sidebar */}
                  <div className="bg-[#1B2A4A] rounded-xl p-5 text-center">
                    <p className="text-white font-bold text-sm mb-1">
                      Have Questions?
                    </p>
                    <p className="text-white/60 text-xs mb-4">
                      Speak with a licensed Medicare agent
                    </p>
                    <a
                      href="tel:8883358996"
                      className="flex items-center justify-center gap-2 bg-[#C41230] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#A50F28] transition-colors w-full mb-2"
                    >
                      <Phone className="w-4 h-4" />
                      (888) 335-8996
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#C41230] py-12 md:py-16">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Need Help Choosing a Plan?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Original Medicare doesn't cover medical alert systems, but some
              Medicare Advantage plans do. Our licensed agents can compare plans
              in your area that include medical alert benefits — at no cost to you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:8883358996"
                className="flex items-center gap-2 bg-white text-[#C41230] font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call (888) 335-8996
              </a>
              <a
                href="/compare-rates"
                className="flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Compare Plans
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Simple Bar Chart Icon ─── */
function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
