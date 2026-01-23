"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  Globe,
  Home,
  Layers,
  Menu,
  Package,
  Phone,
  X,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";

type Labels = {
  home: string;
  features: string;
  services: string;
  packages: string;
  portfolio: string;
  articles: string;
  contact: string;
};

export function isMobileAppMode() {
  const ua = typeof navigator === "undefined" ? "" : navigator.userAgent ?? "";
  const isWindows = /Windows/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  return !isWindows && (isAndroid || isIOS);
}

export default function MobileAppNav({
  lang,
  labels,
  cta,
  onToggleLang,
}: {
  lang: Lang;
  labels: Labels;
  cta: string;
  onToggleLang: () => void;
}) {
  const t =
    lang === "th"
      ? {
          menu: "เมนู",
          close: "ปิด",
          language: "ภาษา",
          servicesOverview: "ภาพรวมบริการ",
          servicesWebsite: "รับทำเว็บไซต์",
          servicesDorm: "ระบบบริหารหอพัก/รีสอร์ท",
          servicesCompany: "จดทะเบียนบริษัท",
          templatesAll: "แคตตาล็อกทั้งหมด",
          templatesCorporate: "เว็บไซต์องค์กร",
          templatesEcommerce: "ร้านค้าออนไลน์",
          templatesService: "เว็บไซต์บริการ",
          templatesLanding: "Landing Page",
        }
      : {
          menu: "Menu",
          close: "Close",
          language: "Language",
          servicesOverview: "Services overview",
          servicesWebsite: "Website Development",
          servicesDorm: "Dormitory/Resort System",
          servicesCompany: "Company Registration",
          templatesAll: "All templates",
          templatesCorporate: "Corporate",
          templatesEcommerce: "Ecommerce",
          templatesService: "Service",
          templatesLanding: "Landing",
        };

  const tabs = useMemo(
    () => [
      { href: "/#top", label: labels.home, Icon: Home },
      { href: "/#features", label: labels.features, Icon: Layers },
      { href: "/#services", label: labels.services, Icon: Briefcase },
      { href: "/templates", label: labels.portfolio, Icon: BookOpen },
      { href: "/#contact", label: labels.contact, Icon: Phone },
    ],
    [labels]
  );

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const container = sheetRef.current;
      if (!container) {
        return;
      }
      const target = event.target;
      if (target instanceof Node && !container.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    // Prevent bottom bar covering content on app-like mobile.
    document.documentElement.style.scrollPaddingBottom = "6rem";
    const prevPadding = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "5rem";
    return () => {
      document.documentElement.style.scrollPaddingBottom = "";
      document.body.style.paddingBottom = prevPadding;
    };
  }, []);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/40 bg-white/80 backdrop-blur lg:hidden">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
          <Link href="/#top" className="font-[var(--font-heading)] text-base font-semibold text-slate-900">
            SST INNOVATION
          </Link>
          <button
            type="button"
            aria-label={t.menu}
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm lg:hidden">
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] rounded-t-3xl border border-slate-200 bg-white p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{t.menu}</p>
              <button
                type="button"
                aria-label={t.close}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-1">
              <Link
                href="/#top"
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                {labels.home}
              </Link>
              <Link
                href="/#features"
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                {labels.features}
              </Link>

              <button
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                <span>{labels.services}</span>
                <ChevronDown className="h-5 w-5" />
              </button>
              {servicesOpen ? (
                <div className="space-y-1 px-4 pb-2">
                  <Link
                    href="/#services"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {t.servicesOverview}
                  </Link>
                  <Link
                    href="/services/website"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {t.servicesWebsite}
                  </Link>
                  <Link
                    href="/services/dormitory-system"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {t.servicesDorm}
                  </Link>
                  <Link
                    href="/services/company-registration"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {t.servicesCompany}
                  </Link>
                </div>
              ) : null}

              <Link
                href="/#package-list"
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                {labels.packages}
              </Link>

              <button
                type="button"
                onClick={() => setTemplatesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                <span>{labels.portfolio}</span>
                <ChevronDown className="h-5 w-5" />
              </button>
              {templatesOpen ? (
                <div className="space-y-1 px-4 pb-2">
                  <Link
                    href="/templates"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {t.templatesAll}
                  </Link>
                  <Link
                    href="/templates/corporate"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {t.templatesCorporate}
                  </Link>
                  <Link
                    href="/templates/ecommerce"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {t.templatesEcommerce}
                  </Link>
                  <Link
                    href="/templates/service"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {t.templatesService}
                  </Link>
                  <Link
                    href="/templates/landing"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {t.templatesLanding}
                  </Link>
                </div>
              ) : null}

              <Link
                href="/articles"
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                {labels.articles}
              </Link>

              <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <span className="text-sm font-semibold text-slate-700">{t.language}</span>
                <button
                  type="button"
                  onClick={onToggleLang}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                >
                  <Globe className="h-4 w-4" />
                  {lang === "th" ? "TH" : "EN"}
                </button>
              </div>

              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
              >
                <Phone className="h-4 w-4" />
                {cta}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-200 bg-white lg:hidden">
        <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-5 px-2">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <tab.Icon className="h-5 w-5" />
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

