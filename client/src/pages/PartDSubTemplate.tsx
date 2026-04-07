/**
 * PartDSubTemplate — renders any of the 13 Medicare Part D sub-pages
 * based on the slug parameter from the URL.
 */

import { useState } from "react";
import { useParams, Link } from "wouter";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import {
  Pill,
  Calendar,
  Shield,
  DollarSign,
  FileText,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Phone,
  CheckCircle2,
  TrendingDown,
  Layers,
  Scale,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { partDSubPages } from "@/lib/part-d-sub-data";

const iconMap: Record<string, React.ReactNode> = {
  Pill: <Pill className="w-8 h-8 text-blue-200" />,
  Calendar: <Calendar className="w-8 h-8 text-blue-200" />,
  Shield: <Shield className="w-8 h-8 text-blue-200" />,
  DollarSign: <DollarSign className="w-8 h-8 text-blue-200" />,
  FileText: <FileText className="w-8 h-8 text-blue-200" />,
  AlertTriangle: <AlertTriangle className="w-8 h-8 text-blue-200" />,
  TrendingDown: <TrendingDown className="w-8 h-8 text-blue-200" />,
  Layers: <Layers className="w-8 h-8 text-blue-200" />,
  Scale: <Scale className="w-8 h-8 text-blue-200" />,
  ArrowRight: <ArrowRight className="w-8 h-8 text-blue-200" />,
};

export default function PartDSubTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const page = partDSubPages.find((p) => p.slug === slug);

  useCMSSEO({
    contentType: "page",
    slug: `part-d-${slug ?? ""}`,
    title: page?.metaTitle ?? "Medicare Part D | MedicareFAQ",
    description: page?.metaDescription ?? "Learn about Medicare Part D prescription drug coverage.",
  });

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
          <UtilityBar />
          <HeaderBar />
          <MegaMenu />
        </header>
        <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
          <MobileNav />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
            <Link href="/original-medicare/medicare-parts/medicare-part-d" className="text-blue-600 hover:underline">
              Return to Medicare Part D Overview
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tocItems = page.sections.map((s) => ({ id: s.id, label: s.heading }));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar />
        <HeaderBar />
        <MegaMenu />
      </header>
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#1B3A6B] text-white py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/original-medicare" className="hover:text-white">Original Medicare</Link>
              <span>/</span>
              <Link href="/original-medicare/medicare-parts/medicare-part-d" className="hover:text-white">Part D</Link>
              <span>/</span>
              <span className="text-white">{page.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/30 rounded-xl p-3">
                {iconMap[page.heroIcon] ?? <Pill className="w-8 h-8 text-blue-200" />}
              </div>
              <span className="text-blue-200 text-sm font-medium uppercase tracking-wide">Medicare Part D</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-6">{page.heroSubtitle}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:8883358996"
                className="inline-flex items-center gap-2 bg-[#E8871E] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Get Free Guidance
              </a>
              <Link
                href="/original-medicare/medicare-parts/medicare-part-d"
                className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Part D Overview <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-12 flex gap-10">
          {/* TOC */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">On This Page</p>
              <ul className="space-y-1">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-gray-600 hover:text-[#1B3A6B] block py-1 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {page.faqs.length > 0 && (
                  <li>
                    <a href="#faqs" className="text-sm text-gray-600 hover:text-[#1B3A6B] block py-1 transition-colors">
                      FAQs
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </aside>

          <article className="flex-1 min-w-0 space-y-12">
            {/* Sections */}
            {page.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>

                {section.bullets && (
                  <ul className="space-y-2 mb-4">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-700 text-sm">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#1B3A6B] text-white">
                          {section.table.headers.map((h, i) => (
                            <th
                              key={i}
                              className={`text-left p-3 ${i === 0 ? "rounded-tl-lg" : ""} ${i === section.table!.headers.length - 1 ? "rounded-tr-lg" : ""}`}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {row.map((cell, ci) => (
                              <td key={ci} className="p-3 text-gray-700 border-b border-gray-100">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.callout && (
                  <div
                    className={`rounded-xl p-5 border ${
                      section.callout.type === "warning"
                        ? "bg-amber-50 border-amber-200"
                        : section.callout.type === "tip"
                        ? "bg-green-50 border-green-200"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {section.callout.type === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      ) : section.callout.type === "tip" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      ) : (
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      )}
                      <p
                        className={`text-sm ${
                          section.callout.type === "warning"
                            ? "text-amber-800"
                            : section.callout.type === "tip"
                            ? "text-green-800"
                            : "text-blue-800"
                        }`}
                      >
                        {section.callout.text}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* FAQs */}
            {page.faqs.length > 0 && (
              <section id="faqs">
                <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {page.faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Links */}
            {page.relatedLinks.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Related Resources</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {page.relatedLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#1B3A6B] hover:bg-blue-50 transition-colors group"
                    >
                      <ArrowRight className="w-4 h-4 text-[#1B3A6B] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#1B3A6B]">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>

        {/* CTA Banner */}
        <section className="bg-[#1B3A6B] text-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">Questions About Medicare Part D?</h2>
            <p className="text-blue-100 mb-6">
              Our licensed Medicare agents can help you compare Part D plans, check your drug formulary, and find the
              best coverage for your medications — at no cost to you.
            </p>
            <a
              href="tel:8883358996"
              className="inline-flex items-center gap-2 bg-[#E8871E] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call (888) 335-8996
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
