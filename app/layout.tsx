import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Hind_Mysuru } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { PageViewTracker } from "./components/PageViewTracker";

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
    "The Portable Life - Digital nomad travel guides and remote work adventures. Discover the best destinations for working and traveling, with honest tips from a remote-working duo.",
  keywords: [
    "digital nomad",
    "remote work travel",
    "travel guides",
    "digital nomad destinations",
    "remote work friendly",
    "travel blog",
    "work and travel",
    "nomad lifestyle",
    "The Portable Life",
  ],
  authors: [{ name: "The Portable Life" }],
  creator: "The Portable Life",
  publisher: "The Portable Life",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://theportablelife.blog"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://theportablelife.blog",
    siteName: "The Portable Life",
    title:
      "The Portable Life | Digital Nomad Travel Guides & Remote Work Adventures",
    description:
      "Honest travel guides and digital nomad tips from a remote-working duo. Discover the best destinations for working and traveling around the world.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The Portable Life | Digital Nomad Travel Guides & Remote Work Adventures",
    description:
      "Honest travel guides and digital nomad tips from a remote-working duo. Discover the best destinations for working and traveling around the world.",
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
              send_page_view: false,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              cookie_domain: 'auto',
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
      </head>
      <body className="font-sans font-light text-darkText m-0 p-0 overflow-x-hidden">
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
