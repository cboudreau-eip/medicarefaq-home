import { ArrowRight, CheckCircle, Compass, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const JOURNEY_NEW =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/journey-new-YLAZRxoSj2yuXGqtyALKVr.webp";
const JOURNEY_WORKING =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/journey-working-mGXrKWystdAAjbLGresKYV.webp";
const JOURNEY_ENROLLED =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/journey-enrolled-ZrHfua7GiB6WEzN7uGCCp3.webp";

const journeyPaths = [
  {
    title: "New to Medicare",
    subtitle: "Turning 65 or qualifying for the first time",
    icon: Compass,
    color: "#0D9488",
    image: JOURNEY_NEW,
    links: [
      "Medicare 101 Guide",
      "Am I Eligible?",
      "Turning 65 Timeline",
      "What Does It Cost?",
      "Getting Started Checklist",
    ],
    href: "/medicare-101",
  },
  {
    title: "Working Past 65",
    subtitle: "Balancing employer coverage with Medicare",
    icon: Briefcase,
    color: "#D97706",
    image: JOURNEY_WORKING,
    links: [
      "Medicare & Employer Coverage",
      "When to Enroll if Working",
      "HSA & Medicare Rules",
      "COBRA vs. Medicare",
      "Retirement Planning Guide",
    ],
    href: "/enrollment/working-past-65",
  },
  {
    title: "Already Enrolled",
    subtitle: "Reviewing, switching, or optimizing your plan",
    icon: CheckCircle,
    color: "#4F46E5",
    image: JOURNEY_ENROLLED,
    links: [
      "Compare Your Plan Options",
      "Annual Enrollment Guide",
      "Switch Plans: When & How",
      "Lower Your Costs",
      "Coverage Gaps to Watch",
    ],
    href: "/medicare-plans/compare",
  },
];

export default function JourneySection() {
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
          <span className="inline-flex items-center gap-2 text-[#D97706] font-semibold text-sm mb-3">
            <span className="w-6 h-px bg-[#D97706]" />
            PERSONALIZED GUIDANCE
            <span className="w-6 h-px bg-[#D97706]" />
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-[#1B2A4A] mb-4">
            Where Are You on Your Medicare Journey?
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Everyone's situation is different. Choose the path that matches yours and we'll
            guide you through exactly what you need to know.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {journeyPaths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-200"
              >
                {/* Card header with image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                      style={{ backgroundColor: path.color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg">{path.title}</h3>
                    <p className="text-white/75 text-sm">{path.subtitle}</p>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <ul className="space-y-2.5 mb-5">
                    {path.links.map((link) => (
                      <li key={link} className="flex items-center gap-2.5">
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: path.color }}
                        />
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="text-sm text-[#4B5563] hover:text-[#1B2A4A] transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={path.href}
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1.5 font-semibold text-sm group-hover:gap-2.5 transition-all duration-150"
                    style={{ color: path.color }}
                  >
                    Explore This Path
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
