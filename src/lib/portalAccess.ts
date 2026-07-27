import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const allowedRoles = new Set(["founder", "admin", "employee", "project_manager", "client", "partner"]);

export type TccgPortalIdentity = {
  userId: string;
  role: string;
};

export type TccgPortalAuthorization = {
  configured: boolean;
  authenticated: boolean;
  authorized: boolean;
  identity: TccgPortalIdentity | null;
};

export function isTccgClerkConfigured() {
  const publishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const secret = process.env.CLERK_SECRET_KEY ?? "";
  return /^pk_(test|live)_/.test(publishable) && /^sk_(test|live)_/.test(secret);
}

export async function getTccgPortalAuthorization(): Promise<TccgPortalAuthorization> {
  if (!isTccgClerkConfigured()) {
    return { configured: false, authenticated: false, authorized: false, identity: null };
  }

  const { userId } = await auth();
  if (!userId) {
    return { configured: true, authenticated: false, authorized: false, identity: null };
  }

  const user = await currentUser();
  const metadata = (user?.publicMetadata ?? {}) as Record<string, unknown>;
  const role = typeof metadata.tccgRole === "string" ? metadata.tccgRole.toLowerCase() : "";
  const explicitAccess = metadata.tccgPortalAccess === true;
  const authorized = explicitAccess && allowedRoles.has(role);

  return {
    configured: true,
    authenticated: true,
    authorized,
    identity: authorized ? { userId, role } : null,
  };
}

export async function requireTccgPortalAccess(): Promise<TccgPortalIdentity> {
  const status = await getTccgPortalAuthorization();
  if (!status.configured) redirect("/?portal=unavailable");
  if (!status.authenticated) redirect("/sign-in");
  if (!status.authorized || !status.identity) redirect("/unauthorized");
  return status.identity;
}
