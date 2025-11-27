// app/ebook-business-en-ligne/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer un ebook pour son business en ligne | Ebook Factory",
  description:
    "Utilise un ebook pour booster ton business en ligne : autorité, génération de leads, offres payantes.",
};

export default function EbookBusinessEnLignePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
          Business en ligne
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Comment créer un ebook pour son business en ligne
        </h1>
        <p className="text-muted-foreground">
          Un ebook peut être un lead magnet, un produit d&apos;entrée de gamme ou
          un bonus dans une offre plus chère. Le créer est plus simple que tu ne
          le penses.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">
          Pourquoi un ebook booste ton autorité
        </h2>
        <p>
          Avoir un ebook te positionne comme quelqu&apos;un qui a structuré ses
          idées. C&apos;est un excellent support pour te présenter à une audience
          froide.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Quel format choisir ?</h2>
        <p>
          Guide complet, checklist, plan d’action 30 jours, mini formation
          écrite… choisis le format le plus adapté à ton audience et à ton
          message.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Création automatisée</h2>
        <p>
          Ebook Factory t&apos;aide à générer le contenu de base et à l&apos;organiser.
          Tu peux ensuite intégrer l&apos;ebook dans ton tunnel de vente ou ta
          séquence email.
        </p>
      </section>

      <section className="mt-8 rounded-xl border bg-muted/30 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">
          Ajoute un ebook à ton offre
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Crée un ebook aligné sur ton business en ligne en quelques minutes.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-400"
        >
          Créer mon ebook business
        </a>
      </section>
    </main>
  );
}
