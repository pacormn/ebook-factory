// app/vendre-un-ebook/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment vendre un ebook en ligne | Ebook Factory",
  description:
    "Apprends à vendre ton ebook en ligne même si tu débutes : plateformes, prix, tunnel simple et conseils.",
};

export default function VendreUnEbookPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          Vendre son ebook
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Comment vendre un ebook en ligne (même débutant)
        </h1>
        <p className="text-muted-foreground">
          Tu as un ebook ou un projet d&apos;ebook ? Voici comment le vendre,
          étape par étape, sans avoir besoin d&apos;un énorme audience.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Où vendre son ebook : les plateformes
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Gumroad</li>
          <li>Amazon KDP</li>
          <li>Shopify ou WooCommerce</li>
          <li>Ton propre site avec Stripe</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Comment fixer le prix</h2>
        <p>
          La plupart des ebooks se vendent entre 7€ et 47€. L&apos;important est
          de proposer un résultat concret et d&apos;expliquer clairement la
          valeur du contenu.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Les stratégies qui marchent vraiment
        </h2>
        <p>
          Crée une offre simple : une page, une promesse, un bouton. Ajoute des
          preuves sociales au fur et à mesure (screens, retours, avis, etc.).
        </p>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Besoin d’un ebook à vendre ?
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Génère ton ebook complet aujourd&apos;hui et commence à le vendre dès
          que tu as tes premières pages de vente prêtes.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Créer mon ebook à vendre
        </a>
      </section>
    </main>
  );
}
