import Link from "next/link";

import { Eye, Plus, Search, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

const repairsData = [
  {
    id: "JOB-2050",
    title: "Gear Problem",
    status: "Active",
    createdAt: "Feb 3, 2026",
    meta: "3 offers received"
  },
  {
    id: "JOB-2048",
    title: "Brake Squeaking",
    status: "Active",
    createdAt: "Feb 2, 2026",
    price: "350 DKK"
  },
  {
    id: "JOB-2045",
    title: "Flat Tire Repair",
    status: "Completed",
    createdAt: "Jan 28, 2026",
    price: "150 DKK"
  },
  {
    id: "JOB-2042",
    title: "Chain Replacement",
    status: "Completed",
    createdAt: "Jan 20, 2026",
    price: "250 DKK"
  },
  {
    id: "JOB-2038",
    title: "Full Service",
    status: "Completed",
    createdAt: "Jan 10, 2026",
    price: "600 DKK"
  },
  {
    id: "JOB-2035",
    title: "Wheel Alignment",
    status: "Cancelled",
    createdAt: "Jan 5, 2026"
  }
];

const statusStyles: Record<string, string> = {
  Active: "bg-primary/10 text-navy",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-muted text-muted-foreground"
};

export function RepairsList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-navy">My Repairs</h1>
          <p className="text-sm text-muted-foreground">View and manage all your repair requests</p>
        </div>
        <Link href="/user/repairs/new">
          <Button className="gap-2 self-start sm:self-auto">
            <Plus className="size-4" />
            New Repair Request
          </Button>
        </Link>
      </div>

      <Card className="rounded-3xl border-none shadow-sm">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full">
            <InputGroup className="bg-muted/60">
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search repairs..." />
            </InputGroup>
          </div>
          <Button variant="outline" className="gap-2 self-start sm:self-auto">
            <SlidersHorizontal className="size-4" />
            Filter
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {repairsData.map((repair) => (
          <Card key={repair.id} className="rounded-3xl border-none shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-sm font-semibold text-navy">
                  {repair.id} - {repair.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 font-semibold",
                      statusStyles[repair.status]
                    )}
                  >
                    {repair.status}
                  </span>
                  <span>Created: {repair.createdAt}</span>
                </div>
                {repair.meta && <p className="text-xs font-medium text-primary">{repair.meta}</p>}
                {repair.price && <p className="text-sm font-semibold text-navy">{repair.price}</p>}
              </div>
              <Button variant="default" size="sm" className="gap-2">
                <Eye className="size-4" />
                View Details
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
