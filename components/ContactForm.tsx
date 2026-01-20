"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    const field = id as keyof FormState;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = "กรุณากรอกชื่อ-นามสกุล";
    if (!form.phone.trim()) nextErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    if (!form.email.trim()) nextErrors.email = "กรุณากรอกอีเมล";

    setErrors(nextErrors);
    setSubmitState({ loading: false, success: "", error: "" });

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitState({ loading: true, success: "", error: "" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message
        })
      });

      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }

      setForm({ name: "", phone: "", email: "", message: "" });
      setSubmitState({ loading: false, success: "ส่งข้อมูลสำเร็จแล้ว", error: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาด";
      setSubmitState({ loading: false, success: "", error: message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">ชื่อ-นามสกุล</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name ? <p className="text-sm text-red-600 mt-2">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 font-medium">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone ? <p className="text-sm text-red-600 mt-2">{errors.phone}</p> : null}
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 font-medium">อีเมล</label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email ? <p className="text-sm text-red-600 mt-2">{errors.email}</p> : null}
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block mb-2 font-medium">รายละเอียดที่ต้องการ</label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {submitState.success ? (
        <p className="text-sm text-green-600 mb-4">{submitState.success}</p>
      ) : null}
      {submitState.error ? (
        <p className="text-sm text-red-600 mb-4">{submitState.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitState.loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitState.loading ? "กำลังส่งข้อมูล..." : "ส่งข้อมูล"}
      </button>
    </form>
  );
}
