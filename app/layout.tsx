import type { Metadata } from "next";
import { Providers } from "./providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AddToHomeScreen } from "@/components/AddToHomeScreen";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudoku by Avery Ondo",
  description: "A Sudoku game built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicons/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Sudoku" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="w-full min-h-dvh grid grid-rows-[max-content_1fr] px-2 md:px-4">
            <Header />
            <div className="flex items-center pb-8 md:items-start justify-center h-full">
              {children}
            </div>
            <AddToHomeScreen />
            <Footer />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
