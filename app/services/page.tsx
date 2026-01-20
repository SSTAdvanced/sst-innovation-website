"use client";

import { Code, Layers, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";
import type { ElementType } from "react";

const iconMap: Record<string, ElementType> = {
  code: Code,
  layers: Layers,
  "check-circle": CheckCircle
};

export default function ServicesPage() {
  const { t } = useI18n();

  return (
    <div className="bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <section className="bg-white py-20">
          <Container>
            <SectionHeading title={t.servicesPage.title} subtitle={t.servicesPage.subtitle} align="left" />
            <p className="max-w-3xl text-sm text-slate-600">{t.servicesPage.intro}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {t.servicesPage.items.map((item) => {
                const Icon = iconMap[item.icon] ?? Code;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.tone}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
