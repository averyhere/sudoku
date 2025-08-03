import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { Footer } from "@/components/Footer";
import { Lexend_Deca } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SkipToMainContentLink } from "@/components/Main";
import "./globals.css";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

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
          href="/icons/ios-light.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/ios-dark.png"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="apple-mobile-web-app-title" content="Sudoku" />
        <link
          rel="apple-touch-startup-image"
          href="/icons/splash-icon-light.png"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/splash-icon-dark.png"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={`${lexendDeca.variable} ${lexendDeca.className}`}>
        <SkipToMainContentLink />
        <Providers>
          <div className="w-full h-full flex items-center justify-center">
            {children}
          </div>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
