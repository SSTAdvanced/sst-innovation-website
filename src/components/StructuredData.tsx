type StructuredDataProps = {
  locale: "th" | "en";
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://websst.vercel.app";

const companyInfo = {
  th: {
    name: "บริษัท เอสเอสที อินโนเวชั่น จำกัด",
    alternateName: "SST INNOVATION Co., Ltd.",
    description:
      "โซลูชันเว็บไซต์องค์กรระดับพรีเมียมโดย SST INNOVATION พร้อมรองรับการเติบโตระยะยาว",
  },
  en: {
    name: "SST INNOVATION Co., Ltd.",
    alternateName: "บริษัท เอสเอสที อินโนเวชั่น จำกัด",
    description:
      "Premium enterprise website solutions by SST INNOVATION that elevate credibility and long-term growth.",
  },
};

export default function StructuredData({ locale }: StructuredDataProps) {
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const info = companyInfo[locale];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: info.name,
        alternateName: info.alternateName,
        url: `${baseUrl}/`,
        description: info.description,
        email: "sstaminno@gmail.com",
        telephone: "0843374982",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "0843374982",
            contactType: "customer support",
            email: "sstaminno@gmail.com",
            availableLanguage: ["th", "en"],
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#localbusiness`,
        name: info.name,
        alternateName: info.alternateName,
        url: `${baseUrl}/`,
        description: info.description,
        telephone: "0843374982",
        email: "sstaminno@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "หมู่บ้านนันทนาการ์เด้นท์ 139/32 139 32 ตำบล บ้านกลาง อำเภอเมือง ปทุมธานี 12000",
          addressCountry: "TH",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
