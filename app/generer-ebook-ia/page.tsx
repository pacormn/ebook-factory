// app/generer-ebook-ia/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Générer un ebook avec l’IA | Ebook Factory",
  description:
    "Découvre comment générer un ebook complet avec l’intelligence artificielle en 2025 : structure, contenu, mise en page et PDF.",
};

export default function GenererEbookIAPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          IA & Ebooks
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Générer un ebook avec l’IA : la méthode simple
        </h1>
        <p className="text-muted-foreground">
          L&apos;intelligence artificielle te permet de passer de l&apos;idée au
          PDF final en une seule session. Le but n&apos;est plus d&apos;écrire
          tout à la main, mais de guider l&apos;IA.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Pourquoi utiliser l’IA pour créer un ebook ?
        </h2>
        <p>
          L&apos;IA t&apos;aide à gagner du temps sur la rédaction, à structurer
          ton plan et à éviter la page blanche. Tu gardes le contrôle sur le
          ton, les exemples et les conseils, mais tu n&apos;as plus à rédiger
          chaque paragraphe de zéro.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Comment fonctionne Ebook Factory ?
        </h2>
        <p>
          Ebook Factory te demande quelques informations clés : ton sujet, ton
          audience, ton objectif et le style souhaité. À partir de ça, l&apos;IA
          génère :
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Un titre accrocheur</li>
          <li>Une structure de chapitres logique</li>
          <li>Le contenu détaillé de chaque partie</li>
          <li>Une introduction et une conclusion orientées “résultats”</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Exemples d’ebooks générés automatiquement
        </h2>
        <p>
          Tu peux créer des ebooks business, des guides pratiques, des checklists
          détaillées, des plans d&apos;action, voire des mini formations
          écrites. L&apos;important est de viser un{" "}
          <strong>problème précis</strong> à résoudre.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Export en PDF, couverture et mise en page
        </h2>
        <p>
          Une fois satisfait du contenu, Ebook Factory te permet de générer
          automatiquement :
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Une couverture professionnelle</li>
          <li>Un PDF proprement mis en page</li>
          <li>Un fichier prêt à être vendu ou offert</li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Teste la génération d’ebook par IA
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Décris ton idée en une phrase. Ebook Factory s’occupe du reste.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Essayer gratuitement
        </a>
      </section>
    </main>
  );
}
