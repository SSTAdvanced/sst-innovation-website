"use client";

import {
  CheckCircle,
  Code,
  Cpu,
  Globe,
  Headphones,
  Layers,
  Megaphone,
  MessageSquare,
  Package,
  Shield,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  Zap
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";
import type { ElementType } from "react";

const iconMap: Record<string, ElementType> = {
  code: Code,
  shield: Shield,
  smartphone: Smartphone,
  zap: Zap,
  "trending-up": TrendingUp,
  headphones: Headphones,
  globe: Globe,
  layers: Layers,
  "check-circle": CheckCircle,
  cpu: Cpu,
  megaphone: Megaphone,
  "shopping-bag": ShoppingBag,
  "message-square": MessageSquare,
  package: Package
};

export default function FeaturesSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading title={t.features.title} subtitle={t.features.subtitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((item) => {
            const Icon = iconMap[item.icon] ?? Code;
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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

        <div className="mt-16">
          <SectionHeading title={t.services.title} subtitle={t.services.subtitle} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((item) => {
              const Icon = iconMap[item.icon] ?? Globe;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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
        </div>
      </Container>
    </section>
  );
}
