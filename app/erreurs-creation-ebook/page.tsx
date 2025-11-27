// app/erreurs-creation-ebook/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "10 erreurs à éviter quand on crée un ebook | Ebook Factory",
  description:
    "Évite les erreurs classiques quand tu crées ton ebook : sujet, structure, mise en forme, promotion, CTA.",
};

export default function ErreursCreationEbookPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          Erreurs à éviter
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          10 erreurs à éviter quand on crée un ebook
        </h1>
        <p className="text-muted-foreground">
          La plupart des ebooks ne se vendent pas à cause de quelques erreurs
          simples. Voici celles à éviter.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">1. Sujet trop vague</h2>
        <p>“Tout savoir sur…” ne se vend pas. Choisis un résultat précis.</p>
        <h2 className="text-2xl font-semibold">2. Pas de cible claire</h2>
        <p>Ton ebook doit parler à une personne précise, pas à “tout le monde”.</p>
        <h2 className="text-2xl font-semibold">3. Pas de structure</h2>
        <p>Un ebook sans plan logique est difficile à lire et à suivre.</p>
        <h2 className="text-2xl font-semibold">4. Texte brut sans mise en forme</h2>
        <p>Il faut des titres, sous-titres, listes, encadrés…</p>
        <h2 className="text-2xl font-semibold">
          5. Aucune histoire, que de la théorie
        </h2>
        <p>Ajoute des exemples et des cas concrets.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">
          6–10. Les erreurs “invisibles”
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Pas de conclusion claire</li>
          <li>Pas d&apos;appel à l&apos;action</li>
          <li>Pas de relecture</li>
          <li>Promesse floue</li>
          <li>Pas de test auprès de quelques lecteurs</li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Crée un ebook propre, sans erreurs
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Ebook Factory te guide sur la structure, le ton et la mise en page pour
          éviter ces pièges.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Générer mon ebook maintenant
        </a>
      </section>
    </main>
  );
}
