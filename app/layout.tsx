import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nasihat.ai - AI-Powered Advisory Platform",
  description: "Your intelligent advisory companion powered by AI. Get personalized insights and recommendations.",
  keywords: "AI, advisory, nasihat, artificial intelligence, recommendations, insights",
  authors: [{ name: "Nasihat.ai Team" }],
  creator: "Nasihat.ai",
  publisher: "Nasihat.ai",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nasihat.ai",
    title: "Nasihat.ai - AI-Powered Advisory Platform",
    description: "Your intelligent advisory companion powered by AI",
    siteName: "Nasihat.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasihat.ai - AI-Powered Advisory Platform",
    description: "Your intelligent advisory companion powered by AI",
    creator: "@nasihatai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
