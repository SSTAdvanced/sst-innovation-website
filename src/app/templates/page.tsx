import Link from "next/link";

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto w-full max-w-5xl space-y-6 px-6 py-16">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight">
          Website Templates
        </h1>
        <p className="text-base text-slate-600">
          Template catalog page (placeholder). Choose a template category below.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/templates/corporate" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            Corporate
          </Link>
          <Link href="/templates/ecommerce" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            Ecommerce
          </Link>
          <Link href="/templates/service" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            Service
          </Link>
          <Link href="/templates/landing" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            Landing
          </Link>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
          Back to home
        </Link>
      </div>
    </main>
  );
}

