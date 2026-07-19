import type { Metadata } from "next";
import Link from "next/link";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";

export const metadata: Metadata = {
  title: "Paris Ticket Shop | Terms and Conditions",
  description:
    "Terms and Conditions for Paris Ticket Shop operated by TourCierge s. r. o. Booking rules, payments, cancellations, and applicable law.",
};

export default function TermsAndConditionsPage() {
  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full py-6">
          <div className="pts-container pb-6">
            <div className="mb-5">
              <h1 className="font-display text-4xl font-semibold leading-[2.75rem] text-[#15399b]">
                Terms and Conditions
              </h1>
            </div>

            <div className="max-w-none">
              <h2 className="font-display mb-2 text-4xl font-medium leading-10">
                Terms and Conditions
              </h2>
              <p className="mb-4">
                <strong>Last Updated:</strong> April 10, 2026
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                Service Provider Information
              </h3>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  <strong>Company Name:</strong> TourCierge s. r. o.
                </li>
                <li>
                  <strong>Registration Number (IČO):</strong> 57383898
                </li>
                <li>
                  <strong>Tax Number (DIČ):</strong> 2122693199
                </li>
                <li>
                  <strong>Registered Office:</strong> Karpatské námestie 10A,
                  831 06 Bratislava - Rača, Slovak Republic
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <Link
                    href="/"
                    className="text-[#15399b] underline hover:opacity-80"
                  >
                    https://paristicketshop.com/
                  </Link>
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

              <div className="my-4 border-t-2 border-solid border-[#15399b]" />

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                1. Identification
              </h3>
              <p className="mb-4">
                1.1. <strong>TourCierge s. r. o.</strong> (hereinafter referred
                to as the Provider), with Identification Number (IČO): 57383898
                and Tax Identification Number (DIČ): 2122693199, is the owner of
                the website located at{" "}
                <Link
                  href="/"
                  className="text-[#15399b] underline hover:opacity-80"
                >
                  https://paristicketshop.com/
                </Link>{" "}
                and its associated social media accounts (hereinafter referred
                to as the Website).
              </p>
              <p className="mb-4">
                1.2. The person accessing this Website (hereinafter referred to
                as the User) assures that they are of legal minimum age to give
                consent regarding information society services. Otherwise, the
                User must refrain from accessing this Website.
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                2. Purpose
              </h3>
              <p className="mb-4">
                2.1. These terms and conditions aim to regulate the relationship
                between the Provider and the User regarding access to this
                Website and the electronic contracting of services consisting of
                the purchase of tickets (access rights and complementary
                services) for the tours offered on this Website (hereinafter
                referred to as the Services).
              </p>
              <p className="mb-4">
                2.2. By accessing this Website or contracting Services, the User
                expressly accepts all the clauses of these terms and conditions,
                its privacy policy, and its cookie policy.
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                3. Content and Intellectual Property
              </h3>
              <p className="mb-4">
                3.1. All content on this Website is the property of{" "}
                <strong>TourCierge s. r. o.</strong> or has been assigned to it
                and is protected by intellectual property regulations (copyright
                and trademarks).
              </p>
              <p className="mb-4">
                3.2. Regardless of their intended purpose, the total or partial
                reproduction, use, exploitation, distribution, and
                commercialization of any content owned by this Website requires
                prior written authorization from the Provider.
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                4. Booking Process
              </h3>
              <p className="mb-4">
                9.1. <strong>Language and Validity:</strong> These Terms and
                Conditions are available in several languages. All bookings are
                subject to actual availability and express acceptance by the
                Provider.
              </p>
              <p className="mb-4">
                9.2. <strong>Obligation to Provide Personal Data:</strong> Before
                completing the payment, the User must provide the personal
                details of all participants. The monument access tickets are{" "}
                <strong>nominative, personal, and non-transferable</strong>. If
                the User provides incorrect or incomplete information, the
                Provider shall not be held responsible for the inability to
                access the monument, and no refund will be issued.
              </p>
              <p className="mb-4">
                9.3. <strong>Ticket Delivery:</strong>
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  Tickets will be sent to the email address provided within{" "}
                  <strong>24 hours</strong> before the start of the scheduled
                  activity.
                </li>
                <li>
                  For bookings made less than 24 hours in advance, tickets may
                  be sent up to 1 hour before the activity starts.
                </li>
                <li>
                  The User is responsible for providing a valid email address
                  and checking their inbox/spam folders.
                </li>
              </ul>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                5. Prices and Payments
              </h3>
              <p className="mb-4">
                10.1. <strong>Payment Methods:</strong> Payments are accepted
                via Credit card (Stripe), PayPal, Google Pay, and Apple Pay.
              </p>
              <p className="mb-4">
                11.1. <strong>Price Transparency:</strong> The prices include
                the access tickets and{" "}
                <strong>value-added services</strong> (e.g., audio guides,
                ticket management, personalized assistance, and the company&apos;s
                commercial margin). All applicable taxes are included in the
                final price displayed before purchase.
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                6. Cancellation and Refund Policy
              </h3>
              <p className="mb-4">
                12.1. <strong>Services including monument tickets:</strong>
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  Cancellation and full refund are only possible up to{" "}
                  <strong>24 hours before</strong> the booked activity time.
                </li>
                <li>
                  After this window, the purchase is non-cancellable,
                  non-modifiable, and non-refundable.
                </li>
                <li>
                  Failure to show up or arriving late does not entitle the User
                  to a refund.
                </li>
              </ul>
              <p className="mb-4">
                12.2. <strong>Legal Basis:</strong> According to Directive
                2011/83/EU, Article 16(l), the right of withdrawal does not
                typically apply to leisure services provided on a specific date.
                The 24-hour cancellation window provided by the Provider is a
                commercial courtesy.
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                7. Applicable Law and Jurisdiction
              </h3>
              <p className="mb-4">
                15.1. These terms and conditions are subject to the laws of the{" "}
                <strong>Slovak Republic</strong>. 15.2. Any dispute,
                controversy, or claim arising out of or related to these terms
                shall be submitted to the exclusive jurisdiction of the courts
                of the <strong>Slovak Republic</strong>.
              </p>

              <h3 className="font-display mb-2 text-[1.75rem] font-medium leading-[2.13rem]">
                8. Contacts
              </h3>
              <p className="mb-4">
                To contact the Provider, please use the following:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-10">
                <li>
                  <strong>Postal Address:</strong> TourCierge s. r. o.,
                  Karpatské námestie 10A, 831 06 Bratislava, Slovak Republic
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
