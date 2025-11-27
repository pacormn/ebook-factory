import Link from "next/link";
import { House } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de confidentialité (RGPD) | E-Book Factory",
  description:
    "Politique de confidentialité d’E-Book Factory conforme au RGPD : données collectées, finalités, droits, sécurité et sous-traitants.",
  robots: "index,follow",
  openGraph: {
    title: "Politique de confidentialité (RGPD) | E-Book Factory",
    description:
      "Comment E-Book Factory collecte, sécurise et utilise vos données. Vos droits (accès, suppression, opposition). RGPD complet.",
    url: "https://ebook-factory.fr/politique-confidentialite",
    siteName: "E-Book Factory",
    type: "article",
  },
};


export default function PolitiqueConfidentialitePage() {
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
              Politique de confidentialité
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Conformément au Règlement (UE) 2016/679 (RGPD)
            </p>

            <div className="space-y-6 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
              <p>
                La présente politique a pour objectif d&apos;expliquer de manière claire
                et transparente comment E-Book Factory collecte, utilise et protège vos
                données personnelles.
              </p>

              <h2 className="text-xl font-semibold mt-6">1. Responsable de traitement</h2>
              <p>
                Le responsable du traitement est l&apos;éditeur du site E-Book Factory,
                joignable à l&apos;adresse : contact@ebook-factory.fr.
              </p>

              <h2 className="text-xl font-semibold mt-6">2. Données collectées</h2>
              <p>
                Nous pouvons collecter les catégories de données suivantes :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Identité : nom, prénom, pseudo, coordonnées de contact.</li>
                <li>Contact : adresse email, éventuellement réseaux sociaux.</li>
                <li>
                  Données de connexion : adresse IP, logs, type de navigateur, pages
                  consultées.
                </li>
                <li>
                  Données liées à l&apos;utilisation du Service : thèmes d&apos;ebooks,
                  contenus fournis, paramètres choisis.
                </li>
                <li>Données de paiement (via prestataire, ex. Stripe) : token de paiement.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">3. Finalités et base légale</h2>
              <p>Nous traitons vos données pour les finalités suivantes :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Fourniture du Service</strong> (création et gestion de votre
                  compte, génération d&apos;ebooks) – base légale : exécution du contrat.
                </li>
                <li>
                  <strong>Gestion de la facturation</strong> – base légale : obligation
                  légale et contractuelle.
                </li>
                <li>
                  <strong>Support client</strong> – base légale : intérêt légitime.
                </li>
                <li>
                  <strong>Statistiques & amélioration du Service</strong> – base légitime :
                  intérêt légitime (vous pouvez vous y opposer).
                </li>
                <li>
                  <strong>Communication marketing</strong> (emails d&apos;information,
                  nouveautés) – base légale : consentement ou intérêt légitime selon le cas.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">4. Destinataires des données</h2>
              <p>
                Vos données peuvent être transmises uniquement à des prestataires
                techniques nécessaires au fonctionnement du Service (hébergement, solution
                de paiement, outil d&apos;emailing, analytics). Nous ne vendons pas vos
                données à des tiers.
              </p>

              <h2 className="text-xl font-semibold mt-6">5. Durée de conservation</h2>
              <p>
                Les données sont conservées pendant la durée d&apos;utilisation du Service,
                puis archivées pendant la durée nécessaire au respect des obligations
                légales (par exemple 5 à 10 ans pour les données comptables).
              </p>

              <h2 className="text-xl font-semibold mt-6">
                6. Vos droits sur vos données
              </h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Droit d&apos;accès à vos données.</li>
                <li>Droit de rectification des données inexactes ou incomplètes.</li>
                <li>Droit à l&apos;effacement (dans certaines conditions).</li>
                <li>Droit à la limitation du traitement.</li>
                <li>Droit d&apos;opposition au traitement pour motif légitime.</li>
                <li>Droit à la portabilité des données fournies par vos soins.</li>
              </ul>
              <p>
                Pour exercer ces droits, vous pouvez nous contacter à :
                contact@ebook-factory.fr. Une preuve d&apos;identité pourra être
                demandée.
              </p>

              <h2 className="text-xl font-semibold mt-6">7. Cookies et traceurs</h2>
              <p>
                L&apos;utilisation de cookies et technologies similaires est détaillée
                dans notre{" "}
                <Link href="/cookies" className="text-blue-600 dark:text-blue-400 underline">
                  Politique de cookies
                </Link>
                .
              </p>

              <h2 className="text-xl font-semibold mt-6">8. Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles
                raisonnables pour protéger vos données (chiffrement, accès restreints,
                sauvegardes). Aucun système n&apos;étant parfaitement sécurisé, nous ne
                pouvons garantir une sécurité absolue.
              </p>

              <h2 className="text-xl font-semibold mt-6">
                9. Sous-traitants et transferts hors UE
              </h2>
              <p>
                Certains prestataires (hébergeur, emailing, paiement, analytics) peuvent
                être situés en dehors de l&apos;Union européenne. Dans ce cas, nous
                veillons à ce que des garanties adéquates soient mises en place (clauses
                contractuelles types, adhésion à un cadre de protection des données, etc.).
              </p>

              <h2 className="text-xl font-semibold mt-6">
                10. Réclamation auprès de la CNIL
              </h2>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir
                la CNIL (<span className="font-mono text-xs">cnil.fr</span>).
              </p>

              <h2 className="text-xl font-semibold mt-6">11. Avertissement</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cette politique de confidentialité est un modèle générique. Elle doit
                être adaptée à vos traitements réels de données et validée, si besoin,
                par un expert spécialisé en protection des données.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
