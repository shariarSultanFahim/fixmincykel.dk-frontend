import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";

import type { MessageDictionary } from "@/types/messages";

import logo from "@/assets/icons/logo.png";
import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const ServiceHeader = () => {
  const copy = messages as MessageDictionary;

  return (
    <header className="bg-transparent">
      <div className="container">
        <div className="flex items-center justify-between gap-6 py-6">
          <Link href="/service-provider" className="flex flex-col items-center gap-3">
            <Image src={logo} alt="FixMinCykel Logo" width={72} height={72} />
            <p className="hidden text-sm font-semibold text-navy md:block">
              {getMessage(copy, "Header.brand")}
            </p>
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-8 rounded-full border border-border px-8 py-3 text-sm text-navy md:flex"
          >
            <Link href="/service-provider/register" className="hover:text-primary">
              Register
            </Link>
            <Link href="/service-provider/explore" className="hover:text-primary">
              Explore
            </Link>
            <Link href="/service-provider/contact-us" className="hover:text-primary">
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden md:flex">
              <Link href="/service-provider/login" className="px-6">
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
                  <Menu className="size-5 text-navy" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="mt-8 flex flex-col gap-4 p-4">
                  <Button asChild className="w-full">
                    <Link href="/service-provider/register">Register</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/service-provider/explore">Explore</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/service-provider/contact-us">Contact Us</Link>
                  </Button>
                  <Button asChild className="w-full" variant={"outline"}>
                    <Link href="/service-provider/login">{getMessage(copy, "Header.login")}</Link>
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
