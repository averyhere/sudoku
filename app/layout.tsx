import type { Metadata } from "next";
import { Providers } from "./providers";
import { Header } from "@/components/header";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="w-full min-h-dvh grid grid-rows-[max-content_1fr] px-2 md:px-4">
            <Header />
            <div className="flex items-center md:items-start justify-center h-full">
              {children}
            </div>
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
