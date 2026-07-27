import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Shell } from "@/components/Shell";
import { versionedAsset } from "@/lib/brandAssets";
import { TCCG_CONTACT } from "@/lib/contact";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(TCCG_CONTACT.domain),
  applicationName: "TC Construction Group",
  title: {
    default: "TC Construction Group | Commercial Building Modernization",
    template: "%s | TC Construction Group",
  },
  description:
    "Commercial building modernization, HVAC and controls coordination, BIM and MEP support, renovation planning, smart-building integration, and public-sector opportunity review.",
  keywords: [
    "commercial construction",
    "building modernization",
    "HVAC modernization",
    "building controls",
    "BIM coordination",
    "MEP coordination",
    "commercial renovation",
    "South Florida contractor",
  ],
  authors: [{ name: "TC Construction Group" }],
  creator: "TC Construction Group",
  publisher: "TC Construction Group",
  category: "construction",
  alternates: { canonical: TCCG_CONTACT.domain },
  openGraph: {
    title: "TC Construction Group | Modernize Buildings. Coordinate Work. Deliver Proof.",
    description:
      "Commercial facility modernization, HVAC, controls, BIM and MEP coordination, project support, and public-sector opportunity review.",
    url: TCCG_CONTACT.domain,
    siteName: "TC Construction Group",
    images: [
      {
        url: versionedAsset("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "TC Construction Group commercial building modernization",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TC Construction Group | Commercial Building Modernization",
    description: "HVAC, controls, BIM coordination, renovation planning, and accountable project delivery.",
    images: [versionedAsset("/og-image.png")],
  },
  icons: {
    icon: [
      { url: versionedAsset("/favicon.ico") },
      { url: versionedAsset("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: versionedAsset("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
      { url: versionedAsset("/favicon.svg"), type: "image/svg+xml" },
    ],
    shortcut: versionedAsset("/favicon.ico"),
    apple: [{ url: versionedAsset("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: versionedAsset("/safari-pinned-tab.svg"), color: "#DC2626" }],
  },
  formatDetection: { telephone: true, email: true, address: false },
  other: {
    "msapplication-TileColor": "#0F172A",
    "msapplication-TileImage": versionedAsset("/mstile-150x150.png"),
    "msapplication-config": versionedAsset("/browserconfig.xml"),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
  colorScheme: "light",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: TCCG_CONTACT.legalName,
  alternateName: TCCG_CONTACT.brandName,
  url: TCCG_CONTACT.domain,
  logo: `${TCCG_CONTACT.domain}/logo.svg`,
  telephone: TCCG_CONTACT.phone.e164,
  email: TCCG_CONTACT.email,
  parentOrganization: {
    "@type": "Organization",
    name: "Tolani Corp",
    url: "https://tolanicorp.us",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "project intake",
    telephone: TCCG_CONTACT.phone.e164,
    email: TCCG_CONTACT.email,
    areaServed: "US",
    availableLanguage: ["English"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href={versionedAsset("/manifest.webmanifest")} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
