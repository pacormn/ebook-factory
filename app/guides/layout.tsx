import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    siteName: "Ebook Factory",
    locale: "fr_FR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
