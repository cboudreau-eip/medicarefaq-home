/**
 * MedigapCarrierTemplate
 * Route: /medicare-supplements/medigap-by-carrier/:carrierSlug
 * Data-driven template for all Medigap by-carrier pages.
 */

import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import {
  Shield, ChevronDown, Phone, ArrowRight, CheckCircle2, XCircle,
  Star, Building2, MapPin, Globe, AlertTriangle
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { getCarrierBySlug } from "@/lib/medigap-carrier-data";

const PLAN_LETTERS = ["A", "B", "C", "D", "F", "G", "HD-F", "HD-G", "K", "L", "M", "N"];

const PRICING_BADGE: Record<string, { label: string; color: string }> = {
  budget: { label: "Budget-Friendly", color: "bg-green-100 text-green-800 border-green-200" },
  mid: { label: "Mid-Range", color: "bg-blue-100 text-blue-800 border-blue-200" },
  premium: { label: "Premium Pricing", color: "bg-purple-100 text-purple-800 border-purple-200" },
};

export default function MedigapCarrierTemplate() {
  const params = useParams<{ carrierSlug: string }>();
  const carrier = getCarrierBySlug(params.carrierSlug ?? "");

  useEffect(() => { window.scrollTo(0, 0); }, [params.carrierSlug]);

  useCMSSEO({
    contentType: "page",
    slug: carrier ? `medigap-carrier-${carrier.slug}` : "medigap-carrier-unknown",
    title: carrier?.metaTitle ?? "Medigap Carrier | MedicareFAQ",
    description: carrier?.metaDescription ?? "Compare Medicare Supplement plans from this carrier.",
    canonical: carrier?.canonical ?? "",
    ogImage: carrier?.ogImage ?? "",
    ogType: "article",
  });

  if (!carrier) {
    return (
      <div className="min-h-screen bg-white">
        <UtilityBar /><HeaderBar /><MegaMenu /><MobileNav />
        <div className="container py-24 text-center">
          <Shield className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-700 mb-2">Carrier Not Found</h1>
          <p className="text-slate-500 mb-6">We couldn't find information for this carrier.</p>
          <Link href="/medicare-supplements/medigap-by-carrier" className="inline-flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
            View All Carriers
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pricingBadge = PRICING_BADGE[carrier.pricingTier];

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements/medigap-by-carrier" className="hover:text-white transition-colors">By Carrier</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">{carrier.shortName}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${pricingBadge.color}`}>
              {pricingBadge.label}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            {carrier.name}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Medicare Supplement Plans — 2026 Rates, Reviews & Coverage
          </p>
          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Star className="w-4 h-4 text-amber-400" />
              <span>AM Best: <strong className="text-white">{carrier.amBestRating}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>HQ: <strong className="text-white">{carrier.hq}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Available in <strong className="text-white">{carrier.statesAvailable} states</strong></span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${carrier.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Compare {carrier.shortName} Rates
            </a>
            <Link href="/medicare-supplements/compare" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              Compare All Carriers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">

          {/* Overview */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              About {carrier.shortName}
            </h2>
            <p className="text-slate-600 leading-relaxed">{carrier.overview}</p>
          </div>

          {/* Plan availability table */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Available Medigap Plans
            </h2>
            <p className="text-slate-600 mb-6 text-sm">
              All Medigap plans are standardized by federal law — a Plan G from {carrier.shortName} offers identical benefits to a Plan G from any other carrier. The only difference is the premium.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {PLAN_LETTERS.map((letter) => {
                const planData = carrier.plans.find((p) => p.letter === letter);
                const available = planData?.available ?? false;
                return (
                  <div key={letter} className={`p-3 rounded-xl border text-center ${available ? "border-teal-200 bg-teal-50" : "border-slate-200 bg-slate-50 opacity-50"}`}>
                    <div className={`text-lg font-black mb-1 ${available ? "text-teal-700" : "text-slate-400"}`}>
                      {letter}
                    </div>
                    {available ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                    {planData?.note && (
                      <p className="text-[9px] text-amber-700 mt-1 leading-tight">{planData.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Plan C and Plan F are not available to anyone who became eligible for Medicare on or after January 1, 2020.
            </p>
          </div>

          {/* Popular plans */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Most Popular Plans from {carrier.shortName}
            </h2>
            <div className="flex flex-wrap gap-3">
              {carrier.popularPlans.map((letter) => (
                <Link
                  key={letter}
                  href={`/medicare-supplements/${letter === "HD-G" ? "high-deductible-plan-g" : letter === "HD-F" ? "high-deductible-plan-f" : `plan-${letter.toLowerCase()}`}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  Plan {letter}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Strengths & Considerations */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {carrier.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
              <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Considerations
              </h3>
              <ul className="space-y-2">
                {carrier.considerations.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Best for / Not ideal for */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="p-5 border border-slate-200 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Best For</p>
              <p className="text-slate-700 text-sm leading-relaxed">{carrier.bestFor}</p>
            </div>
            <div className="p-5 border border-slate-200 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Not Ideal For</p>
              <p className="text-slate-700 text-sm leading-relaxed">{carrier.notIdealFor}</p>
            </div>
          </div>

          {/* Pricing note */}
          <div className="mb-14 p-5 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">Pricing Overview</p>
            <p className="text-blue-900 text-sm leading-relaxed">{carrier.pricingNote}</p>
          </div>

          {/* CTA */}
          <div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-3">Compare {carrier.shortName} Rates</h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Our licensed Medicare agents compare {carrier.shortName} rates against other top carriers at no cost to you. Get your personalized quote in minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link href="/medicare-supplements/compare" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
                Compare All Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
