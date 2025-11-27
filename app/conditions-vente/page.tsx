import Link from "next/link";
import { House } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Conditions générales de vente (CGV) | E-Book Factory",
  description:
    "Découvrez les Conditions Générales de Vente d’E-Book Factory : contenus numériques, paiement, livraison, droit de rétractation et politique commerciale.",
  robots: "index,follow",
  openGraph: {
    title: "Conditions générales de vente (CGV) | E-Book Factory",
    description:
      "Accédez aux règles de vente des ebooks générés : paiement sécurisé, accès immédiat, obligations légales, remboursement.",
    url: "https://ebook-factory.fr/conditions-vente",
    siteName: "E-Book Factory",
    type: "article",
  },
};


export default function ConditionsVentePage() {
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
              Conditions générales de vente
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Dernière mise à jour : {new Date().getFullYear()}
            </p>

            <div className="space-y-6 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
              <p>
                Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent
                les ventes de produits numériques proposées via le Service E-Book Factory.
              </p>

              <h2 className="text-xl font-semibold mt-6">1. Produits</h2>
              <p>
                E-Book Factory permet d&apos;acheter l&apos;accès à des ebooks générés
                automatiquement, ainsi qu&apos;à certaines licences de revente. Les
                caractéristiques essentielles de chaque offre (contenu, droits inclus,
                prix) sont indiquées avant le paiement.
              </p>

              <h2 className="text-xl font-semibold mt-6">2. Prix</h2>
              <p>
                Les prix sont indiqués en euros, toutes taxes comprises (TTC) sauf mention
                contraire. L&apos;éditeur se réserve le droit de modifier les prix à tout
                moment, sans effet rétroactif sur les commandes déjà payées.
              </p>

              <h2 className="text-xl font-semibold mt-6">3. Commande</h2>
              <p>
                La validation d&apos;une commande via l’interface de paiement vaut
                acceptation pleine et entière des présentes CGV. Vous recevez une
                confirmation par email après le paiement, contenant le récapitulatif de
                votre commande et, le cas échéant, les liens de téléchargement.
              </p>

              <h2 className="text-xl font-semibold mt-6">4. Paiement</h2>
              <p>
                Le paiement est sécurisé et effectué via des prestataires tiers (par
                exemple Stripe). Aucune donnée bancaire complète n’est stockée par
                E-Book Factory.
              </p>

              <h2 className="text-xl font-semibold mt-6">5. Livraison / accès</h2>
              <p>
                Les produits vendus sont des contenus numériques. Sauf indication
                contraire, l&apos;accès est délivré immédiatement après validation du
                paiement, via un lien de téléchargement ou un accès à l&apos;espace
                utilisateur.
              </p>

              <h2 className="text-xl font-semibold mt-6">
                6. Droit de rétractation pour les contenus numériques
              </h2>
              <p>
                Conformément à la réglementation applicable, le droit de rétractation ne
                s&apos;applique pas aux contenus numériques fournis sur un support
                immatériel lorsqu&apos;ils sont accessibles immédiatement après
                l&apos;achat, après accord exprès du consommateur et renoncement
                explicite à son droit de rétractation.
              </p>
              <p>
                En validant votre achat sur E-Book Factory, vous demandez l&apos;accès
                immédiat au contenu et reconnaissez renoncer à votre droit de
                rétractation légal pour ce type de produit.
              </p>

              <h2 className="text-xl font-semibold mt-6">7. Politique de remboursement</h2>
              <p>
                Des conditions spécifiques de remboursement peuvent être précisées sur la
                page{" "}
                <Link
                  href="/remboursement"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  Politique de remboursement
                </Link>
                . En dehors de ces cas, aucun remboursement ne pourra être exigé une fois
                le contenu accessible.
              </p>

              <h2 className="text-xl font-semibold mt-6">8. Responsabilité</h2>
              <p>
                Le Service est fourni en l&apos;état. L&apos;éditeur ne garantit pas un
                résultat spécifique (par exemple chiffre d&apos;affaires, nombre de
                ventes, performance marketing). L&apos;utilisateur demeure seul
                responsable de l&apos;exploitation des ebooks générés.
              </p>

              <h2 className="text-xl font-semibold mt-6">9. Données personnelles</h2>
              <p>
                Les informations collectées lors de la commande sont traitées conformément
                à notre{" "}
                <Link
                  href="/politique-confidentialite"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  Politique de confidentialité
                </Link>
                .
              </p>

              <h2 className="text-xl font-semibold mt-6">10. Droit applicable</h2>
              <p>
                Les présentes CGV sont soumises au droit français. En cas de litige, et à
                défaut de résolution amiable, les tribunaux français seront compétents.
              </p>

              <h2 className="text-xl font-semibold mt-6">11. Avertissement</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ce modèle de CGV est générique. Il doit être adapté à votre activité
                spécifique et, le cas échéant, validé par un professionnel du droit ou un
                expert-comptable.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
