import { NextResponse } from "next/server";
import { inquirySchema, fieldErrors, sanitizeLine } from "@/lib/validation";
import { sendStaffEmail } from "@/lib/email";
import { rateLimit, pruneRateLimitBuckets } from "@/lib/rate-limit";
import { createReference } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Best-effort client identifier for rate limiting.
 *
 * These headers are set by the hosting platform (Vercel sets x-forwarded-for
 * itself, so it is trustworthy there). If this is ever self-hosted behind a
 * proxy that passes client headers through unchecked, treat the value as
 * spoofable and rate-limit at the proxy instead.
 */
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

  const limit = rateLimit(`inquiry:${clientKey(request)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "You have submitted several requests in a short time. Please wait a few minutes, or contact us directly by phone or WhatsApp.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  if (bodyTooLarge(request)) {
    return NextResponse.json(
      { ok: false, error: "That request is too large. Please shorten it and try again." },
      { status: 413 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We could not read your submission." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields and try again.", errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot filled in => almost certainly a bot. Respond as if accepted so the
  // bot gains no signal, but send nothing.
  if (data.company) {
    return NextResponse.json({ ok: true, reference: createReference(), delivered: false });
  }

  const reference = createReference();
  const service = sanitizeLine(data.service);

  const { delivered } = await sendStaffEmail({
    subject: `New R&M Website Inquiry — ${service}${data.urgency === "Urgent" ? " [URGENT]" : ""}`,
    heading: `New service inquiry — ${service}`,
    reference,
    replyTo: data.email,
    message: data.message,
    rows: [
      { label: "Client name", value: sanitizeLine(data.fullName) },
      { label: "Email", value: sanitizeLine(data.email) },
      { label: "Phone", value: sanitizeLine(data.phone) },
      { label: "Preferred contact method", value: data.preferredContact },
      { label: "Service", value: service },
      { label: "Client type", value: data.clientType },
      { label: "Currently in Rwanda", value: data.inRwanda },
      { label: "Urgency", value: data.urgency },
    ],
  });

  return NextResponse.json({ ok: true, reference, delivered });
}
