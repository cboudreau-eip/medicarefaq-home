/**
 * Blog Landing Page
 * Design: Grid layout with featured post hero, category filters, and card grid
 * Follows the Clarity System design language
 */

import { useState } from "react";
import { Link } from "wouter";
import { Clock, ArrowRight, User, Search } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts, categories } from "@/lib/blog-data";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All Posts" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen flex flex-col">
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
        {/* Page Header */}
        <section className="bg-[#1B2A4A] py-12 md:py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <nav className="text-sm text-white/50 mb-4">
                <Link href="/" className="hover:text-white/80 transition-colors">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white/80">Blog</span>
              </nav>
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white mb-4">
                Medicare News & Insights
              </h1>
              <p className="text-white/70 text-lg max-w-2xl">
                Expert articles, guides, and analysis to help you navigate Medicare
                with confidence. Updated regularly by licensed professionals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="bg-white border-b border-[#E5E7EB] sticky top-[132px] lg:top-[133px] z-30">
          <div className="container py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                      activeCategory === cat.name
                        ? "text-white shadow-sm"
                        : "text-[#6B7280] bg-[#F5F7FA] hover:bg-[#E5E7EB]"
                    }`}
                    style={
                      activeCategory === cat.name
                        ? { backgroundColor: cat.color }
                        : undefined
                    }
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg text-sm text-[#1B2A4A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B2A4A] focus:ring-1 focus:ring-[#1B2A4A]/20 transition-all duration-150"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && activeCategory === "All Posts" && searchQuery === "" && (
          <section className="bg-white py-10 md:py-14">
            <div className="container">
              <h2 className="text-xs font-bold tracking-wider text-[#C41230] uppercase mb-6">
                Featured Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-200"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span
                            className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md text-white"
                            style={{ backgroundColor: post.categoryColor }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-[#1B2A4A] text-xl mb-2 leading-tight group-hover:text-[#1B2A4A]">
                          {post.title}
                        </h3>
                        <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.readTime}
                            </span>
                          </div>
                          <span className="text-sm text-[#9CA3AF]">{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="bg-[#F5F7FA] py-10 md:py-14">
          <div className="container">
            {activeCategory === "All Posts" && searchQuery === "" && (
              <h2 className="text-xs font-bold tracking-wider text-[#1B2A4A] uppercase mb-6">
                All Articles
              </h2>
            )}
            {(activeCategory !== "All Posts" || searchQuery !== "") && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold tracking-wider text-[#1B2A4A] uppercase">
                  {searchQuery
                    ? `Search results for "${searchQuery}"`
                    : activeCategory}
                </h2>
                <span className="text-sm text-[#9CA3AF]">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#9CA3AF] text-lg">
                  No articles found. Try a different search or category.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory === "All Posts" && searchQuery === ""
                  ? regularPosts
                  : filteredPosts
                ).map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-200 h-full"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className="inline-block text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md text-white"
                            style={{ backgroundColor: post.categoryColor }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col h-[calc(100%-176px)]">
                        <h3 className="font-bold text-[#1B2A4A] text-[15px] mb-2 leading-snug group-hover:text-[#1B2A4A] line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[#6B7280] text-[13px] leading-relaxed mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
