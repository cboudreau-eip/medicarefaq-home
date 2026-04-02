/**
 * Search Results Page — /search?q=...
 * Design: Clean results layout with type filters, result cards, and search refinement.
 * Follows the Clarity System design language.
 */

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link, useSearch } from "wouter";
import {
  Search,
  ArrowRight,
  FileText,
  Shield,
  BookOpen,
  Layout,
  ChevronRight,
  Clock,
  User,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  searchContent,
  getTypeCounts,
  getTotalContentCount,
  type SearchResult,
} from "@/lib/search-index";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

/* ─── Type filter config ─── */
const typeFilters = [
  { key: "all", label: "All Results", icon: SlidersHorizontal },
  { key: "blog", label: "Blog", icon: FileText },
  { key: "coverage", label: "Coverage FAQs", icon: Shield },
  { key: "guide", label: "Guides", icon: BookOpen },
  { key: "page", label: "Pages", icon: Layout },
] as const;

/* ─── Type badge colors ─── */
const typeBadgeColors: Record<string, { bg: string; text: string }> = {
  blog: { bg: "#EFF6FF", text: "#2563EB" },
  coverage: { bg: "#ECFDF5", text: "#059669" },
  guide: { bg: "#F5F3FF", text: "#7C3AED" },
  page: { bg: "#F3F4F6", text: "#6B7280" },
};

/* ─── Popular searches ─── */
const popularSearches = [
  "dental implants",
  "Medicare costs 2026",
  "Medicare Advantage",
  "enrollment",
  "Part D",
  "Medigap",
  "turning 65",
  "hearing aids",
];

