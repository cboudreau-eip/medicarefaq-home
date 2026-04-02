/**
 * About Our Team Page — /library/about
 * Design: Indigo accent (#4F46E5) matching Medicare Library section identity.
 * Dedicated team page showcasing the MedicareFAQ licensed Medicare experts.
 */

import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import {
  UserCheck,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  Shield,
  Award,
  Star,
  CheckCircle2,
  Building2,
  MapPin,
  Heart,
  Users,
  Trophy,
  Briefcase,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const leadership = [
  {
    name: "David Haass",
    role: "Co-Founder & CTO",
    bio: "David Haass is the Chief Technology Officer and Co-Founder of Elite Insurance Partners and MedicareFAQ.com. He is a member and regular contributor to Forbes Finance Council, bringing deep expertise in Medicare technology and education.",
    credentials: ["Forbes Finance Council Member", "Co-Founder, Elite Insurance Partners", "Medicare Technology Expert"],
  },
  {
    name: "Ashlee Zareczny",
    role: "Director of Operations",
    bio: "Ashlee Zareczny is the Director of Operations for MedicareFAQ. As a licensed Medicare agent in all 50 states, she is dedicated to educating those eligible for Medicare and ensuring every client receives personalized, expert guidance.",
    credentials: ["Licensed in All 50 States", "Director of Operations", "Medicare Education Specialist"],
  },
  {
    name: "Lindsay Engle",
    role: "Licensed Medicare Agent",
    bio: "Lindsay Engle is a licensed Medicare agent dedicated to helping beneficiaries navigate their coverage options. With years of experience in the Medicare space, she provides clear, unbiased guidance to clients nationwide.",
    credentials: ["Licensed Medicare Agent", "Client Advocate", "Coverage Specialist"],
  },
];

const values = [
  {
    icon: Shield,
    title: "Unbiased Guidance",
    description: "We represent multiple carriers to ensure you get the best plan for your needs, not just the plan that pays us the most.",
  },
  {
    icon: Award,
    title: "BBB A+ Rated",
    description: "Our commitment to ethical practices and client satisfaction has earned us an A+ rating from the Better Business Bureau.",
  },
  {
    icon: Heart,
    title: "Client-First Approach",
    description: "Every recommendation starts with understanding your unique health needs, budget, and preferences.",
  },
  {
    icon: Trophy,
    title: "2,500+ 5-Star Reviews",
    description: "Our clients consistently rate us 5 stars for our knowledge, patience, and dedication to finding the right coverage.",
  },
];

const stats = [
  { value: "2,500+", label: "5-Star Reviews" },
  { value: "50", label: "States Licensed" },
  { value: "A+", label: "BBB Rating" },
  { value: "10+", label: "Years Experience" },
];

export default function AboutTeam() {
  useSEO({
    title: "About Us | MedicareFAQ",
    description: "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free.",
    canonical: "https://www.medicarefaq.com/about-us/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/xxbdybfbexe.jpg",
    ogType: "website",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <HeaderBar />
      <MegaMenu />
      <MobileNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-indigo-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-indigo-200/70">Medicare Library</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-indigo-100">About Our Team</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-200" />
            </div>
            <span className="text-sm font-semibold text-indigo-200 uppercase tracking-wider">Our Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Meet Our Licensed Medicare Experts
          </h1>
          <p className="text-lg text-indigo-100/90 max-w-2xl mb-8">
            At MedicareFAQ, our mission is simple: make sure each individual we help is educated on all their Medicare options so they can make an informed decision.
          </p>
          <div className="flex items-center gap-6 text-sm text-indigo-200/80">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Licensed in All 50 States</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> BBB A+ Rated</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> 2,500+ 5-Star Reviews</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-indigo-700 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Our Mission</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Making Medicare Simple
            </h2>
            <p className="text-slate-600 leading-relaxed">
              MedicareFAQ.com is powered by Elite Insurance Partners, a leading Medicare agency dedicated to helping beneficiaries navigate the complexities of Medicare. Our online resource center provides unbiased information regarding your Medicare coverage choices, and our licensed agents are available to provide personalized guidance at no cost to you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{val.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Leadership</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Our Leadership Team
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Meet the people behind MedicareFAQ who are dedicated to making Medicare education accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {leadership.map((person, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl font-bold text-indigo-700">
                    {person.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{person.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{person.role}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{person.bio}</p>
                <div className="space-y-1.5">
                  {person.credentials.map((cred, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Powered By */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50 border border-slate-200 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Powered By</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                  Elite Insurance Partners
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  MedicareFAQ.com is powered by Elite Insurance Partners, a nationally recognized Medicare agency. We represent dozens of top-rated insurance carriers and are licensed in all 50 states, ensuring you have access to the best plans available in your area.
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Tampa, FL</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> Est. 2014</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" /> BBB A+ Rated</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Phone className="w-4 h-4" /> (888) 335-8996
                </a>
                <a href="mailto:info@medicarefaq.com" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors border border-indigo-200">
                  <Mail className="w-4 h-4" /> info@medicarefaq.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Ready to Get Expert Medicare Help?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Our licensed agents are standing by to answer your questions and help you find the right Medicare plan — at no cost to you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
              <Link href="/about" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
