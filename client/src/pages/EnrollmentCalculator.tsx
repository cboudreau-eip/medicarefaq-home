/**
 * Medicare Enrollment Timeline Calculator Page
 * Design: Clean, light, authoritative tool page
 * Colors: Navy (#1B2A4A) header, teal/amber/green accents for timeline events
 */
import { useState, useMemo } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CalendarCheck,
  Star,
  Cake,
  Shield,
  AlertTriangle,
  Briefcase,
  Clock,
  Repeat,
  ChevronRight,
  ChevronDown,
  Info,
  Phone,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  HelpCircle,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import {
  calculateTimeline,
  type CalculatorInput,
  type CalculatorResult,
  type EmploymentStatus,
  type TimelineEvent,
} from "@/lib/enrollment-calculator";

const ICON_MAP: Record<string, React.ElementType> = {
  "calendar-check": CalendarCheck,
  star: Star,
  cake: Cake,
  shield: Shield,
  "alert-triangle": AlertTriangle,
  briefcase: Briefcase,
  clock: Clock,
  repeat: Repeat,
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// Generate month options
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Generate year options (current year - 70 to current year - 50 for birth year)
const currentYear = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 30 }, (_, i) => currentYear - 70 + i);
const COVERAGE_YEARS = Array.from({ length: 15 }, (_, i) => currentYear - 2 + i);

const EMPLOYMENT_OPTIONS: { value: EmploymentStatus; label: string; description: string }[] = [
  {
    value: "not-working",
    label: "Not currently working",
    description: "Retired, self-employed, or no employer health coverage",
  },
  {
    value: "working-with-coverage",
    label: "Working with employer coverage",
    description: "Employed with health insurance from employer (20+ employees)",
  },
  {
    value: "spouse-coverage",
    label: "Covered through spouse's employer",
    description: "Health insurance through spouse's job (20+ employees)",
  },
  {
    value: "working-no-coverage",
    label: "Working without employer coverage",
    description: "Employed but no employer-sponsored health insurance",
  },
];

