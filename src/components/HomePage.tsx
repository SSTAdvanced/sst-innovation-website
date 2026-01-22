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
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformCard from "@/components/PlatformCard";
import PackageCard from "@/components/PackageCard";
import ServiceLinks from "@/components/ServiceLinks";
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

  const seoContent =
    lang === "th"
      ? {
          h1: "ยกระดับธุรกิจของคุณ ด้วยเว็บไซต์และระบบบริหารธุรกิจครบวงจร",
          sections: [
            {
              h2: "บริการรับทำเว็บไซต์ระดับมืออาชีพ",
              intro: [
                "SST INNOVATION ให้บริการ รับทำเว็บไซต์ สำหรับองค์กรและธุรกิจที่ต้องการภาพลักษณ์พรีเมียม เราเริ่มจากการวิเคราะห์แบรนด์ กลุ่มเป้าหมาย และเส้นทางลูกค้า เพื่อออกแบบโครงสร้างเว็บที่สื่อสารคุณค่าได้ชัดเจนและสร้างความน่าเชื่อถือในระยะยาว เป้าหมายของเราคือทำให้เว็บไซต์เป็นสินทรัพย์ทางธุรกิจ ไม่ใช่แค่หน้าสวย ๆ",
                "ทุกโครงการของเราเน้นมาตรฐาน UX/UI ที่เข้าใจผู้ใช้งานจริง ความเร็วโหลดสูง รองรับ SEO และการแสดงผลบนทุกอุปกรณ์ พร้อมวางระบบที่ขยายได้ในอนาคต ไม่ว่าจะเป็นเว็บไซต์บริษัท เว็บไซต์ธุรกิจขนาดกลาง ไปจนถึงเว็บไซต์องค์กรที่มีหลายภาษาและหลายสาขา เมื่อคุณต้องการทีมมืออาชีพที่ดูแลทั้งกลยุทธ์และเทคนิค การ รับทำเว็บไซต์ กับ SST INNOVATION จะช่วยให้การเริ่มต้นเป็นระบบและคุ้มค่า",
                "เรายังให้ความสำคัญกับเนื้อหาเชิงธุรกิจ ตั้งแต่โครงสร้างข้อความ การจัดลำดับข้อมูล ไปจนถึงการวาง Call-to-Action ที่เหมาะสม เพื่อให้เว็บไซต์ช่วยสร้างโอกาสทางการขายจริง ไม่ว่าจะเป็นการเก็บข้อมูลผู้สนใจ การสร้างความเชื่อมั่น หรือการนำเสนอข้อเสนอที่ชัดเจน ทีมของเราทำงานร่วมกับคุณอย่างใกล้ชิด เพื่อให้เว็บไซต์สะท้อนตัวตนของแบรนด์อย่างถูกต้อง",
              ],
              h3: [
                {
                  title: "เว็บไซต์บริษัท / เว็บไซต์ธุรกิจ",
                  body: [
                    "เราออกแบบเว็บไซต์บริษัทให้สอดคล้องกับภาพลักษณ์และจุดยืนของแบรนด์ พร้อมวางโครงสร้างเนื้อหาที่ชัดเจน ตั้งแต่หน้าแนะนำบริษัท บริการ ผลงาน ไปจนถึงช่องทางติดต่อ เพื่อให้ลูกค้าเชื่อมั่นและตัดสินใจง่ายขึ้น โครงสร้างถูกออกแบบให้รองรับการเติบโต การเพิ่มหน้าใหม่ และการขยายฟีเจอร์ในอนาคตอย่างเป็นระบบ",
                  ],
                },
                {
                  title: "ทีมงานมืออาชีพและการดูแลหลังการขาย",
                  body: [
                    "หลังส่งมอบ เรามีทีมดูแลระบบและปรับปรุงต่อเนื่อง ช่วยตรวจสอบประสิทธิภาพ ความปลอดภัย และการปรับแต่ง SEO อย่างสม่ำเสมอ เพื่อให้เว็บไซต์ของคุณทำงานได้เต็มศักยภาพ ทั้งในมุมภาพลักษณ์และผลลัพธ์เชิงธุรกิจ",
                  ],
                },
              ],
            },
            {
              h2: "โปรแกรมบริหารหอพักและรีสอร์ท",
              intro: [
                "สำหรับผู้ประกอบการที่ต้องการระบบจัดการที่แม่นยำและทันสมัย เรามี โปรแกรมบริหารหอพัก และ โปรแกรมบริหารรีสอร์ท ที่ช่วยจัดการห้องพัก สัญญา การชำระเงิน และรายงานได้ครบในระบบเดียว ลดงานเอกสารซ้ำซ้อน เพิ่มความโปร่งใส และทำให้การบริหารเป็นระบบมากขึ้น",
                "เราออกแบบระบบให้เหมาะกับการใช้งานจริง ทั้งฝ่ายต้อนรับ ฝ่ายบัญชี และผู้บริหาร โดยเน้นความปลอดภัยของข้อมูล รองรับการสำรองข้อมูล และสามารถปรับแต่งให้เข้ากับกฎระเบียบหรือรูปแบบธุรกิจของคุณได้ ระบบของเราช่วยให้เจ้าของกิจการเห็นภาพรวมได้ทันที และตัดสินใจทางธุรกิจได้เร็วขึ้น",
                "ไม่ว่าคุณจะดูแลหอพักรายเดือน รีสอร์ทแบบรายคืน หรือที่พักแบบผสม ระบบของเราถูกวางให้ยืดหยุ่น รองรับการกำหนดสิทธิ์ผู้ใช้งาน และการตรวจสอบย้อนหลังได้ครบถ้วน ช่วยลดความเสี่ยงในการทำงานและเพิ่มคุณภาพการให้บริการแก่ลูกค้า",
              ],
              h3: [
                {
                  title: "ระบบจัดการหอพักออนไลน์",
                  body: [
                    "ระบบจัดการหอพักออนไลน์ช่วยติดตามสถานะห้องพัก การต่อสัญญา การแจ้งชำระ และประวัติผู้เช่าอย่างเป็นระบบ ผู้ดูแลสามารถเข้าถึงข้อมูลที่จำเป็นได้ทันที ลดข้อผิดพลาดจากการจดบันทึกมือ พร้อมสร้างรายงานรายเดือนเพื่อวิเคราะห์รายได้และอัตราการเข้าพักได้อย่างแม่นยำ",
                  ],
                },
                {
                  title: "ระบบบริหารรีสอร์ทแบบครบวงจร",
                  body: [
                    "สำหรับรีสอร์ทและที่พักแบบหลายประเภท เราวางระบบที่รองรับการกำหนดราคาแบบยืดหยุ่น การบริหารโปรโมชั่น และการเชื่อมต่อช่องทางการจองต่าง ๆ ช่วยให้ทีมงานทำงานร่วมกันได้ง่ายขึ้น และยกระดับประสบการณ์ของลูกค้าให้ดีขึ้นอย่างต่อเนื่อง",
                  ],
                },
              ],
            },
            {
              h2: "บริการจดทะเบียนบริษัทครบวงจร",
              intro: [
                "นอกจากงานด้านดิจิทัล เรายังมีบริการ จดทะเบียนบริษัท ที่ดูแลครบตั้งแต่ขั้นตอนเริ่มต้น ให้คำปรึกษาเรื่องชื่อบริษัท วัตถุประสงค์ และเอกสารที่เกี่ยวข้อง ช่วยลดภาระของผู้ประกอบการใหม่ ทำให้การเริ่มต้นธุรกิจเป็นเรื่องง่ายและเป็นระบบ",
                "เราทำงานร่วมกับทีมที่เชี่ยวชาญเรื่องกฎหมายธุรกิจ เพื่อให้กระบวนการถูกต้องตามข้อกำหนด พร้อมให้คำแนะนำเรื่องการจัดโครงสร้างธุรกิจ การจัดการภาษี และการวางระบบเอกสารที่เหมาะสม ช่วยให้บริษัทของคุณเริ่มต้นอย่างมืออาชีพ",
                "บริการของเราครอบคลุมทั้งการเตรียมเอกสาร การยื่นคำขอ และการติดตามผลอย่างเป็นระบบ ลดเวลาที่ผู้ประกอบการต้องใช้ในการประสานงานหลายฝ่าย พร้อมให้คำแนะนำเชิงธุรกิจเพื่อให้บริษัทใหม่พร้อมดำเนินงานอย่างถูกต้องตามกฎหมาย",
              ],
              h3: [
                {
                  title: "ที่ปรึกษาด้านการจดทะเบียนบริษัท",
                  body: [
                    "เราให้คำปรึกษาเชิงลึก เพื่อให้คุณเข้าใจขั้นตอนสำคัญของการจดทะเบียนบริษัท ไม่ว่าจะเป็นการจัดตั้งผู้ถือหุ้น การกำหนดทุนจดทะเบียน หรือการเตรียมเอกสารที่จำเป็น ช่วยลดความเสี่ยงและเพิ่มความมั่นใจตั้งแต่วันแรกของการดำเนินธุรกิจ",
                  ],
                },
              ],
            },
            {
              h2: "ทำไมต้องเลือก SST INNOVATION",
              intro: [
                "SST INNOVATION คือทีมผู้เชี่ยวชาญที่ทำงานแบบครบวงจร ตั้งแต่กลยุทธ์ดิจิทัล การออกแบบ การพัฒนา ไปจนถึงการดูแลหลังส่งมอบ เราเน้นความโปร่งใส คุณภาพ และผลลัพธ์เชิงธุรกิจ ด้วยประสบการณ์จากหลากหลายอุตสาหกรรม คุณจึงมั่นใจได้ว่าทุกโครงการจะถูกวางระบบอย่างมีมาตรฐาน",
                "ไม่ว่าคุณต้องการ รับทำเว็บไซต์ ที่ยกระดับภาพลักษณ์ ต้องการ โปรแกรมบริหารหอพัก หรือ โปรแกรมบริหารรีสอร์ท ที่ลดต้นทุนการบริหาร หรือมองหาบริการ จดทะเบียนบริษัท ที่สะดวกและถูกต้อง ทีมของเราพร้อมดูแลครบทุกขั้นตอน พร้อมให้คำปรึกษาเพื่อให้ธุรกิจของคุณเติบโตอย่างยั่งยืน",
                "เราวางกระบวนการทำงานที่ชัดเจน ตั้งแต่การเก็บความต้องการ การเสนอแผนงาน การพัฒนาและทดสอบ ไปจนถึงการส่งมอบและติดตามผลหลังใช้งานจริง คุณจะได้รับทั้งความมั่นใจในคุณภาพ และความยืดหยุ่นในการปรับปรุงตามเป้าหมายที่เปลี่ยนแปลง",
              ],
              h3: [
                {
                  title: "ทีมงานมืออาชีพและการดูแลหลังการขาย",
                  body: [
                    "ทีมของเรามีทั้งนักพัฒนา นักออกแบบ และที่ปรึกษาธุรกิจ ทำให้คุณได้รับคำแนะนำที่รอบด้าน พร้อมการดูแลหลังส่งมอบที่วัดผลได้จริง ทั้งการปรับปรุงประสิทธิภาพ การอัปเดตความปลอดภัย และการพัฒนาเพิ่มเติมตามเป้าหมายธุรกิจ",
                  ],
                },
              ],
            },
          ],
        }
      : {
          h1: "Elevate your business with full-service websites and business systems",
          sections: [
            {
              h2: "Professional website development services",
              intro: [
                "SST INNOVATION delivers professional website development for brands that require premium positioning and measurable outcomes. We start with strategy, audience insights, and user journeys, then translate those into a structure that communicates value, builds trust, and converts visitors into customers. Your website becomes a business asset, not just a digital brochure.",
                "Our builds emphasize performance, SEO readiness, and consistent experience across devices. We design systems that scale as your business grows, whether you need a corporate website, a multi-service business site, or a multilingual platform. If you are looking for a partner that combines strategy and technology, SST INNOVATION provides a reliable end-to-end website development service.",
                "Content structure is part of the strategy. We help shape messaging, information hierarchy, and calls to action so that your website generates real business outcomes, from qualified inquiries to stronger brand credibility. Our team collaborates closely with you to ensure the final experience reflects your identity accurately.",
              ],
              h3: [
                {
                  title: "Corporate websites / business websites",
                  body: [
                    "We craft corporate and business websites that align with your brand identity and clarify your offerings. Clear navigation, strong messaging, and conversion-focused layouts help visitors understand your value quickly. The foundation is built to expand with new pages, features, and integrations as your organization evolves.",
                  ],
                },
                {
                  title: "Professional team and post-launch care",
                  body: [
                    "After launch, we provide ongoing care, performance monitoring, security updates, and SEO refinements. This ensures your website remains fast, secure, and effective as your business priorities change.",
                  ],
                },
              ],
            },
            {
              h2: "Dormitory and resort management systems",
              intro: [
                "For property operators, our dormitory and resort management systems simplify daily operations. Centralized management covers rooms, contracts, billing, and reporting in one place, reducing manual work and improving accuracy. The result is better visibility and faster decisions.",
                "We design these systems with real-world workflows in mind for reception, accounting, and management teams. Data security, backup readiness, and flexibility are built-in so your system adapts to your business rules and operational scale.",
                "Whether you manage monthly dormitories, nightly resorts, or mixed property types, our systems are designed to be flexible, role-based, and auditable. This reduces operational risk while improving service quality for tenants and guests.",
              ],
              h3: [
                {
                  title: "Online dormitory management",
                  body: [
                    "Track occupancy status, renewals, payment history, and tenant records from a single dashboard. Automated notifications and structured reporting reduce mistakes and help you maintain consistent service quality.",
                  ],
                },
                {
                  title: "End-to-end resort management",
                  body: [
                    "For resorts and multi-room properties, we support dynamic pricing, promotions, and operational visibility across teams. The system improves guest experience while keeping management efficient and data-driven.",
                  ],
                },
              ],
            },
            {
              h2: "Complete company registration service",
              intro: [
                "SST INNOVATION also offers end-to-end company registration service. We guide you through naming, objectives, documentation, and required steps to establish your business correctly and efficiently. This reduces friction for new founders and ensures a professional start.",
                "Our advisory team provides practical guidance on business structure, compliance, and documentation so your company begins with a solid foundation. You can focus on growth while we handle the administrative details.",
                "From preparation to submission and follow-up, we keep the process organized and transparent. You gain clarity on legal requirements and practical business considerations, ensuring your company starts with confidence.",
              ],
              h3: [
                {
                  title: "Company registration advisory",
                  body: [
                    "We help you understand shareholder structure, capital requirements, and essential documentation. Our goal is to reduce risk and ensure a smooth, compliant registration process.",
                  ],
                },
              ],
            },
            {
              h2: "Why SST INNOVATION",
              intro: [
                "We operate as a full-service partner, combining strategy, design, development, and post-launch support. Our work emphasizes transparency, quality, and measurable outcomes. With experience across industries, we build systems that are both reliable and scalable.",
                "Whether you need professional website development, a dormitory and resort management system, or a company registration service, SST INNOVATION delivers a complete solution with long-term support. We help your business grow with confidence and clarity.",
                "Our delivery process is clear and structured, from discovery and planning to development, testing, and launch. This helps you stay informed, reduce risk, and continuously improve as business goals evolve.",
              ],
              h3: [
                {
                  title: "Professional team and after-sales support",
                  body: [
                    "Our multidisciplinary team ensures you receive the right advice and execution at every stage. We continue supporting you with performance tuning, security updates, and feature enhancements aligned with your business goals.",
                  ],
                },
              ],
            },
          ],
        };

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
                {seoContent.h1}
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

        <section id="seo" className="bg-white py-20">
          <div className="mx-auto w-full max-w-5xl space-y-12 px-6">
            {seoContent.sections.map((section, sectionIndex) => {
              const detailsHref =
                sectionIndex === 0
                  ? "/services/website"
                  : sectionIndex === 1
                    ? "/services/dormitory-system"
                    : sectionIndex === 2
                      ? "/services/company-registration"
                      : null;

              return (
              <div key={section.h2} className="space-y-6">
                <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                  {section.h2}
                </h2>
                {section.intro.slice(0, 1).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-base text-slate-600">
                    {paragraph}
                  </p>
                ))}
                {section.h3.length ? (
                  <ul className="list-disc space-y-2 pl-5 text-base text-slate-600">
                    {section.h3.map((item) => (
                      <li key={item.title}>{item.title}</li>
                    ))}
                  </ul>
                ) : null}
                {detailsHref ? (
                  <Link
                    href={detailsHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
                  >
                    {lang === "th" ? "ดูรายละเอียดบริการ" : "View full service details"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
              );
            })}
          </div>
        </section>

        <section id="service-landing" className="bg-mist py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>
                  {lang === "th" ? "บริการของเรา" : "Our services"}
                </p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {lang === "th"
                    ? "เส้นทางบริการเฉพาะทางสำหรับธุรกิจของคุณ"
                    : "Specialized service paths for your business"}
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  {lang === "th"
                    ? "เลือกบริการที่ตรงกับเป้าหมายของคุณ พร้อมลิงก์ไปยังรายละเอียดแบบเต็มและช่องทางติดต่อ"
                    : "Explore each service with full details and direct contact paths."}
                </p>
              </div>
              <Link
                href="/#contact"
                className="text-sm font-semibold text-blue-700"
              >
                {lang === "th" ? "ขอใบเสนอราคา" : "Request a quote"}
              </Link>
            </div>
            <div className="mt-10">
              <ServiceLinks locale={lang} />
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

        <section id="articles" className="bg-mist py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>
                  {lang === "th" ? "บทความเชิงกลยุทธ์" : "Strategic articles"}
                </p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {lang === "th"
                    ? "ความรู้ที่ช่วยให้ธุรกิจตัดสินใจได้ดีขึ้น"
                    : "Insights to support better business decisions"}
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  {lang === "th"
                    ? "รวมบทความเชิงลึกเกี่ยวกับเว็บไซต์ ระบบบริหาร และการเริ่มต้นธุรกิจ พร้อมแนวทางที่นำไปใช้ได้จริง"
                    : "Explore practical guides on websites, management systems, and business setup."}
                </p>
              </div>
              <Link href="/articles" className="text-sm font-semibold text-blue-700">
                {lang === "th" ? "ดูบทความทั้งหมด" : "View all articles"}
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  title:
                    lang === "th"
                      ? "แนวทางเลือกผู้พัฒนาเว็บไซต์องค์กรที่เหมาะกับธุรกิจ"
                      : "Choosing the right corporate website partner",
                  excerpt:
                    lang === "th"
                      ? "สรุปเกณฑ์สำคัญในการเลือกทีมรับทำเว็บไซต์ที่ตอบโจทย์ธุรกิจและสร้างผลลัพธ์ระยะยาว"
                      : "Key criteria for selecting a website partner that delivers long-term value.",
                },
                {
                  title:
                    lang === "th"
                      ? "ระบบบริหารหอพักช่วยลดต้นทุนได้อย่างไร"
                      : "How dormitory systems reduce operational cost",
                  excerpt:
                    lang === "th"
                      ? "แนวทางวางระบบที่ลดความซ้ำซ้อน เพิ่มความแม่นยำ และทำให้การบริหารโปร่งใสขึ้น"
                      : "How structured operations improve accuracy, transparency, and efficiency.",
                },
                {
                  title:
                    lang === "th"
                      ? "เตรียมเอกสารจดทะเบียนบริษัทให้พร้อมในครั้งเดียว"
                      : "Preparing company registration documents correctly",
                  excerpt:
                    lang === "th"
                      ? "เช็กลิสต์เอกสารและขั้นตอนสำคัญก่อนเริ่มจดทะเบียนบริษัท"
                      : "A practical checklist of steps and documents before registration.",
                },
              ].map((article) => (
                <div
                  key={article.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">{article.excerpt}</p>
                  <Link
                    href="/articles"
                    className="mt-4 inline-flex text-sm text-blue-700"
                  >
                    {lang === "th" ? "อ่านต่อ" : "Read more"}
                  </Link>
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
