import { NextResponse } from "next/server";
import { contactSchema, fieldErrors, sanitizeLine } from "@/lib/validation";
import { sendStaffEmail } from "@/lib/email";
import { rateLimit, pruneRateLimitBuckets } from "@/lib/rate-limit";
import { createReference } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Rejects oversized bodies before they are parsed into memory. */
const MAX_BODY_BYTES = 32 * 1024;

function bodyTooLarge(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  return Number.isFinite(length) && length > MAX_BODY_BYTES;
}

function clientKey(request: Request) {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  pruneRateLimitBuckets();

  const limit = rateLimit(`contact:${clientKey(request)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "You have sent several messages in a short time. Please wait a few minutes, or contact us directly by phone or WhatsApp.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  if (bodyTooLarge(request)) {
    return NextResponse.json(
      { ok: false, error: "That message is too large. Please shorten it and try again." },
      { status: 413 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We could not read your submission." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields and try again.", errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.company) {
    return NextResponse.json({ ok: true, reference: createReference("RMC"), delivered: false });
  }

  const reference = createReference("RMC");
  const subject = sanitizeLine(data.subject);

  const { delivered } = await sendStaffEmail({
    subject: `New R&M Website Message — ${subject}`,
    heading: `New contact message — ${subject}`,
    reference,
    replyTo: data.email,
    message: data.message,
    rows: [
      { label: "Client name", value: sanitizeLine(data.fullName) },
      { label: "Email", value: sanitizeLine(data.email) },
      { label: "Phone", value: data.phone ? sanitizeLine(data.phone) : "Not provided" },
      { label: "Subject", value: subject },
      { label: "Source", value: "Contact page form" },
    ],
  });

  return NextResponse.json({ ok: true, reference, delivered });
}
