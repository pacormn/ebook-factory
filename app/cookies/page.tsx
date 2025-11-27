import Link from "next/link";
import { House } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de cookies | E-Book Factory",
  description:
    "Information sur l’utilisation des cookies par E-Book Factory : types de cookies, finalités, durée de conservation et gestion du consentement.",
  robots: "index,follow",
  openGraph: {
    title: "Politique de cookies | E-Book Factory",
    description:
      "Découvrez comment E-Book Factory utilise les cookies pour améliorer l’expérience utilisateur et analyser l’audience.",
    url: "https://ebook-factory.fr/cookies",
    siteName: "E-Book Factory",
    type: "article",
  },
};


export default function CookiesPage() {
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
              Politique de cookies
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Explication de l&apos;usage des cookies sur E-Book Factory
            </p>

            <div className="space-y-6 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
              <h2 className="text-xl font-semibold mt-6">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur,
                mobile, tablette) lorsque vous visitez un site web. Il permet de mémoriser
                certaines informations sur votre navigation pour améliorer votre expérience.
              </p>

              <h2 className="text-xl font-semibold mt-6">2. Types de cookies utilisés</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Cookies strictement nécessaires</strong> : indispensables au
                  fonctionnement du site (session, sécurité).
                </li>
                <li>
                  <strong>Cookies de mesure d&apos;audience</strong> : nous permettent de
                  comprendre comment le site est utilisé (pages les plus vues, temps
                  moyen, etc.).
                </li>
                <li>
                  <strong>Cookies de préférence</strong> : mémorisent vos choix (langue,
                  thème sombre, etc.).
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">3. Cookies tiers</h2>
              <p>
                Certains cookies peuvent être déposés par des services tiers intégrés au
                site (par exemple outils d&apos;analytics, solution de paiement, chat
                support). Ces services disposent de leurs propres politiques de
                confidentialité.
              </p>

              <h2 className="text-xl font-semibold mt-6">4. Durée de conservation</h2>
              <p>
                La durée de vie des cookies varie selon leur finalité, sans excéder les
                durées recommandées par la réglementation (généralement 13 mois maximum
                pour les cookies de mesure d&apos;audience).
              </p>

              <h2 className="text-xl font-semibold mt-6">
                5. Gestion des cookies / consentement
              </h2>
              <p>
                Lors de votre première visite, un bandeau d&apos;information peut vous
                proposer d&apos;accepter ou de refuser certains cookies. Vous pouvez
                également configurer votre navigateur pour bloquer les cookies ou être
                averti de leur dépôt.
              </p>
              <p className="text-sm">
                Pour plus d&apos;informations, consultez la rubrique &quot;aide&quot; de
                votre navigateur ou le site{" "}
                <span className="font-mono text-xs">www.cnil.fr</span>.
              </p>

              <h2 className="text-xl font-semibold mt-6">6. Vos droits</h2>
              <p>
                Pour toute question relative aux cookies et au traitement de vos données
                personnelles, vous pouvez consulter notre{" "}
                <Link
                  href="/politique-confidentialite"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  Politique de confidentialité
                </Link>{" "}
                ou nous contacter à : contact@ebook-factory.fr.
              </p>

              <h2 className="text-xl font-semibold mt-6">7. Avertissement</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cette politique de cookies est un modèle générique et doit être adaptée
                aux outils de tracking réellement utilisés (Google Analytics,
                Matomo, Pixel, etc.).
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
