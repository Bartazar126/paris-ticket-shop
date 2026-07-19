import type { Metadata } from "next";
import Link from "next/link";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";

export const metadata: Metadata = {
  title: "Paris Ticket Shop | Privacy Policy",
  description:
    "Privacy Policy for Paris Ticket Shop operated by TourCierge s. r. o. Learn how we collect, use, and protect your personal data under GDPR.",
};

export default function PrivacyPolicyPage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full py-6">
          <div className="pts-container pb-6">
            <div className="mb-5">
              <h1 className="font-display text-4xl font-semibold leading-[2.75rem] text-[#15399b]">
                Privacy Policy
              </h1>
            </div>

            <div className="max-w-none">
              <h2 className="font-display mb-2 text-4xl font-medium leading-10">
                Privacy Policy
              </h2>
              <p className="mb-4">
                <strong>Last Updated:</strong> April 10, 2026
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                1. Introduction
              </h3>
              <p className="mb-4">
                <strong>TourCierge s. r. o.</strong> (hereinafter &quot;we&quot;,
                &quot;us&quot;, or &quot;the Company&quot;) operates the website{" "}
                <Link
                  href="/"
                  className="text-[#15399b] underline hover:opacity-80"
                >
                  https://paristicketshop.com/
                </Link>{" "}
                (the &quot;Website&quot;). We are committed to protecting your
                personal data and your privacy in accordance with Regulation
                (EU) 2016/679 (General Data Protection Regulation - GDPR).
              </p>
              <p className="mb-4">
                This policy explains how we collect, use, and safeguard your
                information when you use our Services.
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                2. Data Controller Information
              </h3>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  <strong>Company Name:</strong> TourCierge s. r. o.
                </li>
                <li>
                  <strong>Registration Number (IČO):</strong> 57383898
                </li>
                <li>
                  <strong>Registered Office:</strong> Karpatské námestie 10A,
                  831 06 Bratislava - Rača, Slovak Republic
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@paristicketshop.com"
                    className="text-[#15399b] underline hover:opacity-80"
                  >
                    info@paristicketshop.com
                  </a>
                </li>
              </ul>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                3. Data We Collect
              </h3>
              <p className="mb-4">
                We collect information that is necessary to provide the
                requested services:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  <strong>Identity Data:</strong> Full name of the buyer and all
                  participants (required for nominative monument tickets).
                </li>
                <li>
                  <strong>Contact Data:</strong> Email address and phone number.
                </li>
                <li>
                  <strong>Transaction Data:</strong> Details about payments
                  (processed via Stripe/PayPal) and services purchased.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type, and
                  cookies (see our Cookie Policy).
                </li>
              </ul>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                4. Legal Basis and Purposes of Processing
              </h3>
              <p className="mb-4">
                We process your data for the following reasons:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  <strong>Performance of a Contract:</strong> To process your
                  booking, issue nominative tickets, and send them to your
                  email.
                </li>
                <li>
                  <strong>Legal Obligation:</strong> To comply with tax and
                  accounting regulations in the Slovak Republic.
                </li>
                <li>
                  <strong>Legitimate Interest:</strong> To improve our services,
                  handle customer inquiries, and prevent fraud.
                </li>
                <li>
                  <strong>Consent:</strong> If you opt-in to receive promotional
                  offers (newsletter).
                </li>
              </ul>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                5. Data Retention
              </h3>
              <p className="mb-4">
                We keep your personal data only as long as necessary:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  <strong>Booking Information:</strong> Retained for the
                  duration of the service and for the period required by
                  accounting laws (typically 10 years for invoices).
                </li>
                <li>
                  <strong>Communication:</strong> Inquiries are kept for the
                  duration needed to resolve the request.
                </li>
              </ul>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                6. Third-Party Data Sharing
              </h3>
              <p className="mb-4">
                We do not sell your data. We share information only with trusted
                partners necessary to fulfill your booking:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  <strong>Monuments/Museums:</strong> To issue your official
                  nominative entry tickets.
                </li>
                <li>
                  <strong>Payment Processors:</strong> Stripe or PayPal (we do
                  not store your full credit card details).
                </li>
                <li>
                  <strong>Service Tools:</strong> Jotform (for data collection)
                  and email service providers.
                </li>
                <li>
                  <strong>Public Authorities:</strong> Only when required by
                  law.
                </li>
              </ul>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                7. International Data Transfers
              </h3>
              <p className="mb-4">
                When data is transferred outside the European Economic Area
                (EEA) (e.g., to service providers like Stripe), we ensure that
                appropriate safeguards (such as Standard Contractual Clauses)
                are in place to protect your information.
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                8. Your Rights
              </h3>
              <p className="mb-4">
                Under the GDPR, you have the following rights:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  <strong>Access:</strong> Request a copy of the data we hold
                  about you.
                </li>
                <li>
                  <strong>Rectification:</strong> Correct inaccurate or
                  incomplete data.
                </li>
                <li>
                  <strong>Erasure (&quot;Right to be forgotten&quot;):</strong>{" "}
                  Request deletion of your data (subject to legal retention
                  requirements).
                </li>
                <li>
                  <strong>Restriction:</strong> Limit how we process your data.
                </li>
                <li>
                  <strong>Data Portability:</strong> Receive your data in a
                  structured, machine-readable format.
                </li>
                <li>
                  <strong>Object:</strong> Object to processing based on
                  legitimate interests.
                </li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:info@paristicketshop.com"
                  className="font-bold text-[#15399b] underline hover:opacity-80"
                >
                  info@paristicketshop.com
                </a>
                .
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                9. Data Security
              </h3>
              <p className="mb-4">
                We implement technical and organizational security measures
                (such as SSL encryption) to protect your data from unauthorized
                access, loss, or alteration.
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                10. Complaints
              </h3>
              <p className="mb-4">
                If you believe your data protection rights have been violated,
                you have the right to lodge a complaint with the{" "}
                <strong>
                  Office for Personal Data Protection of the Slovak Republic
                </strong>{" "}
                (Úrad na ochranu osobných údajov Slovenskej republiky).
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/"
                className="inline-block rounded-lg border-2 border-solid border-[#15399b] bg-[#15399b] px-3 py-1.5 text-center text-white transition hover:opacity-90"
              >
                Back
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
