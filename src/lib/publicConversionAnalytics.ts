import type { TccgConversionEvent } from "@/lib/publicProductContext";

type ConversionMetadata = Record<string, string | number | boolean | null | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function emitTccgConversionEvent(
  event: TccgConversionEvent,
  metadata: ConversionMetadata = {},
) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    entity: "tccg.work",
    source: "tccg.work",
    ...Object.fromEntries(
      Object.entries(metadata).filter(([, value]) => value !== undefined),
    ),
  };

  const dataLayerWindow = window as DataLayerWindow;
  dataLayerWindow.dataLayer ??= [];
  dataLayerWindow.dataLayer.push(payload);

  window.dispatchEvent(
    new CustomEvent("tccg:conversion", {
      detail: payload,
    }),
  );
}
