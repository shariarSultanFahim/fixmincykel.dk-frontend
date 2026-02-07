import Image from "next/image";
import Link from "next/link";

import { MoveLeft, Search } from "lucide-react";

import type { MessageDictionary } from "@/types/messages";

import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { Footer, Header } from "@/components/layouts";
import { Button, Input } from "@/components/ui";

export default function NotFound() {
  const copy = messages as MessageDictionary;

  return (
    <section>
      <Header />
      <div className="container flex flex-1 items-center justify-center py-10">
        <div className="grid w-full max-w-full gap-10 rounded-md border p-6 shadow-subtle md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div className="order-2 space-y-5 md:order-1">
            <p className="text-7xl leading-none font-bold text-navy md:text-9xl">404</p>
            <h1 className="text-3xl md:text-4xl">{getMessage(copy, "NotFound.title")}</h1>
            <p className="text-muted-foreground">{getMessage(copy, "NotFound.description")}</p>

            <form className="flex w-full items-center gap-3" action="/">
              <Input
                className="input-standard"
                placeholder={getMessage(copy, "NotFound.searchPlaceholder")}
                aria-label={getMessage(copy, "NotFound.searchPlaceholder")}
              />
              <Button
                type="submit"
                size="icon"
                aria-label={getMessage(copy, "NotFound.searchAction")}
              >
                <Search className="size-4" />
              </Button>
            </form>

            <Button asChild>
              <Link href="/" className="inline-flex items-center gap-2">
                <MoveLeft className="size-4" />
                {getMessage(copy, "NotFound.action")}
              </Link>
            </Button>
          </div>

          <figure className="order-1 flex items-center justify-center md:order-2">
            <Image
              src="/error404.svg"
              alt={getMessage(copy, "NotFound.imageAlt")}
              width={520}
              height={360}
              priority
            />
            <figcaption className="sr-only">{getMessage(copy, "NotFound.imageCaption")}</figcaption>
          </figure>
        </div>
      </div>
      <Footer />
    </section>
  );
}
