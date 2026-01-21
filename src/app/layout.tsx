import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { cookies, headers } from "next/headers";
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const bodyFont = Noto_Sans_Thai({
  variable: "--font-body",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const headingFont = Noto_Serif_Thai({
  variable: "--font-heading",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

type Locale = "th" | "en";

const DEFAULT_LOCALE: Locale = "th";
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
    title: "SST INNOVATION | WebCraft Pro",
    description:
      "โซลูชันเว็บไซต์องค์กรระดับพรีเมียมโดย SST INNOVATION พร้อมรองรับการเติบโตระยะยาว",
    ogLocale: "th_TH",
    alternateLocales: ["en_US"],
  },
  en: {
    title: "SST INNOVATION | WebCraft Pro",
    description:
      "Premium enterprise website solutions by SST INNOVATION that elevate credibility and long-term growth.",
    ogLocale: "en_US",
    alternateLocales: ["th_TH"],
  },
};

function getLocaleFromCookie(value?: string): Locale | null {
  if (!value) return null;
  const normalized = value.toLowerCase();
  return normalized === "th" || normalized === "en" ? normalized : null;
}

function getLocaleFromHeader(value: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  return value.toLowerCase().startsWith("en") ? "en" : "th";
}

async function getRequestedLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const fromCookie = getLocaleFromCookie(cookieLang);
  if (fromCookie) return fromCookie;
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  return getLocaleFromHeader(acceptLanguage);
}

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
      <body className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
        <StructuredData locale={locale} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
