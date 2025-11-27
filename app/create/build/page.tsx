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
      <section className="max-w-4xl mx-auto px-6">

        <h1 className="text-4xl font-extrabold text-center mb-10">
          Aperçu de ton ebook
        </h1>

        {/* COVER */}
        <div className="bg-white/70 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 backdrop-blur-xl shadow-xl rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">📘 Couverture</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {preview.cover}
          </p>
        </div>

        {/* INTRODUCTION */}
        <div className="bg-white/70 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 backdrop-blur-xl shadow-xl rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">✨ Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {preview.introduction}
          </p>
        </div>

        {/* FIRST CHAPTERS */}
        {preview.chapters.map((c: any, i: number) => (
          <div
            key={i}
            className="bg-white/70 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 backdrop-blur-xl shadow-xl rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">📖 {c.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {c.content}
            </p>
          </div>
        ))}

        {/* LOCKED CHAPTERS */}
        <div className="text-center mt-20 mb-10">
          <Lock size={40} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Les autres chapitres sont verrouillés 🔒</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Débloque le livre complet pour accéder à tout le contenu.
          </p>

          <Button
            onClick={() => router.push("/pay")}
            className="px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 mt-6"
          >
            Débloquer l’ebook complet
          </Button>
        </div>

      </section>
    </main>
  );
}
