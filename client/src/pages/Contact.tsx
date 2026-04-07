/**
 * Contact Page — /contact
 * Design: Teal accent (#0D9488) matching the MedicareFAQ brand.
 * Features: Contact form, phone/email/address info, hours of operation, map placeholder.
 */

import { useEffect, useState } from "react";
import { useCMSSEO } from "@/hooks/useCMSSEO";
import { Link } from "wouter";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  CheckCircle2,
  MessageSquare,
  Building2,
  Headphones,
  Shield,
  Star,
  ArrowRight,
  Users,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const reasons = [
  "I am shopping for rates",
  "I need sales support",
  "I need customer support",
  "I would like to change my address",
  "I want to cancel my policy",
  "Other",
];

const hours = [
  { day: "Monday", time: "9:00 AM – 6:00 PM" },
  { day: "Tuesday", time: "9:00 AM – 6:00 PM" },
  { day: "Wednesday", time: "9:00 AM – 6:00 PM" },
  { day: "Thursday", time: "9:00 AM – 6:00 PM" },
  { day: "Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const quickLinks = [
  { label: "Medicare 101 Guide", href: "/medicare-101", icon: "📘" },
  { label: "Am I Eligible?", href: "/new-to-medicare/eligibility", icon: "✅" },
  { label: "Compare Plans", href: "/compare-rates", icon: "📊" },
  { label: "Coverage FAQs", href: "/faqs", icon: "❓" },
];

export default function Contact() {
  useCMSSEO({
    contentType: "page",
    slug: "contact",
    title: "Contact MedicareFAQ | Speak With a Licensed Medicare Agent",
    description: "Have questions about Medicare? Contact MedicareFAQ to speak with a licensed Medicare agent. We're here to help you understand your options at no cost.",
    canonical: "https://www.medicarefaq.com/contact/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    ogType: "website",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    zipcode: "",
    message: "",
    isCustomer: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Contact Us</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-teal-400" />
            </div>
            <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            We'd Love to Hear From You
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Have questions about Medicare? Our licensed agents are here to help — at no cost to you. Call us, email us, or fill out the form below.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-teal-400" /> Licensed in All 50 States</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-teal-400" /> BBB A+ Rated</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-teal-400" /> 60,000+ Clients Helped</span>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="relative -mt-8 z-10 mb-12">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="tel:8883358996"
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all group"
            >
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                <Phone className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Call Us</div>
                <div className="text-lg font-bold text-slate-900">(888) 335-8996</div>
              </div>
            </a>
            <a
              href="mailto:info@medicarefaq.com"
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Email Us</div>
                <div className="text-lg font-bold text-slate-900">info@medicarefaq.com</div>
              </div>
            </a>
            <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Visit Us</div>
                <div className="text-sm font-semibold text-slate-900">8745 Henderson Rd, STE 220</div>
                <div className="text-xs text-slate-500">Tampa, FL 33634</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Sidebar */}
      <section className="pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
                      Send Us a Message
                    </h2>
                    <p className="text-sm text-slate-500">Fill out the form below and a licensed agent will get back to you.</p>
                  </div>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
                      Thank You!
                    </h3>
                    <p className="text-slate-500 mb-6 max-w-md mx-auto">
                      Your message has been received. A licensed Medicare agent will contact you within one business day.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ firstName: "", lastName: "", email: "", phone: "", reason: "", zipcode: "", message: "", isCustomer: "" });
                      }}
                      className="text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Customer Status */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Are you a current customer?</label>
                      <div className="flex gap-3">
                        {["Yes", "No"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleChange("isCustomer", opt)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-all ${
                              formData.isCustomer === opt
                                ? "bg-teal-600 text-white border-teal-600"
                                : "bg-white text-slate-600 border-slate-200 hover:border-teal-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          First Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Last Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Reason & Zipcode */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Reason for Inquiry <span className="text-red-400">*</span>
                        </label>
                        <select
                          required
                          value={formData.reason}
                          onChange={(e) => handleChange("reason", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all bg-white"
                        >
                          <option value="">Select a reason...</option>
                          {reasons.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          ZIP Code <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.zipcode}
                          onChange={(e) => handleChange("zipcode", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                          placeholder="33634"
                          maxLength={5}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      By clicking "Send Message" you consent to receive emails, text messages, and/or phone calls from representatives or licensed insurance agents of Elite Insurance Partners LLC regarding Medicare Supplement Insurance, Medicare Advantage, Medicare Part D, and/or other insurance plans. Your consent is not a condition of purchase. This is a solicitation for insurance.{" "}
                      <Link href="/privacy-policy" className="text-teal-600 hover:underline">Privacy Policy</Link>
                    </p>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Hours */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Hours of Operation</h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">All times Eastern (EST)</p>
                <div className="space-y-2">
                  {hours.map((h) => {
                    const isToday = new Date().toLocaleDateString("en-US", { weekday: "long" }) === h.day;
                    return (
                      <div
                        key={h.day}
                        className={`flex items-center justify-between text-sm py-1.5 px-2 rounded-md ${
                          isToday ? "bg-teal-50 font-semibold" : ""
                        }`}
                      >
                        <span className={isToday ? "text-teal-700" : "text-slate-600"}>{h.day}</span>
                        <span className={h.time === "Closed" ? "text-red-400 font-medium" : isToday ? "text-teal-700" : "text-slate-900 font-medium"}>
                          {h.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    If after normal business hours, please leave a voicemail or fill out the form and a licensed agent will contact you the next business day.
                  </p>
                </div>
              </div>

              {/* Call CTA */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Headphones className="w-5 h-5 text-teal-200" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-teal-100">Prefer to Talk?</h3>
                </div>
                <p className="text-sm text-teal-100 mb-4">
                  Speak directly with a licensed Medicare agent. No obligation, no pressure — just honest answers.
                </p>
                <a
                  href="tel:8883358996"
                  className="flex items-center justify-center gap-2 bg-white text-teal-700 font-bold px-5 py-3 rounded-lg hover:bg-teal-50 transition-colors w-full"
                >
                  <Phone className="w-4 h-4" /> (888) 335-8996
                </a>
              </div>

              {/* Office Info */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-slate-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Our Office</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900">8745 Henderson Rd, STE 220</div>
                      <div className="text-slate-500">Tampa, FL 33634</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-slate-500 text-xs">General: </span>
                      <span className="font-medium text-slate-900">(800) 845-2484</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href="mailto:info@medicarefaq.com" className="font-medium text-teal-600 hover:text-teal-700 transition-colors">
                      info@medicarefaq.com
                    </a>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-1 font-semibold">Powered by</p>
                  <p className="text-sm font-bold text-slate-900">Elite Insurance Partners</p>
                  <p className="text-xs text-slate-400">Est. 2014 · BBB A+ Rated</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Helpful Resources</h3>
                <div className="space-y-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 text-sm text-slate-700 hover:text-teal-600 transition-colors py-1.5 group"
                    >
                      <span className="text-base">{link.icon}</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                      <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-teal-500" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">Common Questions</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2" style={{ fontFamily: "'Merriweather', serif" }}>
              Before You Reach Out
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                q: "Is there a cost for your services?",
                a: "No. Our licensed Medicare agents provide free, unbiased guidance. We are compensated by insurance carriers, not by you. There is never a fee for our help.",
              },
              {
                q: "How quickly will I hear back?",
                a: "If you call during business hours, you'll speak with a licensed agent immediately. For form submissions and emails, we respond within one business day.",
              },
              {
                q: "Can you help me compare plans in my area?",
                a: "Absolutely. Our agents are licensed in all 50 states and can compare Medicare Supplement, Medicare Advantage, and Part D plans available in your ZIP code.",
              },
              {
                q: "What information should I have ready?",
                a: "It helps to have your Medicare card (or Medicare number), current medications list, preferred doctors, and ZIP code. But don't worry — our agents can guide you through the process.",
              },
              {
                q: "Are you affiliated with the government?",
                a: "No. MedicareFAQ.com is operated by Elite Insurance Partners, a private insurance agency. We are not affiliated with or endorsed by the U.S. government or the federal Medicare program.",
              },
              {
                q: "Can I call on weekends?",
                a: "Yes. We're available Saturday from 10:00 AM to 2:00 PM Eastern. If you call outside business hours, leave a voicemail and we'll return your call the next business day.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Still Have Questions?
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Our licensed Medicare agents are standing by to help you understand your options. Call now for a free, no-obligation consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:8883358996"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link
                href="/medicare-101"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
              >
                Explore Medicare 101 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
