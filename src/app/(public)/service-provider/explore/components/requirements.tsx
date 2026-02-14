import Image from "next/image";

import Craftsman from "@/assets/images/craftsman.jpg";

const REQUIREMENTS = [
  {
    title: "Contact",
    description: "You must contact all homeowners you are connected with."
  },
  {
    title: "Experience",
    description:
      "You must have experience with projects for either private homeowners, property owners, or businesses."
  },
  {
    title: "CVR Number",
    description: "Your company must have a Danish registered CVR number."
  },
  {
    title: "Agreements",
    description:
      "You understand what it entails to enter into and uphold agreements with your customers."
  }
];

export default function Requirements() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center py-12 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-navy md:text-5xl">
          We Have Requirements for Our Craftsmen
        </h1>
        <p className="mt-4 max-w-2xl text-base text-navy/80 md:text-lg">
          To ensure a high standard, we have established a set of rules. These are in place to
          create security for homeowners and ensure that collaboration between customer and
          craftsman is professional.
        </p>
      </div>

      <figure className="mt-10 w-full overflow-hidden">
        <Image
          src={Craftsman}
          alt="Workshop professional with a bike"
          className="h-65 w-full object-cover sm:h-80 md:h-90"
          priority
        />
      </figure>

      <div className="mt-8 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REQUIREMENTS.map((item) => (
          <article
            key={item.title}
            className="flex flex-col items-center gap-2 rounded-[14px] border border-navy/10 bg-white px-4 py-5 text-center shadow-sm"
          >
            <h3 className="text-sm font-bold text-navy md:text-base">{item.title}</h3>
            <p className="text-xs text-navy/70 md:text-sm">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
