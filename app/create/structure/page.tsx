"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEbookStore } from "@/store/ebook-store";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function StructurePage() {
  const router = useRouter();

  const { chapters, setChapters, title } = useEbookStore();

  const [localChapters, setLocalChapters] = useState(
    chapters.length > 0
      ? chapters
      : [{ id: crypto.randomUUID(), title: "Introduction" }]
  );

  const addChapter = () => {
    setLocalChapters([
      ...localChapters,
      { id: crypto.randomUUID(), title: "" },
    ]);
  };

  const removeChapter = (id: string) => {
    setLocalChapters(localChapters.filter((c) => c.id !== id));
  };

  const updateChapterTitle = (id: string, value: string) => {
    setLocalChapters(
      localChapters.map((c) =>
        c.id === id ? { ...c, title: value } : c
      )
    );
  };

  const handleNext = () => {
    setChapters(localChapters);
    router.push("/create/description");
  };

  return (
    <div className="flex flex-col items-center px-4 mt-10">
      <div className="w-full max-w-xl space-y-6">
        
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Structure de l’Ebook</h1>
          <p className="text-gray-500 mt-1">
            Titre sélectionné : <span className="font-semibold">{title}</span>
          </p>
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          {localChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="flex gap-2 items-center"
            >
              <input
                type="text"
                value={chapter.title}
                onChange={(e) =>
                  updateChapterTitle(chapter.id, e.target.value)
                }
                placeholder="Titre du chapitre"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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

        {/* ADD CHAPTER */}
        <Button
          variant="secondary"
          className="w-full flex items-center gap-2"
          onClick={addChapter}
        >
          <Plus className="w-4 h-4" />
          Ajouter un chapitre
        </Button>

        {/* NEXT BUTTON */}
        <Button
          className="w-full bg-black hover:bg-black/90 text-white py-3"
          onClick={handleNext}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
