import "server-only";
import { escapeHtml, sanitizeLine } from "@/lib/validation";
import { siteConfig } from "@/content/site";

/**
 * Email delivery for website inquiries.
 *
 * Provider: Resend (https://resend.com). Configure with environment
 * variables only — no key is ever present in the source or sent to the client.
 *
 *   EMAIL_API_KEY   Resend API key (server-side only)
 *   STAFF_EMAIL     Where inquiries are delivered
 *   FROM_EMAIL      Verified sender, e.g. "R&M Website <website@yourdomain.rw>"
 *
 * If EMAIL_API_KEY is missing (e.g. local development), sending is skipped and
 * the submission is logged to the server console instead. The API route still
 * validates and still returns a reference to the visitor, and it reports the
 * delivery status honestly in the response.
 */

export type EmailRow = { label: string; value: string };

export type StaffEmailInput = {
  subject: string;
  heading: string;
  reference: string;
  rows: EmailRow[];
  message: string;
  replyTo?: string;
};

const FALLBACK_STAFF_EMAIL = "irembordbd@gmail.com";

export function emailConfig() {
  return {
    apiKey: process.env.EMAIL_API_KEY ?? "",
    staffEmail: process.env.STAFF_EMAIL ?? FALLBACK_STAFF_EMAIL,
    from: process.env.FROM_EMAIL ?? "R&M Website <onboarding@resend.dev>",
    configured: Boolean(process.env.EMAIL_API_KEY),
  };
}

export function renderStaffEmail({ heading, reference, rows, message }: StaffEmailInput) {
  const submittedAt = new Date().toLocaleString("en-GB", {
    timeZone: "Africa/Kigali",
    dateStyle: "full",
    timeStyle: "short",
  });

  const allRows: EmailRow[] = [
    { label: "Request ID", value: reference },
    ...rows,
    { label: "Date / time (Kigali)", value: submittedAt },
  ];

  const rowsHtml = allRows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e3e8ef;font:600 13px/1.4 Arial,Helvetica,sans-serif;color:#0b1b33;width:190px;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e3e8ef;font:400 14px/1.5 Arial,Helvetica,sans-serif;color:#1f2a3a;">${escapeHtml(row.value) || "&mdash;"}</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:24px 12px;background:#f6f8fb;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e3e8ef;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background:#0b1b33;padding:20px 24px;">
          <p style="margin:0;font:700 18px/1.3 Arial,Helvetica,sans-serif;color:#ffffff;letter-spacing:0.02em;">R&amp;M SERVICES GROUP LTD</p>
          <p style="margin:4px 0 0;font:400 13px/1.4 Arial,Helvetica,sans-serif;color:#94b3d9;">Website notification</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 24px 8px;">
          <h1 style="margin:0 0 6px;font:600 20px/1.3 Arial,Helvetica,sans-serif;color:#0b1b33;">${escapeHtml(heading)}</h1>
          <p style="margin:0 0 16px;font:400 14px/1.6 Arial,Helvetica,sans-serif;color:#3d4a5c;">A new submission was received through ${escapeHtml(siteConfig.url)}.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e3e8ef;border-radius:10px;overflow:hidden;">${rowsHtml}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px 24px;">
          <p style="margin:0 0 6px;font:600 13px/1.4 Arial,Helvetica,sans-serif;color:#0b1b33;">Message</p>
          <div style="padding:14px 16px;background:#f6f8fb;border:1px solid #e3e8ef;border-radius:10px;font:400 14px/1.6 Arial,Helvetica,sans-serif;color:#1f2a3a;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 24px 28px;">
          <p style="margin:0;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#66768c;">Reply directly to this email to reach the client, or contact them using their preferred method above.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "R&M SERVICES GROUP LTD — Website notification",
    "",
    heading,
    "",
    ...allRows.map((row) => `${row.label}: ${row.value || "-"}`),
    "",
    "Message:",
    message,
    "",
    `Received via ${siteConfig.url}`,
  ].join("\n");

  return { html, text };
}

export async function sendStaffEmail(input: StaffEmailInput): Promise<{ delivered: boolean; error?: string }> {
  const config = emailConfig();
  const { html, text } = renderStaffEmail(input);
  const subject = sanitizeLine(input.subject).slice(0, 180);

  if (!config.configured) {
    // In development the full submission is printed so the flow can be tested
    // without a provider. In production it never is: the visitor's name, phone
    // number and message do not belong in server logs.
    if (process.env.NODE_ENV === "production") {
      console.error(
        `[email] EMAIL_API_KEY is not set — submission ${input.reference} was NOT delivered. Configure the email environment variables.`,
      );
    } else {
      console.warn(
        `[email] EMAIL_API_KEY is not set — inquiry ${input.reference} was NOT emailed. Submission:\n${text}`,
      );
    }
    return { delivered: false, error: "email_not_configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(config.apiKey);
    const result = await resend.emails.send({
      from: config.from,
      to: [config.staffEmail],
      subject,
      html,
      text,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    });

    if (result.error) {
      console.error("[email] Resend rejected the message:", result.error);
      return { delivered: false, error: "provider_error" };
    }
    return { delivered: true };
  } catch (error) {
    console.error("[email] Failed to send inquiry notification:", error);
    return { delivered: false, error: "send_failed" };
  }
}
