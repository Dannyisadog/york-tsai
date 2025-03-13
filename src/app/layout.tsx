import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import styles from "./layout.module.css";
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "York Tsai",
  description: "York Tsai's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${styles.container} ${geistSans.variable} ${geistMono.variable}`}
      >
        <AppRouterCacheProvider>
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
