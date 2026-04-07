import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Shield,
  Loader2,
  Search,
  FileText,
  BookOpen,
  Newspaper,
  LayoutGrid,
  AlertCircle,
  ImageOff,
  Type,
  X,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Save,
  CheckCircle2,
} from "lucide-react";

import { SIMPLE_FAQ_SLUGS } from "@shared/simple-faq-slugs";

// ── Slug registries ───────────────────────────────────────────────────────────
const STATIC_PAGES: PageDef[] = [
  { slug: "home", label: "Home", path: "/" },
  { slug: "about-us", label: "About Us", path: "/about-us" },
  { slug: "contact", label: "Contact", path: "/contact" },
  { slug: "blog", label: "Blog", path: "/blog" },
  { slug: "medicare-101", label: "Medicare 101", path: "/medicare-101" },
  { slug: "eligibility", label: "Eligibility", path: "/new-to-medicare/eligibility" },
  { slug: "turning-65", label: "Turning 65", path: "/new-to-medicare/turning-65" },
  { slug: "medicare-costs", label: "Medicare Costs", path: "/new-to-medicare/costs" },
  { slug: "checklist", label: "Checklist", path: "/new-to-medicare/checklist" },
  { slug: "original-medicare", label: "Original Medicare", path: "/original-medicare" },
  { slug: "medicare-supplement", label: "Medicare Supplement", path: "/medicare-supplements" },
  { slug: "medicare-advantage", label: "Medicare Advantage", path: "/medicare-part-c/medicare-advantage-plans" },
  { slug: "part-d", label: "Medicare Part D", path: "/original-medicare/medicare-parts/medicare-part-d" },
  { slug: "compare-rates", label: "Compare Plans", path: "/compare-rates" },
  { slug: "plan-costs", label: "Plan Costs", path: "/medicare-plans/costs" },
  { slug: "supplement-vs-advantage", label: "Supplement vs. Advantage", path: "/medicare-plans/supplement-vs-advantage" },
  { slug: "best-supplement-plans", label: "Best Supplement Plans", path: "/medicare-plans/best-supplement-plans" },
  { slug: "enrollment-turning-65", label: "Enrollment: Turning 65", path: "/enrollment/turning-65" },
  { slug: "working-past-65", label: "Working Past 65", path: "/enrollment/working-past-65" },
  { slug: "annual-changes", label: "Annual Changes", path: "/enrollment/annual-changes" },
  { slug: "late-penalties", label: "Late Penalties", path: "/enrollment/late-penalties" },
  { slug: "how-to-enroll", label: "How to Enroll", path: "/enrollment/how-to-enroll" },
  { slug: "enrollment-calculator", label: "Enrollment Calculator", path: "/tools/enrollment-timeline" },
  { slug: "guides", label: "Guides", path: "/library/guides" },
  { slug: "podcasts", label: "Podcast", path: "/podcasts" },
  { slug: "videos", label: "Videos", path: "/videos" },
  { slug: "about-team", label: "About the Team", path: "/library/about" },
  { slug: "faqs", label: "Coverage FAQs Index", path: "/faqs" },
  { slug: "search", label: "Search Results", path: "/search" },
  { slug: "blog-medicare-part-b-deductible", label: "Blog: Medicare Part B Deductible", path: "/blog/medicare-part-b-annual-deductible-explained-what-youll-pay" },
  { slug: "faqs-does-medicare-cover-medical-alert-systems", label: "Coverage: Medical Alert Systems", path: "/faqs/does-medicare-cover-medical-alert-systems" },
  { slug: "privacy-policy", label: "Privacy Policy", path: "/privacy-policy" },
  { slug: "terms-of-use", label: "Terms of Use", path: "/terms-of-use" },
];

