import { useCMSSEO } from "@/hooks/useCMSSEO";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

export default function TermsOfUse() {
  useCMSSEO({
    contentType: "page",
    slug: "terms-of-use",
    title: "Terms of Use | MedicareFAQ.com",
    description:
      "Review the terms and conditions governing your use of MedicareFAQ.com, operated by Elite Insurance Partners.",
    canonical: "https://www.medicarefaq.com/terms-of-use",
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation — Desktop */}
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar />
        <HeaderBar />
        <MegaMenu />
      </header>

      {/* Navigation — Mobile */}
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-[#1B2A4A] text-white py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Use</h1>
            <p className="mt-2 text-white/70 text-sm">Last updated: January 1, 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container max-w-3xl">
            <div className="prose prose-slate max-w-none">

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using MedicareFAQ.com (the "Site"), you agree to be bound by these Terms
                of Use and all applicable laws and regulations. If you do not agree with any of these
                terms, you are prohibited from using or accessing this Site. The Site is operated by
                Elite Insurance Partners ("we," "us," or "our").
              </p>

              <h2>2. Use of the Site</h2>
              <p>
                The content on this Site is provided for general informational purposes only. It is not
                intended as, and should not be construed as, professional insurance, legal, financial, or
                medical advice. You should consult a licensed insurance professional before making any
                Medicare-related decisions.
              </p>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Site for any unlawful purpose or in violation of any regulations</li>
                <li>Attempt to gain unauthorized access to any portion of the Site</li>
                <li>Reproduce, duplicate, copy, sell, or exploit any portion of the Site without express written permission</li>
                <li>Use automated tools to scrape, crawl, or harvest data from the Site</li>
              </ul>

              <h2>3. Not an Official Government Resource</h2>
              <p>
                MedicareFAQ.com is not affiliated with, endorsed by, or operated by the U.S. government,
                the Centers for Medicare &amp; Medicaid Services (CMS), or any other government agency.
                For official Medicare information, visit{" "}
                <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">
                  Medicare.gov
                </a>.
              </p>

              <h2>4. Insurance Solicitation Disclosure</h2>
              <p>
                MedicareFAQ.com is operated by a licensed insurance marketing organization. By submitting
                your contact information through this Site, you consent to be contacted by licensed
                insurance agents regarding Medicare supplement, Medicare Advantage, and Part D plans
                available in your area. Submission of your information does not obligate you to purchase
                any insurance product.
              </p>

              <h2>5. Intellectual Property</h2>
              <p>
                All content on this Site, including text, graphics, logos, images, and software, is the
                property of Elite Insurance Partners or its content suppliers and is protected by
                applicable copyright and intellectual property laws. You may not reproduce, distribute,
                or create derivative works without our express written consent.
              </p>

              <h2>6. Third-Party Links</h2>
              <p>
                The Site may contain links to third-party websites. These links are provided for your
                convenience only. We have no control over the content of those sites and accept no
                responsibility for them or for any loss or damage that may arise from your use of them.
              </p>

              <h2>7. Disclaimer of Warranties</h2>
              <p>
                The Site is provided on an "as is" and "as available" basis without any warranties of
                any kind, either express or implied. We do not warrant that the Site will be
                uninterrupted, error-free, or free of viruses or other harmful components. We make no
                representations about the accuracy, reliability, completeness, or timeliness of the
                content on the Site.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Elite Insurance Partners shall not be liable for
                any indirect, incidental, special, consequential, or punitive damages arising out of or
                related to your use of the Site or its content, even if we have been advised of the
                possibility of such damages.
              </p>

              <h2>9. Governing Law</h2>
              <p>
                These Terms of Use shall be governed by and construed in accordance with the laws of the
                United States and the state in which Elite Insurance Partners is domiciled, without
                regard to its conflict of law provisions.
              </p>

              <h2>10. Changes to These Terms</h2>
              <p>
                We reserve the right to modify these Terms of Use at any time. Changes will be effective
                immediately upon posting to the Site. Your continued use of the Site after any changes
                constitutes your acceptance of the new terms.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have questions about these Terms of Use, please contact us at:
              </p>
              <address className="not-italic">
                <strong>MedicareFAQ.com / Elite Insurance Partners</strong><br />
                Email: <a href="mailto:info@medicarefaq.com">info@medicarefaq.com</a><br />
                Phone: <a href="tel:8883358996">(888) 335-8996</a>
              </address>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
