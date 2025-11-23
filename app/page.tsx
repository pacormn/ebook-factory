"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center w-full">
      
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

      {/* HEADER */}
      <header className="w-full flex items-center justify-between py-6 px-6 lg:px-20">
        <h1 className="text-2xl font-bold tracking-tight">E-Book Factory</h1>
        <Link href="/create/title">
          <Button className="font-semibold px-6">Créer un Ebook</Button>
        </Link>
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center text-center mt-14 px-6 max-w-3xl">
        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          Génère un Ebook <span className="text-blue-600">professionnel</span> <br />
          prêt à vendre en 30 secondes
        </h1>

        <p className="text-lg text-gray-600 mt-4 max-w-2xl">
          Crée instantanément des ebooks designés, illustrés et vendables.  
          Parfait pour TikTok, Instagram, créateurs de formations et entrepreneurs.
        </p>

        <Link href="/create/title">
          <Button className="mt-8 px-10 py-6 text-lg rounded-xl shadow-lg shadow-blue-200 font-semibold flex items-center gap-2">
            Commencer maintenant
            <ArrowRight size={22} />
          </Button>
        </Link>

        {/* MOCKUP */}
        <div className="mt-14 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border bg-white">
          <div className="h-64 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
            <span className="text-white text-xl font-semibold opacity-80">
              Aperçu du rendu (mockup)
            </span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-28 px-6 w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">1. Décris ta niche</h3>
            <p className="text-gray-600">
              L’IA analyse ton sujet et génère plusieurs titres vendeurs automatiquement.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">2. Personnalise ton style</h3>
            <p className="text-gray-600">
              Choisis police, couleur, style visuel, longueur et images.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">3. Génère ton ebook</h3>
            <p className="text-gray-600">
              Obtiens un PDF professionnel avec licence de revente immédiate.
            </p>
          </div>

        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="mt-28 px-6 w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Ce que tu obtiens</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          {[
            "Ebook PDF professionnel",
            "Licence de revente incluse",
            "Images générées par IA (premium)",
            "Contenu structuré et unique",
            "Sommaire + chapitres optimisés",
            "Compatible TikTok, Insta, Gumroad"
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm border"
            >
              <CheckCircle2 className="text-blue-600" size={22} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-28 mb-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Prêt à créer ton ebook ?</h2>

        <Link href="/create/title">
          <Button className="px-10 py-6 text-xl rounded-xl shadow-md shadow-blue-200 font-semibold">
            Générer mon ebook maintenant
          </Button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-10 mt-10 border-t text-center text-gray-500">
        © {new Date().getFullYear()} E-Book Factory — Tous droits réservés.
      </footer>
    </main>
  );
}
