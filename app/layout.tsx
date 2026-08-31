import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
  title: {
    default: "eYRC Command Center",
    template: "%s | eYRC Command Center",
  },
  description: "Centralized platform for managing e-Yantra Robotics Competition teams",
  keywords: ["eYRC", "robotics", "competition", "team management", "e-Yantra"],
  authors: [{ name: "eYRC Coordinator" }],
  creator: "eYRC Coordinator",
  publisher: "eYRC Command Center",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://eyrc-command.vercel.app",
    siteName: "eYRC Command Center",
    title: "eYRC Command Center",
    description: "Centralized platform for managing e-Yantra Robotics Competition teams",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "eYRC Command Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eYRC Command Center",
    description: "Centralized platform for managing e-Yantra Robotics Competition teams",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}