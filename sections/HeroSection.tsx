"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-800 text-white">
      <div className="absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl" />
      </div>
      <Container className="relative py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-100">{t.hero.kicker}</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">
            {t.hero.title}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-blue-100">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={t.hero.primaryCta.href} variant="primary" className="bg-white text-blue-700 hover:bg-blue-50">
              {t.hero.primaryCta.label}
            </Button>
            <Button href={t.hero.secondaryCta.href} variant="secondary" className="border-white/60 text-white hover:bg-white/10">
              {t.hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
