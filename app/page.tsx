"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

export default function LandingPage() {

  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex flex-col items-center w-full overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.3),transparent_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_70%)]" />

      {/* FLOATING TOP HEADER (ANIMATED) */}
      <div className={clsx(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 px-6 py-3 backdrop-blur-lg rounded-full transition-all shadow-lg border border-white/20 dark:border-gray-700",
        showHeader ? "opacity-100 translate-y-4" : "opacity-0 -translate-y-10"
      )}>
        <Link href="/create/title">
          <Button className="font-semibold px-6 bg-blue-600 hover:bg-blue-700">
            Créer un Ebook
          </Button>
        </Link>
      </div>


      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center mt-28 px-6 max-w-3xl animate-fade-up">
        
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          Crée ton <span className="text-blue-600 dark:text-blue-400">Ebook Premium</span> <br />
          prêt à vendre en 30 secondes
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mt-5 max-w-2xl">
          Génère automatiquement un ebook professionnel, designé, illustré, et accompagné d’une
          licence de revente — idéal pour TikTok, Instagram, créateurs de contenu et infopreneurs.
        </p>

        <Link href="/create/title">
          <Button className="mt-10 px-12 py-7 text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-300/40">
            Commencer maintenant <ArrowRight className="ml-2" />
          </Button>
        </Link>

        {/* MOCKUP */}
        <div className="mt-16 w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl">
          <div className="h-72 bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-900 dark:to-blue-600 flex items-center justify-center transition-transform hover:scale-[1.02]">
            <span className="text-white text-2xl font-bold opacity-90 tracking-wider">
              Aperçu de l'Ebook (Mockup Pro)
            </span>
          </div>
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="mt-32 px-6 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-14">Comment ça marche ?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
          <div className="p-8 rounded-2xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl border shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-3">1. Décris ta niche</h3>
            <p className="text-gray-600 dark:text-gray-300">
              L’IA analyse ton sujet et génère plusieurs titres vendeurs automatiquement.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl border shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-3">2. Personnalise ton style</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choisis la police, le design, la longueur, et les images IA pour créer un ebook unique.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl border shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-3">3. Génère ton ebook</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Obtiens un PDF professionnel + licence de revente pour le vendre immédiatement.
            </p>
          </div>

        </div>
      </section>



      {/* VALUE SECTION */}
      <section className="mt-32 px-6 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-14">Ce que tu obtiens</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          {[
            "PDF professionnel prêt à vendre",
            "Design premium et personnalisable",
            "Images générées par IA (option premium)",
            "Licence de revente incluse",
            "Chapitres structurés et uniques",
            "Ebook compatible TikTok, Insta, Gumroad",
            "Sommaire + plan d’action inclus",
            "Rendu premium idéal pour les infopreneurs"
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 rounded-xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl border shadow-sm"
            >
              <CheckCircle2 className="text-blue-600" size={26} />
              {item}
            </div>
          ))}
        </div>
      </section>



      {/* FINAL CTA */}
      <section className="mt-32 mb-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Prêt à créer un ebook qui se vend ?</h2>

        <Link href="/create/title">
          <Button className="px-12 py-6 text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-300/40">
            Générer mon Ebook maintenant
          </Button>
        </Link>
      </section>



      {/* FOOTER */}
      <footer className="w-full py-10 mt-10 border-t text-center text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} • E-Book Factory — Tous droits réservés.
      </footer>

    </main>
  );
}
