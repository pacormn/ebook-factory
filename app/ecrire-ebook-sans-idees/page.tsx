// app/ecrire-ebook-sans-idees/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Écrire un ebook quand on n’a pas d’idées | Ebook Factory",
  description:
    "Découvre comment trouver un sujet et écrire un ebook même si tu penses ne rien avoir à raconter en 2025.",
};

export default function EcrireEbookSansIdeesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          Inspiration
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Comment écrire un ebook quand on n’a pas d’idées
        </h1>
        <p className="text-muted-foreground">
          Tu as l&apos;impression de ne rien avoir à partager ? En réalité, tu
          as déjà des expériences, des compétences ou des systèmes que d&apos;autres
          seraient prêts à payer pour apprendre.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Techniques pour trouver un sujet
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Liste ce que tu sais faire mieux que la moyenne</li>
          <li>Note les problèmes qu’on te demande souvent de résoudre</li>
          <li>Observe les questions qui reviennent sur les réseaux</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Faire écrire le contenu par l’IA
        </h2>
        <p>
          Tu peux partir d&apos;un simple titre ou d&apos;une intention (“aider les
          débutants à…”), puis laisser Ebook Factory générer une première
          version de ton ebook que tu affines ensuite.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Ajouter images, mise en page et structure
        </h2>
        <p>
          Une fois le texte en place, vérifie que ton ebook se lit facilement,
          surtout sur mobile : chapitres courts, listes, visuels si besoin.
        </p>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Transforme une simple idée en ebook
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Commence par un sujet, même flou, et laisse Ebook Factory t&apos;aider à
          construire le reste.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Générer un ebook sans idée
        </a>
      </section>
    </main>
  );
}
