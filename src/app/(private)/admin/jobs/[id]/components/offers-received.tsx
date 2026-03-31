import type { JobOffer, OfferStatus } from "@/types/jobs-manage";
import { currencyFormatter } from "@/constants/currency-formatter";
import { datetimeFormatter } from "@/constants/date-formatter";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface OffersReceivedProps {
  offers: JobOffer[];
}

function getOfferStatusColor(
  status: OfferStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "ACCEPTED":
      return "default";
    case "PENDING":
      return "secondary";
    case "REJECTED":
      return "destructive";
    default:
      return "outline";
  }
}

export default function OffersReceived({ offers }: OffersReceivedProps) {
  return (
    <Card className="gap-2 border-border pt-4 pb-0">
      <CardHeader className="px-6">
        <CardTitle>Offers Received ({offers.length})</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="pl-6">Workshop ID</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Estimated Time</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.length > 0 ? (
              offers.map((offer) => (
                <TableRow key={offer.id} className="border-border">
                  <TableCell className="pl-6 font-medium">{offer.workshopId}</TableCell>
                  <TableCell className="font-medium">
                    {currencyFormatter.format(offer.price)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getOfferStatusColor(offer.status)}>{offer.status}</Badge>
                  </TableCell>
                  <TableCell>{datetimeFormatter.format(new Date(offer.estimatedTime))}</TableCell>
                  <TableCell className="text-sm text-gray-600">{offer.message}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                  No offers received
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
