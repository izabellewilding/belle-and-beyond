import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Hind_Mysuru } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// ✅ Load local fonts
const cabinetGrotesk = localFont({
  src: [
    {
      path: "./fonts/CabinetGrotesk_Complete/CabinetGrotesk-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk_Complete/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk_Complete/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk_Complete/CabinetGrotesk-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk_Complete/CabinetGrotesk-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk_Complete/CabinetGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk_Complete/CabinetGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk_Complete/CabinetGrotesk-Thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

// ✅ Load Playfair Display font
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// ✅ Load Hind Mysuru font for body text (multiple weights)
const hindMysuru = Hind_Mysuru({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hind-mysuru",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Portable Life | Travel Blog & Travel Guides",
    template: "%s | The Portable Life",
  },
  description:
    "The Portable Life - Your ultimate travel blog and travel guides. Discover inspiring destinations, travel tips, and photography from around the world. Expert travel guides to help you plan your next adventure.",
  keywords: [
    "travel blog",
    "travel guides",
    "The Portable Life",
    "travel photography",
    "travel tips",
    "destination guides",
    "travel advice",
    "adventure travel",
  ],
  authors: [{ name: "The Portable Life" }],
  creator: "The Portable Life",
  publisher: "The Portable Life",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com",
    siteName: "The Portable Life",
    title: "The Portable Life | Travel Blog & Travel Guides",
    description:
      "Your ultimate travel blog and travel guides. Discover inspiring destinations, travel tips, and photography from around the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Portable Life | Travel Blog & Travel Guides",
    description:
      "Your ultimate travel blog and travel guides. Discover inspiring destinations, travel tips, and photography from around the world.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Google Analytics ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-2DZ5GVQ2FF";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hindMysuru.variable} ${playfairDisplay.variable}`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `}
        </Script>
      </head>
      <body className="font-sans font-light text-darkText m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
