// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ebookfactory.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Pages SEO
    { url: `${baseUrl}/creer-ebook-pour-tiktok`, lastModified: new Date() },
    { url: `${baseUrl}/generer-ebook-ia`, lastModified: new Date() },
    { url: `${baseUrl}/idees-ebook-a-vendre`, lastModified: new Date() },
    { url: `${baseUrl}/faire-un-ebook-professionnel`, lastModified: new Date() },
    { url: `${baseUrl}/ebook-dropshipping`, lastModified: new Date() },
    { url: `${baseUrl}/creer-ebook-pdf-gratuit`, lastModified: new Date() },
    { url: `${baseUrl}/vendre-un-ebook`, lastModified: new Date() },
    { url: `${baseUrl}/erreurs-creation-ebook`, lastModified: new Date() },
    { url: `${baseUrl}/ebook-business-en-ligne`, lastModified: new Date() },
    { url: `${baseUrl}/ecrire-ebook-sans-idees`, lastModified: new Date() },

    // Ajoute ici d'autres pages (pricing, login, builder, etc.)
  ];
}
