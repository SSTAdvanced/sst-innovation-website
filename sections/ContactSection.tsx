"use client";

import ContactForm from "@/components/ContactForm";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function ContactSection() {
  const { t } = useI18n();

  return (
    <section id={t.contact.id} className="bg-gradient-to-br from-blue-600 to-indigo-800 py-20 text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <SectionHeading
              title={t.contact.title}
              subtitle={t.contact.subtitle}
              tone="light"
              align="left"
            />
            <ContactForm />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/10 p-6 shadow-lg">
              <h3 className="text-lg font-semibold">{t.contact.infoTitle}</h3>
              <p className="mt-2 text-sm text-blue-100">{t.contact.infoSubtitle}</p>
              <div className="mt-4 space-y-3 text-sm text-white">
                <p>{t.contact.info.address}</p>
                <p>{t.contact.info.phone}</p>
                <p>{t.contact.info.line}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 shadow-lg">
              <p className="text-sm text-blue-100">{t.nav.cta.label}</p>
              <p className="mt-2 text-lg font-semibold">{t.site.tagline}</p>
              <Button
                href={t.contact.info.lineUrl}
                variant="secondary"
                className="mt-4 border-white/60 text-white hover:bg-white/10"
              >
                {t.contact.lineButton}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
