/**
 * MedigapPlanTemplate
 * Data-driven template for all 10 Medigap plan letter pages + HD variants.
 * Route: /medicare-supplements/:planSlug
 */

import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import {
  Shield,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Star,
  Users,
  Info,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { MEDIGAP_PLANS, type MedigapPlanData } from "@/lib/medigap-plan-data";
import NotFound from "./NotFound";

const PLAN_ORDER = ["A", "B", "C", "D", "F", "G", "HD-F", "HD-G", "K", "L", "M", "N"];

function BenefitIcon({ covered }: { covered: "full" | "partial" | "none" }) {
  if (covered === "full") return <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />;
  if (covered === "partial") return <MinusCircle className="w-5 h-5 text-amber-500 shrink-0" />;
  return <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
}

function PlanPageContent({ plan }: { plan: MedigapPlanData }) {
  useCMSSEO({
    contentType: "page",
    slug: `medigap-${plan.slug}`,
    title: plan.metaTitle,
    description: plan.metaDescription,
    canonical: plan.canonical,
    ogImage: plan.ogImage,
    ogType: "article",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const relatedPlans = plan.relatedPlans
    .map((slug) => MEDIGAP_PLANS[slug])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${plan.heroColor} pt-8 pb-16 overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Plan {plan.letter}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xs font-bold text-white uppercase tracking-wider px-3 py-1 rounded-full ${plan.badgeColor}`}>
              {plan.badge}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            {plan.displayName}
          </h1>
          <p className="text-lg text-slate-300 mb-4 max-w-2xl">{plan.tagline}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm">
            <div>
              <span className="text-slate-400">Monthly Premium</span>
              <div className="text-white font-bold text-lg">{plan.monthlyPremiumRange}</div>
            </div>
            {plan.outOfPocketMax && (
              <div>
                <span className="text-slate-400">Out-of-Pocket Max</span>
                <div className="text-white font-bold text-lg">{plan.outOfPocketMax}</div>
              </div>
            )}
            <div>
              <span className="text-slate-400">New Enrollees</span>
              <div className={`font-bold text-lg ${plan.availableToNewEnrollees ? "text-green-400" : "text-red-400"}`}>
                {plan.availableToNewEnrollees ? "Available" : "Not Available"}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Get a Free Quote
            </a>
            <Link href="/medicare-supplements/compare" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              Compare All Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Not available banner */}
      {!plan.availableToNewEnrollees && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="container py-3 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Availability Notice:</strong> {plan.displayName} is only available to people who were eligible for Medicare before January 1, 2020. If you became eligible after that date, consider{" "}
              <Link href="/medicare-supplements/plan-g" className="underline font-semibold">Plan G</Link> instead.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="flex gap-12">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Quick nav */}
                <div>
                  <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">On This Page</p>
                  <nav className="space-y-1">
                    {[
                      { id: "overview", label: "Overview" },
                      { id: "benefits", label: "What's Covered" },
                      { id: "pros-cons", label: "Pros & Cons" },
                      { id: "faqs", label: "FAQs" },
                      { id: "related", label: "Related Plans" },
                    ].map((item) => (
                      <a key={item.id} href={`#${item.id}`}
                        className="block text-sm py-1.5 px-3 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Best for / Not for */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Best For</p>
                  <p className="text-sm text-green-700">{plan.bestFor}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Not Ideal For</p>
                  <p className="text-sm text-red-700">{plan.notFor}</p>
                </div>

                {/* CTA */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Ready to Enroll?</p>
                  <p className="text-xs text-blue-700 mb-3">Speak with a licensed Medicare agent — free, no obligation</p>
                  <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-bold text-blue-700">
                    <Phone className="w-4 h-4" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0 max-w-3xl">

              {/* Overview */}
              <section id="overview" className="mb-14">
                <h2 className="text-3xl font-bold text-slate-900 mb-5" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Is {plan.displayName}?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5 text-lg">{plan.intro}</p>
                {plan.detailParagraphs.map((para, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed mb-4">{para}</p>
                ))}

                {/* Highlights */}
                <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-teal-600" /> Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {plan.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Benefits */}
              <section id="benefits" className="mb-14">
                <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Does Plan {plan.letter} Cover?
                </h2>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-800 px-4 py-3 grid grid-cols-[1fr_auto] gap-4">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Benefit</span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider text-right">Coverage</span>
                  </div>
                  {plan.benefits.map((b, i) => (
                    <div key={i} className={`px-4 py-3 flex items-start gap-3 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} border-b border-slate-100 last:border-0`}>
                      <BenefitIcon covered={b.covered} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800">{b.benefit}</p>
                        {b.detail && <p className="text-xs text-slate-500 mt-0.5">{b.detail}</p>}
                      </div>
                      <span className={`text-xs font-semibold shrink-0 ${
                        b.covered === "full" ? "text-green-700" :
                        b.covered === "partial" ? "text-amber-600" : "text-red-500"
                      }`}>
                        {b.covered === "full" ? "Covered" : b.covered === "partial" ? "Partial" : "Not Covered"}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                  <Info className="w-3 h-3" /> All Medigap plans are standardized by federal law. Benefits are identical regardless of which insurer you choose.
                </p>
              </section>

              {/* Pros & Cons */}
              <section id="pros-cons" className="mb-14">
                <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Plan {plan.letter} Pros & Cons
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                    <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Pros
                    </h3>
                    <ul className="space-y-3">
                      {plan.proscons.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                          <span className="text-green-600 mt-0.5">✓</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                    <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5" /> Cons
                    </h3>
                    <ul className="space-y-3">
                      {plan.proscons.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                          <span className="text-red-500 mt-0.5">✗</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section id="faqs" className="mb-14">
                <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {plan.faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-800 pr-4">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-slate-600 leading-relaxed text-sm border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Plans */}
              {relatedPlans.length > 0 && (
                <section id="related" className="mb-14">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                    Compare Related Plans
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {relatedPlans.map((related) => (
                      <Link key={related.slug} href={`/medicare-supplements/${related.slug}`}
                        className="p-5 border border-slate-200 rounded-xl hover:border-teal-400 hover:shadow-md transition-all group">
                        <div className={`inline-flex items-center gap-1 text-xs font-bold text-white px-2 py-0.5 rounded-full mb-3 ${related.badgeColor}`}>
                          Plan {related.letter}
                        </div>
                        <p className="font-semibold text-slate-800 text-sm mb-1 group-hover:text-teal-700">{related.displayName}</p>
                        <p className="text-xs text-slate-500">{related.monthlyPremiumRange}</p>
                        <div className="flex items-center gap-1 text-teal-600 text-xs font-semibold mt-3">
                          View Plan <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA */}
              <section className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ready to Compare {plan.displayName} Quotes?</h3>
                    <p className="text-slate-300 text-sm mb-6">
                      Our licensed Medicare agents compare rates from multiple carriers at no cost to you. Get your personalized quote in minutes.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
                        <Phone className="w-4 h-4" /> Call (888) 335-8996
                      </a>
                      <Link href="/compare-rates" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20 text-sm">
                        Compare Rates Online <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
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

export default function MedigapPlanTemplate() {
  const params = useParams<{ planSlug: string }>();
  const planSlug = params.planSlug;

  const plan = MEDIGAP_PLANS[planSlug];
  if (!plan) return <NotFound />;

  return <PlanPageContent plan={plan} />;
}
