import { Link, useRoute } from "wouter";
import { MEDICARE_ADVANTAGE_PAGES } from "@/lib/medicare-advantage-sub-data";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Shield, ChevronRight, Phone, BookOpen } from "lucide-react";
import Footer from "@/components/Footer";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import UtilityBar from "@/components/UtilityBar";
import CTABanner from "@/components/CTABanner";

export default function MedicareAdvantageSubTemplate() {
  const [matchIndex] = useRoute("/medicare-part-c");
  const [matchSub, params] = useRoute("/medicare-part-c/:slug");

  const slug = matchIndex ? "" : (params?.slug ?? "");
  const page = MEDICARE_ADVANTAGE_PAGES.find((p) => p.slug === slug);

  // CMS SEO override
  const cmsSlug = slug === "" ? "medicare-advantage" : `medicare-advantage-${slug}`;
  useCMSSEO({
    contentType: "page",
    slug: cmsSlug,
    title: page ? `${page.title} | MedicareFAQ` : "Medicare Advantage | MedicareFAQ",
    description: page?.heroDescription ?? "",
    canonical: `https://www.medicarefaq.com/medicare-part-c${slug ? `/${slug}` : ""}`,
  });

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-4">Page Not Found</h1>
        <Link href="/medicare-part-c" className="text-teal-600 underline">
          Back to Medicare Advantage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
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

      {/* Hero */}
      <section className="bg-[#1B3A5C] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            {slug !== "" ? (
              <>
                <Link href="/medicare-part-c" className="hover:text-white transition-colors">
                  Medicare Advantage
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">{page.title}</span>
              </>
            ) : (
              <span className="text-white">Medicare Advantage</span>
            )}
          </nav>

          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-teal-500/20 rounded-full p-2">
              <Shield className="w-5 h-5 text-teal-300" />
            </div>
            <span className="text-teal-300 text-sm font-semibold tracking-widest uppercase">
              {page.subtitle}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{page.title}</h1>
          <p className="text-blue-100 text-lg max-w-3xl mb-8">{page.heroDescription}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href="tel:8883358996"
              className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#a30f28] text-white font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              Get Free Guidance
            </a>
            {slug !== "" && (
              <Link
                href="/medicare-part-c"
                className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Medicare Advantage Overview
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4">
        <div className="max-w-5xl mx-auto flex gap-8">
          {/* Table of Contents */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28 bg-gray-50 rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">On This Page</p>
              <nav className="space-y-2">
                {page.sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-gray-600 hover:text-teal-600 transition-colors leading-snug"
                  >
                    {s.heading}
                  </a>
                ))}
                {page.faqs.length > 0 && (
                  <a
                    href="#faqs"
                    className="block text-sm text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Frequently Asked Questions
                  </a>
                )}
                {page.relatedLinks.length > 0 && (
                  <a
                    href="#related"
                    className="block text-sm text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Related Topics
                  </a>
                )}
              </nav>
            </div>
          </aside>

          {/* Article Body */}
          <article className="flex-1 min-w-0">
            {page.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-10">
                <h2 className="text-2xl font-bold text-[#1B3A5C] mb-4 pb-2 border-b border-gray-100">
                  {section.heading}
                </h2>
                <div
                  className="prose prose-gray max-w-none text-gray-700 leading-relaxed
                    prose-headings:text-[#1B3A5C] prose-strong:text-gray-900
                    prose-ul:space-y-1 prose-li:text-gray-700
                    prose-table:text-sm prose-th:bg-gray-50 prose-th:font-semibold
                    prose-th:border prose-th:border-gray-200 prose-th:p-2
                    prose-td:border prose-td:border-gray-200 prose-td:p-2"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              </section>
            ))}

            {/* FAQs */}
            {page.faqs.length > 0 && (
              <section id="faqs" className="mb-10">
                <h2 className="text-2xl font-bold text-[#1B3A5C] mb-6 pb-2 border-b border-gray-100">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {page.faqs.map((faq, i) => (
                    <details key={i} className="group border border-gray-200 rounded-lg overflow-hidden">
                      <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-gray-800 hover:bg-gray-50 transition-colors list-none">
                        <span>{faq.question}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-2" />
                      </summary>
                      <div className="px-4 pb-4 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related Links */}
            {page.relatedLinks.length > 0 && (
              <section id="related" className="mb-10">
                <h2 className="text-2xl font-bold text-[#1B3A5C] mb-4 pb-2 border-b border-gray-100">
                  Related Topics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {page.relatedLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.path}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors group"
                    >
                      <BookOpen className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">
                        {link.label}
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-400 ml-auto flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </main>

      <CTABanner />
      <Footer />
    </div>
  );
}
