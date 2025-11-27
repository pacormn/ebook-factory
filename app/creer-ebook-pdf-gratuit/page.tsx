// app/creer-ebook-pdf-gratuit/page.tsx
import type { Metadata } from "next";
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Créer un ebook PDF gratuitement | Ebook Factory",
  description:
    "Crée un ebook PDF gratuitement avec un générateur simple en 2025 : structure, contenu et export en PDF pro.",
};

export default function CreerEbookPdfGratuitPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          PDF gratuit
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Créer un ebook PDF gratuitement : guide complet
        </h1>
        <p className="text-muted-foreground">
          Tu n&apos;as pas besoin de logiciels compliqués pour créer un PDF
          propre. Quelques clics suffisent pour générer un ebook lisible sur
          mobile et ordinateur.
        </p>
      </header>

      

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Modèles gratuits</h2>
        <p>
          Ebook Factory propose des structures d&apos;ebook adaptées à différents
          usages : guides pratiques, checklists, tutos pas-à-pas, etc.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Création avec Ebook Factory
        </h2>
        <p>
          Tu choisis un modèle, renseignes ton sujet et ton audience, et
          l&apos;assistant IA génère le contenu. Tu peux ensuite le modifier,
          l&apos;alléger ou le détailler.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Export en PDF haute qualité</h2>
        <p>
          Un bouton, et ton ebook est exporté en PDF propre avec titres,
          paragraphes et mise en forme uniforme. Il est prêt à être proposé en
          téléchargement gratuit ou payant.
        </p>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Crée ton ebook PDF maintenant
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Commence gratuitement, teste un premier ebook, et améliore-le au fil
          du temps.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Créer mon PDF gratuit
        </a>
      </section>
    </main>
  );
}
