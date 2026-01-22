export type Lang = "th" | "en";

type Dict = {
  nav: {
    home: string;
    features: string;
    platforms: string;
    services: string;
    packages: string;
    portfolio: string;
    articles: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  platforms: {
    title: string;
    subtitle: string;
    items: {
      platform: string;
      years: string;
      users: string;
      websites: string;
      awards: string;
      clients: string;
      suitable: string;
    }[];
  };
  services: {
    title: string;
    subtitle: string;
    items: string[];
  };
  packages: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      price: string;
      description: string;
      features: string[];
      badge?: string;
    }[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    items: { title: string; category: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    detailsTitle: string;
    detailsSubtitle: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    sending: string;
  };
  additional: {
    title: string;
    subtitle: string;
    items: string[];
  };
  footer: {
    company: string;
    address: string;
    phone: string;
    email: string;
    line: string;
    note: string;
  };
};

export const dict: Record<Lang, Dict> = {
  th: {
    nav: {
      home: "หน้าแรก",
      features: "จุดเด่น",
      platforms: "แพลตฟอร์ม",
      services: "บริการ",
      packages: "แพ็กเกจ",
      portfolio: "รูปแบบเว็บไซต์",
      articles: "บทความ",
      contact: "ติดต่อ",
    },
    hero: {
      title: "WebCraft Pro จาก SST INNOVATION",
      subtitle:
        "โซลูชันเว็บไซต์องค์กรระดับพรีเมียมที่ยกระดับภาพลักษณ์ พร้อมรองรับการเติบโตระยะยาว",
      primaryCta: "ขอใบเสนอราคา",
      secondaryCta: "ดูแพ็กเกจ",
      trust: "ได้รับความไว้วางใจจากองค์กรชั้นนำกว่า 180+ แห่ง",
    },
    features: {
      title: "ทำไมต้อง WebCraft Pro",
      subtitle: "ออกแบบเพื่อธุรกิจที่ต้องการความแตกต่างและความน่าเชื่อถือ",
      items: [
        {
          title: "ดีไซน์ระดับองค์กร",
          description: "วางโครงสร้าง UI/UX อย่างมีระบบ ถ่ายทอดภาพลักษณ์ที่เป็นมืออาชีพ",
        },
        {
          title: "ประสิทธิภาพสูง",
          description: "โครงสร้างโค้ดทันสมัย โหลดไว รองรับ SEO และ Core Web Vitals",
        },
        {
          title: "ความปลอดภัยและมาตรฐาน",
          description: "รองรับการต่อยอดกับระบบภายใน พร้อมมาตรฐานความปลอดภัย",
        },
        {
          title: "ดูแลต่อเนื่อง",
          description: "ทีมผู้เชี่ยวชาญดูแลหลังส่งมอบ อัปเดตและขยายได้ง่าย",
        },
      ],
    },
    platforms: {
      title: "แพลตฟอร์มที่เราเชี่ยวชาญ",
      subtitle: "สถิติที่แสดงความเชี่ยวชาญในการพัฒนาและดูแลระบบ",
      items: [
        {
          platform: "SST Enterprise CMS",
          years: "8+ ปี",
          users: "1.2k+",
          websites: "420+",
          awards: "6 รางวัล",
          clients: "180+",
          suitable: "องค์กรที่ต้องการระบบบริหารเนื้อหาที่ปลอดภัยและยืดหยุ่น",
        },
        {
          platform: "Commerce Suite",
          years: "6+ ปี",
          users: "680+",
          websites: "230+",
          awards: "4 รางวัล",
          clients: "95+",
          suitable: "ธุรกิจที่ต้องการเว็บขายของพร้อมระบบชำระเงินครบวงจร",
        },
        {
          platform: "Corporate Cloud",
          years: "7+ ปี",
          users: "900+",
          websites: "310+",
          awards: "5 รางวัล",
          clients: "120+",
          suitable: "องค์กรที่ต้องการอินทราเน็ตและพอร์ทัลเชื่อมต่อระบบภายใน",
        },
        {
          platform: "Brand Experience",
          years: "5+ ปี",
          users: "520+",
          websites: "180+",
          awards: "3 รางวัล",
          clients: "70+",
          suitable: "แบรนด์ที่ต้องการเว็บไซต์เพื่อภาพลักษณ์ระดับพรีเมียม",
        },
        {
          platform: "Data Insight Portal",
          years: "4+ ปี",
          users: "350+",
          websites: "140+",
          awards: "2 รางวัล",
          clients: "40+",
          suitable: "องค์กรที่ต้องการแดชบอร์ดและรายงานเชิงลึกแบบเรียลไทม์",
        },
      ],
    },
    services: {
      title: "บริการหลักของเรา",
      subtitle: "ครบวงจรตั้งแต่กลยุทธ์ไปจนถึงการดูแลระยะยาว",
      items: [
        "ที่ปรึกษาและวางกลยุทธ์ดิจิทัล",
        "ออกแบบ UX/UI และระบบนำทาง",
        "พัฒนาเว็บไซต์องค์กรและระบบเว็บแอป",
        "ปรับแต่งให้รองรับ SEO และโฆษณาออนไลน์",
        "ดูแลระบบและโฮสติ้งแบบ Managed Service",
        "วิเคราะห์ข้อมูลและวัดผลเชิงธุรกิจ",
      ],
    },
    packages: {
      title: "แพ็กเกจ WebCraft Pro",
      subtitle: "ยืดหยุ่นตามขนาดธุรกิจ พร้อมบริการหลังการขาย",
      items: [
        {
          name: "One Page",
          price: "เริ่มต้น 29,000 บาท",
          description: "เหมาะสำหรับแบรนด์ที่ต้องการหน้า Landing Page มืออาชีพ",
          features: [
            "ออกแบบหน้าเดียวครบทุกส่วน",
            "รองรับมือถือและ SEO พื้นฐาน",
            "แบบฟอร์มติดต่อ + Analytics",
            "ส่งมอบภายใน 14 วัน",
          ],
          badge: "BEST VALUE",
        },
        {
          name: "Business Website",
          price: "เริ่มต้น 69,000 บาท",
          description: "เว็บไซต์องค์กร 6-8 หน้า พร้อมระบบจัดการเนื้อหา",
          features: [
            "ออกแบบเฉพาะตามแบรนด์",
            "ระบบ CMS จัดการเนื้อหา",
            "เชื่อมต่อโซเชียลและแผนที่",
            "ปรับแต่ง SEO เชิงลึก",
          ],
          badge: "MOST POPULAR",
        },
        {
          name: "Business Website Plus+",
          price: "เริ่มต้น 120,000 บาท",
          description: "รองรับฟีเจอร์เฉพาะองค์กรและการเชื่อมต่อระบบภายใน",
          features: [
            "วิเคราะห์ UX/UI เชิงลึก",
            "ระบบสมาชิกหรือพอร์ทัล",
            "รองรับหลายภาษาและหลายสาขา",
            "บริการดูแลรายเดือน",
          ],
        },
      ],
    },
    portfolio: {
      title: "ผลงานล่าสุด",
      subtitle: "ตัวอย่างเว็บไซต์จากหลากหลายอุตสาหกรรม",
      items: [
        { title: "Riviera Hotels", category: "Hospitality" },
        { title: "Siam Logistics", category: "Logistics" },
        { title: "Metro Healthcare", category: "Healthcare" },
        { title: "Orchid Finance", category: "Finance" },
        { title: "Aurora Education", category: "Education" },
        { title: "Atlas Manufacturing", category: "Manufacturing" },
      ],
    },
    contact: {
      title: "เริ่มต้นโปรเจกต์ของคุณ",
      subtitle: "ทีมที่ปรึกษาพร้อมตอบกลับภายใน 1 วันทำการ",
      detailsTitle: "ข้อมูลติดต่อ",
      detailsSubtitle: "ติดต่อทีมงานได้โดยตรง หรือผ่านไลน์สำหรับงานเร่งด่วน",
      name: "ชื่อ-นามสกุล",
      phone: "เบอร์โทรศัพท์",
      email: "อีเมล",
      message: "รายละเอียดที่ต้องการ",
      submit: "ส่งข้อความ",
      success: "ขอบคุณสำหรับการติดต่อ เราจะรีบกลับไปหาคุณ",
      sending: "กำลังส่ง...",
    },
    additional: {
      title: "บริการเพิ่มเติม",
      subtitle: "เสริมความแข็งแรงให้เว็บไซต์ของคุณแบบครบวงจร",
      items: [
        "Production-ready hosting + Cloud infrastructure",
        "ระบบ Email สำหรับองค์กร",
        "ปรับปรุงความเร็วและความปลอดภัย",
        "ออกแบบสื่อดิจิทัลและแบรนด์ไกด์ไลน์",
        "ดูแลคอนเทนต์รายเดือนและ SEO",
      ],
    },
    footer: {
      company: "บริษัท เอสเอสที อินโนเวชั่น จำกัด",
      address:
        "หมู่บ้านนันทนาการ์เด้นท์ 139/32 139 32 ตำบล บ้านกลาง อำเภอเมือง ปทุมธานี 12000",
      phone: "0843374982",
      email: "sstaminno@gmail.com",
      line: "ไลน์: @974qhtym",
      note: "โซลูชันดิจิทัลระดับองค์กร ครอบคลุมเว็บไซต์ แอปพลิเคชัน และระบบภายใน",
    },
  },
  en: {
    nav: {
      home: "Home",
      features: "Highlights",
      platforms: "Platforms",
      services: "Services",
      packages: "Packages",
      portfolio: "Website Templates",
      articles: "Articles",
      contact: "Contact",
    },
    hero: {
      title: "WebCraft Pro by SST INNOVATION",
      subtitle:
        "Premium enterprise website solutions that elevate credibility and support long-term growth.",
      primaryCta: "Request a Quote",
      secondaryCta: "View Packages",
      trust: "Trusted by 180+ leading organizations",
    },
    features: {
      title: "Why WebCraft Pro",
      subtitle: "Built for brands that demand elegance, clarity, and performance.",
      items: [
        {
          title: "Enterprise-grade design",
          description: "Structured UX/UI that communicates professionalism and trust.",
        },
        {
          title: "High performance",
          description: "Modern architecture optimized for speed, SEO, and Core Web Vitals.",
        },
        {
          title: "Security & compliance",
          description: "Ready for internal integrations with robust security standards.",
        },
        {
          title: "Ongoing care",
          description: "Dedicated experts to maintain, improve, and expand your platform.",
        },
      ],
    },
    platforms: {
      title: "Platforms we master",
      subtitle: "Proven capability across industries and enterprise teams.",
      items: [
        {
          platform: "SST Enterprise CMS",
          years: "8+ years",
          users: "1.2k+",
          websites: "420+",
          awards: "6 awards",
          clients: "180+",
          suitable: "For teams that need secure, flexible content operations.",
        },
        {
          platform: "Commerce Suite",
          years: "6+ years",
          users: "680+",
          websites: "230+",
          awards: "4 awards",
          clients: "95+",
          suitable: "For businesses selling online with end-to-end payments.",
        },
        {
          platform: "Corporate Cloud",
          years: "7+ years",
          users: "900+",
          websites: "310+",
          awards: "5 awards",
          clients: "120+",
          suitable: "For intranets and portals connected to internal systems.",
        },
        {
          platform: "Brand Experience",
          years: "5+ years",
          users: "520+",
          websites: "180+",
          awards: "3 awards",
          clients: "70+",
          suitable: "For premium brand storytelling and corporate image sites.",
        },
        {
          platform: "Data Insight Portal",
          years: "4+ years",
          users: "350+",
          websites: "140+",
          awards: "2 awards",
          clients: "40+",
          suitable: "For real-time dashboards and executive reporting.",
        },
      ],
    },
    services: {
      title: "Core services",
      subtitle: "Strategy to launch, with long-term operational support.",
      items: [
        "Digital strategy and consulting",
        "UX/UI design and information architecture",
        "Enterprise website & web app development",
        "SEO and conversion optimization",
        "Managed hosting & support",
        "Business analytics and reporting",
      ],
    },
    packages: {
      title: "WebCraft Pro packages",
      subtitle: "Flexible bundles aligned to your business stage.",
      items: [
        {
          name: "One Page",
          price: "Starting at 29,000 THB",
          description: "Ideal for a polished landing experience.",
          features: [
            "Single-page layout with full sections",
            "Responsive + basic SEO setup",
            "Contact form + analytics",
            "Delivery within 14 days",
          ],
          badge: "BEST VALUE",
        },
        {
          name: "Business Website",
          price: "Starting at 69,000 THB",
          description: "6-8 page corporate website with CMS.",
          features: [
            "Custom brand-driven design",
            "CMS for content management",
            "Social + map integrations",
            "Advanced SEO tuning",
          ],
          badge: "MOST POPULAR",
        },
        {
          name: "Business Website Plus+",
          price: "Starting at 120,000 THB",
          description: "Enterprise-ready with custom integrations.",
          features: [
            "Deep UX/UI analysis",
            "Membership or portal features",
            "Multi-language + multi-branch support",
            "Monthly care service",
          ],
        },
      ],
    },
    portfolio: {
      title: "Recent work",
      subtitle: "Selected projects across premium industries.",
      items: [
        { title: "Riviera Hotels", category: "Hospitality" },
        { title: "Siam Logistics", category: "Logistics" },
        { title: "Metro Healthcare", category: "Healthcare" },
        { title: "Orchid Finance", category: "Finance" },
        { title: "Aurora Education", category: "Education" },
        { title: "Atlas Manufacturing", category: "Manufacturing" },
      ],
    },
    contact: {
      title: "Start your project",
      subtitle: "Our consultants will respond within one business day.",
      detailsTitle: "Contact details",
      detailsSubtitle: "Reach our team directly or via Line for priority requests.",
      name: "Full name",
      phone: "Phone number",
      email: "Email address",
      message: "Project details",
      submit: "Send message",
      success: "Thank you. We will contact you shortly.",
      sending: "Sending...",
    },
    additional: {
      title: "Additional services",
      subtitle: "Strengthen your digital presence with expert care.",
      items: [
        "Production-ready hosting + cloud infrastructure",
        "Corporate email systems",
        "Performance and security optimization",
        "Digital asset design + brand guidelines",
        "Monthly content and SEO management",
      ],
    },
    footer: {
      company: "SST Innovation Co., Ltd.",
      address:
        "Nantana Garden Village 139/32, Ban Klang, Mueang Pathum Thani, Pathum Thani 12000",
      phone: "+66 84 337 4982",
      email: "sstaminno@gmail.com",
      line: "Line: @974qhtym",
      note: "Enterprise digital solutions across websites, applications, and internal systems.",
    },
  },
};

export const getCopy = (lang: Lang) => dict[lang];
