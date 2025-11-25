"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Moon, Sun } from "lucide-react";

export default function LandingPage() {
  const [showHeader, setShowHeader] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // === SCROLL HEADER DETECTION ===
  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === DARK MODE TOGGLE ===
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;

      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newTheme;
    });
  };

  return (
    <div className="w-full">
      <main className="relative flex flex-col items-center w-full overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">

        {/* === BACKGROUND === */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-blue-200/70 via-white/70 to-transparent dark:from-blue-900/50 dark:via-gray-900/60 dark:to-transparent" />

        {/* Blobs */}
        <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-blue-400/40 dark:bg-blue-700/30 blur-[120px] animate-blob-floating -z-10" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-purple-300/40 dark:bg-purple-700/30 blur-[120px] animate-blob-floating2 -z-10" />

        {/* ================================================================================= */}
        {/*                                      HEADER                                      */}
        {/* ================================================================================= */}

        <header className="w-full">
{/* === HEADER DYNAMIQUE === */}
<div
  className={
    "transition-all duration-300 will-change-transform " +
    (showHeader
      ? // HEADER FLOTTANT — NO horizontal movement
        "fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[90%] md:w-[70%] px-6 py-4 rounded-3xl shadow-xl glass header-fade-scale"
      : // HEADER NORMAL — KEEP SAME LEFT + TRANSLATE TO PREVENT GLITCH
        "absolute top-0 left-1/2 -translate-x-1/2 w-full px-6 py-6"
    )
  }
>
  <div className="flex items-center justify-between max-w-7xl mx-auto">
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-xl bg-blue-600" />
      <h1 className="text-xl font-bold">E-Book Factory</h1>
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={toggleTheme}
        className="glass px-3 py-2 rounded-2xl flex items-center gap-1 text-sm"
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
        {isDark ? "Light" : "Dark"}
      </button>

      <Link href="/create/title">
        <Button className="px-5 md:px-6 rounded-2xl bg-blue-600 hover:bg-blue-700">
          Créer un Ebook
        </Button>
      </Link>
    </div>
  </div>
</div>



        </header>

        {/* ================================================================================= */}
        {/*                                      HERO                                         */}
        {/* ================================================================================= */}

        <section className="flex flex-col lg:flex-row items-center gap-20 mt-32 px-6 max-w-6xl w-full">
          {/* LEFT */}
          <div className="flex-1 animate-fade-left">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Crée ton{" "}
              <span className="text-blue-600 dark:text-blue-400">Ebook Premium</span>{" "}
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

          {/* RIGHT (Mockup) */}
          <div className="flex-1 flex justify-center animate-fade-right">
            <div className="relative">
              {/* Halo */}
              <div className="absolute -inset-6 rounded-3xl bg-blue-500/30 blur-3xl dark:bg-blue-700/30" />

              {/* Mockup */}
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

        {/* ================================================================================= */}
        {/*                               HOW IT WORKS                                       */}
        {/* ================================================================================= */}

        <section className="mt-32 px-6 w-full max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-14">Comment ça marche ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "1. Décris ta niche",
                content:
                  "L’IA analyse ton sujet et génère plusieurs titres vendeurs automatiquement.",
              },
              {
                title: "2. Personnalise ton style",
                content:
                  "Choisis la police, le design, la longueur, et les images IA pour créer un ebook unique.",
              },
              {
                title: "3. Génère ton ebook",
                content:
                  "Obtiens un PDF pro + licence de revente pour le vendre immédiatement.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================================= */}
        {/*                                VALUE SECTION                                      */}
        {/* ================================================================================= */}

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

        {/* ================================================================================= */}
        {/*                                    CTA FINAL                                      */}
        {/* ================================================================================= */}

        <section className="mt-32 mb-28 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à créer un ebook qui se vend ?</h2>

          <Link href="/create/title">
            <Button className="px-12 py-6 text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-300/40">
              Générer mon Ebook maintenant
            </Button>
          </Link>
        </section>

        {/* ================================================================================= */}
        {/*                                     FOOTER                                        */}
        {/* ================================================================================= */}

        <footer className="w-full py-10 mt-4 border-t border-white/40 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} • E-Book Factory — Tous droits réservés.
        </footer>

        {/* ================================================================================= */}
        {/*                             CTA FLOTTANT MOBILE                                   */}
        {/* ================================================================================= */}

        <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          <Link href="/create/title">
            <button
              className={
                "px-7 py-4 rounded-3xl flex items-center gap-2 shadow-xl " +
                (isDark ? "glass-dark bg-gray-900/40" : "glass bg-white/30")
              }
            >
              <span className="text-sm font-semibold">Créer mon ebook maintenant</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>

      </main>
    </div>
  );
}
