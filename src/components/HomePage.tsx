"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  Globe2,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformCard from "@/components/PlatformCard";
import PackageCard from "@/components/PackageCard";
import { getCopy, type Lang } from "@/lib/i18n";

const featureIcons = [ShieldCheck, Sparkles, Award, Layers];
const serviceIcons = [Briefcase, Globe2, Star, MessageSquare];

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("th");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [debugRequestId, setDebugRequestId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    company: "",
    startedAt: null as number | null,
  });
  const isDev =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const copy = getCopy(lang);
  const eyebrowClass =
    lang === "th"
      ? "text-xs font-semibold text-blue-600"
      : "text-xs uppercase tracking-[0.3em] text-blue-600";
  const pillMutedClass =
    lang === "th"
      ? "rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500"
      : "rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500";
  const pillBlueClass =
    lang === "th"
      ? "rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700"
      : "rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700";
  const formLabelClass =
    lang === "th"
      ? "text-xs font-semibold text-slate-500"
      : "text-xs uppercase tracking-[0.2em] text-slate-500";
  const ctaPrimaryClass =
    lang === "th"
      ? "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold text-slate-900 shadow-lg"
      : "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-lg";
  const ctaSecondaryClass =
    lang === "th"
      ? "inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-xs font-semibold text-white"
      : "inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white";
  const submitClass =
    lang === "th"
      ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      : "inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage(null);
    setDebugRequestId(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale: lang }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok: boolean; error?: string; requestId?: string }
        | null;

      if (!response.ok || !data?.ok) {
        if (isDev) {
          console.error("Contact form submit failed", {
            status: response.status,
            requestId: data?.requestId ?? null,
          });
        }
        setDebugRequestId(data?.requestId ?? null);
        setErrorMessage(
          data?.error
            ? data.error
            : lang === "th"
              ? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
              : "Submission failed. Please try again."
        );
        setStatus("error");
        return;
      }

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        company: "",
        startedAt: null,
      });
      setDebugRequestId(null);
      setStatus("success");
    } catch (error) {
      if (isDev) {
        console.error("Contact form submit error", { error: String(error) });
      }
      setDebugRequestId(null);
      setErrorMessage(
        lang === "th"
          ? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
          : "Submission failed. Please try again."
      );
      setStatus("error");
    }
  };

  const handleToggleLang = () => {
    const nextLang = lang === "th" ? "en" : "th";
    setLang(nextLang);
    if (typeof document !== "undefined") {
      document.cookie = `lang=${nextLang}; path=/; max-age=31536000; samesite=lax`;
    }
  };

  return (
    <div className="min-h-screen bg-mist text-slate-900">
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        labels={copy.nav}
        cta={copy.nav.contact}
      />

      <main id="top">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white">
          <div className="absolute -left-32 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center">
            <div className="max-w-xl space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-blue-100">
                SST INNOVATION
              </p>
              <h1 className="font-[var(--font-heading)] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {copy.hero.title}
              </h1>
              <p className="text-lg text-blue-100">{copy.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className={ctaPrimaryClass}>
                  {copy.hero.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#package-list" className={ctaSecondaryClass}>
                  {copy.hero.secondaryCta}
                </a>
              </div>
              <p className="text-sm text-blue-100">{copy.hero.trust}</p>
            </div>
            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-200">
                    Premium Stack
                  </p>
                  <p className="mt-2 text-2xl font-semibold">Next.js + Supabase Ready</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-blue-100">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-semibold text-white">98%</p>
                    <p>Performance score</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-semibold text-white">24/7</p>
                    <p>Monitoring</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-semibold text-white">14d</p>
                    <p>Fast delivery</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-semibold text-white">6+</p>
                    <p>Awards</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-blue-100">
                  {lang === "th"
                    ? "พร้อมเชื่อมต่อ Supabase และ Deploy บน Vercel ได้ทันที"
                    : "Supabase-ready architecture with instant Vercel deployment"}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>{copy.nav.features}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.features.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.features.subtitle}</p>
              </div>
              <div className="text-sm text-slate-500">
                {lang === "th"
                  ? "ยกระดับเว็บไซต์ให้เป็นสินทรัพย์เชิงธุรกิจ"
                  : "Turn your website into a strategic business asset."}
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {copy.features.items.map((item, index) => {
                const Icon = featureIcons[index] ?? ShieldCheck;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="platform-intro" className="bg-mist py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>{copy.nav.platforms}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.platforms.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.platforms.subtitle}</p>
              </div>
              <div className={pillMutedClass}>
                {lang === "th" ? "สถิติจากโปรเจกต์จริง" : "Real project metrics"}
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {copy.platforms.items.map((item) => (
                <PlatformCard key={item.platform} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-white py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>{copy.nav.services}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.services.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.services.subtitle}</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
              >
                {lang === "th" ? "คุยกับผู้เชี่ยวชาญ" : "Talk to specialists"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {copy.services.items.map((item, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];
                return (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="package-list" className="bg-gradient-to-b from-white to-mist py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>{copy.nav.packages}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.packages.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.packages.subtitle}</p>
              </div>
              <div className={pillBlueClass}>
                {lang === "th" ? "ปรับแต่งตามธุรกิจ" : "Customizable"}
              </div>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {copy.packages.items.map((item) => (
                <PackageCard key={item.name} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-white py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>{copy.nav.portfolio}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.portfolio.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.portfolio.subtitle}</p>
              </div>
              <div className="text-sm text-slate-500">
                {lang === "th" ? "ผลงานจริงพร้อม NDA" : "Real projects under NDA"}
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {copy.portfolio.items.map((item, index) => (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card-soft transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="h-44 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://picsum.photos/seed/portfolio-${index + 1}/600/420)`,
                    }}
                  />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-mist py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className={eyebrowClass}>{copy.nav.contact}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.contact.title}
                </h2>
                <p className="mt-3 text-slate-600">{copy.contact.subtitle}</p>
                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className={formLabelClass} htmlFor="contact-name">
                        {copy.contact.name}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        maxLength={120}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                        value={formData.name}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            name: event.target.value,
                            startedAt: formData.startedAt ?? Date.now(),
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={formLabelClass} htmlFor="contact-phone">
                          {copy.contact.phone}
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          maxLength={50}
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                          value={formData.phone}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              phone: event.target.value,
                              startedAt: formData.startedAt ?? Date.now(),
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className={formLabelClass} htmlFor="contact-email">
                          {copy.contact.email}
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          maxLength={120}
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                          value={formData.email}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              email: event.target.value,
                              startedAt: formData.startedAt ?? Date.now(),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className={formLabelClass} htmlFor="contact-message">
                        {copy.contact.message}
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        maxLength={2000}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                        value={formData.message}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            message: event.target.value,
                            startedAt: formData.startedAt ?? Date.now(),
                          })
                        }
                      />
                    </div>
                    <input
                      type="text"
                      name="company"
                      autoComplete="off"
                      tabIndex={-1}
                      aria-hidden="true"
                      aria-label="Company"
                      className="hidden"
                      value={formData.company}
                      onChange={(event) =>
                        setFormData({ ...formData, company: event.target.value })
                      }
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={submitClass}
                    >
                      {status === "loading" ? copy.contact.sending : copy.contact.submit}
                    </button>
                    {status === "success" ? (
                      <p className="text-sm text-emerald-600">{copy.contact.success}</p>
                    ) : null}
                    {status === "error" ? (
                      <p className="text-sm text-rose-600">
                        {errorMessage ||
                          (lang === "th"
                            ? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
                            : "Submission failed. Please try again.")}
                        {isDev && debugRequestId ? ` (requestId: ${debugRequestId})` : ""}
                      </p>
                    ) : null}
                  </form>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                  <h3 className="font-[var(--font-heading)] text-xl font-semibold text-slate-900">
                    {copy.contact.detailsTitle}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {copy.contact.detailsSubtitle}
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <p>{copy.footer.company}</p>
                    <p>{copy.footer.address}</p>
                    <p>{copy.footer.phone}</p>
                    <p>{copy.footer.email}</p>
                    <p>{copy.footer.line}</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                  <h3 className="font-[var(--font-heading)] text-xl font-semibold text-slate-900">
                    {lang === "th" ? "การดูแลหลังส่งมอบ" : "Post-launch care"}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    {lang === "th"
                      ? "แพ็กเกจดูแลรายเดือน พร้อมทีมงานดูแลความปลอดภัยและอัปเดตระบบให้ต่อเนื่อง"
                      : "Monthly care plans with security monitoring and continuous updates."}
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                    <li>SLA ระดับองค์กร</li>
                    <li>รายงานวิเคราะห์รายเดือน</li>
                    <li>อัปเดตฟีเจอร์แบบยืดหยุ่น</li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-card-soft">
                  <h3 className="font-[var(--font-heading)] text-xl font-semibold">
                    {lang === "th" ? "พร้อมสำหรับ Supabase" : "Supabase-ready"}
                  </h3>
                  <p className="mt-3 text-sm text-slate-200">
                    {lang === "th"
                      ? "วางโครงสร้างเพื่อเชื่อมต่อฐานข้อมูลและระบบ Authentication ได้ทันที"
                      : "Architecture prepared for database, auth, and real-time services."}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                    <span>Vercel</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400" />
                    <span>Supabase</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400" />
                    <span>Next.js 14</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="additional" className="bg-white py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>
                  {lang === "th" ? "บริการเสริม" : "Add-ons"}
                </p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.additional.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.additional.subtitle}</p>
              </div>
              <div className={pillMutedClass}>
                {lang === "th" ? "ยืดหยุ่นตามแผน" : "Flexible add-ons"}
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {copy.additional.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card-soft"
                >
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer {...copy.footer} />
    </div>
  );
}
