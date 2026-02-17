import type { SiteConfig } from "@/types/site-config";
import { env } from "@/env";

export const siteConfig: SiteConfig = {
  name: "FixMinCykel.dk",
  description:
    "Your trusted partner for bike repairs and maintenance. We offer expert services to keep your bike in top condition, ensuring a smooth and enjoyable ride every time.",
  url: env.NEXT_PUBLIC_SITE_URL,
  author: "FixMinCykel.dk",
  locale: "en",
  favicon: "/favicon.png",
  themeColor: "#1AD0D6",
  keywords: ["bike repair", "bike maintenance", "bicycle service", "fix my bike", "bike shop"],
  social: {
    twitter: "",
    github: "",
    linkedin: ""
  },
  ogImage: "/favicon.png"
} as const;
