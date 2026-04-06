import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Shield,
  Loader2,
  Search,
  FileText,
  BookOpen,
  Newspaper,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  ArrowLeft,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";
import type {
  PageAudit,
  FullAuditResult,
  IssueSeverity,
  SEOIssue,
} from "@shared/seo-audit";

// ── Types ────────────────────────────────────────────────────────────────────
type GradeFilter = "all" | "A" | "B" | "C" | "D" | "F";
type SeverityFilter = "all" | "error" | "warning" | "info";
type SortField = "score" | "label" | "issues";
type SortDir = "asc" | "desc";

// ── Grade colors ─────────────────────────────────────────────────────────────
const GRADE_COLORS: Record<string, { bg: string; text: string; ring: string; border: string }> = {
  A: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "#059669", border: "border-emerald-200" },
  B: { bg: "bg-blue-50", text: "text-blue-700", ring: "#2563eb", border: "border-blue-200" },
  C: { bg: "bg-amber-50", text: "text-amber-700", ring: "#d97706", border: "border-amber-200" },
  D: { bg: "bg-orange-50", text: "text-orange-700", ring: "#ea580c", border: "border-orange-200" },
  F: { bg: "bg-red-50", text: "text-red-700", ring: "#dc2626", border: "border-red-200" },
};

const SEVERITY_STYLES: Record<IssueSeverity, { bg: string; text: string; icon: typeof AlertCircle }> = {
  error: { bg: "bg-red-50 border-red-200", text: "text-red-700", icon: AlertCircle },
  warning: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", icon: AlertTriangle },
  info: { bg: "bg-blue-50 border-blue-200", text: "text-blue-600", icon: Info },
};

// ── Large Score Ring ─────────────────────────────────────────────────────────
function ScoreRing({ score, grade, size = 120 }: { score: number; grade: string; size?: number }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = GRADE_COLORS[grade]?.ring ?? "#9ca3af";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth="8"
      />
      {score > 0 && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dasharray 0.8s ease-out",
          }}
        />
      )}
      <text
        x={size / 2}
        y={size / 2 - 6}
        textAnchor="middle"
        fontSize={size * 0.28}
        fontWeight="800"
        fill={color}
      >
        {grade}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 16}
        textAnchor="middle"
        fontSize={size * 0.12}
        fontWeight="600"
        fill="#6b7280"
      >
        {score}/100
      </text>
    </svg>
  );
}

// ── Small inline score bar ───────────────────────────────────────────────────
function ScoreBar({ score, grade }: { score: number; grade: string }) {
  const color = GRADE_COLORS[grade]?.ring ?? "#9ca3af";
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold" style={{ color, minWidth: 28, textAlign: "right" }}>
        {score}
      </span>
    </div>
  );
}

