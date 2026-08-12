/**
 * Single source of truth for every automation/case-study entry.
 *
 * Mirrors lib/products.ts deliberately — same shape, same conventions —
 * but kept as a separate file and type so Products stays untouched.
 * The homepage grid and /automations/[slug] pages both render from this array.
 */
import type { ProductStatus } from "./products";

export interface AutomationMedia {
  type: "image" | "placeholder";
  /** Public path once a real screenshot exists, e.g. "/automations/n8n-canvas.png". */
  src?: string;
  /** Alt text for real images; shown as the caption on placeholder frames. */
  alt: string;
  /** Short label shown above a placeholder frame, e.g. "n8n workflow canvas". */
  label?: string;
  /** Natural pixel size of the source file, used to size the zoomed-in view without upscaling. */
  width?: number;
  height?: number;
}

export interface AutomationSection {
  heading: string;
  body: string[];
  bullets?: string[];
  /** Optional screenshots/placeholders rendered after this section's text. */
  media?: AutomationMedia[];
}

export interface Automation {
  slug: string;
  title: string;
  /** Short description shown on the homepage card and detail page header. */
  description: string;
  status: ProductStatus;
  statusNote?: string;
  /** Monospace tag shown in the card footer, e.g. "Automation / n8n". */
  tag: string;
  iconLetter: string;
  logo?: { src: string; alt: string };
  caseStudy: {
    headline: string;
    sections: AutomationSection[];
    stack?: string[];
    link?: { label: string; href: string };
  };
}

export const automations: Automation[] = [
  {
    slug: "lead-intake-qualification",
    title: "Lead Intake & Qualification",
    description:
      "A webhook-triggered n8n workflow that classifies every discovery-call inquiry as Hot, Warm or Cold with Claude, logs it to Google Sheets, alerts me on Slack for hot leads, and sends a branded confirmation email — the real system behind this site's booking widget.",
    status: "live",
    tag: "Automation / n8n",
    iconLetter: "L",
    caseStudy: {
      headline: "The system that decides which leads I respond to first.",
      sections: [
        {
          heading: "The problem",
          body: [
            "Every discovery-call request landed in the same inbox with no way to tell, at a glance, which ones were worth answering first. Replying to each one manually doesn't scale, and a genuinely hot lead sitting unread for a day is a worse outcome than a slow reply to someone still kicking the tires.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "A webhook-triggered n8n workflow sits behind the booking widget on this site. Every submission — name, email, message, date and time — posts straight to the workflow, which hands the message to Claude for classification: Hot, Warm or Cold, based on how specific and ready-to-move the inquiry sounds. Claude also drafts a suggested reply and a short internal note on what it picked up on, so I'm not starting from a blank page when I follow up.",
            "Every booking gets logged to a Google Sheet alongside all of that — a running, self-annotating record of who's reached out and why it matters. Hot leads branch into a Slack alert so I see them immediately rather than finding them in my inbox hours later. Every visitor also gets a branded confirmation email, sent from my own domain through Resend, so the reply feels personal even though nothing about it required me to be at a keyboard.",
          ],
          media: [
            {
              type: "image",
              src: "/automations/sheet-leads.png",
              alt: "Google Sheet logging each booking with its AI-generated category, a suggested reply and a short internal note on why the lead matters.",
              width: 1222,
              height: 614,
            },
          ],
        },
        {
          heading: "Tools used",
          body: [],
        },
        {
          heading: "The workflow",
          body: [
            "Webhook in, Claude for classification, a conditional branch on lead temperature, then Sheets, Slack and Resend fan out from there.",
          ],
          media: [
            {
              type: "image",
              src: "/automations/n8n-canvas.png",
              alt: "Screenshot of the n8n workflow: Booking Webhook feeding into a Claude-powered categorization step, then branching to Google Sheets, a conditional Slack alert, and a Resend confirmation email.",
              width: 1036,
              height: 448,
            },
          ],
        },
        {
          heading: "The confirmation email",
          body: [
            "Sent immediately, from my own domain, so it reads as a real reply rather than an autoresponder.",
          ],
          media: [
            {
              type: "image",
              src: "/automations/confirmation-email.png",
              alt: "Branded confirmation email from admin@azrifadli.com confirming a booked discovery call appointment.",
              width: 666,
              height: 392,
            },
          ],
        },
        {
          heading: "This isn't a demo",
          body: [
            "This is the actual system sitting behind the \"Book a discovery call\" button on this site right now. Every row in the sheet came through this exact path: real visitor, real webhook call, real classification, real email.",
          ],
          media: [
            {
              type: "image",
              src: "/automations/booking-widget.png",
              alt: "The live booking widget on this site: a calendar and time-slot picker with name, email and message fields.",
              width: 363,
              height: 843,
            },
            {
              type: "image",
              src: "/automations/request-sent.png",
              alt: "The booking widget's confirmation state after a successful submission, showing the booked date and time.",
              width: 415,
              height: 274,
            },
          ],
        },
        {
          heading: "Guardrails",
          body: [
            "The workflow assumes good faith, but it doesn't rely on it blindly. If the same visitor tries to book again shortly after their first request, or submits a slot that's already taken, the widget stops them with a clear message instead of quietly creating a duplicate. It's a small thing, but it keeps the sheet — and my calendar — free of noise without me having to police it.",
          ],
          media: [
            {
              type: "image",
              src: "/automations/booked-request.png",
              alt: "The booking widget declining a repeat submission with an \"Already booked\" message.",
              width: 397,
              height: 213,
            },
          ],
        },
      ],
      stack: ["n8n", "Anthropic API", "Google Sheets", "Slack", "Resend"],
    },
  },
];

export function getAutomation(slug: string): Automation | undefined {
  return automations.find((a) => a.slug === slug);
}
