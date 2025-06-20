import type { Metadata } from "next";
import { Julius_Sans_One } from "next/font/google"; // ← ✅ use Julius Sans One
import "./globals.css";
import Script from "next/script";

// Load the font
const juliusSansOne = Julius_Sans_One({
  variable: "--font-julius-sans-one",
  subsets: ["latin"],
  weight: "400", // Only 400 is available for this font
});

export const metadata: Metadata = {
  title: "Belle and Beyond",
  description: "Travel blog and photography",
};

// Google Analytics ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-2DZ5GVQ2FF';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={juliusSansOne.variable}>
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
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
