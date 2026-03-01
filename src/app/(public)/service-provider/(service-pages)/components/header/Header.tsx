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
            <Button asChild className="">
              <Link href="/service-provider/login" className="px-6">
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
                  <Link href="/service-provider/register">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/service-provider/explore">Explore</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/service-provider/contact-us">Contact Us</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
