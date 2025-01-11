/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteConfigProvider } from "@/contexts/SiteConfigContext";
import { generateMetadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export { generateMetadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SiteConfigProvider>{children}</SiteConfigProvider>
      </body>
    </html>
  );
}
