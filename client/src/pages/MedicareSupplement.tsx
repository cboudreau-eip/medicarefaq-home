/**
 * Medicare Supplement (Medigap) Plans Page
 * Design: Comprehensive guide with plan comparison chart, enrollment info,
 * and cost breakdowns for all 10 standardized Medigap plans.
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Shield,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Star,
  Clock,
  Users,
  FileText,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "What Is Medigap?" },
  { id: "how-it-works", label: "How Medigap Works" },
  { id: "plan-comparison", label: "Plan Comparison Chart" },
  { id: "popular-plans", label: "Most Popular Plans" },
  { id: "costs", label: "Costs & Pricing" },
  { id: "enrollment", label: "When to Enroll" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const planChart = [
  { benefit: "Part A Hospital Coinsurance", A: "✓", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "✓", N: "✓" },
  { benefit: "Part B Coinsurance/Copay", A: "✓", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "✓", N: "✓†" },
  { benefit: "Blood (First 3 Pints)", A: "✓", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "✓", N: "✓" },
  { benefit: "Part A Hospice Coinsurance", A: "✓", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "✓", N: "✓" },
  { benefit: "Skilled Nursing Facility", A: "✗", B: "✗", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "✓", N: "✓" },
  { benefit: "Part A Deductible ($1,676)", A: "✗", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "50%", N: "✓" },
  { benefit: "Part B Deductible ($257)", A: "✗", B: "✗", C: "✓", D: "✗", F: "✓", G: "✗", K: "✗", L: "✗", M: "✗", N: "✗" },
  { benefit: "Part B Excess Charges", A: "✗", B: "✗", C: "✗", D: "✗", F: "✓", G: "✓", K: "✗", L: "✗", M: "✗", N: "✗" },
  { benefit: "Foreign Travel Emergency", A: "✗", B: "✗", C: "✓", D: "✓", F: "✓", G: "✓", K: "✗", L: "✗", M: "✓", N: "✓" },
];

const faqs = [
  {
    q: "What's the difference between Medigap and Medicare Advantage?",
    a: "Medigap supplements Original Medicare by covering deductibles and coinsurance, with no networks. Medicare Advantage replaces Original Medicare with an all-in-one plan from a private insurer that typically includes drug coverage and extras but uses provider networks. You cannot have both simultaneously.",
  },
  {
    q: "Which Medigap plan is the best?",
    a: "Plan G is widely considered the best overall value. It covers everything except the Part B annual deductible ($257 in 2026), and its premiums are significantly lower than Plan F. Plan N is a good budget alternative with slightly lower premiums but includes small copays for some visits.",
  },
  {
    q: "Can I switch Medigap plans later?",
    a: "You can apply to switch plans at any time, but outside your Medigap Open Enrollment Period (first 6 months of having Part B at age 65+), insurance companies can use medical underwriting. This means you could be denied coverage or charged more based on health conditions. Some states have additional protections.",
  },
  {
    q: "Does Medigap cover prescription drugs?",
    a: "No. Medigap plans do not include prescription drug coverage. You'll need to enroll in a separate Medicare Part D plan for medications. If you delay Part D enrollment without creditable coverage, you may face a permanent late enrollment penalty.",
  },
  {
    q: "Why are Plans C and F no longer available to new enrollees?",
    a: "The Medicare Access and CHIP Reauthorization Act (MACRA) of 2015 prohibited Medigap plans from covering the Part B deductible for new Medicare enrollees after January 1, 2020. Plans C and F covered this deductible, so they're only available to those who were eligible for Medicare before that date.",
  },
  {
    q: "How much does Medigap cost?",
    a: "Premiums vary widely based on your age, location, gender, tobacco use, and the insurance company. Plan G typically ranges from $100–$300/month, while Plan N ranges from $75–$225/month. The same plan can vary by 50% or more between companies in the same area, so comparing quotes is essential.",
  },
];

export default function MedicareSupplement() {
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Medicare Supplement</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Medigap Plans</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Supplement (Medigap) Plans
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Fill the gaps in Original Medicare with standardized supplemental coverage. No networks, predictable costs, and nationwide acceptance.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#plan-comparison" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Compare All Plans <ArrowRight className="w-4 h-4" />
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
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
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
                  What Is Medicare Supplement (Medigap)?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  <strong>Medicare Supplement Insurance (Medigap)</strong> is a type of private health insurance that works alongside Original Medicare (Parts A & B) to help pay for out-of-pocket costs that Medicare doesn't cover — including deductibles, coinsurance, and copayments.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Medigap plans are <strong>federally standardized</strong>, meaning each plan letter (A through N) offers the same benefits regardless of which insurance company sells it. The only difference between companies is the premium price and customer service.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: Shield, title: "Standardized Benefits", desc: "Plan G from Company A = Plan G from Company B. Same coverage, guaranteed." },
                    { icon: Users, title: "No Networks", desc: "See any doctor or hospital in the U.S. that accepts Medicare. No referrals needed." },
                    { icon: DollarSign, title: "Predictable Costs", desc: "Know exactly what you'll pay each month. No surprise bills from covered services." },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <item.icon className="w-6 h-6 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-1 text-sm">{item.title}</h3>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* How It Works */}
              <section id="how-it-works" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How Medigap Works
                </h2>
                <div className="space-y-4 mb-8">
                  {[
                    { step: "1", title: "You must have Original Medicare", desc: "You need both Medicare Part A and Part B. Medigap works alongside Original Medicare — it cannot be used with Medicare Advantage." },
                    { step: "2", title: "Medicare pays its share first", desc: "When you receive medical care, Original Medicare processes the claim and pays its portion according to standard coverage rules." },
                    { step: "3", title: "Medigap covers the rest", desc: "Your Medigap plan then pays some or all of the remaining costs (deductibles, coinsurance, copays) based on your specific plan letter." },
                    { step: "4", title: "You pay your monthly premium", desc: "You pay a monthly premium to your Medigap insurance company, plus your Part B premium to Medicare. That's typically your only cost." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-white rounded-xl border border-slate-200">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" /> What Medigap Does NOT Cover
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Prescription drugs (need Part D)",
                      "Dental, vision, and hearing care",
                      "Long-term care / nursing home",
                      "Private-duty nursing",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-red-800">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Plan Comparison Chart */}
              <section id="plan-comparison" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medigap Plan Comparison Chart
                </h2>
                <p className="text-slate-600 mb-6">
                  All 10 standardized Medigap plans at a glance. Plans C and F are only available if you were eligible for Medicare before January 1, 2020.
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="text-left py-3 px-3 font-semibold min-w-[180px]">Benefit</th>
                        {["A", "B", "C*", "D", "F*", "G", "K", "L", "M", "N"].map((plan) => (
                          <th key={plan} className={`py-3 px-2 font-semibold text-center ${plan === "G" ? "bg-teal-700" : ""}`}>
                            {plan}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {planChart.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-2.5 px-3 text-slate-700 font-medium">{row.benefit}</td>
                          {[row.A, row.B, row.C, row.D, row.F, row.G, row.K, row.L, row.M, row.N].map((val, j) => (
                            <td key={j} className={`py-2.5 px-2 text-center ${j === 5 ? "bg-teal-50" : ""}`}>
                              {val === "✓" ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                              ) : val === "✗" ? (
                                <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                              ) : (
                                <span className="text-amber-600 font-semibold">{val}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  *Plans C and F are only available to those eligible for Medicare before January 1, 2020.<br />
                  †Plan N pays 100% of Part B coinsurance, except for a copay of up to $20 for some office visits and up to $50 for ER visits that don't result in admission.
                </p>
              </section>

              {/* Most Popular Plans */}
              <section id="popular-plans" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Most Popular Medigap Plans
                </h2>
                <div className="space-y-6">
                  {/* Plan G */}
                  <div className="bg-white rounded-xl border-2 border-teal-200 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg flex items-center gap-1">
                      <Star className="w-3 h-3" /> Most Popular
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Plan G</h3>
                    <p className="text-slate-600 mb-4">
                      The gold standard of Medigap coverage. Plan G covers <strong>everything except the Part B annual deductible</strong> ($257 in 2026). For most people, Plan G offers the best balance of comprehensive coverage and reasonable premiums.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 text-sm mb-2">What Plan G Covers</h4>
                        <ul className="space-y-1.5">
                          {["Part A hospital deductible ($1,676)", "Part B coinsurance (20%)", "Part B excess charges", "Skilled nursing facility coinsurance", "Foreign travel emergency", "Blood (first 3 pints)", "Hospice coinsurance"].map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-green-800">
                              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-green-600" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="bg-slate-50 rounded-lg p-4 mb-3">
                          <p className="text-xs text-slate-500 mb-1">Typical Monthly Premium</p>
                          <p className="text-2xl font-bold text-slate-900">$100 – $300</p>
                          <p className="text-xs text-slate-500">Varies by age, location, and insurer</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4">
                          <p className="text-xs text-amber-700 font-semibold mb-1">Your Only Out-of-Pocket Cost</p>
                          <p className="text-lg font-bold text-amber-900">$257/year</p>
                          <p className="text-xs text-amber-700">Part B deductible (the only thing not covered)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plan N */}
                  <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">Plan N</h3>
                      <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Budget-Friendly</span>
                    </div>
                    <p className="text-slate-600 mb-4">
                      A cost-effective alternative to Plan G with slightly lower premiums. The trade-off: you'll pay small copays for some office visits (up to $20) and ER visits that don't result in admission (up to $50). Plan N does <strong>not</strong> cover Part B excess charges.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">Typical Monthly Premium</p>
                        <p className="text-2xl font-bold text-slate-900">$75 – $225</p>
                        <p className="text-xs text-slate-500">15–25% less than Plan G on average</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">Additional Costs</p>
                        <p className="text-sm text-slate-700">Up to <strong>$20</strong> copay for office visits</p>
                        <p className="text-sm text-slate-700">Up to <strong>$50</strong> copay for ER (no admission)</p>
                      </div>
                    </div>
                  </div>

                  {/* Plan F */}
                  <div className="bg-white rounded-xl border-2 border-slate-200 p-6 opacity-80">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">Plan F</h3>
                      <span className="text-xs font-semibold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">Legacy Plan</span>
                    </div>
                    <p className="text-slate-600 mb-2">
                      The most comprehensive Medigap plan — covers <strong>everything</strong>, including the Part B deductible. However, it's only available to those who were eligible for Medicare before January 1, 2020, and premiums are typically higher than Plan G.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                      <p className="text-sm text-amber-800">
                        <strong>Note:</strong> Even if you're eligible for Plan F, Plan G is often a better value. You'd pay $257/year for the Part B deductible but typically save $300–$600/year in lower premiums.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Costs */}
              <section id="costs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medigap Costs & Pricing
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medigap premiums vary based on several factors. The same plan can cost significantly different amounts depending on where you live and which company you choose — so comparing quotes is essential.
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Factor</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Impact on Premium</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Age", "Premiums increase with age. Most companies use attained-age pricing."],
                        ["Location (ZIP Code)", "Costs vary significantly by state and even county."],
                        ["Gender", "Women often pay slightly less than men for the same plan."],
                        ["Tobacco Use", "Smokers typically pay 10–25% more in premiums."],
                        ["Insurance Company", "Same plan benefits, but premiums can vary 50%+ between companies."],
                        ["Household Discount", "Many companies offer 5–10% off if your spouse also enrolls."],
                      ].map(([factor, impact], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 text-slate-900 font-medium">{factor}</td>
                          <td className="py-3 px-4 text-slate-600">{impact}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-teal-50 border-l-4 border-teal-400 p-5 rounded-r-xl">
                  <p className="font-semibold text-teal-900 mb-1">Pro Tip: Compare Multiple Companies</p>
                  <p className="text-sm text-teal-800">
                    Since Medigap benefits are standardized, the only difference between companies is price and customer service. Always compare at least 3–5 companies before enrolling. A licensed agent can pull quotes from multiple carriers at once — at no cost to you.
                  </p>
                </div>
              </section>

              {/* Enrollment */}
              <section id="enrollment" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  When to Enroll in Medigap
                </h2>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-blue-900 text-lg mb-2">Medigap Open Enrollment Period</h3>
                      <p className="text-blue-800 mb-3">
                        Your <strong>best and most important</strong> window to enroll is your 6-month Medigap Open Enrollment Period, which starts the month you turn 65 <strong>and</strong> are enrolled in Part B.
                      </p>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-blue-900 font-semibold mb-2">During this period, insurance companies:</p>
                        <ul className="space-y-1.5">
                          {[
                            "Cannot deny you coverage for any reason",
                            "Cannot charge more due to health conditions",
                            "Must offer you any Medigap plan they sell",
                            "Cannot impose waiting periods for pre-existing conditions",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Don't Miss This Window</p>
                      <p className="text-sm text-amber-800">
                        After your Medigap OEP closes, insurance companies can use <strong>medical underwriting</strong> — meaning they can deny coverage or charge higher premiums based on your health history. This is a one-time, use-it-or-lose-it opportunity for guaranteed-issue coverage.
                      </p>
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

              {/* Next Steps CTA */}
              <section id="next-steps" className="mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Compare Medigap Plans in Your Area
                  </h2>
                  <p className="text-blue-100 mb-6 max-w-xl">
                    Our licensed agents can compare rates from top Medigap carriers in your area — at no cost to you. Find the best plan and price for your specific needs.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
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
