"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, House, Sparkles } from "lucide-react";
import TitleIdeasModal from "@/components/TitleIdeasModal";

export default function TitlePage() {
  const [title, setTitle] = useState("");
  const [isIdeasModalOpen, setIdeasModalOpen] = useState(false);

  const handlePickTitle = (newTitle: string) => {
    setTitle(newTitle);
    setIdeasModalOpen(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* ======= BACKGROUND DYNAMIQUE ======= */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />

      {/* Radial lights */}
      <div className="absolute -top-[20%] -left-[20%] w-[600px] h-[600px] rounded-full bg-blue-400/40 blur-[150px] opacity-70 -z-10" />
      <div className="absolute top-[20%] right-[0%] w-[500px] h-[500px] rounded-full bg-purple-500/30 blur-[140px] opacity-60 -z-10" />

      {/* HEADER BULLE */}
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
            <button
              className="glass-bar px-3 py-2 rounded-xl flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <House size={16} />
              <span className="hidden sm:inline">Retour à l&apos;accueil</span>
            </button>
          </Link>
        </div>
      </div>

      {/* ESPACE SOUS HEADER */}
      <div className="h-20" />

      {/* MAIN CONTENT */}
      <section className="max-w-3xl mx-auto text-center px-6 mt-14">
        
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Choisis un{" "}
          <span className="text-blue-600 dark:text-blue-400">titre puissant</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
          Ce titre apparaîtra sur la couverture de ton ebook. Prends quelque chose
          d’impactant, clair et vendeur.
        </p>

        {/* INPUT TITRE */}
        <div className="mt-14">
          <input
            type="text"
            placeholder="Exemple : Les Secrets d’un Business Instagram"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-6 py-6 text-xl md:text-2xl rounded-2xl border border-gray-300 dark:border-gray-700
                       bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        {/* BOUTON 'Pas d’idée de nom ?' */}
        <button
          type="button"
          onClick={() => setIdeasModalOpen(true)}
          className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-center gap-1 mx-auto"
        >
          <Sparkles size={14} />
          Pas d&apos;idée de nom ?
        </button>

        {/* CTA SUIVANT */}
        <div className="mt-10">
          <Link href="/create/description">
            <Button
              disabled={!title.trim()}
              className="px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              Suivant <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* SPACER FINAL */}
      <div className="h-32" />

      {/* MODALE D'IDÉES DE TITRE */}
      <TitleIdeasModal
        isOpen={isIdeasModalOpen}
        onClose={() => setIdeasModalOpen(false)}
        onPickTitle={handlePickTitle}
      />
    </main>
  );
}
