/**
 * Original Medicare (Parts A & B) Page
 * Design: Educational layout with comparison tables, coverage breakdowns,
 * and clear cost information for Parts A and B.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Building2,
  Stethoscope,
  Shield,
  DollarSign,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Clock,
  FileText,
  Heart,
  Users,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "What Is Original Medicare?" },
  { id: "part-a", label: "Part A: Hospital Insurance" },
  { id: "part-b", label: "Part B: Medical Insurance" },
  { id: "costs", label: "2026 Costs at a Glance" },
  { id: "what-it-doesnt-cover", label: "What It Doesn't Cover" },
  { id: "supplementing", label: "Supplementing Original Medicare" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const faqs = [
  {
    q: "Is Original Medicare the same as Medicare Part A and Part B?",
    a: "Yes. Original Medicare is the federal health insurance program that includes Part A (hospital insurance) and Part B (medical insurance). It's administered directly by the federal government, not private insurers.",
  },
  {
    q: "Do I need to choose a network with Original Medicare?",
    a: "No. Original Medicare has no provider networks. You can see any doctor, specialist, or hospital in the country that accepts Medicare — and the vast majority do (over 97% of physicians).",
  },
  {
    q: "Does Original Medicare have an out-of-pocket maximum?",
    a: "No. Unlike most private insurance, Original Medicare has no annual cap on out-of-pocket spending. This is one of the main reasons beneficiaries add a Medigap supplement plan or choose Medicare Advantage instead.",
  },
  {
    q: "Can I add prescription drug coverage to Original Medicare?",
    a: "Yes. Original Medicare doesn't cover most prescription drugs, so you'll want to enroll in a standalone Medicare Part D plan. If you delay Part D enrollment without creditable coverage, you may face a permanent late enrollment penalty.",
  },
  {
    q: "What's the difference between Original Medicare and Medicare Advantage?",
    a: "Original Medicare is the traditional federal program (Parts A & B) with no networks and no out-of-pocket cap. Medicare Advantage (Part C) is offered by private insurers, typically includes drug coverage and extras like dental/vision, uses provider networks, and has an annual out-of-pocket maximum.",
  },
  {
    q: "How do I sign up for Original Medicare?",
    a: "If you're already receiving Social Security benefits, you'll be automatically enrolled in Parts A and B when you turn 65. Otherwise, you can sign up through Social Security online (ssa.gov), by phone (1-800-772-1213), or at your local Social Security office.",
  },
];

export default function OriginalMedicare() {
  useCMSSEO({
    contentType: "page",
    slug: "original-medicare",
    title: "Original Medicare | What Is Original Medicare? | MedicareFAQ",
    description: "Original Medicare is the traditional fee-for-service health insurance program offered by the federal government. Learn about Parts A and B, what they cover, and how they work.",
    canonical: "https://www.medicarefaq.com/original-medicare/",
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
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-plans/original-medicare" className="hover:text-white transition-colors">Medicare Plans</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Original Medicare</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Parts A & B</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Original Medicare: Parts A & B Explained
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            The foundation of Medicare coverage — hospital insurance (Part A) and medical insurance (Part B) provided directly by the federal government.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#costs" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              View 2026 Costs <ArrowRight className="w-4 h-4" />
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
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-4">In This Guide</p>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-teal-50 text-teal-700 font-semibold"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Need Help?</p>
                  <p className="text-xs text-blue-700 mb-3">Speak with a licensed Medicare agent</p>
                  <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-bold text-blue-700">
                    <Phone className="w-4 h-4" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* What Is Original Medicare */}
              <section id="overview" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Is Original Medicare?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Original Medicare is the traditional federal health insurance program that has been available since 1966. It consists of two parts: <strong>Part A (Hospital Insurance)</strong> and <strong>Part B (Medical Insurance)</strong>. Together, they provide coverage for hospital stays, doctor visits, outpatient care, preventive services, and more.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Unlike Medicare Advantage (Part C), Original Medicare is administered directly by the federal government — not private insurance companies. This means you can see <strong>any doctor or hospital in the country</strong> that accepts Medicare, with no network restrictions.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="text-3xl font-bold text-blue-600 mb-1">97%</div>
                    <p className="text-sm text-slate-600">of U.S. physicians accept Medicare</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="text-3xl font-bold text-blue-600 mb-1">67M+</div>
                    <p className="text-sm text-slate-600">Americans enrolled in Medicare</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="text-3xl font-bold text-blue-600 mb-1">Since 1966</div>
                    <p className="text-sm text-slate-600">Serving Americans for nearly 60 years</p>
                  </div>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Important: No Out-of-Pocket Maximum</p>
                      <p className="text-sm text-amber-800">
                        Original Medicare has <strong>no annual cap</strong> on how much you can spend out-of-pocket. This is why most beneficiaries add a Medigap supplement plan or choose Medicare Advantage, which does have an out-of-pocket limit.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Part A */}
              <section id="part-a" className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
                    Part A: Hospital Insurance
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare Part A covers inpatient care — hospital stays, skilled nursing facility care, hospice care, and some home health services. Most people qualify for <strong>premium-free Part A</strong> if they or their spouse paid Medicare taxes for at least 10 years (40 quarters).
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> What Part A Covers
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Inpatient hospital stays",
                        "Skilled nursing facility care (up to 100 days per benefit period)",
                        "Hospice care (comfort care for terminal illness)",
                        "Home health care (limited — must be homebound)",
                        "Inpatient care in a religious nonmedical health care institution",
                        "Blood transfusions (after first 3 pints)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                    <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5" /> What Part A Doesn't Cover
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Long-term care (custodial/nursing home care)",
                        "Most dental, vision, and hearing services",
                        "Private-duty nursing",
                        "Personal care or homemaker services",
                        "Hospital stays outside the U.S. (with limited exceptions)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                          <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Part A Costs in 2026</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Cost Item</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">2026 Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Premium", "$0 for most people", "Free if you/spouse paid Medicare taxes 10+ years"],
                        ["Premium (no work history)", "$518/month", "If you don't qualify for premium-free Part A"],
                        ["Hospital Deductible", "$1,676", "Per benefit period (not per calendar year)"],
                        ["Days 1–60 Coinsurance", "$0/day", "After meeting the deductible"],
                        ["Days 61–90 Coinsurance", "$419/day", "For each day of inpatient hospital stay"],
                        ["Lifetime Reserve Days (91+)", "$838/day", "60 lifetime reserve days total"],
                        ["Skilled Nursing (Days 21–100)", "$209.50/day", "After first 20 days covered in full"],
                      ].map(([item, amount, note], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 text-slate-700 font-medium">{item}</td>
                          <td className="py-3 px-4 text-slate-900 font-semibold">{amount}</td>
                          <td className="py-3 px-4 text-slate-500">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Part B */}
              <section id="part-b" className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-teal-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
                    Part B: Medical Insurance
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare Part B covers outpatient medical services — doctor visits, preventive care, lab tests, durable medical equipment, mental health services, and more. Unlike Part A, <strong>everyone pays a monthly premium</strong> for Part B, and there's a 20% coinsurance with no annual cap.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> What Part B Covers
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Doctor and specialist visits",
                        "Outpatient surgery and procedures",
                        "Preventive services (wellness visits, screenings, vaccines)",
                        "Lab tests and diagnostic imaging",
                        "Durable medical equipment (wheelchairs, walkers, etc.)",
                        "Mental health services (outpatient)",
                        "Ambulance services (when medically necessary)",
                        "Home health care (Part B portion)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                    <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5" /> What Part B Doesn't Cover
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Most dental care (cleanings, fillings, dentures)",
                        "Routine eye exams and eyeglasses",
                        "Hearing aids and hearing exams",
                        "Most prescription drugs (need Part D)",
                        "Cosmetic surgery",
                        "Acupuncture (except for chronic low back pain)",
                        "Routine foot care",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                          <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Part B Costs in 2026</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Cost Item</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">2026 Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Standard Monthly Premium", "$185/month", "Most beneficiaries pay this amount"],
                        ["Annual Deductible", "$257", "Must be met before Medicare pays"],
                        ["Coinsurance", "20%", "You pay 20% of Medicare-approved amount — no cap"],
                        ["Outpatient Surgery", "20%", "After deductible, in Medicare-approved facilities"],
                        ["Doctor Visits", "20%", "After deductible for office and specialist visits"],
                        ["Durable Medical Equipment", "20%", "Wheelchairs, walkers, hospital beds, etc."],
                        ["Clinical Lab Services", "$0", "Most lab tests are covered at 100%"],
                      ].map(([item, amount, note], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 text-slate-700 font-medium">{item}</td>
                          <td className="py-3 px-4 text-slate-900 font-semibold">{amount}</td>
                          <td className="py-3 px-4 text-slate-500">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl">
                  <p className="font-semibold text-blue-900 mb-1">Key Takeaway</p>
                  <p className="text-sm text-blue-800">
                    The 20% Part B coinsurance has <strong>no annual limit</strong>. A single hospital outpatient procedure could cost you thousands. This is the primary reason most people purchase a Medigap supplement or choose Medicare Advantage.
                  </p>
                </div>
              </section>

              {/* Costs at a Glance */}
              <section id="costs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  2026 Costs at a Glance
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Part A Premium", value: "$0", sub: "for most people" },
                    { label: "Part B Premium", value: "$185/mo", sub: "standard amount" },
                    { label: "Hospital Deductible", value: "$1,676", sub: "per benefit period" },
                    { label: "Part B Deductible", value: "$257/yr", sub: "annual deductible" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-5 border border-slate-200">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* What It Doesn't Cover */}
              <section id="what-it-doesnt-cover" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Original Medicare Doesn't Cover
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  While Original Medicare provides essential coverage, there are significant gaps you should be aware of. Understanding these gaps is crucial for planning your supplemental coverage needs.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Prescription Drugs", desc: "Most outpatient prescription medications require a separate Part D plan.", icon: "💊" },
                    { title: "Dental Care", desc: "Routine dental — cleanings, fillings, extractions, dentures — is not covered.", icon: "🦷" },
                    { title: "Vision Care", desc: "Routine eye exams, eyeglasses, and contact lenses are excluded.", icon: "👓" },
                    { title: "Hearing Aids", desc: "Hearing exams for fitting hearing aids and the devices themselves aren't covered.", icon: "👂" },
                    { title: "Long-Term Care", desc: "Custodial care in a nursing home or assisted living facility is not covered.", icon: "🏥" },
                    { title: "Overseas Care", desc: "Healthcare received outside the U.S. is generally not covered (limited exceptions).", icon: "✈️" },
                  ].map((gap, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-2xl">{gap.icon}</span>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{gap.title}</h3>
                        <p className="text-sm text-slate-600">{gap.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Supplementing Original Medicare */}
              <section id="supplementing" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Supplementing Original Medicare
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Because Original Medicare has no out-of-pocket maximum and doesn't cover prescriptions, dental, vision, or hearing, most beneficiaries add supplemental coverage. Here are your two main options:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border-2 border-blue-200 p-6 hover:border-blue-400 transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Medigap (Medicare Supplement)</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Works alongside Original Medicare to cover deductibles, coinsurance, and copays. No networks — see any Medicare provider nationwide.
                    </p>
                    <ul className="space-y-2 mb-6">
                      {[
                        "Covers Part A & B cost-sharing",
                        "No provider networks",
                        "Predictable monthly costs",
                        "10 standardized plan options",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                    <Link href="/medicare-plans/medicare-supplement" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
                      Learn about Medigap <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-slate-400 transition-colors">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                      <Heart className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Or Switch to Medicare Advantage</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      An alternative to Original Medicare offered by private insurers. Includes Part A, B, usually D, and often dental/vision/hearing.
                    </p>
                    <ul className="space-y-2 mb-6">
                      {[
                        "Often $0 premium (beyond Part B)",
                        "Includes drug coverage & extras",
                        "Annual out-of-pocket maximum",
                        "Uses provider networks",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                    <Link href="/medicare-plans/medicare-advantage" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-800">
                      Learn about Medicare Advantage <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
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
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Need Help Understanding Your Options?
                  </h2>
                  <p className="text-blue-100 mb-6 max-w-xl">
                    Our licensed Medicare agents can help you understand how Original Medicare works with supplemental coverage, compare plans in your area, and find the best fit for your needs — at no cost to you.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <Phone className="w-4 h-4" /> Call (888) 335-8996
                    </a>
                    <Link href="/compare-rates" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                      Compare All Plans <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* Related Pages */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/medicare-plans/medicare-supplement" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                  <Shield className="w-5 h-5 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Medicare Supplement</h3>
                  <p className="text-xs text-slate-500">Fill the gaps in Original Medicare</p>
                </Link>
                <Link href="/medicare-plans/medicare-advantage" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                  <Heart className="w-5 h-5 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Medicare Advantage</h3>
                  <p className="text-xs text-slate-500">All-in-one alternative to Original Medicare</p>
                </Link>
                <Link href="/new-to-medicare/costs" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                  <DollarSign className="w-5 h-5 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Medicare Costs 2026</h3>
                  <p className="text-xs text-slate-500">Complete cost breakdown</p>
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
