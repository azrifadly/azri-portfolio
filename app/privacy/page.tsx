import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Source of truth for the privacy policy.
 *
 * Keep this in step with what the site actually does. The two things most
 * likely to drift: the booking form fields in `components/book-call.tsx`,
 * and any third-party service added to `app/api/book/route.ts`.
 */

/**
 * Bump this to today's date whenever a change below is more than a typo fix
 * — new data collected, a new processor, a changed retention period, etc.
 */
const LAST_UPDATED = "August 3, 2026";
const OWNER = site.name;
const DOMAIN = "azrifadli.com";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.name}`,
  description:
    "What this site collects, why it is collected, and how it is handled.",
  alternates: { canonical: "/privacy" },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 font-display text-xl font-extrabold tracking-[-0.01em]">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[16.5px] leading-[1.8] text-muted-foreground">
      {children}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[760px] px-6 pb-24 pt-12">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Home
      </Link>

      <header className="mb-8">
        <h1 className="mb-3 font-display text-[clamp(30px,4.5vw,42px)] font-extrabold leading-[1.12] tracking-[-0.03em]">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <article>
        <P>
          {OWNER} (&ldquo;I&rdquo;, &ldquo;me&rdquo;, &ldquo;my&rdquo;) operates
          this website at {DOMAIN}. This policy explains what personal
          information the site collects, why it is collected, and how it is
          handled.
        </P>

        <H2>Information I collect</H2>
        <P>
          <strong className="font-semibold text-foreground">
            Information you provide.
          </strong>{" "}
          When you book a discovery call, the form asks for your name, your
          email address, and an optional short message. It also records the date
          and time slot you select, together with your browser&rsquo;s time
          zone, so the call can be scheduled correctly for both of us.
        </P>
        <P>
          This is the only place on the site where you are asked for personal
          information. There is no account to create and no other forms.
        </P>
        <P>
          <strong className="font-semibold text-foreground">
            Information collected automatically.
          </strong>{" "}
          The site uses Vercel Analytics to measure general traffic patterns. It
          does not use cookies and does not track visitors across other
          websites. The data is aggregated and anonymous, limited to page views,
          referring website, country, and device or browser type. It does not
          identify you, and it is not linked to anything you submit through the
          booking form.
        </P>
        <P>
          <strong className="font-semibold text-foreground">
            Information stored on your device.
          </strong>{" "}
          After you book a call, the site saves a small record of that booking
          in your browser&rsquo;s local storage so the form can recognise
          duplicate submissions. This record stays on your device and is removed
          when you clear your browser data.
        </P>

        <H2>Why I collect it, and how it is used</H2>
        <P>
          The information you provide through the booking form is used solely to
          respond to your enquiry and to arrange the call. When you submit the
          form, the details are delivered to my email inbox, and I reply from
          there.
        </P>
        <P>
          I do not add you to a mailing list, send newsletters, or use your
          details for marketing. I do not build a profile on you, and I do not
          use your information for advertising.
        </P>
        <P>
          Analytics data is used only to understand which pages are read, so I
          can decide what to write more of.
        </P>

        <H2>Who else handles your information</H2>
        <P>
          This site relies on one third-party service provider:{" "}
          <strong className="font-semibold text-foreground">Vercel</strong>{" "}
          hosts the website and provides the analytics described above. Vercel
          processes your information only as far as is needed to provide those
          services.
        </P>
        <P>
          If I later add a service to deliver booking notifications, this policy
          will be updated to name it.
        </P>
        <P>
          <strong className="font-semibold text-foreground">
            I do not sell, rent, or trade your personal information.
          </strong>{" "}
          I will disclose it only where required by law, or where it is
          necessary to act on a request you have made.
        </P>

        <H2>How long it is kept</H2>
        <P>
          Booking enquiries remain in my email inbox for as long as there is a
          legitimate reason to keep a record of our correspondence. You may ask
          me to delete yours at any time.
        </P>

        <H2>Security</H2>
        <P>
          Information submitted through this site is transmitted over an
          encrypted connection, and access to my inbox is protected. The site is
          also designed to collect as little personal information as possible.
          However, no method of transmitting information over the internet is
          completely secure, and absolute protection cannot be guaranteed.
        </P>

        <H2>Your rights</H2>
        <P>
          You may request access to the personal information I hold about you,
          ask for it to be corrected, or ask for it to be deleted, using any of
          the{" "}
          <Link
            href="/#contact"
            className="text-foreground underline underline-offset-2 transition-colors hover:text-brand"
          >
            contact details on this site
          </Link>
          .
        </P>
        <P>
          You are also free to browse this site without submitting any personal
          information.
        </P>

        <H2>Changes to this policy</H2>
        <P>
          If this policy is updated, the date at the top of the page will
          change. Material changes will be described here.
        </P>
      </article>
    </main>
  );
}
