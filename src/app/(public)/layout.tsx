import { ReactNode } from "react";

import { Footer } from "@/components/layouts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      {children}
      <Footer />
    </section>
  );
}
