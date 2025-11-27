import Link from "next/link";
import { House } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Conditions d’utilisation (CGU) | E-Book Factory",
  description:
    "Consultez les Conditions Générales d’Utilisation d’E-Book Factory, la plateforme de création d’ebooks automatisés. Informations légales, responsabilité, droits et obligations.",
  robots: "index,follow",
  openGraph: {
    title: "Conditions d’utilisation (CGU) | E-Book Factory",
    description:
      "Toutes les informations sur l'utilisation d’E-Book Factory : sécurité, responsabilités, droits d’usage et règles d’exploitation.",
    url: "https://ebook-factory.fr/conditions",
    siteName: "E-Book Factory",
    type: "article",
  },
};


export default function ConditionsUtilisationPage() {
  return (
    <>
      <main className="relative min-h-[100dvh] bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24">
        {/* BLOBS */}
        <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-400/40 dark:bg-blue-700/25 blur-[135px] -z-10" />
        <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] rounded-full bg-purple-400/40 dark:bg-purple-700/25 blur-[130px] -z-10" />

        {/* HEADER */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[70%] px-6 py-3 glass-bar rounded-3xl navbar-pop shadow-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-7 w-7 bg-blue-600 rounded-xl"></div>
                <h1 className="text-lg font-semibold">E-Book Factory</h1>
              </div>
            </Link>

            {/* Retour accueil */}
            <Link href="/">
              <button className="glass-bar px-3 py-2 rounded-xl flex items-center gap-2 text-sm whitespace-nowrap">
                <House size={16} />
                <span className="hidden sm:inline">Retour à l&apos;accueil</span>
              </button>
            </Link>
          </div>
        </div>

        {/* ESPACE SOUS HEADER */}
        <div className="h-24" />

        {/* CONTENU */}
        <section className="max-w-3xl mx-auto px-6 mt-10">
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl border border-white/10 dark:border-white/10 shadow-xl backdrop-blur-xl p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              Conditions générales d&apos;utilisation
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Dernière mise à jour : {new Date().getFullYear()}
            </p>

            <div className="space-y-6 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
              <p>
                Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») ont
                pour objet de définir les règles d&apos;utilisation du service E-Book Factory
                (ci-après « le Service »), accessible sur le site{" "}
                <span className="font-mono text-xs">ebook-factory.fr</span>.
              </p>

              <h2 className="text-xl font-semibold mt-6">1. Acceptation des conditions</h2>
              <p>
                En accédant au Service et en l&apos;utilisant, vous reconnaissez avoir lu,
                compris et accepté sans réserve les présentes CGU. Si vous n&apos;acceptez
                pas ces conditions, vous ne devez pas utiliser le Service.
              </p>

              <h2 className="text-xl font-semibold mt-6">2. Description du Service</h2>
              <p>
                E-Book Factory permet de générer automatiquement des ebooks personnalisés à
                partir d&apos;informations fournies par l&apos;utilisateur, notamment à l&apos;aide
                de modèles et de technologies d&apos;intelligence artificielle. Le Service
                est fourni &quot;en l&apos;état&quot;, sans garantie de résultat ni d&apos;adéquation
                à un usage particulier.
              </p>

              <h2 className="text-xl font-semibold mt-6">3. Compte utilisateur</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Vous êtes responsable de l&apos;exactitude des informations fournies.</li>
                <li>
                  Vous devez conserver la confidentialité de vos identifiants et ne pas
                  les partager.
                </li>
                <li>
                  Toute action réalisée via votre compte est réputée effectuée par vous.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">4. Utilisation autorisée</h2>
              <p>Vous vous engagez à :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Ne pas utiliser le Service à des fins illégales ou frauduleuses.</li>
                <li>
                  Ne pas générer ou diffuser de contenus illicites, diffamatoires, haineux,
                  ou portant atteinte aux droits de tiers.
                </li>
                <li>
                  Ne pas tenter de contourner les mesures techniques de sécurité ou de
                  limitation du Service.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">5. Propriété intellectuelle</h2>
              <p>
                La plateforme, les interfaces, le design, les templates, textes, logos et
                éléments graphiques restent la propriété exclusive de l&apos;éditeur du
                Service. L&apos;utilisateur obtient un droit d&apos;utilisation du Service mais
                aucun droit de propriété sur la plateforme elle-même.
              </p>
              <p>
                Sous réserve du paiement intégral des sommes dues, l&apos;utilisateur
                dispose des droits d&apos;exploitation sur les ebooks générés, dans les
                limites précisées dans la{" "}
                <Link href="/licence" className="text-blue-600 dark:text-blue-400 underline">
                  licence de revente
                </Link>
                .
              </p>

              <h2 className="text-xl font-semibold mt-6">6. Disponibilité du Service</h2>
              <p>
                Nous nous efforçons de maintenir le Service accessible 24h/24 et 7j/7,
                mais aucune obligation de résultat ne peut être garantie. Des interruptions
                temporaires (maintenance, incidents techniques, mises à jour) peuvent
                survenir sans préavis.
              </p>

              <h2 className="text-xl font-semibold mt-6">7. Responsabilité</h2>
              <p>
                L&apos;éditeur ne saurait être tenu responsable :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Des décisions prises par l&apos;utilisateur sur la base des ebooks générés.
                </li>
                <li>
                  Des dommages indirects (perte de chiffre d&apos;affaires, perte de chance,
                  atteinte à l&apos;image, etc.).
                </li>
                <li>
                  De tout usage non conforme aux lois en vigueur des contenus créés via le
                  Service.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">8. Suspension / résiliation</h2>
              <p>
                Nous nous réservons le droit de suspendre ou de résilier l&apos;accès au
                Service en cas :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>de non-respect des présentes CGU ;</li>
                <li>d&apos;utilisation frauduleuse ou malveillante du Service ;</li>
                <li>d&apos;impayés répétés ou de chargebacks abusifs.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">9. Modification des CGU</h2>
              <p>
                Les présentes CGU peuvent être modifiées à tout moment. La version en
                vigueur est celle disponible sur le site. L&apos;utilisation du Service
                après modification vaut acceptation des nouvelles CGU.
              </p>

              <h2 className="text-xl font-semibold mt-6">10. Droit applicable</h2>
              <p>
                Les présentes CGU sont soumises au droit français. En cas de litige, les
                tribunaux français seront seuls compétents, sous réserve des règles
                d&apos;ordre public applicables.
              </p>

              <h2 className="text-xl font-semibold mt-6">11. Avertissement</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ce document est fourni à titre informatif et générique. Il doit être
                adapté à votre situation et, le cas échéant, validé par un professionnel
                du droit.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
