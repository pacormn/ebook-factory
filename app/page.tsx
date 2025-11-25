"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="relative flex flex-col items-center w-full overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-blue-200/70 via-white/80 to-transparent dark:from-blue-950/70 dark:via-gray-950/90 dark:to-transparent" />

      {/* BLOBS */}
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-blue-400/40 dark:bg-blue-700/30 blur-[120px] animate-blob-floating -z-10" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-purple-300/40 dark:bg-purple-700/30 blur-[120px] animate-blob-floating2 -z-10" />

      {/* ===================================================== */}
      {/* HEADER STICKY GLASS                                  */}
      {/* ===================================================== */}
      <header className="sticky top-0 z-30 w-full px-4 pt-4">
        <div className="max-w-6xl mx-auto glass px-4 py-3 rounded-2xl flex items-center justify-between header-fade-scale">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-blue-600" />
            <span className="font-semibold text-lg tracking-tight">
              E-Book Factory
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex items-center gap-1 px-3 py-2 rounded-2xl text-sm glass"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>

            <Link href="/create/title">
              <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700">
                Créer un Ebook
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-10" />

      {/* ===================================================== */}
      {/* HERO SECTION                                          */}
      {/* ===================================================== */}
      <section className="flex flex-col lg:flex-row items-center gap-16 px-6 max-w-6xl w-full mt-4">
        {/* LEFT */}
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full glass">
            🚀 Génère un produit digital revendable en quelques secondes
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Crée ton{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Ebook Premium
            </span>{" "}
            prêt à vendre en 30 secondes.
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            Ebook Factory génère pour toi un ebook professionnel, structuré,
            illustré et prêt à vendre sur TikTok, Instagram, Gumroad ou
            n’importe quelle plateforme — sans écrire une seule ligne.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/create/title">
              <Button className="px-8 py-6 text-base sm:text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-300/40">
                Créer mon ebook maintenant
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Aperçu gratuit avant achat. Tu ne payes que si le rendu te plaît.
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span>Licence de revente incluse</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Optimisé pour les infopreneurs & créateurs</span>
            </div>
          </div>
        </div>

        {/* RIGHT : Mockup */}
        <div className="flex-1 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-6 rounded-3xl bg-blue-500/30 blur-3xl dark:bg-blue-800/30" />
            <div className="relative w-[320px] h-[460px] rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden transform rotate-[3deg] group-hover:rotate-0 group-hover:scale-[1.02] transition-all duration-500 bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-800 dark:to-blue-700 flex items-center justify-center">
              <span className="text-white text-xl font-bold tracking-wide">
                Aperçu Ebook Pro
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* HOW IT WORKS                                          */}
      {/* ===================================================== */}
      <section className="mt-32 px-6 w-full max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
          Comment ça marche ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "1. Décris ta niche",
              content:
                "Tu expliques ton sujet en quelques lignes : business, mindset, fitness, crypto, marketing, etc.",
            },
            {
              title: "2. L’IA structure et rédige",
              content:
                "Ebook Factory génère un plan complet, les chapitres, le texte et les visuels (option IA images).",
            },
            {
              title: "3. Tu récupères ton PDF prêt à vendre",
              content:
                "Télécharge ton ebook pro avec licence de revente.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-white/60 dark:border-gray-800 shadow-md hover:-translate-y-1 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================== */}
      {/* VALUE SECTION                                         */}
      {/* ===================================================== */}
      <section className="mt-32 px-6 w-full max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
          Ce que tu obtiens
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base sm:text-lg">
          {[
            "PDF professionnel prêt à vendre",
            "Design moderne cohérent",
            "Chapitres + sommaire automatique",
            "Images IA (option premium)",
            "Licence de revente incluse",
            "Optimisé TikTok / Insta / Gumroad",
            "Idéal comme bonus de formation",
            "Contenu généré selon ta niche",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-white/60 dark:border-gray-800 shadow-sm"
            >
              <CheckCircle2 className="text-blue-600" size={24} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================== */}
      {/* CTA FINAL                                             */}
      {/* ===================================================== */}
      <section className="mt-32 mb-28 text-center px-6 w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Prêt à créer un ebook qui se vend vraiment ?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          En quelques minutes, tu peux avoir un produit digital complet,
          professionnel et revendable.
        </p>

        <Link href="/create/title">
          <Button className="px-10 py-6 text-base sm:text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-300/40">
            Générer mon Ebook maintenant
          </Button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-10 mt-4 border-t border-white/40 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} • E-Book Factory — Tous droits réservés.
      </footer>

      {/* CTA FLOTTANT MOBILE */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <Link href="/create/title">
          <button
            className={
              "px-7 py-4 rounded-3xl flex items-center gap-2 shadow-xl " +
              (isDark ? "glass bg-gray-900/60" : "glass bg-white/70")
            }
          >
            <span className="text-sm font-semibold">
              Créer mon ebook maintenant
            </span>
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>
    </main>
  );
}
