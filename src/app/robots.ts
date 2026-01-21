import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://websst.vercel.app";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL.replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
