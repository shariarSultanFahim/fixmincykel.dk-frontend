import { Button } from "@/components/ui";

export default function Newsletter() {
  return (
    <section className="container py-10">
      <div
        className="container flex w-full flex-col items-center justify-center rounded-[14px] py-20"
        style={{
          backgroundImage: `url(/newslatter-bg.png)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <h1>Subscribe to our Newsletter</h1>
        <p>Get the latest maintenance tips and local deals.</p>
        <form className="mt-6 flex w-full max-w-md flex-col items-center gap-2">
          <input
            type="email"
            placeholder="Email address"
            className="w-full flex-1 rounded-md bg-white px-4 py-2 focus:border-primary focus:ring focus:ring-primary/50"
          />
          <Button
            type="submit"
            className="rounded-md bg-navy px-8 py-2 text-white hover:bg-navy/90 focus:ring focus:ring-primary/50 focus:outline-none"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </section>
  );
}
