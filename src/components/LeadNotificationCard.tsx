"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ClipboardCopy,
  ExternalLink,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/relativeTime";

export type LeadNotificationData = {
  title: string;
  org: string;
  refId: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  source: string;
  locale: string;
  requestId: string;
  message: string;
  leadId: string;
  createdAt: string;
};

export type LeadNotificationCardProps = {
  data: LeadNotificationData;
  onOpenLead?: (leadId: string) => void;
  className?: string;
  renderLeadUrl?: (leadId: string) => string;
};

type CopyState = { text: string; at: number } | null;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function safeTel(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

async function copyToClipboard(text: string) {
  if (!text) return;
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "true");
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

function FieldRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-2 text-xs">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span
        className={cx(
          "text-slate-900 dark:text-slate-100",
          mono && "font-mono tracking-[0.12em]"
        )}
      >
        {value}
      </span>
    </div>
  );
}

export default function LeadNotificationCard({
  data,
  onOpenLead,
  className,
  renderLeadUrl,
}: LeadNotificationCardProps) {
  const [copyState, setCopyState] = useState<CopyState>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!copyState) return;
    const id = window.setTimeout(() => setCopyState(null), 1600);
    return () => window.clearTimeout(id);
  }, [copyState]);

  const createdLabel = useMemo(
    () => formatRelativeTime(data.createdAt, { now }),
    [data.createdAt, now]
  );

  const sourceLabel = useMemo(() => {
    const raw = String(data.source || "").trim();
    if (!raw) return "unknown";
    return raw.length > 20 ? `${raw.slice(0, 20)}…` : raw;
  }, [data.source]);

  const telHref = data.phone ? `tel:${safeTel(data.phone)}` : null;
  const mailHref = data.email ? `mailto:${data.email}` : null;

  const leadUrl =
    typeof renderLeadUrl === "function" ? renderLeadUrl(data.leadId) : null;

  const copyText = useMemo(() => {
    const lines: string[] = [];
    if (data.refId) lines.push(`Ref: ${data.refId}`);
    if (data.phone) lines.push(`Phone: ${data.phone}`);
    if (data.email) lines.push(`Email: ${data.email}`);
    return lines.join("\n");
  }, [data.refId, data.phone, data.email]);

  return (
    <section
      className={cx(
        "w-full max-w-[42rem] rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(2,6,23,0.10)]",
        "dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
        className
      )}
      aria-label="Lead notification"
    >
      <header className="flex items-start gap-4 border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 ring-1 ring-blue-100 dark:bg-blue-950/40 dark:ring-blue-900">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-300" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {data.title}{" "}
              <span className="text-slate-500 dark:text-slate-400">
                ({data.org})
              </span>
            </h3>

            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              {sourceLabel}
            </span>

            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {createdLabel}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              <span className="text-slate-400 dark:text-slate-500">Ref</span>
              <span className="font-mono tracking-[0.12em]">{data.refId}</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {data.locale.toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
          <div className="space-y-2">
            <p className="text-base font-semibold leading-snug text-slate-900 dark:text-slate-50">
              {data.name}
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
              {data.phone ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="font-medium">{data.phone}</span>
                </span>
              ) : null}
              {data.email ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="font-medium">{data.email}</span>
                </span>
              ) : null}
            </div>

            <p
              className={cx(
                "text-sm text-slate-600 dark:text-slate-300",
                "overflow-hidden text-ellipsis",
                "[display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
              )}
            >
              {data.message}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:w-[15rem]">
            <a
              href={telHref ?? "#"}
              onClick={(e) => {
                if (!telHref) e.preventDefault();
              }}
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition",
                "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                "disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900",
                !telHref && "pointer-events-none opacity-50"
              )}
              aria-label="Call lead"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>

            <a
              href={mailHref ?? "#"}
              onClick={(e) => {
                if (!mailHref) e.preventDefault();
              }}
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition",
                "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900",
                !mailHref && "pointer-events-none opacity-50"
              )}
              aria-label="Email lead"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>

            <button
              type="button"
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition",
                "hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                "dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
              )}
              onClick={async () => {
                await copyToClipboard(copyText);
                setCopyState({ text: "Copied", at: Date.now() });
              }}
              aria-label="Copy lead contact details"
            >
              <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
              {copyState ? "Copied" : "Copy"}
            </button>

            <button
              type="button"
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition",
                "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900"
              )}
              onClick={() => onOpenLead?.(data.leadId)}
              aria-label="Open lead"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open
            </button>
          </div>
        </div>

        <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/30">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-slate-700 outline-none dark:text-slate-200">
            <span className="inline-flex items-center gap-2">
              Details
              {leadUrl ? (
                <a
                  href={leadUrl}
                  className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-300"
                  aria-label="Open lead link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Link
                </a>
              ) : null}
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
          </summary>

          <div className="mt-3 space-y-2">
            <FieldRow label="Request ID" value={data.requestId} mono />
            <FieldRow label="Lead ID" value={data.leadId} mono />

            <pre className="mt-3 max-h-56 overflow-auto rounded-lg border border-slate-200 bg-white p-3 text-[11px] leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    </section>
  );
}

