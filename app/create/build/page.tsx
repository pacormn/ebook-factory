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

  // ❗ Fix iOS scroll freeze – Body must NOT scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

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
      <main className="relative w-full h-[100dvh] overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

        {/* BLOBS FIXÉS + overflow-hidden */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-200px] left-[-150px] w-[550px] h-[550px] bg-blue-400/30 dark:bg-blue-800/20 blur-[140px] rounded-full animate-blob-floating" />
          <div className="absolute bottom-[-200px] right-[-150px] w-[550px] h-[550px] bg-purple-400/30 dark:bg-purple-800/20 blur-[150px] rounded-full animate-blob-floating2" />
        </div>

        <Loader2 size={48} className="text-blue-600 animate-spin" />
        <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg">
          Génération de l’aperçu de ton ebook…
        </p>
      </main>
    );

  return (
    <main className="relative w-full h-[100dvh] overflow-y-auto overflow-x-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24">

      {/* BLOBS FIXÉS + overflow-hidden */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-[-150px] w-[550px] h-[550px] bg-blue-400/30 dark:bg-blue-800/20 blur-[140px] rounded-full animate-blob-floating" />
        <div className="absolute bottom-[-200px] right-[-150px] w-[550px] h-[550px] bg-purple-400/30 dark:bg-purple-800/20 blur-[150px] rounded-full animate-blob-floating2" />
      </div>

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

        {/* Mockup 3D */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="group relative w-64 h-96 [perspective:1200px] cover-float mb-8">

            <div className="absolute inset-0 rounded-[1.8rem] bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 
              opacity-60 blur-2xl group-hover:opacity-80 transition-opacity duration-500" />

            <div className="relative h-full w-full rounded-[1.5rem] bg-slate-950/90 dark:bg-slate-950/95 
              border border-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden
              transform-gpu transition-transform duration-500
              group-hover:-rotate-y-6 group-hover:rotate-x-3 group-hover:-translate-y-1">

              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 mix-blend-screen opacity-80" />

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

              <div className="pointer-events-none absolute -inset-x-10 -top-10 h-16 bg-gradient-to-r 
                from-transparent via-white/35 to-transparent opacity-0 cover-shimmer" />
            </div>

            <div className="absolute -left-3 inset-y-4 w-4 rounded-l-[1.5rem] 
              bg-gradient-to-b from-slate-900 to-slate-800 border border-white/10 border-r-0
              shadow-lg transform-gpu -skew-y-3" />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Aperçu de ton ebook
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
            Voici un aperçu ultra personnalisé de ton ebook. Découvre les premières pages
            avant de débloquer la version complète.
          </p>
        </div>

      </section>

      {/* PREVIEW SECTIONS */}
      <section className="max-w-4xl mx-auto px-6">

        {/* COVER */}
        <div className="bg-white/70 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 backdrop-blur-xl shadow-xl rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">📘 Couverture</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {preview.cover}
          </p>
        </div>

        {/* INTRO */}
        <div className="bg-white/70 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 backdrop-blur-xl shadow-xl rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">✨ Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {preview.introduction}
          </p>
        </div>

        {/* CHAPTERS */}
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

        {/* PURCHASE BLOCK */}
        <div className="mt-20 mb-10 w-full px-4">

          <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 
            shadow-xl rounded-2xl p-6 md:p-10 w-full">

            <div className="flex items-center gap-3 mb-4">
              <Lock size={32} className="text-blue-600" />
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                Débloque le livre complet
              </h3>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Obtiens l’ebook entier, prêt à être <span className="font-semibold text-blue-600">revendu immédiatement</span>.
              Une seule vente suffit pour rembourser ton investissement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-600/20">
                <p className="font-semibold text-blue-700 dark:text-blue-300">💸 Remboursé en 1 vente</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Gagne immédiatement après la première vente.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-green-600/10 border border-green-600/20">
                <p className="font-semibold text-green-700 dark:text-green-300">📈 +200% marge</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Revends-le 10€, 19€, 29€, 49€… sans limite.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-600/20">
                <p className="font-semibold text-purple-700 dark:text-purple-300">🔁 Ventes illimitées</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Génère des revenus sans plafond, à vie.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-orange-600/10 border border-orange-600/20">
                <p className="font-semibold text-orange-700 dark:text-orange-300">📄 Licence incluse</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Revente légale incluse, aucune limite.
                </p>
              </div>

            </div>
          </div>

          <div className="mt-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
            shadow-2xl rounded-2xl p-8 w-full max-w-sm mx-auto text-center relative">

            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/30 blur-3xl rounded-full"></div>

            <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Prix exclusif
            </h4>

            <div className="mt-2 mb-6">
              <p className="text-5xl font-extrabold text-blue-600 leading-none">
                10<span className="text-3xl">€</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Paiement unique — accès immédiat
              </p>
            </div>

            <button
              onClick={() => router.push("/pay")}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold 
              rounded-xl shadow-lg transition active:scale-[0.97]"
            >
              Débloquer l’ebook complet →
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              🔒 Paiement sécurisé via Stripe — livraison instantanée
            </p>
          </div>

        </div>

      </section>
    </main>
  );
}
