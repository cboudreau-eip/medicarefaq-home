/**
 * Part D Sub-Page Data
 * Data for all 11 Medicare Part D sub-pages under
 * /original-medicare/medicare-parts/medicare-part-d/
 */

export interface PartDSubPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  heroIcon: string;
  sections: PartDSection[];
  faqs: { q: string; a: string }[];
  relatedLinks: { label: string; href: string }[];
}

export interface PartDSection {
  id: string;
  heading: string;
  content: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  callout?: { type: "info" | "warning" | "tip"; text: string };
}

export const partDSubPages: PartDSubPage[] = [
  {
    slug: "silverscript",
    title: "SilverScript Medicare Part D Plans",
    metaTitle: "SilverScript Part D Plans 2026 | Review, Costs & Coverage",
    metaDescription: "SilverScript is one of the most popular Medicare Part D prescription drug plans. Compare SilverScript plan options, 2026 premiums, formularies, and how to enroll.",
    heroSubtitle: "SilverScript is a CVS Health company offering standalone Medicare Part D prescription drug plans nationwide. It's consistently one of the most enrolled Part D plans in the country.",
    heroIcon: "Pill",
    sections: [
      {
        id: "overview",
        heading: "What Is SilverScript?",
        content: "SilverScript Insurance Company is a subsidiary of CVS Health that offers Medicare Part D prescription drug plans. With millions of enrollees, SilverScript is one of the largest Part D plan sponsors in the United States. Plans are available in all 50 states and Washington D.C.",
      },
      {
        id: "plans",
        heading: "SilverScript Plan Options in 2026",
        content: "SilverScript typically offers three plan tiers to meet different needs and budgets:",
        bullets: [
          "SilverScript SmartSaver — Low premium, higher cost-sharing. Best for those who take few or no medications.",
          "SilverScript Choice — Mid-tier plan with moderate premiums and cost-sharing. Covers a broad formulary.",
          "SilverScript Plus — Higher premium with lower cost-sharing and broader formulary coverage including more brand-name drugs.",
        ],
        callout: { type: "info", text: "Premiums, deductibles, and formularies change each year. Always compare plans during Annual Enrollment Period (Oct 15 – Dec 7) to ensure your medications are still covered at a reasonable cost." },
      },
      {
        id: "costs",
        heading: "2026 SilverScript Costs",
        content: "SilverScript plan costs vary by region and plan tier. General ranges for 2026:",
        table: {
          headers: ["Plan", "Est. Monthly Premium", "Deductible", "Tier 1 Copay"],
          rows: [
            ["SmartSaver", "$0 – $15/mo", "Up to $590", "$0 – $5"],
            ["Choice", "$20 – $45/mo", "$0 – $590", "$0 – $5"],
            ["Plus", "$50 – $90/mo", "$0", "$0 – $5"],
          ],
        },
      },
      {
        id: "formulary",
        heading: "SilverScript Formulary",
        content: "SilverScript uses a tiered formulary with 5 drug tiers. Tier 1 (preferred generics) and Tier 2 (generics) have the lowest cost-sharing. Tier 3 (preferred brands), Tier 4 (non-preferred brands), and Tier 5 (specialty drugs) have higher cost-sharing. Always check that your specific medications are on the plan's formulary before enrolling.",
        callout: { type: "warning", text: "Formularies can change annually. If your drug is removed from the formulary or moved to a higher tier, you may face higher costs. Review the Annual Notice of Change (ANOC) each fall." },
      },
      {
        id: "cvs-advantage",
        heading: "CVS Pharmacy Network Advantage",
        content: "As a CVS Health company, SilverScript enrollees often benefit from preferred pricing at CVS Pharmacy locations. If you regularly use CVS, SilverScript may offer lower copays compared to other pharmacies in the network.",
      },
    ],
    faqs: [
      { q: "Is SilverScript a good Part D plan?", a: "SilverScript consistently ranks among the most popular Part D plans due to its competitive premiums and nationwide availability. However, 'good' depends on your specific medications. Always compare SilverScript's formulary against your drug list before enrolling." },
      { q: "Can I use SilverScript with Medicare Supplement?", a: "Yes. SilverScript is a standalone Part D plan that works alongside Original Medicare and any Medigap supplement plan. It does not work with Medicare Advantage plans, which typically include their own drug coverage." },
      { q: "How do I enroll in SilverScript?", a: "You can enroll online at Medicare.gov, by calling SilverScript directly, or by working with a licensed Medicare agent. Enrollment is available during your Initial Coverage Election Period (ICEP) or the Annual Enrollment Period (Oct 15 – Dec 7)." },
    ],
    relatedLinks: [
      { label: "Medicare Part D Overview", href: "/original-medicare/medicare-parts/medicare-part-d" },
      { label: "Part D Plans 2026", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-plans-2026" },
      { label: "Part D Enrollment Periods", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-enrollment-periods" },
    ],
  },
  {
    slug: "medicare-part-d-plans-2026",
    title: "Medicare Part D Plans 2026",
    metaTitle: "Best Medicare Part D Plans 2026 | Compare Drug Coverage & Costs",
    metaDescription: "Compare the best Medicare Part D prescription drug plans for 2026. See top-rated plans, average premiums, deductibles, and how to find the right plan for your medications.",
    heroSubtitle: "Medicare Part D prescription drug plans for 2026 bring a major change: the out-of-pocket cap drops to $2,000, eliminating the coverage gap. Here's what you need to know when comparing plans.",
    heroIcon: "Pill",
    sections: [
      {
        id: "key-changes",
        heading: "Key Changes for Part D in 2026",
        content: "The Inflation Reduction Act continues to reshape Part D in 2026:",
        bullets: [
          "$2,000 out-of-pocket cap — once you spend $2,000 on covered drugs, you pay $0 for the rest of the year",
          "Medicare Prescription Payment Plan — spread your out-of-pocket costs across monthly installments",
          "Vaccine coverage — most recommended vaccines are covered at $0 cost-sharing",
          "Insulin cap — insulin costs capped at $35/month per covered insulin",
        ],
        callout: { type: "tip", text: "The $2,000 OOP cap is a significant benefit for people who take expensive brand-name or specialty drugs. If you previously hit the coverage gap, you'll likely see substantial savings in 2026." },
      },
      {
        id: "average-costs",
        heading: "Average Part D Costs in 2026",
        content: "National averages for standalone Part D plans in 2026:",
        table: {
          headers: ["Cost Type", "2026 Amount", "Notes"],
          rows: [
            ["Average Monthly Premium", "~$46/month", "Varies widely by plan and region"],
            ["Maximum Deductible", "$590", "Some plans have $0 deductible"],
            ["Out-of-Pocket Cap", "$2,000", "New for 2025, continuing in 2026"],
            ["Insulin Cap", "$35/month", "Per covered insulin product"],
          ],
        },
      },
      {
        id: "top-plans",
        heading: "Top-Rated Part D Plan Sponsors in 2026",
        content: "Several plan sponsors consistently receive high CMS star ratings:",
        bullets: [
          "SilverScript (CVS Health) — largest enrollment, competitive premiums",
          "Humana Walmart Value Rx — low premium option with Walmart pharmacy network",
          "WellCare Value Script — low-cost option in many regions",
          "UnitedHealthcare Walgreens Rx — preferred pricing at Walgreens",
          "Aetna Medicare Rx — broad formulary coverage",
        ],
        callout: { type: "info", text: "Plan star ratings and availability change annually. Use Medicare.gov's Plan Finder tool to compare plans based on your specific medications and preferred pharmacy." },
      },
      {
        id: "how-to-compare",
        heading: "How to Compare Part D Plans",
        content: "Follow these steps to find the best plan for your needs:",
        bullets: [
          "List all your current medications (drug name, dosage, frequency)",
          "Go to Medicare.gov Plan Finder and enter your drugs and preferred pharmacy",
          "Compare total estimated annual costs (premium + deductible + copays) — not just the monthly premium",
          "Check the star rating (5-star plans offer the best quality and service)",
          "Review the pharmacy network to ensure your preferred pharmacy is in-network",
          "Check for prior authorization or step therapy requirements on your drugs",
        ],
      },
    ],
    faqs: [
      { q: "What is the best Medicare Part D plan for 2026?", a: "There is no single 'best' plan — it depends on your specific medications, preferred pharmacy, and budget. Use Medicare.gov's Plan Finder to compare plans based on your drug list. The plan with the lowest total annual cost for your specific drugs is generally the best choice." },
      { q: "Can I change my Part D plan every year?", a: "Yes. During the Annual Enrollment Period (October 15 – December 7), you can switch to any Part D plan available in your area. Changes take effect January 1 of the following year." },
      { q: "Do I need Part D if I don't take any medications?", a: "You're not required to have Part D, but if you go without creditable drug coverage for 63 or more consecutive days after becoming eligible, you'll face a permanent late enrollment penalty when you do eventually enroll." },
    ],
    relatedLinks: [
      { label: "Part D Overview", href: "/original-medicare/medicare-parts/medicare-part-d" },
      { label: "SilverScript Plans", href: "/original-medicare/medicare-parts/medicare-part-d/silverscript" },
      { label: "Part D Late Enrollment Penalty", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-late-enrollment-penalty" },
    ],
  },
  {
    slug: "medicare-part-d-enrollment-periods",
    title: "Medicare Part D Enrollment Periods",
    metaTitle: "Medicare Part D Enrollment Periods 2026 | When to Sign Up",
    metaDescription: "Learn about all Medicare Part D enrollment periods: Initial Coverage Election Period, Annual Enrollment Period, Special Enrollment Periods, and how to avoid the late enrollment penalty.",
    heroSubtitle: "Knowing when you can enroll in, switch, or drop a Medicare Part D plan is essential to avoiding penalties and ensuring you have coverage when you need it.",
    heroIcon: "Calendar",
    sections: [
      {
        id: "icep",
        heading: "Initial Coverage Election Period (ICEP)",
        content: "Your first opportunity to enroll in a Part D plan. The ICEP runs for the same 7-month window as your Medicare Initial Enrollment Period — 3 months before your 65th birthday month, your birthday month, and 3 months after. If you're enrolling in Part D due to disability, your ICEP begins 3 months before your 25th month of disability benefits.",
        callout: { type: "tip", text: "Enroll during the first 3 months of your ICEP for the earliest possible coverage start date. Enrolling in the last 3 months may delay your coverage start." },
      },
      {
        id: "aep",
        heading: "Annual Enrollment Period (AEP)",
        content: "The main window to make changes to your Part D coverage each year. Runs October 15 – December 7. During AEP you can:",
        bullets: [
          "Enroll in a Part D plan for the first time (if you missed your ICEP)",
          "Switch from one Part D plan to another",
          "Drop a Part D plan (not recommended unless you have other creditable coverage)",
          "Switch from Original Medicare + Part D to Medicare Advantage with drug coverage",
        ],
      },
      {
        id: "oep",
        heading: "Medicare Advantage Open Enrollment Period (OEP)",
        content: "January 1 – March 31 each year. If you're enrolled in a Medicare Advantage plan, you can switch to a different MA plan or drop MA and return to Original Medicare (and enroll in a standalone Part D plan). This period does not allow you to enroll in a Part D plan if you're already on Original Medicare without drug coverage.",
      },
      {
        id: "sep",
        heading: "Special Enrollment Periods (SEPs)",
        content: "Certain life events trigger a Special Enrollment Period that allows you to make Part D changes outside the standard windows:",
        bullets: [
          "Moving out of your plan's service area",
          "Losing other creditable drug coverage (employer plan, TRICARE, VA)",
          "Qualifying for Extra Help (Low Income Subsidy)",
          "Moving into or out of a long-term care facility",
          "Your plan loses its contract with Medicare",
          "Gaining or losing Medicaid eligibility",
        ],
      },
    ],
    faqs: [
      { q: "What happens if I miss all enrollment periods?", a: "If you miss your ICEP and don't qualify for a SEP, you must wait until the Annual Enrollment Period (Oct 15 – Dec 7). If you went without creditable drug coverage during the gap, you'll face a permanent late enrollment penalty." },
      { q: "Can I enroll in Part D at any time if I have a qualifying event?", a: "Yes. A Special Enrollment Period is triggered by qualifying life events. The SEP typically lasts 2 months after the triggering event. Contact Medicare or a licensed agent to confirm your SEP eligibility." },
      { q: "When does my new Part D coverage start after enrolling?", a: "If you enroll during AEP (Oct 15 – Dec 7), coverage starts January 1. If you enroll during your ICEP in the 3 months before your birthday month, coverage starts the first day of your birthday month. Enrolling in your birthday month or the 3 months after may delay coverage by 1–3 months." },
    ],
    relatedLinks: [
      { label: "Part D Overview", href: "/original-medicare/medicare-parts/medicare-part-d" },
      { label: "Part D Late Enrollment Penalty", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-late-enrollment-penalty" },
      { label: "Part D Eligibility", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-eligibility" },
    ],
  },
  {
    slug: "medicare-part-d-eligibility",
    title: "Medicare Part D Eligibility",
    metaTitle: "Medicare Part D Eligibility 2026 | Who Qualifies for Drug Coverage",
    metaDescription: "Learn who is eligible for Medicare Part D prescription drug coverage, when you can enroll, and what happens if you delay enrollment.",
    heroSubtitle: "Medicare Part D prescription drug coverage is available to anyone enrolled in Medicare Part A or Part B. Understanding eligibility rules helps you enroll at the right time and avoid penalties.",
    heroIcon: "Shield",
    sections: [
      {
        id: "basic-eligibility",
        heading: "Basic Eligibility Requirements",
        content: "To be eligible for Medicare Part D, you must:",
        bullets: [
          "Be enrolled in Medicare Part A and/or Part B",
          "Live in the plan's service area",
          "Be a U.S. citizen or lawfully present resident",
        ],
        callout: { type: "info", text: "You do not need to be enrolled in both Part A and Part B. Enrollment in either Part A or Part B makes you eligible for Part D." },
      },
      {
        id: "under-65",
        heading: "Part D Eligibility Under Age 65",
        content: "If you're under 65 and enrolled in Medicare due to disability, ESRD, or ALS, you're also eligible for Part D. Your Initial Coverage Election Period begins 3 months before your 25th month of receiving Social Security Disability Insurance (SSDI) benefits — the same month your Medicare coverage begins.",
      },
      {
        id: "employer-coverage",
        heading: "Employer Coverage and Part D",
        content: "If you have prescription drug coverage through an employer or union plan, you may not need to enroll in Part D immediately. However, you must verify that your employer coverage is 'creditable' — meaning it's at least as good as standard Part D coverage. If it is, you can delay Part D enrollment without penalty.",
        callout: { type: "warning", text: "If your employer coverage is not creditable, you should enroll in Part D during your ICEP to avoid the late enrollment penalty." },
      },
      {
        id: "extra-help",
        heading: "Extra Help (Low Income Subsidy)",
        content: "If you have limited income and resources, you may qualify for Extra Help — a federal program that pays Part D premiums, deductibles, and copays. In 2026, individuals with income up to 150% of the federal poverty level may qualify. Extra Help enrollees are automatically enrolled in a benchmark Part D plan if they don't choose one themselves.",
      },
    ],
    faqs: [
      { q: "Do I have to enroll in Part D?", a: "No, Part D is voluntary. However, if you go without creditable drug coverage for 63 or more consecutive days after becoming eligible, you'll face a permanent late enrollment penalty when you do enroll." },
      { q: "Can I enroll in Part D if I have VA drug benefits?", a: "VA drug benefits are generally considered creditable coverage, so you can delay Part D enrollment without penalty. However, VA coverage and Part D don't work together — you'd use one or the other for a given prescription." },
      { q: "What if I'm still working at 65 with employer drug coverage?", a: "If your employer drug coverage is creditable, you can delay Part D without penalty. Get a letter from your employer confirming the coverage is creditable, and keep it in case you need to prove it later." },
    ],
    relatedLinks: [
      { label: "Part D Enrollment Periods", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-enrollment-periods" },
      { label: "Part D Late Enrollment Penalty", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-late-enrollment-penalty" },
      { label: "Extra Help Program", href: "/faqs/medicare-extra-help-program" },
    ],
  },
  {
    slug: "medicare-part-d-coverage-gap",
    title: "Medicare Part D Coverage Gap (Donut Hole)",
    metaTitle: "Medicare Part D Coverage Gap (Donut Hole) 2026 | What You Need to Know",
    metaDescription: "The Medicare Part D coverage gap (donut hole) has been eliminated for 2025 and 2026. Learn what changed, what the $2,000 out-of-pocket cap means, and how it affects your drug costs.",
    heroSubtitle: "The Medicare Part D coverage gap — once a major source of unexpected drug costs — has been effectively eliminated. Starting in 2025, a $2,000 annual out-of-pocket cap limits your drug spending.",
    heroIcon: "TrendingDown",
    sections: [
      {
        id: "what-changed",
        heading: "What Changed: The Donut Hole Is Closed",
        content: "The Inflation Reduction Act of 2022 phased out the Medicare Part D coverage gap. Starting in 2025 (and continuing in 2026), once you spend $2,000 out-of-pocket on covered drugs, you pay $0 for the rest of the year. This eliminates the 'donut hole' that previously required beneficiaries to pay 25% of drug costs in a gap phase.",
        callout: { type: "tip", text: "If you previously hit the coverage gap and faced higher drug costs, you'll benefit significantly from the $2,000 cap. People who take expensive specialty or brand-name drugs will see the most savings." },
      },
      {
        id: "how-it-works",
        heading: "How Part D Cost Phases Work in 2026",
        content: "Part D still has phases, but the catastrophic phase now kicks in at $2,000 OOP:",
        table: {
          headers: ["Phase", "Your Spending Threshold", "What You Pay"],
          rows: [
            ["Deductible Phase", "First $590 (if plan has deductible)", "100% of drug costs"],
            ["Initial Coverage Phase", "Up to $2,000 total OOP", "Copays/coinsurance per tier"],
            ["Catastrophic Coverage", "After $2,000 OOP", "$0 for covered drugs"],
          ],
        },
      },
      {
        id: "payment-plan",
        heading: "Medicare Prescription Payment Plan",
        content: "A new option for 2025 and 2026 allows you to spread your Part D out-of-pocket costs across monthly payments throughout the year, rather than paying large amounts upfront when you fill expensive prescriptions. This is especially helpful for people who take specialty drugs early in the year.",
        bullets: [
          "Opt in through your Part D plan",
          "Your plan pays the pharmacy upfront",
          "You repay the plan in equal monthly installments",
          "No interest charged",
        ],
      },
    ],
    faqs: [
      { q: "Is the donut hole completely gone in 2026?", a: "Yes. The coverage gap (donut hole) has been effectively eliminated. The $2,000 out-of-pocket cap means you'll never pay more than $2,000 for covered drugs in a calendar year, regardless of the total cost of your medications." },
      { q: "Does the $2,000 cap include the premium?", a: "No. The $2,000 out-of-pocket cap applies only to cost-sharing (deductibles, copays, and coinsurance) for covered drugs. Monthly premiums do not count toward the cap." },
      { q: "What counts toward the $2,000 out-of-pocket cap?", a: "Your deductible, copays, and coinsurance for covered drugs count toward the cap. Amounts paid by Extra Help (Low Income Subsidy) also count. Premiums and costs for non-covered drugs do not count." },
    ],
    relatedLinks: [
      { label: "Part D Overview", href: "/original-medicare/medicare-parts/medicare-part-d" },
      { label: "Part D Plans 2026", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-plans-2026" },
      { label: "Part D Costs", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-cost" },
    ],
  },
  {
    slug: "medicare-part-d-formulary",
    title: "Medicare Part D Formulary",
    metaTitle: "Medicare Part D Formulary 2026 | How Drug Tiers & Formularies Work",
    metaDescription: "Understand Medicare Part D formularies: how drug tiers work, how to check if your medications are covered, and what to do if your drug isn't on the formulary.",
    heroSubtitle: "A formulary is the list of prescription drugs covered by a Medicare Part D plan. Understanding how formularies and drug tiers work helps you choose the right plan and manage your drug costs.",
    heroIcon: "FileText",
    sections: [
      {
        id: "what-is-formulary",
        heading: "What Is a Part D Formulary?",
        content: "A formulary is a list of prescription drugs that a Medicare Part D plan covers. Each plan has its own formulary, which is organized into tiers. Drugs on lower tiers generally have lower cost-sharing (copays or coinsurance) than drugs on higher tiers. Plans must cover at least two drugs in each therapeutic category and class, and all drugs in six 'protected classes' (antidepressants, antipsychotics, anticonvulsants, immunosuppressants, antiretrovirals, and antineoplastics).",
      },
      {
        id: "drug-tiers",
        heading: "Drug Tier Structure",
        content: "Most Part D plans use a 5-tier formulary:",
        table: {
          headers: ["Tier", "Drug Type", "Typical Cost"],
          rows: [
            ["Tier 1", "Preferred Generic", "$0 – $15 copay"],
            ["Tier 2", "Generic", "$5 – $25 copay"],
            ["Tier 3", "Preferred Brand", "$25 – $60 copay"],
            ["Tier 4", "Non-Preferred Brand", "$60 – $150 copay"],
            ["Tier 5", "Specialty", "25%–33% coinsurance"],
          ],
        },
      },
      {
        id: "check-formulary",
        heading: "How to Check If Your Drug Is Covered",
        content: "Before enrolling in a Part D plan, always verify your medications are on the formulary:",
        bullets: [
          "Use Medicare.gov Plan Finder — enter your drugs to see which plans cover them and at what cost",
          "Visit the plan's website and search the formulary directly",
          "Call the plan's member services number",
          "Work with a licensed Medicare agent who can check multiple plans at once",
        ],
        callout: { type: "warning", text: "Formularies change every January 1. Even if your drug was covered last year, check again during Annual Enrollment Period to make sure it's still covered at the same tier." },
      },
      {
        id: "not-on-formulary",
        heading: "What to Do If Your Drug Isn't on the Formulary",
        content: "If your medication isn't covered or is on a high-cost tier, you have options:",
        bullets: [
          "Request a formulary exception — ask the plan to cover your drug at a lower cost-sharing level if your doctor certifies it's medically necessary",
          "Ask about therapeutic alternatives — your doctor may be able to prescribe a covered drug in the same class",
          "File an appeal if your exception request is denied",
          "Switch plans during Annual Enrollment Period to one that covers your drug",
        ],
      },
    ],
    faqs: [
      { q: "Can a Part D plan remove my drug from the formulary mid-year?", a: "Generally, plans cannot remove drugs from the formulary mid-year except in limited circumstances (like if the FDA withdraws the drug or the manufacturer stops producing it). However, plans can change tier placement and cost-sharing at the start of each plan year." },
      { q: "What is a formulary exception?", a: "A formulary exception is a request to have your plan cover a drug that isn't on the formulary, or to cover a drug at a lower cost-sharing tier. Your doctor must provide a supporting statement explaining why the formulary drug isn't appropriate for your condition." },
      { q: "Are all generics covered by Part D?", a: "Not necessarily. While most Part D plans cover a broad range of generics, each plan's formulary is different. Some generics may not be covered, or may be on a higher tier than expected. Always check the specific plan's formulary for your medications." },
    ],
    relatedLinks: [
      { label: "Part D Drug Tiers", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-drug-tiers" },
      { label: "Part D Prior Authorization", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-prior-authorization" },
      { label: "Part D Exceptions and Appeals", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-exceptions-and-appeals" },
    ],
  },
  {
    slug: "medicare-part-d-late-enrollment-penalty",
    title: "Medicare Part D Late Enrollment Penalty",
    metaTitle: "Medicare Part D Late Enrollment Penalty 2026 | How to Avoid It",
    metaDescription: "The Medicare Part D late enrollment penalty is permanent and adds 1% per month to your premium. Learn how it's calculated, who is exempt, and how to avoid it.",
    heroSubtitle: "The Medicare Part D late enrollment penalty is a permanent surcharge added to your monthly premium if you go without creditable drug coverage for 63 or more consecutive days after becoming eligible.",
    heroIcon: "AlertTriangle",
    sections: [
      {
        id: "how-calculated",
        heading: "How the Penalty Is Calculated",
        content: "The late enrollment penalty is 1% of the national base beneficiary premium for each full month you went without creditable drug coverage. In 2026, the national base beneficiary premium is approximately $36.78/month.",
        callout: { type: "warning", text: "Example: If you went 24 months without creditable coverage, your penalty would be 24% × $36.78 = ~$8.83/month added permanently to your Part D premium. This amount adjusts slightly each year as the base premium changes." },
      },
      {
        id: "who-is-exempt",
        heading: "Who Is Exempt from the Penalty",
        content: "You won't face a late enrollment penalty if you had creditable coverage during the gap period. Creditable coverage includes:",
        bullets: [
          "Employer or union prescription drug coverage (must be certified as creditable)",
          "TRICARE (military coverage)",
          "VA drug benefits",
          "FEHB (Federal Employees Health Benefits)",
          "PACE (Program of All-inclusive Care for the Elderly)",
          "Indian Health Service coverage",
          "Extra Help / Low Income Subsidy",
        ],
      },
      {
        id: "how-to-avoid",
        heading: "How to Avoid the Penalty",
        content: "The simplest way to avoid the penalty is to enroll in a Part D plan during your Initial Coverage Election Period (ICEP) — even if you don't take any medications. Low-premium plans (sometimes $0–$15/month) exist specifically for people who want to avoid the penalty without paying much.",
        callout: { type: "tip", text: "A $0-premium Part D plan can protect you from the late enrollment penalty at no cost. If you rarely use prescription drugs, this is often the smartest move." },
      },
      {
        id: "appealing",
        heading: "Appealing the Penalty",
        content: "If you believe you were incorrectly assessed a late enrollment penalty, you can appeal. Common grounds for appeal include: you had creditable coverage but it wasn't reported to Medicare, or you were enrolled in a plan that didn't notify you it wasn't creditable. Contact Medicare at 1-800-MEDICARE to begin the appeals process.",
      },
    ],
    faqs: [
      { q: "Is the Part D late enrollment penalty permanent?", a: "Yes. The penalty is added to your monthly Part D premium for as long as you have Medicare drug coverage. It doesn't go away after a certain number of years." },
      { q: "How do I prove I had creditable coverage?", a: "Your former employer, union, or insurer should have sent you a notice of creditable coverage. Keep this document. If you need to prove prior creditable coverage, contact your former plan sponsor for documentation." },
      { q: "Can I get the penalty waived?", a: "In limited circumstances, yes. If you can prove you had creditable coverage that wasn't properly reported to Medicare, or if you qualify for a Special Enrollment Period, the penalty may be waived or reduced. Contact Medicare directly to request a review." },
    ],
    relatedLinks: [
      { label: "Part D Enrollment Periods", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-enrollment-periods" },
      { label: "Part D Eligibility", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-eligibility" },
      { label: "Part D Plans 2026", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-plans-2026" },
    ],
  },
  {
    slug: "medicare-part-d-deductible",
    title: "Medicare Part D Deductible 2026",
    metaTitle: "Medicare Part D Deductible 2026 | $590 Maximum & How It Works",
    metaDescription: "The maximum Medicare Part D deductible in 2026 is $590. Learn how the deductible works, which plans have $0 deductibles, and how it affects your drug costs.",
    heroSubtitle: "The Medicare Part D deductible is the amount you pay out-of-pocket for covered drugs before your plan starts sharing costs. In 2026, the maximum deductible is $590, though many plans have lower or $0 deductibles.",
    heroIcon: "DollarSign",
    sections: [
      {
        id: "how-it-works",
        heading: "How the Part D Deductible Works",
        content: "The deductible is the first phase of Part D coverage. During this phase, you pay 100% of the cost of your covered drugs until you've spent the deductible amount. After meeting the deductible, you move into the initial coverage phase where you pay copays or coinsurance based on your drug's tier.",
        callout: { type: "info", text: "Not all drugs are subject to the deductible. Many plans waive the deductible for Tier 1 (preferred generic) drugs, meaning you pay only a small copay from day one." },
      },
      {
        id: "2026-amounts",
        heading: "2026 Part D Deductible Amounts",
        content: "Key deductible facts for 2026:",
        table: {
          headers: ["Item", "Amount"],
          rows: [
            ["Maximum Allowable Deductible", "$590"],
            ["Average Deductible (plans with deductible)", "~$400 – $500"],
            ["Plans with $0 Deductible", "Available in most regions"],
            ["Deductible for Tier 1 Generics (many plans)", "$0"],
          ],
        },
      },
      {
        id: "zero-deductible",
        heading: "Plans with $0 Deductible",
        content: "Many Part D plans offer $0 deductibles, particularly for generic drugs. However, these plans typically have higher monthly premiums to offset the lower cost-sharing. When comparing plans, look at the total annual cost (premium + deductible + copays) rather than just the deductible amount.",
        callout: { type: "tip", text: "A plan with a $0 deductible and $50/month premium may cost more annually than a plan with a $590 deductible and $15/month premium — especially if you only take generics. Always compare total estimated annual costs." },
      },
    ],
    faqs: [
      { q: "Does the Part D deductible reset every year?", a: "Yes. The Part D deductible resets on January 1 each year. You start fresh each calendar year and must meet the deductible again before your plan begins sharing costs." },
      { q: "Do all drugs count toward the deductible?", a: "Only covered drugs that are subject to the deductible count. Many plans exempt Tier 1 (preferred generic) drugs from the deductible, so you pay only a small copay for those drugs from day one." },
      { q: "Can I find a Part D plan with no deductible?", a: "Yes. Many Part D plans offer $0 deductibles, though they typically have higher monthly premiums. Use Medicare.gov Plan Finder to compare plans with and without deductibles based on your specific medications." },
    ],
    relatedLinks: [
      { label: "Part D Costs Overview", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-cost" },
      { label: "Part D Coverage Gap", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-coverage-gap" },
      { label: "Part D Plans 2026", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-plans-2026" },
    ],
  },
  {
    slug: "medicare-part-d-cost",
    title: "Medicare Part D Costs 2026",
    metaTitle: "Medicare Part D Costs 2026 | Premiums, Deductibles & Out-of-Pocket",
    metaDescription: "Complete breakdown of Medicare Part D costs in 2026: average premiums, $590 maximum deductible, drug tier copays, $2,000 out-of-pocket cap, and IRMAA surcharges.",
    heroSubtitle: "Understanding all the cost components of Medicare Part D helps you budget accurately and choose the plan that minimizes your total annual drug spending.",
    heroIcon: "DollarSign",
    sections: [
      {
        id: "cost-components",
        heading: "Part D Cost Components",
        content: "Medicare Part D has four main cost components:",
        table: {
          headers: ["Cost Type", "2026 Amount", "Notes"],
          rows: [
            ["Monthly Premium", "~$0 – $100+", "Average ~$46/month; varies by plan"],
            ["Annual Deductible", "Up to $590", "Some plans have $0 deductible"],
            ["Copays/Coinsurance", "Varies by tier", "$0–$15 for generics; 25–33% for specialty"],
            ["Out-of-Pocket Cap", "$2,000", "After $2,000 OOP, you pay $0"],
          ],
        },
      },
      {
        id: "irmaa",
        heading: "IRMAA: Part D Income Surcharges",
        content: "Higher-income beneficiaries pay an additional amount (IRMAA) on top of their plan premium. In 2026:",
        table: {
          headers: ["Individual Income", "Monthly IRMAA Surcharge"],
          rows: [
            ["$106,000 or less", "$0"],
            ["$106,001 – $133,000", "$13.70"],
            ["$133,001 – $167,000", "$35.30"],
            ["$167,001 – $200,000", "$57.00"],
            ["$200,001 – $500,000", "$78.60"],
            ["Above $500,000", "$85.80"],
          ],
        },
        callout: { type: "info", text: "IRMAA is paid directly to Medicare, not to your Part D plan. It's added to your Social Security benefit deduction or billed directly if you don't receive Social Security." },
      },
      {
        id: "total-cost",
        heading: "Estimating Your Total Annual Part D Cost",
        content: "To estimate your total annual Part D cost, add together:",
        bullets: [
          "12 × monthly premium",
          "Annual deductible (if applicable)",
          "Estimated copays for your medications based on their tiers",
          "IRMAA surcharge (if applicable)",
        ],
        callout: { type: "tip", text: "Medicare.gov Plan Finder calculates your estimated total annual cost automatically when you enter your medications. This is the most accurate way to compare plans." },
      },
    ],
    faqs: [
      { q: "What is the average Medicare Part D premium in 2026?", a: "The national average Part D premium in 2026 is approximately $46/month, but premiums range from $0 to over $100/month depending on the plan and region. Higher-income beneficiaries also pay IRMAA surcharges on top of the plan premium." },
      { q: "Does the $2,000 out-of-pocket cap include premiums?", a: "No. The $2,000 cap applies only to cost-sharing (deductibles, copays, coinsurance) for covered drugs. Monthly premiums and IRMAA surcharges do not count toward the cap." },
      { q: "Can I get help paying for Part D costs?", a: "Yes. The Extra Help program (Low Income Subsidy) helps people with limited income and resources pay Part D premiums, deductibles, and copays. In 2026, individuals with income up to 150% of the federal poverty level may qualify." },
    ],
    relatedLinks: [
      { label: "Part D Coverage Gap", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-coverage-gap" },
      { label: "Part D Deductible", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-deductible" },
      { label: "Extra Help Program", href: "/faqs/medicare-extra-help-program" },
    ],
  },
  {
    slug: "medicare-part-d-drug-tiers",
    title: "Medicare Part D Drug Tiers",
    metaTitle: "Medicare Part D Drug Tiers 2026 | How Tier Pricing Works",
    metaDescription: "Learn how Medicare Part D drug tiers work: what each tier means, typical copays for each tier, and how to lower your drug costs by understanding tier placement.",
    heroSubtitle: "Medicare Part D plans organize covered drugs into tiers, with lower tiers having lower cost-sharing. Understanding drug tiers helps you choose the right plan and manage your prescription costs.",
    heroIcon: "Layers",
    sections: [
      {
        id: "tier-structure",
        heading: "Standard Part D Drug Tier Structure",
        content: "Most Medicare Part D plans use a 5-tier formulary:",
        table: {
          headers: ["Tier", "Drug Type", "Typical Copay", "Examples"],
          rows: [
            ["Tier 1", "Preferred Generic", "$0 – $15", "Metformin, lisinopril, atorvastatin"],
            ["Tier 2", "Generic", "$5 – $25", "Other generics not on preferred list"],
            ["Tier 3", "Preferred Brand", "$25 – $60", "Brand drugs the plan prefers"],
            ["Tier 4", "Non-Preferred Brand", "$60 – $150", "Brand drugs not on preferred list"],
            ["Tier 5", "Specialty", "25% – 33%", "Biologics, cancer drugs, specialty meds"],
          ],
        },
      },
      {
        id: "how-tiers-affect-cost",
        heading: "How Tier Placement Affects Your Cost",
        content: "The same drug can be on different tiers in different plans — and the cost difference can be substantial. A brand-name drug on Tier 3 in one plan might be on Tier 4 in another, doubling or tripling your copay. This is why comparing plans based on your specific medications (not just premiums) is essential.",
        callout: { type: "tip", text: "Ask your doctor if a generic equivalent is available for any brand-name drugs you take. Switching to a Tier 1 generic can save hundreds of dollars per year." },
      },
      {
        id: "tier-exceptions",
        heading: "Requesting a Tier Exception",
        content: "If your drug is on a high tier, you can request a tier exception — asking the plan to cover it at a lower tier's cost-sharing. To qualify, your doctor must certify that the lower-tier drugs in the same class are not appropriate for your condition. Tier exceptions are not guaranteed but are worth requesting for expensive medications.",
      },
      {
        id: "specialty-drugs",
        heading: "Specialty Tier (Tier 5) Drugs",
        content: "Specialty drugs are typically high-cost medications for complex conditions like cancer, rheumatoid arthritis, multiple sclerosis, and HIV. They're usually on Tier 5 with coinsurance of 25–33%. With the $2,000 out-of-pocket cap in 2026, specialty drug users will see significant savings compared to prior years.",
        callout: { type: "info", text: "The $2,000 OOP cap is especially beneficial for specialty drug users. Previously, someone on a $10,000/month specialty drug could face thousands in cost-sharing. Now, once you hit $2,000, you pay $0 for the rest of the year." },
      },
    ],
    faqs: [
      { q: "Can a plan change my drug's tier during the year?", a: "Generally, plans cannot move a drug to a higher tier mid-year. However, they can make tier changes at the start of each plan year (January 1). You'll be notified of any changes in your Annual Notice of Change (ANOC) sent each fall." },
      { q: "What is a preferred pharmacy network?", a: "Many Part D plans have preferred pharmacies where you pay lower copays than at standard network pharmacies. Using a preferred pharmacy (often a major chain like CVS, Walgreens, or Walmart) can reduce your Tier 1–3 copays significantly." },
      { q: "How do I find out what tier my drug is on?", a: "Check the plan's formulary on its website, use Medicare.gov Plan Finder, or call the plan's member services. The formulary lists every covered drug and its tier assignment." },
    ],
    relatedLinks: [
      { label: "Part D Formulary", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-formulary" },
      { label: "Part D Prior Authorization", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-prior-authorization" },
      { label: "Part D Costs", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-cost" },
    ],
  },
  {
    slug: "medicare-part-d-prior-authorization",
    title: "Medicare Part D Prior Authorization",
    metaTitle: "Medicare Part D Prior Authorization 2026 | How It Works & What to Do",
    metaDescription: "Learn how Medicare Part D prior authorization works, which drugs require it, how to get approval, and what to do if your prior authorization request is denied.",
    heroSubtitle: "Prior authorization (PA) is a requirement that your doctor get approval from your Part D plan before the plan will cover certain medications. Understanding the process helps you avoid unexpected coverage denials.",
    heroIcon: "FileText",
    sections: [
      {
        id: "what-is-pa",
        heading: "What Is Prior Authorization?",
        content: "Prior authorization is a coverage management tool used by Medicare Part D plans. For certain drugs — typically expensive brand-name medications, specialty drugs, or drugs with high abuse potential — the plan requires your doctor to submit clinical information demonstrating that the drug is medically necessary before it will be covered.",
        callout: { type: "info", text: "Prior authorization does not mean the drug is not covered. It means the plan needs additional information before approving coverage. Most PA requests that include proper documentation are approved." },
      },
      {
        id: "which-drugs",
        heading: "Which Drugs Require Prior Authorization?",
        content: "Common categories of drugs that often require prior authorization:",
        bullets: [
          "Specialty drugs (biologics, cancer medications, MS drugs)",
          "Brand-name drugs when generics are available",
          "Drugs with high potential for misuse (certain opioids, sleep aids)",
          "Drugs that are typically second-line treatments",
          "High-cost drugs where the plan wants to confirm medical necessity",
        ],
      },
      {
        id: "how-to-get-pa",
        heading: "How to Get Prior Authorization",
        content: "The prior authorization process typically works as follows:",
        bullets: [
          "Your doctor submits a PA request to your Part D plan with clinical documentation",
          "The plan reviews the request (typically within 72 hours; 24 hours for urgent requests)",
          "The plan approves, denies, or requests additional information",
          "If approved, your prescription is covered per your plan's normal cost-sharing",
          "If denied, you have the right to appeal",
        ],
        callout: { type: "tip", text: "Ask your doctor's office to submit the PA request before you go to the pharmacy. This avoids the frustration of being denied at the counter." },
      },
      {
        id: "if-denied",
        heading: "What to Do If Prior Authorization Is Denied",
        content: "If your PA request is denied, you have several options:",
        bullets: [
          "Request a formulary exception — ask the plan to cover the drug without PA requirements",
          "File an appeal — you have the right to a formal review of the denial",
          "Ask your doctor about covered alternatives in the same drug class",
          "Request an expedited appeal if you need the drug urgently",
          "Contact your State Health Insurance Assistance Program (SHIP) for free help navigating the appeals process",
        ],
      },
    ],
    faqs: [
      { q: "How long does prior authorization take?", a: "Standard PA decisions must be made within 72 hours. If your doctor requests an expedited review due to urgent medical need, the plan must respond within 24 hours." },
      { q: "Can I get a temporary supply while waiting for PA approval?", a: "In some cases, pharmacies can dispense a limited supply (typically a 3-day emergency supply) while the PA is being processed. This varies by state and plan. Ask your pharmacist about your options." },
      { q: "Does prior authorization expire?", a: "Yes. Prior authorizations are typically approved for a set period (often 1 year). When the PA expires, your doctor will need to resubmit documentation to continue coverage. Set a reminder to renew before the expiration date." },
    ],
    relatedLinks: [
      { label: "Part D Step Therapy", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-step-therapy" },
      { label: "Part D Exceptions and Appeals", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-exceptions-and-appeals" },
      { label: "Part D Formulary", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-formulary" },
    ],
  },
  {
    slug: "medicare-part-d-step-therapy",
    title: "Medicare Part D Step Therapy",
    metaTitle: "Medicare Part D Step Therapy 2026 | What It Is & How to Get an Exception",
    metaDescription: "Learn how Medicare Part D step therapy works, which drugs are subject to it, how to request a step therapy exception, and your rights as a Medicare beneficiary.",
    heroSubtitle: "Step therapy requires you to try a lower-cost drug before your plan will cover a more expensive alternative. Understanding step therapy rules helps you navigate coverage requirements and request exceptions when needed.",
    heroIcon: "ArrowRight",
    sections: [
      {
        id: "what-is-step-therapy",
        heading: "What Is Step Therapy?",
        content: "Step therapy (also called 'fail-first' requirements) is a cost management tool used by Medicare Part D plans. It requires you to try one or more lower-cost drugs (usually generics) before the plan will cover a more expensive drug for the same condition. The idea is that many patients respond well to lower-cost options, and step therapy ensures those are tried first.",
        callout: { type: "info", text: "Step therapy is different from prior authorization. PA requires approval before coverage. Step therapy requires you to try specific drugs first before the plan will cover your prescribed drug." },
      },
      {
        id: "how-it-works",
        heading: "How Step Therapy Works",
        content: "A typical step therapy sequence might look like:",
        bullets: [
          "Step 1: Try a Tier 1 generic (e.g., generic metformin for diabetes)",
          "Step 2: If Step 1 fails, try a Tier 2 generic or preferred brand",
          "Step 3: If Steps 1 and 2 fail, the plan will cover the originally prescribed drug",
        ],
        callout: { type: "warning", text: "You may need to document that you tried and failed the step therapy drugs before the plan will cover your prescribed medication. Keep records of any adverse reactions or lack of effectiveness." },
      },
      {
        id: "exception",
        heading: "Requesting a Step Therapy Exception",
        content: "You can request an exception to step therapy requirements if:",
        bullets: [
          "You already tried the required drugs and they didn't work or caused adverse effects",
          "The required drugs are contraindicated for your condition",
          "Your doctor believes the required drugs would be harmful",
          "You were previously stable on the prescribed drug (continuity of care)",
        ],
        callout: { type: "tip", text: "If you're switching to Medicare from employer coverage and were already taking a drug subject to step therapy, document your prior use. Many plans grant exceptions for continuity of care." },
      },
    ],
    faqs: [
      { q: "Can I skip step therapy if I've already tried the required drugs?", a: "Yes. If you have documented evidence that you previously tried and failed the required step therapy drugs, you can request an exception. Your doctor should submit documentation of your prior treatment history." },
      { q: "How long do I have to try a step therapy drug?", a: "The required trial period varies by plan and drug. Some plans require a 30-day trial; others may require longer. Check your plan's coverage determination process for specific timeframes." },
      { q: "What if step therapy causes me harm?", a: "If a required step therapy drug causes an adverse reaction or worsens your condition, document this with your doctor immediately. This documentation supports an exception request and may allow you to skip to the prescribed drug." },
    ],
    relatedLinks: [
      { label: "Part D Prior Authorization", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-prior-authorization" },
      { label: "Part D Exceptions and Appeals", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-exceptions-and-appeals" },
      { label: "Part D Formulary", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-formulary" },
    ],
  },
  {
    slug: "medicare-part-d-exceptions-and-appeals",
    title: "Medicare Part D Exceptions and Appeals",
    metaTitle: "Medicare Part D Exceptions & Appeals 2026 | How to Fight a Denial",
    metaDescription: "Learn how to request a Medicare Part D exception or appeal a coverage denial. Understand your rights, the appeals process, and how to get the drugs you need covered.",
    heroSubtitle: "If your Medicare Part D plan denies coverage for a drug you need, you have the right to request an exception or file an appeal. Understanding the process gives you the best chance of getting your medication covered.",
    heroIcon: "Scale",
    sections: [
      {
        id: "types-of-exceptions",
        heading: "Types of Part D Exceptions",
        content: "There are two main types of exceptions you can request:",
        bullets: [
          "Formulary exception — request coverage for a drug not on the formulary, or coverage at a lower cost-sharing tier",
          "Coverage determination exception — request an exception to prior authorization, step therapy, or quantity limits",
        ],
        callout: { type: "info", text: "To request an exception, your prescribing doctor must provide a supporting statement explaining why the exception is medically necessary. The stronger the clinical documentation, the better your chances of approval." },
      },
      {
        id: "appeals-process",
        heading: "The Medicare Part D Appeals Process",
        content: "If your coverage request is denied, you can appeal through a 5-level process:",
        table: {
          headers: ["Level", "Who Reviews", "Timeframe"],
          rows: [
            ["Level 1: Redetermination", "Your Part D plan", "7 days (standard), 72 hours (expedited)"],
            ["Level 2: Reconsideration", "Independent Review Entity (IRE)", "7 days (standard), 72 hours (expedited)"],
            ["Level 3: ALJ Hearing", "Administrative Law Judge", "90 days"],
            ["Level 4: Medicare Appeals Council", "DAB Appeals Council", "90 days"],
            ["Level 5: Federal Court", "Federal District Court", "60 days to file"],
          ],
        },
      },
      {
        id: "expedited-appeals",
        heading: "Expedited Appeals",
        content: "If your health requires a faster decision, you can request an expedited appeal. To qualify, your doctor must certify that waiting for a standard decision would seriously jeopardize your life, health, or ability to regain maximum function. Expedited decisions must be made within 72 hours.",
      },
      {
        id: "tips-for-success",
        heading: "Tips for a Successful Appeal",
        content: "Improve your chances of winning an appeal:",
        bullets: [
          "Get detailed documentation from your doctor explaining medical necessity",
          "Include records of prior treatment attempts and their outcomes",
          "Reference clinical guidelines that support your prescribed treatment",
          "File promptly — you have 60 days from the denial notice to request a redetermination",
          "Contact your State Health Insurance Assistance Program (SHIP) for free help",
        ],
      },
    ],
    faqs: [
      { q: "How long do I have to file a Part D appeal?", a: "You have 60 days from the date of the coverage denial notice to request a redetermination (Level 1 appeal). You can request an extension if you have good cause for missing the deadline." },
      { q: "Can I get a temporary supply of my drug while appealing?", a: "In some cases, yes. If you're transitioning to a new plan or have a new Medicare enrollment, you may be entitled to a temporary supply (typically 30 days) while your appeal is processed. Ask your pharmacist or plan about transition supply rules." },
      { q: "What is the Independent Review Entity (IRE)?", a: "The IRE is an independent organization contracted by Medicare to review Level 2 appeals. It's separate from your Part D plan and provides an impartial review of coverage denials. The IRE's decision is binding on your plan." },
    ],
    relatedLinks: [
      { label: "Part D Prior Authorization", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-prior-authorization" },
      { label: "Part D Step Therapy", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-step-therapy" },
      { label: "Part D Formulary", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-formulary" },
    ],
  },
  {
    slug: "part-d-costs",
    title: "Medicare Part D Costs",
    metaTitle: "Medicare Part D Costs 2026 | Premiums, Deductibles & Copays",
    metaDescription: "Understand all Medicare Part D costs in 2026: monthly premiums, annual deductibles, copays by drug tier, the $2,000 out-of-pocket cap, and IRMAA surcharges for higher-income beneficiaries.",
    heroSubtitle: "Medicare Part D prescription drug coverage comes with several cost components. Understanding each one helps you budget accurately and choose the right plan for your medications.",
    heroIcon: "DollarSign",
    sections: [
      {
        id: "overview",
        heading: "The Four Main Part D Cost Components",
        content: "Medicare Part D costs consist of four main components that work together to determine your total annual spending on prescription drugs:",
        bullets: [
          "Monthly premium — paid to your plan every month regardless of drug use",
          "Annual deductible — amount you pay before the plan starts covering drugs (up to $590 in 2026)",
          "Copays and coinsurance — your share of each prescription based on the drug's tier",
          "IRMAA surcharge — additional amount for higher-income beneficiaries",
        ],
      },
      {
        id: "premiums",
        heading: "2026 Part D Premiums",
        content: "Part D premiums vary widely by plan and region. The national average in 2026 is approximately $46/month, but individual plans range from $0 to over $100/month.",
        table: {
          headers: ["Premium Range", "Plan Type"],
          rows: [
            ["$0 – $15/mo", "Basic plans with higher cost-sharing"],
            ["$15 – $50/mo", "Mid-tier plans with moderate coverage"],
            ["$50 – $100+/mo", "Enhanced plans with lower copays and broader formularies"],
          ],
        },
        callout: { type: "tip", text: "A $0 premium plan is not always the cheapest option. If your medications are on a higher tier, a plan with a slightly higher premium but lower copays may cost less overall." },
      },
      {
        id: "deductible",
        heading: "2026 Part D Deductible",
        content: "The maximum Part D deductible in 2026 is $590. Many plans charge less than the maximum, and some waive the deductible entirely for Tier 1 and Tier 2 (generic) drugs. You pay the full cost of your medications until you meet your deductible.",
        callout: { type: "info", text: "Plans cannot charge more than $590 for the 2026 deductible, but they can charge less. Always check whether your specific medications are subject to the deductible before choosing a plan." },
      },
      {
        id: "copays",
        heading: "Copays and Coinsurance by Drug Tier",
        content: "After meeting your deductible, you pay a copay or coinsurance for each prescription based on the drug's tier:",
        table: {
          headers: ["Tier", "Drug Type", "Typical Cost-Sharing"],
          rows: [
            ["Tier 1", "Preferred Generic", "$0 – $15 copay"],
            ["Tier 2", "Generic", "$5 – $25 copay"],
            ["Tier 3", "Preferred Brand", "$25 – $60 copay"],
            ["Tier 4", "Non-Preferred Brand", "$60 – $150 copay"],
            ["Tier 5", "Specialty", "25% – 33% coinsurance"],
          ],
        },
      },
      {
        id: "oop-cap",
        heading: "$2,000 Out-of-Pocket Cap (2025 and Beyond)",
        content: "Starting in 2025, Medicare Part D has a $2,000 annual out-of-pocket cap on covered drug costs. Once you reach $2,000 in cost-sharing (deductibles, copays, and coinsurance), you pay $0 for covered drugs for the rest of the year. This cap does not include premiums or IRMAA surcharges.",
        callout: { type: "info", text: "The Medicare Prescription Payment Plan (M3P) lets you spread your out-of-pocket costs evenly across the year in monthly installments rather than paying large amounts at once." },
      },
      {
        id: "irmaa",
        heading: "IRMAA: Income-Related Part D Surcharges",
        content: "Higher-income beneficiaries pay an additional monthly surcharge on top of their plan premium. IRMAA is based on your income from two years prior.",
        table: {
          headers: ["Individual Income (2024)", "Monthly IRMAA Surcharge (2026)"],
          rows: [
            ["$106,000 or less", "$0"],
            ["$106,001 – $133,000", "$13.70"],
            ["$133,001 – $167,000", "$35.30"],
            ["$167,001 – $200,000", "$57.00"],
            ["$200,001 – $500,000", "$78.60"],
            ["Above $500,000", "$85.80"],
          ],
        },
      },
    ],
    faqs: [
      { q: "What is the average Part D premium in 2026?", a: "The national average is approximately $46/month, but premiums range from $0 to over $100/month depending on the plan and your location." },
      { q: "Does the $2,000 out-of-pocket cap include premiums?", a: "No. The $2,000 cap applies only to cost-sharing (deductibles, copays, coinsurance) for covered drugs. Premiums and IRMAA surcharges do not count toward the cap." },
      { q: "Can I get help paying Part D costs?", a: "Yes. The Extra Help program (Low Income Subsidy) helps people with limited income pay Part D premiums, deductibles, and copays. In 2026, individuals with income up to 150% of the federal poverty level may qualify." },
    ],
    relatedLinks: [
      { label: "Part D Deductible", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-deductible" },
      { label: "Part D Drug Tiers", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-drug-tiers" },
      { label: "Extra Help Program", href: "/faqs/medicare-extra-help-program" },
    ],
  },
  {
    slug: "medicare-donut-hole",
    title: "Medicare Donut Hole (Coverage Gap)",
    metaTitle: "Medicare Donut Hole 2026 | Is the Coverage Gap Gone?",
    metaDescription: "The Medicare donut hole (coverage gap) was officially eliminated in 2025. Learn what the donut hole was, how it worked, and what the new $2,000 out-of-pocket cap means for your drug costs in 2026.",
    heroSubtitle: "The Medicare donut hole was a coverage gap in Part D where beneficiaries paid a higher share of drug costs. The Inflation Reduction Act eliminated the donut hole starting in 2025, replacing it with a $2,000 annual out-of-pocket cap.",
    heroIcon: "CircleDashed",
    sections: [
      {
        id: "what-was-it",
        heading: "What Was the Medicare Donut Hole?",
        content: "The Medicare donut hole (officially called the coverage gap) was a temporary limit on what Medicare Part D plans would cover for prescription drugs. Once you and your plan spent a certain amount on covered drugs, you entered the coverage gap and paid a higher percentage of drug costs until you reached catastrophic coverage.",
        callout: { type: "info", text: "The donut hole was created when Medicare Part D launched in 2006 as a cost-control measure. It was gradually reduced over the years through the Affordable Care Act and was fully eliminated by the Inflation Reduction Act." },
      },
      {
        id: "history",
        heading: "How the Donut Hole Was Phased Out",
        content: "The Affordable Care Act (2010) began phasing out the donut hole by requiring drug manufacturers to provide discounts on brand-name drugs in the gap. The Inflation Reduction Act (2022) finished the job by capping out-of-pocket costs at $2,000 starting in 2025.",
        table: {
          headers: ["Year", "Brand Drug Cost in Gap", "Generic Drug Cost in Gap"],
          rows: [
            ["2010", "100%", "100%"],
            ["2020", "25%", "25%"],
            ["2024", "25%", "25%"],
            ["2025+", "Eliminated ($2,000 OOP cap)", "Eliminated ($2,000 OOP cap)"],
          ],
        },
      },
      {
        id: "new-structure",
        heading: "The New 2025-2026 Part D Structure",
        content: "Starting in 2025, Medicare Part D has a simpler two-phase structure:",
        bullets: [
          "Phase 1: Deductible phase — You pay 100% of drug costs until you meet your deductible (up to $590 in 2026)",
          "Phase 2: Coverage phase — You pay your plan's copays/coinsurance until you reach $2,000 in out-of-pocket costs",
          "Phase 3: Catastrophic phase — After $2,000 OOP, you pay $0 for covered drugs for the rest of the year",
        ],
        callout: { type: "tip", text: "The $2,000 cap is a major improvement for people with high drug costs, particularly those on specialty medications. In prior years, beneficiaries could spend $5,000+ before reaching catastrophic coverage." },
      },
      {
        id: "m3p",
        heading: "Medicare Prescription Payment Plan (M3P)",
        content: "The Inflation Reduction Act also created the Medicare Prescription Payment Plan (M3P), which lets you spread your out-of-pocket drug costs evenly across the year in monthly installments. This prevents large upfront costs early in the year when you are in the deductible phase.",
        callout: { type: "info", text: "M3P is optional and must be elected each year. It does not reduce your total costs — it only smooths out when you pay them. Contact your Part D plan to enroll." },
      },
    ],
    faqs: [
      { q: "Is the Medicare donut hole gone in 2026?", a: "Yes. The coverage gap (donut hole) was eliminated starting January 1, 2025. In 2026, once you spend $2,000 out-of-pocket on covered drugs, you pay $0 for the rest of the year." },
      { q: "What replaced the donut hole?", a: "The $2,000 annual out-of-pocket cap replaced the donut hole. This cap applies to cost-sharing (deductibles, copays, coinsurance) but not to monthly premiums or IRMAA surcharges." },
      { q: "Did the donut hole affect generic drugs?", a: "Yes. Before 2025, beneficiaries in the coverage gap paid 25% of the cost for both brand-name and generic drugs. The $2,000 cap now applies to all covered drugs regardless of type." },
    ],
    relatedLinks: [
      { label: "Part D Costs", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-costs" },
      { label: "Part D Coverage Gap", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-coverage-gap" },
      { label: "Part D Deductible", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-deductible" },
    ],
  },
  {
    slug: "mutual-of-omaha",
    title: "Mutual of Omaha Medicare Part D Plans",
    metaTitle: "Mutual of Omaha Part D Plans 2026 | Review & Costs",
    metaDescription: "Review Mutual of Omaha Medicare Part D prescription drug plans for 2026. Compare premiums, formularies, and how Mutual of Omaha Part D plans stack up against other options.",
    heroSubtitle: "Mutual of Omaha offers Medicare Part D prescription drug plans in select states. Known primarily for Medicare Supplement insurance, their Part D plans provide an option for beneficiaries who want to keep their coverage under one carrier.",
    heroIcon: "Shield",
    sections: [
      {
        id: "overview",
        heading: "Mutual of Omaha Part D Overview",
        content: "Mutual of Omaha is best known as one of the most popular Medicare Supplement (Medigap) carriers in the country. They also offer Medicare Part D prescription drug plans in select states, allowing beneficiaries to bundle their Medigap and Part D coverage with the same insurer.",
        callout: { type: "info", text: "Mutual of Omaha Part D plans are not available in all states. Check plan availability in your area during the Annual Enrollment Period (Oct 15 – Dec 7)." },
      },
      {
        id: "plans",
        heading: "Mutual of Omaha Part D Plan Options",
        content: "Mutual of Omaha typically offers one or two Part D plan options per region, focusing on straightforward coverage rather than a wide variety of tiers. Their plans generally include:",
        bullets: [
          "Coverage for all five drug tiers (preferred generics through specialty drugs)",
          "Standard deductible up to the Medicare maximum ($590 in 2026)",
          "Mail-order pharmacy option for 90-day supplies at reduced cost",
          "Access to a broad pharmacy network including major chains",
        ],
      },
      {
        id: "compare",
        heading: "How Mutual of Omaha Part D Compares",
        content: "When comparing Mutual of Omaha Part D to other carriers, consider:",
        table: {
          headers: ["Factor", "Mutual of Omaha", "Larger Carriers (CVS/UHC)"],
          rows: [
            ["Plan variety", "1-2 options per region", "3-5 options per region"],
            ["Premium range", "Competitive", "$0 to $100+"],
            ["Formulary size", "Standard", "Varies widely"],
            ["Brand recognition", "Strong (Medigap)", "Strong"],
            ["Availability", "Select states", "Nationwide"],
          ],
        },
        callout: { type: "tip", text: "The best Part D plan depends on your specific medications. Use Medicare.gov Plan Finder to compare plans based on your actual drug list before enrolling." },
      },
    ],
    faqs: [
      { q: "Does Mutual of Omaha offer Medicare Part D?", a: "Yes, Mutual of Omaha offers Medicare Part D prescription drug plans in select states. Availability varies by region, so check during the Annual Enrollment Period." },
      { q: "Should I get Mutual of Omaha Part D if I have their Medigap plan?", a: "Having the same carrier for Medigap and Part D can simplify billing, but it is not required. Always compare Part D plans based on your specific medications and costs, not just carrier preference." },
      { q: "How do I enroll in Mutual of Omaha Part D?", a: "You can enroll during your Initial Enrollment Period, Annual Enrollment Period (Oct 15 – Dec 7), or a qualifying Special Enrollment Period. Visit MutualofOmaha.com or call their Medicare helpline." },
    ],
    relatedLinks: [
      { label: "Mutual of Omaha Medigap Plans", href: "/medicare-supplements/medigap-by-carrier/mutual-of-omaha-medigap-plans" },
      { label: "Part D Costs", href: "/original-medicare/medicare-parts/medicare-part-d/part-d-costs" },
      { label: "Part D Enrollment Periods", href: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-enrollment-periods" },
    ],
  },
];
