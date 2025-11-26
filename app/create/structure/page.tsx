"use client";

import { useEffect, useRef, useState } from "react";
import { useEbookStore } from "@/store/ebook-store";
import { useRouter } from "next/navigation";
import { generateStructure } from "@/lib/generateStructure";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, House, Loader2, Plus, Trash2 } from "lucide-react";

// Typage du chapitre pour Typescript
type Chapter = { id: string; title: string };

export default function StructurePage() {
  const router = useRouter();
  const { title, chapters, setChapters } = useEbookStore();

  // Typage explicite
  const [localChapters, setLocalChapters] = useState<Chapter[]>(chapters);
  const [loading, setLoading] = useState(false);

  // Flag pour éviter les appels infinis
  const hasGenerated = useRef(false);

  useEffect(() => {
    async function load() {

      // si déjà exécuté → STOP
      if (hasGenerated.current) return;

      if (!title) {
        router.push("/create/title");
        return;
      }

      // si déjà généré → hydrate local
      if (chapters.length > 0) {
        hasGenerated.current = true;
        setLocalChapters(chapters);
        return;
      }

      // On marque comme exécuté AVANT l’appel
      hasGenerated.current = true;

      setLoading(true);

      try {
        const result = await generateStructure(title);

        const formatted = result.map((c: any) => ({
          id: crypto.randomUUID(),
          title: c.title,
        }));

        setChapters(formatted);
        setLocalChapters(formatted);

      } catch (err) {
        console.error("Erreur generateStructure:", err);
      }

      setLoading(false);
    }

    load();

  }, [title, chapters, router, setChapters]);


  // Modifie un chapitre
  function updateChapter(id: string, value: string) {
    setLocalChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: value } : c))
    );
  }

  // Supprime un chapitre
  function removeChapter(id: string) {
    setLocalChapters((prev) => prev.filter((c) => c.id !== id));
  }

  // Ajoute un chapitre
  function addChapter() {
    setLocalChapters((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "" },
    ]);
  }

  // Étape suivante
  function handleNext() {
    setChapters(localChapters);
    router.push("/create/description");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 bg-dynamic">

      {/* BLOBS */}
      <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-400/40 dark:bg-blue-700/20 blur-[135px] animate-blob-floating -z-10" />
      <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] rounded-full bg-purple-400/40 dark:bg-purple-700/20 blur-[130px] animate-blob-floating2 -z-10" />

      {/* HEADER */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[70%] px-6 py-3 glass-bar rounded-3xl navbar-pop shadow-xl">
        <div className="flex items-center justify-between">

          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-7 w-7 bg-blue-600 rounded-xl" />
              <h1 className="text-lg font-semibold">E-Book Factory</h1>
            </div>
          </Link>

          <Link href="/">
            <button className="glass-bar px-3 py-2 rounded-xl flex items-center gap-2 text-sm">
              <House size={16} />
              <span className="hidden sm:inline">Retour à l'accueil</span>
            </button>
          </Link>

        </div>
      </div>

      <div className="h-20" />

      <section className="max-w-3xl mx-auto text-center px-6 mt-14">

        <h2 className="text-4xl md:text-5xl font-extrabold">
          Génération de la{" "}
          <span className="text-blue-600 dark:text-blue-400">structure</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
          Voici les chapitres proposés pour :<br />
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            "{title}"
          </span>
        </p>

        {loading ? (
          <div className="flex flex-col items-center gap-4 mt-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Génération de la structure…
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-4 text-left">

            {localChapters.map((chapter) => (
              <div key={chapter.id} className="flex items-center gap-3">
                <input
                  className="flex-1 px-5 py-4 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-300 dark:border-gray-700 shadow-md text-lg"
                  value={chapter.title}
                  onChange={(e) => updateChapter(chapter.id, e.target.value)}
                />

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeChapter(chapter.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}

            <Button
              onClick={addChapter}
              className="w-full mt-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-4 text-lg rounded-2xl flex items-center gap-2 justify-center"
            >
              <Plus size={18} /> Ajouter un chapitre
            </Button>

            <Button
              onClick={handleNext}
              className="w-full mt-10 px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700"
            >
              Suivant <ArrowRight className="ml-2" />
            </Button>

          </div>
        )}
      </section>

      <div className="h-32" />
    </main>
  );
}
