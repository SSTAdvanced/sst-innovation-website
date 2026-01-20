"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <section className="bg-white py-20">
          <Container>
            <SectionHeading title={t.about.title} subtitle={t.about.subtitle} align="left" />
            <p className="max-w-3xl text-sm text-slate-600">{t.about.lead}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {t.about.values.map((value) => (
                <div key={value.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{value.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
