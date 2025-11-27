// app/ebook-dropshipping/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer un ebook pour le dropshipping | Ebook Factory",
  description:
    "Apprends à créer un ebook comme produit digital pour ta boutique de dropshipping. Marges élevées, pas de stock, pas de SAV.",
};

export default function EbookDropshippingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          Dropshipping
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Comment créer un ebook pour le dropshipping
        </h1>
        <p className="text-muted-foreground">
          Un ebook est un produit parfait pour une boutique de dropshipping :
          digital, immédiat, marge maximale. Tu peux le vendre seul ou en
          complément de tes produits physiques.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Pourquoi un ebook est un excellent produit digital
        </h2>
        <p>
          Pas de stock, pas de logistique, pas de frais de transport. Tu le crées
          une fois, tu le vends en automatique autant de fois que tu veux.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Exemples d’ebooks à vendre sur ta boutique
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Guide d’utilisation avancé de ton produit</li>
          <li>Programme d’exercices lié à un produit fitness</li>
          <li>Recettes autour d’un ustensile de cuisine</li>
          <li>Conseils de style pour un produit mode</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Comment créer un ebook clé en main
        </h2>
        <p>
          Tu définis ton angle, tu génères le contenu avec Ebook Factory, tu
          ajoutes quelques images, une couverture, et tu connectes le PDF à ton
          système de livraison automatique (Shopify, WooCommerce, etc.).
        </p>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Ajoute un ebook à ta boutique
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Crée ton premier produit 100 % digital en quelques minutes.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Générer mon ebook dropshipping
        </a>
      </section>
    </main>
  );
}
