// app/faire-un-ebook-professionnel/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faire un ebook professionnel facilement | Ebook Factory",
  description:
    "Apprends comment faire un ebook professionnel sans compétences techniques grâce à un générateur intelligent en 2025.",
};

export default function FaireUnEbookProfessionnelPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          Qualité pro
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Comment faire un ebook professionnel facilement
        </h1>
        <p className="text-muted-foreground">
          Un ebook “pro” n&apos;est pas forcément long, mais il doit être clair,
          bien structuré et agréable à lire. Tu peux atteindre ce niveau sans
          designer ni Writer senior.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Choisir un bon sujet</h2>
        <p>
          Plus ton sujet est précis, plus ton ebook est perçu comme expert. Évite
          les sujets trop larges et concentre-toi sur un problème clair à
          résoudre.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Générer le texte</h2>
        <p>
          Avec Ebook Factory, tu réponds à quelques questions de base, et
          l&apos;assistant IA te propose une version complète de ton ebook que
          tu peux ensuite ajuster, raccourcir ou enrichir.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Ajouter une couverture pro</h2>
        <p>
          La couverture est la première impression. Une mise en page simple,
          quelques couleurs bien choisies et un titre clair valent mieux qu’un
          design surchargé.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Exporter en PDF</h2>
        <p>
          Une fois le contenu validé, Ebook Factory génère un PDF propre,
          structuré avec titres, sous-titres et mise en forme cohérente, prêt à
          être vendu ou offert.
        </p>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Passe en mode “auteur pro” en quelques clics
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Tu apportes les idées, Ebook Factory s’occupe de la forme.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Faire mon ebook pro
        </a>
      </section>
    </main>
  );
}
