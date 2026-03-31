import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { ChevronDown, ArrowRight } from "lucide-react";
import { navigationData, type NavCategory } from "@/lib/navigation-data";
import { motion, AnimatePresence } from "framer-motion";

/* Routes that actually exist in the app */
const liveRoutes = new Set([
  "/",
  "/blog",
  "/faqs",
  "/coverage",
  "/about",
  "/medicare-101",
  "/tools/enrollment-timeline",
]);

/* Check if a href resolves to a live route (exact or starts with a live prefix like /faqs/...) */
function isLiveRoute(href: string): boolean {
  if (liveRoutes.has(href)) return true;
  if (href.startsWith("/faqs/")) return true;
  if (href.startsWith("/blog/")) return true;
  return false;
}

function MegaMenuPanel({
  category,
  onClose,
}: {
  category: NavCategory;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-white border-b border-[#E5E7EB] shadow-lg z-50"
    >
      <div className="container py-8">
        <div className="flex gap-8">
          {/* Main items grid */}
          <div className="flex-1">
            <h3
              className="text-xs font-bold tracking-wider mb-5 uppercase"
              style={{ color: category.color }}
            >
              {category.title}
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {category.items.map((item) => {
                const Icon = item.icon;
                const live = isLiveRoute(item.href);
                if (live) {
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => onClose()}
                      className="group flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#F5F7FA] transition-colors duration-150"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          backgroundColor: `${category.color}12`,
                          color: category.color,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#1B2A4A] text-[15px] group-hover:text-[#1B2A4A] block leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[13px] text-[#6B7280] mt-0.5 block leading-snug">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
                    className="group flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#F5F7FA] transition-colors duration-150"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: `${category.color}12`,
                        color: category.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#1B2A4A] text-[15px] group-hover:text-[#1B2A4A] block leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[13px] text-[#6B7280] mt-0.5 block leading-snug">
                        {item.description}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          {category.sidebarItems && category.sidebarItems.length > 0 && (
            <div className="w-[300px] shrink-0 border-l border-[#E5E7EB] pl-8">
              <h4 className="text-xs font-bold tracking-wider text-[#C41230] mb-4 uppercase">
                {category.sidebarTitle}
              </h4>
              <div className="space-y-4">
                {category.sidebarItems.map((item) => {
                  const live = isLiveRoute(item.href);
                  if (live) {
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => onClose()}
                        className="block p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#F0F4F8] transition-colors duration-150 group"
                      >
                        <span className="font-semibold text-[#1B2A4A] text-sm block leading-tight">
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="text-[13px] text-[#6B7280] mt-1.5 block leading-snug">
                            {item.description}
                          </span>
                        )}
                        {item.cta && (
                          <span className="inline-flex items-center gap-1 text-[#C41230] font-semibold text-sm mt-2 group-hover:gap-2 transition-all duration-150">
                            {item.cta}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                      }}
                      className="block p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#F0F4F8] transition-colors duration-150 group"
                    >
                      <span className="font-semibold text-[#1B2A4A] text-sm block leading-tight">
                        {item.title}
                      </span>
                      {item.description && (
                        <span className="text-[13px] text-[#6B7280] mt-1.5 block leading-snug">
                          {item.description}
                        </span>
                      )}
                      {item.cta && (
                        <span className="inline-flex items-center gap-1 text-[#C41230] font-semibold text-sm mt-2 group-hover:gap-2 transition-all duration-150">
                          {item.cta}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MegaMenu() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className="bg-[#1B2A4A] relative"
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <nav className="flex items-center h-12">
          {navigationData.map((category, index) => (
            <div
              key={category.title}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <button
                className={`flex items-center gap-1.5 px-5 h-12 text-sm font-semibold transition-all duration-150 ${
                  activeIndex === index
                    ? "bg-white/15 text-white"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mr-1"
                  style={{ backgroundColor: category.color }}
                />
                {category.title}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <MegaMenuPanel
            category={navigationData[activeIndex]}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