// ── Category card ────────────────────────────────────────────────────────────
function CategoryCard({
  label,
  icon: Icon,
  count,
  avgScore,
  grade,
}: {
  label: string;
  icon: typeof FileText;
  count: number;
  avgScore: number;
  grade: string;
}) {
  const gc = GRADE_COLORS[grade] ?? GRADE_COLORS.F;
  return (
    <div className={`rounded-xl border ${gc.border} ${gc.bg} p-4 flex items-center gap-4`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${gc.bg}`}>
        <Icon className={`w-5 h-5 ${gc.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-xs text-gray-500">{count} pages</p>
      </div>
      <div className="text-right">
        <span className={`text-lg font-bold ${gc.text}`}>{grade}</span>
        <p className="text-[10px] text-gray-400">{avgScore}/100</p>
      </div>
    </div>
  );
}

// ── Issue badge ──────────────────────────────────────────────────────────────
function IssueBadge({ issue }: { issue: SEOIssue }) {
  const s = SEVERITY_STYLES[issue.severity];
  const Icon = s.icon;
  return (
    <div className={`flex items-start gap-2 px-3 py-2 rounded-lg border ${s.bg}`}>
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.text}`} />
      <div className="min-w-0">
        <p className={`text-xs font-semibold ${s.text}`}>{issue.message}</p>
        {issue.suggestion && (
          <p className="text-[11px] text-gray-500 mt-0.5">{issue.suggestion}</p>
        )}
      </div>
    </div>
  );
}

// ── Expanded page detail ─────────────────────────────────────────────────────
function PageDetail({ page, onClose }: { page: PageAudit; onClose: () => void }) {
  const gc = GRADE_COLORS[page.grade] ?? GRADE_COLORS.F;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <ChevronUp className="w-4 h-4" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-gray-900">{page.label}</h3>
            <p className="text-xs text-gray-400">{page.path}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-lg font-black ${gc.text}`}>{page.grade}</span>
          <span className="text-sm font-semibold text-gray-500">{page.score}/100</span>
          <a
            href={`/admin?edit=${page.contentType}:${page.slug}`}
            className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Edit <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Field values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Meta Title</p>
          <p className="text-xs text-gray-700 break-words">
            {page.fields.metaTitle || <span className="text-red-400 italic">Missing</span>}
          </p>
          {page.fields.metaTitle && (
            <p className="text-[10px] text-gray-400 mt-1">{page.fields.metaTitle.length} characters</p>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Meta Description</p>
          <p className="text-xs text-gray-700 break-words">
            {page.fields.metaDescription || <span className="text-red-400 italic">Missing</span>}
          </p>
          {page.fields.metaDescription && (
            <p className="text-[10px] text-gray-400 mt-1">{page.fields.metaDescription.length} characters</p>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">OG Image</p>
          {page.fields.ogImage ? (
            <div className="flex items-center gap-2">
              <img
                src={page.fields.ogImage}
                alt="OG preview"
                className="w-16 h-9 object-cover rounded border border-gray-200"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <p className="text-xs text-gray-500 truncate flex-1">{page.fields.ogImage}</p>
            </div>
          ) : (
            <span className="text-xs text-red-400 italic">Missing</span>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Image Alt Text</p>
          <p className="text-xs text-gray-700 break-words">
            {page.fields.imageAltText || <span className="text-amber-500 italic">Missing</span>}
          </p>
        </div>
      </div>

      {/* Issues */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Issues ({page.issues.length})
        </p>
        {page.issues.map((issue: SEOIssue, idx: number) => (
          <IssueBadge key={idx} issue={issue} />
        ))}
      </div>
    </div>
  );
}

// ── Distribution bar chart ───────────────────────────────────────────────────
function DistributionChart({ distribution }: { distribution: Record<string, number> }) {
  const total = Object.values(distribution).reduce((s, v) => s + v, 0);
  if (total === 0) return null;
  const grades: Array<"A" | "B" | "C" | "D" | "F"> = ["A", "B", "C", "D", "F"];
  const maxCount = Math.max(...Object.values(distribution), 1);

  return (
    <div className="flex items-end gap-2 h-24">
      {grades.map((g) => {
        const count = distribution[g] ?? 0;
        const pct = (count / maxCount) * 100;
        const gc = GRADE_COLORS[g];
        return (
          <div key={g} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-gray-500">{count}</span>
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{
                height: `${Math.max(pct, 4)}%`,
                backgroundColor: gc.ring,
                opacity: count === 0 ? 0.2 : 1,
              }}
            />
            <span className={`text-xs font-bold ${gc.text}`}>{g}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── CSV export ───────────────────────────────────────────────────────────────
function exportCSV(pages: PageAudit[]) {
  const headers = [
    "Page",
    "Path",
    "Type",
    "Score",
    "Grade",
    "Title",
    "Title Length",
    "Description",
    "Description Length",
    "OG Image",
    "Alt Text",
    "Errors",
    "Warnings",
    "Issues",
  ];

  const rows = pages.map((p) => [
    `"${p.label.replace(/"/g, '""')}"`,
    p.path,
    p.contentType,
    p.score,
    p.grade,
    `"${p.fields.metaTitle.replace(/"/g, '""')}"`,
    p.fields.metaTitle.length,
    `"${p.fields.metaDescription.replace(/"/g, '""')}"`,
    p.fields.metaDescription.length,
    p.fields.ogImage ? "Yes" : "No",
    p.fields.imageAltText ? "Yes" : "No",
    p.issues.filter((i: SEOIssue) => i.severity === "error").length,
    p.issues.filter((i: SEOIssue) => i.severity === "warning").length,
    `"${p.issues.map((i: SEOIssue) => i.code).join("; ")}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `seo-audit-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Audit report exported as CSV");
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function scoreToGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  return "F";
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function SEOAudit() {
  const { user, loading } = useAuth();
  const { data: audit, isLoading: auditLoading } = trpc.cms.audit.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("all");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [sortField, setSortField] = useState<SortField>("score");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  // Filter and sort pages
  const filteredPages = useMemo(() => {
    if (!audit?.pages) return [];
    let pages = [...audit.pages];

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      pages = pages.filter(
        (p) =>
          p.label.toLowerCase().includes(q) ||
          p.path.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    // Grade filter
    if (gradeFilter !== "all") {
      pages = pages.filter((p) => p.grade === gradeFilter);
    }

    // Severity filter
    if (severityFilter !== "all") {
      pages = pages.filter((p) =>
        p.issues.some((i) => i.severity === severityFilter)
      );
    }

    // Sort
    pages.sort((a, b) => {
      let cmp = 0;
      if (sortField === "score") cmp = a.score - b.score;
      else if (sortField === "label") cmp = a.label.localeCompare(b.label);
      else if (sortField === "issues") cmp = a.issues.length - b.issues.length;
      return sortDir === "desc" ? -cmp : cmp;
    });

    return pages;
  }, [audit, search, gradeFilter, severityFilter, sortField, sortDir]);

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
          <p className="text-gray-500">Please sign in to access the SEO Audit.</p>
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
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

  if (auditLoading || !audit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto" />
          <p className="text-sm text-gray-500 font-medium">Running SEO audit across {93} pages...</p>
        </div>
      </div>
    );
  }

  const { summary } = audit;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Top Nav ── */}
      <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between flex-shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <a href="/admin" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-black">M</span>
          </div>
          <span className="font-bold text-gray-900 text-sm">SEO Audit Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportCSV(audit.pages)}
            className="text-xs gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </Button>
          <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-1 rounded-full">
            Admin
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* ── Hero Summary ── */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Overall Score */}
              <div className="lg:col-span-3 flex flex-col items-center justify-center">
                <ScoreRing score={summary.averageScore} grade={summary.overallGrade} size={140} />
                <p className="text-sm font-semibold text-gray-600 mt-2">Overall SEO Health</p>
                <p className="text-xs text-gray-400">{summary.totalPages} pages audited</p>
              </div>

              {/* Issue counts */}
              <div className="lg:col-span-4 flex flex-col justify-center gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" /> Issue Summary
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mx-auto mb-1" />
                    <p className="text-2xl font-black text-red-700">{summary.issueBreakdown.errors}</p>
                    <p className="text-[10px] font-semibold text-red-500 uppercase">Errors</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                    <p className="text-2xl font-black text-amber-700">{summary.issueBreakdown.warnings}</p>
                    <p className="text-[10px] font-semibold text-amber-500 uppercase">Warnings</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                    <Info className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-2xl font-black text-blue-700">{summary.issueBreakdown.info}</p>
                    <p className="text-[10px] font-semibold text-blue-500 uppercase">Info</p>
                  </div>
                </div>
              </div>

              {/* Grade distribution */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-3">
                  <BarChart3 className="w-3.5 h-3.5" /> Grade Distribution
                </h3>
                <DistributionChart distribution={summary.distribution} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* ── Category Scores ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <CategoryCard
              label="Standalone Pages"
              icon={FileText}
              count={summary.categoryScores.page.count}
              avgScore={summary.categoryScores.page.avgScore}
              grade={scoreToGrade(summary.categoryScores.page.avgScore)}
            />
            <CategoryCard
              label="Coverage FAQs"
              icon={BookOpen}
              count={summary.categoryScores.coverage.count}
              avgScore={summary.categoryScores.coverage.avgScore}
              grade={scoreToGrade(summary.categoryScores.coverage.avgScore)}
            />
            <CategoryCard
              label="Blog Articles"
              icon={Newspaper}
              count={summary.categoryScores.blog.count}
              avgScore={summary.categoryScores.blog.avgScore}
              grade={scoreToGrade(summary.categoryScores.blog.avgScore)}
            />
          </div>

          {/* ── Top Issues ── */}
          {summary.topIssues.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-4">
                <Zap className="w-3.5 h-3.5" /> Most Common Issues
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {summary.topIssues.map((issue, i) => {
                  const s = SEVERITY_STYLES[issue.severity];
                  const Icon = s.icon;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${s.bg}`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${s.text}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold ${s.text}`}>{issue.code.replace(/_/g, " ")}</p>
                        <p className="text-[11px] text-gray-500 truncate">{issue.message}</p>
                      </div>
                      <span className={`text-sm font-black ${s.text}`}>{issue.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Filters & Search ── */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search pages..."
                  className="pl-9 text-sm h-9"
                />
              </div>

              {/* Grade filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase text-gray-400">Grade:</span>
                {(["all", "A", "B", "C", "D", "F"] as GradeFilter[]).map((g) => {
                  const isActive = gradeFilter === g;
                  const gc = g === "all" ? null : GRADE_COLORS[g];
                  return (
                    <button
                      key={g}
                      onClick={() => setGradeFilter(g)}
                      className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                        isActive
                          ? gc
                            ? `${gc.bg} ${gc.text} border ${gc.border}`
                            : "bg-gray-800 text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {g === "all" ? "All" : g}
                    </button>
                  );
                })}
              </div>

              {/* Severity filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase text-gray-400">Issues:</span>
                {(["all", "error", "warning", "info"] as SeverityFilter[]).map((s) => {
                  const isActive = severityFilter === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSeverityFilter(s)}
                      className={`px-2 py-1 rounded text-xs font-semibold transition-all capitalize ${
                        isActive
                          ? s === "error"
                            ? "bg-red-100 text-red-700"
                            : s === "warning"
                            ? "bg-amber-100 text-amber-700"
                            : s === "info"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-800 text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {s === "all" ? "All" : s + "s"}
                    </button>
                  );
                })}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-[10px] font-bold uppercase text-gray-400">Sort:</span>
                {(["score", "label", "issues"] as SortField[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      if (sortField === f) {
                        setSortDir(sortDir === "asc" ? "desc" : "asc");
                      } else {
                        setSortField(f);
                        setSortDir(f === "score" ? "asc" : "desc");
                      }
                    }}
                    className={`px-2 py-1 rounded text-xs font-semibold capitalize flex items-center gap-1 transition-all ${
                      sortField === f
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {f}
                    {sortField === f && (
                      sortDir === "asc" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )
                    )}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Showing {filteredPages.length} of {summary.totalPages} pages
            </p>
          </div>

          {/* ── Page List ── */}
          <div className="space-y-2">
            {filteredPages.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No pages match your filters</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setGradeFilter("all");
                    setSeverityFilter("all");
                  }}
                  className="mt-2 text-sm text-indigo-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredPages.map((page) => {
                const isExpanded = expandedSlug === `${page.contentType}:${page.slug}`;
                const gc = GRADE_COLORS[page.grade] ?? GRADE_COLORS.F;
                const errorCount = page.issues.filter((i) => i.severity === "error").length;
                const warnCount = page.issues.filter((i) => i.severity === "warning").length;
                const typeIcon =
                  page.contentType === "coverage" ? BookOpen :
                  page.contentType === "blog" ? Newspaper : FileText;
                const TypeIcon = typeIcon;

                if (isExpanded) {
                  return (
                    <PageDetail
                      key={`${page.contentType}:${page.slug}`}
                      page={page}
                      onClose={() => setExpandedSlug(null)}
                    />
                  );
                }

                return (
                  <button
                    key={`${page.contentType}:${page.slug}`}
                    onClick={() => setExpandedSlug(`${page.contentType}:${page.slug}`)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-4 hover:border-gray-300 hover:shadow-sm transition-all text-left group"
                  >
                    {/* Grade badge */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${gc.bg}`}
                    >
                      <span className={`text-sm font-black ${gc.text}`}>{page.grade}</span>
                    </div>

                    {/* Page info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                        <p className="text-sm font-semibold text-gray-800 truncate">{page.label}</p>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{page.path}</p>
                    </div>

                    {/* Score bar */}
                    <div className="hidden sm:block">
                      <ScoreBar score={page.score} grade={page.grade} />
                    </div>

                    {/* Issue counts */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {errorCount > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                          <AlertCircle className="w-3 h-3" />
                          {errorCount}
                        </span>
                      )}
                      {warnCount > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3" />
                          {warnCount}
                        </span>
                      )}
                    </div>

                    <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                  </button>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
