/**
 * Videos Landing Page — /library/videos
 * Design: Indigo accent (#4F46E5) matching Medicare Library section identity.
 * Showcases MedicareFAQ YouTube video content with embedded links.
 */

import { useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  Video,
  ChevronDown,
  ArrowRight,
  Phone,
  Play,
  Clock,
  ExternalLink,
  Star,
  CheckCircle2,
  Calendar,
  Eye,
  Youtube,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const featuredVideo = {
  title: "What Is Covered by Medicare? (Parts A, B, C & D Explained)",
  description: "Medicare is made up of 4 parts, each covering different benefits. Learn about each part of Medicare and what it covers in this comprehensive video breakdown.",
  duration: "12:34",
  date: "March 2026",
  category: "General Medicare",
  youtubeId: "zeq-Z-sVhzQ",
};

const videos = [
  {
    title: "Medicare Supplement Plan F vs Plan G vs Plan N",
    description: "Plan F gives you the most benefits, but the more benefits you have, the higher your monthly premium. We compare the three most popular Medigap plans.",
    duration: "8:45",
    date: "March 2026",
    category: "Medicare Supplement",
    youtubeId: "hvYZ9Ht9e-A",
  },
  {
    title: "Medicare Costs in 2026: Everything You Need to Know",
    description: "The official 2026 Medicare numbers are out. We break down premiums, deductibles, and out-of-pocket costs for every part of Medicare.",
    duration: "9:41",
    date: "March 2026",
    category: "General Medicare",
    youtubeId: "",
  },
  {
    title: "Medicare Advantage vs Medicare Supplement: Which Is Better?",
    description: "The biggest decision in Medicare is choosing between Advantage and Supplement plans. We compare costs, coverage, and flexibility.",
    duration: "11:20",
    date: "February 2026",
    category: "Plan Comparison",
    youtubeId: "",
  },
  {
    title: "How to Enroll in Medicare: Step-by-Step Guide",
    description: "A complete walkthrough of the Medicare enrollment process — from your Initial Enrollment Period to choosing the right plan.",
    duration: "7:15",
    date: "February 2026",
    category: "Medicare Enrollment",
    youtubeId: "",
  },
  {
    title: "Medicare Part D Explained: Prescription Drug Coverage",
    description: "Understanding Part D formularies, coverage stages, the donut hole, and how to choose the right prescription drug plan.",
    duration: "8:30",
    date: "February 2026",
    category: "Medicare Part D",
    youtubeId: "",
  },
  {
    title: "Medicare Advantage Extra Benefits: What's Really Included?",
    description: "Dental, vision, hearing, gym memberships — we break down what Medicare Advantage extra benefits actually cover and their limitations.",
    duration: "6:48",
    date: "January 2026",
    category: "Medicare Advantage",
    youtubeId: "",
  },
  {
    title: "Working Past 65? When to Enroll in Medicare",
    description: "If you're still employed at 65, your Medicare enrollment timeline changes. We explain when to sign up and how employer coverage works.",
    duration: "5:55",
    date: "January 2026",
    category: "Medicare Enrollment",
    youtubeId: "",
  },
  {
    title: "Medicare Late Enrollment Penalties Explained",
    description: "Missing your enrollment window can cost you permanently. We explain how Part A, Part B, and Part D penalties are calculated.",
    duration: "6:10",
    date: "January 2026",
    category: "Medicare Enrollment",
    youtubeId: "",
  },
  {
    title: "Does Medicare Cover Dental Implants?",
    description: "Dental implants are expensive, and Original Medicare has limited dental coverage. We explain your options for getting coverage.",
    duration: "5:20",
    date: "December 2025",
    category: "Medicare Coverage",
    youtubeId: "",
  },
];

const videoCategories = [
  { name: "All Videos", count: 89 },
  { name: "Medicare Supplement", count: 32 },
  { name: "Medicare Advantage", count: 24 },
  { name: "General Medicare", count: 18 },
  { name: "Medicare Part D", count: 8 },
  { name: "Medicare Enrollment", count: 7 },
];

function getCategoryColor(cat: string): string {
  if (cat.includes("Supplement")) return "#7C3AED";
  if (cat.includes("Advantage")) return "#059669";
  if (cat.includes("Part D")) return "#0891B2";
  if (cat.includes("Enrollment")) return "#D97706";
  if (cat.includes("Coverage")) return "#DC2626";
  if (cat.includes("Comparison")) return "#4338CA";
  return "#4F46E5";
}

export default function Videos() {
  useCMSSEO({
    contentType: "page",
    slug: "videos",
    title: "Medicare Videos | Watch & Learn About Medicare | MedicareFAQ",
    description: "Watch Medicare educational videos from MedicareFAQ. Our video library covers Medicare basics, plan comparisons, enrollment tips, and more.",
    canonical: "https://www.medicarefaq.com/library/videos/",
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
            <span className="text-indigo-100">Videos</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-indigo-200" />
            </div>
            <span className="text-sm font-semibold text-indigo-200 uppercase tracking-wider">MedicareFAQ Videos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Video Library
          </h1>
          <p className="text-lg text-indigo-100/90 max-w-2xl mb-8">
            Visual explanations of Medicare concepts, plan comparisons, and enrollment guides. Our goal is 100% transparency on all things Medicare.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-6 text-sm text-indigo-200/80">
              <span className="flex items-center gap-1.5"><Video className="w-4 h-4" /> 89+ Videos</span>
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> New Videos Weekly</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Expert Produced</span>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@MedicareFAQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <Youtube className="w-5 h-5" /> Subscribe on YouTube <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Featured Video</span>
          </div>
          <div className="bg-slate-900 rounded-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Video Embed */}
              <div className="w-full lg:w-3/5 aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}`}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {/* Video Info */}
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{featuredVideo.category}</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredVideo.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                  {featuredVideo.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{featuredVideo.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Watch on YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid + Sidebar */}
      <section className="py-12 bg-slate-50">
        <div className="container">
          <div className="flex gap-10">
            {/* Videos Grid */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                Latest Videos
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {videos.map((vid, i) => (
                  <a
                    key={i}
                    href={vid.youtubeId ? `https://www.youtube.com/watch?v=${vid.youtubeId}` : "https://www.youtube.com/@MedicareFAQ"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-200 hover:shadow-md transition-all"
                  >
                    {/* Thumbnail placeholder */}
                    <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-lg">
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                        {vid.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: getCategoryColor(vid.category) }}>{vid.category}</span>
                        <span className="text-[10px] text-slate-300">·</span>
                        <span className="text-[10px] text-slate-400">{vid.date}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-1 line-clamp-2">{vid.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{vid.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a
                  href="https://www.youtube.com/@MedicareFAQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" /> View All 89+ Videos on YouTube <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Categories */}
                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Video Categories</p>
                  <div className="space-y-2">
                    {videoCategories.map((cat) => (
                      <div key={cat.name} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{cat.name}</span>
                        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscribe */}
                <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                  <p className="text-xs font-bold text-red-900 uppercase tracking-wider mb-2">Subscribe</p>
                  <p className="text-xs text-red-700/80 mb-3">Get notified when we publish new Medicare videos.</p>
                  <a
                    href="https://www.youtube.com/@MedicareFAQ?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors w-full"
                  >
                    <Youtube className="w-4 h-4" /> Subscribe
                  </a>
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
