import { Phone, Mail, MapPin } from "lucide-react";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

const footerColumns = [
  {
    title: "NEW TO MEDICARE",
    color: "#0D9488",
    links: [
      "Medicare 101 Guide",
      "Am I Eligible?",
      "Turning 65 Timeline",
      "What Does It Cost?",
      "Getting Started Checklist",
    ],
  },
  {
    title: "MEDICARE PLANS",
    color: "#1B2A4A",
    links: [
      "Original Medicare",
      "Medicare Supplement",
      "Medicare Advantage",
      "Part D (Rx Plans)",
      "Compare All Plans",
      "Medicare Costs",
    ],
  },
  {
    title: "ENROLLMENT",
    color: "#D97706",
    links: [
      "Turning 65 Enrollment",
      "Working Past 65",
      "Annual Changes",
      "Late Penalties",
      "How to Enroll",
    ],
  },
  {
    title: "COVERAGE",
    color: "#059669",
    links: [
      "Does Medicare Cover...?",
      "Dental, Vision & Hearing",
      "Specialized Care",
      "Prescription Drugs",
      "Search All Coverage",
    ],
  },
  {
    title: "RESOURCES",
    color: "#4F46E5",
    links: ["Blog", "Guides", "Podcast", "Videos", "FAQs", "About Team"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B2A4A]">
      {/* Main footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4
                className="text-xs font-bold tracking-wider mb-4"
                style={{ color: column.color }}
              >
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <img
                src={LOGO_URL}
                alt="MedicareFAQ.com"
                className="h-10 w-auto brightness-0 invert opacity-70"
              />
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/50">
                <a href="tel:8883358996" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  (888) 335-8996
                </a>
                <a href="mailto:info@medicarefaq.com" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  info@medicarefaq.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            &copy; 2026 MedicareFAQ.com &middot; Powered by Elite Insurance Partners, an
            affiliated entity not endorsed by any government agency.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/70 transition-colors">
              Terms of Use
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/70 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
