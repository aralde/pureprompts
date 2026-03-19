import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://pureprompts.net";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PurePrompts — AI Prompt Gallery & Library",
    template: "%s | PurePrompts",
  },
  description:
    "Discover, copy, and explore thousands of curated AI prompts for ChatGPT, Claude, Gemini, Midjourney, and more. The open-source prompt gallery ecosystem.",
  keywords: [
    "AI prompts",
    "prompt library",
    "prompt gallery",
    "ChatGPT prompts",
    "Claude prompts",
    "Gemini prompts",
    "Midjourney prompts",
    "image prompts",
    "coding prompts",
    "prompt engineering",
    "LLM prompts",
    "prompt templates",
    "AI writing prompts",
    "AI art prompts",
    "system prompts",
    "open source prompts",
    "pureprompts",
    "free AI prompts",
    "best AI prompts",
    "prompt collection",
  ],
  authors: [{ name: "PurePrompts", url: BASE_URL }],
  creator: "PurePrompts",
  publisher: "PurePrompts",
  applicationName: "PurePrompts",
  referrer: "origin-when-cross-origin",
  category: "technology",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "PurePrompts — AI Prompt Gallery & Library",
    description:
      "Discover, copy, and explore thousands of curated AI prompts for ChatGPT, Claude, Gemini, Midjourney, and more.",
    siteName: "PurePrompts",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PurePrompts — AI Prompt Gallery & Library",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PurePrompts — AI Prompt Gallery & Library",
    description:
      "Discover, copy, and explore thousands of curated AI prompts for ChatGPT, Claude, Gemini, Midjourney, and more.",
    creator: "@pureprompts",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192" }],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data — injected server-side so crawlers can read it
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PurePrompts",
  alternateName: "PurePrompts AI Prompt Gallery",
  url: BASE_URL,
  description:
    "The open-source AI prompt gallery ecosystem. Discover, share, and explore curated prompts for ChatGPT, Claude, Gemini, Midjourney, and more.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PurePrompts",
  url: BASE_URL,
  logo: `${BASE_URL}/icon-512.png`,
  sameAs: ["https://github.com/pureprompts"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
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
