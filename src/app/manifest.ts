import type { MetadataRoute } from "next";

import { versionedAsset } from "@/lib/brandAssets";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TCCG Work",
    short_name: "TCCG",
    description:
      "Construction operations command center for TC Construction Group.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F4F6F5",
    theme_color: "#10151B",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: versionedAsset("/android-chrome-192x192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: versionedAsset("/android-chrome-512x512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: versionedAsset("/maskable-icon-192x192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: versionedAsset("/maskable-icon-512x512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: versionedAsset("/apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
