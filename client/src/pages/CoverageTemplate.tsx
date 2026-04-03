/**
 * Data-Driven Coverage Q&A Template
 * Design: Renders any Coverage Q&A article from a CoverageArticleData object.
 * Follows the wireframe: dark navy header, Quick Answer badges, Coverage Comparison table,
 * plan-by-plan breakdowns, cost table, sticky TOC sidebar, FAQ accordion, related topics.
 */

import { useState, useEffect, useRef } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link, useParams } from "wouter";
import {
  Clock,
  User,
  Calendar,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Phone,
  ArrowRight,
  Shield,
  Heart,
  Users,
  HandHelping,
  Lightbulb,
  Info,
  ExternalLink,
  Bookmark,
  Search,
  DollarSign,
  FileText,
  Stethoscope,
  Ear,
  Eye,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import type {
  CoverageArticleData,
  CoverageBadgeData,
  PlanBreakdownData,
  QuickReferenceItem,
} from "@/lib/article-types";
import { coverageArticles } from "@/lib/coverage-data";
import PodcastPlayer from "@/components/PodcastPlayer";

/* ─── Icon Map ─── */
const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  heart: Heart,
  users: Users,
  handhelping: HandHelping,
  stethoscope: Stethoscope,
  ear: Ear,
  eye: Eye,
  filetext: FileText,
  dollarsign: DollarSign,
  info: Info,
  search: Search,
  lightbulb: Lightbulb,
};

function getIcon(name: string): React.ElementType {
  return iconMap[name.toLowerCase().replace(/[^a-z]/g, "")] || Shield;
}

/* ─── FAQ Component ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F5F7FA] transition-colors"
      >
        <span className="font-semibold text-[#1B2A4A] text-[15px] pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-[#6B7280] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#6B7280] shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-[#4B5563] text-[15px] leading-relaxed border-t border-[#E5E7EB]">
          <div className="pt-3">{answer}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Coverage Badge ─── */
function CoverageBadge({ badge }: { badge: CoverageBadgeData }) {
  if (badge.status === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <AlertTriangle className="w-3.5 h-3.5" />
        {badge.plan}: Some Plans
      </span>
    );
  }
  const covered = badge.status === "covered";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${covered ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
      {covered ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
      {badge.plan}: {covered ? "Covered" : "Not Covered"}
    </span>
  );
}

