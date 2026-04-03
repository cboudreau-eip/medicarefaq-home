/**
 * Medicare Part D (Prescription Drug Plans) Page
 * Design: Comprehensive guide covering drug plan tiers, coverage phases,
 * costs, enrollment, and the donut hole.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  Pill,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Clock,
  Shield,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "What Is Part D?" },
  { id: "drug-tiers", label: "Drug Tiers Explained" },
  { id: "coverage-phases", label: "Coverage Phases" },
  { id: "costs", label: "Costs in 2026" },
  { id: "enrollment", label: "When to Enroll" },
  { id: "penalty", label: "Late Enrollment Penalty" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const drugTiers = [
  { tier: "Tier 1", name: "Preferred Generic", cost: "$0 – $15", desc: "Lowest-cost generic drugs. Most common medications.", color: "bg-green-50 border-green-200" },
  { tier: "Tier 2", name: "Generic", cost: "$5 – $25", desc: "Other generic drugs not on the preferred list.", color: "bg-green-50/50 border-green-100" },
  { tier: "Tier 3", name: "Preferred Brand", cost: "$25 – $60", desc: "Brand-name drugs the plan prefers. Lower copay than non-preferred.", color: "bg-amber-50 border-amber-200" },
  { tier: "Tier 4", name: "Non-Preferred Brand", cost: "$60 – $150", desc: "Brand-name drugs not on the preferred list. Higher cost-sharing.", color: "bg-amber-50/50 border-amber-100" },
  { tier: "Tier 5", name: "Specialty", cost: "25% – 33%", desc: "High-cost specialty drugs. Often coinsurance rather than copay.", color: "bg-red-50 border-red-200" },
];

const coveragePhases = [
  { phase: "1", name: "Deductible Phase", threshold: "First $590", desc: "You pay 100% of drug costs until you reach the annual deductible. Some plans cover certain generics before you meet the deductible.", color: "bg-slate-100" },
  { phase: "2", name: "Initial Coverage", threshold: "$590 – $2,000 total drug costs", desc: "You pay copays or coinsurance based on drug tier. The plan pays the rest. This is where most people spend most of the year.", color: "bg-blue-100" },
  { phase: "3", name: "Coverage Gap (Donut Hole)", threshold: "$2,000 – $2,000 (eliminated in 2025)", desc: "Starting in 2025, the coverage gap has been eliminated. You continue paying no more than 25% for brand-name drugs in this phase thanks to the Inflation Reduction Act.", color: "bg-teal-100" },
  { phase: "4", name: "Catastrophic Coverage", threshold: "After $2,000 out-of-pocket", desc: "Starting in 2025, there is a $2,000 annual out-of-pocket cap. Once reached, you pay $0 for covered drugs for the rest of the year.", color: "bg-green-100" },
];

const faqs = [
  {
    q: "What is the Part D donut hole?",
    a: "The 'donut hole' or coverage gap was a phase where you paid a higher share of drug costs. Thanks to the Inflation Reduction Act, the donut hole has been effectively eliminated starting in 2025. There is now a hard $2,000 annual out-of-pocket cap on Part D spending.",
  },
  {
    q: "Can I change my Part D plan?",
    a: "Yes. You can switch Part D plans during the Annual Enrollment Period (October 15 – December 7). You should review your plan annually because formularies, premiums, and pharmacy networks change every year.",
  },
  {
    q: "What if my drug isn't on my plan's formulary?",
    a: "You have several options: ask your doctor for a covered alternative, request a formulary exception from your plan, or switch to a plan that covers your medication during the next enrollment period. Your doctor can submit a coverage determination request.",
  },
  {
    q: "Do I need Part D if I have employer coverage?",
    a: "If your employer coverage is 'creditable' (meaning it's at least as good as Part D), you don't need to enroll. Your employer should notify you annually whether your coverage is creditable. Keep this notice — you'll need it to avoid penalties if you enroll later.",
  },
  {
    q: "How much does Part D cost?",
    a: "The national average Part D premium is about $46/month in 2026. Premiums vary widely by plan ($0 to $100+). You also pay a deductible (up to $590), copays/coinsurance for each prescription, and your total out-of-pocket is capped at $2,000/year.",
  },
  {
    q: "What is the Extra Help / Low-Income Subsidy program?",
    a: "Extra Help (also called LIS) is a Medicare program that helps people with limited income and resources pay for Part D costs. It can cover premiums, deductibles, and copays. If you qualify for Medicaid, you automatically get Extra Help.",
  },
];

export default function PartD() {
  useCMSSEO({
    contentType: "page",
    slug: "part-d",
    title: "Medicare Part D Drug Coverage",
    description: "Medicare Part D involves different coverage phases. Learn how it works here and how to find the best plan for you.",
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicare-part-d-1.jpeg",
    ogType: "article",
  });
  const [activeSection, setActiveSection] = useState("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Part D</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Prescription Drug Plans</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Part D: Prescription Drug Coverage
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Understand how Medicare drug plans work, what they cost, and how the $2,000 out-of-pocket cap protects you from catastrophic drug expenses.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#coverage-phases" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              How Coverage Works <ArrowRight className="w-4 h-4" />
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
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-4">In This Guide</p>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a key={item.id} href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                        activeSection === item.id ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >{item.label}</a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-sm font-semibold text-green-900 mb-1">2026 Key Number</p>
                  <p className="text-2xl font-bold text-green-700">$2,000</p>
                  <p className="text-xs text-green-700">Annual out-of-pocket cap on Part D drug costs</p>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Need Help?</p>
                  <p className="text-xs text-blue-700 mb-3">Speak with a licensed Medicare agent</p>
                  <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-bold text-blue-700">
                    <Phone className="w-4 h-4" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* Overview */}
              <section id="overview" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Is Medicare Part D?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  <strong>Medicare Part D</strong> is prescription drug coverage offered by private insurance companies that contract with Medicare. It helps pay for the medications your doctor prescribes. Part D is available as a <strong>standalone plan</strong> (PDP) that works with Original Medicare, or as part of a <strong>Medicare Advantage plan</strong> (MA-PD).
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Each Part D plan has its own <strong>formulary</strong> (list of covered drugs), pharmacy network, and cost structure. Plans vary significantly in what drugs they cover and how much you pay — making it important to compare plans based on your specific medications.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-400 p-5 rounded-r-xl mb-8">
                  <p className="font-semibold text-teal-900 mb-1">Major Change: $2,000 Out-of-Pocket Cap</p>
                  <p className="text-sm text-teal-800">
                    Thanks to the <strong>Inflation Reduction Act</strong>, starting in 2025 there is a hard $2,000 annual cap on out-of-pocket spending for Part D drugs. Once you hit $2,000, you pay $0 for the rest of the year. This is a significant improvement — previously, some beneficiaries paid $10,000+ annually for medications.
                  </p>
                </div>
              </section>

              {/* Drug Tiers */}
              <section id="drug-tiers" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Drug Tiers Explained
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Part D plans organize drugs into tiers, with lower tiers having lower costs. Your copay or coinsurance depends on which tier your medication falls into:
                </p>
                <div className="space-y-3">
                  {drugTiers.map((tier, i) => (
                    <div key={i} className={`p-5 rounded-xl border ${tier.color}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-700">{tier.tier}</span>
                          <span className="font-semibold text-slate-900">{tier.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{tier.cost}</span>
                      </div>
                      <p className="text-sm text-slate-600">{tier.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Coverage Phases */}
              <section id="coverage-phases" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  The 4 Phases of Part D Coverage
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Part D coverage works in phases. As your total drug spending increases throughout the year, you move through each phase:
                </p>
                <div className="space-y-4">
                  {coveragePhases.map((phase, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-white rounded-xl border border-slate-200">
                      <div className={`w-12 h-12 ${phase.color} rounded-full flex items-center justify-center shrink-0`}>
                        <span className="font-bold text-slate-700">{phase.phase}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{phase.name}</h3>
                        <p className="text-sm font-medium text-teal-700 mb-1">{phase.threshold}</p>
                        <p className="text-sm text-slate-600">{phase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Costs */}
              <section id="costs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Part D Costs in 2026
                </h2>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Cost Component</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">2026 Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Monthly Premium (national average)", "~$46/month"],
                        ["Annual Deductible (maximum)", "$590"],
                        ["Annual Out-of-Pocket Cap", "$2,000"],
                        ["Part B Premium (standard)", "$185/month"],
                        ["IRMAA Surcharge (income > $106K)", "$13 – $81/month extra"],
                      ].map(([item, amount], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 text-slate-700">{item}</td>
                          <td className="py-3 px-4 text-slate-900 font-semibold">{amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Enrollment */}
              <section id="enrollment" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  When to Enroll in Part D
                </h2>
                <div className="space-y-4 mb-6">
                  {[
                    { period: "Initial Enrollment Period (IEP)", dates: "3 months before to 3 months after turning 65", desc: "Your first chance to enroll when you become Medicare-eligible." },
                    { period: "Annual Enrollment Period (AEP)", dates: "October 15 – December 7", desc: "Switch or join a Part D plan. Changes take effect January 1." },
                    { period: "Special Enrollment Period (SEP)", dates: "Varies", desc: "Qualifying events like losing employer coverage, moving, or qualifying for Extra Help." },
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-white rounded-xl border border-slate-200">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{item.period}</h3>
                          <p className="text-sm font-medium text-teal-700 mb-1">{item.dates}</p>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Penalty */}
              <section id="penalty" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Late Enrollment Penalty
                </h2>
                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-red-800 text-lg mb-2">This Penalty Is Permanent</h3>
                      <p className="text-sm text-red-800 mb-4">
                        If you go <strong>63 or more continuous days</strong> without Part D or creditable prescription drug coverage, you'll pay a late enrollment penalty when you do enroll. This penalty is added to your monthly premium <strong>for as long as you have Part D</strong>.
                      </p>
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <p className="text-sm text-red-900 font-semibold mb-2">How the Penalty Is Calculated:</p>
                        <p className="text-sm text-red-800">
                          1% of the national base premium ($34.70 in 2026) × number of months without coverage.<br />
                          <strong>Example:</strong> 24 months without coverage = $0.35 × 24 = <strong>$8.33/month penalty forever</strong>.
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-red-900 font-semibold mb-2">How to Avoid the Penalty:</p>
                        <ul className="space-y-1.5">
                          {[
                            "Enroll in Part D when first eligible",
                            "Maintain creditable drug coverage (employer, VA, TRICARE)",
                            "Keep your creditable coverage notice as proof",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-red-600" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
                        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Next Steps */}
              <section id="next-steps" className="mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Find the Right Part D Plan for Your Medications
                  </h2>
                  <p className="text-purple-100 mb-6 max-w-xl">
                    Part D plans vary significantly in formularies, pharmacy networks, and costs. Our licensed agents can help you find the plan that covers your specific medications at the lowest cost.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors">
                      <Phone className="w-4 h-4" /> Call (888) 335-8996
                    </a>
                    <Link href="/medicare-plans/compare" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                      Compare All Plan Types <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
