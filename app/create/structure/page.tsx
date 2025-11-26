"use client";

import { useEffect, useRef, useState } from "react";
import { useEbookStore } from "@/store/ebook-store";
import { useRouter } from "next/navigation";
import { generateStructure } from "@/lib/generateStructure";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  House,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

// Types pour les chapitres + sections
type Section = {
  id: string;
  title: string;
};

type Chapter = {
  id: string;
  title: string;
  sections: Section[];
};

export default function StructurePage() {
  const router = useRouter();
  const { title, chapters, setChapters } = useEbookStore();

  // On suppose que le store peut accepter sections (tu peux adapter le type dans ton store)
  const [localChapters, setLocalChapters] = useState<Chapter[]>(
    (chapters as any)?.length
      ? (chapters as any)
      : []
  );
  const [loading, setLoading] = useState(false);
  const hasGenerated = useRef(false);

  // Charge + génère la structure une seule fois
  useEffect(() => {
    async function load() {
      if (hasGenerated.current) return;

      if (!title) {
        router.push("/create/title");
        return;
      }

      if ((chapters as any)?.length > 0) {
        hasGenerated.current = true;
        // On suppose que chapters dans le store est déjà bien formé
        setLocalChapters(chapters as any);
        return;
      }

      hasGenerated.current = true;
      setLoading(true);

      try {
        const result = await generateStructure(title);
        // result = [{ title, sections: [{ title }, ...] }, ...]

        const formatted: Chapter[] = result.map((c: any) => ({
          id: crypto.randomUUID(),
          title: c.title,
          sections: Array.isArray(c.sections)
            ? c.sections.map((s: any) => ({
                id: crypto.randomUUID(),
                title: s.title,
              }))
            : [],
        }));

        setChapters(formatted as any);
        setLocalChapters(formatted);
      } catch (err) {
        console.error("Erreur generateStructure:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [title, chapters, router, setChapters]);

  // --- Drag & Drop handlers ---

  function handleDragEnd(result: DropResult) {
    const { destination, source, type } = result;
    if (!destination) return;

    // Pas de mouvement
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Réorganisation des chapitres
    if (type === "CHAPTER") {
      setLocalChapters((prev) => {
        const items = Array.from(prev);
        const [moved] = items.splice(source.index, 1);
        items.splice(destination.index, 0, moved);
        return items;
      });
      return;
    }

    // Réorganisation des sections
    if (type === "SECTION") {
      const sourceChapterId = source.droppableId;
      const destChapterId = destination.droppableId;

      setLocalChapters((prev) => {
        const updated = [...prev];

        const sourceChapterIndex = updated.findIndex(
          (c) => c.id === sourceChapterId
        );
        const destChapterIndex = updated.findIndex(
          (c) => c.id === destChapterId
        );
        if (sourceChapterIndex === -1 || destChapterIndex === -1) return prev;

        const sourceChapter = updated[sourceChapterIndex];
        const destChapter = updated[destChapterIndex];

        const sourceSections = Array.from(sourceChapter.sections);
        const [movedSection] = sourceSections.splice(source.index, 1);

        if (sourceChapterId === destChapterId) {
          // Move dans le même chapitre
          sourceSections.splice(destination.index, 0, movedSection);
          updated[sourceChapterIndex] = {
            ...sourceChapter,
            sections: sourceSections,
          };
        } else {
          // Move cross chapitre
          const destSections = Array.from(destChapter.sections);
          destSections.splice(destination.index, 0, movedSection);

          updated[sourceChapterIndex] = {
            ...sourceChapter,
            sections: sourceSections,
          };
          updated[destChapterIndex] = {
            ...destChapter,
            sections: destSections,
          };
        }

        return updated;
      });
    }
  }

  // --- CRUD Chapitres & Sections ---

  function updateChapterTitle(id: string, value: string) {
    setLocalChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: value } : c))
    );
  }

  function removeChapter(id: string) {
    setLocalChapters((prev) => prev.filter((c) => c.id !== id));
  }

  function addChapter() {
    setLocalChapters((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        sections: [],
      },
    ]);
  }

  function addSection(chapterId: string) {
    setLocalChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? {
              ...c,
              sections: [
                ...c.sections,
                { id: crypto.randomUUID(), title: "" },
              ],
            }
          : c
      )
    );
  }

  function updateSectionTitle(chapterId: string, sectionId: string, value: string) {
    setLocalChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? {
              ...c,
              sections: c.sections.map((s) =>
                s.id === sectionId ? { ...s, title: value } : s
              ),
            }
          : c
      )
    );
  }

  function removeSection(chapterId: string, sectionId: string) {
    setLocalChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? {
              ...c,
              sections: c.sections.filter((s) => s.id !== sectionId),
            }
          : c
      )
    );
  }

  function handleNext() {
    setChapters(localChapters as any);
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
              <span className="hidden sm:inline">Retour à l&apos;accueil</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="h-20" />

      <section className="max-w-3xl mx-auto text-center px-6 mt-14">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Organise la{" "}
          <span className="text-blue-600 dark:text-blue-400">structure</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
          Chapitres et sous-parties générés pour :<br />
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
          <div className="mt-12 text-left">
            <DragDropContext onDragEnd={handleDragEnd}>
              {/* CHAPTERS DnD */}
              <Droppable droppableId="chapters" type="CHAPTER">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {localChapters.map((chapter, index) => (
                      <Draggable
                        key={chapter.id}
                        draggableId={chapter.id}
                        index={index}
                      >
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            className="rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-lg p-4"
                          >
                            <div className="flex items-start gap-3">
                              {/* Handle drag chapitre */}
                              <div
                                {...dragProvided.dragHandleProps}
                                className="mt-2 cursor-grab active:cursor-grabbing text-gray-400"
                              >
                                <GripVertical size={18} />
                              </div>

                              <div className="flex-1 space-y-3">
                                {/* Titre du chapitre */}
                                <input
                                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 shadow-sm text-base font-medium"
                                  value={chapter.title}
                                  onChange={(e) =>
                                    updateChapterTitle(
                                      chapter.id,
                                      e.target.value
                                    )
                                  }
                                />

                                {/* SECTIONS - DnD dans chaque chapitre */}
                                <Droppable
                                  droppableId={chapter.id}
                                  type="SECTION"
                                >
                                  {(sectionProvided) => (
                                    <div
                                      ref={sectionProvided.innerRef}
                                      {...sectionProvided.droppableProps}
                                      className="space-y-2 mt-2 pl-1"
                                    >
                                      {chapter.sections.map(
                                        (section, sIndex) => (
                                          <Draggable
                                            key={section.id}
                                            draggableId={section.id}
                                            index={sIndex}
                                          >
                                            {(sectionDragProvided) => (
                                              <div
                                                ref={sectionDragProvided.innerRef}
                                                {...sectionDragProvided.draggableProps}
                                                className="flex items-center gap-2"
                                              >
                                                {/* Handle drag section */}
                                                <div
                                                  {...sectionDragProvided.dragHandleProps}
                                                  className="cursor-grab active:cursor-grabbing text-gray-400"
                                                >
                                                  <GripVertical size={14} />
                                                </div>

                                                <input
                                                  className="flex-1 px-3 py-2 rounded-xl bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
                                                  value={section.title}
                                                  onChange={(e) =>
                                                    updateSectionTitle(
                                                      chapter.id,
                                                      section.id,
                                                      e.target.value
                                                    )
                                                  }
                                                />

                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-8 w-8"
                                                  onClick={() =>
                                                    removeSection(
                                                      chapter.id,
                                                      section.id
                                                    )
                                                  }
                                                >
                                                  <Trash2 size={14} />
                                                </Button>
                                              </div>
                                            )}
                                          </Draggable>
                                        )
                                      )}
                                      {sectionProvided.placeholder}
                                    </div>
                                  )}
                                </Droppable>

                                {/* Bouton ajouter section */}
                                <button
                                  type="button"
                                  onClick={() => addSection(chapter.id)}
                                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  + Ajouter une sous-partie
                                </button>
                              </div>

                              {/* Supprimer chapitre */}
                              <Button
                                variant="destructive"
                                size="icon"
                                className="mt-1"
                                onClick={() => removeChapter(chapter.id)}
                              >
                                <Trash2 size={18} />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* Ajouter chapitre */}
            <Button
              onClick={addChapter}
              className="w-full mt-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-4 text-lg rounded-2xl flex items-center gap-2 justify-center"
            >
              <Plus size={18} /> Ajouter un chapitre
            </Button>

            {/* Suivant */}
            <Button
              onClick={handleNext}
              className="w-full mt-8 px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700"
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
