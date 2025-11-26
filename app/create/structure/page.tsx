"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEbookStore } from "@/store/ebook-store";
import { generateStructure } from "@/app/actions/generateStructure";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2 } from "lucide-react";

export default function StructurePage() {
  const router = useRouter();

  const { title, chapters, setChapters } = useEbookStore();

  const [loading, setLoading] = useState(!chapters.length);
  const [localChapters, setLocalChapters] = useState(chapters);

  // 🔥 Génération auto après arrivée sur la page
  useEffect(() => {
    async function load() {
      if (!title) return;

      // si déjà généré → skip
      if (chapters.length > 0) {
        setLocalChapters(chapters);
        setLoading(false);
        return;
      }

      setLoading(true);
      const result = await generateStructure(title);

      // format attendu : [{title:"..."}, ...]
      const formatted = result.map((c: any) => ({
        id: crypto.randomUUID(),
        title: c.title,
      }));

      setLocalChapters(formatted);
      setChapters(formatted);
      setLoading(false);
    }

    load();
  }, []);

  const updateChapterTitle = (id: string, v: string) => {
    setLocalChapters(
      localChapters.map((c) => (c.id === id ? { ...c, title: v } : c))
    );
  };

  const removeChapter = (id: string) => {
    setLocalChapters(localChapters.filter((c) => c.id !== id));
  };

  const addChapter = () => {
    setLocalChapters([
      ...localChapters,
      { id: crypto.randomUUID(), title: "" },
    ]);
  };

  const handleNext = () => {
    setChapters(localChapters);
    router.push("/create/description");
  };

  return (
    <div className="flex flex-col items-center px-4 mt-10">
      <div className="w-full max-w-xl space-y-6">

        <div className="text-center">
          <h1 className="text-3xl font-bold">Structure de l’Ebook</h1>
          <p className="text-gray-500 mt-1">Titre : {title}</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-2 py-10 text-gray-600">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p>Génération automatique de la structure…</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {localChapters.map((chapter) => (
                <div key={chapter.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={chapter.title}
                    onChange={(e) =>
                      updateChapterTitle(chapter.id, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeChapter(chapter.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="secondary" className="w-full" onClick={addChapter}>
              <Plus className="w-4 h-4" /> Ajouter un chapitre
            </Button>

            <Button className="w-full bg-black text-white" onClick={handleNext}>
              Suivant
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