/* ─── Plan Section Card ─── */
function PlanSection({ data }: { data: PlanBreakdownData }) {
  const Icon = getIcon(data.icon);
  const coverageBg =
    data.coverageType === "covered"
      ? "bg-emerald-50 text-emerald-700"
      : data.coverageType === "partial"
      ? "bg-amber-50 text-amber-700"
      : "bg-red-50 text-red-700";

  const calloutStyles: Record<string, { bg: string; border: string; title: string; icon: React.ElementType }> = {
    warning: { bg: "bg-[#FEF3C7]", border: "border-[#FDE68A]", title: "text-[#92400E]", icon: AlertTriangle },
    info: { bg: "bg-[#EFF6FF]", border: "border-[#BFDBFE]", title: "text-[#1E40AF]", icon: Info },
    success: { bg: "bg-emerald-50", border: "border-emerald-200", title: "text-emerald-800", icon: CheckCircle2 },
    tip: { bg: "bg-[#F5F3FF]", border: "border-[#DDD6FE]", title: "text-[#5B21B6]", icon: Lightbulb },
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${data.iconColor}15` }}>
            <Icon className="w-5 h-5" style={{ color: data.iconColor }} />
          </div>
          <div>
            <h3 className="font-bold text-[#1B2A4A] text-lg">{data.planName}</h3>
            {data.statusBadge && (
              <span className={`text-xs font-semibold mt-1 inline-block ${
                data.coverageType === "not-covered" ? "text-red-600" :
                data.coverageType === "partial" ? "text-amber-600" : "text-emerald-600"
              }`}>{data.statusBadge}</span>
            )}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${coverageBg}`}>{data.coverageLabel}</span>
      </div>
      <div className="p-5 text-[#4B5563] text-[15px] leading-relaxed space-y-3">
        {data.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {/* What It Covers / Doesn't Cover columns */}
        {(data.whatItCovers || data.whatItDoesntCover) && (
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {data.whatItCovers && data.whatItCovers.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-bold text-emerald-800 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> What It Covers
                </h4>
                <ul className="space-y-1.5">
                  {data.whatItCovers.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-emerald-700 text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.whatItDoesntCover && data.whatItDoesntCover.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-800 text-sm mb-2 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> What It Doesn't Cover
                </h4>
                <ul className="space-y-1.5">
                  {data.whatItDoesntCover.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-red-700 text-sm">
                      <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Cost Note */}
        {data.costNote && (
          <div className="flex items-start gap-2 bg-[#F0FDF4] border border-emerald-200 rounded-lg p-3 mt-3">
            <DollarSign className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-emerald-800 text-sm font-medium">{data.costNote}</p>
          </div>
        )}

        {data.callout && (() => {
          const style = calloutStyles[data.callout.type] || calloutStyles.info;
          const CalloutIcon = style.icon;
          return (
            <div className={`${style.bg} border ${style.border} rounded-lg p-4 mt-3`}>
              <h4 className={`font-bold ${style.title} text-sm mb-2 flex items-center gap-2`}>
                <CalloutIcon className="w-4 h-4" />
                {data.callout.title}
              </h4>
              <p className="text-[#4B5563] text-sm">{data.callout.text}</p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

/* ─── Quick Reference Icon ─── */
function QRIcon({ type }: { type: QuickReferenceItem["icon"] }) {
  switch (type) {
    case "check": return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
    case "x": return <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />;
    case "alert": return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />;
    case "dollar": return <DollarSign className="w-4 h-4 text-[#1B2A4A] shrink-0 mt-0.5" />;
    case "info": return <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />;
    default: return <Info className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" />;
  }
}

/* ─── Build TOC from article data ─── */
function buildTOC(article: CoverageArticleData) {
  const toc = [
    { id: "quick-answer", label: "Quick Answer" },
    { id: "coverage-comparison", label: "Coverage by Plan" },
    { id: "plan-breakdowns", label: "Understanding Coverage" },
  ];
  if (article.advantageSteps) toc.push({ id: "advantage-steps", label: "Finding the Right Plan" });
  if (article.costTable) toc.push({ id: "costs", label: "Costs & Pricing" });
  if (article.exceptionsSection) toc.push({ id: "exceptions", label: "Important Exceptions" });
  if (article.legislativeUpdate) toc.push({ id: "legislative-update", label: "Legislative Update" });
  if (article.alternativesSection) toc.push({ id: "alternatives", label: "Alternatives" });
  if (article.relatedEquipment) toc.push({ id: "related-equipment", label: article.relatedEquipment.title });
  if (article.medicaidSection) toc.push({ id: "medicaid-programs", label: "Medicaid & State Programs" });
  if (article.decisionSection) toc.push({ id: "making-decision", label: "Making the Decision" });
  toc.push({ id: "faqs", label: "FAQs" });
  toc.push({ id: "related-topics", label: "Related Topics" });
  return toc;
}

/* ─── Main Component ─── */
export default function CoverageTemplate() {
  const params = useParams<{ slug: string }>();
  const article = coverageArticles.find((a) => a.slug === params.slug);

  const [activeSection, setActiveSection] = useState("");
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  const toc = article ? buildTOC(article) : [];

  // Scroll spy
  useEffect(() => {
    if (!article) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );
    toc.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article, toc]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useCMSSEO({
    contentType: "coverage",
    slug: params.slug ?? "",
    title: article?.seo?.title ?? article?.title ?? "",
    description: article?.seo?.description ?? "",
    canonical: article?.seo?.canonical,
    ogImage: article?.seo?.ogImage,
    ogType: "article",
  });

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
        <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
          <UtilityBar /><HeaderBar /><MegaMenu />
        </header>
        <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
          <MobileNav />
        </header>
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1B2A4A] mb-4">Article Not Found</h1>
            <p className="text-[#6B7280] mb-6">The coverage article you're looking for doesn't exist yet.</p>
            <Link href="/" className="text-[#C41230] font-semibold hover:underline">Go back home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      {/* Navigation — Desktop */}
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar /><HeaderBar /><MegaMenu />
      </header>
      {/* Navigation — Mobile */}
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      <main className="flex-1">
        {/* ─── Article Header ─── */}
        <section className="bg-[#1B2A4A] py-10 md:py-14">
          <div className="container max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">Coverage Q&A</span>
              </div>
              <nav className="text-sm text-white/50 mb-5 flex items-center gap-2 flex-wrap">
                <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/faqs" className="hover:text-white/80 transition-colors">FAQs</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/70">{article.title}</span>
              </nav>
              <h1 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white leading-tight mb-5">{article.title}</h1>
              <p className="text-white/60 text-lg max-w-3xl mb-6">{article.subtitle}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Updated {article.dateUpdated}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" />Written By: {article.author.name}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" />Reviewed By: {article.reviewer.name}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Sub-Navigation Bar ─── */}
        {article.subNavLinks && article.subNavLinks.length > 0 && (
          <div className="bg-white border-b border-[#E5E7EB] sticky top-[120px] lg:top-[140px] z-30">
            <div className="container max-w-6xl mx-auto">
              <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
                {article.subNavLinks.map((link, i) => (
                  <Link key={i} href={link.href} className="whitespace-nowrap px-4 py-2 text-sm font-medium text-[#4B5563] hover:text-[#1B2A4A] hover:bg-[#F5F7FA] rounded-lg transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Content + Sidebar ─── */}
        <section className="py-8 md:py-12">
          <div className="container max-w-6xl mx-auto">
            <div className="flex gap-8 lg:gap-10">
              {/* ─── Main Article Content ─── */}
              <article className="flex-1 min-w-0">
                {/* Podcast Player */}
                {article.buzzsproutUrl && (
                  <PodcastPlayer
                    audioUrl={article.buzzsproutUrl}
                    title={article.title}
                    date={article.podcastDate || article.dateUpdated}
                    duration={article.podcastDuration || ""}
                  />
                )}

                {/* YouTube Video Embed */}
                {article.youtubeVideoId && (
                  <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-8 shadow-sm">
                    <div className="bg-[#1B2A4A] px-6 py-3 flex items-center gap-3">
                      <Play className="w-5 h-5 text-white fill-white" />
                      <h2 className="font-bold text-white text-base">Watch the Video</h2>
                    </div>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${article.youtubeVideoId}?rel=0`}
                        title={article.youtubeVideoTitle || article.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    {article.youtubeVideoTitle && (
                      <div className="px-6 py-3 border-t border-[#E5E7EB] flex items-center justify-between">
                        <span className="text-sm text-[#4B5563] font-medium">{article.youtubeVideoTitle}</span>
                        <a
                          href={`https://www.youtube.com/watch?v=${article.youtubeVideoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#C41230] hover:underline flex items-center gap-1"
                        >
                          Watch on YouTube <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Quick Answer */}
                <div id="quick-answer" className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#1B2A4A] flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-[#1B2A4A] text-lg">Quick Answer</h2>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.quickAnswer.badges.map((b, i) => (
                      <CoverageBadge key={i} badge={b} />
                    ))}
                  </div>
                  <p className="text-[#4B5563] text-[15px] leading-relaxed">{article.quickAnswer.text}</p>
                </div>

                {/* Coverage Comparison Table */}
                <div id="coverage-comparison" className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-8 shadow-sm">
                  <div className="bg-[#D97706] px-6 py-4 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-white" />
                    <h2 className="font-bold text-white text-lg">Coverage Comparison by Plan Type</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#F5F7FA] border-b border-[#E5E7EB]">
                          <th className="text-left px-6 py-3 font-semibold text-[#1B2A4A]">Plan Type</th>
                          <th className="text-left px-4 py-3 font-semibold text-[#1B2A4A]">Coverage</th>
                          <th className="text-left px-4 py-3 font-semibold text-[#1B2A4A]">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {article.comparisonTable.map((row, i) => (
                          <tr key={i} className={`border-b border-[#E5E7EB] ${i % 2 === 1 ? "bg-[#FAFAFA]" : ""}`}>
                            <td className="px-6 py-4 font-medium text-[#1B2A4A]">{row.planType}</td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                                row.coverage.toLowerCase().includes("not") ? "bg-red-50 text-red-700" :
                                row.coverage.toLowerCase().includes("some") || row.coverage.toLowerCase().includes("varies") ? "bg-amber-50 text-amber-700" :
                                "bg-emerald-50 text-emerald-700"
                              }`}>
                                {row.coverage.toLowerCase().includes("not") ? <XCircle className="w-3 h-3" /> :
                                 row.coverage.toLowerCase().includes("some") || row.coverage.toLowerCase().includes("varies") ? <AlertTriangle className="w-3 h-3" /> :
                                 <CheckCircle2 className="w-3 h-3" />}
                                {row.coverage}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-[#6B7280] text-xs">{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Plan Breakdowns */}
                <h2 id="plan-breakdowns" className="text-2xl font-bold text-[#1B2A4A] mb-4">Understanding Your Coverage Options</h2>
                <div className="space-y-4 mb-8">
                  {article.planBreakdowns.map((plan, i) => (
                    <PlanSection key={i} data={plan} />
                  ))}
                </div>

                {/* Advantage Steps */}
                {article.advantageSteps && (
                  <>
                    <h2 id="advantage-steps" className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10">{article.advantageSteps.title}</h2>
                    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-10 shadow-sm">
                      <ol className="space-y-4">
                        {article.advantageSteps.steps.map((step, i) => (
                          <li key={i} className="flex gap-4">
                            <span className="w-8 h-8 rounded-full bg-[#1B2A4A] text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                            <p className="text-[#4B5563] text-[15px] leading-relaxed pt-1">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </>
                )}

                {/* Cost Table */}
                {article.costTable && (
                  <div id="costs" className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-8 shadow-sm">
                    <div className="bg-[#1B2A4A] px-6 py-4 flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-white" />
                      <h2 className="font-bold text-white text-lg">{article.costTable.title}</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-[#F5F7FA] border-b border-[#E5E7EB]">
                            {article.costTable.headers.map((h, i) => (
                              <th key={i} className="text-left px-6 py-3 font-semibold text-[#1B2A4A]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {article.costTable.rows.map((row, i) => (
                            <tr key={i} className={`border-b border-[#E5E7EB] ${i % 2 === 1 ? "bg-[#FAFAFA]" : ""}`}>
                              {article.costTable!.headers.map((h, j) => (
                                <td key={j} className={`px-6 py-4 ${j === 0 ? "font-medium text-[#1B2A4A]" : "text-[#4B5563]"}`}>
                                  {row[h] || row[h.toLowerCase()] || Object.values(row)[j] || ""}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {article.costTable.footnote && (
                      <div className="px-6 py-3 bg-[#F5F7FA] text-xs text-[#6B7280] border-t border-[#E5E7EB]">{article.costTable.footnote}</div>
                    )}
                  </div>
                )}

                {/* Exceptions Section */}
                {article.exceptionsSection && (
                  <>
                    <h2 id="exceptions" className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10 flex items-center gap-2">
                      <span className="text-[#D97706]">✦</span> {article.exceptionsSection.title}
                    </h2>
                    <div className="space-y-4 mb-8">
                      {article.exceptionsSection.items.map((item, i) => (
                        <div key={i} className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-5 shadow-sm">
                          <h3 className="font-bold text-[#92400E] text-base mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-[#D97706]" />
                            {item.title}
                          </h3>
                          <p className="text-[#78350F] text-[15px] leading-relaxed">{item.text}</p>
                          {item.highlight && (
                            <div className="mt-3 bg-white/60 border border-[#FDE68A] rounded-lg p-3">
                              <p className="text-[#92400E] text-sm font-semibold">{item.highlight}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Legislative Update */}
                {article.legislativeUpdate && (
                  <>
                    <h2 id="legislative-update" className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10 flex items-center gap-2">
                      <span className="text-[#D97706]">✦</span> {article.legislativeUpdate.title}
                    </h2>
                    <div className="space-y-4 mb-8">
                      {article.legislativeUpdate.items.map((item, i) => {
                        const statusColors: Record<string, string> = {
                          Passed: "bg-emerald-100 text-emerald-800",
                          Pending: "bg-amber-100 text-amber-800",
                          Failed: "bg-red-100 text-red-800",
                          Proposed: "bg-blue-100 text-blue-800",
                        };
                        return (
                          <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#1B2A4A]/10 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-[#1B2A4A]" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <h3 className="font-bold text-[#1B2A4A] text-base">{item.title}</h3>
                                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[item.status] || statusColors.Pending}`}>
                                    {item.status}
                                  </span>
                                </div>
                                <p className="text-[#4B5563] text-[15px] leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Alternatives Section */}
                {article.alternativesSection && (
                  <>
                    <h2 id="alternatives" className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10">{article.alternativesSection.title}</h2>
                    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                      {article.alternativesSection.paragraphs.map((p, i) => (
                        <p key={i} className="text-[#4B5563] text-[15px] leading-relaxed mb-4">{p}</p>
                      ))}
                      {article.alternativesSection.checklist && (
                        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-5 mt-4">
                          <h4 className="font-bold text-[#1E40AF] text-sm mb-3 flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            {article.alternativesSection.checklist.title}
                          </h4>
                          <ul className="space-y-2">
                            {article.alternativesSection.checklist.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-[#4B5563] text-sm">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Related Equipment */}
                {article.relatedEquipment && (
                  <>
                    <h2 id="related-equipment" className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10">{article.relatedEquipment.title}</h2>
                    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                      {article.relatedEquipment.paragraphs.map((p, i) => (
                        <p key={i} className="text-[#4B5563] text-[15px] leading-relaxed mb-4">{p}</p>
                      ))}
                      {article.relatedEquipment.callout && (() => {
                        const styles: Record<string, { bg: string; border: string; title: string }> = {
                          warning: { bg: "bg-[#FEF3C7]", border: "border-[#FDE68A]", title: "text-[#92400E]" },
                          info: { bg: "bg-[#EFF6FF]", border: "border-[#BFDBFE]", title: "text-[#1E40AF]" },
                          success: { bg: "bg-emerald-50", border: "border-emerald-200", title: "text-emerald-800" },
                          tip: { bg: "bg-[#F5F3FF]", border: "border-[#DDD6FE]", title: "text-[#5B21B6]" },
                        };
                        const s = styles[article.relatedEquipment!.callout!.type] || styles.info;
                        return (
                          <div className={`${s.bg} border ${s.border} rounded-lg p-4 mt-3`}>
                            <h4 className={`font-bold ${s.title} text-sm mb-2 flex items-center gap-2`}>
                              <Info className="w-4 h-4" />
                              {article.relatedEquipment!.callout!.title}
                            </h4>
                            <p className="text-[#4B5563] text-sm">{article.relatedEquipment!.callout!.text}</p>
                          </div>
                        );
                      })()}
                    </div>
                  </>
                )}

                {/* Medicaid Section */}
                {article.medicaidSection && (
                  <>
                    <h2 id="medicaid-programs" className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10">{article.medicaidSection.title}</h2>
                    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                      {article.medicaidSection.paragraphs.map((p, i) => (
                        <p key={i} className="text-[#4B5563] text-[15px] leading-relaxed mb-4">{p}</p>
                      ))}
                      {article.medicaidSection.steps && (
                        <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-lg p-5 mt-4">
                          <h4 className="font-bold text-[#5B21B6] text-sm mb-3 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            {article.medicaidSection.steps.title}
                          </h4>
                          <ol className="space-y-2">
                            {article.medicaidSection.steps.steps.map((step, i) => (
                              <li key={i} className="flex items-start gap-2 text-[#4B5563] text-sm">
                                <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Decision Section */}
                {article.decisionSection && (
                  <>
                    <h2 id="making-decision" className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10">{article.decisionSection.title}</h2>
                    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                      {article.decisionSection.paragraphs.map((p, i) => (
                        <p key={i} className="text-[#4B5563] text-[15px] leading-relaxed mb-4">{p}</p>
                      ))}
                      {article.decisionSection.checklist && (
                        <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-5 mt-4">
                          <h4 className="font-bold text-[#92400E] text-sm mb-3 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            {article.decisionSection.checklist.title}
                          </h4>
                          <ul className="space-y-2">
                            {article.decisionSection.checklist.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-[#78350F] text-sm">
                                <span className="text-[#D97706] mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* FAQs */}
                <div id="faqs" className="mb-10 mt-10">
                  <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
                    <span className="text-[#D97706]">✦</span> Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {article.faqs.map((faq, i) => (
                      <FAQItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>

                {/* Helpful Vote */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm text-center">
                  <p className="text-[#1B2A4A] font-semibold mb-3">Was this article helpful?</p>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => setHelpfulVote("yes")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${helpfulVote === "yes" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "border-[#E5E7EB] text-[#6B7280] hover:border-emerald-300 hover:text-emerald-600"}`}>
                      <ThumbsUp className="w-4 h-4" /> Yes
                    </button>
                    <button onClick={() => setHelpfulVote("no")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${helpfulVote === "no" ? "bg-red-50 border-red-300 text-red-700" : "border-[#E5E7EB] text-[#6B7280] hover:border-red-300 hover:text-red-600"}`}>
                      <ThumbsDown className="w-4 h-4" /> No
                    </button>
                  </div>
                  {helpfulVote && <p className="text-sm text-[#6B7280] mt-3">Thank you for your feedback!</p>}
                </div>

                {/* Author Bios */}
                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {[article.author, article.reviewer].map((person, i) => (
                    <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-full ${person.role === "Author" ? "bg-[#1B2A4A]" : "bg-[#059669]"} flex items-center justify-center text-white font-bold text-sm`}>
                          {person.initials}
                        </div>
                        <div>
                          <p className="font-bold text-[#1B2A4A] text-sm">{person.name}</p>
                          <span className={`text-xs ${person.role === "Author" ? "bg-[#C41230]" : "bg-[#059669]"} text-white px-2 py-0.5 rounded-full`}>{person.role}</span>
                        </div>
                      </div>
                      <p className="text-[#6B7280] text-xs leading-relaxed">{person.bio}</p>
                    </div>
                  ))}
                </div>

                {/* Related Coverage Topics */}
                <div id="related-topics" className="mb-10">
                  <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-[#C41230]" /> Related Coverage Topics
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {article.relatedTopics.map((topic, i) => {
                      const colors = ["#1B2A4A", "#059669", "#D97706", "#7C3AED"];
                      const icons = [Stethoscope, Eye, Ear, FileText];
                      const TopicIcon = icons[i % icons.length];
                      const color = colors[i % colors.length];
                      return (
                        <Link key={i} href={`/faqs/${topic.slug}`} className="group bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#C41230]/30 transition-all">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}10` }}>
                              <TopicIcon className="w-5 h-5" style={{ color }} />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#1B2A4A] text-sm mb-1 group-hover:text-[#C41230] transition-colors">{topic.title}</h4>
                              <p className="text-[#6B7280] text-xs leading-relaxed">{topic.description}</p>
                              <span className="inline-flex items-center gap-1 text-[#C41230] text-xs font-semibold mt-2">Read more <ExternalLink className="w-3 h-3" /></span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </article>

              {/* ─── Sidebar ─── */}
              <aside className="hidden lg:block w-[280px] shrink-0">
                <div className="sticky top-[180px] space-y-6">
                  {/* ON THIS PAGE */}
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold tracking-wider text-[#6B7280] uppercase mb-4">On This Page</h3>
                    <nav className="space-y-1">
                      {toc.map((item) => (
                        <button key={item.id} onClick={() => scrollToSection(item.id)} className={`block w-full text-left text-sm py-1.5 px-3 rounded-md transition-all ${activeSection === item.id ? "bg-[#C41230]/10 text-[#C41230] font-semibold border-l-2 border-[#C41230]" : "text-[#6B7280] hover:text-[#1B2A4A] hover:bg-[#F5F7FA]"}`}>
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Quick Reference */}
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold tracking-wider text-[#6B7280] uppercase mb-4">Quick Reference</h3>
                    <ul className="space-y-3 text-sm">
                      {article.quickReference.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <QRIcon type={item.icon} />
                          <span className="text-[#4B5563]" dangerouslySetInnerHTML={{ __html: item.text }} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Topics */}
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold tracking-wider text-[#6B7280] uppercase mb-4">Related Topics</h3>
                    <ul className="space-y-2">
                      {article.sidebarRelatedLinks.map((topic, i) => (
                        <li key={i}>
                          <a href={`/search?q=${encodeURIComponent(topic)}`} className="text-sm text-[#2563EB] hover:text-[#1B2A4A] hover:underline transition-colors flex items-center gap-1">
                            <ChevronRight className="w-3 h-3" /> {topic}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Sidebar */}
                  <div className="bg-[#1B2A4A] rounded-xl p-5 text-center">
                    <p className="text-white font-bold text-sm mb-1">Have Questions?</p>
                    <p className="text-white/60 text-xs mb-4">Speak with a licensed Medicare agent</p>
                    <a href="tel:8883358996" className="flex items-center justify-center gap-2 bg-[#C41230] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#A50F28] transition-colors w-full mb-2">
                      <Phone className="w-4 h-4" /> (888) 335-8996
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#C41230] py-12 md:py-16">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{article.ctaBanner.title}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{article.ctaBanner.text}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:8883358996" className="flex items-center gap-2 bg-white text-[#C41230] font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
                <Phone className="w-5 h-5" /> Call (888) 335-8996
              </a>
              <a href="/medicare-plans/compare" className="flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Compare Plans <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
