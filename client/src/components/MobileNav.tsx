import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, ChevronRight, Search, Phone } from "lucide-react";
import { navigationData, utilityLinks } from "@/lib/navigation-data";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

/* Routes that actually exist in the app */
const liveRoutes = new Set([
  "/",
  "/blog",
  "/faqs",
  "/coverage",
  "/about",
  "/medicare-101",
  "/tools/enrollment-timeline",
  "/new-to-medicare/eligibility",
  "/new-to-medicare/turning-65",
  "/new-to-medicare/costs",
  "/new-to-medicare/checklist",
  "/medicare-plans/original-medicare",
  "/medicare-plans/medicare-supplement",
  "/medicare-plans/medicare-advantage",
  "/medicare-plans/part-d",
  "/medicare-plans/compare",
  "/medicare-plans/costs",
  "/medicare-plans/supplement-vs-advantage",
  "/medicare-plans/best-supplement-plans",
  "/enrollment/turning-65",
  "/enrollment/working-past-65",
  "/enrollment/annual-changes",
  "/enrollment/late-penalties",
  "/enrollment/how-to-enroll",
  "/library/guides",
  "/library/podcast",
  "/library/videos",
  "/library/about",
  "/contact",
]);

function isLiveRoute(href: string): boolean {
  if (liveRoutes.has(href)) return true;
  if (href.startsWith("/faqs/")) return true;
  if (href.startsWith("/blog/")) return true;
  return false;
}

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex items-center justify-center text-[#1B2A4A]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <Link href="/">
          <img src={LOGO_URL} alt="MedicareFAQ" className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center text-[#1B2A4A]">
            <Search className="w-5 h-5" />
          </button>
          <a
            href="tel:8883358996"
            className="w-10 h-10 flex items-center justify-center text-[#1B2A4A]"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 top-16"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-16 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 overflow-y-auto"
            >
              <div className="p-4">
                <a
                  href="/get-started"
                  className="block w-full bg-[#C41230] text-white text-center font-bold py-3 rounded-lg mb-4"
                >
                  Get Started Free
                </a>
              </div>

              <nav className="pb-8">
                {navigationData.map((category, index) => (
                  <div key={category.title} className="border-b border-[#F3F4F6]">
                    <button
                      onClick={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                      className="w-full flex items-center justify-between px-4 py-3.5"
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-semibold text-[#1B2A4A] text-[15px]">
                          {category.title}
                        </span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-200 ${
                          expandedIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3 space-y-0.5">
                            {category.items.map((item) => {
                              const Icon = item.icon;
                              const live = isLiveRoute(item.href);
                              if (live) {
                                return (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 py-2.5 pl-4"
                                  >
                                    <Icon
                                      className="w-4 h-4 shrink-0"
                                      style={{ color: category.color }}
                                    />
                                    <span className="text-sm text-[#4B5563]">
                                      {item.title}
                                    </span>
                                  </Link>
                                );
                              }
                              return (
                                <a
                                  key={item.title}
                                  href={item.href}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpen(false);
                                  }}
                                  className="flex items-center gap-3 py-2.5 pl-4"
                                >
                                  <Icon
                                    className="w-4 h-4 shrink-0"
                                    style={{ color: category.color }}
                                  />
                                  <span className="text-sm text-[#4B5563]">
                                    {item.title}
                                  </span>
                                </a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Utility links */}
                <div className="px-4 pt-4 space-y-3">
                  {utilityLinks.map((link) => {
                    const live = isLiveRoute(link.href);
                    if (live) {
                      return (
                        <Link
                          key={link.title}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-[#6B7280] font-medium"
                        >
                          {link.title}
                        </Link>
                      );
                    }
                    return (
                      <a
                        key={link.title}
                        href={link.href}
                        className="block text-sm text-[#6B7280] font-medium"
                      >
                        {link.title}
                      </a>
                    );
                  })}
                </div>

                <div className="px-4 pt-6">
                  <a
                    href="tel:8883358996"
                    className="flex items-center gap-2 text-[#1B2A4A] font-bold"
                  >
                    <Phone className="w-4 h-4" />
                    (888) 335-8996
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
