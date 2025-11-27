import Link from "next/link";
import { House } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de remboursement | E-Book Factory",
  description:
    "Conditions de remboursement des ebooks générés sur E-Book Factory. Cas acceptés : erreur technique, double paiement. Contenu numérique sans rétractation.",
  robots: "index,follow",
  openGraph: {
    title: "Politique de remboursement | E-Book Factory",
    description:
      "Découvrez dans quels cas un remboursement peut être accordé pour les ebooks générés automatiquement.",
    url: "https://ebook-factory.fr/remboursement",
    siteName: "E-Book Factory",
    type: "article",
  },
};


export default function RemboursementPage() {
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
              Politique de remboursement
            </h1>

            <div className="space-y-6 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
              <p>
                Les produits proposés via E-Book Factory sont des contenus numériques
                livrés de manière dématérialisée. La présente politique de remboursement
                précise les cas dans lesquels un remboursement peut être envisagé.
              </p>

              <h2 className="text-xl font-semibold mt-6">1. Contenu numérique et accès immédiat</h2>
              <p>
                Une fois le paiement validé, l&apos;ebook est généré et rendu accessible
                (téléchargement ou consultation). Conformément à la réglementation
                applicable aux contenus numériques, le droit de rétractation ne s&apos;applique
                plus dès lors que l&apos;accès au contenu a commencé avec votre accord.
              </p>

              <h2 className="text-xl font-semibold mt-6">2. Erreur technique ou double paiement</h2>
              <p>
                En cas de problème technique empêchant l&apos;accès au produit acheté
                (bug bloquant, lien non fonctionnel) ou de double paiement clairement
                identifié, vous pouvez nous contacter à : contact@ebook-factory.fr. Après
                vérification, un remboursement ou un nouvel accès pourra être proposé.
              </p>

              <h2 className="text-xl font-semibold mt-6">3. Inadéquation avec les attentes</h2>
              <p>
                Étant donné la nature du Service (génération automatique basée sur vos
                paramètres et votre thème), aucun remboursement ne pourra être exigé au
                seul motif que le contenu ne correspond pas à vos attentes subjectives.
              </p>

              <h2 className="text-xl font-semibold mt-6">4. Abus et fraude</h2>
              <p>
                Nous nous réservons le droit de refuser tout remboursement en cas
                d&apos;utilisation manifestement abusive (multiples téléchargements,
                reproduction / revente déjà engagée, contestation bancaire injustifiée,
                etc.).
              </p>

              <h2 className="text-xl font-semibold mt-6">5. Comment faire une demande ?</h2>
              <p>
                Pour toute demande de remboursement, veuillez envoyer un email détaillé à{" "}
                <span className="font-mono text-xs">contact@ebook-factory.fr</span> en
                précisant :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Votre nom et adresse email utilisée lors de l&apos;achat.</li>
                <li>La date et le montant de la commande.</li>
                <li>Le motif de votre demande.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">6. Avertissement</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cette politique de remboursement définit un cadre général. Selon votre
                statut (auto-entrepreneur, société, vendeur de formations, etc.), des
                obligations spécifiques peuvent s&apos;appliquer. Faites valider cette
                politique par un professionnel si nécessaire.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
