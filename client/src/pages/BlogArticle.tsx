/**
 * Blog Article Page
 * Design: Follows wireframe image 2 — dark navy header, key takeaways, sticky TOC sidebar,
 * rich content with tables, callouts, FAQ accordion, author bios, related articles
 * Clarity System design language
 */

import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
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
} from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts, articleTableOfContents } from "@/lib/blog-data";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F5F7FA] transition-colors"
      >
        <span className="font-semibold text-[#1B2A4A] text-[15px] pr-4">
          {question}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#6B7280] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#6B7280] shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 text-[#4B5563] text-[15px] leading-relaxed border-t border-[#E5E7EB]">
          <div className="pt-3">{answer}</div>
        </div>
      )}
    </div>
  );
}

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const [activeSection, setActiveSection] = useState("");
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);

  // Scroll spy for TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    articleTableOfContents.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Related posts
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  // Only render the Part B article content for the matching slug
  if (slug !== "medicare-part-b-annual-deductible-explained") {
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
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1B2A4A] mb-4">
              Article Coming Soon
            </h1>
            <p className="text-[#6B7280] mb-6">
              This article is currently being prepared by our editorial team.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#C41230] font-semibold hover:underline"
            >
              Back to Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
        {/* Article Header */}
        <section className="bg-[#1B2A4A] py-10 md:py-14">
          <div className="container max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <nav className="text-sm text-white/50 mb-5 flex items-center gap-2 flex-wrap">
                <Link
                  href="/"
                  className="hover:text-white/80 transition-colors"
                >
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link
                  href="/blog"
                  className="hover:text-white/80 transition-colors"
                >
                  Medicare News
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/70">
                  Medicare Part B Annual Deductible
                </span>
              </nav>

              <h1 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white leading-tight mb-5">
                Medicare Part B Annual Deductible Explained: What You'll Pay
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Posted on March 12, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Written By: David Haass
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Reviewed By: Ashlee Zareczny
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  12 min read
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Body + Sidebar */}
        <section className="bg-white py-8 md:py-12">
          <div className="container max-w-5xl mx-auto">
            <div className="flex gap-10">
              {/* Main Content */}
              <article className="flex-1 min-w-0">
                {/* Quick Answer Box */}
                <div className="bg-[#EFF6FF] border-l-4 border-[#2563EB] rounded-r-lg p-5 mb-8">
                  <p className="text-xs font-bold tracking-wider text-[#2563EB] uppercase mb-2">
                    Quick Answer
                  </p>
                  <p className="text-[#1B2A4A] text-[15px] leading-relaxed">
                    The Medicare Part B deductible is the amount you pay each year
                    for most outpatient services before Medicare starts paying its
                    share. In 2026, you must first pay the annual Part B deductible
                    of <strong>$283</strong> (it resets every January 1) on
                    Medicare-approved amounts. After you meet it, Medicare generally
                    pays 80% of covered outpatient costs and you pay the remaining
                    20% coinsurance.
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-6 mb-10">
                  <h2 className="flex items-center gap-2 text-[#166534] font-bold text-lg mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-3">
                    {[
                      "The Part B annual deductible is your first out-of-pocket step. It's the amount you must pay each calendar year before Medicare begins covering your Part B services.",
                      "The 2026 deductible may adjust for inflation. The Medicare Part B annual deductible often changes each year, so checking the new amount is important for budgeting.",
                      "Most outpatient services apply to the deductible. Doctor visits, outpatient care, many tests, and durable medical equipment count toward meeting the deductible.",
                      "Some services bypass the deductible entirely. Many Medicare preventive services are covered at 100%, so you pay nothing even if you haven't met your deductible.",
                      "Medigap and Medicare Advantage can help manage costs. Certain Medigap plans or Medicare Advantage plans may reduce your overall Medicare outpatient costs.",
                      "Review your coverage every year. Because premiums, deductibles, and benefits can change annually, it's wise to reassess your plan and costs before each new year.",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-[14px] text-[#1B2A4A] leading-relaxed">
                        <span className="text-[#16A34A] font-bold shrink-0 mt-0.5">
                          {i + 1}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Intro */}
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-6">
                  As you approach 65 or review your Medicare coverage for 2026,
                  it's easy to feel overwhelmed by terms like{" "}
                  <strong className="text-[#1B2A4A]">
                    Medicare Part B deductible
                  </strong>
                  , coinsurance, and premiums. Understanding these basics in plain
                  language can help you feel more confident before making any
                  decisions about your coverage.
                </p>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-10">
                  Knowing how the Part B annual deductible works is one of the most
                  important steps in protecting your retirement savings. When you
                  see how it fits together with your other Original Medicare
                  out-of-pocket costs, you can plan ahead and reduce the chance of
                  surprise bills.
                </p>

                {/* Section: How the Part B Deductible Works */}
                <h2
                  id="how-deductible-works"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4 mt-2"
                >
                  How the Part B Deductible Works
                </h2>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  The Medicare Part B annual deductible is tied directly to the
                  calendar year. That means your deductible starts over every
                  January 1, no matter when you first enrolled or how much care you
                  needed the year before.
                </p>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  In 2026, the Medicare Part B deductible is{" "}
                  <strong className="text-[#1B2A4A]">$283</strong>. This is the
                  amount of Medicare-approved outpatient charges you must pay before
                  standard Part B cost-sharing begins. According to Medicare.gov,
                  the Part B deductible is reviewed and may be adjusted each year to
                  reflect changes in healthcare costs and program requirements.
                </p>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-3">
                  Here's how it works in practice:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-[#4B5563] text-[15px] leading-relaxed mb-6 ml-2">
                  <li>
                    You pay the first $283 in covered outpatient costs during the
                    year.
                  </li>
                  <li>
                    These costs must be based on the Medicare approved amount, not
                    the provider's full bill.
                  </li>
                  <li>
                    Only services that Part B covers count toward this deductible.
                  </li>
                </ol>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-10">
                  Because the deductible is spread across your first Part B
                  services of the year, it's helpful to keep track of your bills.
                  Your Medicare Summary Notice and online account can show how close
                  you are to reaching the deductible.
                </p>

                {/* Section: What Happens After Meeting the Deductible */}
                <h2
                  id="after-meeting-deductible"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  What Happens After Meeting the Deductible?
                </h2>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  Once you've paid the full $283 in approved charges in 2026,
                  Medicare Part B begins its standard cost-sharing:
                </p>
                <ul className="space-y-2 text-[#4B5563] text-[15px] leading-relaxed mb-5 ml-2">
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold shrink-0">•</span>
                    Medicare pays <strong>80%</strong> of the Medicare-approved
                    amount for covered services.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold shrink-0">•</span>
                    You pay the remaining <strong>20%</strong> as your Medicare Part
                    B coinsurance.
                  </li>
                </ul>

                {/* Example Callout */}
                <div className="bg-[#FFFBEB] border-l-4 border-[#F59E0B] rounded-r-lg p-5 mb-10">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#92400E] uppercase mb-2">
                    <Lightbulb className="w-4 h-4" />
                    Example
                  </p>
                  <p className="text-[#78350F] text-[14px] leading-relaxed">
                    Imagine you're newly 65 in 2026. You have a few doctor visits
                    early in the year and pay through the full deductible. Later in
                    the year, you need an outpatient surgery costing the
                    Medicare-approved amount of $2,000. Because you've already met
                    the deductible, Medicare pays about{" "}
                    <strong>$1,600 (80%)</strong>, and you would typically owe
                    around <strong>$400 (20%)</strong>—unless you have additional
                    coverage like Medigap.
                  </p>
                </div>

                {/* Section: Deductible vs Premium vs Coinsurance Table */}
                <h2
                  id="deductible-vs-premium"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  Medicare Part B: Deductible vs Premium vs Coinsurance (2026)
                </h2>
                <div className="overflow-x-auto mb-10">
                  <table className="w-full text-sm border border-[#E5E7EB] rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-[#1B2A4A] text-white">
                        <th className="text-left px-4 py-3 font-semibold">
                          Term
                        </th>
                        <th className="text-left px-4 py-3 font-semibold">
                          What It Means
                        </th>
                        <th className="text-left px-4 py-3 font-semibold">
                          2026 Amount
                        </th>
                        <th className="text-left px-4 py-3 font-semibold">
                          When You Pay
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#E5E7EB]">
                        <td className="px-4 py-3 font-semibold text-[#1B2A4A]">
                          Premium
                        </td>
                        <td className="px-4 py-3 text-[#4B5563]">
                          Monthly payment to keep Part B active
                        </td>
                        <td className="px-4 py-3 font-semibold text-[#1B2A4A]">
                          $202.90
                        </td>
                        <td className="px-4 py-3 text-[#4B5563]">
                          Every month, regardless of service use
                        </td>
                      </tr>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <td className="px-4 py-3 font-semibold text-[#1B2A4A]">
                          Deductible
                        </td>
                        <td className="px-4 py-3 text-[#4B5563]">
                          Annual amount you pay before Medicare pays its share
                        </td>
                        <td className="px-4 py-3 font-semibold text-[#1B2A4A]">
                          $283
                        </td>
                        <td className="px-4 py-3 text-[#4B5563]">
                          Once per year, as you receive covered services
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-[#1B2A4A]">
                          Coinsurance
                        </td>
                        <td className="px-4 py-3 text-[#4B5563]">
                          Your share (usually 20%) of costs after deductible is met
                        </td>
                        <td className="px-4 py-3 font-semibold text-[#1B2A4A]">
                          20% of approved amount
                        </td>
                        <td className="px-4 py-3 text-[#4B5563]">
                          Each time you use covered outpatient services
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Section: Premium Key Differences */}
                <h2
                  id="premium-key-differences"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  Part B Premiums vs. Part B Deductible: Key Differences
                </h2>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  Many Medicare shoppers mix up premiums, deductibles, and
                  coinsurance. Understanding the difference between your monthly
                  Part B premium and your annual Part B deductible is essential for
                  clear budgeting.
                </p>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  For 2026, the standard Part B premium is{" "}
                  <strong className="text-[#1B2A4A]">$202.90</strong>, while the
                  Part B deductible is{" "}
                  <strong className="text-[#1B2A4A]">$283</strong>.
                </p>
                <ul className="space-y-2 text-[#4B5563] text-[15px] leading-relaxed mb-4 ml-2">
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold shrink-0">•</span>
                    <strong>Part B premiums:</strong> A set amount most people pay
                    every month to keep Part B active, even if they don't use any
                    services.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold shrink-0">•</span>
                    <strong>Part B deductible:</strong> A yearly amount you pay out
                    of pocket for services before Medicare starts paying its 80%
                    share.
                  </li>
                </ul>

                <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg p-5 mb-10">
                  <h3 className="font-bold text-[#1B2A4A] text-[16px] mb-2">
                    Why Understanding Both Costs Matters
                  </h3>
                  <p className="text-[#4B5563] text-[14px] leading-relaxed mb-3">
                    Knowing how both the premium and deductible work helps you
                    separate your fixed and variable Medicare expenses:
                  </p>
                  <ul className="space-y-1 text-[#4B5563] text-[14px] leading-relaxed ml-2">
                    <li className="flex gap-2">
                      <span className="text-[#2563EB] font-bold shrink-0">•</span>
                      <strong>Premiums are fixed:</strong> You owe them each month
                      as long as you have Part B.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#2563EB] font-bold shrink-0">•</span>
                      <strong>Deductibles are usage-based:</strong> You only pay
                      them as you receive covered services.
                    </li>
                  </ul>
                </div>

                {/* Section: Services That Count */}
                <h2
                  id="services-that-count"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  Services That Count Toward the Part B Deductible
                </h2>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  The Part B deductible applies to most medically necessary
                  outpatient services under Original Medicare coverage. Common
                  services that usually apply include:
                </p>
                <ul className="space-y-2 text-[#4B5563] text-[15px] leading-relaxed mb-5 ml-2">
                  {[
                    "Doctor and specialist office visits",
                    "Outpatient surgeries and procedures",
                    "Diagnostic tests and imaging (like X-rays and MRIs)",
                    "Lab work and many blood tests",
                    "Medically necessary durable medical equipment, such as walkers, wheelchairs, or home oxygen equipment",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#2563EB] font-bold shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Q&A Callout */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-5 mb-10">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#1D4ED8] uppercase mb-2">
                    <AlertCircle className="w-4 h-4" />
                    Quick Q&A
                  </p>
                  <p className="text-[#1B2A4A] text-[14px] leading-relaxed">
                    <strong>Q: Do all Part B drugs count toward the deductible?</strong>
                    <br />
                    A: Many drugs given in a doctor's office or infusion center and
                    billed under Part B do apply toward your deductible, but not
                    every medication is handled this way. Some medications fall under
                    Part D instead.
                  </p>
                </div>

                {/* Section: Preventive Services */}
                <h2
                  id="preventive-services"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  Preventive Services You Don't Pay For
                </h2>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  One of the most comforting parts of Medicare preventive services
                  coverage is that many screenings and vaccines are covered at 100%.
                  You don't pay the deductible or coinsurance for these, as long as
                  the service meets Medicare's rules:
                </p>
                <ul className="space-y-2 text-[#4B5563] text-[15px] leading-relaxed mb-10 ml-2">
                  {[
                    "Annual wellness visits",
                    "Flu, COVID-19, and pneumonia shots",
                    "Mammograms, colonoscopies, and some other cancer screenings",
                    "Screenings for conditions like diabetes or cardiovascular disease",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Section: Deductible Changes */}
                <h2
                  id="deductible-changes"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  Deductible Changes by Year
                </h2>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  The Medicare Part B deductible does not stay the same forever. It
                  often adjusts annually based on broader healthcare and economic
                  factors. In 2026, the deductible is{" "}
                  <strong className="text-[#1B2A4A]">$283</strong>, up from{" "}
                  <strong className="text-[#1B2A4A]">$257</strong> in 2025.
                </p>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  The Centers for Medicare & Medicaid Services (CMS) reviews
                  Medicare's finances each year, looking at overall outpatient
                  spending, expected healthcare costs, and requirements to keep
                  Medicare financially stable.
                </p>

                <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg p-5 mb-10">
                  <h3 className="font-bold text-[#1B2A4A] text-[16px] mb-3">
                    How to Stay Informed About Changes
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-[#4B5563] text-[14px] leading-relaxed">
                    <li>
                      Read your Medicare "Annual Notice of Change" and any plan
                      letters each fall.
                    </li>
                    <li>
                      Visit trusted sites that explain Medicare cost changes and
                      trends in plain language.
                    </li>
                    <li>
                      Talk with a licensed Medicare agent who can review your
                      situation without pressure.
                    </li>
                  </ol>
                </div>

                {/* Section: Out-of-Pocket Costs */}
                <h2
                  id="out-of-pocket-costs"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  How the Deductible Affects Out-of-Pocket Costs
                </h2>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  The Part B deductible is just one piece of your overall Medicare
                  cost management strategy. After you meet it in 2026, you move
                  into the coinsurance phase: Medicare covers 80% of approved
                  outpatient costs, and you're generally responsible for 20%.
                </p>

                {/* Warning Callout */}
                <div className="bg-[#FEF2F2] border-l-4 border-[#EF4444] rounded-r-lg p-5 mb-5">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#991B1B] uppercase mb-2">
                    <AlertCircle className="w-4 h-4" />
                    Important
                  </p>
                  <p className="text-[#991B1B] text-[14px] leading-relaxed">
                    Original Medicare has <strong>no out-of-pocket maximum</strong>{" "}
                    for Part B services. That means there's no built-in ceiling on
                    what you might pay in coinsurance if you have a serious illness
                    or frequent treatments.
                  </p>
                </div>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-10">
                  This is why many retirees look for ways to reduce the risk of
                  large, ongoing bills through Medigap plans or Medicare Advantage.
                </p>

                {/* Section: Tips for Managing Costs */}
                <h2
                  id="tips-managing-costs"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  Tips for Managing Part B Costs
                </h2>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  Fortunately, there are practical ways to handle the Part B
                  deductible and your ongoing coinsurance. One of the most common
                  approaches is adding a Medicare Supplement plan (also called
                  Medigap):
                </p>
                <ul className="space-y-2 text-[#4B5563] text-[15px] leading-relaxed mb-5 ml-2">
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold shrink-0">•</span>
                    <strong>Medicare Supplement (Medigap) plans:</strong> Help with
                    coinsurance, copays, and sometimes other costs.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold shrink-0">•</span>
                    <strong>Medigap Plan G:</strong> A very popular choice that
                    covers all Part B coinsurance; you only pay the Part B
                    deductible each year.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold shrink-0">•</span>
                    <strong>Medicare Advantage (Part C):</strong> An alternative to
                    Original Medicare that often has different deductibles and
                    out-of-pocket maximums.
                  </li>
                </ul>

                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-5 mb-10">
                  <h3 className="font-bold text-[#166534] text-[16px] mb-3">
                    Other Cost-Saving Strategies
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-[#4B5563] text-[14px] leading-relaxed">
                    <li>
                      Use preventive services early and regularly — they're covered
                      at 100%.
                    </li>
                    <li>
                      Verify that providers accept Medicare assignment to ensure
                      you're charged the approved amount.
                    </li>
                    <li>
                      Keep a simple log of your bills to track how close you are to
                      the deductible.
                    </li>
                    <li>
                      Review your coverage each year as your health, prescriptions,
                      and budget change.
                    </li>
                  </ol>
                </div>

                {/* Section: Who This Is For */}
                <h2
                  id="who-this-is-for"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  Who This Is For / Who This Isn't For
                </h2>
                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-5">
                    <h3 className="font-bold text-[#166534] text-[15px] mb-3">
                      Who This Is For
                    </h3>
                    <ul className="space-y-2 text-[#4B5563] text-[14px]">
                      {[
                        "Seniors enrolled in Medicare Part B",
                        "Caregivers helping loved ones understand Medicare costs",
                        "Anyone planning their healthcare budget for 2026",
                        "Individuals wanting clarity on deductibles and coverage",
                        "Those seeking ways to manage out-of-pocket expenses",
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-5">
                    <h3 className="font-bold text-[#991B1B] text-[15px] mb-3">
                      Who This Isn't For
                    </h3>
                    <ul className="space-y-2 text-[#4B5563] text-[14px]">
                      {[
                        "People not enrolled in or eligible for Part B",
                        "Individuals focused only on Medicare Part A details",
                        "Those researching non-Medicare private insurance plans",
                        "Anyone needing past-year (2023–2025) cost specifics",
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Section: Final Thoughts */}
                <h2
                  id="final-thoughts"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-4"
                >
                  Final Thoughts
                </h2>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  Understanding the Medicare Part B deductible for 2026 is more
                  than just learning a dollar amount. It's about seeing how that
                  deductible, your monthly premium, and your 20% coinsurance all
                  work together to shape your total healthcare spending.
                </p>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-4">
                  By knowing that the deductible resets every January, which
                  services count toward it, and what happens once you've met it,
                  you can take control of your Medicare experience instead of
                  feeling lost in the fine print. Many seniors find that pairing
                  Original Medicare with a carefully chosen Medigap plan or Medicare
                  Advantage plan creates a clearer, more comfortable path through
                  retirement healthcare.
                </p>
                <p className="text-[#4B5563] text-[16px] leading-[1.8] mb-10">
                  Most of all, remember you don't have to sort it all out alone.
                  Clear explanations, transparent comparisons, and help from
                  licensed professionals — when you're ready for it — can make
                  Medicare feel understandable and manageable instead of confusing
                  and rushed.
                </p>

                {/* Section: FAQs */}
                <h2
                  id="faqs"
                  className="text-[22px] font-extrabold text-[#1B2A4A] mb-5"
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3 mb-10">
                  <FAQItem
                    question="What is the Medicare Part B deductible for 2026?"
                    answer={
                      <p>
                        The Medicare Part B deductible for 2026 is{" "}
                        <strong>$283</strong>. This is the amount you must pay out
                        of pocket for covered outpatient services before Medicare
                        begins paying 80% of the Medicare-approved amount.
                      </p>
                    }
                  />
                  <FAQItem
                    question="Do I have to pay the Part B deductible every year?"
                    answer={
                      <p>
                        Yes. The Part B deductible is a calendar-year deductible,
                        which means it resets every January 1. Even if you met your
                        deductible late in the previous year, you start over with a
                        new deductible amount at the beginning of the next year.
                      </p>
                    }
                  />
                  <FAQItem
                    question="What services count toward the Part B deductible?"
                    answer={
                      <div>
                        <p className="mb-2">
                          Most medically necessary outpatient services under Part B
                          count toward the deductible, including:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Doctor and specialist office visits</li>
                          <li>Outpatient surgeries and procedures</li>
                          <li>Diagnostic tests, imaging, and lab work</li>
                          <li>Durable medical equipment that Part B covers</li>
                        </ul>
                        <p className="mt-2">
                          However, many preventive services are covered at 100% and
                          do not apply to the deductible.
                        </p>
                      </div>
                    }
                  />
                  <FAQItem
                    question="What happens after I meet my Part B deductible?"
                    answer={
                      <p>
                        After you've paid the full Part B deductible for 2026,
                        Medicare usually pays 80% of the Medicare-approved amount
                        for covered outpatient services. You pay the remaining 20%
                        as coinsurance. If you have a Medigap plan like Plan G,
                        that plan may then pay this 20% coinsurance for you.
                      </p>
                    }
                  />
                  <FAQItem
                    question="Are Medicare premiums and deductibles the same?"
                    answer={
                      <div>
                        <p className="mb-2">
                          No. Although both affect what you pay for Medicare, they
                          work differently:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            <strong>Premiums</strong> are monthly payments that keep
                            your coverage active.
                          </li>
                          <li>
                            <strong>Deductibles</strong> are yearly amounts you must
                            pay for services before Medicare begins paying its
                            share.
                          </li>
                        </ul>
                        <p className="mt-2">
                          For 2026, the standard Part B premium is{" "}
                          <strong>$202.90</strong>, while the Part B deductible is{" "}
                          <strong>$283</strong>.
                        </p>
                      </div>
                    }
                  />
                  <FAQItem
                    question="Does the Part B deductible change every year?"
                    answer={
                      <p>
                        Yes, the Part B deductible is reviewed annually and may
                        change from year to year based on economic conditions and
                        projected healthcare spending. In 2026, it is{" "}
                        <strong>$283</strong>, compared with <strong>$257</strong>{" "}
                        in 2025.
                      </p>
                    }
                  />
                  <FAQItem
                    question="How can I avoid high out-of-pocket costs with Original Medicare?"
                    answer={
                      <div>
                        <p className="mb-2">
                          Since Original Medicare does not include an out-of-pocket
                          maximum for Part B services, many people add additional
                          coverage:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            Buying a Medicare Supplement (Medigap) plan to cover
                            coinsurance and other gaps
                          </li>
                          <li>
                            Choosing a Medicare Advantage plan that has its own
                            out-of-pocket maximum
                          </li>
                          <li>
                            Using preventive services to reduce the chance of more
                            intensive, expensive care later
                          </li>
                        </ul>
                      </div>
                    }
                  />
                </div>

                {/* Helpful Vote */}
                <div className="border border-[#E5E7EB] rounded-lg p-5 mb-10">
                  <p className="text-[#1B2A4A] font-semibold text-[15px] mb-3">
                    Was this article helpful?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setHelpfulVote("yes")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        helpfulVote === "yes"
                          ? "bg-[#16A34A] text-white"
                          : "bg-[#F5F7FA] text-[#6B7280] hover:bg-[#E5E7EB]"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Yes
                    </button>
                    <button
                      onClick={() => setHelpfulVote("no")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        helpfulVote === "no"
                          ? "bg-[#DC2626] text-white"
                          : "bg-[#F5F7FA] text-[#6B7280] hover:bg-[#E5E7EB]"
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      No
                    </button>
                  </div>
                </div>

                {/* Author Bios */}
                <div className="border border-[#E5E7EB] rounded-xl overflow-hidden mb-10">
                  <div className="bg-[#F5F7FA] px-5 py-3 border-b border-[#E5E7EB]">
                    <span className="text-xs font-bold tracking-wider text-[#1B2A4A] uppercase">
                      Author & Reviewer
                    </span>
                  </div>
                  <div className="p-5 space-y-5">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white font-bold text-lg shrink-0">
                        DH
                      </div>
                      <div>
                        <p className="font-bold text-[#1B2A4A] text-[15px]">
                          David Haass
                        </p>
                        <p className="text-xs text-[#C41230] font-semibold mb-1">
                          Author
                        </p>
                        <p className="text-[#6B7280] text-[13px] leading-relaxed">
                          David Haass is the Chief Technology Officer and
                          Co-Founder of Elite Insurance Partners and
                          MedicareFAQ.com. He is a member and regular contributor
                          to Forbes Finance Council.
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-[#E5E7EB] pt-5 flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#0D9488] flex items-center justify-center text-white font-bold text-lg shrink-0">
                        AZ
                      </div>
                      <div>
                        <p className="font-bold text-[#1B2A4A] text-[15px]">
                          Ashlee Zareczny
                        </p>
                        <p className="text-xs text-[#0D9488] font-semibold mb-1">
                          Reviewer — Director of Operations
                        </p>
                        <p className="text-[#6B7280] text-[13px] leading-relaxed">
                          Ashlee Zareczny is the Director of Operations for
                          MedicareFAQ. As a licensed Medicare agent in all 50
                          states, she is dedicated to educating those eligible for
                          Medicare.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-[#C41230] rounded-xl p-6 md:p-8 text-center mb-10">
                  <p className="text-white/80 text-sm mb-2">
                    Need help choosing the right plan?
                  </p>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-4">
                    Compare Medicare plans in your area
                  </h3>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="tel:8883358996"
                      className="inline-flex items-center gap-2 bg-white text-[#C41230] font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
                    >
                      Call Us Now
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      Get Started Online
                    </a>
                  </div>
                </div>
              </article>

              {/* Sidebar — Table of Contents */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-[160px]">
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 mb-5">
                    <h3 className="text-xs font-bold tracking-wider text-[#1B2A4A] uppercase mb-4">
                      Table of Contents
                    </h3>
                    <nav className="space-y-1">
                      {articleTableOfContents.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`block w-full text-left text-[13px] leading-snug py-1.5 px-3 rounded-md transition-all duration-150 ${
                            activeSection === section.id
                              ? "bg-[#EFF6FF] text-[#1B2A4A] font-semibold border-l-2 border-[#2563EB]"
                              : "text-[#6B7280] hover:text-[#1B2A4A] hover:bg-[#F5F7FA]"
                          }`}
                        >
                          {section.title}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Sidebar CTA */}
                  <div className="bg-[#1B2A4A] rounded-xl p-5 text-center">
                    <p className="text-white/70 text-xs mb-1">
                      Free, no-obligation help
                    </p>
                    <p className="text-white font-bold text-lg mb-3">
                      (888) 335-8996
                    </p>
                    <a
                      href="#"
                      className="block w-full bg-[#C41230] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#A30F28] transition-colors"
                    >
                      Compare Plans
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="bg-[#F5F7FA] py-10 md:py-14 border-t border-[#E5E7EB]">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-xs font-bold tracking-wider text-[#1B2A4A] uppercase mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex gap-4 bg-white border border-[#E5E7EB] rounded-xl p-4 hover:shadow-md hover:shadow-black/5 transition-all duration-200"
                >
                  <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded text-white mb-1.5"
                      style={{ backgroundColor: post.categoryColor }}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-semibold text-[#1B2A4A] text-[14px] leading-snug line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] mt-1">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
