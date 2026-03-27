/**
 * Medicare Enrollment Timeline Calculator
 * Calculates all relevant enrollment periods, deadlines, and penalties
 * based on the user's date of birth and employment/coverage status.
 */

export type EmploymentStatus =
  | "not-working"
  | "working-with-coverage"
  | "working-no-coverage"
  | "spouse-coverage";

export interface CalculatorInput {
  birthMonth: number; // 1-12
  birthYear: number;
  employmentStatus: EmploymentStatus;
  /** Only relevant if working-with-coverage or spouse-coverage */
  coverageEndMonth?: number;
  coverageEndYear?: number;
}

export interface TimelineEvent {
  id: string;
  date: Date;
  endDate?: Date;
  label: string;
  description: string;
  type: "milestone" | "window" | "deadline" | "warning" | "info";
  color: string;
  icon: string;
}

export interface CalculatorResult {
  birthday65: Date;
  iepStart: Date;
  iepEnd: Date;
  recommendedEnrollBy: Date;
  coverageStartIfOnTime: Date;
  medigapOepStart: Date;
  medigapOepEnd: Date;
  hasEmployerCoverage: boolean;
  sepStart?: Date;
  sepEnd?: Date;
  nextGep?: { start: Date; end: Date; coverageStart: Date };
  nextAep: { start: Date; end: Date };
  penaltyMonths: number;
  penaltyPercent: number;
  monthlyPenaltyAmount: number;
  standardPremium2026: number;
  events: TimelineEvent[];
  personalizedTips: string[];
}

const STANDARD_PART_B_PREMIUM = 202.9;