export default function SearchResults() {
  useSEO({
    title: "Search Medicare Topics | MedicareFAQ",
    description: "Search MedicareFAQ for answers to your Medicare questions. Find articles, guides, and FAQs on Medicare plans, enrollment, costs, and more.",
    canonical: "https://www.medicarefaq.com/search/",
    ogImage: OG_DEFAULT,
    ogType: "website",
  });
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const initialQuery = params.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Update query when URL changes
  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    const q = p.get("q") || "";
    if (q !== query) {
      setQuery(q);
      setActiveFilter("all");
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const results = useMemo(() => searchContent(query), [query]);
  const typeCounts = useMemo(() => getTypeCounts(results), [results]);
  const totalContent = useMemo(() => getTotalContentCount(), []);

  const filteredResults = useMemo(() => {
    if (activeFilter === "all") return results;
    return results.filter((r) => r.type === activeFilter);
  }, [results, activeFilter]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        window.history.replaceState(null, "", `/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [query]
  );

  const handlePopularSearch = useCallback((term: string) => {
    setQuery(term);
    setActiveFilter("all");
    window.history.replaceState(null, "", `/search?q=${encodeURIComponent(term)}`);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setActiveFilter("all");
    window.history.replaceState(null, "", "/search");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      {/* Navigation — Desktop */}
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar />
        <HeaderBar />
        <MegaMenu />
      </header>

      {/* Navigation — Mobile */}
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      <main className="flex-1">
        {/* ─── Search Header ─── */}
        <section className="bg-white border-b border-[#E5E7EB] py-8 md:py-10">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="text-sm text-[#9CA3AF] mb-4 flex items-center gap-2">
                <Link href="/" className="hover:text-[#1B2A4A] transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#1B2A4A] font-medium">Search</span>
              </nav>

              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1B2A4A] mb-5">
                {query ? `Search results for "${query}"` : "Search Medicare Topics"}
              </h1>

              {/* Search Input */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search blog articles, coverage FAQs, guides, and more..."
                  className="w-full pl-12 pr-12 py-4 bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl text-[15px] text-[#1B2A4A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/10 transition-all duration-150"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E5E7EB] hover:bg-[#D1D5DB] flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-[#6B7280]" />
                  </button>
                )}
              </form>

              {/* Result count & filter tabs */}
              {query && (
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-sm text-[#6B7280]">
                    Found{" "}
                    <span className="font-bold text-[#1B2A4A]">
                      {results.length}
                    </span>{" "}
                    result{results.length !== 1 ? "s" : ""} across{" "}
                    <span className="font-medium">{totalContent}</span> articles
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ─── Filter Tabs ─── */}
        {query && results.length > 0 && (
          <div className="bg-white border-b border-[#E5E7EB] sticky top-[140px] lg:top-[168px] z-30">
            <div className="container max-w-4xl mx-auto">
              <div className="flex items-center gap-1 overflow-x-auto py-2 -mx-1 px-1 scrollbar-hide">
                {typeFilters.map((filter) => {
                  const count = typeCounts[filter.key] || 0;
                  const isActive = activeFilter === filter.key;
                  const Icon = filter.icon;
                  if (filter.key !== "all" && count === 0) return null;
                  return (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                        isActive
                          ? "bg-[#1B2A4A] text-white shadow-sm"
                          : "text-[#6B7280] hover:bg-[#F5F7FA] hover:text-[#1B2A4A]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {filter.label}
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#F0F0F0] text-[#9CA3AF]"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── Results ─── */}
        <section className="py-8 md:py-10">
          <div className="container max-w-4xl mx-auto">
            {/* No query — show popular searches */}
            {!query && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F5F7FA] flex items-center justify-center mx-auto mb-5">
                  <Search className="w-7 h-7 text-[#9CA3AF]" />
                </div>
                <h2 className="text-xl font-bold text-[#1B2A4A] mb-2">
                  What are you looking for?
                </h2>
                <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
                  Search across {totalContent} articles, guides, and FAQs to find
                  the Medicare information you need.
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularSearch(term)}
                      className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-full text-sm text-[#6B7280] hover:border-[#1B2A4A] hover:text-[#1B2A4A] hover:shadow-sm transition-all duration-150"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Query but no results */}
            {query && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] flex items-center justify-center mx-auto mb-5">
                  <Search className="w-7 h-7 text-[#F87171]" />
                </div>
                <h2 className="text-xl font-bold text-[#1B2A4A] mb-2">
                  No results found
                </h2>
                <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                  We couldn't find anything matching "{query}". Try a different
                  search term or browse popular topics below.
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto mb-8">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularSearch(term)}
                      className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-full text-sm text-[#6B7280] hover:border-[#1B2A4A] hover:text-[#1B2A4A] hover:shadow-sm transition-all duration-150"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <Link
                  href="/faqs"
                  className="inline-flex items-center gap-2 text-[#C41230] font-semibold text-sm hover:underline"
                >
                  Browse all Coverage FAQs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}

            {/* Results list */}
            {query && filteredResults.length > 0 && (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredResults.map((result, index) => (
                    <ResultCard key={result.id} result={result} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Filtered to zero */}
            {query && results.length > 0 && filteredResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#6B7280] mb-4">
                  No results in this category. Try{" "}
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="text-[#C41230] font-semibold hover:underline"
                  >
                    viewing all results
                  </button>
                  .
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="bg-[#1B2A4A] py-12 md:py-16">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Our licensed Medicare agents are here to answer your specific
              questions and help you find the right plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+18883358996"
                className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-8 py-3.5 rounded-lg transition-colors text-sm"
              >
                Call (888) 335-8996
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm border border-white/20"
              >
                Contact Us Online
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Result Card Component ─── */
function ResultCard({ result, index }: { result: SearchResult; index: number }) {
  const badge = typeBadgeColors[result.type] || typeBadgeColors.page;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link
        href={result.href}
        className="group block bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-md hover:border-[#C41230]/20 transition-all duration-200"
      >
        <div className="flex items-start gap-4">
          {/* Left: type badge icon */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ backgroundColor: badge.bg }}
          >
            {result.type === "blog" && (
              <FileText className="w-5 h-5" style={{ color: badge.text }} />
            )}
            {result.type === "coverage" && (
              <Shield className="w-5 h-5" style={{ color: badge.text }} />
            )}
            {result.type === "guide" && (
              <BookOpen className="w-5 h-5" style={{ color: badge.text }} />
            )}
            {result.type === "page" && (
              <Layout className="w-5 h-5" style={{ color: badge.text }} />
            )}
          </div>

          {/* Right: content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded"
                style={{ backgroundColor: badge.bg, color: badge.text }}
              >
                {result.typeLabel}
              </span>
              <span
                className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded text-white"
                style={{ backgroundColor: result.categoryColor }}
              >
                {result.category}
              </span>
            </div>

            <h3 className="font-bold text-[#1B2A4A] text-[15px] mb-1 group-hover:text-[#C41230] transition-colors leading-snug">
              {result.title}
            </h3>

            <p className="text-[13px] text-[#6B7280] leading-relaxed line-clamp-2 mb-2">
              {result.description}
            </p>

            <div className="flex items-center gap-4 text-[11px] text-[#9CA3AF]">
              {result.author && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {result.author}
                </span>
              )}
              {result.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {result.readTime}
                </span>
              )}
              {result.date && <span>{result.date}</span>}
              <span className="ml-auto flex items-center gap-1 text-[#C41230] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Read <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