const COVERAGE_SLUGS = [
  "does-medicare-cover-dental-implants",
  "does-medicare-cover-glasses",
  "does-medicare-cover-hearing-aids",
  "does-medicare-cover-chiropractic-care",
  "does-medicare-cover-acupuncture",
  "does-medicare-cover-sleep-apnea",
  "does-medicare-cover-cataract-surgery",
  "does-medicare-cover-hospice",
  "does-medicare-cover-dentures",
  "does-medicare-cover-mental-health",
  "does-medicare-cover-ozempic",
  "does-medicare-cover-speech-therapy",
  "does-medicare-cover-copd",
  "does-medicare-cover-pre-existing-conditions",
  "does-medicare-cover-prosthetic-devices",
  "when-should-you-enroll-in-medicare-if-still-working",
  "medicare-advantage-extra-benefits-explained-whats-really-included",
  "medicare-supplement-vs-medicare-advantage-crucial-questions-to-ask-before-enrolling",
  "medicare-supplement-vs-medicare-advantage-for-veterans-choosing-the-right-coverage",
  "medicare-costs-in-2026-premiums-deductibles-and-key-changes",
  "does-medicare-cover-life-alert",
  "is-medicare-free",
  "25-medicare-qas-you-should-know",
  "new-medicare-changes",
  "do-disposable-adult-diaper-manufacturers-have-assistance-programs-for-free-or-reduced-cost-depends",
  "will-medicare-supplement-plan-g-pay-for-anesthesia-for-pain-management",
  "does-medicare-cover-a-shower-transfer-bench",
  "medicare-silversneakers-program",
  "medicare-annual-notice-of-change-letter",
  "medicare-give-back-benefit",
  "why-medicare-advantage-plans-are-bad",
  "medigap-vs-medicare-advantage",
  "medicare-special-enrollment-period",
  "medicare-advantage-open-enrollment-period",
  "fehb-and-medicare",
  "medicare-creditable-coverage",
  "medicare-part-d-penalty",
  "medicare-cost-sharing-plans",
  "medicare-maximum-out-of-pocket",
  "medicare-annual-enrollment-period",
];

const BLOG_SLUGS = [
  "medicare-costs-2025",
  "how-is-medicare-part-d-changing-in-2026",
  "the-essentials-medicare-supplement-vs-medicare-advantage-explained",
  "your-guide-to-medicare-enrollment-periods-when-to-sign-up",
  "10-questions-to-ask-before-buying-a-medicare-supplement-plan",
  "key-questions-to-ask-when-comparing-medicare-advantage-plans",
  "the-top-5-mistakes-people-make-during-medicare-annual-enrollment-and-how-to-avoid-them",
  "new-in-2025-medicares-part-d-payment-plan-explained",
  "understanding-medigap-premiums-does-a-higher-price-mean-better-coverage",
  "how-medigap-plans-affect-your-overall-medicare-costs",
  "navigating-your-coverage-medicare-automatic-enrollment-vs-manual-enrollment-explained",
  "medicare-supplement-vs-medicare-advantage-coverage-transparency-explained",
  "how-the-medigap-free-look-period-protects-you",
  "medicare-part-b-annual-deductible-explained-what-youll-pay",
  "medicare-supplement-and-pre-existing-conditions-what-you-need-to-know",
  "how-the-medicare-part-b-giveback-can-lower-your-monthly-costs",
  "medicare-advantage-for-chronic-conditions-what-you-need-to-know",
  "understanding-how-medicare-works-with-employer-health-plans",
  "why-medicare-supplements-offer-peace-of-mind",
  "why-medicare-supplements-offer-network-free-healthcare",
];

// ── Types ─────────────────────────────────────────────────────────────────────
type ContentType = "page" | "coverage" | "blog";
type StatusFilter = "all" | "complete" | "partial" | "empty";
type SectionFilter = "all" | "page" | "coverage" | "blog";

interface PageDef {
  slug: string;
  label: string;
  path: string;
}

interface EditState {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  imageAltText: string;
}

