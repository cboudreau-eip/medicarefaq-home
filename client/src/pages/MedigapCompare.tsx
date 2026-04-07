/**
 * Medigap Compare Page
 * Route: /medicare-supplements/compare
 * Side-by-side comparison of all 10 standardized Medigap plan letters
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Shield, ChevronDown, Phone, ArrowRight, CheckCircle2, XCircle, MinusCircle, Info } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const PLANS = ["A", "B", "C", "D", "F", "G", "K", "L", "M", "N"];
const HD_PLANS = ["HD-F", "HD-G"];

type CoverageValue = "✓" | "✗" | "50%" | "75%" | "†" | "—";

interface BenefitRow {
  benefit: string;
  note?: string;
  coverage: Record<string, CoverageValue>;
}

const BENEFIT_ROWS: BenefitRow[] = [
  {
    benefit: "Part A Coinsurance & Hospital Costs",
    coverage: { A: "✓", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "✓", L: "✓", M: "✓", N: "✓", "HD-F": "✓", "HD-G": "✓" },
  },
  {
    benefit: "Part A Hospice Coinsurance",
    coverage: { A: "✓", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "✓", N: "✓", "HD-F": "✓", "HD-G": "✓" },
  },
  {
    benefit: `Part A Deductible ($1,676)`,
    coverage: { A: "✗", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "50%", N: "✓", "HD-F": "✓", "HD-G": "✓" },
  },
  {
    benefit: "Part B Coinsurance / Copay",
    coverage: { A: "✓", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "✓", N: "†", "HD-F": "✓", "HD-G": "✓" },
    note: "† Plan N: up to $20 office visit copay, up to $50 ER copay",
  },
  {
    benefit: `Part B Deductible ($257)`,
    coverage: { A: "✗", B: "✗", C: "✓", D: "✗", F: "✓", G: "✗", K: "✗", L: "✗", M: "✗", N: "✗", "HD-F": "✓", "HD-G": "✗" },
  },
  {
    benefit: "Part B Excess Charges",
    coverage: { A: "✗", B: "✗", C: "✗", D: "✗", F: "✓", G: "✓", K: "✗", L: "✗", M: "✗", N: "✗", "HD-F": "✓", "HD-G": "✓" },
  },
  {
    benefit: "Blood (First 3 Pints)",
    coverage: { A: "✓", B: "✓", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "✓", N: "✓", "HD-F": "✓", "HD-G": "✓" },
  },
  {
    benefit: "Skilled Nursing Facility",
    coverage: { A: "✗", B: "✗", C: "✓", D: "✓", F: "✓", G: "✓", K: "50%", L: "75%", M: "✓", N: "✓", "HD-F": "✓", "HD-G": "✓" },
  },
  {
    benefit: "Foreign Travel Emergency",
    coverage: { A: "✗", B: "✗", C: "✓", D: "✓", F: "✓", G: "✓", K: "✗", L: "✗", M: "✓", N: "✓", "HD-F": "✓", "HD-G": "✓" },
    note: "80% after $250 deductible, up to $50,000 lifetime",
  },
];

const PLAN_PREMIUM: Record<string, string> = {
  A: "$60–$180", B: "$70–$200", C: "$130–$350", D: "$90–$250",
  F: "$150–$400", G: "$100–$300", K: "$50–$150", L: "$80–$220",
  M: "$85–$230", N: "$75–$225", "HD-F": "$30–$80", "HD-G": "$30–$80",
};

const PLAN_AVAILABLE: Record<string, boolean> = {
  A: true, B: true, C: false, D: true, F: false, G: true,
  K: true, L: true, M: true, N: true, "HD-F": false, "HD-G": true,
};

function CoverageCell({ value }: { value: CoverageValue }) {
  if (value === "✓") return <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />;
  if (value === "✗") return <XCircle className="w-5 h-5 text-red-400 mx-auto" />;
  return <span className="text-xs font-semibold text-amber-600 block text-center">{value}</span>;
}

export default function MedigapCompare() {
  useCMSSEO({
    contentType: "page",
    slug: "medigap-compare",
    title: "Compare All Medicare Supplement Plans Side by Side | 2026",
    description: "Compare all 10 Medigap plan letters side by side. See which Medicare Supplement plan covers what, and find the best plan for your health and budget.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/compare/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    ogType: "article",
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Compare Plans</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Compare Medicare Supplement Plans
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            All 10 standardized Medigap plan letters compared side by side. Benefits are identical regardless of insurer — only premiums differ.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> Get Free Quotes
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
            Standard Medigap Plan Comparison Chart
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            Plans C, F, and HD-F are only available to those eligible for Medicare before January 1, 2020.
          </p>

          {/* Desktop table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-4 py-3 font-semibold min-w-[220px]">Benefit</th>
                  {PLANS.map((p) => (
                    <th key={p} className="px-3 py-3 text-center font-bold min-w-[60px]">
                      <Link href={`/medicare-supplements/plan-${p.toLowerCase()}`} className="hover:text-teal-300 transition-colors">
                        {p}
                      </Link>
                    </th>
                  ))}
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <td className="px-4 py-2 text-xs text-slate-500 font-medium">Monthly Premium (est.)</td>
                  {PLANS.map((p) => (
                    <td key={p} className="px-3 py-2 text-center text-xs text-slate-600 font-medium">{PLAN_PREMIUM[p]}</td>
                  ))}
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <td className="px-4 py-2 text-xs text-slate-500 font-medium">New Enrollees</td>
                  {PLANS.map((p) => (
                    <td key={p} className="px-3 py-2 text-center">
                      {PLAN_AVAILABLE[p]
                        ? <span className="text-xs text-green-700 font-semibold">Yes</span>
                        : <span className="text-xs text-red-500 font-semibold">No*</span>
                      }
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BENEFIT_ROWS.map((row, i) => (
                  <>
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-medium text-slate-800">{row.benefit}</td>
                      {PLANS.map((p) => (
                        <td key={p} className="px-3 py-3">
                          <CoverageCell value={row.coverage[p]} />
                        </td>
                      ))}
                    </tr>
                    {row.note && (
                      <tr key={`${i}-note`} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td colSpan={PLANS.length + 1} className="px-4 pb-3 text-xs text-slate-500 italic">
                          <Info className="w-3 h-3 inline mr-1" />{row.note}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            * Plans C, F, and HD-F are only available to people who were eligible for Medicare before January 1, 2020.
          </p>

          {/* HD Plans */}
          <h2 className="text-2xl font-bold text-slate-900 mt-14 mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
            High Deductible Plans
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            High Deductible plans offer the same coverage as their standard counterparts after you meet the annual deductible ($2,870 in 2026).
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                slug: "high-deductible-plan-g",
                letter: "HD-G",
                available: true,
                premium: "$30–$80/mo",
                deductible: "$2,870 (2026)",
                desc: "Same comprehensive coverage as Plan G after the deductible. Available to all new enrollees. Best for healthy people who want very low premiums.",
              },
              {
                slug: "high-deductible-plan-f",
                letter: "HD-F",
                available: false,
                premium: "$30–$80/mo",
                deductible: "$2,870 (2026)",
                desc: "Same comprehensive coverage as Plan F (including Part B deductible) after the plan deductible. Only available to those eligible before January 1, 2020.",
              },
            ].map((p) => (
              <div key={p.slug} className="p-6 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-slate-900">{p.letter}</span>
                  {!p.available && (
                    <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">Pre-2020 Only</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-4">{p.desc}</p>
                <div className="flex gap-6 text-sm mb-4">
                  <div>
                    <span className="text-slate-500 text-xs">Monthly Premium</span>
                    <div className="font-bold text-slate-900">{p.premium}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs">Annual Deductible</span>
                    <div className="font-bold text-slate-900">{p.deductible}</div>
                  </div>
                </div>
                <Link href={`/medicare-supplements/${p.slug}`} className="inline-flex items-center gap-1 text-teal-700 font-semibold text-sm hover:underline">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Plan cards */}
          <h2 className="text-2xl font-bold text-slate-900 mt-14 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
            Explore Each Plan
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PLANS.map((p) => (
              <Link key={p} href={`/medicare-supplements/plan-${p.toLowerCase()}`}
                className="p-5 border border-slate-200 rounded-xl hover:border-teal-400 hover:shadow-md transition-all group">
                <div className="text-2xl font-black text-slate-900 mb-1 group-hover:text-teal-700">Plan {p}</div>
                <div className="text-xs text-slate-500 mb-3">{PLAN_PREMIUM[p]}/mo</div>
                {!PLAN_AVAILABLE[p] && (
                  <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">Pre-2020 Only</span>
                )}
                <div className="flex items-center gap-1 text-teal-600 text-xs font-semibold mt-3">
                  View Details <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-3">Not Sure Which Plan Is Right for You?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Our licensed Medicare agents compare rates from multiple carriers at no cost to you. We'll help you find the right plan for your health needs and budget.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link href="/compare-rates" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
                Compare Rates Online <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
