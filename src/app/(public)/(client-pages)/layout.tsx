"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Footer, Header } from "@/components/layouts";

export default function ClientPagesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <section>
      {pathname !== "/" && <Header />}
      {children}
      {pathname !== "/" && <Footer />}
    </section>
  );
}