interface PageCard extends PageDef {
  contentType: ContentType;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function slugToLabel(s: string) {
  return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function completionPct(data: EditState | undefined): number {
  if (!data) return 0;
  const fields = [data.metaTitle, data.metaDescription, data.ogImage, data.imageAltText];
  return Math.round((fields.filter(Boolean).length / 4) * 100);
}

function pageStatus(pct: number): "complete" | "partial" | "empty" {
  if (pct === 100) return "complete";
  if (pct > 0) return "partial";
  return "empty";
}

// ── Completion Ring SVG ───────────────────────────────────────────────────────
function CompletionRing({ pct }: { pct: number }) {
  const r = 12;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct === 100 ? "#059669" : pct > 0 ? "#d97706" : "#dc2626";
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" className="flex-shrink-0">
      <circle cx="15" cy="15" r={r} fill="none" stroke="#e5e7eb" strokeWidth="3" />
      {pct > 0 && (
        <circle
          cx="15" cy="15" r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      )}
      <text x="15" y="19" textAnchor="middle" fontSize="8" fontWeight="700" fill={color}>
        {pct}%
      </text>
    </svg>
  );
}

// ── Field indicator pill ──────────────────────────────────────────────────────
function FieldPill({ label, filled, warn }: { label: string; filled: boolean; warn?: boolean }) {
  const cls = filled
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : warn
    ? "bg-amber-50 text-amber-700 border-amber-200"
    : "bg-red-50 text-red-600 border-red-200";
  const dot = filled ? "#059669" : warn ? "#d97706" : "#dc2626";
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${cls}`}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: dot, flexShrink: 0, display: "inline-block" }} />
      {label}
    </span>
  );
}

// ── Character bar ─────────────────────────────────────────────────────────────
function CharBar({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const pct = Math.min((len / max) * 100, 100);
  const color = len > max ? "bg-red-500" : len > max * 0.9 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="mt-1">
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-[10px] text-gray-400 text-right mt-0.5">{len} / {max}</p>
    </div>
  );
}

// ── Edit Drawer ───────────────────────────────────────────────────────────────
function EditDrawer({
  card,
  initialData,
  onClose,
  onSaved,
  onNavigate,
  allCards,
}: {
  card: PageCard;
  initialData: EditState;
  onClose: () => void;
  onSaved: (slug: string, contentType: ContentType, data: EditState) => void;
  onNavigate: (card: PageCard) => void;
  allCards: PageCard[];
}) {
  const [form, setForm] = useState<EditState>(initialData);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Reset form when card changes
  useEffect(() => {
    setForm(initialData);
    setSaveStatus("idle");
  }, [card.slug, card.contentType]);

  const upsert = trpc.cms.upsert.useMutation({
    onSuccess: () => {
      setSaveStatus("saved");
      onSaved(card.slug, card.contentType, form);
      toast.success(`Saved: ${card.label}`);
    },
    onError: (err) => {
      setSaveStatus("idle");
      toast.error(`Error: ${err.message}`);
    },
  });

  const handleSave = () => {
    setSaveStatus("saving");
    upsert.mutate({
      contentType: card.contentType,
      slug: card.slug,
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
      ogImage: form.ogImage || undefined,
      imageAltText: form.imageAltText || undefined,
    });
  };

  // Prev / Next navigation
  const currentIdx = allCards.findIndex((c) => c.slug === card.slug && c.contentType === card.contentType);
  const prevCard = currentIdx > 0 ? allCards[currentIdx - 1] : null;
  const nextCard = currentIdx < allCards.length - 1 ? allCards[currentIdx + 1] : null;

  const navigateTo = useCallback((target: PageCard) => {
    // Persist current form state in local cache before switching
    onSaved(card.slug, card.contentType, form);
    // Switch active card in parent
    onNavigate(target);
  }, [card, form, onSaved, onNavigate]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/25 z-40 transition-opacity"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[480px] max-w-full bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-gray-900 leading-tight">{card.label}</h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5 truncate">{card.path}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={card.path}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              title="Open page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Meta Title */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
              Meta Title
              <span className="ml-2 text-gray-400 font-normal normal-case">Target: 50–60 chars</span>
            </label>
            <Input
              value={form.metaTitle}
              onChange={(e) => { setForm({ ...form, metaTitle: e.target.value }); setSaveStatus("idle"); }}
              placeholder="Page title for browser tab and search results"
              className="text-sm"
            />
            <CharBar value={form.metaTitle} max={60} />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
              Meta Description
              <span className="ml-2 text-gray-400 font-normal normal-case">Target: 150–160 chars</span>
            </label>
            <Textarea
              value={form.metaDescription}
              onChange={(e) => { setForm({ ...form, metaDescription: e.target.value }); setSaveStatus("idle"); }}
              placeholder="Brief description shown in search engine results"
              rows={3}
              className="text-sm resize-none"
            />
            <CharBar value={form.metaDescription} max={160} />
          </div>

          {/* OG Image */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
              OG Image URL
            </label>
            <Input
              value={form.ogImage}
              onChange={(e) => { setForm({ ...form, ogImage: e.target.value }); setSaveStatus("idle"); }}
              placeholder="https://... (image shown when shared on social media)"
              className="text-sm font-mono"
            />
            {form.ogImage && (
              <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={form.ogImage}
                  alt="OG preview"
                  className="w-full h-28 object-cover bg-gray-100"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">medicarefaq.com</p>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5 line-clamp-1">{form.metaTitle || card.label}</p>
                  {form.metaDescription && (
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{form.metaDescription}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Image Alt Text */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
              Image Alt Text
            </label>
            <Input
              value={form.imageAltText}
              onChange={(e) => { setForm({ ...form, imageAltText: e.target.value }); setSaveStatus("idle"); }}
              placeholder="Descriptive alt text for the main article image"
              className="text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
          {/* Prev / Next */}
          <div className="flex gap-1">
            <button
              onClick={() => prevCard && navigateTo(prevCard)}
              disabled={!prevCard}
              className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title={prevCard?.label}
            >
              ← Prev
            </button>
            <button
              onClick={() => nextCard && navigateTo(nextCard)}
              disabled={!nextCard}
              className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title={nextCard?.label}
            >
              Next →
            </button>
          </div>

          {/* Save */}
          <div className="flex items-center gap-2">
            {saveStatus === "saved" && (
              <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved
              </span>
            )}
            <Button
              onClick={handleSave}
              disabled={upsert.isPending}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {upsert.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
              ) : (
                <Save className="w-3.5 h-3.5 mr-1.5" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Page Card ─────────────────────────────────────────────────────────────────
function PageCardItem({
  card,
  data,
  onClick,
}: {
  card: PageCard;
  data: EditState | undefined;
  onClick: () => void;
}) {
  const pct = completionPct(data);
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-400 hover:shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-indigo-300"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-indigo-700 transition-colors line-clamp-2">
          {card.label}
        </span>
        <CompletionRing pct={pct} />
      </div>
      <p className="text-[11px] text-gray-400 font-mono mb-3 truncate">{card.path}</p>
      <div className="flex flex-wrap gap-1">
        <FieldPill label="Title" filled={!!data?.metaTitle} />
        <FieldPill label="Desc" filled={!!data?.metaDescription} />
        <FieldPill label="OG" filled={!!data?.ogImage} warn />
        <FieldPill label="Alt" filled={!!data?.imageAltText} warn />
      </div>
    </button>
  );
}

// ── Section Group ─────────────────────────────────────────────────────────────
function SectionGroup({
  title,
  icon: Icon,
  cards,
  allData,
  onCardClick,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ElementType;
  cards: PageCard[];
  allData: Record<string, EditState>;
  onCardClick: (card: PageCard) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  if (cards.length === 0) return null;
  return (
    <div className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full mb-4 group"
      >
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        )}
        <Icon className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-700 transition-colors">
          {title}
        </span>
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400 font-medium">{cards.length} pages</span>
      </button>
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {cards.map((card) => (
            <PageCardItem
              key={`${card.contentType}:${card.slug}`}
              card={card}
              data={allData[`${card.contentType}:${card.slug}`]}
              onClick={() => onCardClick(card)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Admin page ───────────────────────────────────────────────────────────
export default function Admin() {
  const { user, loading } = useAuth();

  // Build all cards once
  const coverageCards: PageCard[] = useMemo(() =>
    [...COVERAGE_SLUGS, ...SIMPLE_FAQ_SLUGS].map((s) => ({
      slug: s,
      label: slugToLabel(s),
      path: `/faqs/${s}`,
      contentType: "coverage" as ContentType,
    })), []);

  const blogCards: PageCard[] = useMemo(() =>
    BLOG_SLUGS.map((s) => ({
      slug: s,
      label: slugToLabel(s),
      path: `/blog/${s}`,
      contentType: "blog" as ContentType,
    })), []);

  const pageCards: PageCard[] = useMemo(() =>
    STATIC_PAGES.map((p) => ({ ...p, contentType: "page" as ContentType })), []);

  const allCards: PageCard[] = useMemo(() => [...pageCards, ...coverageCards, ...blogCards], [pageCards, coverageCards, blogCards]);

  // Fetch all DB overrides in one shot per content type
  const { data: pageOverrides } = trpc.cms.list.useQuery({ contentType: "page" });
  const { data: coverageOverrides } = trpc.cms.list.useQuery({ contentType: "coverage" });
  const { data: blogOverrides } = trpc.cms.list.useQuery({ contentType: "blog" });

  // Local override cache (key = "contentType:slug")
  const [localData, setLocalData] = useState<Record<string, EditState>>({});

  // Merge DB data into a unified map
  const allData: Record<string, EditState> = useMemo(() => {
    const merged: Record<string, EditState> = { ...localData };
    for (const rows of [pageOverrides, coverageOverrides, blogOverrides]) {
      if (!rows) continue;
      for (const row of rows) {
        const key = `${row.contentType}:${row.slug}`;
        if (!merged[key]) {
          merged[key] = {
            metaTitle: row.metaTitle ?? "",
            metaDescription: row.metaDescription ?? "",
            ogImage: row.ogImage ?? "",
            imageAltText: row.imageAltText ?? "",
          };
        }
      }
    }
    return merged;
  }, [pageOverrides, coverageOverrides, blogOverrides, localData]);

  const handleSaved = useCallback((slug: string, contentType: ContentType, data: EditState) => {
    setLocalData((prev) => ({ ...prev, [`${contentType}:${slug}`]: data }));
  }, []);

  // Drawer state
  const [activeCard, setActiveCard] = useState<PageCard | null>(null);

  // Deep-link: open editor from ?edit=contentType:slug (e.g. from SEO Audit)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const editParam = params.get("edit");
    if (editParam && allCards.length > 0) {
      const [ct, ...slugParts] = editParam.split(":");
      const slug = slugParts.join(":");
      const card = allCards.find((c) => c.contentType === ct && c.slug === slug);
      if (card) {
        setActiveCard(card);
        // Clean up the URL param
        window.history.replaceState({}, "", "/admin");
      }
    }
  }, [allCards]);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");

  // Computed stats
  const stats = useMemo(() => {
    let complete = 0, partial = 0, empty = 0;
    for (const card of allCards) {
      const pct = completionPct(allData[`${card.contentType}:${card.slug}`]);
      const s = pageStatus(pct);
      if (s === "complete") complete++;
      else if (s === "partial") partial++;
      else empty++;
    }
    return { complete, partial, empty, total: allCards.length };
  }, [allCards, allData]);

  // Missing counts for sidebar health items
  const missingTitle = useMemo(() => allCards.filter((c) => !allData[`${c.contentType}:${c.slug}`]?.metaTitle).length, [allCards, allData]);
  const missingOG = useMemo(() => allCards.filter((c) => !allData[`${c.contentType}:${c.slug}`]?.ogImage).length, [allCards, allData]);
  const missingAlt = useMemo(() => allCards.filter((c) => !allData[`${c.contentType}:${c.slug}`]?.imageAltText).length, [allCards, allData]);

  // Filter cards
  const filterCard = useCallback((card: PageCard): boolean => {
    const q = search.toLowerCase();
    if (q && !card.label.toLowerCase().includes(q) && !card.path.toLowerCase().includes(q)) return false;
    if (sectionFilter !== "all" && card.contentType !== sectionFilter) return false;
    if (statusFilter !== "all") {
      const pct = completionPct(allData[`${card.contentType}:${card.slug}`]);
      const s = pageStatus(pct);
      if (s !== statusFilter) return false;
    }
    return true;
  }, [search, sectionFilter, statusFilter, allData]);

  const filteredPages = useMemo(() => pageCards.filter(filterCard), [pageCards, filterCard]);
  const filteredCoverage = useMemo(() => coverageCards.filter(filterCard), [coverageCards, filterCard]);
  const filteredBlog = useMemo(() => blogCards.filter(filterCard), [blogCards, filterCard]);
  const filteredAll = useMemo(() => [...filteredPages, ...filteredCoverage, ...filteredBlog], [filteredPages, filteredCoverage, filteredBlog]);

  // ── Auth guards ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 text-gray-400 mx-auto" />
          <h1 className="text-xl font-semibold text-gray-700">Owner Access Required</h1>
          <p className="text-gray-500">Please sign in to access the CMS.</p>
          <Button onClick={() => (window.location.href = getLoginUrl())} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Sign In
          </Button>
        </div>
      </div>
    );
  }
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <Shield className="w-12 h-12 text-red-400 mx-auto" />
          <h1 className="text-xl font-semibold text-gray-700">Access Denied</h1>
          <p className="text-gray-500">This area is restricted to the site owner.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Top Nav ── */}
      <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between flex-shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-black">M</span>
          </div>
          <span className="font-bold text-gray-900 text-sm">MedicareFAQ CMS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-1 rounded-full">Admin</span>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
            {user.name?.slice(0, 2).toUpperCase() ?? "CB"}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="w-56 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col overflow-y-auto">
          <div className="p-4 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">Content</p>

            {(["all", "page", "coverage", "blog"] as SectionFilter[]).map((f) => {
              const icons = { all: LayoutGrid, page: FileText, coverage: BookOpen, blog: Newspaper };
              const labels = { all: "All Pages", page: "Standalone", coverage: "Coverage FAQs", blog: "Blog Articles" };
              const counts = { all: stats.total, page: pageCards.length, coverage: coverageCards.length, blog: blogCards.length };
              const Icon = icons[f];
              return (
                <button
                  key={f}
                  onClick={() => setSectionFilter(f)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sectionFilter === f
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left text-[13px]">{labels[f]}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    sectionFilter === f ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    {counts[f]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="px-4 pb-4 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2 mt-2">SEO Health</p>

            <a
              href="/admin/seo-audit"
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors mb-1"
            >
              <LayoutGrid className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left text-[13px] font-semibold">SEO Audit Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => { setStatusFilter("empty"); setSectionFilter("all"); }}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="flex-1 text-left text-[13px]">Missing Title</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-50 text-red-600">{missingTitle}</span>
            </button>
            <button
              onClick={() => { setStatusFilter("partial"); setSectionFilter("all"); }}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ImageOff className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="flex-1 text-left text-[13px]">Missing OG Image</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600">{missingOG}</span>
            </button>
            <button
              onClick={() => { setStatusFilter("partial"); setSectionFilter("all"); }}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Type className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="flex-1 text-left text-[13px]">Missing Alt Text</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600">{missingAlt}</span>
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Status summary bar */}
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-3.5 flex items-center gap-3 mb-5 flex-wrap">
            <span className="text-sm font-bold text-gray-700 mr-1">SEO Status</span>
            {(["all", "complete", "partial", "empty"] as StatusFilter[]).map((f) => {
              const labels = { all: `All (${stats.total})`, complete: `Complete (${stats.complete})`, partial: `Partial (${stats.partial})`, empty: `Empty (${stats.empty})` };
              const styles = {
                all: { base: "bg-gray-100 text-gray-600 border-gray-200", active: "bg-gray-800 text-white border-gray-800", dot: "#9ca3af" },
                complete: { base: "bg-emerald-50 text-emerald-700 border-emerald-200", active: "bg-emerald-600 text-white border-emerald-600", dot: "#059669" },
                partial: { base: "bg-amber-50 text-amber-700 border-amber-200", active: "bg-amber-500 text-white border-amber-500", dot: "#d97706" },
                empty: { base: "bg-red-50 text-red-600 border-red-200", active: "bg-red-600 text-white border-red-600", dot: "#dc2626" },
              };
              const s = styles[f];
              const isActive = statusFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${isActive ? s.active : s.base}`}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: isActive ? "#fff" : s.dot, flexShrink: 0, display: "inline-block" }} />
                  {labels[f]}
                </button>
              );
            })}
          </div>

          {/* Search + sort toolbar */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pages, paths..."
                className="pl-9 text-sm h-9"
              />
            </div>
            <span className="text-sm text-gray-400 ml-auto">
              {filteredAll.length} of {stats.total} pages
            </span>
          </div>

          {/* Card sections */}
          {filteredAll.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No pages match your filters</p>
              <button
                onClick={() => { setSearch(""); setStatusFilter("all"); setSectionFilter("all"); }}
                className="mt-2 text-sm text-indigo-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <SectionGroup
                title="Standalone Pages"
                icon={FileText}
                cards={filteredPages}
                allData={allData}
                onCardClick={setActiveCard}
              />
              <SectionGroup
                title="Coverage FAQs"
                icon={BookOpen}
                cards={filteredCoverage}
                allData={allData}
                onCardClick={setActiveCard}
              />
              <SectionGroup
                title="Blog Articles"
                icon={Newspaper}
                cards={filteredBlog}
                allData={allData}
                onCardClick={setActiveCard}
              />
            </>
          )}
        </main>
      </div>

      {/* ── Edit Drawer ── */}
      {activeCard && (
        <EditDrawer
          card={activeCard}
          initialData={allData[`${activeCard.contentType}:${activeCard.slug}`] ?? {
            metaTitle: "", metaDescription: "", ogImage: "", imageAltText: "",
          }}
          onClose={() => setActiveCard(null)}
          onSaved={handleSaved}
          onNavigate={setActiveCard}
          allCards={filteredAll}
        />
      )}
    </div>
  );
}
