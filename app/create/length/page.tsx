"use client";

import { useEbookStore } from "@/store/ebook-store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, House } from "lucide-react";
import { useState } from "react";

const LENGTH_CHOICES = [
  {
    id: "short",
    title: "Essentiel",
    pages: "20–30 pages",
    icon: "📘",
    desc: "Rapide, clair, idéal pour un ebook percutant.",
  },
  {
    id: "medium",
    title: "Standard",
    pages: "40–70 pages",
    icon: "📗",
    desc: "Le format parfait : riche mais facile à lire.",
  },
  {
    id: "long",
    title: "Complet",
    pages: "100–150 pages",
    icon: "📕",
    desc: "Très détaillé, idéal pour un livre complet.",
  },
];

export default function LengthPage() {
  const router = useRouter();
  const { length, setLength } = useEbookStore();

  const [localLength, setLocalLength] = useState(length);

  function handleNext() {
    if (!localLength) return;
    setLength(localLength);
    router.push("/create/build"); // prochaine étape : génération
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b 
      from-white via-slate-50 to-white 
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 bg-dynamic">

      {/* BLOBS */}
      <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] 
      rounded-full bg-blue-400/40 dark:bg-blue-700/20 blur-[135px] 
      animate-blob-floating -z-10" />

      <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] 
      rounded-full bg-purple-400/40 dark:bg-purple-700/20 blur-[130px] 
      animate-blob-floating2 -z-10" />

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

      {/* SPACER */}
      <div className="h-20" />

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto text-center px-6 mt-14 animate-fade-in">

        <h2 className="text-4xl md:text-5xl font-extrabold">
          Choisis la{" "}
          <span className="text-blue-600 dark:text-blue-400">longueur</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
          L&apos;IA adaptera la quantité de contenu généré en fonction de ton choix.
        </p>

        {/* OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">

          {LENGTH_CHOICES.map((choice, index) => (
            <button
              key={choice.id}
              onClick={() => setLocalLength(choice.id)}
              className={`
                p-6 rounded-2xl shadow-md backdrop-blur-xl border fade-in-up
                transition-all duration-200 relative
                ${localLength === choice.id
                  ? "bg-blue-600 text-white border-blue-700 scale-[1.05] shadow-blue-500/40"
                  : "bg-white/70 dark:bg-gray-800/60 border-gray-300 dark:border-gray-700 hover:scale-[1.03]"
                }
              `}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="text-4xl mb-3">{choice.icon}</div>
              <h3 className="font-bold text-lg">{choice.title}</h3>
              <p className="text-sm opacity-80 mt-1">{choice.pages}</p>
              <p className="text-xs opacity-60 mt-3">{choice.desc}</p>

              {localLength === choice.id && (
                <div className="absolute inset-0 rounded-2xl ring-4 ring-blue-400/40 pointer-events-none" />
              )}
            </button>
          ))}

        </div>

        {/* NEXT */}
        <div className="mt-12">
          <Button
            onClick={handleNext}
            disabled={!localLength}
            className="px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            Générer l&apos;ebook <ArrowRight className="ml-2" />
          </Button>
        </div>

      </section>

      <div className="h-32" />
    </main>
  );
}
