import type { SiteConfig } from "@/types/site-config";
import { env } from "@/env";

export const siteConfig: SiteConfig = {
  name: "FixMinCykel.dk",
  description:
    "Your trusted partner for bike repairs and maintenance. We offer expert services to keep your bike in top condition, ensuring a smooth and enjoyable ride every time.",
  url: env.NEXT_PUBLIC_SITE_URL,
  author: "Shariar Sultan Fahim",
  locale: "en",
  themeColor: "#1AD0D6",
  keywords: ["bike repair", "bike maintenance", "bicycle service", "fix my bike", "bike shop"],
  social: {
    twitter: "Shariar Sultan Fahim",
    github: "https://github.com/shariarSultanFahim",
    linkedin: "https://www.linkedin.com/in/shariarsultan"
  },
  ogImage: "/favicon.png"
} as const;
