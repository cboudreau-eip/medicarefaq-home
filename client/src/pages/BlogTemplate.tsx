/**
 * Data-Driven Blog Article Template
 * Renders any blog article from a BlogArticleData object.
 * Follows the wireframe: dark navy header, key takeaways, sticky TOC sidebar,
 * rich content with tables, callouts, FAQ accordion, author bios, related articles.
 */

import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link, useParams } from "wouter";
import {
  Clock,
  User,
  Calendar,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Info,
  AlertTriangle,
  Play,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import type { BlogArticleData, BlogSectionContent } from "@/lib/article-types";
import { blogArticles } from "@/lib/blog-articles-data";
import { blogPosts } from "@/lib/blog-data";

/* ─── FAQ Component ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F5F7FA] transition-colors">
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

/* ─── Section Renderer ─── */
function SectionRenderer({ section }: { section: BlogSectionContent }) {
  switch (section.type) {
    case "heading":
      if (section.level === 3) {
        return <h3 id={section.id} className="text-xl font-bold text-[#1B2A4A] mb-3 mt-8">{section.text}</h3>;
      }
      return <h2 id={section.id} className="text-2xl font-bold text-[#1B2A4A] mb-4 mt-10">{section.text}</h2>;

    case "paragraph":
      return <p className="text-[#4B5563] text-[15px] leading-relaxed mb-4">{section.content}</p>;

    case "table":
      return (
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F7FA] border-b border-[#E5E7EB]">
                  {section.headers?.map((h: string, i: number) => (
                    <th key={i} className="text-left px-6 py-3 font-semibold text-[#1B2A4A]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows?.map((row: string[], i: number) => (
                  <tr key={i} className={`border-b border-[#E5E7EB] ${i % 2 === 1 ? "bg-[#FAFAFA]" : ""}`}>
                    {row.map((cell: string, j: number) => (
                      <td key={j} className={`px-6 py-4 ${j === 0 ? "font-medium text-[#1B2A4A]" : "text-[#4B5563]"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.footnote && (
            <div className="px-6 py-3 bg-[#F5F7FA] text-xs text-[#6B7280] border-t border-[#E5E7EB]">{section.footnote}</div>
          )}
        </div>
      );

    case "callout": {
      const styles: Record<string, { bg: string; border: string; title: string; icon: React.ElementType }> = {
        info: { bg: "bg-[#EFF6FF]", border: "border-[#BFDBFE]", title: "text-[#1E40AF]", icon: Info },
        warning: { bg: "bg-[#FEF3C7]", border: "border-[#FDE68A]", title: "text-[#92400E]", icon: AlertTriangle },
        success: { bg: "bg-emerald-50", border: "border-emerald-200", title: "text-emerald-800", icon: CheckCircle2 },
        tip: { bg: "bg-[#F5F3FF]", border: "border-[#DDD6FE]", title: "text-[#5B21B6]", icon: Lightbulb },
      };
      const s = styles[section.calloutType || "info"];
      const CalloutIcon = s.icon;
      return (
        <div className={`${s.bg} border ${s.border} rounded-lg p-5 mb-6`}>
          <h4 className={`font-bold ${s.title} text-sm mb-2 flex items-center gap-2`}>
            <CalloutIcon className="w-4 h-4" />
            {section.calloutTitle}
          </h4>
          <p className="text-[#4B5563] text-sm leading-relaxed">{section.calloutText}</p>
        </div>
      );
    }

    case "list":
      if (section.ordered) {
        return (
          <ol className="space-y-3 mb-6">
            {section.items?.map((item: string, i: number) => (
              <li key={i} className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-[#1B2A4A] text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <p className="text-[#4B5563] text-[15px] leading-relaxed pt-0.5">{item}</p>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-2 mb-6 pl-1">
          {section.items?.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-[#4B5563] text-[15px]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "faq":
      return (
        <div className="space-y-3 mb-6">
          {section.faqs?.map((faq, i: number) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      );

    default:
      return null;
  }
}

/* ─── Main Component ─── */
export default function BlogTemplate() {
  const params = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === params.slug);
  // Check if it's an old static post without full article content
  const staticPost = !article ? blogPosts.find((p) => p.slug === params.slug) : null;

  useSEO(article?.seo ? {
    title: article.seo.title,
    description: article.seo.description,
    canonical: article.seo.canonical,
    ogImage: article.seo.ogImage,
    ogType: "article",
  } : {
    title: article ? `${article.title} | MedicareFAQ` : "Medicare Blog | MedicareFAQ",
    description: article?.excerpt ?? "Read the latest Medicare news, tips, and guides from MedicareFAQ.",
    canonical: article ? `https://www.medicarefaq.com/blog/${article.slug}/` : "https://www.medicarefaq.com/blog/",
    ogImage: article?.image ?? "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    ogType: "article",
  });

  const [activeSection, setActiveSection] = useState("");
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

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
    article.tableOfContents.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Show a "Coming Soon" page for old static posts that have listing data but no full article
  if (!article && staticPost) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
        <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
          <UtilityBar /><HeaderBar /><MegaMenu />
        </header>
        <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
          <MobileNav />
        </header>
        <main className="flex-1">
          <section className="bg-[#1B2A4A] py-10 md:py-14">
            <div className="container max-w-6xl mx-auto">
              <nav className="text-sm text-white/50 mb-5 flex items-center gap-2 flex-wrap">
                <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/70">{staticPost.title}</span>
              </nav>
              <h1 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white leading-tight mb-6">{staticPost.title}</h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{staticPost.date}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" />Written By: {staticPost.author}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{staticPost.readTime}</span>
              </div>
            </div>
          </section>
          <section className="py-16">
            <div className="container max-w-3xl mx-auto text-center">
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-[#D97706]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1B2A4A] mb-3">Full Article Coming Soon</h2>
                <p className="text-[#6B7280] text-[15px] leading-relaxed mb-6 max-w-lg mx-auto">
                  {staticPost.excerpt}
                </p>
                <p className="text-[#9CA3AF] text-sm mb-8">This article is being migrated to our new platform. Check back soon for the full content.</p>
                <div className="flex items-center justify-center gap-4">
                  <Link href="/blog" className="inline-flex items-center gap-2 bg-[#1B2A4A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#243556] transition-colors">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Browse All Articles
                  </Link>
                  <a href="tel:8883358996" className="inline-flex items-center gap-2 border-2 border-[#1B2A4A] text-[#1B2A4A] px-6 py-3 rounded-lg font-semibold hover:bg-[#1B2A4A] hover:text-white transition-colors">
                    Call (888) 335-8996
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

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
            <p className="text-[#6B7280] mb-6">The blog article you're looking for doesn't exist yet.</p>
            <Link href="/blog" className="text-[#C41230] font-semibold hover:underline">Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related articles
  const relatedArticles = article.relatedSlugs
    ? blogArticles.filter((a) => article.relatedSlugs!.includes(a.slug)).slice(0, 4)
    : blogArticles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar /><HeaderBar /><MegaMenu />
      </header>
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      <main className="flex-1">
        {/* ─── Article Header ─── */}
        <section className="bg-[#1B2A4A] py-10 md:py-14">
          <div className="container max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <nav className="text-sm text-white/50 mb-5 flex items-center gap-2 flex-wrap">
                <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/70">{article.title}</span>
              </nav>
              <h1 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white leading-tight mb-6">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{article.date}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" />Written By: {article.author}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" />Reviewed By: {article.reviewer}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Content + Sidebar ─── */}
        <section className="py-8 md:py-12">
          <div className="container max-w-6xl mx-auto">
            <div className="flex gap-8 lg:gap-10">
              <article className="flex-1 min-w-0">
                {/* Key Takeaways */}
                {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                  <div className="bg-white border-l-4 border-[#1B2A4A] rounded-r-xl p-6 mb-8 shadow-sm">
                    <h2 className="font-bold text-[#1B2A4A] text-lg mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-[#D97706]" /> Key Takeaways
                    </h2>
                    <ul className="space-y-2">
                      {article.keyTakeaways.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-[#4B5563] text-[15px]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
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

                {/* Article Sections */}
                {article.sections.map((section: BlogSectionContent, i: number) => (
                  <SectionRenderer key={i} section={section} />
                ))}

                {/* FAQs */}
                {article.faqs && article.faqs.length > 0 && (
                  <div id="faqs" className="mb-10 mt-10">
                    <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-2">
                      <span className="text-[#D97706]">✦</span> Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                      {article.faqs.map((faq, i: number) => (
                        <FAQItem key={i} question={faq.question} answer={faq.answer} />
                      ))}
                    </div>
                  </div>
                )}

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

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">Related Articles</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {relatedArticles.map((post, i: number) => (
                        <Link key={i} href={`/blog/${post.slug}`} className="group bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                          <div className="h-32 overflow-hidden">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="p-4">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${post.categoryColor}15`, color: post.categoryColor }}>{post.category}</span>
                            <h4 className="font-bold text-[#1B2A4A] text-sm mt-2 mb-1 group-hover:text-[#C41230] transition-colors line-clamp-2">{post.title}</h4>
                            <p className="text-[#6B7280] text-xs">{post.date}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* ─── Sidebar ─── */}
              <aside className="hidden lg:block w-[280px] shrink-0">
                <div className="sticky top-[180px] space-y-6">
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold tracking-wider text-[#6B7280] uppercase mb-4">On This Page</h3>
                    <nav className="space-y-1">
                      {article.tableOfContents.map((item) => (
                        <button key={item.id} onClick={() => scrollToSection(item.id)} className={`block w-full text-left text-sm py-1.5 px-3 rounded-md transition-all ${activeSection === item.id ? "bg-[#C41230]/10 text-[#C41230] font-semibold border-l-2 border-[#C41230]" : "text-[#6B7280] hover:text-[#1B2A4A] hover:bg-[#F5F7FA]"}`}>
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="bg-[#1B2A4A] rounded-xl p-5 text-center">
                    <p className="text-white font-bold text-sm mb-1">Have Questions?</p>
                    <p className="text-white/60 text-xs mb-4">Speak with a licensed Medicare agent</p>
                    <a href="tel:8883358996" className="flex items-center justify-center gap-2 bg-[#C41230] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#A50F28] transition-colors w-full">
                      (888) 335-8996
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Need Help Choosing a Plan?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">Our licensed agents can help you compare Medicare plans and find the best coverage for your needs — at no cost to you.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:8883358996" className="flex items-center gap-2 bg-white text-[#C41230] font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">Call (888) 335-8996</a>
              <Link href="/medicare-plans/compare" className="flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
