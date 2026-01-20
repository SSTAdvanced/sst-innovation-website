import { CheckCircle } from "lucide-react";
import type { PackageItem } from "@/lib/content";

export default function PackageCard({
  title,
  price,
  original,
  discount,
  features,
  highlight
}: PackageItem) {
  return (
    <div className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {highlight ? (
        <span className="absolute -top-3 right-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          {highlight}
        </span>
      ) : null}
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-blue-600">{price}</span>
        <span className="text-sm text-slate-400 line-through">{original}</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-emerald-600">ลด {discount}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle size={18} className="text-emerald-500 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
