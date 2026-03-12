import { ReactNode } from "react";

import { withPublicRoute } from "@/lib/hoc/with-route-guard";

function ClientAuthenticationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default withPublicRoute(ClientAuthenticationLayout);
