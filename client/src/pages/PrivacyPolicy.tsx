import { useCMSSEO } from "@/hooks/useCMSSEO";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  useCMSSEO({
    contentType: "page",
    slug: "privacy-policy",
    title: "Privacy Policy | MedicareFAQ.com",
    description:
      "Read the MedicareFAQ.com privacy policy to understand how we collect, use, and protect your personal information.",
    canonical: "https://www.medicarefaq.com/privacy-policy",
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
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <p className="mt-2 text-white/70 text-sm">Last updated: January 1, 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container max-w-3xl">
            <div className="prose prose-slate max-w-none">

              <h2>1. Introduction</h2>
              <p>
                MedicareFAQ.com ("we," "us," or "our") is operated by Elite Insurance Partners. We are
                committed to protecting your personal information and your right to privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you
                visit our website.
              </p>

              <h2>2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways, including:</p>
              <ul>
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone number, and ZIP code that
                  you voluntarily provide when requesting information or using our tools.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our website, including pages
                  visited, time spent, and referring URLs, collected automatically via cookies and
                  analytics tools.
                </li>
                <li>
                  <strong>Device Data:</strong> IP address, browser type, operating system, and device
                  identifiers.
                </li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, operate, and maintain our website and services</li>
                <li>Connect you with licensed Medicare insurance agents</li>
                <li>Send you information you have requested about Medicare plans</li>
                <li>Improve and personalize your experience on our site</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>4. Sharing Your Information</h2>
              <p>
                We may share your information with licensed insurance agents and carriers for the purpose
                of providing you with Medicare plan quotes and information. We do not sell your personal
                information to third parties for their own marketing purposes.
              </p>
              <p>
                We may also share information with service providers who assist us in operating our
                website, conducting our business, or serving our users, so long as those parties agree to
                keep this information confidential.
              </p>

              <h2>5. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies, web beacons, and similar tracking technologies to track activity on our
                website and hold certain information. You can instruct your browser to refuse all cookies
                or to indicate when a cookie is being sent. However, if you do not accept cookies, some
                portions of our website may not function properly.
              </p>

              <h2>6. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We have no control over the
                content, privacy policies, or practices of any third-party sites and encourage you to
                review the privacy policy of every site you visit.
              </p>

              <h2>7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your
                personal information against accidental or unlawful destruction, loss, alteration,
                unauthorized disclosure, or access. However, no method of transmission over the Internet
                or electronic storage is 100% secure.
              </p>

              <h2>8. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal
                information, including the right to access, correct, or delete the data we hold about
                you. To exercise these rights, please contact us at{" "}
                <a href="mailto:info@medicarefaq.com">info@medicarefaq.com</a>.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our website is not directed to children under the age of 13. We do not knowingly collect
                personal information from children under 13. If you believe we have inadvertently
                collected such information, please contact us immediately.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the "Last updated" date. You
                are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at:
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
