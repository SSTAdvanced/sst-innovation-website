"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PlatformCard from "@/components/PlatformCard";
import { useI18n } from "@/lib/i18n";

export default function PlatformsSection() {
  const { t } = useI18n();

  return (
    <section id={t.platforms.id} className="bg-slate-50 py-20">
      <Container>
        <SectionHeading title={t.platforms.title} subtitle={t.platforms.subtitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {t.platforms.items.map((platform) => (
            <PlatformCard key={platform.platform} {...platform} />
          ))}
        </div>
      </Container>
    </section>
  );
}
