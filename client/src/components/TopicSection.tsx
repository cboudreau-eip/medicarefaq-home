import {
  BarChart3,
  Shield,
  Calendar,
  DollarSign,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const topics = [
  {
    title: "Medicare Plans Compared",
    description:
      "Original Medicare, Advantage, Supplement, Part D — side by side comparisons.",
    icon: BarChart3,
    color: "#1B2A4A",
    articles: "12 articles",
    href: "/medicare-plans/compare",
  },
  {
    title: "Coverage & Benefits",
    description:
      "What Medicare covers, what it doesn't, and how to fill the gaps.",
    icon: Shield,
    color: "#059669",
    articles: "18 articles",
    href: "/faqs",
  },
  {
    title: "Enrollment & Eligibility",
    description:
      "When to enroll, how to enroll, and what happens if you miss it.",
    icon: Calendar,
    color: "#D97706",
    articles: "15 articles",
    href: "/enrollment/turning-65",
  },
  {
    title: "Costs & Savings",
    description:
      "Premiums, deductibles, out-of-pocket costs, and ways to save.",
    icon: DollarSign,
    color: "#C41230",
    articles: "9 articles",
    href: "/medicare-plans/costs",
  },
  {
    title: "Medigap / Supplement",
    description:
      "Plan F vs G vs N: how to choose, when to switch.",
    icon: Heart,
    color: "#4F46E5",
    articles: "14 articles",
    href: "/medicare-plans/medicare-supplement",
  },
  {
    title: "Medicare Advantage",
    description:
      "HMO vs PPO, extra benefits, network rules, annual changes.",
    icon: Users,
    color: "#0D9488",
    articles: "11 articles",
    href: "/medicare-plans/medicare-advantage",
  },
];

export default function TopicSection() {
  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[#4F46E5] font-semibold text-sm mb-3">
            <span className="w-6 h-px bg-[#4F46E5]" />
            COMPREHENSIVE GUIDES
            <span className="w-6 h-px bg-[#4F46E5]" />
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-[#1B2A4A] mb-4">
            Explore by Topic
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Six comprehensive guides covering everything you need to know about
            Medicare — each one a complete resource, not a sales pitch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
              >
                <Link
                  href={topic.href}
                  className="group bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md hover:shadow-black/5 transition-all duration-200 flex items-start gap-4 h-full"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${topic.color}10`,
                      color: topic.color,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1B2A4A] text-[15px] mb-1 group-hover:text-[#1B2A4A]">
                      {topic.title}
                    </h3>
                    <p className="text-[13px] text-[#6B7280] leading-relaxed mb-2">
                      {topic.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#9CA3AF]">
                        {topic.articles}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: topic.color }}
                      >
                        Explore
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
