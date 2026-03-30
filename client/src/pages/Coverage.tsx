/**
 * Coverage FAQ Landing Page
 * Design: Grid layout with category filters, search, and article cards
 * Follows the Clarity System design language — light, modern, professional
 */

import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Clock, ArrowRight, User, Search, Shield, ChevronRight, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { coverageArticles } from "@/lib/coverage-data";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

/* ─── Category colour map ─── */
const categoryColors: Record<string, string> = {
  "All Topics": "#1B2A4A",
  "Medicare Coverage": "#059669",
  "Medicare Enrollment": "#2563EB",
  "Medicare Advantage": "#D97706",
  "Medicare Supplement (Medigap)": "#7C3AED",
};

function getCategoryColor(name: string) {
  return categoryColors[name] || "#6B7280";
}

/* ─── Derive unique categories from the data ─── */
function deriveCategories(articles: typeof coverageArticles) {
  const cats = new Map<string, number>();
  for (const a of articles) {
    cats.set(a.category, (cats.get(a.category) || 0) + 1);
  }
  return [
    { name: "All Topics", count: articles.length },
    ...Array.from(cats.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count })),
  ];
}

export default function Coverage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return coverageArticles.filter((a) => {
      const q = searchQuery.toLowerCase();
      return (
        q === "" ||
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  // Separate the newer informational articles (non "does-medicare-cover") as featured
  const featuredArticles = filteredArticles.filter(
    (a) => !a.slug.startsWith("does-medicare-cover")
  );
  const coverageQA = filteredArticles.filter((a) =>
    a.slug.startsWith("does-medicare-cover")
  );

  const showFeatured =
    searchQuery === "" && featuredArticles.length > 0;

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
        {/* ─── Page Header ─── */}
        <section className="bg-[#1B2A4A] py-12 md:py-16">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <nav className="text-sm text-white/50 mb-4 flex items-center gap-2">
                <Link href="/" className="hover:text-white/80 transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/80">Coverage FAQs</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white">
                  Coverage FAQs
                </h1>
              </div>
              <p className="text-white/70 text-lg max-w-2xl">
                Expert answers to your Medicare coverage questions. Understand
                what's covered, what's not, and how to get the most from your
                plan.
              </p>
              <div className="flex items-center gap-6 mt-6 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  {coverageArticles.length} Articles
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Written by Licensed Agents
                </span>
              </div>
            </motion.div>
          </div>
        </section>



        {/* ─── Featured / Latest Articles ─── */}
        {showFeatured && (
          <section className="bg-white py-10 md:py-14">
            <div className="container max-w-6xl mx-auto">
              <h2 className="text-xs font-bold tracking-wider text-[#C41230] uppercase mb-6 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" />
                Latest Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.map((article, index) => (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                  >
                    <Link
                      href={`/faqs/${article.slug}`}
                      className="group block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-200 h-full"
                    >
                      {/* Coloured top accent */}
                      <div
                        className="h-1.5"
                        style={{
                          backgroundColor: getCategoryColor(article.category),
                        }}
                      />
                      <div className="p-6 flex flex-col h-[calc(100%-6px)]">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="inline-block text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md text-white"
                            style={{
                              backgroundColor: getCategoryColor(
                                article.category
                              ),
                            }}
                          >
                            {article.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-[#1B2A4A] text-[16px] mb-2 leading-snug group-hover:text-[#C41230] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-[#6B7280] text-[13px] leading-relaxed mb-4 line-clamp-3 flex-1">
                          {article.subtitle}
                        </p>
                        <div className="flex items-center justify-between text-xs text-[#9CA3AF] pt-3 border-t border-[#F0F0F0]">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {article.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[#C41230] text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                          Read article <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Coverage Q&A Grid ─── */}
        <section className="bg-[#F5F7FA] py-10 md:py-14">
          <div className="container max-w-6xl mx-auto">
            {/* Section header */}
            {searchQuery === "" ? (
              <h2 className="text-xs font-bold tracking-wider text-[#1B2A4A] uppercase mb-6 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                All Coverage Topics
              </h2>
            ) : (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold tracking-wider text-[#1B2A4A] uppercase">
                  {`Search results for "${searchQuery}"`}
                </h2>
                <span className="text-sm text-[#9CA3AF]">
                  {filteredArticles.length} article
                  {filteredArticles.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <Shield className="w-12 h-12 text-[#D1D5DB] mx-auto mb-4" />
                <p className="text-[#9CA3AF] text-lg mb-2">
                  No articles found.
                </p>
                <p className="text-[#9CA3AF] text-sm">
                  Try a different search term or category.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(searchQuery === ""
                  ? coverageQA
                  : filteredArticles
                ).map((article, index) => (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                  >
                    <Link
                      href={`/faqs/${article.slug}`}
                      className="group block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-md hover:border-[#C41230]/20 transition-all duration-200 h-full"
                    >
                      <div className="p-5 flex flex-col h-full">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${getCategoryColor(
                                article.category
                              )}12`,
                            }}
                          >
                            <Shield
                              className="w-4 h-4"
                              style={{
                                color: getCategoryColor(article.category),
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span
                              className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded text-white mb-1.5"
                              style={{
                                backgroundColor: getCategoryColor(
                                  article.category
                                ),
                              }}
                            >
                              {article.category}
                            </span>
                            <h3 className="font-bold text-[#1B2A4A] text-[14px] leading-snug group-hover:text-[#C41230] transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-[#6B7280] text-[12px] leading-relaxed mb-4 line-clamp-2 flex-1">
                          {article.subtitle}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-[#9CA3AF]">
                          <span>{article.dateUpdated}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section className="bg-[#1B2A4A] py-12 md:py-16">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Our licensed Medicare agents are here to answer your specific
              coverage questions and help you find the right plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+18889191484"
                className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-8 py-3.5 rounded-lg transition-colors text-sm"
              >
                Call (888) 919-1484
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm border border-white/20"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
