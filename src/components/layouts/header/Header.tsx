import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";

import type { MessageDictionary } from "@/types/messages";

import logo from "@/assets/icons/logo.png";
import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui";

export const Header = () => {
  const copy = messages as MessageDictionary;

  return (
    <header className="bg-white">
      <div className="container">
        <div className="flex items-center justify-between gap-6 py-6">
          <Link href="/" className="flex flex-col items-center gap-3">
            <Image src={logo} alt="FixMinCykel Logo" width={72} height={72} />
            <p className="text-sm font-semibold text-navy">{getMessage(copy, "Header.brand")}</p>
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
            <Link href="/about-us" className="hover:text-primary">
              {getMessage(copy, "Header.navAbout")}
            </Link>
            <Link href="/faq" className="hover:text-primary">
              {getMessage(copy, "Header.navFaq")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="">
              <Link href="/login" className="px-6">
                {getMessage(copy, "Header.login")}
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label={getMessage(copy, "Header.menuLabel")}
                >
                  <span className="sr-only">{getMessage(copy, "Header.menuLabel")}</span>
                  <Menu className="size-5 text-navy" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/how-it-works">{getMessage(copy, "Header.navHow")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/explore">{getMessage(copy, "Header.navExplore")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about-us">{getMessage(copy, "Header.navAbout")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/faq">{getMessage(copy, "Header.navFaq")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
