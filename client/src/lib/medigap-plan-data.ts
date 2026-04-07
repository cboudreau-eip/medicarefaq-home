/**
 * Medigap Plan Data
 * Data for all 10 standardized Medigap plan letter pages + HD variants
 * Used by MedigapPlanTemplate.tsx
 */

export interface MedigapBenefit {
  benefit: string;
  covered: "full" | "partial" | "none";
  detail?: string;
}

export interface MedigapPlanData {
  slug: string;
  letter: string;
  displayName: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  ogImage: string;
  heroColor: string; // tailwind gradient classes
  badge: string;
  badgeColor: string;
  monthlyPremiumRange: string;
  outOfPocketMax: string | null;
  bestFor: string;
  notFor: string;
  availableToNewEnrollees: boolean;
  requiresPartBDeductible: boolean;
  benefits: MedigapBenefit[];
  highlights: string[];
  proscons: { pros: string[]; cons: string[] };
  faqs: { q: string; a: string }[];
  relatedPlans: string[];
  intro: string;
  detailParagraphs: string[];
}

// 2026 Medicare cost constants
const PART_A_DEDUCTIBLE = "$1,676";
const PART_B_DEDUCTIBLE = "$257";
const PART_B_EXCESS = "Part B excess charges";
const SNF_COINSURANCE = "Skilled nursing facility coinsurance";

