import type { Locale } from "@/lib/locale";

type BreadcrumbItem = {
  name: string;
  item: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type ServiceSchema = {
  name: string;
  description: string;
  serviceType: string;
  url: string;
};

type StructuredDataProps = {
  locale: Locale;
  includeGlobal?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  service?: ServiceSchema;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://websst.vercel.app";

const CONTACT = {
  email: "sstaminno@gmail.com",
  phoneLocal: "0843374982",
  phoneE164: "+66843374982",
  line: "https://line.me/R/ti/p/@974qhtym",
} as const;

const companyInfo = {
  th: {
    name: "บริษัท เอสเอสที อินโนเวชั่น จำกัด",
    alternateName: "SST INNOVATION Co., Ltd.",
    description:
      "SST INNOVATION ให้บริการรับทำเว็บไซต์ระดับมืออาชีพ พัฒนาโปรแกรมบริหารหอพักและรีสอร์ท พร้อมบริการจดทะเบียนบริษัทครบวงจร ดูแลตั้งแต่เริ่มต้นจนธุรกิจเติบโต",
  },
  en: {
    name: "SST INNOVATION Co., Ltd.",
    alternateName: "บริษัท เอสเอสที อินโนเวชั่น จำกัด",
    description:
      "SST INNOVATION provides professional website development, dormitory and resort management systems, and complete company registration services to support your business growth.",
  },
  lo: {
    name: "SST INNOVATION Co., Ltd.",
    alternateName: "ບໍລິສັດ ເອສເອສທີ ອິນໂນເວຊັນ ຈໍາກັດ",
    description:
      "SST INNOVATION ໃຫ້ບໍລິການພັດທະນາເວັບໄຊ ລະບົບຫໍພັກ ແລະ ບໍລິການຈົດທະບຽນບໍລິສັດແບບຄົບວົງຈອນ ເພື່ອຊ່ວຍໃຫ້ທຸລະກິດເຕີບໂຕ.",
  },
};

function uniqueGraphId(id: string) {
  return id.replace(/\/+$/, "");
}

export default function StructuredData({
  locale,
  includeGlobal = false,
  breadcrumbs,
  faqs,
  service,
}: StructuredDataProps) {
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const info = companyInfo[locale];
  const graph: Record<string, unknown>[] = [];

  const organizationId = `${baseUrl}/#organization`;
  const websiteId = `${baseUrl}/#website`;

  const ensureOrganization = (mode: "minimal" | "full") => {
    const exists = graph.some(
      (node) => typeof node["@id"] === "string" && node["@id"] === organizationId
    );
    if (exists) {
      return;
    }

    const baseOrg = {
      "@type": "Organization",
      "@id": organizationId,
      name: info.name,
      alternateName: info.alternateName,
      url: `${baseUrl}/`,
      description: info.description,
      email: CONTACT.email,
      telephone: CONTACT.phoneE164,
      sameAs: [CONTACT.line],
    };

    graph.push(
      mode === "full"
        ? {
            ...baseOrg,
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: CONTACT.phoneE164,
                contactType: "customer support",
                email: CONTACT.email,
                availableLanguage: ["th", "en", "lo"],
              },
            ],
          }
        : baseOrg
    );
  };

  if (includeGlobal) {
    ensureOrganization("full");
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#localbusiness`,
      name: info.name,
      alternateName: info.alternateName,
      url: `${baseUrl}/`,
      description: info.description,
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      sameAs: [CONTACT.line],
      areaServed: {
        "@type": "Country",
        name: "Thailand",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "หมู่บ้านนันทนาการ์เด้นท์ 139/32 ตำบลบ้านกลาง อำเภอเมืองปทุมธานี",
        addressLocality: "ปทุมธานี",
        addressRegion: "ปทุมธานี",
        postalCode: "12000",
        addressCountry: "TH",
      },
    });
    graph.push({
      "@type": "WebSite",
      "@id": websiteId,
      url: `${baseUrl}/`,
      name: "SST INNOVATION",
      publisher: { "@id": organizationId },
      inLanguage: locale,
    });
  }

  if (service) {
    ensureOrganization(includeGlobal ? "full" : "minimal");

    const serviceUrl = uniqueGraphId(service.url);
    graph.push({
      "@type": "Service",
      "@id": `${serviceUrl}#service`,
      name: service.name,
      description: service.description,
      serviceType: service.serviceType,
      provider: { "@id": organizationId },
      areaServed: {
        "@type": "Country",
        name: "Thailand",
      },
      url: serviceUrl,
    });
  }

  const pageUrl =
    uniqueGraphId(service?.url ?? breadcrumbs?.[breadcrumbs.length - 1]?.item ?? `${baseUrl}/`) ||
    `${baseUrl}/`;

  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faqpage`,
      url: pageUrl,
      name:
        service?.name ??
        (locale === "th" ? "คำถามที่พบบ่อย | SST INNOVATION" : "FAQ | SST INNOVATION"),
      isPartOf: { "@id": websiteId },
      inLanguage: locale,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  if (breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    });
  }

  if (service || breadcrumbs?.length || faqs?.length) {
    ensureOrganization(includeGlobal ? "full" : "minimal");

    if (includeGlobal) {
      // `WebSite` is already included above.
    } else {
      graph.push({
        "@type": "WebSite",
        "@id": websiteId,
        url: `${baseUrl}/`,
        name: "SST INNOVATION",
        publisher: { "@id": organizationId },
        inLanguage: locale,
      });
    }

    graph.push({
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: service?.name ?? info.name,
      isPartOf: { "@id": websiteId },
      about: service ? { "@id": `${uniqueGraphId(service.url)}#service` } : undefined,
      breadcrumb: breadcrumbs?.length ? { "@id": `${pageUrl}#breadcrumb` } : undefined,
      inLanguage: locale,
    });
  }

  if (!graph.length) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
