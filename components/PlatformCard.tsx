import { Globe, LayoutGrid, ShoppingBag, Sparkles, Square } from "lucide-react";
import type { ElementType } from "react";
import type { PlatformItem } from "@/lib/content";

const iconMap: Record<string, ElementType> = {
  wordpress: Globe,
  wix: Sparkles,
  squarespace: Square,
  shopify: ShoppingBag,
  weebly: LayoutGrid
};

export default function PlatformCard({
  platform,
  icon,
  color,
  years,
  users,
  websites,
  awards,
  clients,
  suitable
}: PlatformItem) {
  const Icon = iconMap[icon] ?? Globe;

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className={`${color} text-white p-3 rounded-xl shadow-sm`}>
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{platform}</h3>
      </div>
      <div className="mt-4 space-y-1 text-xs text-slate-600">
        <p><span className="font-semibold text-slate-700">อายุแพลตฟอร์ม:</span> {years}</p>
        <p><span className="font-semibold text-slate-700">ผู้ใช้:</span> {users}</p>
        <p><span className="font-semibold text-slate-700">เว็บไซต์:</span> {websites}</p>
        <p><span className="font-semibold text-slate-700">รางวัล:</span> {awards}</p>
        <p><span className="font-semibold text-slate-700">ลูกค้าชั้นนำ:</span> {clients}</p>
        <p><span className="font-semibold text-slate-700">เหมาะกับ:</span> {suitable}</p>
      </div>
    </div>
  );
}
