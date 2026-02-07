import { ReactNode } from "react";

import { Footer, Header } from "@/components/layouts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
