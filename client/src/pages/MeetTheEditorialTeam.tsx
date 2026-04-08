/**
 * Meet the Editorial Team Page — /meet-the-editorial-team
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Users, Award, Shield, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const teamMembers = [
  {
    name: "Jagger Esch",
    title: "Founder & President",
    credentials: "Medicare Insurance Specialist",
    bio: "Jagger Esch founded MedicareFAQ in 2013 with a mission to make Medicare education accessible to everyone. With over a decade of experience in Medicare insurance, Jagger has helped thousands of beneficiaries navigate their coverage options. He holds multiple state insurance licenses and is a recognized expert in Medicare Supplement and Medicare Advantage plans.",
    expertise: ["Medicare Supplement Plans", "Medicare Advantage", "Medicare Enrollment", "Insurance Licensing"],
    href: "/about-us/jagger-esch",
  },
  {
    name: "Lindsay Engle",
    title: "Medicare Expert & Content Director",
    credentials: "Licensed Insurance Agent",
    bio: "Lindsay Engle oversees the editorial direction of MedicareFAQ, ensuring all content is accurate, up-to-date, and genuinely helpful to beneficiaries. She has extensive experience in Medicare insurance and has been quoted in major publications including U.S. News & World Report and Forbes.",
    expertise: ["Medicare Content Strategy", "Insurance Compliance", "Consumer Education", "Policy Analysis"],
    href: "/about-us",
  },
  {
    name: "Christian Worstell",
    title: "Senior Health Insurance Writer",
    credentials: "Health Insurance Specialist",
    bio: "Christian Worstell is a senior writer and health insurance specialist at MedicareFAQ. He has written extensively about Medicare, Medicaid, and the Affordable Care Act. His work is focused on translating complex insurance concepts into plain language that beneficiaries can understand and act on.",
    expertise: ["Medicare Writing", "Health Policy", "Consumer Advocacy", "Plain Language Communication"],
    href: "/about-us",
  },
  {
    name: "Ashlee Zareczny",
    title: "Compliance & Editorial Manager",
    credentials: "Licensed Insurance Professional",
    bio: "Ashlee Zareczny manages editorial compliance at MedicareFAQ, ensuring all published content meets regulatory standards and accurately reflects current Medicare rules. She works closely with licensed agents and CMS guidelines to maintain the highest standards of accuracy.",
    expertise: ["Regulatory Compliance", "Medicare Regulations", "Editorial Standards", "Content Accuracy"],
    href: "/about-us",
  },
];

const editorialStandards = [
  "All Medicare content is reviewed by licensed insurance professionals before publication",
  "We cite official sources including CMS, Medicare.gov, and SSA.gov",
  "Content is updated annually to reflect current premiums, deductibles, and policy changes",
  "We follow CMS marketing guidelines for Medicare insurance content",
  "Our writers and editors hold active state insurance licenses",
  "We do not accept payment to feature specific insurance companies in editorial content",
];

export default function MeetTheEditorialTeam() {
  useSEO({
    title: "Meet the Editorial Team | MedicareFAQ",
    description: "Meet the licensed Medicare specialists and healthcare writers behind MedicareFAQ. Our editorial team ensures all Medicare content is accurate, current, and genuinely helpful.",
    canonical: "https://www.medicarefaq.com/meet-the-editorial-team",
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
              <span className="text-white">Editorial Team</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <Users className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">Meet the Editorial Team</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  MedicareFAQ's content is created and reviewed by licensed Medicare insurance professionals and experienced health insurance writers. Our team is committed to providing accurate, unbiased Medicare education.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Team Members */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 bg-[#1B3A6B] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                  <div className="text-teal-600 font-medium text-sm mb-1">{member.title}</div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <Award size={12} />
                    {member.credentials}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Areas of Expertise</div>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((exp, ei) => (
                        <span key={ei} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={member.href}
                    className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-semibold"
                  >
                    View Profile <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Editorial Standards */}
          <section className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-[#1B3A6B]">Our Editorial Standards</h2>
            </div>
            <p className="text-gray-700 mb-4">
              MedicareFAQ is committed to providing accurate, unbiased Medicare information. Our editorial process follows strict standards to ensure every piece of content is trustworthy and useful.
            </p>
            <ul className="space-y-2">
              {editorialStandards.map((standard, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                  <CheckCircle2 className="text-blue-500 mt-0.5 shrink-0" size={15} />
                  <span>{standard}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Content Process */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-teal-500" size={24} />
              <h2 className="text-xl font-bold text-[#1B3A6B]">How We Create Content</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "Research", desc: "We research Medicare rules, CMS announcements, and policy changes from official government sources." },
                { step: "Write & Review", desc: "Licensed insurance professionals write and review all content for accuracy and compliance with CMS guidelines." },
                { step: "Update Regularly", desc: "We update all Medicare content annually (and more frequently when major policy changes occur) to keep information current." },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-teal-600 font-bold text-sm mb-2">Step {i + 1}: {s.step}</div>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Work With Our Team</h3>
            <p className="text-blue-200 mb-6">
              Our licensed specialists are available to answer your Medicare questions and help you find the right coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                About MedicareFAQ
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
