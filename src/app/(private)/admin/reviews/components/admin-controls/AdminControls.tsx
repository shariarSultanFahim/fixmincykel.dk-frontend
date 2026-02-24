import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const controlItems = [
  {
    label: "Hide Review",
    description: "Remove from public view while keeping in database"
  },
  {
    label: "Delete Review",
    description: "Permanently remove from the platform"
  },
  {
    label: "Flag User",
    description: "Mark user for further investigation"
  },
  {
    label: "View Booking Context",
    description: "See full booking details related to the review"
  }
];

export default function AdminControls() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base">Admin Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {controlItems.map((item) => (
          <div key={item.label} className="flex flex-wrap gap-2 text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{item.label}</span>
            <span className="text-gray-600">{item.description}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
