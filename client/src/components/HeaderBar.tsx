import { Search, Phone } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

export default function HeaderBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="bg-white border-b border-[#E5E7EB]">
      <div className="container flex items-center justify-between h-[72px] gap-4">
        {/* Logo */}
        <a href="/" className="shrink-0">
          <img
            src={LOGO_URL}
            alt="MedicareFAQ.com - Powered by Elite Insurance Partners"
            className="h-12 w-auto"
          />
        </a>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center flex-1 max-w-md mx-6"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search Medicare topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg text-sm text-[#1B2A4A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B2A4A] focus:ring-1 focus:ring-[#1B2A4A]/20 transition-all duration-150"
            />
          </div>
        </form>

        {/* Phone + CTA */}
        <div className="flex items-center gap-4">
          <a
            href="tel:8883358996"
            className="hidden lg:flex items-center gap-2 text-[#1B2A4A] font-bold text-lg hover:text-[#0D9488] transition-colors duration-150"
          >
            <Phone className="w-5 h-5" />
            (888) 335-8996
          </a>
          <a
            href="/contact"
            className="bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-150 shadow-sm hover:shadow-md whitespace-nowrap"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </div>
  );
}
