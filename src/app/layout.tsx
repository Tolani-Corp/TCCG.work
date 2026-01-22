import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "TC Construction Group | Smart HVAC & ESG Construction",
    template: "%s | TCCG",
  },
  description:
    "Building Beyond - Smart HVAC installations and ESG-compliant construction services. Web3-enabled contract monitoring and sustainable practices.",
  keywords: [
    "HVAC",
    "construction",
    "ESG",
    "sustainable building",
    "smart HVAC",
    "IoT",
    "LEED",
    "Tolani Corp",
  ],
  authors: [{ name: "TC Construction Group" }],
  creator: "Tolani Corp",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tccg.work",
    siteName: "TC Construction Group",
    title: "TC Construction Group | Building Beyond",
    description: "Smart HVAC & ESG Construction Solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TC Construction Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TC Construction Group | Building Beyond",
    description: "Smart HVAC & ESG Construction Solutions",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
