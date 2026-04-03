/**
 * Medicare Advantage (Part C) Page
 * Design: Comprehensive guide covering MA plan types, benefits, costs,
 * enrollment, and comparison with Original Medicare.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  Heart,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Shield,
  Star,
  Clock,
  Users,
  Stethoscope,
  Pill,
  Eye,
  Activity,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "What Is Medicare Advantage?" },
  { id: "plan-types", label: "Types of MA Plans" },
  { id: "benefits", label: "Benefits & Extras" },
  { id: "costs", label: "Costs & Out-of-Pocket" },
  { id: "pros-cons", label: "Pros & Cons" },
  { id: "enrollment", label: "When to Enroll" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const planTypes = [
  { name: "HMO", full: "Health Maintenance Organization", desc: "Requires you to use in-network providers and get referrals for specialists. Typically the lowest premiums.", popular: true },
  { name: "PPO", full: "Preferred Provider Organization", desc: "Allows out-of-network care at higher cost. No referrals needed for specialists. More flexibility.", popular: true },
  { name: "PFFS", full: "Private Fee-for-Service", desc: "Determines how much it will pay providers and how much you pay. Providers must accept plan terms.", popular: false },
  { name: "SNP", full: "Special Needs Plan", desc: "Designed for people with specific diseases, limited income, or who live in certain institutions.", popular: false },
  { name: "MSA", full: "Medical Savings Account", desc: "Combines a high-deductible plan with a bank account. Medicare deposits money for medical expenses.", popular: false },
];

const faqs = [
  {
    q: "Can I have both Medicare Advantage and Medigap?",
    a: "No. You cannot have a Medigap policy and a Medicare Advantage plan at the same time. If you switch from Original Medicare + Medigap to Medicare Advantage, you'll need to drop your Medigap policy. Be cautious — you may not be able to get Medigap back later without medical underwriting.",
  },
  {
    q: "Are Medicare Advantage plans really free?",
    a: "Many MA plans have $0 monthly premiums (beyond the Part B premium you must continue paying). However, you'll still have copays, coinsurance, and deductibles when you use services. The 'free' premium doesn't mean free healthcare.",
  },
  {
    q: "What happens if I need care outside my network?",
    a: "With HMO plans, out-of-network care is generally not covered except in emergencies. PPO plans allow out-of-network care but at higher costs. Always check your plan's network before scheduling non-emergency care.",
  },
  {
    q: "Can I switch from Medicare Advantage back to Original Medicare?",
    a: "Yes. You can switch during the Annual Enrollment Period (Oct 15 – Dec 7) or during the Medicare Advantage Open Enrollment Period (Jan 1 – Mar 31). However, getting a Medigap policy after leaving MA may require medical underwriting in most states.",
  },
  {
    q: "Do Medicare Advantage plans cover prescription drugs?",
    a: "Most Medicare Advantage plans include Part D prescription drug coverage (called MA-PD plans). If your MA plan doesn't include drug coverage, you can enroll in a standalone Part D plan, but this is uncommon.",
  },
  {
    q: "How do I know which doctors are in my MA plan's network?",
    a: "Each plan has a provider directory you can search online or request by mail. Before enrolling, verify that your current doctors, specialists, and preferred hospitals are in-network. Networks can change annually.",
  },
];

export default function MedicareAdvantage() {
  useCMSSEO({
    contentType: "page",
    slug: "medicare-advantage",
    title: "Medicare Part C | What is Medicare Part C? (Medicare Advantage)",
    description: "Medicare Part C is health insurance from a private insurance company that becomes your primary source of coverage and assumes your risk from Original Medicare.",
    canonical: "https://www.medicarefaq.com/medicare-part-c/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicare-part-c.jpeg",
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Medicare Advantage</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-600/20 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-teal-400" />
            </div>
            <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Part C</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Advantage (Part C) Plans
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            An all-in-one alternative to Original Medicare offered by private insurers. Includes hospital, medical, usually drug coverage, and often dental, vision, and hearing benefits.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#plan-types" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Explore Plan Types <ArrowRight className="w-4 h-4" />
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
                  What Is Medicare Advantage?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  <strong>Medicare Advantage (Part C)</strong> is an alternative way to receive your Medicare benefits. Instead of getting coverage through the federal government (Original Medicare), you enroll in a plan offered by a private insurance company that contracts with Medicare.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Medicare Advantage plans must cover everything Original Medicare covers, but most plans go further — adding prescription drug coverage, dental, vision, hearing, fitness programs, and other extras. In exchange, you typically use a <strong>network of providers</strong> and may need referrals for specialists.
                </p>
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {[
                    { value: "51%", label: "of Medicare beneficiaries now choose MA" },
                    { value: "$0", label: "premium for many MA plans" },
                    { value: "$8,850", label: "max out-of-pocket (in-network) 2026" },
                    { value: "4,000+", label: "MA plans available nationwide" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center">
                      <div className="text-2xl font-bold text-teal-600 mb-1">{stat.value}</div>
                      <p className="text-xs text-slate-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Plan Types */}
              <section id="plan-types" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Types of Medicare Advantage Plans
                </h2>
                <div className="space-y-4">
                  {planTypes.map((plan, i) => (
                    <div key={i} className={`p-5 rounded-xl border ${plan.popular ? "border-teal-200 bg-teal-50/30" : "border-slate-200 bg-white"}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-lg font-bold ${plan.popular ? "text-teal-700" : "text-slate-700"}`}>{plan.name}</span>
                        <span className="text-sm text-slate-500">({plan.full})</span>
                        {plan.popular && <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Popular</span>}
                      </div>
                      <p className="text-sm text-slate-600">{plan.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Benefits */}
              <section id="benefits" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Benefits & Extra Coverage
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare Advantage plans must cover everything Original Medicare covers. Most plans also include additional benefits not available with Original Medicare:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Pill, title: "Prescription Drugs", desc: "Most MA plans include Part D drug coverage, eliminating the need for a separate plan." },
                    { icon: Eye, title: "Vision Care", desc: "Routine eye exams, eyeglasses, and contact lens allowances included in many plans." },
                    { icon: "🦷", title: "Dental Coverage", desc: "Preventive and sometimes comprehensive dental — cleanings, X-rays, fillings, and more." },
                    { icon: "👂", title: "Hearing Benefits", desc: "Hearing exams and hearing aid allowances, often with significant annual benefits." },
                    { icon: Activity, title: "Fitness Programs", desc: "SilverSneakers or similar gym memberships included at no additional cost." },
                    { icon: Heart, title: "Wellness Programs", desc: "Telehealth, nurse hotlines, meal delivery after hospital stays, and transportation to appointments." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                      {typeof item.icon === "string" ? (
                        <span className="text-2xl">{item.icon}</span>
                      ) : (
                        <item.icon className="w-6 h-6 text-teal-600 shrink-0" />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm">{item.title}</h3>
                        <p className="text-xs text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-teal-50 border-l-4 border-teal-400 p-5 rounded-r-xl">
                  <p className="font-semibold text-teal-900 mb-1">Give Back Benefit</p>
                  <p className="text-sm text-teal-800">
                    Some Medicare Advantage plans offer a <strong>Part B premium reduction</strong> (also called the "Give Back Benefit"), which can reduce your monthly Part B premium by up to $185/month. Not all plans offer this, and availability varies by area.
                  </p>
                </div>
              </section>

              {/* Costs */}
              <section id="costs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Advantage Costs
                </h2>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Cost Component</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Typical Range</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Monthly Premium", "$0 – $150+", "Many plans are $0; you still pay Part B premium"],
                        ["Primary Care Visit", "$0 – $20", "Copay per visit"],
                        ["Specialist Visit", "$20 – $50", "Copay per visit; may need referral (HMO)"],
                        ["Emergency Room", "$50 – $120", "Waived if admitted"],
                        ["Inpatient Hospital", "$200 – $400/day", "Per day for first few days; varies by plan"],
                        ["Max Out-of-Pocket (In-Network)", "Up to $8,850", "2026 federal limit; many plans set lower"],
                        ["Prescription Drugs", "Varies by tier", "Most plans include Part D coverage"],
                      ].map(([item, range, note], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 text-slate-700 font-medium">{item}</td>
                          <td className="py-3 px-4 text-slate-900 font-semibold">{range}</td>
                          <td className="py-3 px-4 text-slate-500">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Pros & Cons */}
              <section id="pros-cons" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Pros & Cons of Medicare Advantage
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5" /> Advantages
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Low or $0 monthly premiums",
                        "Annual out-of-pocket maximum protects you",
                        "Extra benefits (dental, vision, hearing, fitness)",
                        "Prescription drug coverage usually included",
                        "All-in-one plan simplicity",
                        "Some plans offer Part B premium reduction",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-600" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                    <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2 text-lg">
                      <XCircle className="w-5 h-5" /> Disadvantages
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Provider networks limit doctor choices",
                        "May need referrals for specialists (HMO)",
                        "Higher costs for out-of-network care",
                        "Plans change benefits and networks annually",
                        "Prior authorization may be required",
                        "Harder to switch back to Medigap later",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                          <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Enrollment */}
              <section id="enrollment" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  When to Enroll in Medicare Advantage
                </h2>
                <div className="space-y-4">
                  {[
                    { period: "Initial Enrollment Period (IEP)", dates: "3 months before to 3 months after your 65th birthday", desc: "Your first opportunity to enroll in a Medicare Advantage plan when you're newly eligible for Medicare." },
                    { period: "Annual Enrollment Period (AEP)", dates: "October 15 – December 7 each year", desc: "Switch between Original Medicare and Medicare Advantage, or change MA plans. Coverage starts January 1." },
                    { period: "MA Open Enrollment Period (OEP)", dates: "January 1 – March 31 each year", desc: "If you're already in an MA plan, you can switch to a different MA plan or return to Original Medicare + Part D." },
                    { period: "Special Enrollment Period (SEP)", dates: "Varies by qualifying event", desc: "Triggered by events like moving, losing employer coverage, or qualifying for Medicaid. Allows mid-year changes." },
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
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Find Medicare Advantage Plans in Your Area
                  </h2>
                  <p className="text-teal-100 mb-6 max-w-xl">
                    Plans, benefits, and costs vary by ZIP code. Our licensed agents can help you compare Medicare Advantage plans available in your area — at no cost to you.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
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
