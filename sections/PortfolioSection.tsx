"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";

export default function PortfolioSection() {
  const { t } = useI18n();

  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <SectionHeading title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.portfolio.items.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={640}
                height={360}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