export const MEDIGAP_PLANS: Record<string, MedigapPlanData> = {
  "plan-g": {
    slug: "plan-g",
    letter: "G",
    displayName: "Medicare Supplement Plan G",
    tagline: "The Most Popular Medigap Plan for New Enrollees",
    metaTitle: "Medicare Supplement Plan G: Coverage, Costs & 2026 Guide",
    metaDescription: "Medicare Supplement Plan G covers nearly everything Original Medicare doesn't — except the Part B deductible. Compare costs, benefits, and whether Plan G is right for you.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-g/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-blue-900 via-blue-800 to-slate-900",
    badge: "Most Popular",
    badgeColor: "bg-teal-500",
    monthlyPremiumRange: "$100–$300/mo",
    outOfPocketMax: null,
    bestFor: "People who want comprehensive coverage and predictable costs with no surprise bills",
    notFor: "Budget-conscious enrollees who prefer lower premiums and can handle some cost-sharing",
    availableToNewEnrollees: true,
    requiresPartBDeductible: true,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "full" },
      { benefit: "Part B coinsurance or copayment", covered: "full" },
      { benefit: `Part B excess charges (${PART_B_EXCESS})`, covered: "full" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "none", detail: "You pay this once per year" },
      { benefit: "Blood (first 3 pints)", covered: "full" },
      { benefit: `${SNF_COINSURANCE}`, covered: "full" },
      { benefit: "Foreign travel emergency (up to plan limits)", covered: "full", detail: "80% after $250 deductible, up to $50,000 lifetime" },
    ],
    highlights: [
      "Covers 100% of Medicare-approved costs after the Part B deductible",
      "No networks — see any doctor or hospital that accepts Medicare nationwide",
      "Covers Part B excess charges (doctors who don't accept Medicare assignment)",
      "Includes foreign travel emergency coverage",
      "Guaranteed renewable — can't be cancelled due to health changes",
    ],
    proscons: {
      pros: [
        "Near-total coverage — only one out-of-pocket cost (Part B deductible)",
        "Predictable annual costs — easy to budget",
        "No network restrictions — any Medicare-accepting provider",
        "Covers Part B excess charges, unlike Plan N",
        "Available from many competing insurers — shop for best price",
      ],
      cons: [
        `You pay the Part B deductible (${PART_B_DEDUCTIBLE} in 2026) yourself`,
        "Higher premiums than Plan N or high-deductible options",
        "Doesn't include prescription drug coverage (need separate Part D)",
        "Premiums increase with age in most states",
      ],
    },
    faqs: [
      {
        q: "Is Medicare Supplement Plan G worth it?",
        a: `Plan G is widely considered the best value for new Medicare enrollees. After paying the Part B deductible (${PART_B_DEDUCTIBLE} in 2026), Plan G covers 100% of Medicare-approved costs. For most people, the premium savings compared to Plan F don't outweigh the comprehensive coverage Plan G provides.`,
      },
      {
        q: "What is the difference between Plan G and Plan F?",
        a: `The only difference is that Plan F also covers the Part B deductible (${PART_B_DEDUCTIBLE}), while Plan G does not. Plan F is no longer available to new Medicare enrollees after January 1, 2020. Since Plan G premiums are typically $20–$50/month less than Plan F, most people with Plan G come out ahead financially.`,
      },
      {
        q: "What is the difference between Plan G and Plan N?",
        a: "Plan G covers Part B excess charges and has no copays for office visits or emergency room visits. Plan N has lower premiums but charges up to $20 copays for office visits and up to $50 for ER visits, and does not cover Part B excess charges. If you see doctors who charge above Medicare rates, Plan G is the safer choice.",
      },
      {
        q: "How much does Medicare Supplement Plan G cost in 2026?",
        a: "Plan G premiums vary significantly by age, location, gender, and insurance company. Typical monthly premiums range from $100 to $300. The same Plan G can vary by 50% or more between insurers in the same zip code, so comparing multiple quotes is essential.",
      },
      {
        q: "Does Plan G cover dental, vision, or hearing?",
        a: "No. Like all Medigap plans, Plan G only covers costs related to Original Medicare (Parts A and B). It does not include dental, vision, hearing, or prescription drug coverage. You would need separate plans for those benefits.",
      },
    ],
    relatedPlans: ["plan-n", "plan-f", "high-deductible-plan-g"],
    intro: "Medicare Supplement Plan G is the most popular Medigap plan for new Medicare enrollees — and for good reason. It covers virtually every out-of-pocket cost that Original Medicare leaves behind, with just one exception: the annual Part B deductible.",
    detailParagraphs: [
      `Plan G became the go-to choice for new enrollees after Plan F was discontinued for people newly eligible for Medicare on or after January 1, 2020. With Plan G, once you've paid the Part B deductible (${PART_B_DEDUCTIBLE} in 2026), Medicare and your Medigap plan together cover 100% of Medicare-approved costs for the rest of the year.`,
      "One of Plan G's most valuable features is its coverage of Part B excess charges. When a doctor doesn't accept Medicare assignment, they can charge up to 15% more than the Medicare-approved amount. Plan G pays those excess charges in full, giving you the freedom to see virtually any doctor in the country.",
      "Plan G also includes foreign travel emergency coverage — up to 80% of medically necessary emergency care costs after a $250 deductible, with a $50,000 lifetime maximum. This makes it an excellent choice for people who travel internationally.",
      "Because Medigap plans are federally standardized, a Plan G from one company offers identical benefits to a Plan G from any other company. The only difference is the premium. Shopping and comparing quotes from multiple insurers is the single most effective way to reduce your Medigap costs.",
    ],
  },

  "plan-f": {
    slug: "plan-f",
    letter: "F",
    displayName: "Medicare Supplement Plan F",
    tagline: "The Most Comprehensive Medigap Plan (For Those Eligible Before 2020)",
    metaTitle: "Medicare Supplement Plan F: Coverage, Costs & Eligibility 2026",
    metaDescription: "Medicare Supplement Plan F covers 100% of Medicare-approved costs with no out-of-pocket expenses. Learn who is still eligible for Plan F and whether it's worth the premium.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-f/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-indigo-900 via-indigo-800 to-slate-900",
    badge: "Most Comprehensive",
    badgeColor: "bg-indigo-500",
    monthlyPremiumRange: "$150–$400/mo",
    outOfPocketMax: null,
    bestFor: "People eligible for Medicare before January 1, 2020 who want zero out-of-pocket costs",
    notFor: "Anyone newly eligible for Medicare after January 1, 2020 — Plan F is not available to you",
    availableToNewEnrollees: false,
    requiresPartBDeductible: false,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "full" },
      { benefit: "Part B coinsurance or copayment", covered: "full" },
      { benefit: `Part B excess charges`, covered: "full" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "full", detail: "Plan F covers this — Plan G does not" },
      { benefit: "Blood (first 3 pints)", covered: "full" },
      { benefit: `${SNF_COINSURANCE}`, covered: "full" },
      { benefit: "Foreign travel emergency (up to plan limits)", covered: "full", detail: "80% after $250 deductible, up to $50,000 lifetime" },
    ],
    highlights: [
      "Covers 100% of Medicare-approved costs — zero out-of-pocket after premium",
      "The only Medigap plan that covers the Part B deductible",
      "No networks — see any doctor or hospital that accepts Medicare",
      "Covers Part B excess charges",
      "Only available to those eligible for Medicare before January 1, 2020",
    ],
    proscons: {
      pros: [
        "Truly zero out-of-pocket costs for Medicare-covered services",
        "Simplest coverage — no deductibles, copays, or coinsurance",
        "Covers Part B deductible and excess charges",
        "Predictable costs — just your monthly premium",
      ],
      cons: [
        "Not available to new Medicare enrollees (must have been eligible before Jan 1, 2020)",
        "Highest premiums of all Medigap plans",
        "Premiums typically $20–$50/month more than Plan G for the same coverage minus Part B deductible",
        "Shrinking pool of enrollees may cause premiums to rise faster over time",
      ],
    },
    faqs: [
      {
        q: "Can I still get Medicare Supplement Plan F?",
        a: "Plan F is only available if you were eligible for Medicare (turned 65 or qualified due to disability) before January 1, 2020. If you became eligible for Medicare on or after that date, you cannot enroll in Plan F. If you were eligible before that date, you can still enroll in Plan F at any time.",
      },
      {
        q: "Is Plan F better than Plan G?",
        a: `Plan F covers the Part B deductible (${PART_B_DEDUCTIBLE} in 2026) while Plan G does not. However, Plan F premiums are typically $20–$50/month higher than Plan G. Since the Part B deductible is only ${PART_B_DEDUCTIBLE}/year, most people save money with Plan G. Plan F makes sense if the premium difference is less than ${PART_B_DEDUCTIBLE}/year — which is rare.`,
      },
      {
        q: "What is High Deductible Plan F?",
        a: `High Deductible Plan F (HD-F) works the same as Plan F but requires you to pay a deductible ($2,870 in 2026) before the plan pays anything. In exchange, premiums are significantly lower — often $30–$80/month. HD-F is also only available to those eligible for Medicare before January 1, 2020.`,
      },
      {
        q: "Will Plan F be discontinued?",
        a: "Plan F won't be discontinued for current enrollees — it's guaranteed renewable. However, since no new enrollees are joining, the pool of Plan F members is aging and shrinking. This can lead to faster premium increases over time as claims costs are spread over fewer people.",
      },
    ],
    relatedPlans: ["plan-g", "high-deductible-plan-f", "plan-n"],
    intro: "Medicare Supplement Plan F offers the most comprehensive coverage of any Medigap plan — covering 100% of Medicare-approved costs with absolutely no out-of-pocket expenses beyond your monthly premium. However, Plan F is only available to people who were eligible for Medicare before January 1, 2020.",
    detailParagraphs: [
      "Plan F was the most popular Medigap plan for decades, and for good reason: it eliminates every Medicare cost-sharing requirement. After paying your monthly premium, you have zero deductibles, zero copays, and zero coinsurance for any Medicare-covered service.",
      `The key difference between Plan F and Plan G is that Plan F covers the Part B annual deductible (${PART_B_DEDUCTIBLE} in 2026), while Plan G does not. This single benefit is what makes Plan F premiums higher. For most people, Plan G offers better value since the premium savings typically exceed the deductible amount.`,
      "The Medicare Access and CHIP Reauthorization Act (MACRA) of 2015 prohibited new Medicare enrollees from purchasing plans that cover the Part B deductible, effective January 1, 2020. This means Plan F and Plan C are no longer available to anyone who became eligible for Medicare after that date.",
      "If you currently have Plan F, you can keep it — it's guaranteed renewable regardless of health changes. However, as the Plan F risk pool ages and shrinks, premiums may increase faster than other plans. It's worth periodically comparing your Plan F premium to Plan G to see if switching makes financial sense.",
    ],
  },

  "plan-n": {
    slug: "plan-n",
    letter: "N",
    displayName: "Medicare Supplement Plan N",
    tagline: "Lower Premiums with Modest Cost-Sharing",
    metaTitle: "Medicare Supplement Plan N: Coverage, Costs & 2026 Guide",
    metaDescription: "Medicare Supplement Plan N offers lower premiums than Plan G with small copays for office and ER visits. Learn if Plan N is the right balance of cost and coverage.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-n/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-teal-900 via-teal-800 to-slate-900",
    badge: "Best Value",
    badgeColor: "bg-green-500",
    monthlyPremiumRange: "$75–$225/mo",
    outOfPocketMax: null,
    bestFor: "Healthy enrollees who want lower premiums and rarely visit the doctor",
    notFor: "People who frequently see specialists or doctors who don't accept Medicare assignment",
    availableToNewEnrollees: true,
    requiresPartBDeductible: true,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "full" },
      { benefit: "Part B coinsurance or copayment", covered: "partial", detail: "Covered except up to $20 copay for office visits, up to $50 for ER visits" },
      { benefit: `Part B excess charges`, covered: "none", detail: "You pay 100% of excess charges" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "none", detail: "You pay this once per year" },
      { benefit: "Blood (first 3 pints)", covered: "full" },
      { benefit: `${SNF_COINSURANCE}`, covered: "full" },
      { benefit: "Foreign travel emergency (up to plan limits)", covered: "full", detail: "80% after $250 deductible, up to $50,000 lifetime" },
    ],
    highlights: [
      "Premiums typically 20–30% lower than Plan G",
      "Covers Part A deductible and hospital costs in full",
      "Small copays: up to $20 for office visits, up to $50 for ER visits",
      "Does NOT cover Part B excess charges",
      "Good choice for healthy enrollees with infrequent doctor visits",
    ],
    proscons: {
      pros: [
        "Significantly lower premiums than Plan G — often $50–$100/month less",
        "Covers the large Part A deductible ($1,676) in full",
        "No network restrictions — any Medicare-accepting provider",
        "Includes foreign travel emergency coverage",
        "Good option if you're healthy and rarely need medical care",
      ],
      cons: [
        `You pay the Part B deductible (${PART_B_DEDUCTIBLE}) yourself`,
        "Up to $20 copay per office visit (waived if no charge is made)",
        "Up to $50 copay per ER visit (waived if admitted)",
        "Does NOT cover Part B excess charges — avoid doctors who don't accept Medicare assignment",
        "Could cost more than Plan G if you have frequent doctor visits",
      ],
    },
    faqs: [
      {
        q: "What is the difference between Plan G and Plan N?",
        a: "Plan G covers Part B excess charges and has no office or ER visit copays. Plan N has lower premiums but charges up to $20 for office visits and up to $50 for ER visits, and does not cover Part B excess charges. If you see doctors who charge above Medicare rates, Plan G is the safer choice.",
      },
      {
        q: "How much can I save with Plan N vs Plan G?",
        a: "Plan N premiums are typically $50–$100/month less than Plan G. If you rarely visit the doctor, those savings can easily outweigh the copays. However, if you have 5+ office visits per year, the copays start to close the gap. Run the numbers based on your typical healthcare usage.",
      },
      {
        q: "Does Plan N cover emergency room visits?",
        a: "Yes, Plan N covers ER visits but charges a copay of up to $50. This copay is waived if you're admitted to the hospital as an inpatient. If you visit the ER frequently, this is an important cost to factor into your plan comparison.",
      },
      {
        q: "What are Part B excess charges and why does Plan N not cover them?",
        a: "Part B excess charges occur when a doctor doesn't accept Medicare assignment and charges up to 15% more than the Medicare-approved rate. Plan N does not cover these charges. To avoid excess charges with Plan N, stick to doctors who accept Medicare assignment (most do — about 97% of doctors accept Medicare).",
      },
    ],
    relatedPlans: ["plan-g", "plan-f", "high-deductible-plan-g"],
    intro: "Medicare Supplement Plan N strikes a balance between comprehensive coverage and affordable premiums. It covers most Medicare cost-sharing in full but includes modest copays for office and emergency room visits — making it an attractive option for healthy enrollees who want lower monthly costs.",
    detailParagraphs: [
      "Plan N has become increasingly popular as premiums for Plan G have risen. With Plan N, you get the same hospital coverage as Plan G — including the full Part A deductible — but pay lower monthly premiums in exchange for small copays when you see a doctor.",
      "The key trade-offs with Plan N are: (1) up to $20 copay per office visit, (2) up to $50 copay per ER visit (waived if admitted), and (3) no coverage for Part B excess charges. For people who are generally healthy and primarily see doctors who accept Medicare assignment, these trade-offs can result in significant savings.",
      "Plan N does not cover Part B excess charges. This means if you see a doctor who doesn't accept Medicare assignment, you could owe up to 15% above the Medicare-approved rate out of pocket. In states with 'balance billing' protections (like New York and Connecticut), this is less of a concern since excess charges are prohibited.",
      "When comparing Plan N to Plan G, calculate your expected annual copay costs based on your typical healthcare usage. If you have 3–4 office visits per year, Plan N copays might total $60–$80 — far less than the premium difference. But if you're managing multiple chronic conditions with frequent specialist visits, Plan G's predictability may be worth the higher premium.",
    ],
  },

  "plan-c": {
    slug: "plan-c",
    letter: "C",
    displayName: "Medicare Supplement Plan C",
    tagline: "Comprehensive Coverage Including the Part B Deductible (Pre-2020 Enrollees Only)",
    metaTitle: "Medicare Supplement Plan C: Coverage, Costs & Who Can Enroll",
    metaDescription: "Medicare Supplement Plan C covers nearly everything Plan F does, including the Part B deductible. Learn who is eligible and how Plan C compares to Plan G.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-c/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-purple-900 via-purple-800 to-slate-900",
    badge: "Pre-2020 Only",
    badgeColor: "bg-purple-500",
    monthlyPremiumRange: "$130–$350/mo",
    outOfPocketMax: null,
    bestFor: "Pre-2020 Medicare enrollees who want comprehensive coverage without Part B excess charge concerns",
    notFor: "Anyone newly eligible for Medicare after January 1, 2020",
    availableToNewEnrollees: false,
    requiresPartBDeductible: false,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "full" },
      { benefit: "Part B coinsurance or copayment", covered: "full" },
      { benefit: `Part B excess charges`, covered: "none", detail: "Plan C does NOT cover excess charges (unlike Plan F)" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "full", detail: "Plan C covers this — Plan G does not" },
      { benefit: "Blood (first 3 pints)", covered: "full" },
      { benefit: `${SNF_COINSURANCE}`, covered: "full" },
      { benefit: "Foreign travel emergency (up to plan limits)", covered: "full", detail: "80% after $250 deductible, up to $50,000 lifetime" },
    ],
    highlights: [
      "Covers the Part B deductible (unlike Plan G and Plan N)",
      "Does NOT cover Part B excess charges (unlike Plan F)",
      "Only available to those eligible for Medicare before January 1, 2020",
      "Similar to Plan F but without excess charge coverage",
      "No networks — any Medicare-accepting provider nationwide",
    ],
    proscons: {
      pros: [
        "Covers the Part B deductible — zero out-of-pocket for most Medicare services",
        "Lower premiums than Plan F since it doesn't cover excess charges",
        "Comprehensive hospital and skilled nursing coverage",
        "Includes foreign travel emergency coverage",
      ],
      cons: [
        "Not available to new Medicare enrollees (must have been eligible before Jan 1, 2020)",
        "Does not cover Part B excess charges — could face bills from non-assignment doctors",
        "Higher premiums than Plan G or Plan N",
        "Shrinking enrollee pool may cause faster premium increases",
      ],
    },
    faqs: [
      {
        q: "What is the difference between Plan C and Plan F?",
        a: "The only difference is that Plan F covers Part B excess charges while Plan C does not. Both plans cover the Part B deductible. Plan C premiums are typically slightly lower than Plan F because of this difference.",
      },
      {
        q: "What is the difference between Plan C and Plan G?",
        a: `Plan C covers the Part B deductible (${PART_B_DEDUCTIBLE} in 2026) while Plan G does not. However, Plan G covers Part B excess charges while Plan C does not. For most people, Plan G offers better value since excess charge protection is more valuable than the relatively small Part B deductible.`,
      },
      {
        q: "Can I still enroll in Plan C?",
        a: "Plan C is only available if you were eligible for Medicare before January 1, 2020. If you became eligible on or after that date, you cannot enroll in Plan C. If you were eligible before that date, you can still enroll at any time, subject to medical underwriting outside of your Medigap Open Enrollment Period.",
      },
    ],
    relatedPlans: ["plan-f", "plan-g", "plan-n"],
    intro: "Medicare Supplement Plan C offers comprehensive coverage similar to Plan F, covering the Part B deductible and most Medicare cost-sharing. The key distinction: Plan C does not cover Part B excess charges. Like Plan F, it is only available to people who were eligible for Medicare before January 1, 2020.",
    detailParagraphs: [
      `Plan C sits between Plan F and Plan G in terms of coverage. It covers the Part B deductible (${PART_B_DEDUCTIBLE} in 2026) like Plan F, but unlike Plan F, it does not cover Part B excess charges. This makes Plan C premiums slightly lower than Plan F.`,
      "For most people choosing between Plan C and Plan G, Plan G is the better value. While Plan C covers the Part B deductible, Plan G covers Part B excess charges — which can be more significant if you see doctors who don't accept Medicare assignment. And Plan G premiums are typically lower than Plan C.",
      "If you currently have Plan C, it's worth periodically comparing your premium to Plan G. Since Plan C is no longer available to new enrollees, the risk pool is aging, which can drive premiums up faster than newer plans.",
    ],
  },

  "plan-d": {
    slug: "plan-d",
    letter: "D",
    displayName: "Medicare Supplement Plan D",
    tagline: "Solid Coverage Without the Part B Deductible or Excess Charges",
    metaTitle: "Medicare Supplement Plan D: Coverage, Costs & 2026 Guide",
    metaDescription: "Medicare Supplement Plan D covers hospital costs, skilled nursing, and foreign travel emergency — but not the Part B deductible or excess charges. See if Plan D fits your needs.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-d/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-cyan-900 via-cyan-800 to-slate-900",
    badge: "Available",
    badgeColor: "bg-cyan-600",
    monthlyPremiumRange: "$90–$250/mo",
    outOfPocketMax: null,
    bestFor: "Enrollees who want hospital and SNF coverage but are comfortable with Part B cost-sharing",
    notFor: "People who want the most comprehensive coverage or who frequently see specialists",
    availableToNewEnrollees: true,
    requiresPartBDeductible: true,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "full" },
      { benefit: "Part B coinsurance or copayment", covered: "full" },
      { benefit: `Part B excess charges`, covered: "none", detail: "You pay excess charges" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "none", detail: "You pay this once per year" },
      { benefit: "Blood (first 3 pints)", covered: "full" },
      { benefit: `${SNF_COINSURANCE}`, covered: "full" },
      { benefit: "Foreign travel emergency (up to plan limits)", covered: "full", detail: "80% after $250 deductible, up to $50,000 lifetime" },
    ],
    highlights: [
      "Covers Part A deductible and hospital costs in full",
      "Covers skilled nursing facility coinsurance",
      "Includes foreign travel emergency coverage",
      "Does NOT cover Part B deductible or excess charges",
      "Lower premiums than Plan G",
    ],
    proscons: {
      pros: [
        "Covers the significant Part A deductible ($1,676)",
        "Full skilled nursing facility coinsurance coverage",
        "Foreign travel emergency included",
        "Lower premiums than Plan G",
        "Available to new Medicare enrollees",
      ],
      cons: [
        "Does not cover Part B deductible",
        "Does not cover Part B excess charges",
        "Less popular than Plan G or N — fewer carriers may offer it",
        "Plan N often offers similar savings with more competitive pricing",
      ],
    },
    faqs: [
      {
        q: "How does Plan D compare to Plan G?",
        a: "Plan D covers everything Plan G covers except Part B excess charges. Both require you to pay the Part B deductible. Plan D premiums are typically slightly lower than Plan G. However, Plan G's excess charge coverage provides important protection if you see doctors who don't accept Medicare assignment.",
      },
      {
        q: "Is Plan D a good choice?",
        a: "Plan D can be a good choice if you want solid hospital and SNF coverage at a lower premium than Plan G, and you primarily see doctors who accept Medicare assignment. However, Plan N is often a better value since it's more widely offered and competitively priced.",
      },
    ],
    relatedPlans: ["plan-g", "plan-n", "plan-b"],
    intro: "Medicare Supplement Plan D provides solid coverage for hospital and skilled nursing facility costs, along with foreign travel emergency benefits. It covers the Part A deductible in full but does not cover the Part B deductible or Part B excess charges.",
    detailParagraphs: [
      "Plan D is a mid-tier Medigap option that covers most major Medicare cost-sharing except the Part B deductible and excess charges. It's available to all new Medicare enrollees and offers lower premiums than Plan G.",
      "While Plan D is a legitimate option, it's less commonly offered than Plan G or Plan N. If you're considering Plan D, it's worth also comparing Plan N — which has similar cost-sharing but is more widely available and often more competitively priced.",
    ],
  },

  "plan-b": {
    slug: "plan-b",
    letter: "B",
    displayName: "Medicare Supplement Plan B",
    tagline: "Basic Coverage Plus the Part A Deductible",
    metaTitle: "Medicare Supplement Plan B: Coverage, Costs & 2026 Guide",
    metaDescription: "Medicare Supplement Plan B covers the Part A deductible and basic Medicare cost-sharing. See how Plan B compares to other Medigap options.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-b/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-slate-800 via-slate-700 to-slate-900",
    badge: "Basic",
    badgeColor: "bg-slate-500",
    monthlyPremiumRange: "$70–$200/mo",
    outOfPocketMax: null,
    bestFor: "Enrollees who want to cover the Part A deductible at a lower premium than comprehensive plans",
    notFor: "People who want comprehensive coverage — consider Plan G or Plan N instead",
    availableToNewEnrollees: true,
    requiresPartBDeductible: true,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "full" },
      { benefit: "Part B coinsurance or copayment", covered: "full" },
      { benefit: `Part B excess charges`, covered: "none" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "none" },
      { benefit: "Blood (first 3 pints)", covered: "full" },
      { benefit: `${SNF_COINSURANCE}`, covered: "none", detail: "Plan B does not cover SNF coinsurance" },
      { benefit: "Foreign travel emergency", covered: "none" },
    ],
    highlights: [
      "Covers the Part A deductible ($1,676 in 2026)",
      "Covers Part A hospital coinsurance and Part B coinsurance",
      "Does NOT cover skilled nursing facility coinsurance",
      "Does NOT cover foreign travel emergency",
      "One of the lower-premium Medigap options",
    ],
    proscons: {
      pros: [
        "Covers the Part A deductible — protects against large hospital bills",
        "Lower premiums than Plan G, D, or N",
        "Covers Part B coinsurance — no surprise bills for outpatient services",
      ],
      cons: [
        "Does not cover skilled nursing facility coinsurance",
        "No foreign travel emergency coverage",
        "Does not cover Part B deductible or excess charges",
        "Plan N often provides more coverage for a similar or lower premium",
      ],
    },
    faqs: [
      {
        q: "Is Plan B worth it compared to Plan G?",
        a: "For most people, Plan G or Plan N provides significantly better coverage for a relatively modest premium increase. Plan B leaves you exposed to skilled nursing facility costs and foreign travel emergencies, which can be substantial. Unless you're on a very tight budget, Plan N typically offers better value.",
      },
    ],
    relatedPlans: ["plan-a", "plan-g", "plan-n"],
    intro: "Medicare Supplement Plan B is one of the more basic Medigap options. It covers the Part A deductible and basic Medicare coinsurance but does not include skilled nursing facility coverage or foreign travel emergency benefits.",
    detailParagraphs: [
      `Plan B adds one key benefit over Plan A: it covers the Part A deductible (${PART_A_DEDUCTIBLE} in 2026). This is a meaningful protection since a single hospital stay can trigger this deductible. However, Plan B still leaves gaps in skilled nursing facility coverage and foreign travel.`,
      "For most people, Plan N offers better overall value than Plan B — it covers skilled nursing facility coinsurance and foreign travel emergency at a competitive premium. Unless your budget is extremely tight, it's worth comparing Plan N quotes before settling on Plan B.",
    ],
  },

  "plan-a": {
    slug: "plan-a",
    letter: "A",
    displayName: "Medicare Supplement Plan A",
    tagline: "Basic Core Benefits at the Lowest Medigap Premium",
    metaTitle: "Medicare Supplement Plan A: Coverage, Costs & 2026 Guide",
    metaDescription: "Medicare Supplement Plan A covers the core Medicare cost-sharing benefits at the lowest Medigap premium. Learn what Plan A covers and who it's best for.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-a/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-gray-800 via-gray-700 to-slate-900",
    badge: "Entry Level",
    badgeColor: "bg-gray-500",
    monthlyPremiumRange: "$60–$180/mo",
    outOfPocketMax: null,
    bestFor: "Enrollees who want the lowest Medigap premium with some basic cost-sharing protection",
    notFor: "People who want comprehensive coverage — most other plans offer significantly better value",
    availableToNewEnrollees: true,
    requiresPartBDeductible: true,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "none", detail: "You pay this yourself" },
      { benefit: "Part B coinsurance or copayment", covered: "full" },
      { benefit: `Part B excess charges`, covered: "none" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "none" },
      { benefit: "Blood (first 3 pints)", covered: "full" },
      { benefit: `${SNF_COINSURANCE}`, covered: "none" },
      { benefit: "Foreign travel emergency", covered: "none" },
    ],
    highlights: [
      "Lowest premium of all Medigap plans",
      "Covers Part A hospital coinsurance and Part B coinsurance",
      "Does NOT cover Part A deductible, SNF coinsurance, or foreign travel",
      "Required to be offered by all Medigap insurers",
      "Limited protection — most enrollees benefit from Plan G or N",
    ],
    proscons: {
      pros: [
        "Lowest monthly premium of any Medigap plan",
        "Covers extended hospital stays beyond Medicare's limits",
        "Covers Part B coinsurance — no bills for outpatient services",
        "Available from all Medigap insurers",
      ],
      cons: [
        "Does not cover the Part A deductible ($1,676) — significant exposure for hospital stays",
        "No skilled nursing facility coverage",
        "No foreign travel emergency coverage",
        "Most people get better value from Plan G or Plan N",
      ],
    },
    faqs: [
      {
        q: "Who should choose Plan A?",
        a: "Plan A is rarely the best choice. It's primarily useful for people on very tight budgets who want some protection against extended hospital stays. For most people, Plan N offers substantially better coverage for a modest premium increase.",
      },
    ],
    relatedPlans: ["plan-b", "plan-n", "plan-g"],
    intro: "Medicare Supplement Plan A is the most basic Medigap plan, covering only the core Medicare cost-sharing benefits. It has the lowest premium of any Medigap plan but leaves significant gaps — including the Part A deductible and skilled nursing facility costs.",
    detailParagraphs: [
      "Plan A is the baseline Medigap plan that all insurers are required to offer. It covers Part A hospital coinsurance (including extended stays beyond Medicare's 60-day limit) and Part B coinsurance, but nothing else.",
      "The most significant gap in Plan A is the Part A deductible ($1,676 in 2026). A single hospital admission triggers this deductible, and Plan A provides no protection against it. For most people, the premium difference between Plan A and Plan N is modest enough that Plan N is the clearly better choice.",
    ],
  },

  "plan-l": {
    slug: "plan-l",
    letter: "L",
    displayName: "Medicare Supplement Plan L",
    tagline: "75% Cost-Sharing with a Built-In Out-of-Pocket Maximum",
    metaTitle: "Medicare Supplement Plan L: Coverage, Costs & 2026 Guide",
    metaDescription: "Medicare Supplement Plan L covers 75% of most Medicare cost-sharing with a built-in out-of-pocket maximum. Learn how Plan L compares to Plan K and Plan G.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-l/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-amber-900 via-amber-800 to-slate-900",
    badge: "75% Coverage",
    badgeColor: "bg-amber-600",
    monthlyPremiumRange: "$80–$220/mo",
    outOfPocketMax: "$3,530 (2026)",
    bestFor: "Enrollees who want an out-of-pocket maximum with lower premiums than Plan G",
    notFor: "People who want comprehensive coverage without any cost-sharing",
    availableToNewEnrollees: true,
    requiresPartBDeductible: true,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "partial", detail: "75% covered" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "partial", detail: "75% covered ($1,257)" },
      { benefit: "Part B coinsurance or copayment", covered: "partial", detail: "75% covered" },
      { benefit: `Part B excess charges`, covered: "none" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "none" },
      { benefit: "Blood (first 3 pints)", covered: "partial", detail: "75% covered" },
      { benefit: `${SNF_COINSURANCE}`, covered: "partial", detail: "75% covered" },
      { benefit: "Foreign travel emergency", covered: "none" },
    ],
    highlights: [
      "Built-in out-of-pocket maximum ($3,530 in 2026)",
      "Covers 75% of most Medicare cost-sharing",
      "Lower premiums than Plan G or Plan N",
      "Once you hit the OOP max, Plan L covers 100% of covered costs",
      "Does NOT cover foreign travel emergency",
    ],
    proscons: {
      pros: [
        "Out-of-pocket maximum provides catastrophic cost protection",
        "Lower premiums than more comprehensive plans",
        "Good protection against worst-case scenarios",
        "Available to all new Medicare enrollees",
      ],
      cons: [
        "You pay 25% of most Medicare cost-sharing until you hit the OOP max",
        "No foreign travel emergency coverage",
        "No Part B excess charge coverage",
        "More complex cost-sharing than Plan G or Plan N",
      ],
    },
    faqs: [
      {
        q: "What is the out-of-pocket maximum for Plan L in 2026?",
        a: "The Plan L out-of-pocket maximum is $3,530 in 2026. Once you've paid this amount in covered cost-sharing, Plan L covers 100% of Medicare-approved costs for the rest of the calendar year.",
      },
      {
        q: "How does Plan L compare to Plan K?",
        a: "Plan K covers 50% of most Medicare cost-sharing with a lower OOP max ($7,060 in 2026 — wait, Plan K OOP max is $7,060 and Plan L is $3,530). Plan L covers 75% and has a lower OOP max. Plan L offers more coverage but higher premiums than Plan K.",
      },
    ],
    relatedPlans: ["plan-k", "plan-g", "plan-n"],
    intro: "Medicare Supplement Plan L is one of two Medigap plans with a built-in out-of-pocket maximum. It covers 75% of most Medicare cost-sharing, and once you reach the annual out-of-pocket limit ($3,530 in 2026), the plan covers 100% of Medicare-approved costs for the rest of the year.",
    detailParagraphs: [
      "Plan L's defining feature is its out-of-pocket maximum. While you're responsible for 25% of most Medicare cost-sharing, your total exposure is capped at $3,530 per year (2026). This provides meaningful protection against catastrophic medical costs.",
      "Plan L premiums are typically lower than Plan G or Plan N, making it an option for people who want some cost-sharing protection without paying for comprehensive coverage. However, the 25% cost-sharing can add up if you have frequent medical needs before hitting the OOP max.",
    ],
  },

  "plan-k": {
    slug: "plan-k",
    letter: "K",
    displayName: "Medicare Supplement Plan K",
    tagline: "50% Cost-Sharing with the Lowest Medigap Premium",
    metaTitle: "Medicare Supplement Plan K: Coverage, Costs & 2026 Guide",
    metaDescription: "Medicare Supplement Plan K covers 50% of most Medicare cost-sharing with a built-in out-of-pocket maximum. Learn if Plan K's lower premiums are worth the higher cost-sharing.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-k/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-orange-900 via-orange-800 to-slate-900",
    badge: "50% Coverage",
    badgeColor: "bg-orange-600",
    monthlyPremiumRange: "$50–$150/mo",
    outOfPocketMax: "$7,060 (2026)",
    bestFor: "Very healthy enrollees who want the lowest possible premium with catastrophic cost protection",
    notFor: "People with frequent medical needs or those who want predictable costs",
    availableToNewEnrollees: true,
    requiresPartBDeductible: true,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "partial", detail: "50% covered" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "partial", detail: "50% covered ($838)" },
      { benefit: "Part B coinsurance or copayment", covered: "partial", detail: "50% covered" },
      { benefit: `Part B excess charges`, covered: "none" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "none" },
      { benefit: "Blood (first 3 pints)", covered: "partial", detail: "50% covered" },
      { benefit: `${SNF_COINSURANCE}`, covered: "partial", detail: "50% covered" },
      { benefit: "Foreign travel emergency", covered: "none" },
    ],
    highlights: [
      "Lowest premium of any Medigap plan with an OOP maximum",
      "Built-in out-of-pocket maximum ($7,060 in 2026)",
      "Covers 50% of most Medicare cost-sharing",
      "Once you hit the OOP max, Plan K covers 100%",
      "Does NOT cover foreign travel emergency or excess charges",
    ],
    proscons: {
      pros: [
        "Lowest premium among Medigap plans with OOP protection",
        "Out-of-pocket maximum caps worst-case costs",
        "Good for very healthy people who rarely use healthcare",
      ],
      cons: [
        "You pay 50% of most Medicare cost-sharing — can be substantial",
        "High OOP maximum ($7,060) before full coverage kicks in",
        "No foreign travel or excess charge coverage",
        "Costs can be unpredictable with frequent medical needs",
      ],
    },
    faqs: [
      {
        q: "What is the out-of-pocket maximum for Plan K in 2026?",
        a: "The Plan K out-of-pocket maximum is $7,060 in 2026. Once you've paid this amount in covered cost-sharing, Plan K covers 100% of Medicare-approved costs for the rest of the calendar year.",
      },
    ],
    relatedPlans: ["plan-l", "plan-n", "plan-g"],
    intro: "Medicare Supplement Plan K offers the lowest premiums among Medigap plans that include an out-of-pocket maximum. It covers 50% of most Medicare cost-sharing, with your total annual exposure capped at $7,060 in 2026.",
    detailParagraphs: [
      "Plan K is designed for people who are generally healthy and want to minimize their monthly premium while maintaining some protection against catastrophic costs. The trade-off is significant cost-sharing — you pay 50% of most Medicare-covered expenses until you hit the annual out-of-pocket maximum.",
      "For most Medicare beneficiaries, Plan K's high cost-sharing makes it less attractive than Plan N, which offers more comprehensive coverage at a competitive premium. Plan K is best suited for very healthy individuals who rarely use healthcare and want the lowest possible monthly cost.",
    ],
  },

  "plan-m": {
    slug: "plan-m",
    letter: "M",
    displayName: "Medicare Supplement Plan M",
    tagline: "Comprehensive Coverage with 50% Part A Deductible Sharing",
    metaTitle: "Medicare Supplement Plan M: Coverage, Costs & 2026 Guide",
    metaDescription: "Medicare Supplement Plan M covers most Medicare cost-sharing but only 50% of the Part A deductible. See how Plan M compares to Plan G and Plan N.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/plan-m/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-rose-900 via-rose-800 to-slate-900",
    badge: "Available",
    badgeColor: "bg-rose-600",
    monthlyPremiumRange: "$85–$230/mo",
    outOfPocketMax: null,
    bestFor: "Enrollees who want comprehensive coverage at a lower premium and can handle 50% of the Part A deductible",
    notFor: "People who want full Part A deductible coverage",
    availableToNewEnrollees: true,
    requiresPartBDeductible: true,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "partial", detail: "50% covered ($838) — you pay $838" },
      { benefit: "Part B coinsurance or copayment", covered: "full" },
      { benefit: `Part B excess charges`, covered: "none" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "none" },
      { benefit: "Blood (first 3 pints)", covered: "full" },
      { benefit: `${SNF_COINSURANCE}`, covered: "full" },
      { benefit: "Foreign travel emergency (up to plan limits)", covered: "full", detail: "80% after $250 deductible, up to $50,000 lifetime" },
    ],
    highlights: [
      "Covers Part B coinsurance in full — no copays for outpatient services",
      "Covers skilled nursing facility coinsurance",
      "Includes foreign travel emergency coverage",
      "Only pays 50% of the Part A deductible",
      "Lower premiums than Plan G",
    ],
    proscons: {
      pros: [
        "Lower premiums than Plan G",
        "Full Part B coinsurance coverage — no outpatient copays",
        "Skilled nursing facility and foreign travel included",
        "Good balance of coverage and cost",
      ],
      cons: [
        "Only covers 50% of Part A deductible — you pay $838 per hospital admission",
        "Does not cover Part B excess charges",
        "Less widely offered than Plan G or Plan N",
      ],
    },
    faqs: [
      {
        q: "How does Plan M compare to Plan G?",
        a: `Plan M covers 50% of the Part A deductible (you pay $838 in 2026) while Plan G covers 100%. Plan M does not cover Part B excess charges while Plan G does. Plan M premiums are typically lower than Plan G. If you rarely need hospital care, Plan M's savings may outweigh the partial deductible exposure.`,
      },
    ],
    relatedPlans: ["plan-g", "plan-n", "plan-d"],
    intro: "Medicare Supplement Plan M offers broad coverage similar to Plan G but with one key difference: it only covers 50% of the Part A deductible. In exchange, Plan M premiums are lower than Plan G.",
    detailParagraphs: [
      `Plan M is a middle-ground option that covers most Medicare cost-sharing comprehensively, with the exception of the Part A deductible. You're responsible for 50% of the Part A deductible (${PART_A_DEDUCTIBLE} in 2026), meaning you'd pay $838 per hospital admission. Plan M also does not cover Part B excess charges.`,
      "Plan M is less commonly offered than Plan G or Plan N, so you may have fewer carrier options. Before choosing Plan M, compare it carefully to Plan N — which has similar premium savings but different cost-sharing trade-offs.",
    ],
  },

  "high-deductible-plan-g": {
    slug: "high-deductible-plan-g",
    letter: "HD-G",
    displayName: "High Deductible Medicare Supplement Plan G",
    tagline: "Plan G Coverage at a Fraction of the Premium",
    metaTitle: "High Deductible Plan G (HD-G): Coverage, Costs & 2026 Guide",
    metaDescription: "High Deductible Plan G offers the same comprehensive coverage as Plan G but with a high deductible in exchange for significantly lower premiums. Learn if HD-G is right for you.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/high-deductible-plan-g/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-emerald-900 via-emerald-800 to-slate-900",
    badge: "Low Premium",
    badgeColor: "bg-emerald-600",
    monthlyPremiumRange: "$30–$80/mo",
    outOfPocketMax: "$2,870 (2026 deductible)",
    bestFor: "Healthy enrollees who want Plan G's comprehensive coverage at a much lower premium",
    notFor: "People with frequent medical needs who would regularly hit the deductible",
    availableToNewEnrollees: true,
    requiresPartBDeductible: true,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full", detail: "After deductible" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full", detail: "After deductible" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "full", detail: "After plan deductible" },
      { benefit: "Part B coinsurance or copayment", covered: "full", detail: "After deductible" },
      { benefit: `Part B excess charges`, covered: "full", detail: "After deductible" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "none", detail: "Counts toward plan deductible" },
      { benefit: "Blood (first 3 pints)", covered: "full", detail: "After deductible" },
      { benefit: `${SNF_COINSURANCE}`, covered: "full", detail: "After deductible" },
      { benefit: "Foreign travel emergency (up to plan limits)", covered: "full", detail: "After deductible" },
    ],
    highlights: [
      "Premiums typically 60–75% lower than standard Plan G",
      "Same comprehensive coverage as Plan G — after the deductible",
      "Annual deductible: $2,870 in 2026",
      "Covers Part B excess charges (unlike Plan N)",
      "Ideal for healthy enrollees who rarely need care",
    ],
    proscons: {
      pros: [
        "Dramatically lower premiums — often $30–$80/month vs $100–$300 for standard Plan G",
        "Same comprehensive coverage as Plan G once deductible is met",
        "Covers Part B excess charges",
        "Annual savings on premiums can exceed the deductible for healthy people",
        "Includes foreign travel emergency",
      ],
      cons: [
        "You pay all Medicare costs until you reach the $2,870 deductible",
        "Can be expensive in years with significant medical needs",
        "Requires financial discipline — must be able to cover deductible if needed",
        "Less predictable costs than standard Plan G",
      ],
    },
    faqs: [
      {
        q: "What is the deductible for High Deductible Plan G in 2026?",
        a: "The High Deductible Plan G deductible is $2,870 in 2026. This amount is adjusted annually by CMS. You must pay this deductible before Plan G begins covering your Medicare cost-sharing.",
      },
      {
        q: "Is High Deductible Plan G worth it?",
        a: "HD-G makes financial sense if your annual premium savings exceed your expected out-of-pocket costs. For example, if HD-G saves you $150/month ($1,800/year) compared to standard Plan G, and your typical annual medical costs are under $2,870, you'll likely come out ahead. It's best for healthy people who rarely need care.",
      },
      {
        q: "How does HD-G compare to a Medicare Advantage plan?",
        a: "Both HD-G and Medicare Advantage offer lower premiums than standard Medigap plans. The key difference: HD-G works with Original Medicare (no networks, nationwide coverage), while Medicare Advantage uses provider networks. HD-G is better for people who travel frequently or want to see any doctor.",
      },
    ],
    relatedPlans: ["plan-g", "high-deductible-plan-f", "plan-n"],
    intro: "High Deductible Plan G (HD-G) offers the same comprehensive coverage as standard Plan G but requires you to pay a deductible ($2,870 in 2026) before the plan begins covering your Medicare costs. In exchange, premiums are dramatically lower — often $30–$80/month compared to $100–$300 for standard Plan G.",
    detailParagraphs: [
      "HD-G was introduced in 2020 as an alternative to High Deductible Plan F (which became unavailable to new enrollees). It functions identically to standard Plan G once the deductible is met — covering 100% of Medicare-approved costs including Part B excess charges and foreign travel emergency.",
      "The financial math for HD-G is straightforward: compare your annual premium savings to your expected out-of-pocket costs. If you save $1,800/year in premiums and typically spend less than $2,870 in Medicare cost-sharing, HD-G comes out ahead. Many healthy Medicare beneficiaries find that they never come close to hitting the deductible.",
      "HD-G is particularly attractive for people who are newly eligible for Medicare and in good health. The premium savings can be invested or used to build a health savings buffer. As you age and healthcare needs increase, you can always switch to standard Plan G (subject to medical underwriting outside your initial enrollment period).",
    ],
  },

  "high-deductible-plan-f": {
    slug: "high-deductible-plan-f",
    letter: "HD-F",
    displayName: "High Deductible Medicare Supplement Plan F",
    tagline: "Plan F's Comprehensive Coverage at a Lower Premium (Pre-2020 Enrollees Only)",
    metaTitle: "High Deductible Plan F (HD-F): Coverage, Costs & Eligibility 2026",
    metaDescription: "High Deductible Plan F offers Plan F's comprehensive coverage with a high deductible in exchange for lower premiums. Only available to those eligible for Medicare before 2020.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/high-deductible-plan-f/",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
    heroColor: "from-violet-900 via-violet-800 to-slate-900",
    badge: "Pre-2020 Only",
    badgeColor: "bg-violet-500",
    monthlyPremiumRange: "$30–$80/mo",
    outOfPocketMax: "$2,870 (2026 deductible)",
    bestFor: "Pre-2020 Medicare enrollees who want Plan F coverage at a lower premium",
    notFor: "Anyone newly eligible for Medicare after January 1, 2020",
    availableToNewEnrollees: false,
    requiresPartBDeductible: false,
    benefits: [
      { benefit: "Part A hospital coinsurance & costs (up to 365 days after Medicare benefits)", covered: "full", detail: "After deductible" },
      { benefit: "Part A hospice care coinsurance or copayment", covered: "full", detail: "After deductible" },
      { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: "full", detail: "After plan deductible" },
      { benefit: "Part B coinsurance or copayment", covered: "full", detail: "After deductible" },
      { benefit: `Part B excess charges`, covered: "full", detail: "After deductible" },
      { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: "full", detail: "Counts toward plan deductible" },
      { benefit: "Blood (first 3 pints)", covered: "full", detail: "After deductible" },
      { benefit: `${SNF_COINSURANCE}`, covered: "full", detail: "After deductible" },
      { benefit: "Foreign travel emergency (up to plan limits)", covered: "full", detail: "After deductible" },
    ],
    highlights: [
      "Same coverage as Plan F — including Part B deductible — after plan deductible",
      "Annual deductible: $2,870 in 2026",
      "Premiums typically 60–75% lower than standard Plan F",
      "Only available to those eligible for Medicare before January 1, 2020",
      "Covers Part B excess charges (after deductible)",
    ],
    proscons: {
      pros: [
        "Dramatically lower premiums than standard Plan F",
        "Covers the Part B deductible (after plan deductible) — unlike HD-G",
        "Same comprehensive coverage as Plan F once deductible is met",
        "Good option for healthy pre-2020 enrollees on standard Plan F",
      ],
      cons: [
        "Not available to new Medicare enrollees",
        "You pay all Medicare costs until the $2,870 deductible is reached",
        "Shrinking risk pool may cause faster premium increases",
        "HD-G is available to all enrollees and offers similar savings",
      ],
    },
    faqs: [
      {
        q: "What is the difference between HD-F and HD-G?",
        a: "HD-F covers the Part B deductible (after the plan deductible) while HD-G does not. HD-F is only available to those eligible for Medicare before January 1, 2020. HD-G is available to all new enrollees. For most people, HD-G is the better choice since the Part B deductible is only $257 and HD-G is available to everyone.",
      },
    ],
    relatedPlans: ["plan-f", "high-deductible-plan-g", "plan-g"],
    intro: "High Deductible Plan F (HD-F) offers the same comprehensive coverage as standard Plan F — including the Part B deductible — but requires you to pay a deductible ($2,870 in 2026) before coverage begins. Like Plan F, HD-F is only available to people who were eligible for Medicare before January 1, 2020.",
    detailParagraphs: [
      "HD-F is essentially Plan F with a high deductible in exchange for lower premiums. Once you've paid the $2,870 deductible, HD-F covers 100% of Medicare-approved costs — including the Part B deductible and excess charges.",
      "For people currently on standard Plan F with high premiums, HD-F can offer significant savings. The premium difference between standard Plan F and HD-F is often $100–$150/month, which can easily exceed the deductible in years with minimal healthcare use.",
    ],
  },
};

