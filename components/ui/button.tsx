import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center gap-2 rounded-lg text-center text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-700 text-white shadow-soft hover:bg-brand-800 hover:shadow-lift active:translate-y-px",
        navy: "bg-navy-900 text-white shadow-soft hover:bg-navy-800 hover:shadow-lift active:translate-y-px",
        outline:
          "border border-navy-200 bg-white text-navy-900 hover:border-brand-600 hover:text-brand-700 hover:shadow-soft",
        ghost: "text-navy-800 hover:bg-navy-50 hover:text-brand-700",
        light:
          "bg-white text-navy-900 shadow-soft hover:bg-brand-50 hover:text-brand-800 active:translate-y-px",
        outlineLight:
          "border border-white/40 text-white hover:border-white hover:bg-white/10",
        whatsapp:
          "bg-[#0E7268] text-white shadow-soft hover:bg-[#0A6157] hover:shadow-lift active:translate-y-px",
      },
      size: {
        sm: "min-h-9 px-3.5 py-2 text-[0.8125rem]",
        md: "min-h-11 px-5 py-2.5",
        lg: "min-h-12 px-6 py-3 text-[0.9375rem]",
      },
      full: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", full: false },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, full }), className)}
        {...(asChild ? {} : { type: type ?? "button" })}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
