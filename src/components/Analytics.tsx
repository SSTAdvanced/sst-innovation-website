import Script from "next/script";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export default function Analytics() {
  if (process.env.NODE_ENV !== "production" || !GA4_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
