import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const resources = [
  {
    type: "Guide",
    typeColor: "#059669",
    title: "Medicare Supplement Plan G: The Complete 2026 Guide",
    description:
      "Everything you need to know about Plan G — costs, coverage, and why it's become the most popular Medigap plan.",
    date: "Updated Mar 2026",
  },
  {
    type: "FAQ",
    typeColor: "#D97706",
    title: "Does Medicare Cover Dental Implants?",
    description:
      "Original Medicare doesn't cover dental implants, but some Medicare Advantage plans do. Here's what to look for.",
    date: "Updated Feb 2026",
  },
  {
    type: "Tool",
    typeColor: "#4F46E5",
    title: "Medicare Enrollment Timeline Calculator",
    description:
      "Enter your birthday and employment status to see exactly when you should enroll and what deadlines to watch.",
    date: "Updated Jan 2026",
  },
];

export default function ResourcesSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[#059669] font-semibold text-sm mb-3">
            <span className="w-6 h-px bg-[#059669]" />
            LATEST UPDATES
            <span className="w-6 h-px bg-[#059669]" />
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-[#1B2A4A] mb-4">
            Latest Resources
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Guides, answers, and tools — updated regularly by licensed Medicare
            professionals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="group bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-200"
            >
              {/* Top color bar */}
              <div
                className="h-1"
                style={{ backgroundColor: resource.typeColor }}
              />
              <div className="p-6">
                <span
                  className="inline-block text-xs font-bold tracking-wider uppercase mb-3 px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: `${resource.typeColor}10`,
                    color: resource.typeColor,
                  }}
                >
                  {resource.type}
                </span>
                <h3 className="font-bold text-[#1B2A4A] text-lg mb-2 leading-tight group-hover:text-[#1B2A4A]">
                  {resource.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                    <Clock className="w-3.5 h-3.5" />
                    {resource.date}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-150"
                    style={{ color: resource.typeColor }}
                  >
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
