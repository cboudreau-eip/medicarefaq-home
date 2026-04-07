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
    title: "New To Medicare",
    href: "/medicare-101",
    color: "#0D9488",
    items: [
      {
        title: "Medicare 101 Guide",
        description: "Everything you need to know about Medicare basics",
        icon: Compass,
        href: "/medicare-101",
      },
      {
        title: "Am I Eligible?",
        description: "Find out if you qualify for Medicare coverage",
        icon: HelpCircle,
        href: "/new-to-medicare/eligibility",
      },
      {
        title: "Turning 65 Timeline",
        description: "Key dates and deadlines as you approach 65",
        icon: Clock,
        href: "/new-to-medicare/turning-65",
      },
      {
        title: "What Does It Cost?",
        description: "Understand premiums, deductibles, and out-of-pocket costs",
        icon: DollarSign,
        href: "/new-to-medicare/costs",
      },
      {
        title: "Getting Started Checklist",
        description: "Step-by-step checklist for new Medicare enrollees",
        icon: CheckSquare,
        href: "/new-to-medicare/checklist",
      },
    ],
    sidebarTitle: "QUICK START",
    sidebarItems: [
      {
        title: "New to Medicare? Begin Here",
        description: "Our most popular guide for people approaching 65.",
        href: "/medicare-101",
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
        href: "/compare-rates",
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
        href: "/enrollment/turning-65",
        cta: "Check Your Timeline",
      },
    ],
  },
  {
    title: "Coverage",
    href: "/faqs",
    color: "#059669",
    items: [
      {
        title: "All Coverage FAQs",
        description: "Browse all Medicare coverage questions and answers",
        icon: HelpCircle,
        href: "/faqs",
      },
      {
        title: "Dental, Vision & Hearing",
        description: "Coverage for dental implants, glasses, and hearing aids",
        icon: Eye,
        href: "/faqs/does-medicare-cover-dental-implants",
      },
      {
        title: "Medicare Costs in 2026",
        description: "Premiums, deductibles, and key changes for 2026",
        icon: DollarSign,
        href: "/faqs/medicare-costs-in-2026-premiums-deductibles-and-key-changes",
      },
      {
        title: "Medicare Advantage Extra Benefits",
        description: "What's really included in MA extra benefits",
        icon: Heart,
        href: "/faqs/medicare-advantage-extra-benefits-explained-whats-really-included",
      },
      {
        title: "Medigap vs Medicare Advantage",
        description: "Crucial questions to ask before enrolling",
        icon: Stethoscope,
        href: "/faqs/medicare-supplement-vs-medicare-advantage-crucial-questions-to-ask-before-enrolling",
      },
      {
        title: "Enrolling While Working",
        description: "When to enroll if you're still employed past 65",
        icon: Activity,
        href: "/faqs/when-should-you-enroll-in-medicare-if-still-working",
      },
    ],
    sidebarTitle: "POPULAR COVERAGE TOPICS",
    sidebarItems: [
      {
        title: "Does Medicare Cover Dental Implants?",
        href: "/faqs/does-medicare-cover-dental-implants",
      },
      {
        title: "Does Medicare Cover Hearing Aids?",
        href: "/faqs/does-medicare-cover-hearing-aids",
      },
      {
        title: "Pre-Existing Conditions",
        href: "/faqs/does-medicare-cover-pre-existing-conditions",
      },
      {
        title: "Veterans Coverage Guide",
        href: "/faqs/medicare-supplement-vs-medicare-advantage-for-veterans-choosing-the-right-coverage",
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
        href: "/blog",
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
        href: "/podcasts",
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
        href: "/faqs",
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
        href: "/medicare-plans/medicare-supplement",
      },
      {
        title: "Understanding Medicare Costs",
        href: "/new-to-medicare/costs",
      },
      {
        title: "When to Enroll in Medicare",
        href: "/enrollment/how-to-enroll",
      },
      {
        title: "Medicare vs. Medicaid",
        href: "/medicare-101",
      },
    ],
  },
];

export const utilityLinks = [
  { title: "About Us", href: "/about-us" },
  { title: "Blog", href: "/blog" },
  { title: "Coverage FAQs", href: "/faqs" },
  { title: "Contact", href: "/contact" },
];

export const trustBadges = [
  { label: "BBB A+ Rated", icon: "star" },
  { label: "Licensed Agents", icon: "shield" },
];
