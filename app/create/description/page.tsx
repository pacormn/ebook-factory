"use client";

import { useEbookStore } from "@/store/ebook-store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, House } from "lucide-react";
import { useState } from "react";

export default function DescriptionPage() {
  const router = useRouter();

  const {
    title,
    description,
    promise,
    goal,
    style,
    setDescription,
    setPromise,
    setGoal,
    setStyle,
  } = useEbookStore();

  const [localDescription, setLocalDescription] = useState(description);
  const [localPromise, setLocalPromise] = useState(promise);
  const [localGoal, setLocalGoal] = useState(goal);

  function handleNext() {
    setDescription(localDescription);
    setPromise(localPromise);
    setGoal(localGoal);

    router.push("/create/audience");
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 bg-dynamic">

      {/* BLOBS */}
      <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-400/40 dark:bg-blue-700/20 blur-[135px] animate-blob-floating -z-10" />
      <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] rounded-full bg-purple-400/40 dark:bg-purple-700/20 blur-[130px] animate-blob-floating2 -z-10" />

      {/* HEADER */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[70%] px-6 py-3 glass-bar rounded-3xl navbar-pop shadow-xl">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-7 w-7 bg-blue-600 rounded-xl"></div>
              <h1 className="text-lg font-semibold">E-Book Factory</h1>
            </div>
          </Link>

          {/* RETOUR */}
          <Link href="/">
            <button className="glass-bar px-3 py-2 rounded-xl flex items-center gap-2 text-sm whitespace-nowrap">
              <House size={16} />
              <span className="hidden sm:inline">Accueil</span>
            </button>
          </Link>
        </div>
      </div>

      {/* ESPACE */}
      <div className="h-20" />

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto text-center px-6 mt-14">

        <h2 className="text-4xl md:text-5xl font-extrabold">
          Décris ton{" "}
          <span className="text-blue-600 dark:text-blue-400">ebook</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
          Ces informations permettront à l&apos;IA de produire un contenu cohérent, puissant et adapté à ton audience.
        </p>

        {/* FORM */}
        <div className="mt-12 space-y-8 text-left">

          {/* RESUME */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Résumé de l&apos;ebook
            </label>
            <textarea
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              className="w-full h-32 px-5 py-4 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-300 dark:border-gray-700 shadow-md"
              placeholder="Explique en quelques lignes ce que ton ebook va apporter..."
            />
          </div>

          {/* PROMESSE PRINCIPALE */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Promesse principale (optionnel)
            </label>
            <input
              value={localPromise}
              onChange={(e) => setLocalPromise(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-white/70 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 shadow-md"
              placeholder="Exemple : Créer un business rentable en 30 jours..."
            />
          </div>

          {/* OBJECTIF DU LECTEUR */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Objectif du lecteur (optionnel)
            </label>
            <input
              value={localGoal}
              onChange={(e) => setLocalGoal(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-white/70 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 shadow-md"
              placeholder="Ex : Apprendre les bases, devenir expert rapidement..."
            />
          </div>

        </div>

        {/* NEXT */}
        <div className="mt-10">
          <Button
            onClick={handleNext}
            disabled={!localDescription.trim()}
            className="px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            Suivant <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      <div className="h-32" />
    </main>
  );
}
