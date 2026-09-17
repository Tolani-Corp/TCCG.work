import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const secretKey = process.env.CLERK_SECRET_KEY ?? "";
const clerkKeys = `${publishableKey} ${secretKey}`.toLowerCase();
const hasPlaceholderKey =
  clerkKeys.includes("placeholder") ||
  clerkKeys.includes("your_") ||
  clerkKeys.includes("test_key");
const hasValidClerkKey =
  /^pk_(test|live)_/.test(publishableKey) &&
  /^sk_(test|live)_/.test(secretKey) &&
  !hasPlaceholderKey;

const isProtectedRoute = createRouteMatcher([
  "/operations(.*)",
  "/capture(.*)",
  "/api/operations(.*)",
  "/api/capture(.*)",
]);

function unavailableMiddleware(request: NextRequest) {
  if (!isProtectedRoute(request)) return NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      { ok: false, error: "The protected operations service is not configured." },
      { status: 503 },
    );
  }

  const target = new URL("/", request.url);
  target.searchParams.set("portal", "unavailable");
  return NextResponse.redirect(target, 307);
}

export default hasValidClerkKey
  ? clerkMiddleware(async (auth, request) => {
      if (isProtectedRoute(request)) await auth.protect();
    })
  : unavailableMiddleware;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|xml|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
