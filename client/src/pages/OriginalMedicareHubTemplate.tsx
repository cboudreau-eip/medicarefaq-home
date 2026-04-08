/**
 * OriginalMedicareHubTemplate
 * Renders data-driven hub pages under /original-medicare/
 */

import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link, useParams } from "wouter";
import {
  Shield,
  DollarSign,
  Users,
  BookOpen,
  Calendar,
  ChevronDown,
  ArrowRight,
  Phone,
  CheckCircle2,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { originalMedicareHubPages } from "@/lib/original-medicare-hub-data";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  DollarSign,
  Users,
  BookOpen,
  Calendar,
};

function CalloutBox({ type, text }: { type: "info" | "warning" | "tip"; text: string }) {
  const styles = {
    info: { bg: "bg-blue-50 border-blue-200", icon: Info, iconColor: "text-blue-600", label: "Note" },
    warning: { bg: "bg-amber-50 border-amber-200", icon: AlertTriangle, iconColor: "text-amber-600", label: "Important" },
    tip: { bg: "bg-green-50 border-green-200", icon: Lightbulb, iconColor: "text-green-600", label: "Tip" },
  };
  const s = styles[type];
  const Icon = s.icon;
  return (
    <div className={`${s.bg} border rounded-lg p-4 flex gap-3 my-4`}>
      <Icon className={`${s.iconColor} mt-0.5 shrink-0`} size={18} />
      <div>
        <span className="font-semibold text-sm">{s.label}: </span>
        <span className="text-sm text-gray-700">{text}</span>
      </div>
    </div>
  );
}

export default function OriginalMedicareHubTemplate() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const page = originalMedicareHubPages.find((p) => p.slug === slug);

  useCMSSEO({
    contentType: "page",
    slug: page?.path ?? `/original-medicare/${slug}`,
    title: page?.metaTitle ?? "Original Medicare",
    description: page?.metaDescription ?? "",
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
            <Link href="/original-medicare" className="text-teal-600 hover:underline">
              Back to Original Medicare
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const HeroIcon = iconMap[page.heroIcon] ?? Shield;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Desktop Nav */}
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar />
        <HeaderBar />
        <MegaMenu />
      </header>
      {/* Mobile Nav */}
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#1B3A6B] text-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/original-medicare" className="hover:text-white">Original Medicare</Link>
              <span>/</span>
              <span className="text-white">{page.title}</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <HeroIcon className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">{page.title}</h1>
                <p className="text-blue-100 text-lg leading-relaxed">{page.heroSubtitle}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Intro */}
          <p className="text-gray-700 text-lg leading-relaxed mb-8 border-l-4 border-teal-500 pl-4">
            {page.intro}
          </p>

          {/* Sections */}
          {page.sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-10">
              <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed mb-3">{section.content}</p>

              {section.bullets && (
                <ul className="space-y-2 mb-3">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={16} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#1B3A6B] text-white">
                        {section.table.headers.map((h, i) => (
                          <th key={i} className="px-4 py-2 text-left font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-4 py-2 border-b border-gray-100 text-gray-700">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.callout && <CalloutBox type={section.callout.type} text={section.callout.text} />}
            </section>
          ))}

          {/* FAQs */}
          {page.faqs.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {page.faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                        size={18}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-3">
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
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Related Topics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {page.relatedLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors text-gray-700 hover:text-teal-700"
                  >
                    <ArrowRight className="text-teal-500 shrink-0" size={16} />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Have Medicare Questions?</h3>
            <p className="text-blue-200 mb-6">Our licensed Medicare specialists can help you understand your options and find the right coverage.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+18005551234"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone size={18} />
                Speak with a Specialist
              </a>
              <Link
                href="/compare-rates"
                className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Compare Plans
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
