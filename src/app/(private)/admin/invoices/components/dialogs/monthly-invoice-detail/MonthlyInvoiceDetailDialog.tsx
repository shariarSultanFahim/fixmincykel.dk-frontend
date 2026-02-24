import type { MonthlyInvoiceDetail } from "@/types/invoice-detail";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface MonthlyInvoiceDetailDialogProps {
  invoice: MonthlyInvoiceDetail;
  onClose: () => void;
}

export default function MonthlyInvoiceDetailDialog({
  invoice,
  onClose
}: MonthlyInvoiceDetailDialogProps) {
  const currencyFormatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0
  });

  const totalJobRevenue = invoice.lineItems.reduce((total, item) => total + item.amount, 0);
  const platformFee = (totalJobRevenue * invoice.feePercentage) / 100;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] space-y-6 overflow-y-auto border-border sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Monthly Invoice Detail</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 rounded-xl border border-border bg-gray-50 p-4 md:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">Invoice #</p>
            <p className="text-sm font-semibold text-gray-900">{invoice.invoiceNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Workshop</p>
            <p className="text-sm font-semibold text-gray-900">{invoice.workshopName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Period</p>
            <p className="text-sm font-semibold text-gray-900">{invoice.period}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Issue Date</p>
            <p className="text-sm font-semibold text-gray-900">{invoice.issueDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Due Date</p>
            <p className="text-sm font-semibold text-gray-900">{invoice.dueDate}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-900">Summary of Completed Jobs:</p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-gray-50">
                  <TableHead>Job #</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Fee ({invoice.feePercentage}%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.lineItems.map((item) => {
                  const feeAmount = (item.amount * invoice.feePercentage) / 100;

                  return (
                    <TableRow key={item.id} className="border-border">
                      <TableCell className="text-sm text-gray-700">{item.id}</TableCell>
                      <TableCell className="text-sm text-gray-900">{item.description}</TableCell>
                      <TableCell className="text-sm text-gray-600">{item.dateTime}</TableCell>
                      <TableCell className="text-right text-sm text-gray-900">
                        {currencyFormatter.format(item.amount)}
                      </TableCell>
                      <TableCell className="text-right text-sm text-gray-900">
                        {currencyFormatter.format(feeAmount)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-center justify-between text-sm text-gray-700">
            <span>Total Monthly Job Revenue:</span>
            <span className="font-semibold text-gray-900">
              {currencyFormatter.format(totalJobRevenue)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
            <span>Platform Fee ({invoice.feePercentage}%):</span>
            <span className="font-semibold text-primary">
              {currencyFormatter.format(platformFee)}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">(Total amount due)</p>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="outline" className="border-border">
            Download PDF
          </Button>
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Approve & Send Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
