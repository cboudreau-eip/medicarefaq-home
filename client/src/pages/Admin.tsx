import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileText, BookOpen, Newspaper, Save, ChevronDown, ChevronUp, Shield, Loader2 } from "lucide-react";

// ── Static page registry ──────────────────────────────────────────────────────
const STATIC_PAGES = [
  { slug: "home", label: "Home", path: "/" },
  { slug: "about", label: "About Us", path: "/about" },
  { slug: "contact", label: "Contact", path: "/contact" },
  { slug: "blog", label: "Blog", path: "/blog" },
  { slug: "medicare-101", label: "Medicare 101", path: "/medicare-101" },
  { slug: "eligibility", label: "Eligibility", path: "/new-to-medicare/eligibility" },
  { slug: "turning-65", label: "Turning 65", path: "/new-to-medicare/turning-65" },
  { slug: "medicare-costs", label: "Medicare Costs", path: "/new-to-medicare/costs" },
  { slug: "checklist", label: "Checklist", path: "/new-to-medicare/checklist" },
  { slug: "original-medicare", label: "Original Medicare", path: "/medicare-plans/original-medicare" },
  { slug: "medicare-supplement", label: "Medicare Supplement", path: "/medicare-plans/medicare-supplement" },
  { slug: "medicare-advantage", label: "Medicare Advantage", path: "/medicare-plans/medicare-advantage" },
  { slug: "part-d", label: "Medicare Part D", path: "/medicare-plans/part-d" },
  { slug: "compare-plans", label: "Compare Plans", path: "/medicare-plans/compare" },
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
  { slug: "podcast", label: "Podcast", path: "/library/podcast" },
  { slug: "videos", label: "Videos", path: "/library/videos" },
  { slug: "about-team", label: "About the Team", path: "/library/about" },
  { slug: "faqs", label: "Coverage FAQs Index", path: "/faqs" },
  { slug: "search", label: "Search Results", path: "/search" },
];

// ── Types ─────────────────────────────────────────────────────────────────────
type ContentType = "page" | "coverage" | "blog";

interface MetaRow {
  slug: string;
  label: string;
  path?: string;
}

interface EditState {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  imageAltText: string;
}

// ── Single editable row ───────────────────────────────────────────────────────
function MetaEditRow({
  row,
  contentType,
  savedData,
  onSaved,
}: {
  row: MetaRow;
  contentType: ContentType;
  savedData: Record<string, EditState>;
  onSaved: (slug: string, data: EditState) => void;
}) {
  const [open, setOpen] = useState(false);
  const existing = savedData[row.slug];

  const [form, setForm] = useState<EditState>({
    metaTitle: existing?.metaTitle ?? "",
    metaDescription: existing?.metaDescription ?? "",
    ogImage: existing?.ogImage ?? "",
    imageAltText: existing?.imageAltText ?? "",
  });

  const upsert = trpc.cms.upsert.useMutation({
    onSuccess: () => {
      toast.success(`Saved: ${row.label}`);
      onSaved(row.slug, form);
    },
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  const hasOverride = !!existing;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Row header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-800">{row.label}</span>
          {row.path && (
            <span className="text-xs text-gray-400 font-mono">{row.path}</span>
          )}
          {hasOverride && (
            <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              Edited
            </Badge>
          )}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {/* Expanded edit form */}
      {open && (
        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Meta Title
            </label>
            <Input
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              placeholder="Page title for browser tab and search results"
              className="bg-white"
            />
            <p className="text-xs text-gray-400 mt-1">{form.metaTitle.length}/60 characters</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Meta Description
            </label>
            <Textarea
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              placeholder="Brief description shown in search engine results"
              rows={3}
              className="bg-white resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{form.metaDescription.length}/160 characters</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              OG Image URL
            </label>
            <Input
              value={form.ogImage}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              placeholder="https://... (image shown when shared on social media)"
              className="bg-white font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Image Alt Text
            </label>
            <Input
              value={form.imageAltText}
              onChange={(e) => setForm({ ...form, imageAltText: e.target.value })}
              placeholder="Descriptive alt text for the main article image"
              className="bg-white"
            />
          </div>

          <Button
            onClick={() =>
              upsert.mutate({
                contentType,
                slug: row.slug,
                metaTitle: form.metaTitle || undefined,
                metaDescription: form.metaDescription || undefined,
                ogImage: form.ogImage || undefined,
                imageAltText: form.imageAltText || undefined,
              })
            }
            disabled={upsert.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            {upsert.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Tab panel ─────────────────────────────────────────────────────────────────
function MetaTabPanel({
  contentType,
  rows,
}: {
  contentType: ContentType;
  rows: MetaRow[];
}) {
  const { data: dbOverrides, isLoading } = trpc.cms.list.useQuery({ contentType });

  const [savedData, setSavedData] = useState<Record<string, EditState>>({});
  const [search, setSearch] = useState("");

  // Merge DB overrides into savedData on load
  const mergedData: Record<string, EditState> = { ...savedData };
  if (dbOverrides) {
    for (const row of dbOverrides) {
      if (!mergedData[row.slug]) {
        mergedData[row.slug] = {
          metaTitle: row.metaTitle ?? "",
          metaDescription: row.metaDescription ?? "",
          ogImage: row.ogImage ?? "",
          imageAltText: row.imageAltText ?? "",
        };
      }
    }
  }

  const filtered = rows.filter(
    (r) =>
      r.label.toLowerCase().includes(search.toLowerCase()) ||
      r.slug.toLowerCase().includes(search.toLowerCase())
  );

  const editedCount = Object.keys(mergedData).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <span className="text-sm text-gray-500">
          {filtered.length} of {rows.length} pages
          {editedCount > 0 && (
            <span className="ml-2 text-blue-600 font-medium">· {editedCount} edited</span>
          )}
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((row) => (
            <MetaEditRow
              key={row.slug}
              row={row}
              contentType={contentType}
              savedData={mergedData}
              onSaved={(slug, data) =>
                setSavedData((prev) => ({ ...prev, [slug]: data }))
              }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
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
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
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

  // Build coverage + blog row lists from static slugs
  // These are loaded from the data files at build time; slugs are the source of truth
  const coverageRows: MetaRow[] = COVERAGE_SLUGS.map((s) => ({
    slug: s,
    label: s
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    path: `/faqs/${s}`,
  }));

  const blogRows: MetaRow[] = BLOG_SLUGS.map((s) => ({
    slug: s,
    label: s
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    path: `/blog/${s}`,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              MedicareFAQ CMS
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Edit meta titles, descriptions, OG images, and image alt text
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Signed in as <span className="font-medium text-gray-700">{user.name}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Tabs defaultValue="pages">
          <TabsList className="mb-6 bg-white border border-gray-200">
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Standalone Pages
              <Badge variant="secondary" className="ml-1 text-xs">{STATIC_PAGES.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="coverage" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Coverage Articles
              <Badge variant="secondary" className="ml-1 text-xs">{coverageRows.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              Blog Articles
              <Badge variant="secondary" className="ml-1 text-xs">{blogRows.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <MetaTabPanel contentType="page" rows={STATIC_PAGES} />
          </TabsContent>
          <TabsContent value="coverage">
            <MetaTabPanel contentType="coverage" rows={coverageRows} />
          </TabsContent>
          <TabsContent value="blog">
            <MetaTabPanel contentType="blog" rows={blogRows} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ── Slug registries (sourced from data files) ─────────────────────────────────
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
