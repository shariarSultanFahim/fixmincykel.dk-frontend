"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { useCopy } from "@/hooks/use-copy";

const NAV_ITEMS = [
  { href: "/", labelKey: "clientCta" },
  { href: "/service-home", labelKey: "serviceCta" }
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useCopy("PublicNav");
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const isServiceRoute = firstSegment === "service-home";

  return (
    <section className="bg-white">
      <div className="bg-primary">
        <nav
          aria-label={t("ariaLabel")}
          className="mx-auto flex max-w-5xl items-center justify-center px-4"
        >
          <div className="flex items-end">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === "/" ? !isServiceRoute : isServiceRoute;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex h-10 items-center justify-center px-8 text-sm font-bold transition-all duration-200",

                    isActive
                      ? "z-10 rounded-t-2xl bg-white text-navy"
                      : "bg-primary text-navy hover:bg-white/10"
                  )}
                >
                  {t(item.labelKey)}

                  {isActive && (
                    <>
                      <div className="absolute bottom-0 -left-5 h-5 w-5 bg-white before:absolute before:inset-0 before:rounded-br-2xl before:bg-primary" />

                      <div className="absolute -right-5 bottom-0 h-5 w-5 bg-white before:absolute before:inset-0 before:rounded-bl-2xl before:bg-primary" />
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {children}
    </section>
  );
}
