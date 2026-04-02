/**
 * Working Past 65 Page
 * Design: Educational layout covering employer coverage coordination with Medicare,
 * when to enroll, HSA considerations, and Special Enrollment Period details.
 * Color accent: amber/orange (#D97706) matching the Enrollment section identity.
 */

import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import {
  Briefcase,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  Clock,
  HelpCircle,
  Building2,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "Working Past 65 & Medicare" },
  { id: "employer-size", label: "Employer Size Matters" },
  { id: "what-to-enroll", label: "What to Enroll In Now" },
  { id: "sep", label: "Special Enrollment Period" },
  { id: "hsa", label: "HSA Considerations" },
  { id: "cobra", label: "COBRA & Medicare" },
  { id: "spouse-coverage", label: "Spouse's Employer Coverage" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const faqs = [
  {
    q: "I'm 65 and still working. Do I have to sign up for Medicare?",
    a: "It depends on your employer size. If your employer has 20 or more employees, your employer coverage is primary and you can delay Part B without penalty. However, you should still enroll in Part A since it's free and doesn't affect your employer coverage. If your employer has fewer than 20 employees, Medicare is primary and you should enroll in both Parts A and B at 65.",
  },
  {
    q: "What is creditable coverage?",
    a: "Creditable coverage is health insurance that is considered at least as good as Medicare. Employer group health plans from companies with 20+ employees generally qualify as creditable coverage. This means you can delay Medicare Part B enrollment without facing a late enrollment penalty. Your employer's HR department can confirm whether your coverage is creditable.",
  },
  {
    q: "When should I enroll in Part B after I stop working?",
    a: "You have an 8-month Special Enrollment Period (SEP) that begins the month after your employment ends or your employer coverage ends, whichever comes first. You should enroll in Part B during this window to avoid a gap in coverage and late enrollment penalties.",
  },
  {
    q: "Can I keep my employer coverage and have Medicare too?",
    a: "Yes, in many cases you can have both. If your employer has 20+ employees, your employer plan pays first (primary) and Medicare pays second (secondary). Some people keep employer coverage for their spouse or dependents while also enrolling in Medicare. Talk to your HR department about how your plan coordinates with Medicare.",
  },
  {
    q: "What happens to my HSA when I enroll in Medicare?",
    a: "Once you enroll in any part of Medicare (including Part A), you can no longer contribute to a Health Savings Account. If you want to keep contributing to your HSA, you should delay all parts of Medicare, including Part A. Note: If you're collecting Social Security, you'll be automatically enrolled in Part A, which would end your HSA eligibility.",
  },
  {
    q: "Is COBRA considered creditable coverage for Medicare?",
    a: "No. COBRA is not considered creditable coverage for Medicare purposes. If you're 65+ and on COBRA, you should enroll in Medicare during your Initial Enrollment Period or you may face late enrollment penalties. Medicare is always primary over COBRA coverage.",
  },
];

export default function WorkingPast65() {
  useSEO({
    title: "Working Past 65 and Medicare | What You Need to Know | MedicareFAQ",
    description: "If you're still working past 65 with employer coverage, you may be able to delay Medicare without penalty. Learn how employer insurance coordinates with Medicare and when to enroll.",
    canonical: "https://www.medicarefaq.com/faqs/when-should-you-enroll-in-medicare-if-still-working/",
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
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-slate-400">Enrollment</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-amber-400">Working Past 65</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Employer Coverage</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Working Past 65: Medicare & Employer Coverage
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Still working with employer health insurance? Learn when to enroll in Medicare, how your coverage coordinates, and how to avoid penalties when you retire.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#employer-size" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Check Your Situation <ArrowRight className="w-4 h-4" />
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
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">In This Guide</p>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-amber-50 text-amber-700 font-semibold"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-sm font-semibold text-amber-900 mb-1">Still Working?</p>
                  <p className="text-xs text-amber-700 mb-3">We'll help you coordinate your coverage</p>
                  <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-bold text-amber-700">
                    <Phone className="w-4 h-4" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* Overview */}
              <section id="overview" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Working Past 65 & Medicare
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  If you're still working when you turn 65, you don't necessarily have to enroll in all parts of Medicare right away. Whether you should enroll now or delay depends primarily on the <strong>size of your employer</strong> and whether your employer coverage qualifies as <strong>creditable coverage</strong>.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Making the wrong decision here can be costly — enrolling too early could mean paying for duplicate coverage, while delaying too long without creditable coverage can result in permanent late enrollment penalties. This guide helps you navigate the decision.
                </p>
              </section>

              {/* Employer Size */}
              <section id="employer-size" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Your Employer Size Determines Your Path
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  The number of employees at your company determines which insurance — Medicare or your employer plan — pays first (is "primary"). This is the single most important factor in your decision.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Large Employer */}
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-green-900">20+ Employees</h3>
                        <span className="text-xs font-semibold text-green-600">Employer Plan Is Primary</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-green-800">Can delay Part B without penalty</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-green-800">Employer coverage is creditable</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-green-800">Enroll in Part A (it's free)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-green-800">8-month SEP when you leave</span>
                      </div>
                    </div>
                    <p className="text-xs text-green-700 bg-green-100 rounded-lg p-3">
                      <strong>Action:</strong> Enroll in Part A at 65. Delay Part B until you leave your job or lose employer coverage.
                    </p>
                  </div>

                  {/* Small Employer */}
                  <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-red-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-red-900">Fewer Than 20 Employees</h3>
                        <span className="text-xs font-semibold text-red-600">Medicare Is Primary</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-red-800">Must enroll in Parts A & B at 65</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-red-800">Medicare pays first, employer pays second</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-red-800">Delaying Part B = penalties</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-red-800">Employer may require Medicare enrollment</span>
                      </div>
                    </div>
                    <p className="text-xs text-red-700 bg-red-100 rounded-lg p-3">
                      <strong>Action:</strong> Enroll in both Part A and Part B during your IEP. Also enroll in Part D or supplemental coverage.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Not Sure About Your Employer Size?</p>
                      <p className="text-sm text-blue-800">
                        Contact your HR department or benefits administrator. Ask specifically whether your employer group health plan is considered <strong>creditable coverage</strong> for Medicare purposes. They're required to provide this information.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* What to Enroll In */}
              <section id="what-to-enroll" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What to Enroll In While Still Working
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Even if you're delaying full Medicare enrollment, there are steps you should take at 65:
                </p>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-800 text-white">
                        <th className="text-left p-4 font-semibold text-sm rounded-tl-lg">Coverage</th>
                        <th className="text-left p-4 font-semibold text-sm">Large Employer (20+)</th>
                        <th className="text-left p-4 font-semibold text-sm rounded-tr-lg">Small Employer (&lt;20)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="p-4 text-sm font-semibold text-slate-700">Part A</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-sm text-green-700">
                            <CheckCircle2 className="w-4 h-4" /> Enroll (free)
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-sm text-green-700">
                            <CheckCircle2 className="w-4 h-4" /> Enroll (free)
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td className="p-4 text-sm font-semibold text-slate-700">Part B</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-sm text-amber-700">
                            <Clock className="w-4 h-4" /> Can delay
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-sm text-green-700">
                            <CheckCircle2 className="w-4 h-4" /> Must enroll
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="p-4 text-sm font-semibold text-slate-700">Part D</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-sm text-amber-700">
                            <Clock className="w-4 h-4" /> Can delay if creditable
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-sm text-green-700">
                            <CheckCircle2 className="w-4 h-4" /> Enroll
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td className="p-4 text-sm font-semibold text-slate-700">Medigap / MA</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-sm text-amber-700">
                            <Clock className="w-4 h-4" /> Wait until Part B starts
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-sm text-green-700">
                            <CheckCircle2 className="w-4 h-4" /> Enroll with Part B
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Special Enrollment Period */}
              <section id="sep" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Your Special Enrollment Period (SEP)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  When you stop working or lose your employer coverage, you qualify for a <strong>Special Enrollment Period (SEP)</strong> to sign up for Medicare Part B without penalty. This is your critical transition window.
                </p>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-amber-900 mb-4 text-lg">SEP Key Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-amber-100">
                      <Calendar className="w-5 h-5 text-amber-600 mb-2" />
                      <p className="text-sm font-semibold text-slate-900">Duration</p>
                      <p className="text-sm text-slate-600">8 months from the month employment or coverage ends (whichever comes first)</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-amber-100">
                      <Clock className="w-5 h-5 text-amber-600 mb-2" />
                      <p className="text-sm font-semibold text-slate-900">Coverage Start</p>
                      <p className="text-sm text-slate-600">Part B starts the 1st of the month after you enroll during your SEP</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-amber-100">
                      <Shield className="w-5 h-5 text-amber-600 mb-2" />
                      <p className="text-sm font-semibold text-slate-900">Medigap Rights</p>
                      <p className="text-sm text-slate-600">Your 6-month Medigap OEP begins when Part B starts — guaranteed issue rights apply</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-amber-100">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 mb-2" />
                      <p className="text-sm font-semibold text-slate-900">No Penalty</p>
                      <p className="text-sm text-slate-600">No late enrollment penalty when you enroll during your SEP</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900 mb-1">Don't Miss Your 8-Month Window</p>
                      <p className="text-sm text-red-800">
                        If you miss your SEP, you'll have to wait until the General Enrollment Period (January 1 – March 31), your coverage won't start until July 1, and you'll face a permanent Part B late enrollment penalty.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* HSA Considerations */}
              <section id="hsa" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  HSA Considerations
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  If you have a Health Savings Account (HSA), Medicare enrollment has important implications. Understanding these rules can save you from tax penalties.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-100">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900 mb-1">You Cannot Contribute to an HSA Once Enrolled in Medicare</p>
                      <p className="text-sm text-red-800">
                        Once you enroll in any part of Medicare — including Part A — you are no longer eligible to contribute to an HSA. This applies even if you're still working and have an HSA-eligible health plan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-amber-50 rounded-xl border border-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Social Security = Automatic Part A</p>
                      <p className="text-sm text-amber-800">
                        If you're collecting Social Security benefits, you'll be automatically enrolled in Part A at 65, which ends your HSA contribution eligibility. To keep contributing, you must delay Social Security.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-green-50 rounded-xl border border-green-100">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-green-900 mb-1">You Can Still Use HSA Funds</p>
                      <p className="text-sm text-green-800">
                        Even after enrolling in Medicare, you can use existing HSA funds tax-free to pay for Medicare premiums, deductibles, copays, and other qualified medical expenses. You just can't make new contributions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Pro Tip: Stop HSA Contributions 6 Months Early</p>
                      <p className="text-sm text-blue-800">
                        Medicare Part A can be retroactive up to 6 months. If you plan to enroll in Part A, stop HSA contributions at least 6 months before your Part A effective date to avoid potential tax penalties on excess contributions.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* COBRA */}
              <section id="cobra" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  COBRA & Medicare: Important Warning
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Many people assume COBRA continuation coverage will protect them from Medicare penalties. <strong>It will not.</strong> This is one of the most common and costly mistakes people make.
                </p>

                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h3 className="font-bold text-red-900 text-lg">COBRA Is NOT Creditable Coverage</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-red-800">COBRA does not count as creditable coverage for delaying Medicare Part B</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-red-800">COBRA does not trigger a Special Enrollment Period when it ends</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-red-800">If you're 65+ on COBRA, Medicare is always primary</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-red-800">Relying on COBRA instead of Medicare can result in permanent late penalties</span>
                    </div>
                  </div>
                  <p className="text-sm text-red-700 mt-4 bg-red-100 rounded-lg p-3">
                    <strong>Bottom line:</strong> If you're 65 or older and your employment has ended, enroll in Medicare — don't rely on COBRA as your primary coverage.
                  </p>
                </div>
              </section>

              {/* Spouse Coverage */}
              <section id="spouse-coverage" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Covered Under Your Spouse's Employer Plan?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  If you're covered under your <strong>spouse's employer health plan</strong>, the same rules apply based on the employer's size. The key factor is whether your spouse's employer has 20 or more employees.
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-2">Spouse's Employer Has 20+ Employees</h3>
                    <p className="text-sm text-slate-600">
                      Your spouse's employer plan is primary. You can delay Part B without penalty. When your spouse retires or you lose coverage, you'll get an 8-month SEP to enroll in Part B.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-2">Spouse's Employer Has Fewer Than 20 Employees</h3>
                    <p className="text-sm text-slate-600">
                      Medicare is primary. You should enroll in both Parts A and B during your IEP at 65. Your spouse's plan would pay secondary to Medicare.
                    </p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                    <h3 className="font-semibold text-amber-900 mb-2">Your Spouse Is Under 65</h3>
                    <p className="text-sm text-amber-800">
                      If your spouse is under 65 and covered under your employer plan, consider how your Medicare enrollment affects their coverage. Some people keep employer coverage specifically to cover a younger spouse until they become Medicare-eligible.
                    </p>
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
                <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Need Help Coordinating Coverage?
                  </h2>
                  <p className="text-slate-300 mb-6 max-w-xl">
                    Our licensed agents specialize in helping people who are working past 65 navigate the transition to Medicare. We'll review your employer coverage, help you understand your options, and ensure you don't face any penalties.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                      <Phone className="w-4 h-4" /> Call (888) 335-8996
                    </a>
                    <Link href="/enrollment/turning-65" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                      Turning 65 Guide <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* Related Pages */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/enrollment/turning-65" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <Calendar className="w-5 h-5 text-amber-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 text-sm mb-1">Turning 65 Enrollment</h3>
                  <p className="text-xs text-slate-500">Your Initial Enrollment Period</p>
                </Link>
                <Link href="/enrollment/late-penalties" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 text-sm mb-1">Late Penalties</h3>
                  <p className="text-xs text-slate-500">Avoid costly penalties</p>
                </Link>
                <Link href="/enrollment/how-to-enroll" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors">
                  <Shield className="w-5 h-5 text-amber-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 text-sm mb-1">How to Enroll</h3>
                  <p className="text-xs text-slate-500">Step-by-step enrollment guide</p>
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
