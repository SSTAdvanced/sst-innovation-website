"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { getSupabaseClient } from "@/lib/supabaseClient";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type SubmitState = {
  loading: boolean;
  success: string;
  error: string;
};

export default function ContactForm() {
  const { t } = useI18n();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({
    loading: false,
    success: "",
    error: ""
  });

  const hasEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    const field = id as keyof FormState;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = t.contact.form.requiredMessages.name;
    if (!form.phone.trim()) nextErrors.phone = t.contact.form.requiredMessages.phone;
    if (!form.email.trim()) nextErrors.email = t.contact.form.requiredMessages.email;

    setErrors(nextErrors);
    setSubmitState({ loading: false, success: "", error: "" });

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!hasEnv) {
      setSubmitState({ loading: false, success: "", error: t.contact.form.envMissingMessage });
      return;
    }

    setSubmitState({ loading: true, success: "", error: "" });

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("leads").insert([
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message
        }
      ]);

      if (error) {
        throw new Error(error.message);
      }

      setForm({ name: "", phone: "", email: "", message: "" });
      setSubmitState({ loading: false, success: t.contact.form.successMessage, error: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : t.contact.form.errorMessage;
      setSubmitState({ loading: false, success: "", error: message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white/95 p-6 text-gray-800 shadow-xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            {t.contact.form.labels.name}
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name ? <p className="mt-2 text-xs text-red-600">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            {t.contact.form.labels.phone}
          </label>
          <input
            type="tel"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone ? <p className="mt-2 text-xs text-red-600">{errors.phone}</p> : null}
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          {t.contact.form.labels.email}
        </label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email ? <p className="mt-2 text-xs text-red-600">{errors.email}</p> : null}
      </div>
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          {t.contact.form.labels.message}
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {submitState.success ? (
        <p className="mt-4 text-sm text-emerald-600">{submitState.success}</p>
      ) : null}
      {submitState.error ? (
        <p className="mt-4 text-sm text-rose-600">{submitState.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitState.loading}
        className="mt-6 w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState.loading ? t.contact.form.submittingLabel : t.contact.form.submitLabel}
      </button>
    </form>
  );
}
