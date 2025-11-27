import Link from "next/link";
import { House } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mentions légales | E-Book Factory",
  description:
    "Mentions légales d’E-Book Factory : éditeur, hébergeur, propriété intellectuelle, responsabilité et informations juridiques.",
  robots: "index,follow",
  openGraph: {
    title: "Mentions légales | E-Book Factory",
    description:
      "Informations obligatoires concernant l’éditeur du site, l’hébergement, la responsabilité et les droits liés au contenu.",
    url: "https://ebook-factory.fr/mentions-legales",
    siteName: "E-Book Factory",
    type: "article",
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <main className="relative min-h-[100dvh] bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24">
        
        {/* BLOBS */}
        <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] bg-blue-400/40 dark:bg-blue-700/20 rounded-full blur-[135px] -z-10" />
        <div className="absolute bottom-[-250px] right-[-150px] w-[600px] h-[600px] bg-purple-400/40 dark:bg-purple-700/20 rounded-full blur-[135px] -z-10" />
        
        {/* HEADER */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[70%] px-6 py-3 glass-bar rounded-3xl navbar-pop shadow-xl">
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

        {/* PAGE */}
        <section className="max-w-3xl mx-auto px-6 mt-10">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 dark:border-white/10 p-8 md:p-10">

            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Mentions légales</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Conformément à la loi pour la Confiance dans l’Économie Numérique (LCEN – 2004)
            </p>

            <div className="space-y-6 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">

              <h2 className="text-xl font-semibold">1. Éditeur du site</h2>
              <p>
                Le site <span className="font-mono text-xs">ebook-factory.fr</span> est édité par :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Nom de l’éditeur :</strong> À compléter</li>
                <li><strong>Statut :</strong> Auto-entrepreneur / Société</li>
                <li><strong>Adresse :</strong> (à compléter)</li>
                <li><strong>Email :</strong> contact@ebook-factory.fr</li>
                <li><strong>SIREN / SIRET :</strong> À compléter</li>
              </ul>

              <h2 className="text-xl font-semibold">2. Hébergeur</h2>
              <p>Le site est hébergé par :</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Vercel Inc.</strong></li>
                <li>340 S Lemon Ave #4133</li>
                <li>Walnut, CA 91789</li>
                <li>Site : https://vercel.com</li>
              </ul>

              <h2 className="text-xl font-semibold">3. Propriété intellectuelle</h2>
              <p>
                Tous les contenus présents sur le site (textes, images, design, éléments techniques)
                sont la propriété exclusive de l’éditeur, sauf mention contraire.
              </p>
              <p>
                Toute reproduction non autorisée constitue une contrefaçon pouvant engager
                votre responsabilité civile et pénale.
              </p>

              <h2 className="text-xl font-semibold">4. Responsabilité</h2>
              <p>
                L’éditeur ne peut être tenu responsable en cas d’interruption du site,
                de bug, d’inexactitudes ou de dommages résultant de l’utilisation du Service.
              </p>

              <h2 className="text-xl font-semibold">5. Données personnelles</h2>
              <p>
                Les traitements de données sont détaillés dans la{" "}
                <Link href="/politique-confidentialite" className="text-blue-600 dark:text-blue-400 underline">
                  Politique de confidentialité
                </Link>.
              </p>

              <h2 className="text-xl font-semibold">6. Signalement d’un abus</h2>
              <p>
                Pour signaler un contenu problématique, merci d'écrire à :  
                <span className="font-mono text-xs">contact@ebook-factory.fr</span>
              </p>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
