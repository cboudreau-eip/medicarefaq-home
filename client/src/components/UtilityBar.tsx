import { utilityLinks } from "@/lib/navigation-data";
import { Star, ShieldCheck } from "lucide-react";

export default function UtilityBar() {
  return (
    <div className="bg-[#F5F7FA] border-b border-[#E5E7EB] text-sm hidden lg:block">
      <div className="container flex items-center justify-between h-9">
        <nav className="flex items-center gap-5">
          {utilityLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-[#4B5563] hover:text-[#1B2A4A] transition-colors duration-150 font-medium"
            >
              {link.title}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-[#4B5563] font-medium">
            <Star className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
            BBB A+ Rated
          </span>
          <span className="flex items-center gap-1.5 text-[#4B5563] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            Licensed Agents
          </span>
        </div>
      </div>
    </div>
  );
}
