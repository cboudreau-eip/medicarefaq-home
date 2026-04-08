/**
 * Online Guides Hub Page — /online-guides
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { BookOpen, ArrowRight, Star, Clock, Users } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const guides = [
  {
    category: "Getting Started",
    color: "bg-teal-50 border-teal-200",
    headerColor: "text-teal-700",
    items: [
      { title: "New to Medicare: Complete Beginner's Guide", href: "/new-to-medicare", time: "15 min read", popular: true },
      { title: "Turning 65 and Medicare Enrollment", href: "/new-to-medicare/turning-65", time: "10 min read", popular: true },
      { title: "Medicare Eligibility Requirements", href: "/original-medicare/medicare-eligibility", time: "8 min read", popular: false },
      { title: "Medicare Enrollment Periods Explained", href: "/original-medicare/medicare-enrollment-periods", time: "12 min read", popular: true },
    ],
  },
  {
    category: "Original Medicare (Parts A & B)",
    color: "bg-blue-50 border-blue-200",
    headerColor: "text-blue-700",
    items: [
      { title: "Medicare Part A: Hospital Insurance Guide", href: "/original-medicare/medicare-parts/medicare-part-a", time: "10 min read", popular: false },
      { title: "Medicare Part B: Medical Insurance Guide", href: "/original-medicare/medicare-parts/medicare-part-b", time: "10 min read", popular: false },
      { title: "What Does Medicare Cover?", href: "/original-medicare/medicare-coverage", time: "12 min read", popular: true },
      { title: "Medicare Costs in 2026", href: "/original-medicare/medicare-costs", time: "8 min read", popular: true },
    ],
  },
  {
    category: "Medicare Supplement (Medigap)",
    color: "bg-purple-50 border-purple-200",
    headerColor: "text-purple-700",
    items: [
      { title: "Medicare Supplement Plans Overview", href: "/medicare-supplements", time: "15 min read", popular: true },
      { title: "Medigap Plan G: Complete Guide", href: "/medicare-supplements/medicare-supplement-plans/plan-g", time: "12 min read", popular: true },
      { title: "Medigap Plan N vs Plan G Comparison", href: "/medicare-supplements/medicare-supplement-plans/plan-n", time: "10 min read", popular: false },
      { title: "Medigap Eligibility & Enrollment", href: "/medicare-supplements/medigap-eligibility", time: "8 min read", popular: false },
    ],
  },
  {
    category: "Medicare Advantage (Part C)",
    color: "bg-amber-50 border-amber-200",
    headerColor: "text-amber-700",
    items: [
      { title: "Medicare Advantage Plans Guide", href: "/medicare-part-c/medicare-advantage-plans", time: "15 min read", popular: true },
      { title: "HMO vs PPO Medicare Advantage Plans", href: "/medicare-part-c/medicare-advantage-hmo-plans", time: "10 min read", popular: false },
      { title: "Medicare Advantage Costs Explained", href: "/medicare-part-c/medicare-advantage-costs", time: "8 min read", popular: false },
      { title: "Medicare Advantage vs Original Medicare", href: "/medicare-part-c/medicare-advantage-vs-original-medicare", time: "12 min read", popular: true },
    ],
  },
  {
    category: "Prescription Drug Coverage (Part D)",
    color: "bg-green-50 border-green-200",
    headerColor: "text-green-700",
    items: [
      { title: "Medicare Part D: Drug Coverage Guide", href: "/original-medicare/medicare-parts/medicare-part-d", time: "12 min read", popular: true },
      { title: "Part D Costs & Premiums in 2026", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-costs", time: "8 min read", popular: false },
      { title: "Medicare Donut Hole Explained", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-donut-hole", time: "8 min read", popular: false },
      { title: "Part D Enrollment Periods", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-enrollment-periods", time: "8 min read", popular: false },
    ],
  },
  {
    category: "Special Situations",
    color: "bg-red-50 border-red-200",
    headerColor: "text-red-700",
    items: [
      { title: "Caregiver's Guide to Medicare", href: "/caregiver-guide", time: "20 min read", popular: true },
      { title: "Medicare for People Under 65", href: "/new-to-medicare/medicare-under-65", time: "10 min read", popular: false },
      { title: "Medicare and Employer Coverage", href: "/enrollment/employer-coverage", time: "10 min read", popular: false },
      { title: "Medicare for Federal Employees (FEHB)", href: "/new-to-medicare/medicare-fehb", time: "8 min read", popular: false },
    ],
  },
];

export default function OnlineGuides() {
  useSEO({
    title: "Medicare Online Guides | MedicareFAQ Learning Center",
    description: "Browse MedicareFAQ's complete library of Medicare online guides. Comprehensive, easy-to-understand guides covering all parts of Medicare, Medigap, Medicare Advantage, and Part D.",
    canonical: "https://www.medicarefaq.com/online-guides",
    ogType: "website",
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
          <div className="max-w-5xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Online Guides</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <BookOpen className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">Medicare Online Guides</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  Our comprehensive Medicare guides cover everything from enrollment basics to advanced plan comparisons. Written by licensed Medicare specialists and reviewed for accuracy.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <BookOpen size={16} />
                <span>50+ in-depth guides</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <Users size={16} />
                <span>Written by licensed specialists</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <Star size={16} />
                <span>Updated for 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((section, si) => (
              <div key={si} className={`border rounded-xl p-5 ${section.color}`}>
                <h2 className={`font-bold text-lg mb-4 ${section.headerColor}`}>{section.category}</h2>
                <ul className="space-y-3">
                  {section.items.map((item, ii) => (
                    <li key={ii}>
                      <Link
                        href={item.href}
                        className="flex items-start gap-2 group"
                      >
                        <ArrowRight className="text-gray-400 group-hover:text-teal-500 mt-0.5 shrink-0 transition-colors" size={15} />
                        <div>
                          <span className="text-gray-800 group-hover:text-teal-700 font-medium text-sm leading-snug transition-colors">
                            {item.title}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-gray-400 text-xs flex items-center gap-1">
                              <Clock size={11} />
                              {item.time}
                            </span>
                            {item.popular && (
                              <span className="bg-amber-100 text-amber-700 text-xs px-1.5 py-0.5 rounded font-medium">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Need Personalized Guidance?</h3>
            <p className="text-blue-200 mb-6 max-w-xl mx-auto">
              Our licensed Medicare specialists can answer your specific questions and help you find the best plan for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/compare-rates"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Compare Plans <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
