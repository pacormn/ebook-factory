import Link from "next/link";
import { House, Shield, Scale, FileText, ScrollText, Cookie, BookCheck, Info } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Centre juridique | E-Book Factory",
  description:
    "Accédez rapidement à toutes les pages légales d’E-Book Factory : CGU, CGV, Confidentialité, Cookies, Mentions légales, Politique de remboursement et Licence.",
  robots: "index,follow",
};

export default function LegalCenter() {
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

        <section className="max-w-4xl mx-auto px-6 mt-10">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold mb-4">Centre juridique</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Retrouvez en un seul endroit toutes les informations légales de E-Book Factory.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* CGU */}
            <LegalCard
              title="Conditions d’utilisation (CGU)"
              icon={<Shield size={26} />}
              link="/conditions"
              desc="Règles d’utilisation et obligations des utilisateurs."
            />

            {/* CGV */}
            <LegalCard
              title="Conditions de vente (CGV)"
              icon={<Scale size={26} />}
              link="/conditions-vente"
              desc="Informations contractuelles liées aux achats."
            />

            {/* Confidentialité */}
            <LegalCard
              title="Politique de confidentialité"
              icon={<FileText size={26} />}
              link="/politique-confidentialite"
              desc="Données collectées, sécurité, RGPD."
            />

            {/* Cookies */}
            <LegalCard
              title="Politique de cookies"
              icon={<Cookie size={26} />}
              link="/cookies"
              desc="Fonctionnement des cookies et gestion du consentement."
            />

            {/* Mentions légales */}
            <LegalCard
              title="Mentions légales"
              icon={<Info size={26} />}
              link="/mentions-legales"
              desc="Informations de l’éditeur et obligations légales."
            />

            {/* Remboursement */}
            <LegalCard
              title="Politique de remboursement"
              icon={<ScrollText size={26} />}
              link="/remboursement"
              desc="Cas où un remboursement peut être accordé."
            />

            {/* Licence */}
            <LegalCard
              title="Licence de revente"
              icon={<BookCheck size={26} />}
              link="/licence"
              desc="Droits commerciaux pour les ebooks générés."
            />
          </div>

        </section>
      </main>
      <Footer />
    </>
  );
}

function LegalCard({ title, desc, link, icon }: any) {
  return (
    <Link
      href={link}
      className="group p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-gray-300/20 dark:border-gray-700/40 backdrop-blur-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600/20 transition">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
    </Link>
  );
}
