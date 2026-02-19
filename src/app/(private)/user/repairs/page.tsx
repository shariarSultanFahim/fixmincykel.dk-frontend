import { Suspense } from "react";

import { MyRepairsSkeleton, RepairsList } from "./components";

export default function MyRepairsPage() {
  return (
    <div className="">
      <Suspense fallback={<MyRepairsSkeleton />}>
        <RepairsList />
      </Suspense>
    </div>
  );
}
