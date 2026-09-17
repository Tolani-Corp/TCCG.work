import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

function hasValidPublishableKey() {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const normalized = key.toLowerCase();
  return /^pk_(test|live)_/.test(key) && !normalized.includes("placeholder") && !normalized.includes("your_");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!hasValidPublishableKey()) return children;
  return <ClerkProvider>{children}</ClerkProvider>;
}
