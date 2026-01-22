import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TC Construction Group | Smart HVAC & ESG Construction",
  description: "Building Beyond - Smart HVAC installations and ESG-compliant construction services. Part of the Tolani Corp ecosystem.",
  keywords: ["HVAC", "construction", "ESG", "sustainable building", "smart building", "Tolani Corp"],
  authors: [{ name: "TC Construction Group" }],
  openGraph: {
    title: "TC Construction Group",
    description: "Smart HVAC & ESG Construction Solutions",
    url: "https://tccg.work",
    siteName: "TCCG",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
