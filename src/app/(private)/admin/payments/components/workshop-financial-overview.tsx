"use client";

import { useState } from "react";

import { datetimeFormatter } from "@/constants/date-formatter";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import type { FeeStatus, WorkshopFinancial } from "../data/payments";
import { AdjustFeeDialog, InvoiceDialog, MarkAsPaidDialog, SendReminderDialog } from "./dialogs";
import FilterButton from "./filter-button";
import SearchBar from "./search-bar";

interface WorkshopFinancialOverviewProps {
  workshops: WorkshopFinancial[];
}

export default function WorkshopFinancialOverview({ workshops }: WorkshopFinancialOverviewProps) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopFinancial | null>(null);
  const [openDialog, setOpenDialog] = useState<
    "invoice" | "adjust" | "reminder" | "mark-paid" | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeeStatuses, setSelectedFeeStatuses] = useState<FeeStatus[]>(["paid", "pending"]);
  const [adjustedPercentages, setAdjustedPercentages] = useState<Record<string, number>>({});

  const currencyFormatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0
  });

  const filteredWorkshops = workshops.filter((workshop) => {
    if (!selectedFeeStatuses.includes(workshop.feeStatus)) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return workshop.name.toLowerCase().includes(query);
    }

    return true;
  });

  const handleFeeStatusChange = (status: FeeStatus, checked: boolean) => {
    setSelectedFeeStatuses((prev) =>
      checked ? [...prev, status] : prev.filter((s) => s !== status)
    );
  };

  const handleAction = (
    workshop: WorkshopFinancial,
    action: "invoice" | "adjust" | "reminder" | "mark-paid"
  ) => {
    setSelectedWorkshop(workshop);
    setOpenDialog(action);
  };

  const handleClose = (newPercentage?: number) => {
    if (selectedWorkshop && newPercentage !== undefined) {
      setAdjustedPercentages((prev) => ({
        ...prev,
        [selectedWorkshop.id]: newPercentage
      }));
    }
    setOpenDialog(null);
    setSelectedWorkshop(null);
  };

  const getWorkshopFeePercentage = (workshop: WorkshopFinancial): number => {
    return adjustedPercentages[workshop.id] ?? workshop.platformFeePercentage;
  };

  const getWorkshopPlatformFee = (workshop: WorkshopFinancial): number => {
    const percentage = getWorkshopFeePercentage(workshop);
    return (workshop.totalRevenue * percentage) / 100;
  };

  return (
    <>
      <Card className="gap-2 border-border pt-4 pb-0">
        <CardHeader className="px-4">
          <CardTitle>Workshop Financial Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 overflow-x-auto px-0">
          <div className="flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar value={searchQuery} onSearch={setSearchQuery} />
            <FilterButton
              selectedFeeStatuses={selectedFeeStatuses}
              onFeeStatusChange={handleFeeStatusChange}
            />
          </div>
          <div className="overflow-x-auto px-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-gray-50">
                  <TableHead>Workshop</TableHead>
                  <TableHead className="text-right">Total Revenue</TableHead>
                  <TableHead className="text-right">Platform Fee (%)</TableHead>
                  <TableHead className="text-right">Platform Fee (Amount)</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Fee Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkshops.length > 0 ? (
                  filteredWorkshops.map((workshop) => (
                    <TableRow key={workshop.id} className="border-border">
                      <TableCell className="font-medium">{workshop.name}</TableCell>
                      <TableCell className="text-right">
                        {currencyFormatter.format(workshop.totalRevenue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {getWorkshopFeePercentage(workshop)}%
                      </TableCell>
                      <TableCell className="text-right">
                        {currencyFormatter.format(getWorkshopPlatformFee(workshop))}
                      </TableCell>
                      <TableCell>{datetimeFormatter.format(new Date(workshop.dateTime))}</TableCell>
                      <TableCell>
                        <Badge variant={workshop.feeStatus === "paid" ? "default" : "outline"}>
                          {workshop.feeStatus === "paid" ? "✓ Paid" : "⋯ Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-secondary"
                          onClick={() => handleAction(workshop, "invoice")}
                        >
                          Invoice
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-primary"
                          onClick={() => handleAction(workshop, "adjust")}
                        >
                          Adjust
                        </Button>
                        {workshop.feeStatus === "pending" && (
                          <>
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-orange-600"
                              onClick={() => handleAction(workshop, "reminder")}
                            >
                              Remind
                            </Button>
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-green-600"
                              onClick={() => handleAction(workshop, "mark-paid")}
                            >
                              Mark as Paid
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                      No workshops found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedWorkshop && openDialog === "invoice" && (
        <InvoiceDialog workshop={selectedWorkshop} onClose={handleClose} />
      )}
      {selectedWorkshop && openDialog === "adjust" && (
        <AdjustFeeDialog
          workshop={selectedWorkshop}
          onClose={(newPercentage) => handleClose(newPercentage)}
        />
      )}
      {selectedWorkshop && openDialog === "reminder" && (
        <SendReminderDialog workshop={selectedWorkshop} onClose={handleClose} />
      )}
      {selectedWorkshop && openDialog === "mark-paid" && (
        <MarkAsPaidDialog
          workshop={selectedWorkshop}
          platformFeeAmount={getWorkshopPlatformFee(selectedWorkshop)}
          onClose={handleClose}
        />
      )}
    </>
  );
}
