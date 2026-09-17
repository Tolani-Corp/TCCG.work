import type { Metadata } from "next";

import { PortalAuth } from "@/components/PortalAuth";

export const metadata: Metadata = {
  title: "Portal Sign In",
  robots: { index: false, follow: false, nocache: true },
};

export default function SignInPage() {
  return <PortalAuth mode="sign-in" />;
}
