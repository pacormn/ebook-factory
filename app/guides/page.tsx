// app/guides/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides & Ressources | Ebook Factory",
  description:
    "Accède à tous les guides pour créer, générer et vendre des ebooks avec des stratégies simples et efficaces.",
};

const guides = [
  {
    title: "Créer un ebook pour TikTok",
    description:
      "Apprends à créer un ebook optimisé pour TikTok en moins de 10 minutes.",
    href: "/creer-ebook-pour-tiktok",
  },
  {
    title: "Générer un ebook avec l’IA",
    description:
      "Découvre comment générer un ebook complet automatiquement.",
    href: "/generer-ebook-ia",
  },
  {
    title: "Idées d’ebooks à vendre en 2025",
    description:
      "Inspiration : les sujets d’ebooks rentables à vendre cette année.",
    href: "/idees-ebook-a-vendre",
  },
  {
    title: "Faire un ebook professionnel",
    description:
      "Comment créer un ebook pro sans compétences techniques.",
    href: "/faire-un-ebook-professionnel",
  },
  {
    title: "Ebook pour le dropshipping",
    description:
      "Crée un ebook comme produit digital pour ta boutique.",
    href: "/ebook-dropshipping",
  },
  {
    title: "Créer un ebook PDF gratuitement",
    description:
      "Génère un ebook PDF propre et lisible rapidement.",
    href: "/creer-ebook-pdf-gratuit",
  },
  {
    title: "Comment vendre un ebook",
    description:
      "Découvre comment vendre ton ebook sur diverses plateformes.",
    href: "/vendre-un-ebook",
  },
  {
    title: "Erreurs à éviter quand on crée un ebook",
    description:
      "Les 10 erreurs à éviter pour réussir ton ebook.",
    href: "/erreurs-creation-ebook",
  },
  {
    title: "Créer un ebook pour son business en ligne",
    description:
      "Utilise un ebook pour booster ton business et ton autorité.",
    href: "/ebook-business-en-ligne",
  },
  {
    title: "Écrire un ebook quand on n’a pas d’idées",
    description:
      "Trouve un sujet et écris ton ebook même si tu débutes.",
    href: "/ecrire-ebook-sans-idees",
  },
];

export default function GuidesIndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10 space-y-2 text-center">
        <h1 className="text-4xl font-bold">Guides & Ressources</h1>
        <p className="text-muted-foreground">
          Tous nos guides pour créer, vendre et automatiser tes ebooks.
        </p>
      </header>

      <Image
          src="/images/ebook-factory-cover.webp"
          width={1200}
          height={630}
          alt="Créer un ebook professionnel rapidement avec l'IA"
          className="rounded-lg border"
        />

      <div className="grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="group rounded-xl border bg-card p-6 transition hover:shadow-lg"
          >
            <h2 className="mb-1 text-xl font-semibold group-hover:text-yellow-500">
              {guide.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Retour à l’outil Ebook Factory
        </Link>
      </div>
      <section className="mt-12 space-y-2">
  <h3 className="text-lg font-semibold">Autres guides utiles</h3>
  <ul className="list-disc pl-5 space-y-1">
    <li><Link href="/creer-ebook-pour-tiktok">Créer un ebook pour TikTok</Link></li>
    <li><Link href="/generer-ebook-ia">Générer un ebook avec l’IA</Link></li>
    <li><Link href="/idees-ebook-a-vendre">Idées d’ebooks à vendre</Link></li>
    {/* etc */}
  </ul>
</section>
    </main>
  );
}
