import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import ExportTools from "./ExportTools";
import SettingsForm from "./forms/SettingsForm";

export default function SettingsContent() {
  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            Global Configurations
          </CardTitle>
          <CardDescription>Manage platform-wide policies and defaults.</CardDescription>
        </CardHeader>
        <SettingsForm />
      </Card>

      <ExportTools />
    </div>
  );
}
