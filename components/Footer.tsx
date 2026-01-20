"use client";

import Container from "@/components/ui/Container";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">{t.site.name}</h3>
          <p className="text-sm text-slate-400">{t.site.tagline}</p>
          <p className="text-sm text-slate-300">{t.footer.description}</p>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            {t.footer.contactTitle}
          </h4>
          <div className="space-y-2 text-sm text-slate-300">
            <p>{t.footer.contact.address}</p>
            <p>{t.footer.contact.phone}</p>
            <p>{t.footer.contact.line}</p>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            {t.footer.linksTitle}
          </h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {t.footer.quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-slate-800">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-slate-400 md:flex-row">
          <span>{t.site.copyright}</span>
          <span>{t.site.name}</span>
        </Container>
      </div>
    </footer>
  );
}
