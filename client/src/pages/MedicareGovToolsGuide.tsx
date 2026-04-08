/**
 * Seniors Guide to Medicare.gov Tools & Resources — /seniors-guide-to-medicare-gov/tools-and-resources
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Monitor, Search, FileText, Phone, Shield, ArrowRight, CheckCircle2, ExternalLink, Star } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const tools = [
  {
    icon: Search,
    name: "Medicare Plan Finder",
    url: "https://www.medicare.gov/plan-compare",
    desc: "Compare Medicare Advantage and Part D drug plans available in your area. Enter your ZIP code and current medications to find plans that cover your drugs at the lowest cost.",
    steps: [
      "Go to medicare.gov/plan-compare",
      "Enter your ZIP code",
      "Add your current medications",
      "Compare plans by premium, deductible, and drug costs",
      "Enroll directly online or call Medicare",
    ],
  },
  {
    icon: FileText,
    name: "Medicare & You Handbook",
    url: "https://www.medicare.gov/medicare-and-you",
    desc: "The official Medicare handbook is updated each fall and mailed to all Medicare beneficiaries. It covers all parts of Medicare, costs, and coverage options for the coming year.",
    steps: [
      "Download the PDF at medicare.gov/medicare-and-you",
      "Request a printed copy by calling 1-800-MEDICARE",
      "Use the handbook to review your coverage options during open enrollment",
    ],
  },
  {
    icon: Monitor,
    name: "MyMedicare.gov Account",
    url: "https://www.mymedicare.gov",
    desc: "Create a free MyMedicare.gov account to view your Medicare claims, check your coverage, track your deductibles, and manage your Medicare information online.",
    steps: [
      "Visit mymedicare.gov and create an account",
      "Link your Medicare number",
      "View claims and explanation of benefits",
      "Check your Medicare Summary Notice (MSN)",
      "Track your Part B deductible and Part D out-of-pocket spending",
    ],
  },
  {
    icon: Phone,
    name: "1-800-MEDICARE Helpline",
    url: "https://www.medicare.gov/talk-to-someone",
    desc: "The official Medicare helpline is available 24/7. Representatives can answer questions about coverage, help you find plans, report fraud, and assist with enrollment.",
    steps: [
      "Call 1-800-633-4227 (1-800-MEDICARE)",
      "Available 24 hours a day, 7 days a week",
      "TTY: 1-877-486-2048 for hearing impaired",
      "Have your Medicare card ready when you call",
    ],
  },
  {
    icon: Shield,
    name: "SHIP (State Health Insurance Assistance Program)",
    url: "https://www.shiphelp.org",
    desc: "SHIP provides free, unbiased Medicare counseling through trained volunteers in every state. SHIP counselors can help you understand your options and compare plans at no cost.",
    steps: [
      "Visit shiphelp.org to find your local SHIP office",
      "Call your state SHIP for a free one-on-one counseling session",
      "Bring your Medicare card, current plan information, and medication list",
      "SHIP counselors are not insurance agents and do not sell plans",
    ],
  },
  {
    icon: Search,
    name: "Medicare Coverage Finder",
    url: "https://www.medicare.gov/coverage",
    desc: "Look up whether a specific service, test, or item is covered by Medicare. Search by procedure name or medical condition to find coverage details.",
    steps: [
      "Go to medicare.gov/coverage",
      "Search for the service or item you need",
      "Review coverage rules and any conditions that apply",
      "Check if prior authorization is required",
    ],
  },
];

export default function MedicareGovToolsGuide() {
  useSEO({
    title: "Seniors Guide to Medicare.gov Tools & Resources | MedicareFAQ",
    description: "A complete guide to the free tools and resources available on Medicare.gov. Learn how to use the Plan Finder, MyMedicare account, SHIP counseling, and more.",
    canonical: "https://www.medicarefaq.com/seniors-guide-to-medicare-gov/tools-and-resources",
    ogType: "article",
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar />
        <HeaderBar />
        <MegaMenu />
      </header>
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#1B3A6B] text-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/seniors-guide-to-medicare-gov" className="hover:text-white">Seniors Guide to Medicare.gov</Link>
              <span>/</span>
              <span className="text-white">Tools &amp; Resources</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <Monitor className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">Medicare.gov Tools &amp; Resources Guide</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  Medicare.gov offers a suite of free tools to help beneficiaries compare plans, manage their coverage, and get answers. This guide walks you through the most useful resources and how to use them effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Intro */}
          <p className="text-gray-700 text-lg leading-relaxed mb-8 border-l-4 border-teal-500 pl-4">
            Medicare.gov is the official U.S. government website for Medicare information. It offers free tools that can help you compare plans, review your coverage, check your claims, and find local assistance. Here is a guide to the most important tools available.
          </p>

          {/* Tools */}
          <div className="space-y-8 mb-12">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <section key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4 flex items-center gap-3 border-b border-gray-200">
                    <div className="bg-teal-100 rounded-lg p-2">
                      <Icon className="text-teal-600" size={20} />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800">{tool.name}</h2>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                      >
                        {tool.url} <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{tool.desc}</p>
                    <h3 className="font-semibold text-gray-700 text-sm mb-2">How to Use It:</h3>
                    <ul className="space-y-1.5">
                      {tool.steps.map((step, si) => (
                        <li key={si} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={14} />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Tips */}
          <section className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="text-amber-500" size={20} />
              <h2 className="font-bold text-gray-800 text-lg">Tips for Using Medicare.gov</h2>
            </div>
            <ul className="space-y-2">
              {[
                "Always use medicare.gov (not .com or .org) to ensure you are on the official government site",
                "The Plan Finder is updated each fall with new plan information — use it during open enrollment (Oct 15 – Dec 7)",
                "Create a MyMedicare.gov account as soon as you enroll — it makes tracking claims much easier",
                "SHIP counselors are free and unbiased — they are an excellent resource if you feel overwhelmed",
                "If you find a discrepancy in your claims, report it through your MyMedicare account or by calling 1-800-MEDICARE",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="text-amber-500 mt-0.5 shrink-0" size={14} />
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          {/* Related */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Medicare Enrollment Periods", href: "/original-medicare/medicare-enrollment-periods" },
                { label: "Medicare Coverage Guide", href: "/original-medicare/medicare-coverage" },
                { label: "Medicare Costs 2026", href: "/original-medicare/medicare-costs" },
                { label: "Compare Medicare Plans", href: "/compare-rates" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors text-sm text-gray-700 hover:text-teal-700 font-medium"
                >
                  <ArrowRight className="text-teal-500 shrink-0" size={14} />
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Need Help Comparing Plans?</h3>
            <p className="text-blue-200 mb-6">
              Our licensed Medicare specialists can help you use these tools and find the right plan for your needs.
            </p>
            <Link
              href="/compare-rates"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Compare Plans <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
