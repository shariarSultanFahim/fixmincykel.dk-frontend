export default function GetStarted() {
  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-navy md:text-5xl">This is how to get started</h1>
        <p className="mt-4 max-w-2xl text-base text-navy/80 md:text-lg">
          Start by registering your workshop in our form below. The registration is completely
          non-binding. Afterwards, you will be contacted by our team, who will guide you through the
          approval process.
        </p>
      </div>
      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-10">
        <div className="flex items-start gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            1
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-navy md:text-xl">Register Your Workshop</h3>
            <p className="text-sm text-navy/70 md:text-base">
              Fill in your workshop&apos;s information in our registration form. You are not
              committed to anything by registering. Afterwards, we will contact you to confirm your
              details and start the approval process.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            2
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-navy md:text-xl">Get Approved</h3>
            <p className="text-sm text-navy/70 md:text-base">
              Our team reviews your application to ensure the workshop meets our quality criteria.
              Once approved, you will get full access to your workshop dashboard, where you can
              immediately start receiving and responding to repair jobs.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            3
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-navy md:text-xl">Receive and Win Jobs</h3>
            <p className="text-sm text-navy/70 md:text-base">
              You will receive bicycle repair jobs from cyclists in your local area that match your
              areas of expertise. We help optimize your profile so you get more relevant jobs and
              increase your chances of winning customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
