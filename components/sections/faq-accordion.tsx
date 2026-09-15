"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function FAQAccordion({
  items,
  idPrefix = "faq",
  className,
}: {
  items: { question: string; answer: string }[];
  idPrefix?: string;
  className?: string;
}) {
  return (
    <Accordion type="single" collapsible className={cn("grid gap-3", className)}>
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`${idPrefix}-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
