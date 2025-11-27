import Link from "next/link";
import Image from "next/image";
import { House, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Guides & Ressources | E-Book Factory",
  description: "Tous les guides pour créer, générer et vendre des ebooks professionnels.",
};

const guides = [
  {
    title: "Créer un ebook pour TikTok",
    description: "Apprends à créer un ebook optimisé pour TikTok en 10 minutes.",
    href: "/creer-ebook-pour-tiktok",
  },
  {
    title: "Générer un ebook avec l’IA",
    description: "Découvre comment générer un ebook complet automatiquement.",
    href: "/generer-ebook-ia",
  },
  {
    title: "Idées d’ebooks à vendre en 2025",
    description: "Inspirations : les sujets d’ebooks rentables cette année.",
    href: "/idees-ebook-a-vendre",
  },
  {
    title: "Faire un ebook professionnel",
    description: "Comment créer un ebook pro sans compétences techniques.",
    href: "/faire-un-ebook-professionnel",
  },
  {
    title: "Ebook pour le dropshipping",
    description: "Crée un ebook comme produit digital pour ta boutique.",
    href: "/ebook-dropshipping",
  },
  {
    title: "Créer un ebook PDF gratuitement",
    description: "Génère un PDF propre, lisible et professionnel.",
    href: "/creer-ebook-pdf-gratuit",
  },
  {
    title: "Comment vendre un ebook",
    description: "Toutes les techniques pour vendre ton ebook facilement.",
    href: "/vendre-un-ebook",
  },
  {
    title: "Erreurs à éviter",
    description: "Les 10 erreurs à ne jamais faire lors de la création d’un ebook.",
    href: "/erreurs-creation-ebook",
  },
  {
    title: "Créer un ebook pour son business",
    description: "Utilise ton ebook pour booster ton business.",
    href: "/ebook-business-en-ligne",
  },
  {
    title: "Écrire un ebook sans idées",
    description: "Trouver un sujet et écrire un ebook même en débutant.",
    href: "/ecrire-ebook-sans-idees",
  },
];

export default function GuidesPage() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

        {/* BLOBS */}
        <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] bg-blue-400/40 dark:bg-blue-800/20 rounded-full blur-[140px] animate-blob-floating -z-10" />
        <div className="absolute bottom-[-250px] right-[-150px] w-[600px] h-[600px] bg-purple-400/40 dark:bg-purple-800/20 rounded-full blur-[140px] animate-blob-floating2 -z-10" />

        {/* HEADER */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[70%] px-6 py-3 glass-bar rounded-3xl shadow-xl navbar-pop">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-7 w-7 bg-blue-600 rounded-xl" />
                <h1 className="text-lg font-semibold">E-Book Factory</h1>
              </div>
            </Link>

            <Link href="/">
              <button className="glass-bar px-3 py-2 rounded-xl flex items-center gap-2 text-sm">
                <House size={16} />
                <span className="hidden sm:inline">Accueil</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="h-24" />

        {/* CONTENT */}
        <section className="max-w-5xl mx-auto px-6 py-16">

          <header className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Guides & Ressources
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tout ce dont tu as besoin pour créer, optimiser et vendre tes ebooks comme un pro.
            </p>
          </header>

          {/* HERO IMAGE */}
          <div className="mx-auto mb-16">
            <Image
              src="/images/ebook-factory-cover.webp"
              width={1200}
              height={630}
              alt="Créer un ebook professionnel avec l’IA"
              className="rounded-2xl border shadow-xl"
            />
          </div>

          {/* GRID OF CARDS */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="card-3d card-glow bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-300/20 dark:border-gray-700/30 shadow-lg hover:shadow-2xl rounded-2xl p-6 transition-all"
              >
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                  {g.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {g.description}
                </p>
                <p className="flex items-center gap-1 text-blue-600 font-medium">
                  Lire le guide <ArrowRight size={16} />
                </p>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 transition px-8 py-4 text-lg font-semibold text-white shadow-lg"
            >
              Retour à E-Book Factory
            </Link>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}