function addMonths(date: Date, months: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth() + months, 1);
  return result;
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function calculateTimeline(input: CalculatorInput): CalculatorResult {
  const { birthMonth, birthYear, employmentStatus } = input;

  // 65th birthday — first day of birth month
  const birthday65 = new Date(birthYear + 65, birthMonth - 1, 1);

  // IEP: 3 months before birth month through 3 months after
  const iepStart = addMonths(birthday65, -3);
  const iepEnd = addMonths(birthday65, 3);

  // Recommended: enroll 1-3 months before birth month for coverage starting on birthday month
  const recommendedEnrollBy = new Date(birthday65.getTime());
  recommendedEnrollBy.setDate(recommendedEnrollBy.getDate() - 1); // last day before birth month

  // If enrolled during the 3 months before birth month, coverage starts 1st of birth month
  const coverageStartIfOnTime = new Date(birthday65.getTime());

  // Medigap OEP: 6 months starting when you're 65+ AND have Part B
  const medigapOepStart = new Date(birthday65.getTime());
  const medigapOepEnd = addMonths(medigapOepStart, 6);

  // Employer coverage logic
  const hasEmployerCoverage =
    employmentStatus === "working-with-coverage" ||
    employmentStatus === "spouse-coverage";

  let sepStart: Date | undefined;
  let sepEnd: Date | undefined;

  if (hasEmployerCoverage && input.coverageEndMonth && input.coverageEndYear) {
    // SEP: 8-month window starting the month after coverage ends
    const coverageEnd = new Date(input.coverageEndYear, input.coverageEndMonth - 1, 1);
    sepStart = addMonths(coverageEnd, 1);
    sepEnd = addMonths(coverageEnd, 8);
  }

  // Calculate penalty (only if not working with employer coverage)
  let penaltyMonths = 0;
  let penaltyPercent = 0;
  let monthlyPenaltyAmount = 0;

  // Next AEP (Annual Election Period for MA/Part D): Oct 15 - Dec 7
  const now = new Date();
  let aepYear = now.getFullYear();
  const aepStartCheck = new Date(aepYear, 9, 15); // Oct 15
  if (now > new Date(aepYear, 11, 7)) {
    aepYear++;
  }
  const nextAep = {
    start: new Date(aepYear, 9, 15),
    end: new Date(aepYear, 11, 7),
  };

  // Next GEP (General Enrollment Period): Jan 1 - Mar 31, coverage starts July 1
  let gepYear = now.getFullYear();
  if (now > new Date(gepYear, 2, 31)) {
    gepYear++;
  }
  const nextGep = {
    start: new Date(gepYear, 0, 1),
    end: new Date(gepYear, 2, 31),
    coverageStart: new Date(gepYear, 6, 1),
  };

  // Build timeline events
  const events: TimelineEvent[] = [];

  // IEP Start
  events.push({
    id: "iep-start",
    date: iepStart,
    label: "IEP Begins",
    description: `Your Initial Enrollment Period opens. You can sign up for Medicare Part A and Part B starting ${formatMonthYear(iepStart)}.`,
    type: "window",
    color: "#0D9488",
    icon: "calendar-check",
  });

  // Recommended enrollment window
  events.push({
    id: "recommended",
    date: iepStart,
    endDate: birthday65,
    label: "Best Time to Enroll",
    description: `Sign up during ${formatMonthYear(iepStart)} – ${formatMonthYear(addMonths(birthday65, -1))} for coverage starting ${formatMonthYear(birthday65)}. This is the recommended window to avoid any gaps.`,
    type: "info",
    color: "#059669",
    icon: "star",
  });

  // 65th Birthday
  events.push({
    id: "birthday-65",
    date: birthday65,
    label: "You Turn 65",
    description: `Your 65th birthday month. If you enrolled in the 3 months prior, your Medicare coverage begins ${formatMonthYear(birthday65)}.`,
    type: "milestone",
    color: "#1B2A4A",
    icon: "cake",
  });

  // Medigap OEP
  events.push({
    id: "medigap-oep",
    date: medigapOepStart,
    endDate: medigapOepEnd,
    label: "Medigap Open Enrollment",
    description: `Your 6-month Medigap Open Enrollment Period. During ${formatMonthYear(medigapOepStart)} – ${formatMonthYear(medigapOepEnd)}, insurers cannot deny you a Medigap policy or charge more for pre-existing conditions.`,
    type: "window",
    color: "#4F46E5",
    icon: "shield",
  });

  // IEP End
  events.push({
    id: "iep-end",
    date: iepEnd,
    label: "IEP Closes",
    description: `Your Initial Enrollment Period ends ${formatMonthYear(iepEnd)}. If you haven't enrolled by now and don't have qualifying employer coverage, you may face late enrollment penalties.`,
    type: "deadline",
    color: "#DC2626",
    icon: "alert-triangle",
  });

  // Employer coverage events
  if (hasEmployerCoverage) {
    events.push({
      id: "employer-note",
      date: birthday65,
      label: "Employer Coverage Active",
      description:
        employmentStatus === "working-with-coverage"
          ? "Since you have employer coverage through your own job (employer with 20+ employees), you can delay Part B enrollment without penalty."
          : "Since you have employer coverage through your spouse's job (employer with 20+ employees), you can delay Part B enrollment without penalty.",
      type: "info",
      color: "#D97706",
      icon: "briefcase",
    });

    if (sepStart && sepEnd) {
      events.push({
        id: "sep-start",
        date: sepStart,
        endDate: sepEnd,
        label: "Special Enrollment Period",
        description: `Your 8-month Special Enrollment Period runs ${formatMonthYear(sepStart)} – ${formatMonthYear(sepEnd)}. Enroll in Part B during this window to avoid late penalties.`,
        type: "window",
        color: "#D97706",
        icon: "clock",
      });

      events.push({
        id: "sep-end",
        date: sepEnd,
        label: "SEP Deadline",
        description: `Your Special Enrollment Period closes ${formatMonthYear(sepEnd)}. Missing this deadline means waiting for the General Enrollment Period (Jan–Mar) and facing potential penalties.`,
        type: "deadline",
        color: "#DC2626",
        icon: "alert-triangle",
      });
    }
  }

  // AEP
  events.push({
    id: "next-aep",
    date: nextAep.start,
    endDate: nextAep.end,
    label: "Annual Election Period",
    description: `Oct 15 – Dec 7, ${nextAep.start.getFullYear()}: You can join, switch, or drop a Medicare Advantage or Part D plan. Changes take effect January 1.`,
    type: "window",
    color: "#7C3AED",
    icon: "repeat",
  });

  // Sort events by date
  events.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Personalized tips
  const personalizedTips: string[] = [];

  if (!hasEmployerCoverage) {
    personalizedTips.push(
      `Sign up for Medicare during your Initial Enrollment Period (${formatMonthYear(iepStart)} – ${formatMonthYear(iepEnd)}) to get the earliest possible coverage and avoid penalties.`
    );
    personalizedTips.push(
      `For the earliest coverage start date of ${formatMonthYear(birthday65)}, enroll during the 3 months before your birth month.`
    );
    personalizedTips.push(
      "Consider enrolling in a Medigap (Medicare Supplement) plan during your 6-month Medigap Open Enrollment Period for guaranteed-issue coverage."
    );
    personalizedTips.push(
      "If you need prescription drug coverage, also enroll in a Part D plan during your IEP to avoid the Part D late enrollment penalty."
    );
  } else {
    personalizedTips.push(
      "You can safely delay Medicare Part B while you have creditable employer coverage from a company with 20+ employees."
    );
    personalizedTips.push(
      "Sign up for free Part A when you turn 65 — there's no reason to delay it, and it can serve as secondary coverage."
    );
    if (sepStart && sepEnd) {
      personalizedTips.push(
        `When your employer coverage ends, enroll in Part B during your 8-month Special Enrollment Period (${formatMonthYear(sepStart)} – ${formatMonthYear(sepEnd)}) to avoid penalties.`
      );
    } else {
      personalizedTips.push(
        "When your employer coverage ends, you'll have an 8-month Special Enrollment Period to sign up for Part B without penalty."
      );
    }
    personalizedTips.push(
      "Your Medigap Open Enrollment Period starts when you enroll in Part B (if you're 65+). This is your best window for guaranteed-issue Medigap coverage."
    );
  }

  personalizedTips.push(
    `The standard Part B premium for 2026 is $${STANDARD_PART_B_PREMIUM.toFixed(2)}/month. Higher earners may pay more (IRMAA surcharge).`
  );

  return {
    birthday65,
    iepStart,
    iepEnd,
    recommendedEnrollBy,
    coverageStartIfOnTime,
    medigapOepStart,
    medigapOepEnd,
    hasEmployerCoverage,
    sepStart,
    sepEnd,
    nextGep,
    nextAep,
    penaltyMonths,
    penaltyPercent,
    monthlyPenaltyAmount,
    standardPremium2026: STANDARD_PART_B_PREMIUM,
    events,
    personalizedTips,
  };
}
