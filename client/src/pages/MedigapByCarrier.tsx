/**
 * Medigap by Carrier Index Page
 * Route: /medicare-supplements/medigap-by-carrier
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Shield, ChevronDown, Phone, ArrowRight, Star, Globe, Building2 } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { CARRIER_DATA } from "@/lib/medigap-carrier-data";

const PRICING_BADGE: Record<string, { label: string; color: string }> = {
  budget: { label: "Budget-Friendly", color: "bg-green-100 text-green-700 border-green-200" },
  mid: { label: "Mid-Range", color: "bg-blue-100 text-blue-700 border-blue-200" },
  premium: { label: "Premium", color: "bg-purple-100 text-purple-700 border-purple-200" },
};

export default function MedigapByCarrier() {
  useCMSSEO({
    contentType: "page",
    slug: "medigap-by-carrier",
    title: "Medigap Plans by Carrier: Compare Top Medicare Supplement Insurers",
    description: "Compare Medicare Supplement plans from top carriers including Mutual of Omaha, Aetna, Humana, UnitedHealthcare, and more. Find the best Medigap carrier for your needs.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/medigap-by-carrier/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    ogType: "website",
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const topCarriers = CARRIER_DATA.filter((c) => ["mutual-of-omaha-medigap-plans", "aetna-medicare-supplement-plans", "humana-medigap-plans", "united-healthcare-medigap-plans"].includes(c.slug));
  const otherCarriers = CARRIER_DATA.filter((c) => !topCarriers.includes(c));

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
            <span className="text-teal-400">By Carrier</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medigap Plans by Carrier
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Compare Medicare Supplement plans from {CARRIER_DATA.length} top-rated insurance carriers. All plans are federally standardized — the only difference is the price.
          </p>
          <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            <Phone className="w-4 h-4" /> Compare Rates Free
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-5xl">

          {/* Key reminder */}
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl mb-12 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">All Medigap Plans Are Federally Standardized</p>
              <p className="text-sm text-blue-800">
                A Plan G from Mutual of Omaha offers identical benefits to a Plan G from Aetna, Humana, or any other carrier. The only difference between carriers is the monthly premium. This means shopping for the best price is the single most effective way to save money on Medigap.
              </p>
            </div>
          </div>

          {/* Top-rated carriers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Top-Rated Carriers
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {topCarriers.map((carrier) => {
                const badge = PRICING_BADGE[carrier.pricingTier];
                return (
                  <Link
                    key={carrier.slug}
                    href={`/medicare-supplements/medigap-by-carrier/${carrier.slug}`}
                    className="block p-6 border border-slate-200 rounded-xl hover:border-teal-400 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{carrier.shortName}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Est. {carrier.founded} · {carrier.hq}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>{badge.label}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" /> {carrier.amBestRating}</span>
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-blue-500" /> {carrier.statesAvailable} states</span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">{carrier.overview.split(".")[0]}.</p>
                    <div className="flex items-center gap-1 text-teal-700 font-semibold text-sm">
                      View Plans <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* All other carriers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              All Carriers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...topCarriers, ...otherCarriers].map((carrier) => {
                const badge = PRICING_BADGE[carrier.pricingTier];
                return (
                  <Link
                    key={carrier.slug}
                    href={`/medicare-supplements/medigap-by-carrier/${carrier.slug}`}
                    className="block p-4 border border-slate-200 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-800 group-hover:text-teal-700 transition-colors text-sm">{carrier.shortName}</h3>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${badge.color}`}>{badge.label}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" /> {carrier.amBestRating}</span>
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-blue-500" /> {carrier.statesAvailable} states</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {carrier.popularPlans.map((p) => (
                        <span key={p} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Plan {p}</span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-3">Not Sure Which Carrier to Choose?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Our licensed Medicare agents compare rates from all major carriers at no cost to you. We'll help you find the best plan and price for your specific situation.
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
