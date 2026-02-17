import Image from "next/image";
import Link from "next/link";

import { Facebook, Instagram, Send } from "lucide-react";

import type { MessageDictionary } from "@/types/messages";

import logo from "@/assets/icons/logo.png";
import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { Button } from "@/components/ui";

export function ServiceFooter() {
  const copy = messages as MessageDictionary;

  return (
    <footer className="bg-navy text-white">
      <div className="container py-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="FixMinCykel Logo" width={80} height={80} />

            <div className="flex flex-col items-start justify-between gap-3 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                {getMessage(copy, "Footer.contactPhone")}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                {getMessage(copy, "Footer.contactEmail")}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline"
              className="border-primary/40 bg-primary text-white hover:bg-transparent hover:text-white"
            >
              {getMessage(copy, "Footer.ctaPrimary")}
            </Button>
            <Button
              variant="outline"
              className="border-primary/40 bg-transparent text-white hover:bg-primary hover:text-white"
            >
              {getMessage(copy, "Footer.ctaSecondary")}
            </Button>
          </div>

          <p className="max-w-2xl text-sm text-white/80">
            {getMessage(copy, "Footer.description")}
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={getMessage(copy, "Footer.socialFacebook")}
              className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white/50 hover:text-white"
            >
              <Facebook className="size-4" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={getMessage(copy, "Footer.socialInstagram")}
              className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white/50 hover:text-white"
            >
              <Instagram className="size-4" />
            </Link>
            <Link
              href="mailto:info@fixmincykel.dk"
              aria-label={getMessage(copy, "Footer.socialSend")}
              className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white/50 hover:text-white"
            >
              <Send className="size-4" />
            </Link>
          </div>

          <p className="text-xs text-white/60">{getMessage(copy, "Footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
