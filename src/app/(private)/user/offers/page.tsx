import { OffersGrid, TipBanner } from "./components";

export default function OffersPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-navy">My Offers</h1>
        <p className="mt-2 text-muted-foreground">
          Compare and select the best workshop for your bike repair
        </p>
      </div>

      <TipBanner />

      <OffersGrid />
    </div>
  );
}
