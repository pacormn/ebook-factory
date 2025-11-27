"use client";

import { useEffect, useState } from "react";
import { useEbookStore } from "@/store/ebook-store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House, Lock, Loader2 } from "lucide-react";

export default function BuildPage() {
  const router = useRouter();

  const {
    title,
    description,
    promise,
    goal,
    style,
    audience,
    audienceLevel,
    audienceProblem,
    chapters,
    preview,
    setPreview,
  } = useEbookStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!title || chapters.length === 0) {
      router.push("/create/title");
      return;
    }

    async function generatePreview() {
      setLoading(true);

      const response = await fetch("/api/ebook-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          promise,
          goal,
          style,
          audience,
          audienceLevel,
          audienceProblem,
          chapters,
        }),
      });

      const data = await response.json();
      setPreview(data);
      setLoading(false);
    }

    if (!preview) generatePreview();
    else setLoading(false);
  }, []);

  if (loading)
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

        <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-blue-400/40 dark:bg-blue-800/20 rounded-full blur-[130px] animate-blob-floating -z-10" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] bg-purple-400/40 dark:bg-purple-800/20 rounded-full blur-[130px] animate-blob-floating2 -z-10" />

        <Loader2 size={48} className="text-blue-600 animate-spin" />
        <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg">Génération de l’aperçu de ton ebook…</p>
      </main>
    );

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24">

      {/* BLOBS */}
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-blue-400/40 dark:bg-blue-800/20 rounded-full blur-[130px] animate-blob-floating -z-10" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] bg-purple-400/40 dark:bg-purple-800/20 rounded-full blur-[130px] animate-blob-floating2 -z-10" />

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

      <div className="h-24" />

      {/* CONTENT */}
<section className="max-w-4xl mx-auto px-6 mt-10">

  {/* HERO + MOCKUP 3D */}
  <div className="flex flex-col items-center text-center mb-16">
    <div className="group relative w-64 h-96 [perspective:1200px] cover-float mb-8">
      {/* Glow derrière */}
      <div
        className="absolute inset-0 rounded-[1.8rem] bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 
                   opacity-60 blur-2xl group-hover:opacity-80 transition-opacity duration-500"
      />

      {/* Livre principal */}
      <div
        className="relative h-full w-full rounded-[1.5rem] bg-slate-950/90 dark:bg-slate-950/95 
                   border border-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden
                   transform-gpu transition-transform duration-500
                   group-hover:-rotate-y-6 group-hover:rotate-x-3 group-hover:-translate-y-1"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Bande brillante */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 mix-blend-screen opacity-80" />

        {/* Contenu de la cover */}
        <div className="relative h-full w-full flex flex-col justify-between p-6 text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-300 mb-3">
              Ebook exclusif
            </p>
            <h2 className="text-xl font-bold text-white leading-snug line-clamp-3">
              {title}
            </h2>
          </div>

          <div className="space-y-2 text-sm text-slate-300 line-clamp-4">
            <p>{preview?.cover}</p>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>{audience || "Débutants ambitieux"}</span>
            <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-200">
              {style || "Style dynamique"}
            </span>
          </div>
        </div>

        {/* Shimmer qui traverse la cover */}
        <div className="pointer-events-none absolute -inset-x-10 -top-10 h-16 bg-gradient-to-r 
                        from-transparent via-white/35 to-transparent opacity-0 cover-shimmer" />
      </div>

      {/* Tranche du livre */}
      <div
        className="absolute -left-3 inset-y-4 w-4 rounded-l-[1.5rem] bg-gradient-to-b 
                   from-slate-900 to-slate-800 border border-white/10 border-r-0
                   shadow-lg transform-gpu -skew-y-3"
        style={{ transformOrigin: "right center" }}
      />
    </div>

    {/* Texte sous le mockup */}
    <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
      Aperçu de ton ebook
    </h1>
    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
      Voici un aperçu ultra personnalisé de ton ebook. Découvre les premières pages
      avant de débloquer la version complète.
    </p>
  </div>

  {/* (Ensuite tu laisses tes blocs Intro / Chapitres / zone verrouillée) */}
</section>

    </main>
  );
}
