/**
 * About Us Page
 * Design: Clean, professional layout following the Clarity System design language
 * Content sourced from medicarefaq.com/about-us/
 */

import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Heart,
  Target,
  Award,
  Users,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronRight,
  Building2,
  Trophy,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const coreValues = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We foster an environment where information flows freely and everyone has access to the knowledge necessary to be successful.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Shield,
    title: "Reliability",
    description:
      "We take delivering our promise of finding the best health insurance plans for our clients seriously.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We operate ethically, following both legal standards and moral principles. We do the right thing, even when no one is watching.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Target,
    title: "Commitment",
    description:
      "We are committed to excellence, striving for continuous improvement and delivering the best results possible.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const awards = [
  { title: "Inc. 5000", subtitle: "Annual List" },
  { title: "Entrepreneur 360", subtitle: "Top Companies" },
  { title: "Best in Small Business", subtitle: "Awards" },
  { title: "Tampa Bay Fast 50", subtitle: "Business Journal" },
];

const workplaceAwards = [
  "Tampa Bay Business Journal's Best Places to Work",
  "Inc. Magazine's Best Places to Work",
  "Tampa Bay Business Journal's Coolest Office Spaces",
  "Tampa Bay Times Top Places to Work",
];

const testimonials = [
  {
    quote:
      "MedicareFAQ proved very helpful in setting me up with the best choice and subsequent low premium for my secondary Medicare coverage.",
    author: "Ray C.",
  },
  {
    quote:
      "My agent was outstanding. He went the extra mile. Going forward, I am happy to know he will be my contact person. Thanks EIP!",
    author: "Jeff R.",
  },
  {
    quote:
      "Of all the agents I spoke with, yours helped more with information, advice and help. It is the single reason I elected to go with Elite.",
    author: "Dwight D.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
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
        {/* Hero Section */}
        <section className="bg-[#0B1F3F] text-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm text-slate-400 mb-8"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">About Us</span>
            </motion.nav>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            >
              About MedicareFAQ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed"
            >
              One of the leading Medicare insurtech brokerages in the country,
              specializing in exceptional Medicare coverage through education and
              compassionate agent connections.
            </motion.p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={0}
              >
                <span className="inline-block text-xs font-semibold tracking-widest text-teal-600 uppercase mb-4">
                  Who We Are
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                  Elite Insurance Partners & MedicareFAQ.com
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Elite Insurance Partners & MedicareFAQ.com is one of the
                    leading Medicare insurtech brokerages in the country. We
                    specialize in providing exceptional Medicare coverage to
                    consumers through education and by connecting them with
                    experienced and compassionate agents.
                  </p>
                  <p>
                    Elite Insurance Partners offers a broad range of insurance
                    policies, including Medicare Supplement, Medicare Advantage,
                    dental, vision, hearing, cancer, heart attack, stroke, and
                    life insurance. Headquartered in Tampa, Florida, our agents
                    are licensed to offer insurance services in 48 states,
                    serving a diverse clientele nationwide.
                  </p>
                  <p>
                    As the Medicare learning resource center for Elite Insurance
                    Partners, at MedicareFAQ, we pride ourselves on upholding our
                    core values of treating our clients with the utmost care,
                    fostering a positive workplace culture, and positively
                    impacting our clients.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={1}
                className="bg-slate-50 rounded-2xl p-8 lg:p-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Company Snapshot
                  </h3>
                </div>
                <dl className="space-y-4">
                  {[
                    ["Founded", "2014"],
                    ["Headquarters", "Tampa, Florida"],
                    ["Licensed In", "48 States"],
                    ["Satisfaction Rating", "5.0 / 5.0"],
                    ["Client Reviews", "2,500+"],
                    ["BBB Rating", "A+"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center border-b border-slate-200 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-slate-500">{label}</dt>
                      <dd className="text-sm font-semibold text-slate-900">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Medicare Educator */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-3xl"
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-teal-600 uppercase mb-4">
                Our Medicare Educator
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Jagger Esch
              </h2>
              <p className="text-lg text-slate-500 mb-6">
                President & CEO of MedicareFAQ
              </p>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Jagger Esch is a Medicare educator with over a decade of
                  experience in the Medicare insurance industry. From starting his
                  first company at age 24 to becoming one of the most well-known
                  names in the industry, Jagger is nothing short of a visionary in
                  the Medicare insurance space.
                </p>
                <p>
                  Jagger's unique perspective on how to best serve the client
                  while leading a successful team allows him to stand out from his
                  colleagues in the industry. His personal philosophy of always
                  putting the client first has allowed him to propel the company
                  forward and grow at unprecedented rates.
                </p>
                <p>
                  Backed by his leadership, MedicareFAQ agents can offer clients
                  the best policies for their needs without unnecessarily
                  upselling or steering clients towards unsuitable products.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-14"
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-teal-600 uppercase mb-4">
                What Guides Us
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Our Core Values
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 ${value.bg} rounded-xl flex items-center justify-center mb-5`}
                  >
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Growth & Awards */}
        <section className="py-16 lg:py-24 bg-[#0B1F3F] text-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-14"
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-teal-400 uppercase mb-4">
                Recognition
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                Growth & Awards
              </h2>
              <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                Nationally recognized as an industry leader and top workplace
                since 2014.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
              {awards.map((award, i) => (
                <motion.div
                  key={award.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
                >
                  <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold">{award.title}</h3>
                  <p className="text-sm text-slate-400">{award.subtitle}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
            >
              <h3 className="text-xl font-bold mb-6 text-center">
                Workplace Recognitions
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {workplaceAwards.map((award, i) => (
                  <motion.div
                    key={award}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-5 py-3"
                  >
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-sm text-slate-300">{award}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Teams */}
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={0}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Editorial Team
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Our Editorial team is composed of Medicare experts, industry
                  leaders, compliance specialists, and licensed Medicare agents
                  who utilize their diverse backgrounds to bring a wealth of
                  knowledge and expertise to our content. The editorial team's
                  mission is to provide accurate and comprehensive information to
                  our readers, empowering them to make informed decisions about
                  their healthcare.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={1}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Client Care Team
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Once you become our client, we offer personalized assistance
                  and expert guidance regarding your policies. Our dedicated
                  Client Care team is available to answer any questions you may
                  have and help you through every step of the enrollment process
                  and beyond. We're committed to ensuring you have the support
                  and information needed for a successful future with your
                  Medicare coverage.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-14"
            >
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                5.0 Satisfaction Rating
              </h2>
              <p className="text-slate-500 mt-2">
                Based on 2,500+ verified client reviews
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={t.author}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white border border-slate-200 rounded-xl p-6"
                >
                  <p className="text-slate-600 leading-relaxed mb-4 italic">
                    "{t.quote}"
                  </p>
                  <footer className="text-sm font-semibold text-slate-900">
                    {t.author}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-14"
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-teal-600 uppercase mb-4">
                Get In Touch
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Contact Us
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  8745 Henderson Rd, STE 220
                  <br />
                  Tampa, FL 33634
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                <p className="text-sm text-slate-500">
                  <a
                    href="tel:8889068097"
                    className="hover:text-teal-600 transition-colors"
                  >
                    (888) 906-8097
                  </a>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Fax: (727) 230-8362
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                <p className="text-sm text-slate-500">
                  <a
                    href="mailto:info@medicarefaq.com"
                    className="hover:text-teal-600 transition-colors"
                  >
                    info@medicarefaq.com
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#C41230] py-14">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Find the Right Medicare Plan?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Our licensed agents are ready to help you compare plans and find
              the best coverage for your needs — at no cost to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:8883358996"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#C41230] font-semibold px-8 py-3.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call (888) 335-8996
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
