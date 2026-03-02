import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";

import type { MessageDictionary } from "@/types/messages";

import logo from "@/assets/icons/logo.png";
import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const copy = messages as MessageDictionary;

  return (
    <header className="bg-transparent">
      <div className="container">
        <div className="flex items-center justify-between gap-6 py-6">
          <Link href="/" className="flex flex-col items-center gap-3">
            <Image src={logo} alt="FixMinCykel Logo" width={72} height={72} />
            <p className="hidden text-sm font-semibold text-navy md:block">
              {getMessage(copy, "Header.brand")}
            </p>
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-8 rounded-full border border-border px-8 py-3 text-sm text-navy md:flex"
          >
            <Link href="/how-it-works" className="hover:text-primary">
              {getMessage(copy, "Header.navHow")}
            </Link>
            <Link href="/explore" className="hover:text-primary">
              {getMessage(copy, "Header.navExplore")}
            </Link>
            {/* <Link href="/about-us" className="hover:text-primary">
              {getMessage(copy, "Header.navAbout")}
            </Link> */}
            <Link href="/contact-us" className="hover:text-primary">
              {getMessage(copy, "Header.navFaq")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden md:flex">
              <Link href="/login" className="px-6">
                {getMessage(copy, "Header.login")}
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label={getMessage(copy, "Header.menuLabel")}
                >
                  {/* <span className="sr-only">{getMessage(copy, "Header.menuLabel")}</span> */}
                  <Menu className="size-5 text-navy" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="mt-8 flex flex-col gap-4 p-4">
                  <Button asChild className="w-full">
                    <Link href="/how-it-works" className="text-navy hover:text-primary">
                      {getMessage(copy, "Header.navHow")}
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/explore" className="text-navy hover:text-primary">
                      {getMessage(copy, "Header.navExplore")}
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/contact-us" className="text-navy hover:text-primary">
                      {getMessage(copy, "Header.navFaq")}
                    </Link>
                  </Button>
                  <Button asChild className="w-full" variant={"outline"}>
                    <Link href="/login">{getMessage(copy, "Header.login")}</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
