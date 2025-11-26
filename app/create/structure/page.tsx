"use client";

import { useEbookStore } from "@/store/ebook-store";
import { Button } from "@/components/ui/button";

export default function StructurePage() {
  const { title, chapters, setChapters } = useEbookStore();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Structure de l’ ebook</h1>
      <p className="text-gray-600 mb-4">Titre : {title || "Aucun titre"}</p>

      {/* Ton UI pour ajouter des chapitres */}
    </div>
  );
}
