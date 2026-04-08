/**
 * News Page — /news
 * Medicare news and updates hub
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Newspaper, Calendar, ArrowRight, Bell, TrendingUp, FileText, ExternalLink } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const newsItems = [
  {
    date: "March 2026",
    category: "Part D",
    title: "Medicare Part D Out-of-Pocket Cap Now $2,000 in 2026",
    summary: "The Inflation Reduction Act's $2,000 annual cap on Medicare Part D out-of-pocket drug costs takes full effect in 2026, providing significant savings for beneficiaries with high drug costs.",
    href: "/blog/medicare-part-d-changes-2026",
  },
  {
    date: "January 2026",
    category: "Part B",
    title: "2026 Medicare Part B Premium Set at $185.00/Month",
    summary: "CMS announced the 2026 Medicare Part B premium of $185.00 per month, up from $174.70 in 2025. The annual deductible increases to $257.",
    href: "/blog/medicare-costs-2026",
  },
  {
    date: "January 2026",
    category: "Part A",
    title: "Part A Inpatient Deductible Rises to $1,676 in 2026",
    summary: "The Medicare Part A inpatient hospital deductible for 2026 is $1,676 per benefit period, an increase from $1,632 in 2025.",
    href: "/original-medicare/medicare-parts/medicare-part-a",
  },
  {
    date: "October 2025",
    category: "Medicare Advantage",
    title: "Medicare Advantage Enrollment Reaches Record High",
    summary: "More than 33 million Medicare beneficiaries are now enrolled in Medicare Advantage plans, representing over 54% of all Medicare enrollees.",
    href: "/medicare-part-c/medicare-advantage-plans",
  },
  {
    date: "October 2025",
    category: "Medigap",
    title: "Medigap Plan G Remains Top Choice for 2026",
    summary: "Plan G continues to be the most popular Medicare Supplement plan, offering comprehensive coverage for all Medicare cost-sharing except the Part B deductible.",
    href: "/medicare-supplements/medicare-supplement-plans/plan-g",
  },
  {
    date: "September 2025",
    category: "Enrollment",
    title: "Annual Enrollment Period Opens October 15",
    summary: "The Medicare Annual Enrollment Period (AEP) runs October 15 through December 7. This is your opportunity to review and change your Medicare Advantage or Part D plan for 2026.",
    href: "/original-medicare/medicare-enrollment-periods",
  },
];

const updateCategories = [
  { label: "Part D Updates", href: "/original-medicare/medicare-parts/medicare-part-d", icon: FileText },
  { label: "Part B Updates", href: "/original-medicare/medicare-parts/medicare-part-b", icon: TrendingUp },
  { label: "Medicare Advantage News", href: "/medicare-part-c/medicare-advantage-plans", icon: Bell },
  { label: "Medigap Changes", href: "/medicare-supplements", icon: FileText },
  { label: "Enrollment Deadlines", href: "/original-medicare/medicare-enrollment-periods", icon: Calendar },
];

export default function News() {
  useSEO({
    title: "Medicare News & Updates 2026 | MedicareFAQ",
    description: "Stay current with the latest Medicare news, policy updates, premium changes, and enrollment deadlines. MedicareFAQ covers all the Medicare updates that matter to beneficiaries.",
    canonical: "https://www.medicarefaq.com/news",
    ogType: "website",
  });

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
        <section className="bg-[#1B3A6B] text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Medicare News</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <Newspaper className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">Medicare News &amp; Updates</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  Stay informed about the latest Medicare policy changes, premium updates, enrollment deadlines, and coverage news that affects your benefits.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main News Feed */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-[#1B3A6B] mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-teal-500" />
                Latest Medicare Updates
              </h2>
              <div className="space-y-6">
                {newsItems.map((item, i) => (
                  <article key={i} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <Calendar size={13} />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.summary}</p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold text-sm"
                    >
                      Read more <ArrowRight size={14} />
                    </Link>
                  </article>
                ))}
              </div>

              {/* Blog CTA */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">More Medicare Resources</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore our full library of Medicare guides, articles, and educational resources.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-[#1B3A6B] hover:bg-[#152e56] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Browse All Articles <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category Quick Links */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 mb-4">News by Category</h3>
                <ul className="space-y-2">
                  {updateCategories.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                      <li key={i}>
                        <Link
                          href={cat.href}
                          className="flex items-center gap-2 text-gray-700 hover:text-teal-600 text-sm py-1.5"
                        >
                          <Icon size={15} className="text-teal-500 shrink-0" />
                          {cat.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Official Sources */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 mb-3">Official Medicare Sources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.medicare.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-700 hover:underline"
                    >
                      Medicare.gov <ExternalLink size={12} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.cms.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-700 hover:underline"
                    >
                      CMS.gov <ExternalLink size={12} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ssa.gov/medicare"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-700 hover:underline"
                    >
                      SSA Medicare Info <ExternalLink size={12} />
                    </a>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-[#1B3A6B] rounded-xl p-5 text-white">
                <h3 className="font-bold mb-2">Free Medicare Review</h3>
                <p className="text-blue-200 text-sm mb-4">
                  Have questions about how Medicare changes affect your coverage? Speak with a licensed specialist.
                </p>
                <Link
                  href="/compare-rates"
                  className="block text-center bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Compare Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
