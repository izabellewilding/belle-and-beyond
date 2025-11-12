import type { Metadata } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "Izzia Travel",
  description: "Travel blog and photography",
};

// Google Analytics ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-2DZ5GVQ2FF";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cabinetGrotesk.variable}>
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
      <body className="font-sans text-neutral-800 bg-[#e4e2e3]">
        {children}
      </body>
    </html>
  );
}
