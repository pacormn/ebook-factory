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

    {/* HERO - Mockup + titre */}
    <div className="flex flex-col items-center text-center mb-16">
        <div className="relative w-64 h-96 mb-8 drop-shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-xl rotate-[-2deg]" />
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center p-6 rotate-[2deg]">
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-4">Ton ebook est prêt 📘</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
            Voici un aperçu personnalisé de ton ebook. Découvre les premiers chapitres 
            avant de débloquer la version complète.
        </p>
    </div>

    {/* Ce que tu vas apprendre */}
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-300 dark:border-gray-700 mb-16">
        <h2 className="text-2xl font-bold mb-4">🎯 Ce que tu vas apprendre</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-lg">
            <li className="flex gap-2 items-center"><span className="text-blue-600">✔</span> {promise}</li>
            <li className="flex gap-2 items-center"><span className="text-blue-600">✔</span> {goal}</li>
            <li className="flex gap-2 items-center"><span className="text-blue-600">✔</span> Comment {audienceProblem}</li>
            <li className="flex gap-2 items-center"><span className="text-blue-600">✔</span> Adapté pour {audience}</li>
        </ul>
    </div>

    {/* COVER */}
    <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-3">📘 Couverture</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg whitespace-pre-line">{preview.cover}</p>
    </div>

    {/* INTRODUCTION */}
    <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-3">✨ Introduction</h2>

        {/* Apparition progressive du texte */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg animate-fadeIn">
            {preview.introduction}
        </p>
    </div>

    {/* Chapitres visibles */}
    {preview.chapters.map((c: any, idx: number) => (
        <div
            key={idx}
            className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg mb-10 animate-slideUp"
            style={{ animationDelay: `${idx * 0.3}s` }}
        >
            <h2 className="text-2xl font-bold mb-3">📖 {c.title}</h2>
            
            {/* Extrait, pas tout */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line line-clamp-5">
                {c.content}
            </p>

            <button className="text-blue-600 hover:underline mt-3">
                Lire l’extrait complet →
            </button>
        </div>
    ))}

    {/* ZONE VERROUILLÉE */}
    <div className="text-center mt-20">
        <div className="bg-gray-300/20 dark:bg-gray-700/30 border border-gray-400 dark:border-gray-600 rounded-2xl p-10 backdrop-blur-xl relative">
            
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Lock size={48} className="text-white/80" />
            </div>

            <h2 className="text-2xl font-bold mb-4">Les autres chapitres sont verrouillés 🔒</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto mb-6">
                Débloque l’ebook complet pour lire l’intégralité des chapitres, 
                les stratégies avancées et toutes les méthodes exclusives.
            </p>

            <Button
                className="px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl"
                onClick={() => router.push("/pay")}
            >
                Débloquer l’ebook complet →
            </Button>
        </div>
    </div>

</section>
    </main>
  );
}
