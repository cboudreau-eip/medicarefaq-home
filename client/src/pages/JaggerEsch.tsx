/**
 * Jagger Esch Bio Page — /about-us/jagger-esch
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Award, Briefcase, BookOpen, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

export default function JaggerEsch() {
  useSEO({
    title: "Jagger Esch — Founder & President | MedicareFAQ",
    description: "Jagger Esch is the founder and president of MedicareFAQ.com. Learn about his background, credentials, and mission to make Medicare education accessible to all Americans.",
    canonical: "https://www.medicarefaq.com/about-us/jagger-esch",
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
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/about-us" className="hover:text-white">About Us</Link>
              <span>/</span>
              <span className="text-white">Jagger Esch</span>
            </nav>
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-white text-3xl font-bold">JE</span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-1">Jagger Esch</h1>
                <div className="text-teal-300 font-semibold text-lg mb-2">Founder &amp; President, MedicareFAQ</div>
                <div className="flex items-center gap-2 text-blue-200 text-sm">
                  <MapPin size={14} />
                  <span>Tampa, Florida</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Bio */}
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">About Jagger</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jagger Esch is the founder and president of MedicareFAQ.com, one of the leading Medicare education and insurance resources in the United States. He founded the company in 2013 with a simple but powerful mission: to make Medicare easy to understand for the millions of Americans who navigate the system each year.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With over a decade of experience in the Medicare insurance industry, Jagger has helped thousands of beneficiaries understand their coverage options and make informed decisions about their healthcare. He is a licensed insurance agent in multiple states and holds specialized expertise in Medicare Supplement, Medicare Advantage, and Medicare Part D plans.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Jagger is passionate about consumer education and transparency in the insurance industry. Under his leadership, MedicareFAQ has grown from a small informational website into a comprehensive resource that serves hundreds of thousands of Medicare beneficiaries annually.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">Mission &amp; Philosophy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jagger believes that every American deserves access to clear, unbiased Medicare information — not just those who can afford financial advisors or have family members in the insurance industry. This philosophy drives every decision at MedicareFAQ, from the content the editorial team creates to the way licensed specialists interact with clients.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  "Medicare is one of the most important financial decisions most Americans will ever make," Jagger has said. "Our job is to make sure people have the information they need to make the right choice for their situation — not the choice that's best for us."
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">Media &amp; Recognition</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jagger and MedicareFAQ have been featured in and cited by numerous major publications and media outlets as a trusted source of Medicare information. The site's content has been referenced by consumer advocacy organizations, financial planning resources, and healthcare publications.
                </p>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Credentials */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="text-teal-500" size={18} />
                  <h3 className="font-bold text-gray-800">Credentials</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Licensed Insurance Agent (Multiple States)",
                    "Medicare Supplement Specialist",
                    "Medicare Advantage Expert",
                    "Part D Drug Plan Specialist",
                  ].map((cred, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={14} />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas of Expertise */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="text-teal-500" size={18} />
                  <h3 className="font-bold text-gray-800">Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Medicare Supplement",
                    "Medicare Advantage",
                    "Part D",
                    "Medicare Enrollment",
                    "Senior Healthcare",
                    "Insurance Compliance",
                  ].map((tag, i) => (
                    <span key={i} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Articles */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="text-teal-500" size={18} />
                  <h3 className="font-bold text-gray-800">Related Reading</h3>
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about-us" className="text-teal-600 hover:underline text-sm flex items-center gap-1">
                      About MedicareFAQ <ArrowRight size={12} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/meet-the-editorial-team" className="text-teal-600 hover:underline text-sm flex items-center gap-1">
                      Full Editorial Team <ArrowRight size={12} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-teal-600 hover:underline text-sm flex items-center gap-1">
                      Contact Us <ArrowRight size={12} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Get Expert Medicare Guidance</h3>
            <p className="text-blue-200 mb-6">
              Connect with our licensed Medicare specialists to get personalized help with your coverage decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/compare-rates"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Compare Plans <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
