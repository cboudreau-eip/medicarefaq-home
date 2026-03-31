import { Phone, Mail } from "lucide-react";
import { Link } from "wouter";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

const footerColumns = [
  {
    title: "NEW TO MEDICARE",
    color: "#0D9488",
    links: [
      { label: "Medicare 101 Guide", href: "/medicare-101" },
      { label: "Am I Eligible?", href: "/new-to-medicare/eligibility" },
      { label: "Turning 65 Timeline", href: "/new-to-medicare/turning-65" },
      { label: "What Does It Cost?", href: "/new-to-medicare/costs" },
      { label: "Getting Started Checklist", href: "/new-to-medicare/checklist" },
    ],
  },
  {
    title: "MEDICARE PLANS",
    color: "#1B2A4A",
    links: [
      { label: "Original Medicare", href: "/medicare-plans/original-medicare" },
      { label: "Medicare Supplement", href: "/medicare-plans/medicare-supplement" },
      { label: "Medicare Advantage", href: "/medicare-plans/medicare-advantage" },
      { label: "Part D (Rx Plans)", href: "/medicare-plans/part-d" },
      { label: "Compare All Plans", href: "/medicare-plans/compare" },
      { label: "Medicare Costs", href: "/medicare-plans/costs" },
    ],
  },
  {
    title: "ENROLLMENT",
    color: "#D97706",
    links: [
      { label: "Turning 65 Enrollment", href: "/enrollment/turning-65" },
      { label: "Working Past 65", href: "/enrollment/working-past-65" },
      { label: "Annual Changes", href: "/enrollment/annual-changes" },
      { label: "Late Penalties", href: "/enrollment/late-penalties" },
      { label: "How to Enroll", href: "/enrollment/how-to-enroll" },
    ],
  },
  {
    title: "COVERAGE",
    color: "#059669",
    links: [
      { label: "Does Medicare Cover...?", href: "/faqs" },
      { label: "Dental, Vision & Hearing", href: "/faqs/does-medicare-cover-dental-implants" },
      { label: "Specialized Care", href: "/faqs" },
      { label: "Prescription Drugs", href: "/faqs" },
      { label: "Search All Coverage", href: "/faqs" },
    ],
  },
  {
    title: "RESOURCES",
    color: "#4F46E5",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/library/guides" },
      { label: "Podcast", href: "/library/podcast" },
      { label: "Videos", href: "/library/videos" },
      { label: "FAQs", href: "/faqs" },
      { label: "About Team", href: "/library/about" },
    ],
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
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
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
            <Link href="/privacy-policy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-white/70 transition-colors">
              Terms of Use
            </Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