// Non-letter plan pages
export const MEDIGAP_SPECIAL_PAGES = {
  compare: {
    slug: "compare",
    title: "Compare Medicare Supplement Plans",
    metaTitle: "Compare All Medicare Supplement Plans Side by Side | 2026",
    metaDescription: "Compare all 10 Medigap plan letters side by side. See which Medicare Supplement plan covers what, and find the best plan for your health and budget.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/compare/",
  },
  eligibility: {
    slug: "medigap-eligibility",
    title: "Medigap Eligibility",
    metaTitle: "Medigap Eligibility: Who Can Enroll in Medicare Supplement Insurance?",
    metaDescription: "Learn who is eligible for Medigap, when to enroll, and how medical underwriting works. Find out about your Medigap Open Enrollment Period and guaranteed issue rights.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/medigap-eligibility/",
  },
  plans2026: {
    slug: "medicare-supplement-plans-2026",
    title: "Medicare Supplement Plans 2026",
    metaTitle: "Medicare Supplement Plans 2026: Changes, Costs & What's New",
    metaDescription: "See what's changing with Medicare Supplement plans in 2026, including updated deductibles, out-of-pocket maximums, and premium trends for all Medigap plan letters.",
    canonical: "https://www.medicarefaq.com/medicare-supplements/medicare-supplement-plans-2026/",
  },
};
