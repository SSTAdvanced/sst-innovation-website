"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { estimatorConfig, type EstimatorService } from "@/lib/estimateConfig";
import { trackGaEvent } from "@/lib/ga";
import { logEvent } from "@/lib/eventLogger";

type EstimateResult = {
  estimateId: string | null;
  priceMin: number;
  priceMax: number;
};

const serviceLabels: Record<EstimatorService, string> = {
  website: "Website development",
  dormitory: "Dormitory system",
  analytics: "Business analytics",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);

export default function EstimateClient({
  initialService,
  locale,
}: {
  initialService: EstimatorService;
  locale: "th" | "en";
}) {
  const router = useRouter();
  const [service, setService] = useState<EstimatorService>(initialService);
  const [estimateStatus, setEstimateStatus] = useState<"idle" | "loading" | "error">(
    "idle"
  );
  const [estimateError, setEstimateError] = useState<string | null>(null);
  const [estimateResult, setEstimateResult] = useState<EstimateResult | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [websiteInputs, setWebsiteInputs] = useState<{ pages: number; features: string[] }>({
    pages: estimatorConfig.website.minPages,
    features: [] as string[],
  });
  const [dormitoryInputs, setDormitoryInputs] = useState<{ rooms: number; modules: string[] }>({
    rooms: 40,
    modules: [] as string[],
  });
  const [analyticsInputs, setAnalyticsInputs] = useState<{
    channels: number;
    reporting: keyof typeof estimatorConfig.analytics.reportingFrequency;
    dashboard: keyof typeof estimatorConfig.analytics.dashboards;
  }>({
    channels: 3,
    reporting: "monthly",
    dashboard: "basic",
  });

  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadStartedAt, setLeadStartedAt] = useState<number | null>(null);
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    company: "",
  });

  const inputPayload = useMemo(() => {
    if (service === "website") {
      return { ...websiteInputs };
    }
    if (service === "dormitory") {
      return { ...dormitoryInputs };
    }
    return { ...analyticsInputs };
  }, [service, websiteInputs, dormitoryInputs, analyticsInputs]);

  const fireEstimateStart = () => {
    if (hasStarted) {
      return;
    }
    setHasStarted(true);
    trackGaEvent("estimate_start", { service });
    logEvent({ eventName: "estimate_start", service });
  };

  const onServiceChange = (value: EstimatorService) => {
    setService(value);
    setEstimateResult(null);
    setEstimateError(null);
    setHasStarted(false);
    router.replace(`/estimate?service=${value}`);
  };

  const submitEstimate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEstimateStatus("loading");
    setEstimateError(null);
    trackGaEvent("estimate_submit", { service });

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          inputs: inputPayload,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Estimate failed");
      }
      setEstimateResult({
        estimateId: data?.estimateId ?? null,
        priceMin: data?.priceMin ?? 0,
        priceMax: data?.priceMax ?? 0,
      });
      setEstimateStatus("idle");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Estimate failed";
      setEstimateError(message);
      setEstimateStatus("error");
    }
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!estimateResult) {
      return;
    }
    setLeadStatus("loading");
    setLeadError(null);

    try {
      const response = await fetch("/api/estimate/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          locale,
          service,
          estimateId: estimateResult.estimateId,
          priceMin: estimateResult.priceMin,
          priceMax: estimateResult.priceMax,
          startedAt: leadStartedAt,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Lead submission failed");
      }
      setLeadStatus("success");
      trackGaEvent("lead_submit", { service });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Lead submission failed";
      setLeadError(message);
      setLeadStatus("error");
    }
  };

  const heading = locale === "th" ? "Service Estimator" : "Service Estimator";
  const subheading =
    locale === "th"
      ? "คำนวณช่วงราคาเบื้องต้นแบบ rule-based โดยไม่ใช้ AI"
      : "Calculate a rule-based range without AI.";
  const primaryButton = locale === "th" ? "คำนวณราคา" : "Calculate estimate";
  const leadButton = locale === "th" ? "ส่งข้อมูลติดต่อ" : "Send contact info";
  const resultLabel = locale === "th" ? "ช่วงราคาโดยประมาณ" : "Estimated range";

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-8">
        <div>
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {heading}
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-600">{subheading}</p>
        </div>

        <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft" onSubmit={submitEstimate}>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500" htmlFor="service">
              {locale === "th" ? "เลือกบริการ" : "Select service"}
            </label>
            <select
              id="service"
              value={service}
              onChange={(event) => onServiceChange(event.target.value as EstimatorService)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              {Object.entries(serviceLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {service === "website" ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="pages">
                  {locale === "th" ? "จำนวนหน้า" : "Number of pages"}
                </label>
                <input
                  id="pages"
                  type="number"
                  min={estimatorConfig.website.minPages}
                  max={estimatorConfig.website.maxPages}
                  value={websiteInputs.pages}
                  onChange={(event) => {
                    fireEstimateStart();
                    setWebsiteInputs({
                      ...websiteInputs,
                      pages: Number(event.target.value || estimatorConfig.website.minPages),
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                />
                <p className="mt-2 text-xs text-slate-500">
                  {locale === "th"
                    ? "ขั้นต่ำตามแพ็กเกจเริ่มต้น"
                    : "Minimum is based on the starter package."}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {locale === "th" ? "ฟีเจอร์เสริม" : "Feature add-ons"}
                </p>
                <div className="mt-3 grid gap-3">
                  {Object.entries(estimatorConfig.website.features).map(([key, item]) => (
                    <label key={key} className="flex items-start gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={websiteInputs.features.includes(key)}
                        onChange={(event) => {
                          fireEstimateStart();
                          setWebsiteInputs((prev) => ({
                            ...prev,
                            features: event.target.checked
                              ? [...prev.features, key]
                              : prev.features.filter((feature) => feature !== key),
                          }));
                        }}
                        className="mt-1"
                      />
                      <span>
                        {item.label} (+{formatCurrency(item.price)})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {service === "dormitory" ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="rooms">
                  {locale === "th" ? "จำนวนห้อง" : "Number of rooms"}
                </label>
                <input
                  id="rooms"
                  type="number"
                  min={1}
                  max={1000}
                  value={dormitoryInputs.rooms}
                  onChange={(event) => {
                    fireEstimateStart();
                    setDormitoryInputs({
                      ...dormitoryInputs,
                      rooms: Number(event.target.value || 1),
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {locale === "th" ? "โมดูลเสริม" : "Module add-ons"}
                </p>
                <div className="mt-3 grid gap-3">
                  {Object.entries(estimatorConfig.dormitory.modules).map(([key, item]) => (
                    <label key={key} className="flex items-start gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={dormitoryInputs.modules.includes(key)}
                        onChange={(event) => {
                          fireEstimateStart();
                          setDormitoryInputs((prev) => ({
                            ...prev,
                            modules: event.target.checked
                              ? [...prev.modules, key]
                              : prev.modules.filter((module) => module !== key),
                          }));
                        }}
                        className="mt-1"
                      />
                      <span>
                        {item.label} (+{formatCurrency(item.price)})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {service === "analytics" ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="channels">
                  {locale === "th" ? "จำนวนช่องทางข้อมูล" : "Data channels"}
                </label>
                <input
                  id="channels"
                  type="number"
                  min={estimatorConfig.analytics.minChannels}
                  max={estimatorConfig.analytics.maxChannels}
                  value={analyticsInputs.channels}
                  onChange={(event) => {
                    fireEstimateStart();
                    setAnalyticsInputs({
                      ...analyticsInputs,
                      channels: Number(event.target.value || estimatorConfig.analytics.minChannels),
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="reporting">
                  {locale === "th" ? "รอบการรายงาน" : "Reporting frequency"}
                </label>
                <select
                  id="reporting"
                  value={analyticsInputs.reporting}
                  onChange={(event) => {
                    fireEstimateStart();
                    setAnalyticsInputs({
                      ...analyticsInputs,
                      reporting: event.target.value,
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  {Object.entries(estimatorConfig.analytics.reportingFrequency).map(
                    ([key, item]) => (
                      <option key={key} value={key}>
                        {item.label}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="dashboard">
                  {locale === "th" ? "แดชบอร์ด" : "Dashboard"}
                </label>
                <select
                  id="dashboard"
                  value={analyticsInputs.dashboard}
                  onChange={(event) => {
                    fireEstimateStart();
                    setAnalyticsInputs({
                      ...analyticsInputs,
                      dashboard: event.target.value,
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  {Object.entries(estimatorConfig.analytics.dashboards).map(
                    ([key, item]) => (
                      <option key={key} value={key}>
                        {item.label}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={estimateStatus === "loading"}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {estimateStatus === "loading"
              ? locale === "th"
                ? "กำลังคำนวณ..."
                : "Calculating..."
              : primaryButton}
          </button>
          {estimateError ? <p className="text-sm text-rose-600">{estimateError}</p> : null}
        </form>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {serviceLabels[service]}
          </p>
          <h2 className="mt-3 font-[var(--font-heading)] text-2xl font-semibold text-slate-900">
            {resultLabel}
          </h2>
          {estimateResult ? (
            <div className="mt-4">
              <p className="text-3xl font-semibold text-slate-900">
                {formatCurrency(estimateResult.priceMin)} -{" "}
                {formatCurrency(estimateResult.priceMax)}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {locale === "th"
                  ? "ราคานี้เป็นช่วงเบื้องต้น ขึ้นกับรายละเอียดโครงการ"
                  : "This is a preliminary range based on your inputs."}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              {locale === "th"
                ? "กรอกข้อมูลด้านซ้ายเพื่อดูช่วงราคา"
                : "Fill in the form to see your range."}
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
          <h3 className="font-[var(--font-heading)] text-xl font-semibold text-slate-900">
            {locale === "th" ? "ส่งข้อมูลเพื่อรับใบเสนอราคา" : "Share your details"}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {locale === "th"
              ? "ทีมงานจะติดต่อกลับเพื่อปรับช่วงราคาให้แม่นยำขึ้น"
              : "We will refine the range and send you a tailored quote."}
          </p>
          <form className="mt-5 space-y-4" onSubmit={submitLead}>
            <div>
              <label className="text-xs font-semibold text-slate-500" htmlFor="lead-name">
                {locale === "th" ? "ชื่อผู้ติดต่อ" : "Full name"}
              </label>
              <input
                id="lead-name"
                type="text"
                required
                maxLength={120}
                value={leadForm.name}
                onChange={(event) => {
                  setLeadStartedAt((prev) => prev ?? Date.now());
                  setLeadForm({ ...leadForm, name: event.target.value });
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  className="text-xs font-semibold text-slate-500"
                  htmlFor="lead-phone"
                >
                  {locale === "th" ? "เบอร์โทร" : "Phone"}
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  maxLength={50}
                  value={leadForm.phone}
                  onChange={(event) => {
                    setLeadStartedAt((prev) => prev ?? Date.now());
                    setLeadForm({ ...leadForm, phone: event.target.value });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold text-slate-500"
                  htmlFor="lead-email"
                >
                  {locale === "th" ? "อีเมล" : "Email"}
                </label>
                <input
                  id="lead-email"
                  type="email"
                  maxLength={120}
                  value={leadForm.email}
                  onChange={(event) => {
                    setLeadStartedAt((prev) => prev ?? Date.now());
                    setLeadForm({ ...leadForm, email: event.target.value });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                />
              </div>
            </div>
            <div>
              <label
                className="text-xs font-semibold text-slate-500"
                htmlFor="lead-message"
              >
                {locale === "th" ? "รายละเอียดเพิ่มเติม" : "Project notes"}
              </label>
              <textarea
                id="lead-message"
                rows={4}
                required
                maxLength={2000}
                value={leadForm.message}
                onChange={(event) => {
                  setLeadStartedAt((prev) => prev ?? Date.now());
                  setLeadForm({ ...leadForm, message: event.target.value });
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              />
            </div>
            <input
              type="text"
              name="company"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="hidden"
              value={leadForm.company}
              onChange={(event) => setLeadForm({ ...leadForm, company: event.target.value })}
            />
            <button
              type="submit"
              disabled={!estimateResult || leadStatus === "loading"}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {leadStatus === "loading"
                ? locale === "th"
                  ? "กำลังส่ง..."
                  : "Sending..."
                : leadButton}
            </button>
            {leadStatus === "success" ? (
              <p className="text-sm text-emerald-600">
                {locale === "th"
                  ? "ส่งข้อมูลเรียบร้อย ทีมงานจะติดต่อกลับ"
                  : "Thanks! We will contact you soon."}
              </p>
            ) : null}
            {leadStatus === "error" ? (
              <p className="text-sm text-rose-600">{leadError}</p>
            ) : null}
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-mist p-6 text-sm text-slate-600">
          <p>
            {locale === "th"
              ? "ช่วงราคาเป็นเพียงการประเมินเบื้องต้น ทีมงานจะยืนยันอีกครั้งก่อนเริ่มงานจริง"
              : "Final pricing is confirmed after a short discovery call."}
          </p>
        </div>
      </div>
    </div>
  );
}
