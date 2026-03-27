import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/hero-bg-JCwzhz6vF5hshLidyrZztx.webp";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/95 via-[#1B2A4A]/80 to-[#1B2A4A]/40" />
      </div>

      <div className="container relative z-10 py-16 md:py-24 lg:py-28">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              Trusted by 60,000+ clients nationwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.15] mb-5"
          >
            Understanding Medicare
            <br />
            <span className="text-[#F5F7FA]/90">doesn't have to be confusing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
          >
            Whether you're approaching 65, still working, or already enrolled —
            we'll help you understand your options with clear, unbiased guidance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row flex-wrap gap-3"
          >
            <a
              href="/start-here"
              className="group inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-150 shadow-lg shadow-[#0D9488]/25"
            >
              I'm New to Medicare
              <span className="text-xs text-white/70 font-normal">Turning 65 soon</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="/enrollment/working-past-65"
              className="group inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-150 shadow-lg shadow-[#D97706]/25"
            >
              Working Past 65
              <span className="text-xs text-white/70 font-normal">Still have employer coverage</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="/medicare-plans/compare"
              className="group inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-150 border border-white/20"
            >
              Already Enrolled
              <span className="text-xs text-white/70 font-normal">Want to compare or switch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
