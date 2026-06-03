import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Shell } from "@/components/Shell";
import { versionedAsset } from "@/lib/brandAssets";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tccg.work"),
  applicationName: "TCCG Work",
  title: {
    default: "TCCG Work | Construction Operations Platform",
    template: "%s | TCCG Work",
  },
  description:
    "A construction operations platform for TCCG open jobs, DAO tasks, BIM coordination, smart HVAC delivery, field crews, safety, and ESG closeout.",
  icons: {
    icon: [
      { url: versionedAsset("/favicon.ico") },
      {
        url: versionedAsset("/favicon-32x32.png"),
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: versionedAsset("/favicon-16x16.png"),
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: versionedAsset("/favicon.svg"),
        type: "image/svg+xml",
      },
    ],
    shortcut: versionedAsset("/favicon.ico"),
    apple: [
      {
        url: versionedAsset("/apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: versionedAsset("/safari-pinned-tab.svg"),
        color: "#F05F5E",
      },
    ],
  },
  openGraph: {
    title: "TCCG Work | Construction Operations Platform",
    description:
      "Dynamic work board for TCCG smart HVAC, BIM, ESG, and construction field execution.",
    url: "https://tccg.work",
    siteName: "TCCG Work",
    images: [
      {
        url: versionedAsset("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "TCCG Work construction operations platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TCCG Work | Construction Operations Platform",
    description:
      "Dynamic work board for TCCG smart HVAC, BIM, ESG, and construction field execution.",
    images: [versionedAsset("/og-image.png")],
  },
  other: {
    "msapplication-TileColor": "#10151B",
    "msapplication-TileImage": versionedAsset("/mstile-150x150.png"),
    "msapplication-config": versionedAsset("/browserconfig.xml"),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10151B",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href={versionedAsset("/manifest.webmanifest")} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
