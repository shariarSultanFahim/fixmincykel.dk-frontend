import { ReactNode } from "react";

import { withPublicRoute } from "@/lib/hoc/with-route-guard";

function ServiceProviderAuthenticationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default withPublicRoute(ServiceProviderAuthenticationLayout);
