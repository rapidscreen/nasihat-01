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
  title: "Nasihat.ai - AI-Powered Career Advisor",
  description: "Your intelligent career companion powered by AI. Get personalized job recommendations, career insights, and professional guidance.",
  keywords: "AI, career advisor, job search, nasihat, artificial intelligence, career guidance, job recommendations, professional development",
  authors: [{ name: "Nasihat.ai Team" }],
  creator: "Nasihat.ai",
  publisher: "Nasihat.ai",
  robots: "index, follow",
  icons: {
    icon: [
      {
        url: "/icons/nasihat.ai-white-mode.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icons/nasihat.ai-dark-mode.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      }
    ],
    shortcut: "/icons/nasihat.ai-white-mode.svg",
    apple: "/icons/nasihat.ai-white-mode.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nasihat.ai",
    title: "Nasihat.ai - AI-Powered Career Advisor",
    description: "Your intelligent career companion powered by AI. Find your dream job with personalized guidance.",
    siteName: "Nasihat.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasihat.ai - AI-Powered Career Advisor",
    description: "Your intelligent career companion powered by AI. Find your dream job with personalized guidance.",
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
