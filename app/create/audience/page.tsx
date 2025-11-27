"use client";

import { useEbookStore } from "@/store/ebook-store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, House } from "lucide-react";
import { useState } from "react";

export default function AudiencePage() {
  const router = useRouter();

  const {
    audience,
    audienceLevel,
    audienceProblem,
    setAudience,
    setAudienceLevel,
    setAudienceProblem,
  } = useEbookStore();

  const [localAudience, setLocalAudience] = useState(audience);
  const [localLevel, setLocalLevel] = useState(audienceLevel);
  const [localProblem, setLocalProblem] = useState(audienceProblem);

  function handleNext() {
    setAudience(localAudience);
    setAudienceLevel(localLevel);
    setAudienceProblem(localProblem);

    router.push("/create/style");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white 
    dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 bg-dynamic">

      {/* BLOBS */}
      <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] rounded-full 
      bg-blue-400/40 dark:bg-blue-700/20 blur-[135px] animate-blob-floating -z-10" />

      <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] rounded-full 
      bg-purple-400/40 dark:bg-purple-700/20 blur-[130px] animate-blob-floating2 -z-10" />

      {/* HEADER */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
      w-[92%] md:w-[70%] px-6 py-3 glass-bar rounded-3xl navbar-pop shadow-xl">
        <div className="flex items-center justify-between">
          
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-7 w-7 bg-blue-600 rounded-xl"></div>
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

      <div className="h-20" />

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto text-center px-6 mt-14 animate-fade-in">

        <h2 className="text-4xl md:text-5xl font-extrabold">
          Cible ton{" "}
          <span className="text-blue-600 dark:text-blue-400">audience</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
          L&apos;IA écrira un ebook parfaitement adapté si elle connaît ton lecteur idéal.
        </p>

        {/* FORM */}
        <div className="mt-12 space-y-8 text-left">

          {/* AUDIENCE */}
          <div className="fade-in-up">
            <label className="block text-sm font-semibold mb-2">
              Pour qui écris-tu cet ebook ?
            </label>
            <input
              value={localAudience}
              onChange={(e) => setLocalAudience(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl 
              bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl 
              border border-gray-300 dark:border-gray-700 shadow-md"
              placeholder="Ex : Débutants en business, créateurs TikTok, freelances..."
            />
          </div>

          {/* NIVEAU */}
          <div className="fade-in-up" style={{ animationDelay: "80ms" }}>
            <label className="block text-sm font-semibold mb-2">
              Niveau du lecteur
            </label>
            <select
              value={localLevel}
              onChange={(e) => setLocalLevel(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl 
              bg-white/70 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 shadow-md"
            >
              <option value="">Choisir...</option>
              <option value="débutant">Débutant</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé / Expert</option>
            </select>
          </div>

          {/* PROBLÈME */}
          <div className="fade-in-up" style={{ animationDelay: "160ms" }}>
            <label className="block text-sm font-semibold mb-2">
              Problème principal de ton audience
            </label>
            <textarea
              value={localProblem}
              onChange={(e) => setLocalProblem(e.target.value)}
              className="w-full h-28 px-5 py-4 rounded-2xl 
              bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl 
              border border-gray-300 dark:border-gray-700 shadow-md"
              placeholder="Ex : manque de clarté, difficulté à se lancer, manque de connaissances..."
            />
          </div>
        </div>

        {/* NEXT BUTTON */}
        <div className="mt-10">
          <Button
            onClick={handleNext}
            disabled={!localAudience.trim() || !localLevel.trim()}
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
