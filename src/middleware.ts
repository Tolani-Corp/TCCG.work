import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

export default hasValidClerkKey
  ? clerkMiddleware()
  : function middleware() {
      return NextResponse.next();
    };

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|xml|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
