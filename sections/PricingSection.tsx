"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PackageCard from "@/components/PackageCard";
import { useI18n } from "@/lib/i18n";

export default function PricingSection() {
  const { t } = useI18n();

  return (
    <section id={t.pricing.id} className="bg-white py-20">
      <Container>
        <SectionHeading title={t.pricing.title} subtitle={t.pricing.subtitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.pricing.packages.map((pkg) => (
            <PackageCard key={pkg.title} {...pkg} />
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-center text-slate-700">
          <p className="text-base md:text-lg font-semibold">{t.pricing.note.phone}</p>
          <p className="mt-2 text-base md:text-lg">{t.pricing.note.line}</p>
        </div>
      </Container>
    </section>
  );
}
