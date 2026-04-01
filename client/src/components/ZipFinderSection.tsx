import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const ZIP_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/zip-finder-bg-gNTJcKEjmhG5w7ALCC56EK.webp";

function buildMedicareComparedUrl(zip: string): string {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const sessionTime = now.toISOString();
  const currentUrl = window.location.href;
  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";
  const browser = /Chrome/i.test(navigator.userAgent)
    ? "Chrome"
    : /Firefox/i.test(navigator.userAgent)
    ? "Firefox"
    : /Safari/i.test(navigator.userAgent)
    ? "Safari"
    : "Other";
  const os = /Windows/i.test(navigator.userAgent)
    ? "Windows"
    : /Mac/i.test(navigator.userAgent)
    ? "Mac"
    : /Linux/i.test(navigator.userAgent)
    ? "Linux"
    : "Other";

  const params = new URLSearchParams({
    postalCode: zip,
    "marketing_Original-Lead-Ad-Source": "direct",
    "marketing_Original-Lead-Medium": "search",
    "marketing_Original-Lead-Ad-Campaign": "",
    "marketing_Original-Lead-Ad-Group": "",
    "marketing_Original-Lead-Date": dateStr,
    "marketing_Original-Lead-URL": currentUrl,
    "marketing_Original-Lead-Network": "",
    "marketing_Original-Lead-Match-Type": "",
    "marketing_Original-Lead-Keywords": "",
    "marketing_Original-Lead-Query-String": "",
    "marketing_Original-Lead-Content": "",
    "marketing_Original-Lead-Extension": "",
    "marketing_Original-Lead-Location": "",
    "marketing_Original-Lead-Placement": "",
    "marketing_Original-Lead-Ad-Position": "",
    "marketing_Original-Lead-Screen-Height": String(screenH),
    "marketing_Original-Lead-Screen-Width": String(screenW),
    "marketing_Original-Lead-Landing-Page": currentUrl,
    "marketing_Original-Lead-Referring-URL": document.referrer || "",
    "marketing_Original-Lead-Campaign-ID": "",
    "marketing_Original-Lead-Ad-Group-ID": "",
    "marketing_Original-Lead-Keyword-ID": "",
    "marketing_Original-Lead-Extension-ID": "",
    "marketing_Original-Lead-Device": isMobile,
    "marketing_Original-Lead-Device-Brand": isMobile,
    "marketing_Original-Lead-Device-Name": "",
    "marketing_Original-Lead-Lead-OS-Version": "",
    "marketing_Original-Lead-Browser": browser,
    "marketing_Original-Lead-Operating-System": os,
    sessionStartTime: sessionTime,
    leadLandingPage: currentUrl,
    leadReferringUrl: document.referrer ? new URL(document.referrer).hostname : "medicarefaq.com",
    "marketing_Phone-Ad-Type": "direct-search",
    utm_source: "direct",
    utm_medium: "search",
    utm_content: "",
    utm_campaign: "",
    device: isMobile,
    leadURL: currentUrl,
    leadBrand: "medicarefaq",
    Coverage_Multi__c: "Medicare Supplement (Medigap)",
  });

  return `https://demographics.medicarecompared.com/ms/?${params.toString()}`;
}

export default function ZipFinderSection() {
  const [zip, setZip] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length === 5) {
      window.location.href = buildMedicareComparedUrl(zip);
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0">
        <img src={ZIP_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1B2A4A]/85" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-[#0D9488] font-semibold text-sm mb-3">
            <span className="w-6 h-px bg-[#0D9488]" />
            LOCAL PLANS
            <span className="w-6 h-px bg-[#0D9488]" />
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-white mb-4">
            Find Plans Available in Your Area
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Enter your ZIP code to see Medicare plans, costs, and coverage options
            specific to where you live.
          </p>

          <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Enter your ZIP code"
                value={zip}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                  setZip(val);
                }}
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-lg text-[#1B2A4A] font-medium placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-base"
              />
            </div>
            <button
              type="submit"
              disabled={zip.length !== 5}
              className="bg-[#C41230] hover:bg-[#A30F28] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-150 flex items-center gap-2 whitespace-nowrap shadow-lg shadow-[#C41230]/25"
            >
              <Search className="w-4 h-4" />
              Find Plans
            </button>
          </form>

          <p className="text-white/50 text-sm mt-4">
            No obligation. No spam. Just plan information for your area.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
