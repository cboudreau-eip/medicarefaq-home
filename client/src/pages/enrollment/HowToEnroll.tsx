/**
 * How to Enroll Page
 * Design: Step-by-step enrollment process guide with clear methods,
 * documents needed, and enrollment paths for different coverage types.
 * Color accent: amber/orange (#D97706) matching the Enrollment section identity.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  FileText,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Building2,
  Users,
  Shield,
  Calendar,
  DollarSign,
  HelpCircle,
  Briefcase,
  Monitor,
  MapPin,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "overview", label: "Enrollment Overview" },
  { id: "original-medicare", label: "Enroll in Original Medicare" },
  { id: "medicare-advantage", label: "Enroll in Medicare Advantage" },
  { id: "part-d", label: "Enroll in Part D" },
  { id: "medigap", label: "Enroll in Medigap" },
  { id: "documents", label: "Documents You'll Need" },
  { id: "enrollment-methods", label: "Enrollment Methods" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const faqs = [
  {
    q: "Can I enroll in Medicare online?",
    a: "Yes. You can enroll in Medicare Parts A and B online at ssa.gov (Social Security's website). The online application takes about 10-15 minutes. For Medicare Advantage and Part D plans, you can enroll through the plan's website, Medicare.gov, or by calling the plan directly.",
  },
  {
    q: "How long does it take to get my Medicare card?",
    a: "After enrolling, you'll typically receive your Medicare card within 2-4 weeks. If you're automatically enrolled (because you're receiving Social Security), your card arrives about 3 months before your 65th birthday. Keep your card in a safe place — you'll need it when visiting doctors and hospitals.",
  },
  {
    q: "Can I enroll in Medicare and a supplement plan at the same time?",
    a: "You can apply for both at the same time, but your Medigap coverage won't start until your Part B is effective. Many people apply for both during their IEP so everything is ready to go when their Medicare starts. A licensed agent can help coordinate the timing.",
  },
  {
    q: "Do I need to enroll in Medicare if I have VA benefits?",
    a: "VA benefits are not considered creditable coverage for Medicare purposes. However, many veterans choose to enroll in Medicare Part A (which is free) as a backup. Whether to enroll in Part B depends on your individual situation. Talk to a licensed agent to understand your options.",
  },
  {
    q: "What if I need help with the enrollment process?",
    a: "You have several free options: call Social Security at 1-800-772-1213, visit your local Social Security office, contact your State Health Insurance Assistance Program (SHIP), or call a licensed Medicare agent like our team at (888) 335-8996. We can walk you through the entire process at no cost.",
  },
  {
    q: "Can someone else enroll me in Medicare?",
    a: "Yes. An authorized representative can enroll you in Medicare on your behalf. This could be a family member, legal guardian, or someone you've designated with power of attorney. They'll need to provide proper documentation of their authority to act on your behalf.",
  },
];

export default function HowToEnroll() {
  useCMSSEO({
    contentType: "page",
    slug: "how-to-enroll",
    title: "How to Enroll in Medicare | Step-by-Step Guide | MedicareFAQ",
    description: "Learn how to enroll in Medicare step by step. Find out when to sign up, how to apply online or by phone, and what to do if you missed your enrollment window.",
    canonical: "https://www.medicarefaq.com/medicare-enrollment/how-to-enroll/",
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
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-teal-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-200/70">Enrollment</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-100">How to Enroll</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-teal-200" />
            </div>
            <span className="text-sm font-semibold text-teal-200 uppercase tracking-wider">Step-by-Step Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            How to Enroll in Medicare: A Complete Guide
          </h1>
          <p className="text-lg text-teal-100/90 max-w-2xl mb-8">
            Ready to sign up? This guide walks you through exactly how to enroll in Original Medicare, Medicare Advantage, Part D, and Medigap — with every method available to you.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#original-medicare" className="inline-flex items-center gap-2 bg-white text-teal-800 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
              Start Enrolling <ArrowRight className="w-4 h-4" />
            </a>
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              <Phone className="w-4 h-4" /> Get Free Help
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
                <div className="mt-8 p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <p className="text-sm font-semibold text-teal-900 mb-1">Need Enrollment Help?</p>
                  <p className="text-xs text-teal-700 mb-3">We'll guide you through every step</p>
                  <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-bold text-teal-700">
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
                  Medicare Enrollment Overview
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Enrolling in Medicare involves several separate steps depending on which coverage you want. <strong>Original Medicare (Parts A & B)</strong> is enrolled through Social Security, while <strong>Medicare Advantage</strong>, <strong>Part D</strong>, and <strong>Medigap</strong> plans are enrolled through private insurance companies.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  This guide covers the enrollment process for each type of coverage, the documents you'll need, and all the ways you can sign up.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Enroll During the Right Window</p>
                      <p className="text-sm text-amber-800">
                        Before enrolling, make sure you're in a valid enrollment period. Enrolling outside of your enrollment window may not be possible or could result in delayed coverage. See our <Link href="/enrollment/turning-65" className="text-amber-700 underline font-semibold">Turning 65 Enrollment</Link> guide for timing details.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Original Medicare */}
              <section id="original-medicare" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How to Enroll in Original Medicare (Parts A & B)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Original Medicare enrollment is handled by the <strong>Social Security Administration (SSA)</strong>, not by Medicare directly. Here are your three options:
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-white rounded-xl border-2 border-teal-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                        <Monitor className="w-6 h-6 text-teal-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-900 text-lg">Option 1: Online at SSA.gov</h3>
                          <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">Fastest</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">
                          The quickest way to enroll. Visit <strong>ssa.gov</strong> and use the online application. It takes about 10-15 minutes and you can do it from home.
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-teal-600" /> Available 24/7</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-teal-600" /> No appointment needed</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-teal-600" /> Get confirmation immediately</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">Option 2: By Phone</h3>
                        <p className="text-sm text-slate-600 mb-3">
                          Call Social Security at <strong>1-800-772-1213</strong> (TTY: 1-800-325-0778). Representatives are available Monday through Friday, 8 a.m. to 7 p.m. local time.
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-600" /> Speak with a representative</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-600" /> Ask questions during enrollment</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" /> Wait times may be long</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">Option 3: In Person</h3>
                        <p className="text-sm text-slate-600 mb-3">
                          Visit your local Social Security office. You can find the nearest office at <strong>ssa.gov/locator</strong>. An appointment is recommended but walk-ins are accepted.
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-purple-600" /> Face-to-face assistance</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-purple-600" /> Bring documents for immediate processing</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" /> Limited hours, may require appointment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medicare Advantage */}
              <section id="medicare-advantage" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How to Enroll in Medicare Advantage (Part C)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare Advantage plans are offered by private insurance companies approved by Medicare. You must already be enrolled in Parts A and B before you can join a Medicare Advantage plan.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Steps to Enroll in Medicare Advantage:</h3>
                  <div className="space-y-3">
                    {[
                      { step: "1", title: "Ensure you have Parts A & B", desc: "You must be enrolled in both Medicare Part A and Part B to join a Medicare Advantage plan." },
                      { step: "2", title: "Compare plans in your area", desc: "Use Medicare.gov's Plan Finder or call a licensed agent to compare MA plans available in your ZIP code." },
                      { step: "3", title: "Check provider networks", desc: "Make sure your doctors, hospitals, and pharmacies are in the plan's network." },
                      { step: "4", title: "Review the drug formulary", desc: "If the plan includes drug coverage (MA-PD), check that your medications are covered." },
                      { step: "5", title: "Enroll during a valid enrollment period", desc: "Sign up during your IEP, AEP (Oct 15 – Dec 7), or a qualifying SEP." },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-blue-700">
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Enrollment Methods for MA Plans</p>
                      <p className="text-sm text-blue-800">
                        You can enroll in a Medicare Advantage plan by calling the insurance company directly, visiting their website, using Medicare.gov, or working with a licensed Medicare agent who can handle the enrollment for you.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Part D */}
              <section id="part-d" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How to Enroll in Part D (Prescription Drug Coverage)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  If you choose Original Medicare (not Medicare Advantage), you'll need a standalone Part D plan for prescription drug coverage. Part D plans are offered by private insurance companies.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Steps to Enroll in Part D:</h3>
                  <div className="space-y-3">
                    {[
                      { step: "1", title: "List your current medications", desc: "Include drug names, dosages, and how often you take them." },
                      { step: "2", title: "Compare Part D plans", desc: "Use Medicare.gov's Plan Finder or call a licensed agent to find plans that cover your drugs at the lowest cost." },
                      { step: "3", title: "Check your pharmacy", desc: "Make sure your preferred pharmacy is in the plan's network for the best pricing." },
                      { step: "4", title: "Enroll during a valid period", desc: "Sign up during your IEP, AEP (Oct 15 – Dec 7), or a qualifying SEP." },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-purple-700">
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Don't Skip Part D</p>
                      <p className="text-sm text-amber-800">
                        Even if you don't take many medications now, enrolling in Part D when first eligible avoids the permanent late enrollment penalty. Plans with low premiums provide affordable coverage you can upgrade later if your needs change.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medigap */}
              <section id="medigap" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How to Enroll in Medigap (Medicare Supplement)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medigap plans fill the gaps in Original Medicare — covering deductibles, copays, and coinsurance. They're sold by private insurance companies and can be enrolled in at any time, though your <strong>best opportunity</strong> is during your Medigap Open Enrollment Period.
                </p>

                <div className="bg-gradient-to-r from-teal-50 to-green-50 border-2 border-teal-200 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-teal-900 mb-4">Medigap Enrollment Best Practices</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-teal-900">Enroll during your Medigap OEP</p>
                        <p className="text-xs text-teal-700">6-month window starting when Part B is effective. Guaranteed issue — no health questions.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-teal-900">Compare plans and rates</p>
                        <p className="text-xs text-teal-700">All Medigap plans with the same letter (e.g., Plan G) offer identical benefits regardless of company. Compare on price and company reputation.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-teal-900">Work with a licensed agent</p>
                        <p className="text-xs text-teal-700">An independent agent can compare rates from multiple carriers and handle the application for you — at no cost.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900 mb-1">Outside Your Medigap OEP</p>
                      <p className="text-sm text-red-800">
                        If you apply for Medigap after your 6-month OEP, insurance companies can use medical underwriting. This means they can ask health questions, charge higher premiums, or deny coverage based on pre-existing conditions (in most states).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Documents */}
              <section id="documents" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Documents You'll Need
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Having the right documents ready will make the enrollment process smoother. Here's what you may need depending on your situation:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3 text-sm">For Original Medicare (SSA)</h3>
                    <div className="space-y-2">
                      {[
                        "Social Security number",
                        "Date of birth",
                        "U.S. citizenship or legal residency proof",
                        "Current employer info (if still working)",
                        "Bank account info (for premium payments)",
                      ].map((doc, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <span className="text-xs text-slate-600">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3 text-sm">For Supplemental Plans</h3>
                    <div className="space-y-2">
                      {[
                        "Medicare card (or Medicare number)",
                        "Part A and Part B effective dates",
                        "Current prescription list (for Part D)",
                        "Preferred doctors and pharmacies",
                        "Creditable coverage letter (if applicable)",
                      ].map((doc, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <span className="text-xs text-slate-600">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 sm:col-span-2">
                    <h3 className="font-semibold text-amber-900 mb-3 text-sm">For Special Enrollment Period (SEP)</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Proof of prior creditable coverage",
                        "Employer coverage termination letter",
                        "Date employment ended",
                        "Creditable coverage letter from employer",
                      ].map((doc, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <FileText className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                          <span className="text-xs text-amber-800">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Enrollment Methods Summary */}
              <section id="enrollment-methods" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Enrollment Methods at a Glance
                </h2>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-800 text-white">
                        <th className="text-left p-4 font-semibold text-sm rounded-tl-lg">Coverage Type</th>
                        <th className="text-left p-4 font-semibold text-sm">Where to Enroll</th>
                        <th className="text-left p-4 font-semibold text-sm rounded-tr-lg">Methods</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { type: "Original Medicare (A & B)", where: "Social Security Administration", methods: "Online (ssa.gov), Phone, In Person" },
                        { type: "Medicare Advantage (Part C)", where: "Private Insurance Company", methods: "Agent, Plan Website, Medicare.gov, Phone" },
                        { type: "Part D (Drug Plans)", where: "Private Insurance Company", methods: "Agent, Plan Website, Medicare.gov, Phone" },
                        { type: "Medigap (Supplement)", where: "Private Insurance Company", methods: "Agent, Plan Website, Phone, Mail" },
                      ].map((row, i) => (
                        <tr key={i} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/50" : ""}`}>
                          <td className="p-4 text-sm font-semibold text-slate-700">{row.type}</td>
                          <td className="p-4 text-sm text-slate-600">{row.where}</td>
                          <td className="p-4 text-sm text-slate-600">{row.methods}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Ready to Enroll? Let Us Help.
                  </h2>
                  <p className="text-teal-100 mb-6 max-w-xl">
                    Our licensed Medicare agents can compare plans in your area, walk you through the enrollment process, and handle the paperwork — all at no cost to you. We work with multiple carriers to find the best fit for your needs.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                      <Phone className="w-4 h-4" /> Call (888) 335-8996
                    </a>
                    <Link href="/medicare-plans/compare" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                      Compare Plans First <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* Related Pages */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/enrollment/turning-65" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-colors">
                  <Calendar className="w-5 h-5 text-teal-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 text-sm mb-1">Turning 65 Enrollment</h3>
                  <p className="text-xs text-slate-500">Your Initial Enrollment Period</p>
                </Link>
                <Link href="/enrollment/late-penalties" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-teal-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 text-sm mb-1">Late Penalties</h3>
                  <p className="text-xs text-slate-500">Avoid costly penalties</p>
                </Link>
                <Link href="/medicare-plans/compare" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-colors">
                  <Shield className="w-5 h-5 text-teal-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 text-sm mb-1">Compare Plans</h3>
                  <p className="text-xs text-slate-500">Side-by-side plan comparison</p>
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
