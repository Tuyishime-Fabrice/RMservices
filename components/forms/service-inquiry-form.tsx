"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Send,
  Info,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Select, RadioCards, Honeypot } from "@/components/ui/field";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { TrackedAnchor } from "@/components/ui/tracked-link";
import { Card } from "@/components/ui/card";
import { track } from "@/lib/analytics";
import { urgentWhatsappMessage } from "@/lib/whatsapp";
import { contact } from "@/content/site";
import { serviceInquiryOptions } from "@/content/services";
import {
  validateInquiry,
  contactMethods,
  clientTypes,
  inRwandaOptions,
} from "@/lib/form-rules";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  service: string;
  clientType: string;
  inRwanda: string;
  message: string;
  urgency: string;
  consent: boolean;
  company: string;
};

const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "WhatsApp",
  service: "",
  clientType: "",
  inRwanda: "",
  message: "",
  urgency: "Normal",
  consent: false,
  company: "",
};

type Success = { reference: string; delivered: boolean; service: string; name: string; urgency: string };

function InquiryFormInner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";

  const [form, setForm] = React.useState<FormState>({
    ...emptyForm,
    service: serviceInquiryOptions.includes(preselected) ? preselected : "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "error">("idle");
  const [formError, setFormError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<Success | null>(null);
  const startedRef = React.useRef(false);
  const errorSummaryRef = React.useRef<HTMLDivElement>(null);

  // Keep the selection in sync when the visitor moves between service pages
  // (e.g. ?service=Irembo Services). Adjusting state during render avoids the
  // extra paint an effect would cause.
  const [lastPreselected, setLastPreselected] = React.useState(preselected);
  if (lastPreselected !== preselected) {
    setLastPreselected(preselected);
    if (preselected && serviceInquiryOptions.includes(preselected)) {
      setForm((prev) => ({ ...prev, service: preselected }));
    }
  }

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("service_inquiry_started", { service: form.service || "unspecified" });
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

    const issues = validateInquiry(form, serviceInquiryOptions);
    if (Object.keys(issues).length > 0) {
      setErrors(issues);
      setStatus("error");
      track("form_error", { form: "service_inquiry", fields: Object.keys(issues).join(",") });
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    // Trim before sending so the server sees exactly what we validated.
    const payload = {
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiry", {
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
            "We could not submit your request just now. Please try again, or contact us by phone or WhatsApp.",
        );
        setStatus("error");
        track("form_error", { form: "service_inquiry", reason: data.error ?? "server" });
        requestAnimationFrame(() => errorSummaryRef.current?.focus());
        return;
      }

      setSuccess({
        reference: data.reference ?? "",
        delivered: Boolean(data.delivered),
        service: payload.service,
        name: payload.fullName,
        urgency: payload.urgency,
      });
      setStatus("idle");
      track("service_inquiry_submitted", {
        service: payload.service,
        urgency: payload.urgency,
        client_type: payload.clientType,
        preferred_contact: payload.preferredContact,
      });
    } catch {
      setFormError(
        "We could not reach our server. Please check your connection and try again, or contact us by phone or WhatsApp.",
      );
      setStatus("error");
      track("form_error", { form: "service_inquiry", reason: "network" });
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
    }
  }

  if (success) {
    return (
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-brand-50/70 px-6 py-6 sm:px-8">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-700 text-white">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-2xl" tabIndex={-1}>
            Thank you, {success.name.split(" ")[0]}. Your request has been received.
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
            Thank you for contacting R&amp;M Services Group Ltd. Your inquiry has been received. Our
            team will review your request and contact you using your preferred contact method.
          </p>
        </div>
        <div className="grid gap-5 px-6 py-6 sm:px-8">
          <dl className="grid gap-3 rounded-card border border-line bg-surface-soft p-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Your reference
              </dt>
              <dd className="mt-1 font-display text-xl font-semibold text-navy-900">
                {success.reference}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Service requested
              </dt>
              <dd className="mt-1 text-[0.9375rem] font-medium text-navy-900">{success.service}</dd>
            </div>
          </dl>
          <p className="text-sm text-ink-soft">
            Please keep your reference — quoting it helps us find your request quickly if you call or
            message us.
          </p>

          {success.urgency === "Urgent" ? (
            <div className="rounded-card border border-gold-300 bg-gold-100/60 p-5">
              <p className="flex items-start gap-2 text-sm font-semibold text-navy-900">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
                You marked this request as urgent
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                For urgent assistance, contact R&amp;M directly on WhatsApp or by phone. Opening
                WhatsApp prepares a message for you — you still need to press send.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <WhatsAppButton
                  message={urgentWhatsappMessage(success.service, success.name)}
                  label="Message R&M on WhatsApp"
                  location="inquiry-success-urgent"
                />
                <Button asChild variant="outline">
                  <TrackedAnchor
                    href={`tel:${contact.phonePrimaryHref}`}
                    event="phone_click"
                    payload={{ location: "inquiry-success-urgent" }}
                  >
                    <Phone aria-hidden="true" />
                    {contact.phonePrimaryDisplay}
                  </TrackedAnchor>
                </Button>
              </div>
            </div>
          ) : null}

          {!success.delivered ? (
            <p className="flex items-start gap-2 rounded-lg border border-gold-300 bg-gold-100/50 px-4 py-3 text-sm text-navy-900">
              <Info className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
              <span>
                Your request was recorded, but our email notification service is not confirmed as
                configured on this deployment. If you do not hear from us, please contact us
                directly by phone, WhatsApp or email.
              </span>
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 border-t border-line pt-5">
            <Button asChild variant="outline">
              <Link href="/services">Browse our services</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setSuccess(null);
                setForm(emptyForm);
                startedRef.current = false;
              }}
            >
              Submit another request
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || Boolean(formError);
  const isUrgent = form.urgency === "Urgent";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div
        ref={errorSummaryRef}
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
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={form.fullName}
            invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            onChange={(event) => update("fullName", event.target.value)}
          />
        </Field>

        <Field id="email" label="Email address" required error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>

        <Field
          id="phone"
          label="Phone number"
          required
          hint="Include your country code if you are outside Rwanda."
          error={errors.phone}
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+250 7XX XXX XXX"
            value={form.phone}
            invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            onChange={(event) => update("phone", event.target.value)}
          />
        </Field>

        <Field id="service" label="Service needed" required error={errors.service}>
          <Select
            id="service"
            name="service"
            value={form.service}
            invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            onChange={(event) => update("service", event.target.value)}
          >
            <option value="">Choose a service…</option>
            {serviceInquiryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <RadioCards
        name="preferredContact"
        legend="Preferred contact method"
        options={contactMethods}
        value={form.preferredContact}
        onChange={(value) => update("preferredContact", value)}
        error={errors.preferredContact}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="clientType" label="Which best describes you?" required error={errors.clientType}>
          <Select
            id="clientType"
            name="clientType"
            value={form.clientType}
            invalid={Boolean(errors.clientType)}
            aria-describedby={errors.clientType ? "clientType-error" : undefined}
            onChange={(event) => update("clientType", event.target.value)}
          >
            <option value="">Choose one…</option>
            {clientTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>

        <RadioCards
          name="inRwanda"
          legend="Are you currently in Rwanda?"
          options={inRwandaOptions}
          value={form.inRwanda}
          onChange={(value) => update("inRwanda", value)}
          error={errors.inRwanda}
          columns={2}
        />
      </div>

      <Field
        id="message"
        label="How can we help?"
        required
        hint="A few sentences is plenty. Please do not send ID documents or payment details."
        error={errors.message}
      >
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          onChange={(event) => update("message", event.target.value)}
        />
      </Field>

      <RadioCards
        name="urgency"
        legend="How urgent is this?"
        options={["Normal", "Urgent"]}
        value={form.urgency}
        onChange={(value) => update("urgency", value)}
        error={errors.urgency}
        columns={2}
      />

      {isUrgent ? (
        <div className="rounded-card border border-gold-300 bg-gold-100/60 p-5" role="status">
          <p className="flex items-start gap-2 text-sm font-semibold text-navy-900">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
            For urgent assistance, contact R&amp;M directly on WhatsApp
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            You can still submit this form — but a direct message or call usually reaches our team
            fastest. WhatsApp opens with your message prepared; you press send.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <WhatsAppButton
              message={urgentWhatsappMessage(form.service || "my request", form.fullName)}
              label="Message R&M on WhatsApp"
              location="inquiry-form-urgent"
            />
            <Button asChild variant="outline">
              <TrackedAnchor
                href={`tel:${contact.phonePrimaryHref}`}
                event="phone_click"
                payload={{ location: "inquiry-form-urgent" }}
              >
                <Phone aria-hidden="true" />
                Call {contact.phonePrimaryDisplay}
              </TrackedAnchor>
            </Button>
          </div>
        </div>
      ) : null}

      <div className="rounded-card border border-line bg-surface-soft p-5">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent) || undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 size-4.5 shrink-0 accent-brand-700"
          />
          <span>
            I agree that R&amp;M Services Group Ltd may contact me about this request using the
            details I have provided, and I have read the{" "}
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
          <p id="consent-error" role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.consent}
          </p>
        ) : null}
      </div>

      <Honeypot value={form.company} onChange={(value) => update("company", value)} />

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          Prefer to talk?{" "}
          <TrackedAnchor
            href={`tel:${contact.phonePrimaryHref}`}
            event="phone_click"
            payload={{ location: "inquiry-form-footer" }}
            className="font-medium text-brand-700 underline underline-offset-4"
          >
            {contact.phonePrimaryDisplay}
          </TrackedAnchor>{" "}
          &middot;{" "}
          <TrackedAnchor
            href={`mailto:${contact.email}`}
            event="email_click"
            payload={{ location: "inquiry-form-footer" }}
            className="inline-flex items-center gap-1 font-medium text-brand-700 underline underline-offset-4"
          >
            <Mail className="size-3.5" aria-hidden="true" />
            Email us
          </TrackedAnchor>
        </p>
        <Button type="submit" size="lg" disabled={status === "submitting"} className="sm:min-w-52">
          {status === "submitting" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" />
              Submit request
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function ServiceInquiryForm() {
  return (
    <React.Suspense
      fallback={
        <div className="grid gap-4" aria-busy="true">
          <div className="h-12 animate-pulse rounded-lg bg-surface-soft" />
          <div className="h-12 animate-pulse rounded-lg bg-surface-soft" />
          <div className="h-32 animate-pulse rounded-lg bg-surface-soft" />
        </div>
      }
    >
      <InquiryFormInner />
    </React.Suspense>
  );
}
