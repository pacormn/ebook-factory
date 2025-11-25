import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-[-200px] h-[400px] bg-gradient-to-b from-blue-500/40 via-slate-900 to-slate-950 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-bold">
              EF
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              Ebook Factory
            </span>
          </div>

          {/* Nav + CTA */}
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="#features" className="hover:text-slate-100 transition">
              Fonctionnalités
            </Link>
            <Link href="#how-it-works" className="hover:text-slate-100 transition">
              Comment ça marche
            </Link>
            <Link href="#examples" className="hover:text-slate-100 transition">
              Exemples
            </Link>
            <Link href="#pricing" className="hover:text-slate-100 transition">
              Tarifs
            </Link>

            <div className="h-6 w-px bg-slate-700/70" />

            <Link href="/create/title">
              <Button className="rounded-xl bg-blue-600 px-5 text-sm font-medium hover:bg-blue-700">
                Créer un ebook
              </Button>
            </Link>
          </div>

          {/* CTA mobile simple */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/create/title">
              <Button className="rounded-xl bg-blue-600 px-4 text-xs font-medium hover:bg-blue-700">
                Commencer
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-16 md:flex-row md:items-center md:pt-20">
        {/* LEFT TEXT */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-100">
            <Sparkles className="h-3 w-3" />
            <span>Générateur d&apos;ebooks prêt à vendre</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-50 md:text-5xl lg:text-6xl">
            Crée un <span className="text-blue-400">ebook premium</span>{" "}
            qui se vend pendant que tu dors.
          </h1>

          <p className="max-w-xl text-sm text-slate-300 md:text-base">
            Ebook Factory transforme une simple idée en ebook complet, structuré et
            designé. Aucun design, aucune mise en page, aucune galère : tu obtiens
            un PDF prêt à vendre sur TikTok, Instagram, Gumroad et plus encore.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/create/title">
              <Button className="group rounded-2xl bg-blue-600 px-7 py-5 text-sm font-medium shadow-lg shadow-blue-600/40 hover:bg-blue-700 md:text-base">
                Générer mon ebook
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>

            <div className="flex flex-col text-xs text-slate-400 md:text-sm">
              <span>Aperçu gratuit avant achat</span>
              <span>Paye uniquement si le résultat te plaît.</span>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-slate-400 md:text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>Créateurs, infopreneurs & agences déjà conquis.</span>
            </div>
          </div>
        </div>

        {/* RIGHT MOCKUP */}
        <div className="flex flex-1 justify-center">
          <div className="relative h-[360px] w-[260px] md:h-[420px] md:w-[300px]">
            {/* Glow */}
            <div className="absolute -inset-6 rounded-[32px] bg-blue-500/40 blur-3xl" />

            {/* Mockup card */}
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[26px] border border-slate-700/70 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-slate-700/70 px-4 py-3">
                <span className="text-xs font-medium text-slate-200">
                  Ebook généré
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  Prêt à vendre
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 px-4 py-4">
                <div className="space-y-2">
                  <div className="inline-flex rounded-full bg-blue-500/15 px-3 py-1 text-[10px] font-medium text-blue-200">
                    GUIDE ULTIME
                  </div>
                  <h2 className="text-sm font-semibold text-slate-50">
                    10 stratégies pour lancer ton business digital sans budget
                  </h2>
                  <p className="text-[11px] leading-relaxed text-slate-300/90">
                    Découvre les bases pour lancer une offre digitale rentable,
                    même si tu pars de zéro et que tu n&apos;as pas encore de communauté.
                  </p>
                </div>

                <div className="mt-2 space-y-2 text-[11px] text-slate-200/90">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-400" />
                    <span>Chapitres structurés automatiquement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-400" />
                    <span>Design cohérent et professionnel</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-400" />
                    <span>Licence de revente incluse</span>
                  </div>
                </div>

                <div className="mt-auto rounded-2xl bg-slate-900/70 px-3 py-2 text-[10px] text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Format : PDF haute qualité</span>
                    <span className="text-[11px] font-semibold text-blue-300">
                      52 pages
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">
                    Exportable sur Gumroad, Shopify, Notion, etc.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-4 pb-20 pt-6 md:pt-4"
      >
        <div className="mb-10 space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            Tout ce dont tu as besoin pour vendre ton prochain ebook.
          </h2>
          <p className="text-sm text-slate-400 md:text-base">
            Ebook Factory s&apos;occupe de la rédaction, de la structure et du
            design. Tu n&apos;as plus qu&apos;à vendre.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Contenu structuré",
              desc: "Chapitres, sous-parties, exemples, call-to-action… tout est généré pour que ton ebook se lise facilement.",
            },
            {
              title: "Design propre",
              desc: "Mise en page professionnelle, hiérarchie visuelle claire, typographie lisible sur mobile comme sur desktop.",
            },
            {
              title: "Prêt à vendre",
              desc: "Tu reçois un PDF immédiatement exploitable sur Gumroad, Shopify, système d’affiliation ou tunnel de vente.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 md:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="max-w-6xl mx-auto px-6 mt-32">
  <h2 className="text-center text-4xl font-bold mb-16">
    De ton idée… à un ebook professionnel ✨
  </h2>

  {/* GRID 2 COLONNES */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

    {/* ---- COLONNE 1 : IDÉE ---- */}
    <div className="p-8 rounded-2xl bg-white/5 dark:bg-white/10 border border-white/10 backdrop-blur-xl">
      <h3 className="text-lg font-semibold mb-4">Ton idée brute</h3>

      <div className="p-5 rounded-xl bg-black/20 border border-white/10">
        “Je voudrais créer un ebook sur comment les débutants peuvent lancer un
        business rentable en 2025 sans argent.”
      </div>

      <p className="mt-3 text-sm text-gray-400">
        → Tu écris juste une idée comme ça.
      </p>
    </div>

    {/* ---- COLONNE 2 : RÉSULTAT ---- */}
    <div className="p-8 rounded-2xl bg-white/5 dark:bg-white/10 border border-white/10 backdrop-blur-xl">
      <h3 className="text-lg font-semibold mb-6">Résultat généré</h3>

      <div className="w-full flex justify-center">
        <div className="relative w-[300px] h-[420px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-b from-blue-400 to-blue-600">
          <span className="absolute top-3 left-3 text-xs bg-black/40 px-2 py-1 rounded">
            Ebook généré
          </span>
          <span className="absolute top-3 right-3 text-xs bg-black/40 px-2 py-1 rounded">
            Business
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-400">
        → Ebook complet : 7 chapitres + plan d’action + design cohérent.
      </p>
    </div>

  </div>
</section>


      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-4 pb-20 pt-4 md:pt-2"
      >
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            3 étapes. Moins d&apos;une minute.
          </h2>
          <p className="mt-2 text-sm text-slate-400 md:text-base">
            Tu n&apos;as besoin que d&apos;une idée de thème ou d&apos;une niche.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Décris ton idée",
              desc: "Explique rapidement ta niche, ton angle ou ton audience. Ebook Factory propose des titres vendeurs automatiquement.",
            },
            {
              step: "02",
              title: "Personnalise les réglages",
              desc: "Choisis le ton, la longueur, le niveau de profondeur, et laisse l’IA générer le contenu et la structure.",
            },
            {
              step: "03",
              title: "Prévisualise, puis télécharge",
              desc: "Tu vois l’aperçu avant d’acheter. Si ça te convient, tu récupères ton PDF pro + licence de revente.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <span className="text-xs font-semibold text-blue-300">
                Étape {item.step}
              </span>
              <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 md:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================================== */}
{/*                             EXEMPLES D’EBOOKS GÉNÉRÉS                                 */}
{/* ===================================================================================== */}

<section
  id="examples"
  className="mx-auto max-w-6xl px-4 pt-8 pb-24"
>
  <div className="mb-10 text-center">
    <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
      Exemples d’ebooks générés
    </h2>
    <p className="mt-2 text-sm text-slate-400 md:text-base max-w-lg mx-auto">
      Voici le type de rendu professionnel que tu peux obtenir automatiquement
      avec Ebook Factory en moins d’une minute.
    </p>
  </div>

  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {[
      {
        tag: "Business",
        title: "Lancer un business digital rentable en 2025",
        gradient: "from-blue-400 via-blue-600 to-blue-800",
      },
      {
        tag: "Fitness",
        title: "Programme 30 jours — Transformation totale",
        gradient: "from-emerald-400 via-emerald-600 to-emerald-800",
      },
      {
        tag: "Mindset",
        title: "10 habitudes pour une discipline inébranlable",
        gradient: "from-purple-400 via-purple-600 to-purple-800",
      },
      {
        tag: "Finance",
        title: "Commencer à investir avec 0€",
        gradient: "from-yellow-400 via-amber-500 to-orange-600",
      },
      {
        tag: "Cuisine",
        title: "50 recettes healthy prêtes en 10 minutes",
        gradient: "from-pink-400 via-rose-500 to-red-600",
      },
      {
        tag: "Productivité",
        title: "Système anti-procrastination en 7 jours",
        gradient: "from-cyan-400 via-indigo-500 to-blue-800",
      },
    ].map((ebook, i) => (
      <div
        key={i}
        className="group relative flex flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-blue-500/20"
      >
        {/* Mockup card */}
        <div className="relative mx-auto mb-4 h-[260px] w-[180px]">
          {/* Glow */}
          <div className={`absolute -inset-4 rounded-[22px] bg-gradient-to-br ${ebook.gradient} opacity-40 blur-2xl group-hover:opacity-60 transition`} />

          {/* Card */}
          <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-slate-700/70 bg-slate-950 shadow-xl">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-slate-700/70 px-3 py-2">
              <span className="text-[10px] font-medium text-slate-200">
                Ebook
              </span>
              <span className="rounded-full bg-slate-800/70 px-2 py-0.5 text-[9px] text-slate-400">
                {ebook.tag}
              </span>
            </div>

            {/* Cover */}
            <div
              className={`h-full w-full bg-gradient-to-br ${ebook.gradient} flex items-end p-3`}
            >
              <span className="text-[11px] font-semibold text-white leading-tight drop-shadow">
                {ebook.title}
              </span>
            </div>
          </div>
        </div>

        {/* Title below */}
        <h3 className="text-sm font-semibold text-slate-50">
          {ebook.title}
        </h3>
        <p className="text-xs text-slate-400">{ebook.tag}</p>
      </div>
    ))}
  </div>
</section>


      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 pb-24 pt-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            Une seule fois, réutilisable à l’infini.
          </h2>
          <p className="mt-2 text-sm text-slate-400 md:text-base">
            Crée autant d&apos;offres que tu veux à partir de chaque ebook généré.
          </p>
        </div>

        <div className="mx-auto max-w-md rounded-3xl border border-blue-500/40 bg-slate-900/80 p-6 shadow-[0_0_60px_rgba(37,99,235,0.35)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-blue-300">
                Offre créateur
              </p>
              <p className="text-sm text-slate-300">
                Parfait pour infopreneurs, agences et vendeurs TikTok.
              </p>
            </div>
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-[11px] font-medium text-blue-100">
              Licence de revente incluse
            </span>
          </div>

          <div className="mb-5 flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-slate-50">X €</span>
            <span className="text-xs text-slate-400">par ebook généré</span>
          </div>

          <ul className="mb-6 space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Aperçu complet avant paiement
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              PDF haute qualité, prêt à vendre
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Aucun abonnement, tu paies quand tu vends
            </li>
          </ul>

          <Button className="w-full rounded-2xl bg-blue-600 py-5 text-sm font-medium hover:bg-blue-700">
            Générer mon premier ebook
          </Button>

          <p className="mt-3 text-center text-[11px] text-slate-400">
            Tu peux commencer par un seul ebook. Tu reviendras pour les suivants. 😉
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 text-center text-xs text-slate-500 md:text-sm">
        © {new Date().getFullYear()} • Ebook Factory — Tous droits réservés.
      </footer>
    </main>
  );
}
