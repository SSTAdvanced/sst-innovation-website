"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";

export default function FaqSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading title={t.faq.title} subtitle={t.faq.subtitle} />
        <div className="mx-auto max-w-3xl space-y-4">
          {t.faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 open:bg-white open:shadow-sm"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
