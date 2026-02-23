import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const exportTools = [
  "Export Users",
  "Export Workshops",
  "Export Jobs",
  "Export Bookings",
  "Export Payments",
  "Export Reviews"
];

export default function ExportTools() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Download className="h-4 w-4" />
          Export Tools
        </CardTitle>
        <CardDescription>Export platform data in CSV or XLSX format</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {exportTools.map((label) => (
            <Button key={label} type="button" className="w-full">
              {label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
