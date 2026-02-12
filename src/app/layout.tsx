import type { Metadata } from "next";
import { Noto_Sans_Lao, Noto_Sans_Thai, Noto_Serif_Lao, Noto_Serif_Thai } from "next/font/google";
import Analytics from "@/components/Analytics";
import ImageProtection from "@/components/ImageProtection";
import SiteShell from "@/components/SiteShell";
import StructuredData from "@/components/StructuredData";
import { getRequestedLocale, type Locale } from "@/lib/locale";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-sans-thai",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-serif-thai",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansLao = Noto_Sans_Lao({
  subsets: ["latin", "lao"],
  variable: "--font-sans-lao",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSerifLao = Noto_Serif_Lao({
  subsets: ["latin", "lao"],
  variable: "--font-serif-lao",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://websst.vercel.app";

const metadataByLocale: Record<
  Locale,
  {
    title: string;
    description: string;
    ogLocale: string;
    alternateLocales: string[];
  }
> = {
  th: {
    title: "รับทำเว็บไซต์ | โปรแกรมหอพัก | จดทะเบียนบริษัท | SST INNOVATION",
    description:
      "SST INNOVATION ให้บริการรับทำเว็บไซต์ระดับมืออาชีพ พัฒนาโปรแกรมบริหารหอพักและรีสอร์ท พร้อมบริการจดทะเบียนบริษัทครบวงจร ดูแลตั้งแต่เริ่มต้นจนธุรกิจเติบโต",
    ogLocale: "th_TH",
    alternateLocales: ["en_US"],
  },
  en: {
    title: "Professional Website Development | Business Systems | SST INNOVATION",
    description:
      "SST INNOVATION provides professional website development, dormitory and resort management systems, and complete company registration services to support your business growth.",
    ogLocale: "en_US",
    alternateLocales: ["th_TH"],
  },
  lo: {
    title: "ບໍລິການພັດທະນາເວັບໄຊ | ລະບົບທຸລະກິດ | SST INNOVATION",
    description:
      "SST INNOVATION ໃຫ້ບໍລິການພັດທະນາເວັບໄຊ ແລະ ລະບົບທຸລະກິດຢ່າງມືອາຊີບ ເພື່ອຊ່ວຍໃຫ້ທຸລະກິດເຕີບໂຕ",
    ogLocale: "lo_LA",
    alternateLocales: ["th_TH", "en_US"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const meta = metadataByLocale[locale];
  const metadataBase = new URL(SITE_URL);

  return {
    metadataBase,
    title: {
      default: meta.title,
      template: "SST INNOVATION | %s",
    },
    description: meta.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: meta.ogLocale,
      alternateLocale: meta.alternateLocales,
      type: "website",
      url: "/",
      siteName: "SST INNOVATION",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestedLocale();

  return (
    <html lang={locale}>
      <body
        className={`${notoSansThai.variable} ${notoSerifThai.variable} ${notoSansLao.variable} ${notoSerifLao.variable} antialiased`}
      >
        <StructuredData locale={locale} includeGlobal />
        <Analytics />
        <ImageProtection />
        <SiteShell initialLang={locale}>{children}</SiteShell>
      </body>
    </html>
  );
}
