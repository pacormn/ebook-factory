import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ebook Factory — Crée ton ebook en un clic",
  description:
    "Ebook Factory est l’outil le plus simple pour créer des ebooks uniques, prêts à vendre, en quelques secondes. Idéal pour les créateurs, formateurs et marketers.",
  keywords: [
    "ebook",
    "ebook generator",
    "create ebook",
    "ebook business",
    "tiktok ebook",
    "dropshipping ebook",
    "make money online",
    "ebook factory",
  ],

  metadataBase: new URL("https://ebookfactory.fr"),

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Ebook Factory — Génère ton ebook automatiquement",
    description:
      "Crée un ebook professionnel et prêt à vendre automatiquement. Aucun design, aucune rédaction nécessaire.",
    url: "https://ebookfactory.fr",
    siteName: "Ebook Factory",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ebook Factory Preview",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ebook Factory — Crée ton ebook instantanément",
    description:
      "Transforme tes idées en ebook prêt à vendre en quelques secondes.",
    images: ["/og-image.png"],
  },

  themeColor: "#0d74e7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50`}
      >
        {/* Filter for liquid glass (if you use url(#frosted) un jour) */}
        <svg width="0" height="0" className="absolute pointer-events-none">
          <filter id="frosted">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </svg>

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}