// app/idees-ebook-a-vendre/page.tsx
import type { Metadata } from "next";

export const metadata = {
  title: "Idées d’ebooks à vendre en 2025 | Ebook Factory",
  description:
    "Découvre les meilleurs sujets d’ebooks à vendre : business, fitness, développement personnel et side hustles.",

  openGraph: {
    title: "Idées d’ebooks à vendre en 2025",
    description:
      "Liste des ebooks rentables à créer et vendre cette année.",
    url: "/idees-ebook-a-vendre",
    images: [
      { url: "/images/og/default.webp", width: 1200, height: 630 },
    ],
  },

  twitter: {
    title: "Idées d’ebooks rentables 2025",
    description: "Les sujets qui se vendent le mieux cette année.",
    images: ["/images/og/default.webp"],
  },
};


export default function IdeesEbookAVendrePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          Idées d’ebooks
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Les meilleures idées d’ebook à vendre en 2025
        </h1>
        <p className="text-muted-foreground">
          Tu veux vendre un ebook mais tu ne sais pas sur quoi écrire ? Voici
          des idées concrètes, organisées par thématique.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Ebooks business</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Guide pour lancer un side hustle rentable</li>
          <li>Stratégies pour trouver ses premiers clients en freelance</li>
          <li>Checklist pour lancer une boutique en ligne</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Ebooks fitness / nutrition</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Programme 4 semaines pour débutants</li>
          <li>Plan de repas simple pour perdre du poids</li>
          <li>Guide “salle de sport sans se ridiculiser”</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Ebooks développement personnel
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Routine pour reprendre le contrôle de ses journées</li>
          <li>Journal guidé sur 30 jours</li>
          <li>Mini ebook sur la gestion du stress</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Ebooks “side hustles”</h2>
        <p>
          Tout ce qui montre une méthode concrète pour gagner un peu plus d&apos;argent,
          sans promesse irréaliste, a du potentiel.
        </p>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Tu as une idée ? Transformons-la en ebook.
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Saisis ton idée dans Ebook Factory, l’IA te propose directement la
          structure et le contenu.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Créer mon ebook maintenant
        </a>
      </section>
    </main>
  );
}
