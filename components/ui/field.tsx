"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink shadow-[inset_0_1px_2px_rgba(11,27,51,0.04)] transition-colors placeholder:text-muted focus:border-brand-600 focus:outline-none focus-visible:outline-3 focus-visible:outline-brand-600 focus-visible:outline-offset-1 disabled:bg-surface-soft";

export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-navy-900">
        {label}
        {required ? (
          <span className="ml-1 text-brand-700" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-sm font-medium text-red-700"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(controlBase, invalid ? "border-red-500" : "border-line", className)}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      controlBase,
      "min-h-[7.5rem] resize-y",
      invalid ? "border-red-500" : "border-line",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(({ className, invalid, children, ...props }, ref) => (
  <select
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      controlBase,
      "cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2366768c%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:1.1rem] bg-[right_0.85rem_center] bg-no-repeat pr-10",
      invalid ? "border-red-500" : "border-line",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

/**
 * Accessible radio group rendered as selectable cards. Uses real radio inputs
 * so keyboard navigation and screen readers behave normally, and never relies
 * on colour alone — the selected option also gets a ring and a check mark.
 */
export function RadioCards({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  columns = 3,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: 2 | 3;
}) {
  return (
    <fieldset className="grid gap-1.5">
      <legend className="mb-1.5 text-sm font-semibold text-navy-900">
        {legend}
        <span className="ml-1 text-brand-700" aria-hidden="true">
          *
        </span>
      </legend>
      <div
        className={cn(
          "grid gap-2",
          columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        {options.map((option) => {
          const id = `${name}-${option.replace(/\s+/g, "-").toLowerCase()}`;
          const selected = value === option;
          return (
            <label
              key={option}
              htmlFor={id}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-3 text-sm font-medium transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-brand-600 has-[:focus-visible]:outline-offset-2",
                selected
                  ? "border-brand-600 bg-brand-50 text-brand-900 ring-1 ring-brand-600"
                  : "border-line bg-white text-ink-soft hover:border-brand-300",
              )}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
                className="size-4 accent-brand-700"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </fieldset>
  );
}

/** Hidden honeypot field. Visually hidden but reachable only to bots. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="company">Company (leave this field empty)</label>
      <input
        id="company"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
