// Caregiver Guide page data
// 6 pages: index + 5 sub-pages

export interface CaregiverPageData {
  slug: string; // used in URL: /guide-to-being-a-caregiver/:slug (or "" for index)
  title: string;
  subtitle: string;
  heroDescription: string;
  sections: CaregiverSection[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; path: string }[];
}

export interface CaregiverSection {
  id: string;
  heading: string;
  body: string; // HTML string
}

export const CAREGIVER_PAGES: CaregiverPageData[] = [
  {
    slug: "",
    title: "Guide to Being a Caregiver",
    subtitle: "CAREGIVER RESOURCES",
    heroDescription:
      "A comprehensive resource for family caregivers navigating Medicare, home health benefits, and the practical realities of caring for an aging loved one.",
    sections: [
      {
        id: "what-is-a-caregiver",
        heading: "What Is a Caregiver?",
        body: `<p>A caregiver is anyone who provides unpaid assistance to a family member, friend, or loved one who has a chronic illness, disability, or age-related condition. Caregiving can range from occasional help with errands to full-time, around-the-clock support.</p>
<p>In the context of Medicare, caregivers play a critical role in coordinating care, managing medications, attending appointments, and helping beneficiaries navigate their coverage options. While Medicare does not pay family caregivers directly, it does cover many services that reduce the caregiver's burden — including home health care, skilled nursing facility care, and hospice services.</p>`,
      },
      {
        id: "types-of-caregivers",
        heading: "Types of Caregivers",
        body: `<p>There are four main types of caregivers, each with different roles and levels of involvement:</p>
<ul>
<li><strong>Family Caregivers</strong> — Spouses, adult children, siblings, or other relatives who provide unpaid care at home. This is the most common type.</li>
<li><strong>Professional Caregivers</strong> — Paid home health aides, personal care aides, or certified nursing assistants hired through an agency or privately.</li>
<li><strong>Informal Caregivers</strong> — Friends, neighbors, or community members who help without formal training or compensation.</li>
<li><strong>Long-Distance Caregivers</strong> — Family members who coordinate care from a distance, often managing logistics, finances, and communication with healthcare providers.</li>
</ul>`,
      },
      {
        id: "medicare-and-caregiving",
        heading: "How Medicare Supports Caregivers",
        body: `<p>Medicare covers several services that directly benefit both the beneficiary and their caregiver:</p>
<ul>
<li><strong>Home Health Care</strong> — Medicare Part A and Part B cover skilled nursing visits, physical therapy, and home health aide services for homebound beneficiaries. This can significantly reduce the caregiver's workload.</li>
<li><strong>Hospice Care</strong> — For beneficiaries with a terminal illness, Medicare covers hospice services including respite care — short-term inpatient care that gives family caregivers a temporary break.</li>
<li><strong>Skilled Nursing Facility (SNF) Care</strong> — After a qualifying hospital stay, Medicare Part A covers up to 100 days in a skilled nursing facility, providing professional care while the beneficiary recovers.</li>
<li><strong>Durable Medical Equipment (DME)</strong> — Wheelchairs, walkers, hospital beds, and other equipment that make home caregiving more manageable are covered by Part B.</li>
</ul>`,
      },
      {
        id: "caregiver-resources",
        heading: "Caregiver Resources and Support",
        body: `<p>Caregiving can be physically and emotionally demanding. These national resources provide support, training, and financial assistance:</p>
<ul>
<li><strong>National Alliance for Caregiving (NAC)</strong> — Research, advocacy, and resources for family caregivers.</li>
<li><strong>AARP Caregiver Resource Center</strong> — Tools, guides, and a helpline (1-877-333-5885) for caregivers.</li>
<li><strong>Eldercare Locator</strong> — A free service (1-800-677-1116) connecting caregivers to local services including meal delivery, transportation, and respite care.</li>
<li><strong>State Health Insurance Assistance Programs (SHIPs)</strong> — Free Medicare counseling for beneficiaries and their caregivers.</li>
<li><strong>Caregiver Action Network</strong> — Education and peer support for family caregivers across all disease categories.</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Does Medicare pay family caregivers?",
        answer:
          "Generally, no. Medicare does not pay family members to provide care. However, some state Medicaid programs have consumer-directed programs that allow beneficiaries to hire and pay family members as personal care attendants. Check your state's Medicaid program for details.",
      },
      {
        question: "What Medicare benefits help caregivers the most?",
        answer:
          "Home health care, hospice respite care, and skilled nursing facility coverage are the Medicare benefits that most directly reduce caregiver burden. These services bring professional care into the home or provide short-term facility care so caregivers can rest.",
      },
      {
        question: "Can a caregiver speak with Medicare on behalf of a beneficiary?",
        answer:
          "Yes, but the beneficiary must authorize it. The beneficiary can designate a representative by completing a Medicare Authorization to Disclose Personal Health Information form (CMS-10106), which allows Medicare to share information with a named caregiver or family member.",
      },
      {
        question: "What is caregiver burnout and how can it be prevented?",
        answer:
          "Caregiver burnout is a state of physical, emotional, and mental exhaustion that can occur when caregivers don't get the help they need or try to do more than they're able. Prevention strategies include using respite care services, joining a caregiver support group, setting boundaries, and asking for help from other family members.",
      },
    ],
    relatedLinks: [
      { label: "Caregiver Assistance Programs", path: "/guide-to-being-a-caregiver/caregiver-assistance" },
      { label: "Who Qualifies as a Caregiver Under Medicare Rules", path: "/guide-to-being-a-caregiver/who-qualifies-as-a-caregiver-under-medicare-rules" },
      { label: "How to Become a Caregiver", path: "/guide-to-being-a-caregiver/how-to-become-a-caregiver" },
      { label: "What Are the 4 Types of Caregivers?", path: "/guide-to-being-a-caregiver/what-are-the-4-types-of-caregivers" },
      { label: "What Is a Caregiver?", path: "/guide-to-being-a-caregiver/what-is-a-caregiver" },
    ],
  },
  {
    slug: "caregiver-assistance",
    title: "Caregiver Assistance Programs",
    subtitle: "CAREGIVER RESOURCES",
    heroDescription:
      "Financial assistance, respite care, and support programs available to family caregivers through Medicare, Medicaid, and federal/state programs.",
    sections: [
      {
        id: "overview",
        heading: "What Caregiver Assistance Is Available?",
        body: `<p>Family caregivers often bear significant financial and physical burdens. A range of federal, state, and nonprofit programs exist to provide relief — from direct financial assistance to free respite care and training programs.</p>
<p>The most important thing to know is that assistance availability varies significantly by state. Programs like Medicaid Home and Community-Based Services (HCBS) waivers can pay family caregivers in some states but not others. Always check your state's specific offerings.</p>`,
      },
      {
        id: "medicare-coverage",
        heading: "Medicare-Covered Services That Assist Caregivers",
        body: `<p>While Medicare doesn't pay caregivers directly, it covers services that reduce the caregiving burden:</p>
<ul>
<li><strong>Home Health Care</strong> — Skilled nursing, physical therapy, and home health aide visits for homebound beneficiaries (Part A/B).</li>
<li><strong>Hospice Respite Care</strong> — Up to 5 consecutive days of inpatient respite care per period so caregivers can rest (Part A hospice benefit).</li>
<li><strong>Adult Day Services</strong> — Some Medicare Advantage plans cover adult day programs, which provide structured daytime care and give caregivers a break.</li>
<li><strong>Telehealth</strong> — Remote monitoring and virtual visits reduce the need for caregiver transportation to appointments.</li>
</ul>`,
      },
      {
        id: "medicaid-programs",
        heading: "Medicaid Programs That Pay Caregivers",
        body: `<p>Medicaid offers several programs that can pay family caregivers, depending on the state:</p>
<ul>
<li><strong>Consumer-Directed Personal Assistance Programs (CDPAP)</strong> — Available in New York and similar programs in other states. Allows beneficiaries to hire, train, and supervise their own caregivers — including family members.</li>
<li><strong>Home and Community-Based Services (HCBS) Waivers</strong> — State-specific Medicaid waivers that fund personal care, homemaker services, and sometimes allow family members to be paid caregivers.</li>
<li><strong>Program of All-Inclusive Care for the Elderly (PACE)</strong> — Comprehensive care program for nursing-home-eligible individuals that includes caregiver support services.</li>
</ul>`,
      },
      {
        id: "federal-programs",
        heading: "Federal and State Caregiver Support Programs",
        body: `<ul>
<li><strong>National Family Caregiver Support Program (NFCSP)</strong> — Funded by the Older Americans Act, provides information, counseling, respite care, and supplemental services through local Area Agencies on Aging (AAA).</li>
<li><strong>Veterans Administration (VA) Caregiver Support</strong> — The VA's Program of Comprehensive Assistance for Family Caregivers (PCAFC) provides a monthly stipend, health insurance, and mental health services to caregivers of eligible veterans.</li>
<li><strong>Tax Deductions</strong> — Caregivers may be able to deduct medical expenses paid on behalf of a dependent parent or claim the Dependent Care Tax Credit. Consult a tax professional.</li>
<li><strong>FMLA Leave</strong> — The Family and Medical Leave Act allows eligible employees to take up to 12 weeks of unpaid, job-protected leave to care for a seriously ill family member.</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Can I get paid to care for my elderly parent on Medicare?",
        answer:
          "Medicare itself does not pay family caregivers. However, if your parent also has Medicaid, some state Medicaid programs allow beneficiaries to hire family members as paid personal care attendants. Contact your state's Medicaid office or local Area Agency on Aging to explore options.",
      },
      {
        question: "What is respite care and does Medicare cover it?",
        answer:
          "Respite care is temporary relief for primary caregivers. Medicare covers up to 5 consecutive days of inpatient respite care per period under the hospice benefit (Part A). Outside of hospice, Medicare Advantage plans may cover adult day services or short-term nursing facility stays as respite.",
      },
      {
        question: "How do I find caregiver assistance programs in my area?",
        answer:
          "Contact your local Area Agency on Aging (AAA) through the Eldercare Locator (1-800-677-1116 or eldercare.acl.gov). AAAs coordinate local services including respite care, meal delivery, transportation, and caregiver training. Your state's SHIP (State Health Insurance Assistance Program) can also help navigate Medicare benefits.",
      },
    ],
    relatedLinks: [
      { label: "Caregiver Guide Overview", path: "/guide-to-being-a-caregiver" },
      { label: "Who Qualifies as a Caregiver Under Medicare Rules", path: "/guide-to-being-a-caregiver/who-qualifies-as-a-caregiver-under-medicare-rules" },
      { label: "Medicare Home Health Coverage", path: "/faqs/does-medicare-cover-home-health-care" },
      { label: "Medicare Hospice Coverage", path: "/faqs/does-medicare-cover-hospice" },
    ],
  },
  {
    slug: "who-qualifies-as-a-caregiver-under-medicare-rules",
    title: "Who Qualifies as a Caregiver Under Medicare Rules",
    subtitle: "CAREGIVER RESOURCES",
    heroDescription:
      "Understanding how Medicare defines caregivers, which services require a licensed professional, and when family members can provide covered care.",
    sections: [
      {
        id: "medicare-caregiver-definition",
        heading: "How Medicare Defines a Caregiver",
        body: `<p>Medicare does not have a single official definition of "caregiver" for payment purposes. Instead, Medicare distinguishes between the types of care being provided and who is qualified to provide them:</p>
<ul>
<li><strong>Skilled Care</strong> — Services like wound care, IV therapy, injections, and physical therapy must be performed by licensed professionals (RNs, LPNs, PTs). Medicare pays for these through home health agencies.</li>
<li><strong>Custodial/Personal Care</strong> — Bathing, dressing, meal preparation, and companionship do not require a license. These are typically provided by home health aides or personal care attendants — and can sometimes be family members under certain Medicaid programs.</li>
</ul>`,
      },
      {
        id: "home-health-aide",
        heading: "Home Health Aide Requirements",
        body: `<p>Medicare-covered home health aide services must be provided by a home health aide employed by a Medicare-certified home health agency. These aides must:</p>
<ul>
<li>Complete at least 75 hours of training</li>
<li>Pass a competency evaluation</li>
<li>Be employed by a Medicare-certified agency</li>
</ul>
<p>Family members cannot be paid as Medicare-covered home health aides unless they are employed by a Medicare-certified agency and meet these training requirements. In practice, this rarely occurs.</p>`,
      },
      {
        id: "medicaid-exception",
        heading: "When Family Members Can Be Paid Caregivers",
        body: `<p>Under Medicaid (not Medicare), several states allow beneficiaries to hire family members as paid caregivers through consumer-directed programs:</p>
<ul>
<li>The beneficiary must be eligible for Medicaid personal care or home and community-based services</li>
<li>The family member cannot be the beneficiary's spouse in most states (though some states allow this)</li>
<li>The family member must complete required training and background checks</li>
<li>Payment rates are set by the state Medicaid program</li>
</ul>
<p>If your loved one has both Medicare and Medicaid (dual-eligible), they may qualify for these programs. Contact your state Medicaid office for details.</p>`,
      },
      {
        id: "informal-caregiver-role",
        heading: "The Role of Informal Caregivers in Medicare",
        body: `<p>Even though Medicare doesn't pay informal (family) caregivers, they play a vital role in the Medicare system:</p>
<ul>
<li>Coordinating care between providers and specialists</li>
<li>Managing medications and monitoring for side effects</li>
<li>Transporting beneficiaries to appointments</li>
<li>Communicating with Medicare, insurance companies, and healthcare providers</li>
<li>Providing the "custodial" care that Medicare doesn't cover, making it possible for beneficiaries to remain at home</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Can a spouse be a paid Medicare caregiver?",
        answer:
          "Medicare does not pay spouses as caregivers. Under most Medicaid consumer-directed programs, spouses are also excluded. However, some states have exceptions. Check your state's Medicaid program for specific rules.",
      },
      {
        question: "Does Medicare cover non-medical home care?",
        answer:
          "No. Medicare does not cover custodial care (bathing, dressing, meal preparation) unless it is provided alongside skilled care by a Medicare-certified home health agency. If skilled care is no longer needed, Medicare home health coverage ends, even if the beneficiary still needs personal care assistance.",
      },
      {
        question: "What training does a home health aide need for Medicare coverage?",
        answer:
          "Medicare-covered home health aides must complete at least 75 hours of training (16 hours of supervised practical training) and pass a competency evaluation. They must be employed by a Medicare-certified home health agency.",
      },
    ],
    relatedLinks: [
      { label: "Caregiver Guide Overview", path: "/guide-to-being-a-caregiver" },
      { label: "Caregiver Assistance Programs", path: "/guide-to-being-a-caregiver/caregiver-assistance" },
      { label: "What Are the 4 Types of Caregivers?", path: "/guide-to-being-a-caregiver/what-are-the-4-types-of-caregivers" },
    ],
  },
  {
    slug: "how-to-become-a-caregiver",
    title: "How to Become a Caregiver",
    subtitle: "CAREGIVER RESOURCES",
    heroDescription:
      "Steps to becoming a family caregiver or professional caregiver, including training requirements, certifications, and how to get started.",
    sections: [
      {
        id: "family-caregiver",
        heading: "Becoming a Family Caregiver",
        body: `<p>Most family caregivers don't choose the role — it happens gradually as a loved one's needs increase. If you're stepping into a caregiving role, here are the key steps to get started:</p>
<ol>
<li><strong>Assess the situation</strong> — Evaluate your loved one's physical, cognitive, and emotional needs. Talk with their doctors to understand the diagnosis, prognosis, and what level of care is needed.</li>
<li><strong>Learn about Medicare benefits</strong> — Understand what Medicare covers (home health, skilled nursing, hospice) and what it doesn't (custodial care, most long-term care).</li>
<li><strong>Set up a care plan</strong> — Work with the healthcare team to create a written care plan that outlines medications, appointments, emergency contacts, and daily care routines.</li>
<li><strong>Arrange legal documents</strong> — Ensure your loved one has a healthcare proxy, durable power of attorney, and advance directive in place.</li>
<li><strong>Connect with resources</strong> — Contact your local Area Agency on Aging (AAA) to learn about available services, support groups, and respite care options.</li>
</ol>`,
      },
      {
        id: "professional-caregiver",
        heading: "Becoming a Professional Caregiver",
        body: `<p>If you want to work as a paid caregiver, there are several pathways depending on the level of care you want to provide:</p>
<ul>
<li><strong>Personal Care Aide (PCA)</strong> — Provides non-medical assistance (bathing, dressing, meal prep). Minimal formal training required; some states require a brief training course and background check.</li>
<li><strong>Home Health Aide (HHA)</strong> — Provides personal care plus basic health monitoring. Requires at least 75 hours of training and a competency evaluation for Medicare-certified agencies.</li>
<li><strong>Certified Nursing Assistant (CNA)</strong> — Provides personal care and basic nursing tasks under the supervision of a nurse. Requires state-approved training (typically 75-150 hours) and a state competency exam.</li>
<li><strong>Licensed Practical Nurse (LPN) or Registered Nurse (RN)</strong> — Provides skilled nursing care. Requires formal nursing education and state licensure.</li>
</ul>`,
      },
      {
        id: "training-resources",
        heading: "Caregiver Training Resources",
        body: `<ul>
<li><strong>AARP Caregiver Training</strong> — Free online courses covering caregiving basics, dementia care, and self-care for caregivers.</li>
<li><strong>Caregiver Action Network</strong> — Education programs and peer support for family caregivers.</li>
<li><strong>Local community colleges</strong> — Many offer CNA and HHA training programs at low cost.</li>
<li><strong>Home health agencies</strong> — Some agencies provide training for new hires and may reimburse certification costs.</li>
<li><strong>State Medicaid programs</strong> — Some states offer free training for family caregivers who are enrolled in consumer-directed care programs.</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Do I need a license to be a caregiver?",
        answer:
          "For non-medical personal care (bathing, dressing, companionship), no license is required in most states. For home health aide services through a Medicare-certified agency, you need at least 75 hours of training and a competency evaluation. For skilled nursing care, you need a nursing license (LPN or RN).",
      },
      {
        question: "How long does it take to become a certified home health aide?",
        answer:
          "The minimum federal requirement for Medicare-certified agencies is 75 hours of training, including at least 16 hours of supervised practical training. Many programs can be completed in 2-4 weeks. State requirements may be higher.",
      },
      {
        question: "Can I get paid to care for a family member?",
        answer:
          "In most cases, Medicare does not pay family caregivers. However, some state Medicaid programs allow beneficiaries to hire family members as paid personal care attendants. Contact your state's Medicaid office or local Area Agency on Aging to explore options in your state.",
      },
    ],
    relatedLinks: [
      { label: "Caregiver Guide Overview", path: "/guide-to-being-a-caregiver" },
      { label: "Caregiver Assistance Programs", path: "/guide-to-being-a-caregiver/caregiver-assistance" },
      { label: "Who Qualifies as a Caregiver Under Medicare Rules", path: "/guide-to-being-a-caregiver/who-qualifies-as-a-caregiver-under-medicare-rules" },
    ],
  },
  {
    slug: "what-are-the-4-types-of-caregivers",
    title: "What Are the 4 Types of Caregivers?",
    subtitle: "CAREGIVER RESOURCES",
    heroDescription:
      "A breakdown of the four main types of caregivers — family, professional, informal, and long-distance — and how each type interacts with Medicare.",
    sections: [
      {
        id: "four-types",
        heading: "The 4 Types of Caregivers",
        body: `<p>Caregiving takes many forms. Understanding the different types helps families plan care arrangements and identify which Medicare or Medicaid benefits apply.</p>`,
      },
      {
        id: "family-caregivers",
        heading: "1. Family Caregivers",
        body: `<p>Family caregivers are unpaid relatives — spouses, adult children, siblings, or other family members — who provide care at home. They are the most common type of caregiver in the United States, with an estimated 53 million Americans providing unpaid care to an adult or child with special needs.</p>
<p><strong>Medicare relevance:</strong> Medicare does not pay family caregivers directly. However, Medicare covers home health care, skilled nursing, and hospice services that support the beneficiary at home, reducing the family caregiver's workload.</p>`,
      },
      {
        id: "professional-caregivers",
        heading: "2. Professional Caregivers",
        body: `<p>Professional caregivers are paid workers — home health aides, personal care aides, certified nursing assistants, or licensed nurses — who provide care either through an agency or as private-pay employees.</p>
<p><strong>Medicare relevance:</strong> Medicare Part A and Part B cover skilled home health services provided by Medicare-certified agencies. This includes skilled nursing visits, physical therapy, and home health aide services when ordered by a physician for a homebound beneficiary.</p>`,
      },
      {
        id: "informal-caregivers",
        heading: "3. Informal Caregivers",
        body: `<p>Informal caregivers are friends, neighbors, or community members who provide help without formal training or compensation. They might drive a neighbor to appointments, help with grocery shopping, or provide companionship.</p>
<p><strong>Medicare relevance:</strong> Informal caregivers are not covered by Medicare. However, they can be an important part of a beneficiary's support network, filling gaps that Medicare doesn't cover (like transportation and companionship).</p>`,
      },
      {
        id: "long-distance-caregivers",
        heading: "4. Long-Distance Caregivers",
        body: `<p>Long-distance caregivers are family members who coordinate care from a distance — often managing logistics, finances, and communication with healthcare providers without being physically present.</p>
<p><strong>Medicare relevance:</strong> Long-distance caregivers can be authorized to speak with Medicare on behalf of a beneficiary by completing a Medicare Authorization to Disclose Personal Health Information form. They can also manage Medicare Advantage or Part D plan enrollment and appeals remotely.</p>
<p><strong>Key tools for long-distance caregivers:</strong></p>
<ul>
<li>Medicare.gov account (to view claims, coverage, and plan information)</li>
<li>Telehealth services (to participate in medical appointments remotely)</li>
<li>Care management apps (to coordinate schedules and share information with other caregivers)</li>
<li>Geriatric care managers (professional coordinators who can manage local care on behalf of distant family)</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Which type of caregiver does Medicare cover?",
        answer:
          "Medicare covers professional caregivers — specifically, home health aides and skilled nursing professionals employed by Medicare-certified home health agencies. Family and informal caregivers are not paid by Medicare.",
      },
      {
        question: "What is the most common type of caregiver?",
        answer:
          "Family caregivers are by far the most common type. According to the National Alliance for Caregiving, approximately 53 million Americans provide unpaid care to an adult or child with a health condition or disability.",
      },
      {
        question: "Can a long-distance caregiver manage Medicare for a loved one?",
        answer:
          "Yes. A beneficiary can authorize a family member to access their Medicare information by completing a Medicare Authorization to Disclose Personal Health Information form (CMS-10106). For legal decisions, a durable power of attorney for healthcare is also recommended.",
      },
    ],
    relatedLinks: [
      { label: "Caregiver Guide Overview", path: "/guide-to-being-a-caregiver" },
      { label: "How to Become a Caregiver", path: "/guide-to-being-a-caregiver/how-to-become-a-caregiver" },
      { label: "What Is a Caregiver?", path: "/guide-to-being-a-caregiver/what-is-a-caregiver" },
    ],
  },
  {
    slug: "what-is-a-caregiver",
    title: "What Is a Caregiver?",
    subtitle: "CAREGIVER RESOURCES",
    heroDescription:
      "A definition of caregiver, the different roles caregivers play in the Medicare system, and the scope of caregiving in the United States.",
    sections: [
      {
        id: "definition",
        heading: "Caregiver Definition",
        body: `<p>A caregiver is a person who provides assistance to someone who needs help due to illness, disability, or age-related conditions. Caregivers may be family members, friends, or paid professionals. The care they provide can range from occasional help with daily tasks to full-time, around-the-clock support.</p>
<p>In the United States, an estimated 53 million people serve as unpaid caregivers to an adult or child with special needs. The economic value of this unpaid care is estimated at over $470 billion per year — far exceeding what Medicare and Medicaid spend on formal home care combined.</p>`,
      },
      {
        id: "what-caregivers-do",
        heading: "What Do Caregivers Do?",
        body: `<p>Caregiving tasks vary widely depending on the care recipient's needs and the caregiver's relationship. Common caregiving activities include:</p>
<ul>
<li><strong>Personal care</strong> — Bathing, dressing, grooming, toileting</li>
<li><strong>Medical care</strong> — Managing medications, wound care, monitoring vital signs, accompanying to medical appointments</li>
<li><strong>Household tasks</strong> — Cooking, cleaning, laundry, grocery shopping</li>
<li><strong>Transportation</strong> — Driving to appointments, errands, social activities</li>
<li><strong>Care coordination</strong> — Communicating with doctors, managing insurance, coordinating other services</li>
<li><strong>Emotional support</strong> — Providing companionship, managing behavioral symptoms of dementia</li>
<li><strong>Financial management</strong> — Paying bills, managing assets, navigating benefits</li>
</ul>`,
      },
      {
        id: "caregiver-statistics",
        heading: "Caregiving in America: Key Statistics",
        body: `<table>
<thead><tr><th>Statistic</th><th>Data</th></tr></thead>
<tbody>
<tr><td>Number of unpaid caregivers in the U.S.</td><td>~53 million</td></tr>
<tr><td>Average age of caregiver</td><td>49 years old</td></tr>
<tr><td>Percentage who are women</td><td>~61%</td></tr>
<tr><td>Average hours of care per week</td><td>~24 hours</td></tr>
<tr><td>Percentage caring for a parent</td><td>~48%</td></tr>
<tr><td>Estimated economic value of unpaid care</td><td>$470+ billion/year</td></tr>
</tbody>
</table>
<p><em>Sources: National Alliance for Caregiving, AARP Public Policy Institute</em></p>`,
      },
      {
        id: "caregiver-and-medicare",
        heading: "Caregivers and the Medicare System",
        body: `<p>Caregivers are essential partners in the Medicare system, even though Medicare doesn't pay them directly. They help beneficiaries:</p>
<ul>
<li>Understand and use their Medicare benefits</li>
<li>Navigate plan choices during enrollment periods</li>
<li>Appeal denied claims and coverage decisions</li>
<li>Coordinate between multiple providers and specialists</li>
<li>Manage the gap between what Medicare covers and what the beneficiary actually needs</li>
</ul>
<p>Many caregivers also become the primary contact for Medicare Advantage plans, Part D drug plans, and Medigap insurers — making it critical that they understand how these programs work.</p>`,
      },
    ],
    faqs: [
      {
        question: "What is the difference between a caregiver and a home health aide?",
        answer:
          "A caregiver is a broad term for anyone who provides care to a person with a health condition or disability. A home health aide is a specific type of professional caregiver who has completed formal training and works for a home health agency. Medicare covers home health aide services when ordered by a physician for a homebound beneficiary.",
      },
      {
        question: "Is a caregiver the same as a personal care attendant?",
        answer:
          "The terms are often used interchangeably, but a personal care attendant (PCA) typically refers to a paid worker who provides non-medical personal care. Some Medicaid programs use the term PCA specifically for workers in consumer-directed programs where the beneficiary hires and directs their own care.",
      },
      {
        question: "What resources are available for new caregivers?",
        answer:
          "New caregivers should contact their local Area Agency on Aging (AAA) through the Eldercare Locator (1-800-677-1116). AARP's Caregiver Resource Center, the Caregiver Action Network, and the National Alliance for Caregiving all offer free guides, training, and support groups.",
      },
    ],
    relatedLinks: [
      { label: "Caregiver Guide Overview", path: "/guide-to-being-a-caregiver" },
      { label: "What Are the 4 Types of Caregivers?", path: "/guide-to-being-a-caregiver/what-are-the-4-types-of-caregivers" },
      { label: "How to Become a Caregiver", path: "/guide-to-being-a-caregiver/how-to-become-a-caregiver" },
      { label: "Caregiver Assistance Programs", path: "/guide-to-being-a-caregiver/caregiver-assistance" },
    ],
  },
];
