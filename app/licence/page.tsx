import Link from "next/link";
import { House } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Licence de revente | E-Book Factory",
  description:
    "Contrat de licence autorisant la revente des ebooks générés avec E-Book Factory. Droits accordés, restrictions, exploitation commerciale.",
  robots: "index,follow",
  openGraph: {
    title: "Licence de revente | E-Book Factory",
    description:
      "Informez-vous sur les droits accordés lors de la revente des ebooks créés avec E-Book Factory.",
    url: "https://ebook-factory.fr/licence",
    siteName: "E-Book Factory",
    type: "article",
  },
};


export default function LicencePage() {
  return (
    <>
      <main className="relative min-h-[100dvh] bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24">
        <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-400/40 dark:bg-blue-700/25 blur-[135px] -z-10" />
        <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] rounded-full bg-purple-400/40 dark:bg-purple-700/25 blur-[130px] -z-10" />

        {/* HEADER */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[70%] px-6 py-3 glass-bar rounded-3xl navbar-pop shadow-xl">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-7 w-7 bg-blue-600 rounded-xl"></div>
                <h1 className="text-lg font-semibold">E-Book Factory</h1>
              </div>
            </Link>

            <Link href="/">
              <button className="glass-bar px-3 py-2 rounded-xl flex items-center gap-2 text-sm whitespace-nowrap">
                <House size={16} />
                <span className="hidden sm:inline">Retour à l&apos;accueil</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="h-24" />

        <section className="max-w-3xl mx-auto px-6 mt-10">
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl border border-white/10 dark:border-white/10 shadow-xl backdrop-blur-xl p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              Licence de revente des ebooks générés
            </h1>

            <div className="space-y-6 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
              <p>
                La présente licence définit les droits que vous obtenez lorsque vous
                achetez ou générez un ebook via E-Book Factory, notamment en cas de
                revente ou d&apos;utilisation commerciale.
              </p>

              <h2 className="text-xl font-semibold mt-6">1. Propriété du contenu</h2>
              <p>
                E-Book Factory fournit un outil de génération d&apos;ebooks mais ne
                revendique pas la propriété des contenus finaux générés à partir de vos
                idées, titres ou descriptions. Sous réserve du respect des présentes
                conditions, vous disposez d&apos;un droit d&apos;exploitation sur l&apos;ebook
                généré.
              </p>

              <h2 className="text-xl font-semibold mt-6">2. Licence accordée</h2>
              <p>
                Sauf mention contraire sur l&apos;offre choisie, la licence inclut :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Le droit de vendre l&apos;ebook à votre propre audience (clients,
                  abonnés, communauté…).
                </li>
                <li>
                  Le droit de le commercialiser sur les plateformes de votre choix
                  (site perso, boutique en ligne, marketplace autorisée, etc.).
                </li>
                <li>
                  Le droit de le modifier (titre, visuels, mise en page) pour l&apos;adapter
                  à votre branding.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">3. Restrictions importantes</h2>
              <p>Vous n&apos;êtes pas autorisé à :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Revendre l&apos;ebook comme faisant partie d&apos;un pack de templates
                  concurrents à E-Book Factory (SaaS concurrent, marketplace de prompts,
                  etc.).
                </li>
                <li>
                  Revendiquer que l&apos;ebook a été écrit par une maison d&apos;édition
                  ou un auteur tiers sans son accord.
                </li>
                <li>
                  Utiliser l&apos;ebook pour des activités illégales, trompeuses ou
                  contraires aux plateformes de diffusion (spam, scam, etc.).
                </li>
                <li>
                  Revendre l&apos;accès à E-Book Factory lui-même ou présenter le Service
                  comme votre propre outil sans accord spécifique.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">4. Crédits facultatifs</h2>
              <p>
                Vous êtes libre de mentionner ou non l&apos;origine de l&apos;ebook. Un
                crédit de type &quot;Créé avec E-Book Factory&quot; est apprécié mais
                facultatif, sauf mention contraire dans certaines offres promotionnelles.
              </p>

              <h2 className="text-xl font-semibold mt-6">5. Responsabilité de l&apos;utilisateur</h2>
              <p>
                Vous êtes entièrement responsable des déclarations légales, fiscales et
                administratives liées à la revente de vos ebooks (facturation, TVA,
                droits d&apos;auteur potentiels, etc.).
              </p>

              <h2 className="text-xl font-semibold mt-6">6. Durée de la licence</h2>
              <p>
                La licence de revente est en principe accordée pour une durée illimitée,
                sous réserve du respect des présentes conditions et du paiement intégral
                des sommes dues lors de l&apos;achat.
              </p>

              <h2 className="text-xl font-semibold mt-6">7. Résiliation de la licence</h2>
              <p>
                En cas de violation manifeste de ces conditions (fraude, diffusion
                illégale massive, utilisation contraire aux lois), E-Book Factory se
                réserve le droit de retirer la licence de revente et de bloquer
                l&apos;accès à de futures mises à jour ou fonctionnalités, sans préjudice
                d&apos;autres actions.
              </p>

              <h2 className="text-xl font-semibold mt-6">8. Avertissement</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cette licence est un cadre générique pour des ebooks vendus à votre
                audience. Selon votre pays, votre statut juridique et le type de contenu,
                des dispositions supplémentaires peuvent être nécessaires. Faites valider
                votre modèle économique par un professionnel du droit si besoin.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
