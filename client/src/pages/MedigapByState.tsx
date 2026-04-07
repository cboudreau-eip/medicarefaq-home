/**
 * MedigapByState — index page
 * Route: /medicare-supplements/medigap-by-state
 */

import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { MapPin, ChevronDown, Phone, ArrowRight, AlertTriangle } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { STATE_DATA } from "@/lib/medigap-state-data";

export default function MedigapByState() {
  useSEO({
    title: "Medigap Plans by State 2026 | Medicare Supplement State Guide",
    description: "Compare Medicare Supplement (Medigap) plans by state. Find state-specific rules, top carriers, and average premiums for Plan G and other plans in your state.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/medigap-by-state/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    ogType: "website",
  });

  const stateSpecific = STATE_DATA.filter((s) => !s.isStandardized);
  const standardized = STATE_DATA.filter((s) => s.isStandardized);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">By State</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-teal-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medigap Plans by State
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Medicare Supplement rules, carriers, and premiums vary by state. Find state-specific guidance for your location.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Get State-Specific Rates
            </a>
            <Link href="/medicare-supplements/compare" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              Compare All Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">

          {/* States with unique rules */}
          {stateSpecific.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
                  States with Unique Medigap Rules
                </h2>
              </div>
              <p className="text-slate-500 mb-6 ml-8">
                Massachusetts, Minnesota, and Wisconsin have their own standardized plan structures that differ from the federal system.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stateSpecific.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/medicare-supplements/medigap-by-state/${state.slug}`}
                    className="group block p-6 border-2 border-amber-200 bg-amber-50 rounded-xl hover:border-amber-400 hover:bg-amber-100 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-lg font-black text-white">{state.abbreviation}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-amber-800 transition-colors">{state.name}</h3>
                        <span className="text-xs font-semibold text-amber-700 bg-amber-200 px-2 py-0.5 rounded-full">State-Specific Plans</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{state.overview.slice(0, 120)}...</p>
                    <div className="flex items-center gap-1 mt-3 text-sm font-semibold text-amber-700 group-hover:gap-2 transition-all">
                      View {state.name} Plans <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Federally standardized states */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
              States with Federal Medigap Standardization
            </h2>
            <p className="text-slate-500 mb-6">
              These states follow the federal lettered plan structure (Plans A–N). Benefits are identical across carriers — only premiums differ.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {standardized.map((state) => (
                <Link
                  key={state.slug}
                  href={`/medicare-supplements/medigap-by-state/${state.slug}`}
                  className="group flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-lg font-black text-white">{state.abbreviation}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors">{state.name}</h3>
                    <p className="text-xs text-slate-500 truncate">Avg Plan G: {state.avgPlanGPremium}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Not Sure Which Plan Is Right for Your State?</h3>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Our licensed Medicare agents can compare Medigap plans and rates in your specific state at no cost to you.
            </p>
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Call (888) 335-8996
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
