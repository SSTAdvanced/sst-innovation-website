export type Language = "th" | "en";

export type FeatureItem = {
  title: string;
  description: string;
  icon: string;
  tone: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  icon: string;
  tone: string;
};

export type PlatformItem = {
  platform: string;
  icon: string;
  color: string;
  years: string;
  users: string;
  websites: string;
  awards: string;
  clients: string;
  suitable: string;
};

export type PackageItem = {
  title: string;
  price: string;
  original: string;
  discount: string;
  features: string[];
  highlight?: string;
};

export type PortfolioItem = {
  title: string;
  description: string;
  imageUrl: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactInfo = {
  address: string;
  phone: string;
  line: string;
  lineUrl: string;
};

export type SiteContent = {
  site: {
    name: string;
    tagline: string;
    copyright: string;
  };
  nav: {
    links: { label: string; href: string }[];
    cta: { label: string; href: string };
    lang: { label: string; th: string; en: string };
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  features: {
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  servicesPage: {
    title: string;
    subtitle: string;
    intro: string;
    items: ServiceItem[];
  };
  about: {
    title: string;
    subtitle: string;
    lead: string;
    values: { title: string; description: string }[];
  };
  platforms: {
    id: string;
    title: string;
    subtitle: string;
    items: PlatformItem[];
  };
  pricing: {
    id: string;
    title: string;
    subtitle: string;
    packages: PackageItem[];
    note: { phone: string; line: string };
  };
  portfolio: {
    title: string;
    subtitle: string;
    items: PortfolioItem[];
  };
  contact: {
    id: string;
    title: string;
    subtitle: string;
    form: {
      labels: {
        name: string;
        phone: string;
        email: string;
        message: string;
      };
      requiredMessages: {
        name: string;
        phone: string;
        email: string;
      };
      submitLabel: string;
      submittingLabel: string;
      successMessage: string;
      errorMessage: string;
      envMissingMessage: string;
    };
    infoTitle: string;
    infoSubtitle: string;
    info: ContactInfo;
    lineButton: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  footer: {
    description: string;
    linksTitle: string;
    contactTitle: string;
    contact: ContactInfo;
    quickLinks: { label: string; href: string }[];
  };
};

const platforms: PlatformItem[] = [
  {
    platform: "WordPress",
    icon: "wordpress",
    color: "bg-blue-600",
    years: "20 ปี",
    users: "533 ล้าน",
    websites: "38 ล้าน",
    awards: "8 รางวัล",
    clients: "Microsoft, Sony, The New York Times",
    suitable: "องค์กร, ร้านค้าออนไลน์, สถาบันการศึกษา"
  },
  {
    platform: "Wix",
    icon: "wix",
    color: "bg-teal-500",
    years: "19 ปี",
    users: "263 ล้าน",
    websites: "8.1 ล้าน",
    awards: "5 รางวัล",
    clients: "Nike, Coca-Cola, Starbucks",
    suitable: "ร้านค้าออนไลน์, บล็อกเกอร์, ธุรกิจขนาดเล็ก"
  },
  {
    platform: "Squarespace",
    icon: "squarespace",
    color: "bg-black",
    years: "21 ปี",
    users: "10 ล้าน",
    websites: "4.9 ล้าน",
    awards: "6 รางวัล",
    clients: "HBO, National Geographic, NASA",
    suitable: "แบรนด์พรีเมียม, นักออกแบบ, คอร์สออนไลน์"
  },
  {
    platform: "Shopify",
    icon: "shopify",
    color: "bg-green-600",
    years: "19 ปี",
    users: "5.6 ล้าน",
    websites: "2.5 ล้าน",
    awards: "4 รางวัล",
    clients: "Tesla, Gymshark, Kylie Cosmetics",
    suitable: "ร้านค้าออนไลน์, Drop Shipping, Startup"
  },
  {
    platform: "Weebly",
    icon: "weebly",
    color: "bg-blue-400",
    years: "19 ปี",
    users: "40 ล้าน",
    websites: "807,688",
    awards: "5 รางวัล",
    clients: "Duke Photography, Backwoods Soap",
    suitable: "ธุรกิจขนาดเล็ก, ฟรีแลนซ์"
  }
];

const packages: PackageItem[] = [
  {
    title: "One Page",
    price: "35,990",
    original: "39,990",
    discount: "10%",
    features: [
      "แนะนำและช่วยวางแนวทางแต่ละเซคชั่น",
      "พื้นที่ใช้งาน 50 GB",
      "ออกแบบภาพประกอบ 10 ภาพ",
      "ออกแบบเว็บไซต์ไม่เกิน 8 เซคชั่น",
      "ตั้งค่าพื้นฐาน SEO",
      "รองรับทุก Device",
      "สอนการใช้งาน"
    ]
  },
  {
    title: "Business Website",
    price: "59,990",
    original: "75,990",
    discount: "21%",
    highlight: "BEST VALUE",
    features: [
      "แนะนำและช่วยวาง Sitemap",
      "Themes ลิขสิทธิ์ 1 ปี",
      "พื้นที่ใช้งาน 50 GB",
      "ออกแบบภาพประกอบ 20 ภาพ",
      "ออกแบบหน้าเว็บไซต์ 7 เมนู",
      "ลงข้อมูลสูงสุด 50 รายการ",
      "ออกแบบโลโก้ 1 โลโก้"
    ]
  },
  {
    title: "Business Website Plus+",
    price: "79,990",
    original: "109,990",
    discount: "27%",
    highlight: "MOST POPULAR",
    features: [
      "แนะนำและช่วยวาง Sitemap",
      "Themes ลิขสิทธิ์ 1 ปี",
      "พื้นที่ใช้งานไม่จำกัด",
      "ออกแบบภาพประกอบ 30 ภาพ",
      "ออกแบบหน้าเว็บไซต์ 10 เมนู",
      "ลงข้อมูลสูงสุด 100 รายการ",
      "ออกแบบโลโก้พร้อมแก้ไข 2 ครั้ง"
    ]
  }
];

const portfolio: PortfolioItem[] = [
  {
    title: "เว็บไซต์ร้านค้าออนไลน์",
    description: "ออกแบบด้วยแพลตฟอร์ม Shopify",
    imageUrl: "http://static.photos/technology/640x360/1"
  },
  {
    title: "เว็บไซต์บริษัท",
    description: "ออกแบบด้วยแพลตฟอร์ม WordPress",
    imageUrl: "http://static.photos/office/640x360/2"
  },
  {
    title: "เว็บไซต์สถาบันการศึกษา",
    description: "ออกแบบด้วยแพลตฟอร์ม Squarespace",
    imageUrl: "http://static.photos/education/640x360/3"
  }
];

const companyContact: ContactInfo = {
  address: "หมู่บ้านนันทนาการ์เด้นท์ 139/32 139 32 ตำบล บ้านกลาง อำเภอเมือง ปทุมธานี 12000",
  phone: "0843374982",
  line: "@974qhtym",
  lineUrl: "https://lin.ee/Wj4GujQ"
};

const serviceItemsTh: ServiceItem[] = [
  {
    title: "รับสร้างเว็บไซต์",
    description: "ออกแบบและพัฒนาเว็บไซต์องค์กร/ธุรกิจ พร้อมระบบหลังบ้าน",
    icon: "code",
    tone: "bg-blue-100 text-blue-600"
  },
  {
    title: "โปรแกรมบริหารหอพัก/รีสอร์ท",
    description: "ระบบจัดการห้องพัก รายรับ-รายจ่าย และการจองแบบครบวงจร",
    icon: "layers",
    tone: "bg-purple-100 text-purple-600"
  },
  {
    title: "บริการจดทะเบียนบริษัท",
    description: "ดูแลเอกสารและขั้นตอนการจดทะเบียนอย่างถูกต้องตามกฎหมาย",
    icon: "check-circle",
    tone: "bg-emerald-100 text-emerald-600"
  }
];

const serviceItemsEn: ServiceItem[] = [
  {
    title: "Website Development",
    description: "Corporate and business websites with tailored back-office systems.",
    icon: "code",
    tone: "bg-blue-100 text-blue-600"
  },
  {
    title: "Dorm/Resort Management",
    description: "End-to-end room management, bookings, and financial reporting.",
    icon: "layers",
    tone: "bg-purple-100 text-purple-600"
  },
  {
    title: "Company Registration",
    description: "Legally compliant registration and documentation handling.",
    icon: "check-circle",
    tone: "bg-emerald-100 text-emerald-600"
  }
];

export const content: Record<Language, SiteContent> = {
  th: {
    site: {
      name: "SST INNOVATION",
      tagline: "บริษัท เอสเอสที อินโนเวชั่น จำกัด",
      copyright: "(c) 2024 SST INNOVATION CO., LTD. All rights reserved."
    },
    nav: {
      links: [
        { label: "แพลตฟอร์ม", href: "#platform-intro" },
        { label: "แพ็คเกจ", href: "#package-list" },
        { label: "ติดต่อเรา", href: "#contact" },
        { label: "บริการของเรา", href: "/services" }
      ],
      cta: { label: "ขอใบเสนอราคา", href: "#contact" },
      lang: { label: "ภาษา", th: "ไทย", en: "English" }
    },
    hero: {
      kicker: "SST INNOVATION",
      title: "โซลูชันดิจิทัลระดับพรีเมียมสำหรับธุรกิจที่เติบโต",
      subtitle: "รับสร้างเว็บไซต์ ระบบบริหารหอพัก/รีสอร์ท และบริการจดทะเบียนบริษัท ด้วยมาตรฐานระดับองค์กร",
      primaryCta: { label: "ดูแพ็คเกจ", href: "#package-list" },
      secondaryCta: { label: "ปรึกษาฟรี", href: "#contact" }
    },
    features: {
      title: "ทำไมต้องเลือก SST INNOVATION",
      subtitle: "คุณภาพระดับมืออาชีพ พร้อมดูแลตั้งแต่การวางกลยุทธ์จนถึงการส่งมอบงาน",
      items: [
        {
          title: "เว็บเสถียรและปลอดภัย",
          description: "มาตรฐานระดับโลก ระบบป้องกันข้อมูลและความปลอดภัยสูงสุด",
          icon: "shield",
          tone: "bg-emerald-100 text-emerald-600"
        },
        {
          title: "Responsive ทุกหน้าจอ",
          description: "ออกแบบให้รองรับมือถือ แท็บเล็ต และเดสก์ท็อปอย่างสมบูรณ์",
          icon: "smartphone",
          tone: "bg-purple-100 text-purple-600"
        },
        {
          title: "SEO มืออาชีพ",
          description: "AI SEO Assistant วิเคราะห์คีย์เวิร์ดเพื่อเพิ่มการมองเห็น",
          icon: "trending-up",
          tone: "bg-rose-100 text-rose-600"
        },
        {
          title: "สนับสนุน 24/7",
          description: "ทีมงานพร้อมดูแลและให้คำปรึกษาอย่างต่อเนื่อง",
          icon: "headphones",
          tone: "bg-indigo-100 text-indigo-600"
        }
      ]
    },
    services: {
      title: "บริการหลักของเรา",
      subtitle: "ยกระดับองค์กรด้วยบริการที่ครบถ้วนและได้มาตรฐาน",
      items: serviceItemsTh
    },
    servicesPage: {
      title: "บริการของเรา",
      subtitle: "โซลูชันดิจิทัลสำหรับธุรกิจและองค์กร",
      intro: "SST INNOVATION ให้บริการครบวงจร ตั้งแต่การวางกลยุทธ์ ออกแบบ ไปจนถึงการดูแลระยะยาว",
      items: serviceItemsTh
    },
    about: {
      title: "เกี่ยวกับ SST INNOVATION",
      subtitle: "พันธมิตรด้านดิจิทัลที่เน้นความน่าเชื่อถือและผลลัพธ์",
      lead: "เราเชื่อว่าการเติบโตที่ยั่งยืนต้องมาจากรากฐานที่มั่นคง ทั้งเทคโนโลยี กระบวนการ และทีมงานผู้เชี่ยวชาญ",
      values: [
        {
          title: "มาตรฐานองค์กร",
          description: "ทุกโครงการยึดมาตรฐานคุณภาพและความปลอดภัยระดับสากล"
        },
        {
          title: "ความโปร่งใส",
          description: "สื่อสารชัดเจนและรายงานความคืบหน้าอย่างต่อเนื่อง"
        },
        {
          title: "การดูแลระยะยาว",
          description: "พร้อมสนับสนุนหลังส่งมอบงาน เพื่อให้ธุรกิจเดินหน้าได้อย่างมั่นใจ"
        }
      ]
    },
    platforms: {
      id: "platform-intro",
      title: "แพลตฟอร์มระดับโลกที่เราร่วมงาน",
      subtitle: "เลือกเทคโนโลยีที่เหมาะกับธุรกิจของคุณ",
      items: platforms
    },
    pricing: {
      id: "package-list",
      title: "แพ็คเกจเริ่มต้น",
      subtitle: "เลือกแพ็คเกจที่เหมาะกับขนาดธุรกิจของคุณ",
      packages,
      note: {
        phone: "โทรหาเราขอทราบรายละเอียดเพิ่มเติมได้ที่ 0843374982",
        line: "หรือแอดไลน์ @974qhtym"
      }
    },
    portfolio: {
      title: "ผลงานและตัวอย่างโครงการ",
      subtitle: "ตัวอย่างเว็บไซต์และระบบที่ลูกค้าไว้วางใจ",
      items: portfolio
    },
    contact: {
      id: "contact",
      title: "ติดต่อเราเพื่อขอคำปรึกษา",
      subtitle: "ทีมงานพร้อมให้คำแนะนำและนำเสนอแนวทางที่เหมาะกับคุณ",
      form: {
        labels: {
          name: "ชื่อ-นามสกุล",
          phone: "เบอร์โทรศัพท์",
          email: "อีเมล",
          message: "รายละเอียดที่ต้องการ"
        },
        requiredMessages: {
          name: "กรุณากรอกชื่อ-นามสกุล",
          phone: "กรุณากรอกเบอร์โทรศัพท์",
          email: "กรุณากรอกอีเมล"
        },
        submitLabel: "ส่งข้อมูล",
        submittingLabel: "กำลังส่งข้อมูล...",
        successMessage: "ส่งข้อมูลสำเร็จแล้ว",
        errorMessage: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        envMissingMessage: "ระบบยังไม่ได้ตั้งค่า กรุณาตั้งค่า Supabase ก่อนส่งข้อมูล"
      },
      infoTitle: "ข้อมูลบริษัท",
      infoSubtitle: "ติดต่อทีมงาน SST INNOVATION ได้ทุกช่องทาง",
      info: companyContact,
      lineButton: "เพิ่มเพื่อนบน LINE"
    },
    faq: {
      title: "คำถามที่พบบ่อย",
      subtitle: "คำตอบสำหรับบริการของ SST INNOVATION",
      items: [
        {
          question: "ต้องเตรียมข้อมูลอะไรเพื่อเริ่มสร้างเว็บไซต์?",
          answer: "เตรียมข้อมูลบริษัท โลโก้ รูปภาพ และรายละเอียดบริการ เพื่อเริ่มงานได้รวดเร็ว"
        },
        {
          question: "ระบบบริหารหอพัก/รีสอร์ทมีฟังก์ชันอะไรบ้าง?",
          answer: "ครอบคลุมการจอง การจัดการห้องพัก รายรับ-รายจ่าย และรายงานแบบเรียลไทม์"
        },
        {
          question: "ใช้เวลาในการจดทะเบียนบริษัทนานไหม?",
          answer: "โดยปกติใช้เวลา 3-7 วันทำการ ขึ้นอยู่กับความครบถ้วนของเอกสาร"
        },
        {
          question: "มีบริการดูแลหลังบ้านและ SEO ต่อเนื่องหรือไม่?",
          answer: "มีบริการดูแลรายเดือน ครอบคลุมการอัปเดตเนื้อหา ความปลอดภัย และการปรับ SEO"
        }
      ]
    },
    footer: {
      description: "โซลูชันดิจิทัลระดับพรีเมียมสำหรับองค์กรและธุรกิจที่ต้องการความน่าเชื่อถือ",
      linksTitle: "ลิงก์ด่วน",
      contactTitle: "ติดต่อ",
      contact: companyContact,
      quickLinks: [
        { label: "บริการของเรา", href: "/services" },
        { label: "เกี่ยวกับเรา", href: "/about" },
        { label: "ติดต่อเรา", href: "#contact" }
      ]
    }
  },
  en: {
    site: {
      name: "SST INNOVATION",
      tagline: "SST Innovation Co., Ltd.",
      copyright: "(c) 2024 SST INNOVATION CO., LTD. All rights reserved."
    },
    nav: {
      links: [
        { label: "Platforms", href: "#platform-intro" },
        { label: "Packages", href: "#package-list" },
        { label: "Contact", href: "#contact" },
        { label: "Services", href: "/services" }
      ],
      cta: { label: "Request a Quote", href: "#contact" },
      lang: { label: "Language", th: "TH", en: "EN" }
    },
    hero: {
      kicker: "SST INNOVATION",
      title: "Premium digital solutions for ambitious businesses",
      subtitle: "Website development, dorm/resort management software, and company registration services backed by enterprise standards.",
      primaryCta: { label: "View Packages", href: "#package-list" },
      secondaryCta: { label: "Consult Now", href: "#contact" }
    },
    features: {
      title: "Why SST INNOVATION",
      subtitle: "Professional delivery with end-to-end support from strategy to launch.",
      items: [
        {
          title: "Secure and reliable",
          description: "Global-grade stability with high security standards.",
          icon: "shield",
          tone: "bg-emerald-100 text-emerald-600"
        },
        {
          title: "Responsive on every screen",
          description: "Optimized for mobile, tablet, and desktop experiences.",
          icon: "smartphone",
          tone: "bg-purple-100 text-purple-600"
        },
        {
          title: "Professional SEO",
          description: "AI SEO Assistant analyzes keywords to improve visibility.",
          icon: "trending-up",
          tone: "bg-rose-100 text-rose-600"
        },
        {
          title: "24/7 support",
          description: "Dedicated team for continuous guidance and maintenance.",
          icon: "headphones",
          tone: "bg-indigo-100 text-indigo-600"
        }
      ]
    },
    services: {
      title: "Core Services",
      subtitle: "Full-suite services designed for growth and efficiency.",
      items: serviceItemsEn
    },
    servicesPage: {
      title: "Our Services",
      subtitle: "Digital solutions for business and hospitality",
      intro: "SST INNOVATION delivers end-to-end services from strategy and design to long-term support.",
      items: serviceItemsEn
    },
    about: {
      title: "About SST INNOVATION",
      subtitle: "A premium digital partner focused on credibility and outcomes",
      lead: "We believe sustainable growth comes from solid foundations in technology, process, and expert teams.",
      values: [
        {
          title: "Enterprise Standards",
          description: "Every project follows global quality and security benchmarks."
        },
        {
          title: "Transparency",
          description: "Clear communication and consistent progress reporting."
        },
        {
          title: "Long-term Support",
          description: "Ongoing care after launch to keep your business moving forward."
        }
      ]
    },
    platforms: {
      id: "platform-intro",
      title: "Global platforms we work with",
      subtitle: "Technology choices that fit your business goals.",
      items: platforms
    },
    pricing: {
      id: "package-list",
      title: "Starter Packages",
      subtitle: "Choose the right package for your business size.",
      packages,
      note: {
        phone: "Call us at 0843374982 for more details",
        line: "Or add Line @974qhtym"
      }
    },
    portfolio: {
      title: "Selected Projects",
      subtitle: "Trusted by clients who value quality and performance.",
      items: portfolio
    },
    contact: {
      id: "contact",
      title: "Contact SST INNOVATION",
      subtitle: "Speak with our team for tailored recommendations.",
      form: {
        labels: {
          name: "Full Name",
          phone: "Phone Number",
          email: "Email",
          message: "Project Details"
        },
        requiredMessages: {
          name: "Please enter your name",
          phone: "Please enter your phone number",
          email: "Please enter your email"
        },
        submitLabel: "Send Request",
        submittingLabel: "Submitting...",
        successMessage: "Your message has been sent successfully",
        errorMessage: "Something went wrong. Please try again.",
        envMissingMessage: "Supabase is not configured. Please set environment variables."
      },
      infoTitle: "Company Info",
      infoSubtitle: "Reach SST INNOVATION through our preferred channels",
      info: companyContact,
      lineButton: "Add LINE"
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Quick answers about SST INNOVATION services.",
      items: [
        {
          question: "What do we need to start a website project?",
          answer: "Company profile, logo, brand materials, and service details help us start quickly."
        },
        {
          question: "What does the dorm/resort system include?",
          answer: "Room management, booking workflows, financial tracking, and real-time reporting."
        },
        {
          question: "How long does company registration take?",
          answer: "Typically 3-7 business days depending on document readiness."
        },
        {
          question: "Do you offer ongoing maintenance and SEO?",
          answer: "Yes, we provide monthly support for updates, security, and SEO optimization."
        }
      ]
    },
    footer: {
      description: "Premium digital solutions for organizations seeking credibility and growth.",
      linksTitle: "Quick Links",
      contactTitle: "Contact",
      contact: companyContact,
      quickLinks: [
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "#contact" }
      ]
    }
  }
};
