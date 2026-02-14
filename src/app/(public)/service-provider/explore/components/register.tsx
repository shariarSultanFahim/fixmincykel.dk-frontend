import { Button, Input, Label } from "@/components/ui";

const FIELD_LIST = [
  { id: "full-name", label: "Full Name", placeholder: "John Doe" },
  { id: "company-name", label: "Company name:", placeholder: "ABC Corp" },
  { id: "address", label: "Address", placeholder: "123 Main Street" },
  { id: "cvr", label: "CVR", placeholder: "cvr" },
  { id: "email", label: "Email", placeholder: "john@example.com" },
  { id: "phone", label: "Phone Number", placeholder: "+45 0000 0000" }
];

export default function RegisterService() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl rounded-[18px] border border-navy/10 bg-white p-6 shadow-sm md:p-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-navy md:text-4xl">Register your business</h2>
          <p className="mt-3 text-sm text-navy/70 md:text-base">
            Join our team and become a trusted workshop partner. Get local service requests, send
            offers in minutes, manage bookings from one dashboard, and grow your business with
            steady payouts and verified customer reviews.
          </p>
        </div>

        <form className="mt-10 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {FIELD_LIST.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-sm font-semibold text-navy">
                  {field.label}
                </Label>
                <Input id={field.id} placeholder={field.placeholder} className="bg-white" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="messages" className="text-sm font-semibold text-navy">
              Messages
            </Label>
            <textarea
              id="messages"
              placeholder="I would like to know..."
              className="min-h-35 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-navy shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>

          <Button type="button" className="w-full rounded-md text-sm font-semibold">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
