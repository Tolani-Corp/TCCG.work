import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const allowedRoles = new Set(["founder", "admin", "employee", "project_manager", "client", "partner"]);

export type TccgPortalIdentity = {
  userId: string;
  role: string;
};

function clerkConfigured() {
  const publishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const secret = process.env.CLERK_SECRET_KEY ?? "";
  return /^pk_(test|live)_/.test(publishable) && /^sk_(test|live)_/.test(secret);
}

export async function requireTccgPortalAccess(): Promise<TccgPortalIdentity> {
  if (!clerkConfigured()) redirect("/?portal=unavailable");

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const metadata = (user?.publicMetadata ?? {}) as Record<string, unknown>;
  const role = typeof metadata.tccgRole === "string" ? metadata.tccgRole.toLowerCase() : "";
  const explicitAccess = metadata.tccgPortalAccess === true;

  if (!explicitAccess || !allowedRoles.has(role)) redirect("/unauthorized");

  return { userId, role };
}
