import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="bg-[#C41230]">
      <div className="container py-10 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">
              Need help choosing the right plan?
            </h2>
            <p className="text-white/80 text-base">
              Our licensed agents are available to answer your questions — no
              obligation, no pressure.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:8883358996"
              className="inline-flex items-center gap-2 bg-white text-[#C41230] font-bold px-6 py-3.5 rounded-lg transition-all duration-150 hover:bg-white/90 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-150 border border-white/30"
            >
              Get Started Online
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
