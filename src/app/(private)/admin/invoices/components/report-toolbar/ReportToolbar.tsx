import { Download, FileText, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ReportToolbar() {
  return (
    <Card className="border-border">
      <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="text-sm font-medium text-gray-700">Select Month for Report:</span>
          <Input type="month" defaultValue="2026-02" className="max-w-55 border-border bg-white" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-primary hover:bg-primary/90">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button className="bg-green-600 text-white hover:bg-green-700">
            <Send className="mr-2 h-4 w-4" />
            Send All Invoices
          </Button>
          <Button variant="outline" className="border-border">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
