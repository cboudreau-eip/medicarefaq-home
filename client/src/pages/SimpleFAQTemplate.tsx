/**
 * Simple FAQ Article Template
 * Renders FAQ articles scraped from the live medicarefaq.com site.
 * Uses a clean, readable layout with headings + paragraphs.
 * Follows the same Clarity System design language as CoverageTemplate.
 */

import { useState, useEffect } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  Clock,
  User,
  Calendar,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Phone,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import type { SimpleFAQArticleData } from "@/lib/article-types";

export default function SimpleFAQTemplate({
  article,
}: {
  article: SimpleFAQArticleData;
}) {
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.slug]);

  // Build TOC from sections
  const toc = article.sections
    .filter((s) => s.heading)
    .map((s, i) => ({
      id: `section-${i}`,
      label: s.heading,
    }));

  // Scroll spy
  useEffect(() => {
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
    slug: article.slug,
    title: article.seo.title,
    description: article.seo.description,
    canonical: article.seo.canonical,
    ogImage: article.seo.ogImage,
    ogType: "article",
  });

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
        {/* ─── Article Header ─── */}
        <section className="bg-[#1B2A4A] py-10 md:py-14">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Top bar label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                  {article.category}
                </span>
              </div>

              {/* Breadcrumbs */}
              <nav className="flex items-center gap-1.5 text-sm text-[#94A3B8] mb-4">
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link
                  href="/faqs"
                  className="hover:text-white transition-colors"
                >
                  FAQs
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/70 truncate max-w-[200px]">
                  {article.title}
                </span>
              </nav>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                {article.title}
              </h1>

              {/* Summary */}
              {article.summary && (
                <p className="text-lg text-[#CBD5E1] leading-relaxed max-w-3xl mb-6">
                  {article.summary}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
                {article.reviewer && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    Reviewed by {article.reviewer}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {article.dateUpdated}
                </span>
                {article.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Content Area ─── */}
        <section className="py-10 md:py-14">
          <div className="container max-w-6xl mx-auto">
            <div className="flex gap-10">
              {/* ─── Sidebar TOC (Desktop) ─── */}
              {toc.length > 1 && (
                <aside className="hidden lg:block w-64 shrink-0">
                  <div className="sticky top-36">
                    <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">
                      Table of Contents
                    </h3>
                    <nav className="space-y-1">
                      {toc.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left text-sm py-1.5 px-3 rounded-md transition-colors ${
                            activeSection === item.id
                              ? "bg-[#C41230]/10 text-[#C41230] font-semibold"
                              : "text-[#6B7280] hover:text-[#1B2A4A] hover:bg-[#F3F4F6]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </div>
                </aside>
              )}

              {/* ─── Main Content ─── */}
              <div className="flex-1 min-w-0">
                {/* Article sections */}
                <div className="space-y-10">
                  {article.sections.map((section, i) => (
                    <div
                      key={i}
                      id={`section-${i}`}
                      className="scroll-mt-36"
                    >
                      {section.heading && (
                        <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">
                          {section.heading}
                        </h2>
                      )}
                      {section.paragraphs.map((p, j) => {
                        // Check if this is an embedded table
                        if (p.startsWith("[TABLE:")) {
                          try {
                            const tableData = JSON.parse(
                              p.replace("[TABLE:", "").replace(/]$/, "")
                            );
                            if (
                              Array.isArray(tableData) &&
                              tableData.length > 0
                            ) {
                              return (
                                <div
                                  key={j}
                                  className="overflow-x-auto my-4"
                                >
                                  <table className="w-full border-collapse border border-[#E5E7EB] rounded-lg overflow-hidden">
                                    <thead>
                                      <tr className="bg-[#F5F7FA]">
                                        {tableData[0].map(
                                          (
                                            header: string,
                                            k: number
                                          ) => (
                                            <th
                                              key={k}
                                              className="text-left p-3 text-sm font-semibold text-[#1B2A4A] border border-[#E5E7EB]"
                                            >
                                              {header}
                                            </th>
                                          )
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {tableData
                                        .slice(1)
                                        .map(
                                          (
                                            row: string[],
                                            ri: number
                                          ) => (
                                            <tr
                                              key={ri}
                                              className="hover:bg-[#F9FAFB]"
                                            >
                                              {row.map(
                                                (
                                                  cell: string,
                                                  ci: number
                                                ) => (
                                                  <td
                                                    key={ci}
                                                    className="p-3 text-sm text-[#4B5563] border border-[#E5E7EB]"
                                                  >
                                                    {cell}
                                                  </td>
                                                )
                                              )}
                                            </tr>
                                          )
                                        )}
                                    </tbody>
                                  </table>
                                </div>
                              );
                            }
                          } catch {
                            // Not valid table JSON, render as text
                          }
                        }
                        return (
                          <p
                            key={j}
                            className="text-[#4B5563] text-[15px] leading-relaxed mb-3"
                          >
                            {p}
                          </p>
                        );
                      })}
                      {section.listItems && section.listItems.length > 0 && (
                        <ul className="list-disc list-inside space-y-1.5 text-[#4B5563] text-[15px] leading-relaxed mt-3">
                          {section.listItems.map((item, k) => (
                            <li key={k}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* ─── Helpful Vote ─── */}
                <div className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-xl text-center">
                  <p className="text-[#1B2A4A] font-semibold mb-3">
                    Was this article helpful?
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setHelpfulVote("yes")}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        helpfulVote === "yes"
                          ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
                          : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] border-2 border-transparent"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" /> Yes
                    </button>
                    <button
                      onClick={() => setHelpfulVote("no")}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        helpfulVote === "no"
                          ? "bg-red-100 text-red-700 border-2 border-red-300"
                          : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] border-2 border-transparent"
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" /> No
                    </button>
                  </div>
                  {helpfulVote && (
                    <p className="text-sm text-[#6B7280] mt-3">
                      Thank you for your feedback!
                    </p>
                  )}
                </div>

                {/* ─── CTA Banner ─── */}
                <div className="mt-10 bg-gradient-to-r from-[#1B2A4A] to-[#2D3F63] rounded-2xl p-8 md:p-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                    Need Help Understanding Your Medicare Options?
                  </h2>
                  <p className="text-[#CBD5E1] text-lg mb-6 max-w-xl mx-auto">
                    Our licensed Medicare experts can help you find the right
                    coverage for your needs.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="tel:+18884410465"
                      className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-8 py-3.5 rounded-lg transition-colors text-lg"
                    >
                      <Phone className="w-5 h-5" />
                      Call (888) 441-0465
                    </a>
                    <Link
                      href="/compare-rates"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-lg transition-colors text-lg border border-white/20"
                    >
                      Compare Plans
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* ─── Related Articles ─── */}
                {article.relatedSlugs && article.relatedSlugs.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-4">
                      Related Articles
                    </h3>
                    <div className="grid gap-3">
                      {article.relatedSlugs.map((slug, i) => (
                        <Link
                          key={i}
                          href={`/faqs/${slug}`}
                          className="flex items-center gap-3 p-4 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#C41230]/30 hover:shadow-sm transition-all group"
                        >
                          <ArrowRight className="w-4 h-4 text-[#C41230] shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="text-[#1B2A4A] font-medium text-sm group-hover:text-[#C41230] transition-colors">
                            {slug
                              .replace(/-/g, " ")
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
