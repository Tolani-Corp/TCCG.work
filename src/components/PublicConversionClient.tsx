"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";

import { emitTccgConversionEvent } from "@/lib/publicConversionAnalytics";
import type { TccgConversionEvent } from "@/lib/publicProductContext";

export function PublicPageViewTracker({ publicStatus }: { publicStatus: string }) {
  useEffect(() => {
    emitTccgConversionEvent("public_page_viewed", { publicStatus });
  }, [publicStatus]);

  return null;
}

export function TrackedConversionLink({
  href,
  event,
  downstreamState,
  className,
  children,
}: {
  href: string;
  event: TccgConversionEvent;
  downstreamState: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => emitTccgConversionEvent(event, { route: href, downstreamState })}
    >
      {children}
    </Link>
  );
}
