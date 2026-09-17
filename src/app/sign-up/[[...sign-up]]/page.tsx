import type { Metadata } from "next";

import { PortalAuth } from "@/components/PortalAuth";

export const metadata: Metadata = {
  title: "Portal Access Request",
  robots: { index: false, follow: false, nocache: true },
};

export default function SignUpPage() {
  return <PortalAuth mode="sign-up" />;
}
