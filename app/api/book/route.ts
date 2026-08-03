import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CALL_MINUTES = 30;
const MAX_NAME = 80;
const MAX_MESSAGE = 180;

interface BookBody {
  name?: string;
  email?: string;
  date?: string;
  time?: string;
  message?: string;
  tz?: string;
  startISO?: string;
}

/** Format a Date as an iCalendar UTC timestamp: 20260901T090000Z */
function toICSDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Escape reserved characters in iCalendar text values. */
function escapeICS(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Escape HTML so client-supplied values can't inject markup into the email. */
function escapeHTML(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildICS(opts: {
  start: Date;
  end: Date;
  summary: string;
  description: string;
}) {
  const now = toICSDate(new Date());
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AzriFadli//Discovery Call//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}`,
    `DTSTAMP:${now}`,
    `DTSTART:${toICSDate(opts.start)}`,
    `DTEND:${toICSDate(opts.end)}`,
    `SUMMARY:${escapeICS(opts.summary)}`,
    `DESCRIPTION:${escapeICS(opts.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  // Resend's shared sender works without domain verification for testing;
  // swap BOOKING_FROM for an address on your verified domain in production.
  const from = process.env.BOOKING_FROM || "Discovery calls <onboarding@resend.dev>";

  if (!apiKey || !ownerEmail) {
    return NextResponse.json(
      { error: "Booking isn't configured yet. Please email me directly." },
      { status: 503 }
    );
  }

  let body: BookBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const message = (body.message || "").trim();
  const { date, time, tz, startISO } = body;

  if (!name || !EMAIL_RE.test(email) || !date || !time || !startISO) {
    return NextResponse.json({ error: "Missing or invalid booking details." }, { status: 400 });
  }
  if (name.length > MAX_NAME) {
    return NextResponse.json(
      { error: `Name must be ${MAX_NAME} characters or fewer.` },
      { status: 400 }
    );
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: `Message must be ${MAX_MESSAGE} characters or fewer.` },
      { status: 400 }
    );
  }

  const start = new Date(startISO);
  if (Number.isNaN(start.getTime()) || start.getTime() < Date.now()) {
    return NextResponse.json({ error: "Please pick a time in the future." }, { status: 400 });
  }
  const end = new Date(start.getTime() + CALL_MINUTES * 60 * 1000);

  const whenLabel = start.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: tz || "UTC",
  });

  const ics = buildICS({
    start,
    end,
    summary: `Discovery call with ${name}`,
    description:
      `Discovery call booked via the website.\nVisitor: ${name} <${email}>\nRequested slot: ${date} ${time} (${tz || "local"}).` +
      (message ? `\nMessage: ${message}` : ""),
  });

  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safeTz = tz ? escapeHTML(tz) : "";
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;color:#111">
      <h2 style="margin:0 0 12px">New discovery call booked</h2>
      <p style="margin:0 0 6px"><strong>When:</strong> ${escapeHTML(whenLabel)} ${safeTz ? `(${safeTz})` : ""}</p>
      <p style="margin:0 0 6px"><strong>With:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
      <p style="margin:0 0 6px"><strong>Duration:</strong> ${CALL_MINUTES} min</p>
      ${message ? `<p style="margin:0 0 6px"><strong>Message:</strong> ${escapeHTML(message)}</p>` : ""}
      <p style="margin:16px 0 0;color:#666">Open the attached <code>.ics</code> to add it to your calendar. Reply to this email to reach the visitor.</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ownerEmail,
        reply_to: email,
        subject: `New discovery call — ${whenLabel}`,
        html,
        attachments: [
          {
            filename: "discovery-call.ics",
            content: Buffer.from(ics).toString("base64"),
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend error:", res.status, detail);
      return NextResponse.json(
        { error: "Couldn't send the booking. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Booking send failed:", err);
    return NextResponse.json({ error: "Couldn't send the booking. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
