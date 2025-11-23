"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center w-full">
      
      {/* HEADER */}
      <header className="w-full flex items-center justify-between py-6 px-6 lg:px-16">
        <h1 className="text-2xl font-bold">E-Book Factory</h1>
        <Link href="/create/title">
          <Button className="font-semibold">Créer un Ebook</Button>
        </Link>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center mt-10 px-6 lg:px-0 max-w-3xl">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
          Crée ton Ebook <span className="text-blue-600">vendable</span> en 30 secondes
        </h1>

        <p className="text-lg text-muted-foreground mt-4">
          Génère un ebook professionnel, illustré et prêt à la vente — parfait pour TikTok,
          Instagram et les créateurs de contenu.
        </p>

        <Link href="/create/title" className="mt-8">
          <Button className="px-10 py-6 text-lg font-semibold flex items-center gap-2">
            Commencer maintenant
            <ArrowRight />
          </Button>
        </Link>

        {/* MOCKUP PLACEHOLDER */}
        <div className="mt-12 w-full max-w-xl h-64 bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl shadow-lg animate-pulse">
          <p className="text-white text-center pt-24 text-xl font-semibold opacity-80">
            Aperçu Ebook (mockup à venir)
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-24 px-6 max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-center mb-12">
          Comment ça marche ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="p-6 border rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">1. Décris ta niche</h3>
            <p className="text-muted-foreground">
              Laisse notre IA comprendre ton audience et ton sujet.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">2. Choisis ton style</h3>
            <p className="text-muted-foreground">
              Design, police, longueur, images IA — tout est personnalisable.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">3. Génère ton ebook</h3>
            <p className="text-muted-foreground">
              Obtiens un ebook pro avec une licence de revente incluse.
            </p>
          </div>

        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="mt-24 px-6 max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce que tu obtiens
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <li className="p-4 border rounded-xl">📘 Ebook PDF professionnel</li>
          <li className="p-4 border rounded-xl">🎨 Style & design personnalisable</li>
          <li className="p-4 border rounded-xl">🖼️ Images IA (premium)</li>
          <li className="p-4 border rounded-xl">💼 Licence de revente incluse</li>
          <li className="p-4 border rounded-xl">📑 Sommaire structuré</li>
          <li className="p-4 border rounded-xl">🚀 Ebook prêt à être vendu</li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="mt-24 mb-24">
        <Link href="/create/title">
          <Button className="px-10 py-6 text-xl font-semibold">
            Créer mon ebook maintenant
          </Button>
        </Link>
      </section>

    </main>
  );
}
