import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "PurePrompts - The Open Prompt Gallery",
    template: "%s | PurePrompts",
  },
  description: "The Open Prompt Gallery Ecosystem. Discover, share, and explore the best prompts for AI models.",
  keywords: ["prompts", "AI", "ChatGPT", "Midjourney", "gallery", "pureprompts", "prompt engineering"],
  authors: [{ name: "PurePrompts" }],
  creator: "PurePrompts",
  metadataBase: new URL("https://pureprompts.net"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pureprompts.net",
    title: "PurePrompts - The Open Prompt Gallery",
    description: "The Open Prompt Gallery Ecosystem. Discover, share, and explore the best prompts for AI models.",
    siteName: "PurePrompts",
  },
  twitter: {
    card: "summary_large_image",
    title: "PurePrompts - The Open Prompt Gallery",
    description: "The Open Prompt Gallery Ecosystem. Discover, share, and explore the best prompts for AI models.",
    creator: "@pureprompts",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/cookie-consent";

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
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <CookieConsent />
          </ThemeProvider>
      </body>
    </html>
  );
}
