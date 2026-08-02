import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Quote request handler.
 *
 * Needs RESEND_API_KEY in the environment (.env.local locally, project settings
 * on Vercel). Without it the route returns a clear error, which the form
 * surfaces to the guest — it never reports a false success.
 */

const TO_ADDRESS = "Joseph@ootastings.com";

/** Resend only delivers from a verified domain — ootastings.com is verified. */
const FROM_ADDRESS = "OOT Tastings <Joseph@ootastings.com>";

type Selection = { kind: string; name: string; price: string };

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "That request couldn't be read." },
      { status: 400 },
    );
  }

  const str = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  const name = str("name");
  const company = str("company");
  const email = str("email");
  const message = str("message");
  const phone = str("phone");
  const timeframe = str("timeframe");
  const guests = str("guests");
  const location = str("location");
  const selection: Selection[] = Array.isArray(body.selection)
    ? (body.selection as Selection[])
    : [];

  if (!name || !company || !email || !message) {
    return NextResponse.json(
      { error: "Name, company, email and message are all required." },
      { status: 400 },
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — inquiry was not sent.");
    return NextResponse.json(
      {
        error:
          "Our inquiry form isn't connected yet, so this didn't send. Please email us directly and we'll pick it up.",
      },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Company", company],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Preferred date / timeframe", timeframe || "—"],
    ["Estimated guests", guests || "—"],
    ["Venue / location", location || "—"],
  ];

  const packageLines = selection.length
    ? selection
        .map(
          (item) =>
            `<li><strong>${escape(item.name)}</strong> — ${escape(
              item.price,
            )} <span style="color:#7a7a6a">(${escape(item.kind)})</span></li>`,
        )
        .join("")
    : "<li style=\"color:#7a7a6a\">No package selected</li>";

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#241f14;max-width:640px">
      <h2 style="font-size:18px;margin:0 0 16px">New tasting inquiry</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr>
                 <td style="padding:6px 12px 6px 0;color:#7a7a6a;white-space:nowrap">${label}</td>
                 <td style="padding:6px 0">${escape(value)}</td>
               </tr>`,
          )
          .join("")}
      </table>
      <h3 style="font-size:14px;margin:24px 0 8px">Selected package</h3>
      <ul style="font-size:14px;margin:0;padding-left:18px">${packageLines}</ul>
      <h3 style="font-size:14px;margin:24px 0 8px">Message</h3>
      <p style="font-size:14px;white-space:pre-wrap;margin:0">${escape(message)}</p>
    </div>`;

  const text = [
    "New tasting inquiry",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Selected package:",
    ...(selection.length
      ? selection.map((i) => `- ${i.name} — ${i.price} (${i.kind})`)
      : ["- none"]),
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject: `Tasting inquiry — ${company} (${name})`,
      html,
      text,
    });

    if (error) {
      console.error("Resend rejected the inquiry:", error);
      return NextResponse.json(
        { error: "We couldn't send that just now. Please try again shortly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Inquiry send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send that just now. Please try again shortly." },
      { status: 500 },
    );
  }
}
