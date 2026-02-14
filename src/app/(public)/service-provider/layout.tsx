import { ReactNode } from "react";

import { ServiceFooter } from "./components/footer/Footer";
import { ServiceHeader } from "./components/header/Header";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <ServiceHeader />
      {children}
      <ServiceFooter />
    </section>
  );
}
