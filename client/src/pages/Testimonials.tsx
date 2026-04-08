/**
 * Testimonials Page — /testimonials
 */

import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Star, Quote, ArrowRight, Users, Shield, ThumbsUp } from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Margaret T.",
    location: "Florida",
    rating: 5,
    plan: "Medigap Plan G",
    text: "I was completely overwhelmed when I turned 65 and had to figure out Medicare. The team at MedicareFAQ walked me through every option and helped me find a Plan G that saved me over $800 a year compared to what I was originally quoted. I couldn't be happier with the service.",
  },
  {
    name: "Robert K.",
    location: "Texas",
    rating: 5,
    plan: "Medicare Advantage",
    text: "After my wife passed, I needed to get my own Medicare coverage for the first time. I was nervous about making the wrong choice. The specialist I spoke with was patient, knowledgeable, and never pushy. He explained all my options clearly and I ended up with a Medicare Advantage plan that includes dental — something I really needed.",
  },
  {
    name: "Dorothy M.",
    location: "Ohio",
    rating: 5,
    plan: "Medigap Plan N",
    text: "I've been a client for three years now and have referred several friends. Every year during open enrollment, they review my plan and make sure I'm still getting the best value. That kind of ongoing service is rare.",
  },
  {
    name: "James W.",
    location: "Arizona",
    rating: 5,
    plan: "Part D Drug Plan",
    text: "My prescription costs were getting out of hand. The MedicareFAQ team helped me find a Part D plan that covered all my medications at a much lower tier. I'm saving about $150 a month on drugs alone. I wish I had called them sooner.",
  },
  {
    name: "Patricia L.",
    location: "North Carolina",
    rating: 5,
    plan: "Medigap Plan G",
    text: "The website has so much helpful information — I spent hours reading the guides before calling. When I did call, the agent already seemed to know exactly what I needed. The process was smooth and I felt confident in my decision.",
  },
  {
    name: "Harold B.",
    location: "Pennsylvania",
    rating: 5,
    plan: "Medicare Advantage HMO",
    text: "I was skeptical about using an online resource for something as important as Medicare. But the information on MedicareFAQ is accurate and up to date — I checked it against Medicare.gov. The agent I worked with was licensed and professional. I'm very satisfied.",
  },
  {
    name: "Susan R.",
    location: "Georgia",
    rating: 5,
    plan: "Medigap Plan G",
    text: "My husband had a serious health event last year and we were so grateful we had Plan G. We didn't pay a single bill beyond the Part B deductible. MedicareFAQ helped us choose that plan two years ago and it was absolutely the right decision.",
  },
  {
    name: "William C.",
    location: "Michigan",
    rating: 5,
    plan: "Medigap Plan F (grandfathered)",
    text: "I've been on Medicare for 10 years. I recently used MedicareFAQ to review whether I should stay on Plan F or switch. They gave me an honest assessment — in my case, staying on Plan F made sense. I appreciated that they didn't try to sell me something I didn't need.",
  },
  {
    name: "Linda H.",
    location: "California",
    rating: 5,
    plan: "Medicare Advantage PPO",
    text: "Living in California, I have a lot of Medicare Advantage options. The comparison tools on MedicareFAQ helped me narrow down the choices and the specialist helped me understand the network differences. I ended up with a PPO that lets me keep my doctor.",
  },
];

const stats = [
  { value: "4.9/5", label: "Average Rating", icon: Star },
  { value: "50,000+", label: "Clients Helped", icon: Users },
  { value: "15+ Years", label: "Industry Experience", icon: Shield },
  { value: "98%", label: "Client Satisfaction", icon: ThumbsUp },
];

export default function Testimonials() {
  useSEO({
    title: "Client Testimonials | MedicareFAQ Reviews",
    description: "Read real reviews from MedicareFAQ clients. See how our licensed Medicare specialists have helped thousands of beneficiaries find the right Medicare coverage.",
    canonical: "https://www.medicarefaq.com/testimonials",
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
              <span className="text-white">Testimonials</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="bg-teal-500 rounded-xl p-3 shrink-0">
                <Star className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">What Our Clients Say</h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  We have helped thousands of Medicare beneficiaries find the right coverage. Here is what some of them have to say about working with MedicareFAQ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 border-b border-gray-200 py-8 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <Icon className="text-teal-500 mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-[#1B3A6B]">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Grid */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="text-amber-400 fill-amber-400" size={14} />
                  ))}
                </div>
                <Quote className="text-teal-200 mb-2" size={24} />
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-gray-100 pt-3">
                  <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.location}</div>
                  <div className="mt-1">
                    <span className="bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      {t.plan}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Find Your Perfect Medicare Plan?</h3>
            <p className="text-blue-200 mb-6 max-w-xl mx-auto">
              Join thousands of satisfied clients who found the right Medicare coverage with help from our licensed specialists.
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
