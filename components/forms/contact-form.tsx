"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Loader2, Send, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Honeypot } from "@/components/ui/field";
import { Card } from "@/components/ui/card";
import { track } from "@/lib/analytics";
import { validateContact } from "@/lib/form-rules";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  company: string;
};

const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
  company: "",
};

export function ContactForm() {
  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "error">("idle");
  const [formError, setFormError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<{ reference: string; delivered: boolean } | null>(null);
  const startedRef = React.useRef(false);
  const summaryRef = React.useRef<HTMLDivElement>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("contact_form_started");
    }
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const issues = validateContact(form);
    if (Object.keys(issues).length > 0) {
      setErrors(issues);
      setStatus("error");
      track("form_error", { form: "contact", fields: Object.keys(issues).join(",") });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    // Trim before sending so the server sees exactly what we validated.
    const payload = {
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok: boolean;
        reference?: string;
        delivered?: boolean;
        errors?: Record<string, string>;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setFormError(
          data.error ??
            "We could not send your message just now. Please try again, or contact us by phone or WhatsApp.",
        );
        setStatus("error");
        track("form_error", { form: "contact", reason: data.error ?? "server" });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      setSuccess({ reference: data.reference ?? "", delivered: Boolean(data.delivered) });
      setStatus("idle");
      track("contact_form_submitted");
    } catch {
      setFormError(
        "We could not reach our server. Please check your connection and try again, or contact us by phone or WhatsApp.",
      );
      setStatus("error");
      track("form_error", { form: "contact", reason: "network" });
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (success) {
    return (
      <Card>
        <div className="p-6 sm:p-8">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-700 text-white">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-2xl" tabIndex={-1}>
            Your message has been received
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
            Thank you for contacting R&amp;M Services Group Ltd. Your message has been received and
            our team will review it and get back to you.
          </p>
          <p className="mt-4 rounded-lg border border-line bg-surface-soft px-4 py-3 text-sm text-navy-900">
            Your reference:{" "}
            <span className="font-display text-base font-semibold">{success.reference}</span>
          </p>
          {!success.delivered ? (
            <p className="mt-4 flex items-start gap-2 rounded-lg border border-gold-300 bg-gold-100/50 px-4 py-3 text-sm text-navy-900">
              <Info className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
              <span>
                Your message was recorded, but our email notification service is not confirmed as
                configured on this deployment. If you do not hear from us, please call or message us
                directly.
              </span>
            </p>
          ) : null}
          <Button
            variant="ghost"
            className="mt-6"
            onClick={() => {
              setSuccess(null);
              setForm(emptyForm);
              startedRef.current = false;
            }}
          >
            Send another message
          </Button>
        </div>
      </Card>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || Boolean(formError);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="polite"
        className={hasErrors ? "rounded-card border border-red-300 bg-red-50 p-4" : "sr-only"}
      >
        {hasErrors ? (
          <>
            <p className="flex items-start gap-2 text-sm font-semibold text-red-800">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {formError ?? "Please check the highlighted fields below and try again."}
            </p>
            {Object.keys(errors).length > 0 ? (
              <ul className="mt-2 grid gap-1 pl-6 text-sm text-red-800">
                {Object.entries(errors).map(([key, value]) => (
                  <li key={key} className="list-disc">
                    {value}
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-fullName" label="Full name" required error={errors.fullName}>
          <Input
            id="c-fullName"
            autoComplete="name"
            value={form.fullName}
            invalid={Boolean(errors.fullName)}
            onChange={(event) => update("fullName", event.target.value)}
          />
        </Field>
        <Field id="c-email" label="Email address" required error={errors.email}>
          <Input
            id="c-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            invalid={Boolean(errors.email)}
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>
        <Field id="c-phone" label="Phone number" error={errors.phone}>
          <Input
            id="c-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+250 7XX XXX XXX"
            value={form.phone}
            invalid={Boolean(errors.phone)}
            onChange={(event) => update("phone", event.target.value)}
          />
        </Field>
        <Field id="c-subject" label="Subject" required error={errors.subject}>
          <Input
            id="c-subject"
            value={form.subject}
            invalid={Boolean(errors.subject)}
            onChange={(event) => update("subject", event.target.value)}
          />
        </Field>
      </div>

      <Field
        id="c-message"
        label="Message"
        required
        hint="Please do not send ID documents or payment details through this form."
        error={errors.message}
      >
        <Textarea
          id="c-message"
          rows={5}
          value={form.message}
          invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "c-message-error" : "c-message-hint"}
          onChange={(event) => update("message", event.target.value)}
        />
      </Field>

      <div className="rounded-card border border-line bg-surface-soft p-5">
        <label htmlFor="c-consent" className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input
            id="c-consent"
            type="checkbox"
            checked={form.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent) || undefined}
            className="mt-0.5 size-4.5 shrink-0 accent-brand-700"
          />
          <span>
            I agree that R&amp;M Services Group Ltd may contact me about this message, and I have
            read the{" "}
            <Link href="/privacy-policy" className="font-medium text-brand-700 underline underline-offset-4">
              Privacy Policy
            </Link>
            .
            <span className="ml-1 text-brand-700" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.consent ? (
          <p role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.consent}
          </p>
        ) : null}
      </div>

      <Honeypot value={form.company} onChange={(value) => update("company", value)} />

      <Button type="submit" size="lg" disabled={status === "submitting"} className="justify-self-start sm:min-w-52">
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
