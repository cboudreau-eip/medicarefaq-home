/**
 * Original Medicare Hub Pages Data
 * Data for 5 hub pages under /original-medicare/
 */

export interface OriginalMedicareHubPage {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  heroIcon: string;
  intro: string;
  sections: OriginalMedicareSection[];
  faqs: { q: string; a: string }[];
  relatedLinks: { label: string; href: string }[];
}

export interface OriginalMedicareSection {
  id: string;
  heading: string;
  content: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  callout?: { type: "info" | "warning" | "tip"; text: string };
}

export const originalMedicareHubPages: OriginalMedicareHubPage[] = [
  {
    slug: "medicare-coverage",
    path: "/original-medicare/medicare-coverage",
    title: "What Does Medicare Cover?",
    metaTitle: "What Does Medicare Cover in 2026? | Complete Coverage Guide",
    metaDescription: "A complete guide to Medicare coverage in 2026. Learn what Part A, Part B, Part C, and Part D cover — and what Medicare does not cover, including dental, vision, and long-term care.",
    heroSubtitle: "Medicare covers a broad range of health services, but it does not cover everything. Understanding exactly what is and is not covered helps you plan for gaps and choose the right supplemental coverage.",
    heroIcon: "Shield",
    intro: "Medicare is divided into four parts, each covering different types of health services. Part A covers hospital care, Part B covers outpatient medical services, Part C (Medicare Advantage) bundles Parts A and B through private insurers, and Part D covers prescription drugs.",
    sections: [
      {
        id: "part-a-coverage",
        heading: "Part A: Hospital Insurance Coverage",
        content: "Medicare Part A covers inpatient hospital care and related services:",
        bullets: [
          "Inpatient hospital stays (semi-private room, meals, nursing care, medications given during stay)",
          "Skilled nursing facility (SNF) care following a qualifying 3-day hospital stay",
          "Home health care (medically necessary, part-time or intermittent)",
          "Hospice care for terminal illness",
          "Inpatient mental health care",
        ],
        callout: { type: "info", text: "Part A does not cover custodial care (help with daily activities like bathing and dressing) unless it is combined with skilled nursing care." },
      },
      {
        id: "part-b-coverage",
        heading: "Part B: Medical Insurance Coverage",
        content: "Medicare Part B covers outpatient medical services and preventive care:",
        bullets: [
          "Doctor visits and specialist consultations",
          "Outpatient surgery and procedures",
          "Preventive screenings (mammograms, colonoscopies, bone density tests, etc.)",
          "Annual Wellness Visit",
          "Durable medical equipment (wheelchairs, walkers, CPAP machines)",
          "Mental health services (outpatient)",
          "Ambulance services",
          "Lab tests and X-rays",
          "Some home health care",
          "Certain vaccines (flu, pneumonia, COVID-19, hepatitis B)",
        ],
      },
      {
        id: "not-covered",
        heading: "What Medicare Does NOT Cover",
        content: "Original Medicare has significant coverage gaps that many beneficiaries are surprised by:",
        table: {
          headers: ["Service", "Covered by Medicare?", "Alternative"],
          rows: [
            ["Routine dental care", "No", "Dental insurance, Medicare Advantage"],
            ["Routine vision exams", "No", "Vision insurance, Medicare Advantage"],
            ["Hearing aids", "No", "Hearing benefit via Medicare Advantage"],
            ["Long-term custodial care", "No", "Long-term care insurance, Medicaid"],
            ["Prescription drugs (most)", "No", "Medicare Part D"],
            ["Cosmetic surgery", "No", "Out-of-pocket"],
            ["Routine foot care", "No", "Medicare Advantage"],
            ["Overseas medical care", "No", "Travel insurance, Medigap Plans C/D/F/G/M/N"],
          ],
        },
      },
      {
        id: "coverage-gaps",
        heading: "Filling Medicare Coverage Gaps",
        content: "Two main options exist for filling the gaps in Original Medicare:",
        bullets: [
          "Medicare Supplement (Medigap) — Private insurance that pays after Medicare. Covers cost-sharing (deductibles, copays, coinsurance) and some services Medicare partially covers. Does not add dental, vision, or hearing.",
          "Medicare Advantage (Part C) — Private plans that replace Original Medicare. Many include dental, vision, hearing, and fitness benefits. Typically have provider networks and prior authorization requirements.",
        ],
        callout: { type: "tip", text: "If you want the freedom to see any doctor nationwide without referrals, Original Medicare + Medigap is usually the better choice. If you want extra benefits like dental and vision in one plan, Medicare Advantage may be worth considering." },
      },
    ],
    faqs: [
      { q: "Does Medicare cover dental implants?", a: "Original Medicare does not cover routine dental care including implants. Some Medicare Advantage plans include dental benefits, but coverage for implants varies widely. Standalone dental insurance is another option." },
      { q: "Does Medicare cover hearing aids?", a: "Original Medicare does not cover hearing aids or routine hearing exams. Some Medicare Advantage plans include hearing benefits with an allowance toward hearing aids. Standalone hearing discount programs are also available." },
      { q: "Does Medicare cover glasses?", a: "Original Medicare covers eyeglasses only after cataract surgery that implants an intraocular lens. Routine vision exams and glasses are not covered. Many Medicare Advantage plans include a vision benefit." },
      { q: "Does Medicare cover long-term care?", a: "Medicare covers skilled nursing facility care for up to 100 days following a qualifying hospital stay, but it does not cover long-term custodial care (help with daily activities). Medicaid or long-term care insurance are the primary options for custodial care." },
    ],
    relatedLinks: [
      { label: "Medicare Part A", href: "/original-medicare/medicare-parts/medicare-part-a" },
      { label: "Medicare Part B", href: "/original-medicare/medicare-parts/medicare-part-b" },
      { label: "Medicare Supplement Plans", href: "/medicare-supplements" },
      { label: "Medicare Advantage", href: "/medicare-part-c/medicare-advantage-plans" },
    ],
  },
  {
    slug: "medicare-costs",
    path: "/original-medicare/medicare-costs",
    title: "Medicare Costs in 2026",
    metaTitle: "Medicare Costs 2026 | Premiums, Deductibles & Out-of-Pocket",
    metaDescription: "Complete guide to Medicare costs in 2026: Part A and Part B premiums, deductibles, coinsurance, IRMAA surcharges, and how to estimate your total annual Medicare spending.",
    heroSubtitle: "Understanding Medicare costs is essential for retirement planning. In 2026, most beneficiaries pay $0 for Part A but pay a monthly premium for Part B, plus deductibles and cost-sharing when they use services.",
    heroIcon: "DollarSign",
    intro: "Medicare costs include monthly premiums, annual deductibles, and cost-sharing when you use services. Higher-income beneficiaries also pay IRMAA surcharges. Here is a complete breakdown of what you can expect to pay in 2026.",
    sections: [
      {
        id: "part-a-costs",
        heading: "Part A Costs in 2026",
        content: "Most people pay $0 for Part A because they (or their spouse) worked and paid Medicare taxes for at least 10 years (40 quarters).",
        table: {
          headers: ["Cost Item", "2026 Amount"],
          rows: [
            ["Monthly premium (40+ quarters)", "$0"],
            ["Monthly premium (30–39 quarters)", "$285"],
            ["Monthly premium (fewer than 30 quarters)", "$518"],
            ["Inpatient deductible (per benefit period)", "$1,676"],
            ["Days 1–60 coinsurance", "$0"],
            ["Days 61–90 coinsurance", "$419/day"],
            ["Lifetime reserve days coinsurance", "$838/day"],
            ["SNF days 1–20", "$0"],
            ["SNF days 21–100", "$209.50/day"],
          ],
        },
        callout: { type: "info", text: "The Part A deductible applies per benefit period, not per year. A benefit period begins when you are admitted to a hospital and ends 60 days after discharge. You could potentially pay the deductible more than once in a year." },
      },
      {
        id: "part-b-costs",
        heading: "Part B Costs in 2026",
        content: "Part B has a monthly premium that everyone pays, plus a deductible and 20% coinsurance for most services.",
        table: {
          headers: ["Cost Item", "2026 Amount"],
          rows: [
            ["Standard monthly premium", "$185.00"],
            ["Annual deductible", "$257"],
            ["Coinsurance after deductible", "20% of Medicare-approved amount"],
            ["Outpatient mental health coinsurance", "20%"],
            ["Preventive services coinsurance", "$0 (no cost-sharing)"],
          ],
        },
        callout: { type: "warning", text: "Original Medicare has no out-of-pocket maximum for Part B. The 20% coinsurance can add up significantly for expensive procedures. A Medigap plan can cover this coinsurance and protect you from unlimited exposure." },
      },
      {
        id: "irmaa",
        heading: "IRMAA: Income-Related Premium Surcharges",
        content: "Higher-income beneficiaries pay additional amounts (IRMAA) on top of the standard Part B and Part D premiums. IRMAA is based on your income from two years prior (2024 income affects 2026 IRMAA).",
        table: {
          headers: ["Individual Income (2024)", "Part B Monthly Premium (2026)", "Part D IRMAA Surcharge"],
          rows: [
            ["$106,000 or less", "$185.00", "$0"],
            ["$106,001 – $133,000", "$259.00", "$13.70"],
            ["$133,001 – $167,000", "$370.00", "$35.30"],
            ["$167,001 – $200,000", "$480.90", "$57.00"],
            ["$200,001 – $500,000", "$591.90", "$78.60"],
            ["Above $500,000", "$628.90", "$85.80"],
          ],
        },
      },
      {
        id: "total-estimate",
        heading: "Estimating Your Total Annual Medicare Cost",
        content: "For a typical beneficiary using moderate healthcare services in 2026:",
        bullets: [
          "Part B premium: $185/month × 12 = $2,220/year",
          "Part B deductible: $257/year",
          "Part A deductible (if hospitalized): $1,676 per benefit period",
          "Part D premium: ~$46/month × 12 = ~$552/year",
          "Part D deductible: up to $590/year",
          "Drug copays: varies by medications",
          "Total baseline (no hospitalization): ~$3,600+/year",
        ],
        callout: { type: "tip", text: "Adding a Medigap Plan G costs roughly $100–$200/month but eliminates most of the unpredictable cost-sharing. For many beneficiaries, this provides better financial predictability than Original Medicare alone." },
      },
    ],
    faqs: [
      { q: "How much does Medicare cost per month in 2026?", a: "Most beneficiaries pay $185/month for Part B. Part A is free for most people. Part D premiums average about $46/month. Higher-income beneficiaries pay more due to IRMAA surcharges." },
      { q: "Is there an out-of-pocket maximum with Original Medicare?", a: "No. Original Medicare has no annual out-of-pocket maximum. The 20% Part B coinsurance has no cap. This is why many beneficiaries add a Medigap supplement plan." },
      { q: "When does Medicare deduct my premium from Social Security?", a: "If you receive Social Security benefits, your Part B premium is automatically deducted from your monthly payment. If you are not yet receiving Social Security, Medicare bills you quarterly." },
    ],
    relatedLinks: [
      { label: "Medicare Part A", href: "/original-medicare/medicare-parts/medicare-part-a" },
      { label: "Medicare Part B", href: "/original-medicare/medicare-parts/medicare-part-b" },
      { label: "Medicare Supplement Plans", href: "/medicare-supplements" },
      { label: "Part D Costs", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-costs" },
    ],
  },
  {
    slug: "medicare-eligibility",
    path: "/original-medicare/medicare-eligibility",
    title: "Medicare Eligibility Requirements",
    metaTitle: "Medicare Eligibility 2026 | Who Qualifies and When",
    metaDescription: "Learn who is eligible for Medicare in 2026: age requirements, disability qualifications, ESRD and ALS eligibility, and how to check your eligibility status.",
    heroSubtitle: "Most Americans become eligible for Medicare at age 65, but younger people with certain disabilities or conditions may also qualify. Understanding eligibility rules helps you plan your enrollment and avoid costly late penalties.",
    heroIcon: "Users",
    intro: "Medicare eligibility is primarily based on age (65+), but disability, end-stage renal disease (ESRD), and ALS also qualify individuals regardless of age. Here is a complete breakdown of who qualifies and when.",
    sections: [
      {
        id: "age-65",
        heading: "Age 65 Eligibility",
        content: "You are eligible for Medicare at age 65 if you meet one of the following:",
        bullets: [
          "You are a U.S. citizen or have been a permanent legal resident for at least 5 years",
          "You (or your spouse) worked and paid Medicare taxes for at least 10 years (40 quarters)",
          "You are already receiving Social Security or Railroad Retirement Board benefits",
        ],
        callout: { type: "info", text: "If you are not yet receiving Social Security at 65, you must actively enroll in Medicare during your Initial Enrollment Period (IEP) — the 7-month window around your 65th birthday." },
      },
      {
        id: "disability",
        heading: "Disability Eligibility (Under 65)",
        content: "You may qualify for Medicare before age 65 if you have received Social Security Disability Insurance (SSDI) benefits for 24 months. The 24-month waiting period begins with your first SSDI payment.",
        bullets: [
          "After 24 months of SSDI, you are automatically enrolled in Medicare Part A and Part B",
          "You will receive your Medicare card approximately 3 months before your 25th month of SSDI",
          "You can decline Part B to avoid the premium, but you will need to re-enroll later",
        ],
      },
      {
        id: "esrd",
        heading: "End-Stage Renal Disease (ESRD)",
        content: "You qualify for Medicare at any age if you have ESRD (permanent kidney failure requiring dialysis or a kidney transplant) and you (or your spouse or parent) worked long enough to be eligible for Social Security or Railroad Retirement benefits.",
        callout: { type: "info", text: "Medicare coverage for ESRD generally begins the 4th month of dialysis treatments. If you have a kidney transplant, coverage may begin earlier." },
      },
      {
        id: "als",
        heading: "ALS (Lou Gehrig's Disease)",
        content: "If you receive Social Security Disability benefits due to ALS (amyotrophic lateral sclerosis), you are automatically enrolled in Medicare the same month your SSDI benefits begin — there is no 24-month waiting period.",
      },
      {
        id: "part-a-free",
        heading: "Who Gets Premium-Free Part A?",
        content: "You receive Part A with no monthly premium if you (or your spouse) worked and paid Medicare taxes for at least 40 quarters (10 years). If you have 30–39 quarters, you pay a reduced premium ($285/month in 2026). With fewer than 30 quarters, the full premium is $518/month.",
      },
    ],
    faqs: [
      { q: "Can I get Medicare if I never worked?", a: "You may qualify for Medicare through your spouse's work history if your spouse worked at least 40 quarters and you are at least 65. If you do not qualify through a spouse, you can still enroll in Medicare but will pay the full Part A premium ($518/month in 2026)." },
      { q: "Does Medicare eligibility depend on income?", a: "No. Medicare eligibility is based on age, disability, or medical condition — not income. However, income affects how much you pay (IRMAA surcharges for higher earners) and whether you qualify for Extra Help programs (for lower incomes)." },
      { q: "When should I enroll in Medicare?", a: "Your Initial Enrollment Period (IEP) is a 7-month window: 3 months before your 65th birthday month, your birthday month, and 3 months after. Enrolling in the first 3 months ensures coverage starts on your birthday month." },
    ],
    relatedLinks: [
      { label: "Medicare Enrollment Periods", href: "/original-medicare/medicare-enrollment-periods" },
      { label: "Turning 65", href: "/new-to-medicare/turning-65" },
      { label: "Medicare Costs", href: "/original-medicare/medicare-costs" },
      { label: "Medicare Part A", href: "/original-medicare/medicare-parts/medicare-part-a" },
    ],
  },
  {
    slug: "medicare-parts",
    path: "/original-medicare/medicare-parts",
    title: "The Parts of Medicare Explained",
    metaTitle: "The Parts of Medicare Explained | A, B, C, D in 2026",
    metaDescription: "A complete guide to Medicare Parts A, B, C, and D in 2026. Learn what each part covers, how much it costs, and how the parts work together to provide comprehensive coverage.",
    heroSubtitle: "Medicare is divided into four parts: A, B, C, and D. Each covers a different category of health services. Understanding how the parts work together helps you build the right coverage combination for your needs.",
    heroIcon: "BookOpen",
    intro: "Medicare is not a single program — it is a system of four parts that can be combined in different ways. Most beneficiaries have Part A and Part B (Original Medicare) and add either a Medigap supplement plan or switch to Part C (Medicare Advantage).",
    sections: [
      {
        id: "part-a",
        heading: "Medicare Part A: Hospital Insurance",
        content: "Part A covers inpatient hospital care, skilled nursing facility care, hospice, and some home health services. Most people pay $0 for Part A because they paid Medicare taxes during their working years.",
        table: {
          headers: ["What It Covers", "2026 Cost"],
          rows: [
            ["Inpatient hospital stays", "$1,676 deductible per benefit period"],
            ["Skilled nursing facility (days 1–20)", "$0"],
            ["Skilled nursing facility (days 21–100)", "$209.50/day"],
            ["Hospice care", "$0 for most services"],
            ["Home health care", "$0 (if Medicare-certified)"],
          ],
        },
      },
      {
        id: "part-b",
        heading: "Medicare Part B: Medical Insurance",
        content: "Part B covers outpatient medical services, preventive care, and durable medical equipment. Part B has a monthly premium ($185/month in 2026 for most beneficiaries) and a 20% coinsurance after the annual deductible.",
        bullets: [
          "Doctor visits and specialist consultations",
          "Outpatient surgery and procedures",
          "Preventive screenings and annual wellness visits",
          "Mental health services (outpatient)",
          "Durable medical equipment",
          "Lab tests, X-rays, and imaging",
        ],
      },
      {
        id: "part-c",
        heading: "Medicare Part C: Medicare Advantage",
        content: "Medicare Advantage plans are offered by private insurers approved by Medicare. They bundle Part A and Part B coverage (and usually Part D) into a single plan. Many include extra benefits like dental, vision, and hearing that Original Medicare does not cover.",
        callout: { type: "info", text: "Choosing Medicare Advantage means your coverage is managed by a private insurer rather than the federal government. Plans typically have provider networks and may require referrals for specialists." },
      },
      {
        id: "part-d",
        heading: "Medicare Part D: Prescription Drug Coverage",
        content: "Part D is standalone prescription drug coverage offered by private insurers. It covers most FDA-approved prescription medications. In 2026, Part D has a $590 maximum deductible and a $2,000 annual out-of-pocket cap on covered drug costs.",
        bullets: [
          "Available as a standalone plan (with Original Medicare) or bundled into Medicare Advantage",
          "Plans have formularies (drug lists) organized into tiers with different cost-sharing",
          "Premiums average about $46/month nationally in 2026",
          "Late enrollment penalty applies if you delay enrollment without creditable coverage",
        ],
      },
      {
        id: "medigap",
        heading: "Medicare Supplement (Medigap): Filling the Gaps",
        content: "Medigap is not technically a 'part' of Medicare, but it is an essential component of coverage for many beneficiaries. Medigap plans are sold by private insurers and pay after Original Medicare, covering deductibles, copays, and coinsurance that would otherwise be your responsibility.",
        callout: { type: "tip", text: "Plan G is the most popular Medigap plan in 2026. It covers all Medicare cost-sharing except the Part B deductible ($257/year), giving you predictable costs with no surprise bills." },
      },
    ],
    faqs: [
      { q: "Do I need all four parts of Medicare?", a: "Most beneficiaries have Part A and Part B. Part D is strongly recommended if you take prescription medications. Part C (Medicare Advantage) is an alternative to Original Medicare that bundles A, B, and usually D. You would not have both Part C and a Medigap plan at the same time." },
      { q: "What is the difference between Medicare and Medicaid?", a: "Medicare is a federal health insurance program primarily for people 65+ and certain younger people with disabilities. Medicaid is a joint federal-state program for people with limited income and resources. Some people qualify for both (called dual eligibles)." },
      { q: "Can I change my Medicare coverage after I enroll?", a: "Yes. The Annual Enrollment Period (Oct 15 – Dec 7) lets you change Part D plans and switch between Original Medicare and Medicare Advantage. Medigap enrollment is more restrictive — you have guaranteed issue rights only during your Medigap Open Enrollment Period." },
    ],
    relatedLinks: [
      { label: "Medicare Part A", href: "/original-medicare/medicare-parts/medicare-part-a" },
      { label: "Medicare Part B", href: "/original-medicare/medicare-parts/medicare-part-b" },
      { label: "Medicare Part D", href: "/original-medicare/medicare-parts/medicare-part-d" },
      { label: "Medicare Advantage", href: "/medicare-part-c/medicare-advantage-plans" },
      { label: "Medicare Supplement Plans", href: "/medicare-supplements" },
    ],
  },
  {
    slug: "medicare-enrollment-periods",
    path: "/original-medicare/medicare-enrollment-periods",
    title: "Medicare Enrollment Periods",
    metaTitle: "Medicare Enrollment Periods 2026 | IEP, AEP, SEP & More",
    metaDescription: "Complete guide to Medicare enrollment periods in 2026: Initial Enrollment Period, Annual Enrollment Period, Special Enrollment Periods, and Open Enrollment Period. Know your deadlines to avoid penalties.",
    heroSubtitle: "Medicare has specific enrollment periods that determine when you can sign up, make changes, or switch plans. Missing your enrollment window can result in late penalties or gaps in coverage.",
    heroIcon: "Calendar",
    intro: "There are four main Medicare enrollment periods, each with different rules about who can use them and what changes they allow. Understanding these windows is critical to avoiding late enrollment penalties.",
    sections: [
      {
        id: "iep",
        heading: "Initial Enrollment Period (IEP)",
        content: "Your Initial Enrollment Period is the first time you can enroll in Medicare. It is a 7-month window:",
        bullets: [
          "3 months before your 65th birthday month",
          "Your 65th birthday month",
          "3 months after your 65th birthday month",
        ],
        callout: { type: "tip", text: "Enroll in the first 3 months of your IEP (before your birthday month) to ensure coverage starts on the first day of your birthday month. Enrolling in or after your birthday month delays coverage by 1–3 months." },
      },
      {
        id: "aep",
        heading: "Annual Enrollment Period (AEP)",
        content: "The Annual Enrollment Period runs October 15 through December 7 each year. During AEP, you can:",
        bullets: [
          "Switch from Original Medicare to Medicare Advantage",
          "Switch from Medicare Advantage back to Original Medicare",
          "Change from one Medicare Advantage plan to another",
          "Join, switch, or drop a Medicare Part D plan",
        ],
        callout: { type: "info", text: "Changes made during AEP take effect January 1 of the following year." },
      },
      {
        id: "oep",
        heading: "Medicare Advantage Open Enrollment Period (OEP)",
        content: "From January 1 through March 31, if you are already enrolled in a Medicare Advantage plan, you can:",
        bullets: [
          "Switch to a different Medicare Advantage plan",
          "Drop your Medicare Advantage plan and return to Original Medicare (and join a Part D plan)",
        ],
        callout: { type: "info", text: "The OEP does not allow you to switch from Original Medicare to Medicare Advantage. That can only be done during AEP or a qualifying SEP." },
      },
      {
        id: "sep",
        heading: "Special Enrollment Periods (SEP)",
        content: "Special Enrollment Periods allow you to enroll in or change Medicare coverage outside of regular enrollment periods when certain qualifying life events occur:",
        table: {
          headers: ["Qualifying Event", "SEP Window"],
          rows: [
            ["Losing employer/union coverage", "8 months after coverage ends"],
            ["Moving to a new service area", "2 months after moving"],
            ["Gaining/losing Medicaid eligibility", "Varies"],
            ["Moving into/out of a nursing home", "2 months"],
            ["Plan loses Medicare contract", "2 months after notice"],
          ],
        },
      },
      {
        id: "medigap-oep",
        heading: "Medigap Open Enrollment Period",
        content: "Your Medigap Open Enrollment Period is a one-time 6-month window that begins the month you are both 65 or older AND enrolled in Medicare Part B. During this period, insurers cannot deny you coverage or charge more due to pre-existing conditions.",
        callout: { type: "warning", text: "Missing your Medigap Open Enrollment Period is one of the most costly Medicare mistakes. After this window closes, insurers can use medical underwriting and may deny coverage or charge significantly higher premiums based on your health history." },
      },
    ],
    faqs: [
      { q: "What happens if I miss my Initial Enrollment Period?", a: "If you miss your IEP without a qualifying reason, you can enroll during the General Enrollment Period (Jan 1 – Mar 31), but coverage won't start until July 1 and you may face late enrollment penalties for Part B and Part D." },
      { q: "Can I change my Medicare plan at any time?", a: "Generally no. Changes are limited to specific enrollment periods. The main exceptions are Special Enrollment Periods triggered by qualifying life events." },
      { q: "Is there a penalty for late Part B enrollment?", a: "Yes. If you delay Part B enrollment without creditable coverage, your premium increases by 10% for each full 12-month period you were eligible but not enrolled. This penalty is permanent." },
    ],
    relatedLinks: [
      { label: "Medicare Eligibility", href: "/original-medicare/medicare-eligibility" },
      { label: "Turning 65 Enrollment", href: "/enrollment/turning-65" },
      { label: "Late Penalties", href: "/enrollment/late-penalties" },
      { label: "Medigap Eligibility", href: "/medicare-supplements/medigap-eligibility" },
    ],
  },
];
