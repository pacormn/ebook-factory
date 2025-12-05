"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EBOOK_THEMES, EbookThemeId } from "@/config/themes";

export default function CreatePage() {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [pages, setPages] = useState(10);
  const [themeId, setThemeId] = useState<EbookThemeId>("digital-business");
  const [loading, setLoading] = useState(false);

  const generateEbook = async () => {
    if (!topic.trim()) {
      alert("Veuillez entrer un sujet.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/generate-ebook", {
      method: "POST",
      body: JSON.stringify({
        topic,
        pages,
        language: "fr",
        themeId,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      console.error("Erreur API :", data);
      alert("Erreur lors de la génération.");
      return;
    }

    // 🔥 Redirection vers l'aperçu
    router.push(`/ebook/print?id=${data.ebookId}`);
  };

  return (
    <div className="p-10 space-y-10 text-white">
      <h1 className="text-4xl font-bold">Créer un Ebook</h1>

      {/* Formulaire */}
      <div className="space-y-6 max-w-xl">

        {/* Sujet */}
        <div>
          <label className="block mb-2 text-lg font-medium">Sujet</label>
          <input
            className="w-full bg-white/10 p-3 rounded-lg text-white"
            placeholder="Ex : Lancer un business rentable en 2025"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Nombre de pages */}
        <div>
          <label className="block mb-2 text-lg font-medium">Nombre de pages</label>
          <input
            type="number"
            min={5}
            max={80}
            className="w-full bg-white/10 p-3 rounded-lg text-white"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
          />
        </div>

        {/* Styles */}
        <div>
          <label className="block mb-3 text-lg font-medium">Style du thème</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {Object.values(EBOOK_THEMES).map((theme) => (
              <button
                type="button"
                key={theme.id}
                onClick={() => setThemeId(theme.id)}
                className={`rounded-xl p-4 text-left border transition 
                ${themeId === theme.id ? "border-yellow-400" : "border-white/20"} 
                `}
                style={{ background: theme.backgroundGradient }}
              >
                <div className="font-semibold">{theme.name}</div>
                <div className="opacity-70 text-sm">{theme.description}</div>
              </button>
            ))}

          </div>
        </div>

        {/* Bouton Générer */}
<button
  onClick={generateEbook}
  disabled={loading}
  className={`px-6 py-3 rounded-xl w-full font-semibold transition
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300 text-black"}
  `}
>
  {loading ? (
    <span className="flex items-center justify-center gap-3">
      <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
      Génération en cours…
    </span>
  ) : (
    "Générer l’Ebook"
  )}
</button>

      </div>
    </div>
  );
}
