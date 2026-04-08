/**
 * Scholarship Opportunities Page — /scholarship-opportunities
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { GraduationCap, ArrowRight, Calendar, DollarSign, FileText, CheckCircle2 } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

export default function ScholarshipOpportunities() {
  useSEO({
    title: "Medicare Scholarship Opportunities | MedicareFAQ",
    description: "MedicareFAQ offers scholarship opportunities for students pursuing careers in healthcare, insurance, and senior services. Learn about eligibility, award amounts, and how to apply.",
    canonical: "https://www.medicarefaq.com/scholarship-opportunities",
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
              <span className="text-white">Scholarship Opportunities</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <GraduationCap className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">MedicareFAQ Scholarship Program</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  We believe in supporting the next generation of healthcare professionals. Our scholarship program awards students who are passionate about improving healthcare access and literacy for seniors.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Scholarship Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 text-center">
              <DollarSign className="text-teal-600 mx-auto mb-2" size={28} />
              <div className="text-2xl font-bold text-teal-700 mb-1">$1,000</div>
              <div className="text-gray-600 text-sm">Award Amount</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
              <Calendar className="text-blue-600 mx-auto mb-2" size={28} />
              <div className="text-2xl font-bold text-blue-700 mb-1">Annual</div>
              <div className="text-gray-600 text-sm">Award Frequency</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
              <GraduationCap className="text-purple-600 mx-auto mb-2" size={28} />
              <div className="text-2xl font-bold text-purple-700 mb-1">Open</div>
              <div className="text-gray-600 text-sm">To All Majors</div>
            </div>
          </div>

          {/* About the Scholarship */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">About the MedicareFAQ Scholarship</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MedicareFAQ.com is committed to making Medicare education accessible to everyone. As part of that mission, we offer an annual scholarship to college students who demonstrate a commitment to improving healthcare literacy, particularly for older Americans navigating the Medicare system.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The scholarship is open to undergraduate and graduate students at accredited U.S. colleges and universities. We welcome applicants from all fields of study — from healthcare and social work to communications and public policy — who can demonstrate how their work will improve healthcare access or literacy for seniors.
            </p>
          </section>

          {/* Eligibility */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Eligibility Requirements</h2>
            <ul className="space-y-3">
              {[
                "Currently enrolled as a full-time or part-time student at an accredited U.S. college or university",
                "Minimum 3.0 GPA (on a 4.0 scale)",
                "U.S. citizen or permanent resident",
                "Pursuing a degree in healthcare, nursing, social work, public health, communications, or a related field",
                "Demonstrated interest in senior healthcare, Medicare, or healthcare literacy",
              ].map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={16} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How to Apply */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">How to Apply</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Prepare Your Essay", desc: "Write a 500–800 word essay on the topic: \"How can technology or digital resources improve Medicare literacy and healthcare access for seniors?\"" },
                { step: "2", title: "Gather Required Documents", desc: "Collect your current transcript (unofficial accepted), proof of enrollment, and a brief personal statement (200 words max) about your career goals." },
                { step: "3", title: "Submit Your Application", desc: "Email your complete application package to scholarship@medicarefaq.com with the subject line \"MedicareFAQ Scholarship Application — [Your Name].\"" },
                { step: "4", title: "Await Notification", desc: "Applications are reviewed by our editorial team. The winner will be notified by email and announced on our website." },
              ].map((s, i) => (
                <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="bg-[#1B3A6B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{s.title}</h3>
                    <p className="text-gray-600 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Deadline & Contact */}
          <section className="mb-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Calendar className="text-amber-600 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Application Deadline</h3>
                <p className="text-gray-700 text-sm">
                  Applications for the current cycle are accepted through <strong>December 31</strong> of each year. The award is announced in January.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Questions?</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about the scholarship program, please contact us at{" "}
              <a href="mailto:scholarship@medicarefaq.com" className="text-teal-600 hover:underline">
                scholarship@medicarefaq.com
              </a>
              . We do our best to respond within 3–5 business days.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#1B3A6B] hover:bg-[#152e56] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              <FileText size={16} />
              Contact Us
            </Link>
          </section>

          {/* Related */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Learn More About MedicareFAQ</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/about-us" className="inline-flex items-center gap-1 text-teal-600 hover:underline text-sm font-medium">
                About Us <ArrowRight size={14} />
              </Link>
              <Link href="/meet-the-editorial-team" className="inline-flex items-center gap-1 text-teal-600 hover:underline text-sm font-medium">
                Editorial Team <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1 text-teal-600 hover:underline text-sm font-medium">
                Contact <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
