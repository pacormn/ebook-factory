// app/creer-ebook-pour-tiktok/page.tsx
import type { Metadata } from "next";

export const metadata = {
  title: "Créer un ebook pour TikTok (Méthode 2025) | Ebook Factory",
  description:
    "Apprends à créer un ebook optimisé TikTok rapidement grâce à l’IA. Guide complet 2025.",
    
  openGraph: {
    title: "Créer un ebook TikTok en 2025 | Ebook Factory",
    description:
      "Méthode simple pour créer un ebook viral TikTok grâce à l’IA. Explications, exemples et étapes.",
    url: "https://ebookfactory.com/creer-ebook-pour-tiktok",
    siteName: "Ebook Factory",
    images: [
      {
        url: "https://ebook-factory.fr/images/ebook-factory-cover.webp",
        width: 1200,
        height: 630,
        alt: "Créer un ebook TikTok avec l’IA",
      },
    ],
    locale: "fr_FR",
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title: "Créer un ebook pour TikTok | Ebook Factory",
    description:
      "Découvre comment créer un ebook TikTok viral grâce à l'intelligence artificielle.",
    images: ["https://ebookfactory.fr/images/ebook-factory-cover.webp"],
  },
};


export default function CreerEbookPourTikTokPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          Guide TikTok
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Comment créer un ebook pour TikTok en moins de 10 minutes
        </h1>
        <p className="text-muted-foreground">
          TikTok est plein de créateurs qui vendent des PDF, des guides et des
          “méthodes secrètes”. La bonne nouvelle : tu peux faire pareil, sans
          écrire pendant des semaines.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Pourquoi vendre un ebook sur TikTok ?
        </h2>
        <p>
          TikTok t&apos;apporte du trafic gratuit si tu postes régulièrement. Un
          ebook est le produit parfait : 100 % digital, marge quasi totale, pas
          de stock, pas de logistique. Une fois créé, tu peux le vendre encore
          et encore.
        </p>
        <p>
          Tu peux le proposer en bio, en lien dans ton mini-site ou en bonus
          dans une offre plus grande. L&apos;important est d&apos;avoir un{" "}
          <strong>produit clair et simple à expliquer en 10–20 secondes</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Idées d’ebooks qui se vendent bien sur TikTok
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>“Plan exact pour poster 3 vidéos par jour”</li>
          <li>“Script de 30 hooks TikTok prêts à copier-coller”</li>
          <li>“Comment monétiser un compte de 0 à 1000€ / mois”</li>
          <li>“Pack idées de contenu pour X niche (fitness, business, beauté)”</li>
        </ul>
        <p>
          L&apos;objectif : <strong>un résultat concret</strong> pour ton
          lecteur, présenté de façon simple et rapide.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Étapes simples pour créer un ebook avec Ebook Factory
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Choisis un sujet très précis, avec une promesse claire.</li>
          <li>
            Ouvre Ebook Factory et génère la structure + le contenu avec
            l&apos;assistant IA.
          </li>
          <li>Personnalise les exemples et ajoute ton expérience.</li>
          <li>Génère une couverture pro en quelques clics.</li>
          <li>Exporte en PDF et teste ton ebook auprès de ton audience.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Comment publier ton ebook sur TikTok et faire des ventes
        </h2>
        <p>
          Poste des vidéos courtes où tu montres le résultat : aperçu de ton
          ebook, témoignages, récap de ce que les gens vont apprendre. Termine
          chaque vidéo par un appel à l&apos;action clair :{" "}
          <em>“Lien en bio pour télécharger l&apos;ebook”</em>.
        </p>
        <p>
          Tu peux héberger ton ebook sur Gumroad, Shopify, ou directement via
          ton propre site avec un checkout Stripe.
        </p>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Prêt à lancer ton ebook TikTok ?
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Génère ton ebook complet (texte + structure + couverture + PDF) en
          quelques minutes avec Ebook Factory.
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
