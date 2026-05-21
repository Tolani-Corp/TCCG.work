import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Shell } from "@/components/Shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TCCG Work | Construction Operations Platform",
  description:
    "A construction operations platform for TCCG open jobs, DAO tasks, BIM coordination, smart HVAC delivery, field crews, safety, and ESG closeout.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "TCCG Work | Construction Operations Platform",
    description:
      "Dynamic work board for TCCG smart HVAC, BIM, ESG, and construction field execution.",
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
