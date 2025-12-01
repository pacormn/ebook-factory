import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Fonts Google optimisées
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// 🔵 METADATA SEO MAXIMISÉE
export const metadata: Metadata = {
  title: {
    default: "Ebook Factory — Crée ton ebook en 5 secondes",
    template: "%s | Ebook Factory",
  },

  description:
    "Crée un ebook professionnel unique, prêt à vendre, en moins de 5 secondes avec l'IA. Idéal pour TikTok, dropshipping, créateurs et infopreneurs.",

  keywords: [
    "ebook",
    "create ebook",
    "ebook IA",
    "ebook generator",
    "tiktok ebook",
    "ebook dropshipping",
    "make money online",
    "ebook factory",
    "business digital",
    "produit digital",
  ],

  metadataBase: new URL("https://ebookfactory.fr"),

  // ✔️ FAVICONS — 100% compliance Google
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  // 🟦 OPEN GRAPH — Facebook / Instagram / LinkedIn / Discord
  openGraph: {
    title: "Ebook Factory — Crée ton ebook instantanément",
    description:
      "Génère un ebook ultra professionnel et prêt à vendre grâce à l'IA. Sans design, sans rédaction.",
    url: "https://ebookfactory.fr",
    type: "website",
    siteName: "Ebook Factory",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aperçu Ebook Factory",
      },
    ],
  },

  // 🐦 TWITTER CARDS — X.com
  twitter: {
    card: "summary_large_image",
    title: "Ebook Factory — Crée ton ebook instantanément",
    description:
      "Génère un ebook professionnel et vendable immédiatement en quelques secondes.",
    images: ["/og-image.png"],
  },

  // 📱 Mobile + PWA feel
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7233790737306042"
     crossorigin="anonymous"></script></body>
      <head>
        {/* Préload de la police principale (perf + SEO) */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Police fallback élégante */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased
          bg-white text-gray-900 
          dark:bg-gray-950 dark:text-gray-50
        `}
      >
        {/* FILTRE pour glassmorphism global */}
        <svg width="0" height="0" className="absolute pointer-events-none">
          <filter id="frosted">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            <feColorMatrix
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7
              "
            />
          </filter>
        </svg>

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
