import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ZipCodeModalContextType {
  openZipModal: () => void;
  closeZipModal: () => void;
}

const ZipCodeModalContext = createContext<ZipCodeModalContextType | null>(null);

export function useZipCodeModal() {
  const ctx = useContext(ZipCodeModalContext);
  if (!ctx) throw new Error("useZipCodeModal must be used within ZipCodeModalProvider");
  return ctx;
}

function buildDemographicsUrl(postalCode: string): string {
  const now = new Date().toISOString();
  const currentUrl = window.location.href;
  const landingPage = window.location.origin + "/";
  const screenW = window.screen.width;
  const screenH = window.screen.height;

  // Detect device
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const device = isMobile ? "mobile" : "desktop";
  const deviceBrand = isMobile ? "mobile" : "desktop";

  // Detect browser
  let browser = "Unknown";
  if (navigator.userAgent.includes("Chrome") && !navigator.userAgent.includes("Edg")) browser = "Chrome";
  else if (navigator.userAgent.includes("Firefox")) browser = "Firefox";
  else if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) browser = "Safari";
  else if (navigator.userAgent.includes("Edg")) browser = "Edge";

  // Detect OS
  let os = "Unknown";
  if (navigator.userAgent.includes("Windows")) os = "Windows";
  else if (navigator.userAgent.includes("Mac")) os = "macOS";
  else if (navigator.userAgent.includes("Linux")) os = "Linux";
  else if (navigator.userAgent.includes("Android")) os = "Android";
  else if (navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad")) os = "iOS";

  const params = new URLSearchParams({
    postalCode,
    "marketing_Original-Lead-Ad-Source": "direct",
    "marketing_Original-Lead-Medium": "search",
    "marketing_Original-Lead-Ad-Campaign": "",
    "marketing_Original-Lead-Ad-Group": "",
    "marketing_Original-Lead-Date": now.split("T")[0],
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
    "marketing_Original-Lead-Landing-Page": landingPage,
    "marketing_Original-Lead-Referring-URL": document.referrer || "",
    "marketing_Original-Lead-Campaign-ID": "",
    "marketing_Original-Lead-Ad-Group-ID": "",
    "marketing_Original-Lead-Keyword-ID": "",
    "marketing_Original-Lead-Extension-ID": "",
    "marketing_Original-Lead-Device": device,
    "marketing_Original-Lead-Device-Brand": deviceBrand,
    "marketing_Original-Lead-Device-Name": "",
    "marketing_Original-Lead-Lead-OS-Version": "",
    "marketing_Original-Lead-Browser": browser,
    "marketing_Original-Lead-Operating-System": os,
    sessionStartTime: now,
    leadLandingPage: landingPage,
    leadReferringUrl: document.referrer || "medicarefaq.com",
    "marketing_Phone-Ad-Type": "direct-search",
    utm_source: "direct",
    utm_medium: "search",
    utm_content: "",
    utm_campaign: "",
    device,
    leadURL: currentUrl,
    leadBrand: "medicarefaq",
    "Coverage_Multi__c": "Medicare Supplement (Medigap)",
  });

  return `https://demographics.medicarecompared.com/ms/?${params.toString()}`;
}

export function ZipCodeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");

  const openZipModal = useCallback(() => {
    setIsOpen(true);
    setZipCode("");
    setError("");
  }, []);

  // Global click interception: any link pointing to /medicare-plans/compare opens the modal
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href === "/compare-rates") {
        e.preventDefault();
        e.stopPropagation();
        openZipModal();
      }
    };
    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [openZipModal]);

  const closeZipModal = useCallback(() => {
    setIsOpen(false);
    setZipCode("");
    setError("");
  }, []);

  const handleSubmit = () => {
    const cleaned = zipCode.trim();
    if (!/^\d{5}$/.test(cleaned)) {
      setError("Please enter a valid 5-digit ZIP code");
      return;
    }
    setError("");
    const url = buildDemographicsUrl(cleaned);
    window.open(url, "_blank", "noopener,noreferrer");
    closeZipModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") closeZipModal();
  };

  return (
    <ZipCodeModalContext.Provider value={{ openZipModal, closeZipModal }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
              onClick={closeZipModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={closeZipModal}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Red accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-[#C41230] to-[#8B0D22]" />

                {/* Content */}
                <div className="px-8 py-8 text-center">
                  <h2 className="text-[#1B2A4A] text-xl md:text-2xl font-extrabold leading-tight mb-2">
                    Let us help you find the right<br />Medicare plans today!
                  </h2>
                  <p className="text-slate-500 text-sm md:text-base mb-6">
                    Simply enter your zip code below
                  </p>

                  {/* Input + Button */}
                  <div className="flex items-stretch gap-3 mb-3">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="Enter ZIP Code..."
                      value={zipCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                        setZipCode(val);
                        if (error) setError("");
                      }}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      className="flex-1 px-4 py-3.5 border-2 border-slate-200 rounded-lg text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#C41230] focus:ring-2 focus:ring-[#C41230]/20 transition-all"
                    />
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-3.5 bg-[#C41230] hover:bg-[#A30F28] text-white font-bold text-base rounded-lg transition-colors shrink-0 shadow-md hover:shadow-lg"
                    >
                      SUBMIT
                    </button>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-red-500 text-sm font-medium">{error}</p>
                  )}

                  {/* Trust note */}
                  <p className="text-slate-400 text-xs mt-4">
                    Free, no-obligation comparison from licensed Medicare agents
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ZipCodeModalContext.Provider>
  );
}
