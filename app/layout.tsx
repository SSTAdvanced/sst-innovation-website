import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "SST INNOVATION | Premium Digital Solutions",
  description: "Website development, dorm/resort management software, and company registration services by SST INNOVATION.",
  openGraph: {
    title: "SST INNOVATION | Premium Digital Solutions",
    description: "Website development, dorm/resort management software, and company registration services by SST INNOVATION.",
    siteName: "SST INNOVATION",
    locale: "th_TH",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
