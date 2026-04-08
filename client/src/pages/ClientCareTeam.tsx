/**
 * Client Care Team Page — /client-care-team
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Phone, Mail, Clock, Users, Shield, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Phone,
    title: "Phone Consultations",
    desc: "Speak directly with a licensed Medicare specialist who can answer your questions and help you compare plans.",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Send us your Medicare questions and receive a detailed, personalized response from a licensed professional.",
  },
  {
    icon: Shield,
    title: "Plan Enrollment Assistance",
    desc: "Our team can walk you through the enrollment process step by step, ensuring you don't miss any deadlines.",
  },
  {
    icon: Star,
    title: "Annual Plan Reviews",
    desc: "We proactively review your coverage each year during open enrollment to make sure you're still in the best plan.",
  },
];

const faqs = [
  {
    q: "Is there a cost for your services?",
    a: "No. Our services are completely free to you. We are compensated by insurance carriers when you enroll in a plan through us, but this never affects our recommendations. We always recommend the plan that is best for your situation.",
  },
  {
    q: "Are your agents licensed?",
    a: "Yes. All of our Medicare specialists are licensed insurance agents in the states where they operate. They are trained specifically in Medicare Supplement, Medicare Advantage, and Part D plans.",
  },
  {
    q: "What states do you serve?",
    a: "We serve clients in all 50 states. Our team includes specialists licensed in multiple states who can help you regardless of where you live.",
  },
  {
    q: "How quickly can I speak with someone?",
    a: "Our team is available Monday through Friday, 8 AM to 8 PM Eastern. Most callers are connected with a specialist within a few minutes. You can also schedule a callback at a time that is convenient for you.",
  },
  {
    q: "Will I be pressured to buy a plan?",
    a: "Absolutely not. Our specialists are educators first. We provide information and recommendations, but the decision is always yours. Many clients call us multiple times before enrolling, and we welcome that.",
  },
];

export default function ClientCareTeam() {
  useSEO({
    title: "Client Care Team | MedicareFAQ Licensed Medicare Specialists",
    description: "Meet the MedicareFAQ client care team. Our licensed Medicare specialists provide free, unbiased guidance to help you find the right Medicare coverage. Available by phone and email.",
    canonical: "https://www.medicarefaq.com/client-care-team",
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
              <span className="text-white">Client Care Team</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <Users className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">Our Client Care Team</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  Our team of licensed Medicare specialists is dedicated to helping you navigate Medicare with confidence. We provide free, unbiased guidance — no pressure, no sales tactics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Bar */}
        <section className="bg-teal-600 text-white py-4 px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span className="font-semibold">Call Us: 1-800-555-1234</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Mon–Fri, 8 AM–8 PM ET</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>help@medicarefaq.com</span>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Services */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-6">How We Help You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="bg-teal-100 rounded-lg p-2.5 shrink-0 h-fit">
                      <Icon className="text-teal-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Why Free */}
          <section className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">Why Our Services Are Free</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may wonder how we can provide expert Medicare guidance at no cost to you. The answer is straightforward: insurance carriers pay us a commission when you enroll in a plan through our agency. This is the same commission you would pay if you enrolled directly with the carrier — it does not cost you anything extra.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Importantly, our compensation does not influence our recommendations. We are contractually obligated to recommend the plan that is best for you, and our reputation depends on it. We only succeed when our clients are genuinely satisfied with their coverage.
            </p>
          </section>

          {/* What to Expect */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">What to Expect When You Call</h2>
            <div className="space-y-3">
              {[
                "A brief conversation about your current coverage situation and healthcare needs",
                "A clear explanation of your Medicare options — Original Medicare, Medigap, Medicare Advantage, and Part D",
                "A personalized recommendation based on your health, budget, and preferences",
                "Help comparing specific plans available in your area",
                "Assistance with the enrollment process if you decide to move forward",
                "No pressure — you can end the call at any time and call back when you're ready",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={16} />
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Talk to a Specialist?</h3>
            <p className="text-blue-200 mb-6">
              Our licensed Medicare specialists are available Monday through Friday, 8 AM to 8 PM Eastern. Call us or use our online comparison tool to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+18005551234"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone size={18} />
                Call 1-800-555-1234
              </a>
              <Link
                href="/compare-rates"
                className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Compare Plans Online <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
