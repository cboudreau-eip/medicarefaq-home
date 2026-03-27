import { Star, MapPin, Users, FileCheck, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  { icon: Star, label: "BBB A+ Rated", sublabel: "Since 2015" },
  { icon: MapPin, label: "Licensed in All 50 States", sublabel: "Full national coverage" },
  { icon: Users, label: "60,000+ Clients Helped", sublabel: "Medicare guidance" },
  { icon: FileCheck, label: "Editorially Reviewed", sublabel: "By Medicare professionals" },
  { icon: BookOpen, label: "600+ Pages of Content", sublabel: "Comprehensive library" },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-[#E5E7EB]">
      <div className="container py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#1B2A4A]" />
                </div>
                <div>
                  <span className="font-bold text-[#1B2A4A] text-sm block leading-tight">
                    {item.label}
                  </span>
                  <span className="text-xs text-[#6B7280] block">{item.sublabel}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
