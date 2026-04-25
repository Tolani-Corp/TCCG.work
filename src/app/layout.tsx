import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Shell } from "@/components/Shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TC Construction Group | Smart HVAC, ESG, and Commercial Delivery",
  description:
    "TC Construction Group delivers smart HVAC modernization, ESG-aligned construction, and disciplined commercial execution across the Tolani ecosystem.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "TC Construction Group | Building Beyond",
    description:
      "Official TC Construction Group site for smart HVAC, ESG construction, and commercial delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
