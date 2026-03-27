import {
  Compass,
  HelpCircle,
  Clock,
  DollarSign,
  CheckSquare,
  Shield,
  Heart,
  Users,
  Pill,
  BarChart3,
  Calendar,
  Briefcase,
  FileText,
  AlertCircle,
  ArrowRightLeft,
  Eye,
  Ear,
  Stethoscope,
  Activity,
  BookOpen,
  Headphones,
  Video,
  MessageCircle,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export interface NavSidebarItem {
  title: string;
  href: string;
  description?: string;
  cta?: string;
}

export interface NavCategory {
  title: string;
  href: string;
  color: string;
  items: NavSubItem[];
  sidebarTitle?: string;
  sidebarItems?: NavSidebarItem[];
}

export const navigationData: NavCategory[] = [
  {
    title: "Start Here",
    href: "/start-here",
    color: "#0D9488",
    items: [
      {
        title: "Medicare 101 Guide",
        description: "Everything you need to know about Medicare basics",
        icon: Compass,
        href: "/start-here/medicare-101",
      },
      {
        title: "Am I Eligible?",
        description: "Find out if you qualify for Medicare coverage",
        icon: HelpCircle,
        href: "/start-here/eligibility",
      },
      {
        title: "Turning 65 Timeline",
        description: "Key dates and deadlines as you approach 65",
        icon: Clock,
        href: "/start-here/turning-65",
      },
      {
        title: "What Does It Cost?",
        description: "Understand premiums, deductibles, and out-of-pocket costs",
        icon: DollarSign,
        href: "/start-here/costs",
      },
      {
        title: "Getting Started Checklist",
        description: "Step-by-step checklist for new Medicare enrollees",
        icon: CheckSquare,
        href: "/start-here/checklist",
      },
    ],
    sidebarTitle: "QUICK START",
    sidebarItems: [
      {
        title: "New to Medicare? Start Here",
        description: "Our most popular guide for people approaching 65.",
        href: "/start-here/medicare-101",
        cta: "Read the Guide",
      },
    ],
  },
  {
    title: "Medicare Plans",
    href: "/medicare-plans",
    color: "#1B2A4A",
    items: [
      {
        title: "Original Medicare (Parts A & B)",
        description: "Hospital and medical insurance basics",
        icon: Shield,
        href: "/medicare-plans/original-medicare",
      },
      {
        title: "Medicare Supplement",
        description: "Fill the gaps in Original Medicare coverage",
        icon: Heart,
        href: "/medicare-plans/medicare-supplement",
      },
      {
        title: "Medicare Advantage (Part C)",
        description: "All-in-one alternative to Original Medicare",
        icon: Users,
        href: "/medicare-plans/medicare-advantage",
      },
      {
        title: "Medicare Part D (Prescription Drug Plans)",
        description: "Prescription drug coverage options",
        icon: Pill,
        href: "/medicare-plans/part-d",
      },
      {
        title: "Compare Medicare Plans",
        description: "Side-by-side comparison of every plan type",
        icon: BarChart3,
        href: "/medicare-plans/compare",
      },
      {
        title: "Medicare Costs",
        description: "What you'll pay for each plan type",
        icon: DollarSign,
        href: "/medicare-plans/costs",
      },
    ],
    sidebarTitle: "POPULAR COMPARISON",
    sidebarItems: [
      {
        title: "Medicare Supplement vs. Medicare Advantage",
        description:
          "The most common decision new enrollees face. See the pros, cons, and costs side by side.",
        href: "/medicare-plans/supplement-vs-advantage",
        cta: "Compare Now",
      },
      {
        title: "Best Medicare Supplement Plans 2026",
        description: "Plan F, G, and N compared with current rates.",
        href: "/medicare-plans/best-supplement-plans",
        cta: "See Rankings",
      },
    ],
  },
  {
    title: "Enrollment",
    href: "/enrollment",
    color: "#D97706",
    items: [
      {
        title: "Turning 65 Enrollment",
        description: "How to enroll when you first become eligible",
        icon: Calendar,
        href: "/enrollment/turning-65",
      },
      {
        title: "Working Past 65",
        description: "Medicare & employer coverage coordination",
        icon: Briefcase,
        href: "/enrollment/working-past-65",
      },
      {
        title: "Annual Changes",
        description: "What changes each year and how it affects you",
        icon: ArrowRightLeft,
        href: "/enrollment/annual-changes",
      },
      {
        title: "Late Penalties",
        description: "Avoid costly late enrollment penalties",
        icon: AlertCircle,
        href: "/enrollment/late-penalties",
      },
      {
        title: "How to Enroll",
        description: "Step-by-step enrollment process guide",
        icon: FileText,
        href: "/enrollment/how-to-enroll",
      },
    ],
    sidebarTitle: "ENROLLMENT HELP",
    sidebarItems: [
      {
        title: "When Should I Enroll?",
        description:
          "Timing matters. Find your enrollment window and avoid penalties.",
        href: "/enrollment/when-to-enroll",
        cta: "Check Your Timeline",
      },
    ],
  },
  {
    title: "Coverage",
    href: "/coverage",
    color: "#059669",
    items: [
      {
        title: "Does Medicare Cover...?",
        description: "Search what Medicare covers and what it doesn't",
        icon: HelpCircle,
        href: "/coverage/does-medicare-cover",
      },
      {
        title: "Dental, Vision & Hearing",
        description: "Coverage options for dental, vision, and hearing",
        icon: Eye,
        href: "/coverage/dental-vision-hearing",
      },
      {
        title: "Specialized Care",
        description: "Coverage for specific conditions and treatments",
        icon: Stethoscope,
        href: "/coverage/specialized-care",
      },
      {
        title: "Prescription Drugs",
        description: "How Medicare covers your medications",
        icon: Pill,
        href: "/coverage/prescription-drugs",
      },
      {
        title: "Search All Coverage",
        description: "Browse our complete coverage database",
        icon: Activity,
        href: "/coverage/search",
      },
    ],
    sidebarTitle: "COVERAGE QUESTIONS",
    sidebarItems: [
      {
        title: "Does Medicare Cover Dental?",
        href: "/coverage/dental-vision-hearing",
      },
      {
        title: "Does Medicare Cover Hearing Aids?",
        href: "/coverage/dental-vision-hearing",
      },
      {
        title: "Pre-Existing Conditions",
        href: "/coverage/pre-existing-conditions",
      },
    ],
  },
  {
    title: "Medicare Library",
    href: "/library",
    color: "#4F46E5",
    items: [
      {
        title: "Blog",
        description: "Latest Medicare news, tips, and analysis",
        icon: BookOpen,
        href: "/library/blog",
      },
      {
        title: "Guides",
        description: "In-depth guides on Medicare topics",
        icon: FileText,
        href: "/library/guides",
      },
      {
        title: "Podcast",
        description: "Medicare explained in audio format",
        icon: Headphones,
        href: "/library/podcast",
      },
      {
        title: "Videos",
        description: "Visual explanations of Medicare concepts",
        icon: Video,
        href: "/library/videos",
      },
      {
        title: "FAQs",
        description: "Quick answers to common questions",
        icon: MessageCircle,
        href: "/library/faqs",
      },
      {
        title: "About Our Team",
        description: "Meet our licensed Medicare experts",
        icon: UserCheck,
        href: "/library/about",
      },
    ],
    sidebarTitle: "MOST POPULAR",
    sidebarItems: [
      {
        title: "Medicare Supplement Guide 2026",
        href: "/library/guides/supplement-guide",
      },
      {
        title: "Understanding Medicare Costs",
        href: "/library/guides/understanding-costs",
      },
      {
        title: "When to Enroll in Medicare",
        href: "/library/guides/when-to-enroll",
      },
      {
        title: "Medicare vs. Medicaid",
        href: "/library/guides/medicare-vs-medicaid",
      },
    ],
  },
];

export const utilityLinks = [
  { title: "About Us", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Guides", href: "/guides" },
  { title: "Contact", href: "/contact" },
];

export const trustBadges = [
  { label: "BBB A+ Rated", icon: "star" },
  { label: "Licensed Agents", icon: "shield" },
];
