"use client";

import { ChevronDown, Globe, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { trackGaEvent } from "@/lib/ga";
import { logEvent } from "@/lib/eventLogger";

const navItems = [
  { href: "/#top", key: "home" },
  { href: "/#features", key: "features" },
  { href: "/#services", key: "services" },
  { href: "/#package-list", key: "packages" },
  // Keep key as "portfolio" to avoid changing the i18n schema elsewhere; label becomes "Website Templates".
  { href: "/templates", key: "portfolio" },
  { href: "/articles", key: "articles" },
  { href: "/#contact", key: "contact" },
] as const;

type NavKey = (typeof navItems)[number]["key"];

type NavbarProps = {
  lang: Lang;
  onToggleLang: () => void;
  labels: Record<NavKey, string>;
  cta: string;
};

function usePlatform() {
  const [isAppMobile, setIsAppMobile] = useState(false);

  useEffect(() => {
    const ua = typeof navigator === "undefined" ? "" : navigator.userAgent ?? "";
    const isWindows = /Windows/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    setIsAppMobile(!isWindows && (isAndroid || isIOS));
  }, []);

  return { isAppMobile };
}

export default function Navbar({ lang, onToggleLang, labels, cta }: NavbarProps) {
  const { isAppMobile } = usePlatform();

  const t =
    lang === "th"
      ? {
          servicesOverview: "ภาพรวมบริการ",
          servicesWebsite: "รับทำเว็บไซต์",
          servicesDorm: "ระบบบริหารหอพัก/รีสอร์ท",
          servicesCompany: "จดทะเบียนบริษัท",
          templatesAll: "แคตตาล็อกทั้งหมด",
          templatesCorporate: "เว็บไซต์องค์กร",
          templatesEcommerce: "ร้านค้าออนไลน์",
          templatesService: "เว็บไซต์บริการ",
          templatesLanding: "Landing Page",
          menu: "เมนู",
          close: "ปิด",
          language: "ภาษา",
        }
      : {
          servicesOverview: "Services overview",
          servicesWebsite: "Website Development",
          servicesDorm: "Dormitory/Resort System",
          servicesCompany: "Company Registration",
          templatesAll: "All templates",
          templatesCorporate: "Corporate",
          templatesEcommerce: "Ecommerce",
          templatesService: "Service",
          templatesLanding: "Landing",
          menu: "Menu",
          close: "Close",
          language: "Language",
        };

  const ctaClass =
    lang === "th"
      ? "hidden items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-slate-800 md:flex"
      : "hidden items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-md transition hover:bg-slate-800 md:flex";

  const onNavClick = (key: NavKey) => {
    if (key !== "services") {
      return;
    }
    trackGaEvent("service_click", { service: "services_menu", location: "navbar" });
    logEvent({
      eventName: "service_click",
      service: "services_menu",
      meta: { location: "navbar" },
    });
  };

  const [servicesOpen, setServicesOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const servicesMenuDesktopRef = useRef<HTMLDivElement | null>(null);
  const templatesMenuDesktopRef = useRef<HTMLDivElement | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTemplatesOpen, setMobileTemplatesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!servicesOpen && !templatesOpen && !mobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setTemplatesOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const containers = [
        servicesMenuDesktopRef.current,
        templatesMenuDesktopRef.current,
        mobileMenuRef.current,
      ].filter((node): node is HTMLDivElement => Boolean(node));
      if (!containers.length) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (containers.every((container) => !container.contains(target))) {
        setServicesOpen(false);
        setTemplatesOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [servicesOpen, templatesOpen, mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/#top" className="flex items-center gap-3">
          <Image
            src="https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/A-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL0EtcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NjkwNzcxOTEsImV4cCI6MTgwMDYxMzE5MX0.bRpT_Qr2L8Rx7S_1EUFjwsS2Eybfbfvk61w9ALjY1_I"
            alt="SST INNOVATION"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <div className="leading-tight">
            <p className="font-[var(--font-heading)] text-lg font-semibold text-slate-900">
              SST INNOVATION
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              SST INNOVATION CO., LTD.
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {navItems.map((item) => {
            if (item.key !== "services" && item.key !== "portfolio") {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => onNavClick(item.key)}
                  className="transition-colors hover:text-slate-900"
                >
                  {labels[item.key]}
                </Link>
              );
            }

            if (item.key === "portfolio") {
              return (
                <div key={item.key} ref={templatesMenuDesktopRef} className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={templatesOpen}
                    onClick={() => {
                      setTemplatesOpen((prev) => !prev);
                      setServicesOpen(false);
                    }}
                    className="inline-flex items-center gap-1 transition-colors hover:text-slate-900"
                  >
                    {labels[item.key]}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {templatesOpen ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                    >
                      <Link
                        role="menuitem"
                        href="/templates"
                        onClick={() => setTemplatesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.templatesAll}
                      </Link>
                      <Link
                        role="menuitem"
                        href="/templates/corporate"
                        onClick={() => setTemplatesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.templatesCorporate}
                      </Link>
                      <Link
                        role="menuitem"
                        href="/templates/ecommerce"
                        onClick={() => setTemplatesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.templatesEcommerce}
                      </Link>
                      <Link
                        role="menuitem"
                        href="/templates/service"
                        onClick={() => setTemplatesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.templatesService}
                      </Link>
                      <Link
                        role="menuitem"
                        href="/templates/landing"
                        onClick={() => setTemplatesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.templatesLanding}
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <div key={item.key} ref={servicesMenuDesktopRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  onClick={() => {
                    setServicesOpen((prev) => !prev);
                    setTemplatesOpen(false);
                  }}
                  className="inline-flex items-center gap-1 transition-colors hover:text-slate-900"
                >
                  {labels[item.key]}
                  <ChevronDown className="h-4 w-4" />
                </button>

                {servicesOpen ? (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                  >
                    <Link
                      role="menuitem"
                      href="/#services"
                      onClick={() => {
                        onNavClick("services");
                        setServicesOpen(false);
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {t.servicesOverview}
                    </Link>
                    <Link
                      role="menuitem"
                      href="/services/website"
                      onClick={() => {
                        onNavClick("services");
                        setServicesOpen(false);
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {t.servicesWebsite}
                    </Link>
                    <Link
                      role="menuitem"
                      href="/services/dormitory-system"
                      onClick={() => {
                        onNavClick("services");
                        setServicesOpen(false);
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {t.servicesDorm}
                    </Link>
                    <Link
                      role="menuitem"
                      href="/services/company-registration"
                      onClick={() => {
                        onNavClick("services");
                        setServicesOpen(false);
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {t.servicesCompany}
                    </Link>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div ref={mobileMenuRef} className="relative lg:hidden">
            <button
              type="button"
              aria-label={t.menu}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300"
            >
              <Menu className="h-5 w-5" />
            </button>

            {mobileMenuOpen ? (
              <div
                role="dialog"
                aria-modal="true"
                className={
                  isAppMobile
                    ? "fixed inset-0 z-50 bg-white"
                    : "absolute right-0 top-full z-50 mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg"
                }
              >
                <div
                  className={
                    isAppMobile
                      ? "flex h-14 items-center justify-between border-b border-slate-200 px-4"
                      : "flex items-center justify-between"
                  }
                >
                  <p className="text-sm font-semibold text-slate-900">{t.menu}</p>
                  <button
                    type="button"
                    aria-label={t.close}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className={isAppMobile ? "px-4 py-4" : "pt-3"}>
                  <div className="space-y-1">
                    <Link
                      href="/#top"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      {labels.home}
                    </Link>
                    <Link
                      href="/#features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      {labels.features}
                    </Link>

                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      <span>{labels.services}</span>
                      <ChevronDown className="h-5 w-5" />
                    </button>
                    {mobileServicesOpen ? (
                      <div className="space-y-1 px-3 pb-2">
                        <Link
                          href="/#services"
                          onClick={() => {
                            onNavClick("services");
                            setMobileMenuOpen(false);
                          }}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          {t.servicesOverview}
                        </Link>
                        <Link
                          href="/services/website"
                          onClick={() => {
                            onNavClick("services");
                            setMobileMenuOpen(false);
                          }}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          {t.servicesWebsite}
                        </Link>
                        <Link
                          href="/services/dormitory-system"
                          onClick={() => {
                            onNavClick("services");
                            setMobileMenuOpen(false);
                          }}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          {t.servicesDorm}
                        </Link>
                        <Link
                          href="/services/company-registration"
                          onClick={() => {
                            onNavClick("services");
                            setMobileMenuOpen(false);
                          }}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          {t.servicesCompany}
                        </Link>
                      </div>
                    ) : null}

                    <Link
                      href="/#package-list"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      {labels.packages}
                    </Link>

                    <button
                      type="button"
                      onClick={() => setMobileTemplatesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      <span>{labels.portfolio}</span>
                      <ChevronDown className="h-5 w-5" />
                    </button>
                    {mobileTemplatesOpen ? (
                      <div className="space-y-1 px-3 pb-2">
                        <Link
                          href="/templates"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          {t.templatesAll}
                        </Link>
                        <Link
                          href="/templates/corporate"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          {t.templatesCorporate}
                        </Link>
                        <Link
                          href="/templates/ecommerce"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          {t.templatesEcommerce}
                        </Link>
                        <Link
                          href="/templates/service"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          {t.templatesService}
                        </Link>
                        <Link
                          href="/templates/landing"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          {t.templatesLanding}
                        </Link>
                      </div>
                    ) : null}

                    <Link
                      href="/articles"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      {labels.articles}
                    </Link>

                    <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                      <span className="text-sm font-semibold text-slate-700">{t.language}</span>
                      <button
                        type="button"
                        onClick={onToggleLang}
                        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                      >
                        {lang === "th" ? "TH" : "EN"}
                      </button>
                    </div>

                    <Link
                      href="/#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
                    >
                      <Phone className="h-4 w-4" />
                      {labels.contact}
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
          >
            <Globe className="h-4 w-4" />
            {lang === "th" ? "TH" : "EN"}
          </button>
          <Link href="/#contact" className={ctaClass}>
            <Phone className="h-4 w-4" />
            {cta}
          </Link>
        </div>
      </div>
    </header>
  );
}

