"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Moon, Sun } from "lucide-react";

export default function LandingPage() {
  const [showHeader, setShowHeader] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    // wrapper qui porte la classe dark
    <div className={isDark ? "dark w-full" : "w-full"}>
      <main className="relative flex flex-col items-center w-full overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">

        {/* === BACKGROUND === */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-blue-200/70 via-white/70 to-transparent dark:from-blue-900/50 dark:via-gray-900/60 dark:to-transparent" />

        {/* blobs animés */}
        <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-blue-400/40 dark:bg-blue-700/30 blur-[120px] animate-blob-floating -z-10" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-purple-300/40 dark:bg-purple-700/30 blur-[120px] animate-blob-floating2 -z-10" />

        {/* === HEADER GLASS FLOTTANT === */}
        <div
          className={
            "fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[70%] px-6 md:px-8 py-4 rounded-3xl backdrop-blur-2xl border shadow-lg bg-white/60 dark:bg-gray-900/60 border-white/40 dark:border-gray-600 transition-all " +
            (showHeader ? "opacity-100 translate-y-4" : "opacity-0 -translate-y-12")
          }
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-blue-600" />
              <h2 className="text-lg md:text-xl font-bold tracking-tight">
                E-Book Factory
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Bouton thème */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1 px-3 py-2 rounded-2xl border border-white/60 dark:border-gray-700 bg-white/50 dark:bg-gray-800/60 backdrop-blur-md text-sm"
              >
                {isDark ? (
                  <>
                    <Sun size={16} /> <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon size={16} /> <span>Dark</span>
                  </>
                )}
              </button>

              <Link href="/create/title">
                <Button className="px-5 md:px-6 rounded-2xl bg-blue-600 hover:bg-blue-700">
                  Créer un Ebook
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* === HERO SECTION === */}
        <section className="flex flex-col lg:flex-row items-center gap-20 mt-32 px-6 max-w-6xl w-full">
          {/* LEFT : text */}
          <div className="flex-1 animate-fade-left">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Crée ton <span className="text-blue-600 dark:text-blue-400">Ebook Premium</span>{" "}
              prêt à vendre <br className="hidden lg:block" />
              en 30 secondes.
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-xl">
              Génère automatiquement un ebook professionnel, illustré, designé et accompagné
              d’une licence de revente — parfait pour TikTok, Instagram, infopreneurs et créateurs de formations.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link href="/create/title">
                <Button className="px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-300/40">
                  Créer mon ebook <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Aperçu gratuit avant achat. Paye seulement si le rendu te plaît.
              </span>
            </div>
          </div>

          {/* RIGHT : mockup */}
          <div className="flex-1 flex justify-center animate-fade-right">
            <div className="relative">
              {/* halo derrière */}
              <div className="absolute -inset-6 rounded-3xl bg-blue-500/30 blur-3xl dark:bg-blue-700/30" />
              {/* mockup */}
              <div className="relative w-[320px] h-[460px] bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border overflow-hidden transform rotate-[3deg] hover:rotate-0 transition-all duration-500">
                <div className="h-full bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-800 dark:to-blue-700 flex items-center justify-center">
                  <span className="text-white text-xl font-bold opacity-90 tracking-wide">
                    Mockup Ebook Pro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section className="mt-32 px-6 w-full max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-14">Comment ça marche ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-3">1. Décris ta niche</h3>
              <p className="text-gray-600 dark:text-gray-300">
                L’IA analyse ton sujet et génère plusieurs titres vendeurs automatiquement.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-3">2. Personnalise ton style</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choisis la police, le design, la longueur, et les images IA pour créer un ebook unique.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-3">3. Génère ton ebook</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Obtiens un PDF pro + licence de revente pour le vendre immédiatement.
              </p>
            </div>
          </div>
        </section>

        {/* === VALUE SECTION === */}
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
              "Rendu premium idéal pour les infopreneurs",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border shadow-sm"
              >
                <CheckCircle2 className="text-blue-600" size={26} />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* === CTA FINAL === */}
        <section className="mt-32 mb-28 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à créer un ebook qui se vend ?</h2>

          <Link href="/create/title">
            <Button className="px-12 py-6 text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-300/40">
              Générer mon Ebook maintenant
            </Button>
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="w-full py-10 mt-4 border-t border-white/40 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} • E-Book Factory — Tous droits réservés.
        </footer>

        {/* === CTA FLOTTANT MOBILE (LIQUID GLASS) === */}
        <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
          <Link href="/create/title">
            <button className="px-6 py-3 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border border-white/70 dark:border-gray-700 shadow-lg flex items-center gap-2">
              <span className="text-sm font-semibold">Créer mon ebook maintenant</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
