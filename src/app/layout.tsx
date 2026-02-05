import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import SiteShell from "@/components/SiteShell";
import StructuredData from "@/components/StructuredData";
import { getRequestedLocale, type Locale } from "@/lib/locale";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Noto+Serif+Thai:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <StructuredData locale={locale} includeGlobal />
        <Analytics />
        <SiteShell initialLang={locale}>{children}</SiteShell>
      </body>
    </html>
  );
}
