import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { Footer } from "@/components/footer";
import { Lexend_Deca } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SkipToMainContentLink } from "@/components/main";
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
          href="/favicons/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Sudoku" />
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
