import { Suspense } from "react";

import Header from "../component/layouts/header";
import { SettingsContent } from "./components";
import { SettingsSkeleton } from "./components/skeletons";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Header
        title="System Settings"
        subtitle="Configure global platform settings and preferences"
      />
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent />
      </Suspense>
    </div>
  );
}
