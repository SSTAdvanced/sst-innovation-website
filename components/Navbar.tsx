"use client";

import Container from "@/components/ui/Container";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { lang, setLang, t } = useI18n();
  const isThai = lang === "th";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <a href="#" className="text-xl font-semibold text-blue-700">
          {t.site.name}
          <span className="ml-2 text-xs font-medium text-slate-500">{t.site.tagline}</span>
        </a>
        <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-700">
          {t.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-blue-600 transition">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
            onClick={() => setLang(isThai ? "en" : "th")}
            aria-label={t.nav.lang.label}
          >
            {isThai ? t.nav.lang.en : t.nav.lang.th}
          </button>
          <a
            href={t.nav.cta.href}
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {t.nav.cta.label}
          </a>
        </div>
      </Container>
    </header>
  );
}
