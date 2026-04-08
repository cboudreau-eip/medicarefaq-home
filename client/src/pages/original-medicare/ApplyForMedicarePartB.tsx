/**
 * Apply for Medicare Part B — /original-medicare/medicare-parts/apply-for-medicare-part-b
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { FileText, ArrowRight, CheckCircle2, AlertTriangle, Clock, Phone, Monitor } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const applicationMethods = [
  {
    icon: Monitor,
    title: "Apply Online",
    desc: "The fastest way to apply for Medicare Part B is through the Social Security Administration's website at ssa.gov. The online application takes about 10–30 minutes.",
    steps: [
      "Go to ssa.gov/medicare",
      "Click 'Apply for Medicare Only'",
      "Create or log into your my Social Security account",
      "Complete the online application",
      "Submit and receive a confirmation number",
    ],
    note: "Available 24/7. Most convenient option for most applicants.",
  },
  {
    icon: Phone,
    title: "Apply by Phone",
    desc: "Call Social Security at 1-800-772-1213 (TTY: 1-800-325-0778) to apply over the phone. Representatives are available Monday through Friday, 8 AM to 7 PM.",
    steps: [
      "Call 1-800-772-1213",
      "Tell the representative you want to apply for Medicare Part B",
      "Have your Social Security number and other information ready",
      "Complete the application over the phone",
    ],
    note: "Best option if you prefer speaking with someone directly.",
  },
  {
    icon: FileText,
    title: "Apply In Person",
    desc: "Visit your local Social Security office to apply in person. You can find your nearest office at ssa.gov/locator.",
    steps: [
      "Find your local Social Security office at ssa.gov/locator",
      "Schedule an appointment (recommended) or walk in",
      "Bring required documents (see below)",
      "Complete Form CMS-40B with a representative",
    ],
    note: "Consider scheduling an appointment to reduce wait times.",
  },
];

const requiredDocuments = [
  "Social Security number",
  "Medicare card (if you already have Part A)",
  "Proof of U.S. citizenship or lawful alien status",
  "If applying due to loss of employer coverage: proof of employer coverage and the date it ended (Form CMS-L564 completed by your employer)",
  "If you have COBRA coverage: documentation showing when COBRA coverage will end",
];

const enrollmentPeriods = [
  {
    name: "Initial Enrollment Period (IEP)",
    when: "7-month window around your 65th birthday (3 months before, birthday month, 3 months after)",
    penalty: "No penalty if you enroll during IEP",
    action: "Enroll as soon as possible — ideally in the 3 months before your birthday month",
  },
  {
    name: "Special Enrollment Period (SEP)",
    when: "8 months after losing employer/union coverage",
    penalty: "No penalty if you had creditable employer coverage",
    action: "Apply within 8 months of losing employer coverage to avoid late penalties",
  },
  {
    name: "General Enrollment Period (GEP)",
    when: "January 1 – March 31 each year",
    penalty: "10% premium increase for each 12-month period you delayed without creditable coverage",
    action: "Coverage starts July 1. Use this only if you missed your IEP or SEP.",
  },
];

export default function ApplyForMedicarePartB() {
  useSEO({
    title: "How to Apply for Medicare Part B | Step-by-Step Guide",
    description: "A complete guide to applying for Medicare Part B. Learn when to apply, how to apply online or by phone, what documents you need, and how to avoid late enrollment penalties.",
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/apply-for-medicare-part-b",
    ogType: "article",
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
              <Link href="/original-medicare" className="hover:text-white">Original Medicare</Link>
              <span>/</span>
              <Link href="/original-medicare/medicare-parts/medicare-part-b" className="hover:text-white">Medicare Part B</Link>
              <span>/</span>
              <span className="text-white">How to Apply</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <FileText className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">How to Apply for Medicare Part B</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  Applying for Medicare Part B is a straightforward process, but timing matters. Enrolling at the right time helps you avoid late enrollment penalties that can permanently increase your premium.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Important Warning */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 mb-8 flex gap-3">
            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Timing Is Critical</h3>
              <p className="text-gray-700 text-sm">
                If you miss your Initial Enrollment Period and do not have qualifying employer coverage, you may face a permanent 10% premium penalty for each 12-month period you delayed. Do not wait to apply unless you have creditable employer coverage.
              </p>
            </div>
          </div>

          {/* Enrollment Periods */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">When to Apply for Part B</h2>
            <div className="space-y-4">
              {enrollmentPeriods.map((ep, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <Clock className="text-teal-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{ep.name}</h3>
                      <div className="text-sm text-gray-600 mb-1"><strong>When:</strong> {ep.when}</div>
                      <div className="text-sm text-gray-600 mb-1"><strong>Penalty:</strong> {ep.penalty}</div>
                      <div className="text-sm text-teal-700 font-medium"><strong>Action:</strong> {ep.action}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Application Methods */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">How to Apply for Medicare Part B</h2>
            <div className="space-y-6">
              {applicationMethods.map((method, i) => {
                const Icon = method.icon;
                return (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-5 py-3 flex items-center gap-3 border-b border-gray-200">
                      <div className="bg-teal-100 rounded-lg p-2">
                        <Icon className="text-teal-600" size={18} />
                      </div>
                      <h3 className="font-bold text-gray-800">Option {i + 1}: {method.title}</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-700 text-sm mb-3">{method.desc}</p>
                      <ol className="space-y-1.5 mb-3">
                        {method.steps.map((step, si) => (
                          <li key={si} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {si + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                      <div className="bg-blue-50 rounded-lg px-3 py-2 text-xs text-blue-700">
                        <strong>Note:</strong> {method.note}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Required Documents */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Documents You May Need</h2>
            <ul className="space-y-2">
              {requiredDocuments.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={16} />
                  <span className="text-sm">{doc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* After Applying */}
          <section className="mb-10 bg-green-50 border border-green-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">After You Apply</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              After applying, you will receive a Medicare card in the mail within 3–4 weeks. Your card will show your Medicare number and the effective dates for Part A and Part B coverage.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Once you have Part B, you may want to consider adding a Medicare Supplement (Medigap) plan to cover the 20% coinsurance and other cost-sharing that Part B does not cover. You have a 6-month Medigap Open Enrollment Period starting the month you are both 65+ and enrolled in Part B.
            </p>
          </section>

          {/* Related Links */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Related Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Medicare Part B Overview", href: "/original-medicare/medicare-parts/medicare-part-b" },
                { label: "Medicare Enrollment Periods", href: "/original-medicare/medicare-enrollment-periods" },
                { label: "Medicare Eligibility", href: "/original-medicare/medicare-eligibility" },
                { label: "Medigap Open Enrollment", href: "/medicare-supplements/medigap-eligibility" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors text-sm text-gray-700 hover:text-teal-700 font-medium"
                >
                  <ArrowRight className="text-teal-500 shrink-0" size={14} />
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Need Help with Medicare Enrollment?</h3>
            <p className="text-blue-200 mb-6">
              Our licensed Medicare specialists can guide you through the enrollment process and help you avoid costly mistakes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+18005551234"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone size={18} />
                Call a Specialist
              </a>
              <Link
                href="/compare-rates"
                className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Compare Plans <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
