/**
 * Podcast Landing Page — /library/podcast
 * Design: Indigo accent (#4F46E5) matching Medicare Library section identity.
 * Showcases MedicareFAQ podcast episodes with links to external platforms.
 */

import { useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  Headphones,
  ChevronDown,
  ArrowRight,
  Phone,
  Play,
  Clock,
  ExternalLink,
  Mic,
  Radio,
  Star,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const featuredEpisode = {
  title: "Medicare 2026 | New Premiums, Deductibles & Out of Pocket Costs Just Released!",
  description: "Medicare costs are changing in 2026, and many retirees will see higher premiums, deductibles, and out-of-pocket expenses. In this episode, we break down the official 2026 Medicare cost updates released by CMS — including new numbers for Part A, Part B, Part D, Medicare Advantage, and IRMAA.",
  duration: "9:41",
  date: "March 12, 2026",
  category: "General Medicare",
};

const episodes = [
  {
    title: "Navigating Your Coverage: Medicare Automatic Enrollment vs. Manual Enrollment Explained",
    description: "Not sure whether you'll be automatically enrolled in Medicare or need to sign up yourself? We explain the key differences.",
    duration: "5:18",
    date: "March 12, 2026",
    category: "Medicare Enrollment",
  },
  {
    title: "When Should You Enroll in Medicare If Still Working?",
    description: "Still working and unsure when to enroll in Medicare? We explain when you should sign up and how employer coverage affects your timeline.",
    duration: "5:14",
    date: "March 12, 2026",
    category: "Medicare Enrollment",
  },
  {
    title: "Medicare Part B Annual Deductible Explained: What You'll Pay",
    description: "Wondering how the Medicare Part B annual deductible works? We break down the 2026 numbers and what they mean for your wallet.",
    duration: "4:50",
    date: "March 12, 2026",
    category: "General Medicare",
  },
  {
    title: "Medicare Supplement vs. Medicare Advantage: Coverage Transparency Explained",
    description: "Trying to understand what you'll actually pay for healthcare on Medicare? We compare the transparency of both plan types.",
    duration: "4:51",
    date: "March 12, 2026",
    category: "Medicare Supplement",
  },
  {
    title: "Medicare Advantage Extra Benefits Explained: What's Really Included",
    description: "Medicare Advantage plans often promote extra benefits like dental, vision, hearing, and Special Supplemental Benefits. We explain what's really included.",
    duration: "4:04",
    date: "March 11, 2026",
    category: "Medicare Advantage",
  },
  {
    title: "How the Medigap Free Look Period Protects You",
    description: "Discover exactly how the Medigap free look period protects you. Learn how to test a Medicare Supplement plan risk-free.",
    duration: "4:41",
    date: "March 11, 2026",
    category: "Medicare Supplement",
  },
  {
    title: "Medicare Supplement and Pre-Existing Conditions: What You Need to Know",
    description: "Concerned about how pre-existing conditions affect your Medicare coverage? We explain how Medigap underwriting works.",
    duration: "4:36",
    date: "March 10, 2026",
    category: "Medicare Supplement",
  },
  {
    title: "How the Medicare Part B Giveback Can Lower Your Monthly Costs",
    description: "Curious about the Medicare Part B Giveback benefit? We explain how this Medicare Advantage feature can reduce your monthly premium.",
    duration: "4:55",
    date: "March 10, 2026",
    category: "Medicare Advantage",
  },
  {
    title: "Medicare Advantage for Chronic Conditions: What You Need to Know",
    description: "Managing a chronic condition on Medicare? We explore how Medicare Advantage plans handle ongoing care and what to watch for.",
    duration: "4:22",
    date: "March 10, 2026",
    category: "Medicare Advantage",
  },
  {
    title: "Understanding How Medicare Works with Employer Health Plans",
    description: "Still working or covered by an employer health plan? We break down how Medicare coordinates with your employer coverage.",
    duration: "4:58",
    date: "March 9, 2026",
    category: "General Medicare",
  },
  {
    title: "Navigating Medical Emergencies: Medicare Supplement vs. Medicare Advantage",
    description: "What happens if you have a medical emergency while on Medicare? We compare how Medigap and Medicare Advantage handle emergency situations.",
    duration: "5:12",
    date: "March 8, 2026",
    category: "Medicare Supplement",
  },
  {
    title: "Top 10 Most Common Medicare Advantage Complaints",
    description: "We reveal the top 10 most common Medicare Advantage complaints — from hidden costs and denial letters to provider network issues.",
    duration: "6:30",
    date: "March 7, 2026",
    category: "Medicare Advantage",
  },
];

const categories = [
  { name: "All Episodes", count: 114 },
  { name: "Medicare Supplement", count: 76 },
  { name: "Medicare Advantage", count: 40 },
  { name: "General Medicare", count: 17 },
  { name: "Medicare Part D", count: 9 },
  { name: "Medicare Enrollment", count: 4 },
];

const platforms = [
  { name: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/medicarefaq/id1512418818" },
  { name: "Spotify", href: "https://open.spotify.com/show/medicarefaq" },
  { name: "Buzzsprout", href: "https://medicarefaq.buzzsprout.com/" },
];

function getCategoryColor(cat: string): string {
  if (cat.includes("Supplement")) return "#7C3AED";
  if (cat.includes("Advantage")) return "#059669";
  if (cat.includes("Part D")) return "#0891B2";
  if (cat.includes("Enrollment")) return "#D97706";
  return "#4F46E5";
}

export default function Podcast() {
  useCMSSEO({
    contentType: "page",
    slug: "podcast",
    title: "Medicare Podcasts | Listen & Learn About Medicare | MedicareFAQ",
    description: "Listen to the MedicareFAQ podcast — short, expert-led audio episodes covering Medicare plans, enrollment, costs, and common questions. Free to stream.",
    canonical: "https://www.medicarefaq.com/podcasts/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    ogType: "website",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-indigo-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-indigo-200/70">Medicare Library</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-indigo-100">Podcast</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Headphones className="w-6 h-6 text-indigo-200" />
            </div>
            <span className="text-sm font-semibold text-indigo-200 uppercase tracking-wider">MedicareFAQ Podcast</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            The MedicareFAQ Podcast
          </h1>
          <p className="text-lg text-indigo-100/90 max-w-2xl mb-8">
            Medicare explained in plain English. Join our licensed experts as they break down enrollment, coverage, costs, and plan comparisons — one episode at a time.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-6 text-sm text-indigo-200/80">
              <span className="flex items-center gap-1.5"><Mic className="w-4 h-4" /> 114+ Episodes</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> 5.0 Rating</span>
              <span className="flex items-center gap-1.5"><Radio className="w-4 h-4" /> New Episodes Weekly</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors border border-white/20"
              >
                <Headphones className="w-4 h-4" /> {p.name} <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-12">
        <div className="container">
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Featured Episode</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-32 md:h-auto bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{featuredEpisode.category}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredEpisode.duration}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredEpisode.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
                  {featuredEpisode.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{featuredEpisode.description}</p>
                <a
                  href="https://podcasts.apple.com/us/podcast/medicarefaq/id1512418818"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Play className="w-4 h-4" /> Listen Now <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes + Sidebar */}
      <section className="py-12">
        <div className="container">
          <div className="flex gap-10">
            {/* Episodes List */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                Recent Episodes
              </h2>
              <div className="space-y-4">
                {episodes.map((ep, i) => (
                  <div key={i} className="group border border-slate-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                        <Play className="w-4 h-4 text-indigo-600 ml-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: getCategoryColor(ep.category) }}>{ep.category}</span>
                          <span className="text-[10px] text-slate-300">·</span>
                          <span className="text-[10px] text-slate-400">{ep.duration}</span>
                          <span className="text-[10px] text-slate-300">·</span>
                          <span className="text-[10px] text-slate-400">{ep.date}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-1">{ep.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{ep.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a
                  href="https://podcasts.apple.com/us/podcast/medicarefaq/id1512418818"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View All 114+ Episodes <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Categories */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Categories</p>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat.name} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{cat.name}</span>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Listen On */}
                <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                  <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3">Listen On</p>
                  <div className="space-y-2">
                    {platforms.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-indigo-700 hover:text-indigo-900 transition-colors"
                      >
                        <span className="flex items-center gap-2"><Headphones className="w-4 h-4" /> {p.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-indigo-600 rounded-xl p-5 text-white">
                  <p className="text-sm font-semibold mb-1">Need Help With Medicare?</p>
                  <p className="text-xs text-indigo-200 mb-3">Our licensed agents are ready to help</p>
                  <a href="tel:8883358996" className="flex items-center gap-2 text-sm font-bold text-white">
                    <Phone className="w-4 h-4" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
