import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { env } from "@/env";

import messages from "@/messages/en.json";

import { Providers } from "@/providers";

import "@/tailwind";

import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat, Poppins, Zhi_Mang_Xing } from "next/font/google";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";

import type { MessageDictionary } from "@/types/messages";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const zhiMangXing = Zhi_Mang_Xing({
  variable: "--font-zhi",
  subsets: ["latin"],
  weight: "400",
  display: "swap"
});

export const metadata: Metadata = seoConfig;

export default function RootLayout({ children }: { children: ReactNode }) {
  const copy = messages as MessageDictionary;

  return (
    <html lang={siteConfig.locale} suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${zhiMangXing.variable} flex min-h-screen w-full flex-col antialiased`}
      >
        <Providers messages={copy}>
          <main className="flex-1">{children}</main>
          <Toaster richColors />
        </Providers>

        {env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
