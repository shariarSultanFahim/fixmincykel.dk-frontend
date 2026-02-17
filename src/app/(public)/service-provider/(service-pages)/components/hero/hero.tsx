import Image from "next/image";
import Link from "next/link";

import HeroImage from "@/assets/images/serviceHero.png";

import { Button } from "@/components/ui";

export default function ServiceHero() {
  return (
    <section className="container py-10">
      <div className="container flex flex-col-reverse justify-between md:flex-row">
        <div className="flex flex-col items-start justify-center gap-4 md:w-1/2">
          <h1
            style={{ fontSize: "clamp(30px, 8vw - 1rem, 56px)" }}
            className="leading-tight font-bold text-navy"
          >
            FixMinCykel.dk brings customers directly to your workshop — every day.
          </h1>
          <p
            style={{ fontSize: "clamp(16px, 2vw, 18px)" }}
            className="leading-relaxed text-muted-foreground"
          >
            Receive requests, send offers, and increase your revenue with digital booking tools.
          </p>
          <div className="flex items-start justify-center">
            <Link href="/service-provider/register">
              <Button>Sign up your workshop</Button>
            </Link>
            <div className="mt-4">
              <Image src="/arrow.svg" alt="arrow" width={60} height={60} />
              <div className="-ml-20">
                <p className="font-zhi text-lg">More than 2000+ mechanics</p>
                <p className="font-zhi text-lg">have joined the website</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end md:w-1/2">
          <Image src={HeroImage} alt="Hero Image" style={{ objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}