function TimelineEventCard({ event, index }: { event: TimelineEvent; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const IconComponent = ICON_MAP[event.icon] || Calendar;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="relative pl-10 md:pl-14 pb-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-[18px] md:left-[26px] top-0 bottom-0 w-px bg-[#E5E7EB] last:hidden" />

      {/* Timeline dot */}
      <div
        className="absolute left-2 md:left-3.5 top-1 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ring-4 ring-white"
        style={{ backgroundColor: event.color }}
      >
        <IconComponent className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
      </div>

      {/* Card */}
      <div
        className={`rounded-xl border transition-all duration-200 ${
          event.type === "deadline" || event.type === "warning"
            ? "border-red-200 bg-red-50/50"
            : event.type === "milestone"
            ? "border-[#1B2A4A]/20 bg-[#1B2A4A]/5"
            : "border-[#E5E7EB] bg-white"
        }`}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left p-4 md:p-5 flex items-start justify-between gap-3"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: event.color }}
              >
                {event.endDate
                  ? `${formatDate(event.date)} – ${formatDate(event.endDate)}`
                  : formatDate(event.date)}
              </span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#1B2A4A]">{event.label}</h3>
          </div>
          <div className="shrink-0 mt-1">
            {expanded ? (
              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[#6B7280]" />
            )}
          </div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
                <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ResultsSection({ result }: { result: CalculatorResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B2A4A]/10 flex items-center justify-center">
              <Cake className="w-5 h-5 text-[#1B2A4A]" />
            </div>
            <span className="text-sm font-medium text-[#6B7280]">You Turn 65</span>
          </div>
          <p className="text-xl font-bold text-[#1B2A4A]">{formatDate(result.birthday65)}</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-[#0D9488]" />
            </div>
            <span className="text-sm font-medium text-[#6B7280]">Enrollment Window</span>
          </div>
          <p className="text-xl font-bold text-[#1B2A4A]">
            {formatDate(result.iepStart)}
          </p>
          <p className="text-sm text-[#6B7280] mt-1">
            through {formatDate(result.iepEnd)}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#059669]/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#059669]" />
            </div>
            <span className="text-sm font-medium text-[#6B7280]">Coverage Starts</span>
          </div>
          <p className="text-xl font-bold text-[#1B2A4A]">
            {formatDate(result.coverageStartIfOnTime)}
          </p>
          <p className="text-sm text-[#6B7280] mt-1">if enrolled on time</p>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-[#1B2A4A] mb-2">
          Your Personal Medicare Timeline
        </h3>
        <p className="text-sm text-[#6B7280] mb-6">
          Click each event to see details and recommendations.
        </p>

        <div className="relative">
          {result.events.map((event, index) => (
            <TimelineEventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>

      {/* Personalized Tips */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-[#D97706]/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-[#D97706]" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-[#1B2A4A]">
            Personalized Recommendations
          </h3>
        </div>

        <div className="space-y-3">
          {result.personalizedTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#1B2A4A] to-[#2D4A7A] rounded-2xl p-6 md:p-8 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          Need Help With Your Enrollment?
        </h3>
        <p className="text-white/70 mb-6 max-w-xl mx-auto">
          Our licensed Medicare agents can walk you through your specific situation and help you
          choose the right plan — at no cost to you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:8883358996"
            className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-6 py-3.5 rounded-lg transition-colors shadow-lg"
          >
            <Phone className="w-4 h-4" />
            Call (888) 335-8996
          </a>
          <a
            href="/compare-rates"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-3.5 rounded-lg transition-colors border border-white/20"
          >
            Get Started Online
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-xl p-4 md:p-5">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#92400E] mb-1">Important Disclaimer</p>
            <p className="text-sm text-[#92400E]/80 leading-relaxed">
              This calculator provides general estimates based on standard Medicare enrollment
              rules. Your actual dates may vary based on individual circumstances, disability
              status, or other factors. Always verify your specific enrollment dates with
              Medicare (1-800-MEDICARE) or Social Security. This tool is for educational purposes
              and does not constitute official Medicare guidance.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EnrollmentCalculator() {
  useCMSSEO({
    contentType: "page",
    slug: "enrollment-calculator",
    title: "Medicare Enrollment Timeline Calculator | When to Enroll | MedicareFAQ",
    description: "Use our free Medicare enrollment timeline calculator to find out exactly when your Initial Enrollment Period starts and ends based on your birthday.",
    canonical: "https://www.medicarefaq.com/tools/enrollment-timeline/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    ogType: "website",
  });
  const [birthMonth, setBirthMonth] = useState<number>(0);
  const [birthYear, setBirthYear] = useState<number>(0);
  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>("not-working");
  const [coverageEndMonth, setCoverageEndMonth] = useState<number>(0);
  const [coverageEndYear, setCoverageEndYear] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const needsCoverageEnd =
    employmentStatus === "working-with-coverage" || employmentStatus === "spouse-coverage";

  const canCalculate =
    birthMonth > 0 &&
    birthYear > 0 &&
    (!needsCoverageEnd || (coverageEndMonth > 0 && coverageEndYear > 0));

  function handleCalculate() {
    if (!canCalculate) return;

    const input: CalculatorInput = {
      birthMonth,
      birthYear,
      employmentStatus,
      ...(needsCoverageEnd && coverageEndMonth > 0 && coverageEndYear > 0
        ? { coverageEndMonth, coverageEndYear }
        : {}),
    };

    const calcResult = calculateTimeline(input);
    setResult(calcResult);
    setShowResults(true);

    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleReset() {
    setShowResults(false);
    setResult(null);
    setBirthMonth(0);
    setBirthYear(0);
    setEmploymentStatus("not-working");
    setCoverageEndMonth(0);
    setCoverageEndYear(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero Header */}
      <section className="bg-[#1B2A4A] pt-6 pb-10 md:pb-14">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <a href="/" className="hover:text-white/80 transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">Tools</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">Enrollment Timeline Calculator</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#4F46E5]/20 text-[#A5B4FC] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
              <Calendar className="w-3.5 h-3.5" />
              Interactive Tool
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
              Medicare Enrollment Timeline Calculator
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
              Enter your birthday and employment status to see exactly when you should enroll in
              Medicare and what deadlines to watch. Get a personalized timeline with all your key
              dates.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-8 md:py-12 -mt-0">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1B2A4A]">Tell Us About Yourself</h2>
                <p className="text-sm text-[#6B7280]">We'll calculate your personalized Medicare timeline</p>
              </div>
            </div>

            {/* Step 1: Birthday */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#1B2A4A] mb-1">
                Step 1: When were you born?
              </label>
              <p className="text-sm text-[#6B7280] mb-3">
                We only need your birth month and year to calculate your enrollment dates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(Number(e.target.value))}
                  className="flex-1 px-4 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1B2A4A] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                >
                  <option value={0}>Select month...</option>
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i + 1}>{m}</option>
                  ))}
                </select>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  className="flex-1 px-4 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1B2A4A] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                >
                  <option value={0}>Select year...</option>
                  {BIRTH_YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2: Employment Status */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#1B2A4A] mb-1">
                Step 2: What is your current employment status?
              </label>
              <p className="text-sm text-[#6B7280] mb-3">
                This determines whether you can delay Medicare enrollment without penalty.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {EMPLOYMENT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setEmploymentStatus(option.value)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                      employmentStatus === option.value
                        ? "border-[#0D9488] bg-[#0D9488]/5 ring-1 ring-[#0D9488]/20"
                        : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                          employmentStatus === option.value
                            ? "border-[#0D9488] bg-[#0D9488]"
                            : "border-[#D1D5DB]"
                        }`}
                      >
                        {employmentStatus === option.value && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1B2A4A]">{option.label}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{option.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Coverage End Date (conditional) */}
            <AnimatePresence>
              {needsCoverageEnd && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-[#1B2A4A] mb-1">
                      Step 3: When does (or did) your employer coverage end?
                    </label>
                    <p className="text-sm text-[#6B7280] mb-3">
                      This helps us calculate your Special Enrollment Period. If you're not sure yet,
                      enter your best estimate.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={coverageEndMonth}
                        onChange={(e) => setCoverageEndMonth(Number(e.target.value))}
                        className="flex-1 px-4 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1B2A4A] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                      >
                        <option value={0}>Select month...</option>
                        {MONTHS.map((m, i) => (
                          <option key={m} value={i + 1}>{m}</option>
                        ))}
                      </select>
                      <select
                        value={coverageEndYear}
                        onChange={(e) => setCoverageEndYear(Number(e.target.value))}
                        className="flex-1 px-4 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1B2A4A] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                      >
                        <option value={0}>Select year...</option>
                        {COVERAGE_YEARS.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Calculate Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleCalculate}
                disabled={!canCalculate}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-lg transition-all duration-150 text-base ${
                  canCalculate
                    ? "bg-[#0D9488] hover:bg-[#0B7C72] text-white shadow-lg shadow-[#0D9488]/25"
                    : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                }`}
              >
                <Calendar className="w-5 h-5" />
                Calculate My Timeline
              </button>
              {showResults && (
                <button
                  onClick={handleReset}
                  className="text-sm font-medium text-[#6B7280] hover:text-[#1B2A4A] transition-colors"
                >
                  Start Over
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {showResults && result && (
        <section id="results" className="pb-12 md:pb-16">
          <div className="container max-w-4xl">
            <ResultsSection result={result} />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-white border-t border-[#E5E7EB]">
        <div className="container max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How accurate is this calculator?",
                a: "This calculator uses standard Medicare enrollment rules based on age-based eligibility. It provides accurate date ranges for the Initial Enrollment Period, Special Enrollment Period, and Medigap Open Enrollment. However, individual circumstances (such as disability, ESRD, or specific employer plan details) may affect your actual dates. Always verify with Medicare or Social Security.",
              },
              {
                q: "What if I'm eligible for Medicare due to disability?",
                a: "This calculator is designed for age-based Medicare eligibility (turning 65). If you qualify for Medicare due to a disability or End-Stage Renal Disease (ESRD), your enrollment periods work differently. Contact Medicare at 1-800-MEDICARE or speak with a licensed agent for disability-based enrollment guidance.",
              },
              {
                q: "Do I need to sign up for both Part A and Part B?",
                a: "Most people should sign up for Part A when they turn 65, as it's premium-free if you or your spouse paid Medicare taxes for 10+ years. Part B has a monthly premium and covers outpatient services. If you have employer coverage, you may choose to delay Part B (but not Part A) without penalty.",
              },
              {
                q: "What happens if I miss my enrollment window?",
                a: "If you miss your Initial Enrollment Period and don't qualify for a Special Enrollment Period, you'll need to wait for the General Enrollment Period (January 1 – March 31), with coverage starting July 1. You may also face a permanent late enrollment penalty of 10% added to your Part B premium for each full 12-month period you were eligible but didn't enroll.",
              },
              {
                q: "Is this tool free to use?",
                a: "Yes, this calculator is completely free. MedicareFAQ.com provides educational Medicare tools and resources at no cost. If you need personalized help, our licensed agents can assist you with enrollment — also at no cost to you.",
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-[#F9FAFB] transition-colors"
      >
        <span className="text-sm md:text-base font-semibold text-[#1B2A4A]">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#6B7280] shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
