"use client";

import { useState } from "react";
import {
  X,
  Sparkles,
  TrendingUp,
  HeartPulse,
  ShoppingBag,
  UtensilsCrossed,
  Rocket,
  RefreshCw,
} from "lucide-react";

type TitleIdeasModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onPickTitle: (title: string) => void;
};

const DOMAINS = [
  {
    id: "finance",
    label: "Finance",
    icon: TrendingUp,
    sub: ["Investissement", "Trading", "Crypto", "Épargne & Budget", "Revenus passifs"],
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: HeartPulse,
    sub: ["Prise de muscle", "Perte de poids", "Home workout", "Nutrition sportive"],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingBag,
    sub: ["Dropshipping", "Marketing digital", "Fournisseurs", "Agence / SMMA"],
  },
  {
    id: "cuisine",
    label: "Cuisine",
    icon: UtensilsCrossed,
    sub: ["Recettes faciles", "Healthy", "Meal prep", "Street food", "Desserts"],
  },
];

export default function TitleIdeasModal({
  isOpen,
  onClose,
  onPickTitle,
}: TitleIdeasModalProps) {
  const [domain, setDomain] = useState<string | null>(null);
  const [subDomain, setSubDomain] = useState<string | null>(null);
  const [keywords, setKeywords] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [baseTitle, setBaseTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetState = () => {
    setDomain(null);
    setSubDomain(null);
    setKeywords("");
    setTitles([]);
    setBaseTitle(null);
    setError(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleGenerate = async (fromTitle?: string) => {
    if (!domain || !subDomain) {
      setError("Choisis un domaine et un sous-domaine avant de générer des idées.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-titles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain,
          subDomain,
          keywords,
          baseTitle: fromTitle ?? baseTitle,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur serveur");
      }

      const data = await res.json();
      if (!data.titles || !Array.isArray(data.titles)) {
        throw new Error("Réponse IA invalide");
      }

      setTitles(data.titles);
      if (fromTitle) {
        setBaseTitle(fromTitle);
      }
    } catch (err: any) {
      setError(
        err?.message ||
          "Impossible de générer des idées pour l’instant. Réessaie dans quelques secondes."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUseTitle = (t: string) => {
    onPickTitle(t);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-lg rounded-3xl glass p-6 border border-white/20 shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Assistant de titre
            </p>
            <h3 className="text-lg font-semibold mt-1 flex items-center gap-2">
              Génère un titre automatiquement
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-1 hover:bg-slate-200/60 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* step 1: domaine */}
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 mb-2">
            1. Choisis un domaine
          </p>
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map((d) => {
              const Icon = d.icon;
              const isActive = domain === d.id;

              return (
                <button
                  key={d.id}
                  onClick={() => {
                    setDomain(d.id);
                    setSubDomain(null);
                    setTitles([]);
                    setBaseTitle(null);
                  }}
                  className={`
                    px-4 py-2 rounded-full text-sm flex items-center gap-2 border transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-500 shadow-md"
                        : "bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                    }
                  `}
                >
                  <Icon size={16} />
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* step 2: sous-domaine */}
        {domain && (
          <div className="mb-4 fade-down">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 mb-2">
              2. Précise le sujet
            </p>
            <div className="flex flex-wrap gap-2">
              {DOMAINS.find((d) => d.id === domain)?.sub.map((s) => {
                const isActive = subDomain === s;
                return (
                  <button
                    key={s}
                    onClick={() => {
                      setSubDomain(s);
                      setTitles([]);
                      setBaseTitle(null);
                    }}
                    className={`
                      px-4 py-2 rounded-full text-xs sm:text-sm border transition
                      ${
                        isActive
                          ? "bg-blue-500 text-white border-blue-500 shadow"
                          : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                      }
                    `}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* step 3: keywords */}
        {domain && subDomain && (
          <div className="mb-4 fade-down">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 mb-2">
              3. Mots-clés (optionnel)
            </p>
            <input
              type="text"
              placeholder="Ex : débutant, sans investissement, 2025..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {/* GENERATE BUTTON */}
        <div className="mt-4 mb-3">
          <button
            disabled={!domain || !subDomain || loading}
            onClick={() => handleGenerate()}
            className={`
              w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium
              ${
                !domain || !subDomain
                  ? "bg-slate-700/30 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              }
            `}
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                Générer des idées de titres
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-500 mb-2">
            {error}
          </p>
        )}

        {/* RESULTATS */}
        {titles.length > 0 && (
          <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
            <p className="text-xs font-medium text-slate-500 mb-1">
              Idées proposées :
            </p>
            {titles.map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-3 flex flex-col gap-2"
              >
                <span className="text-sm">{t}</span>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleUseTitle(t)}
                    className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    Utiliser ce titre
                  </button>
                  <button
                    onClick={() => handleGenerate(t)}
                    className="px-3 py-1 rounded-xl border border-slate-300 dark:border-slate-600 text-xs flex items-center gap-1 hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Plus comme celui-ci
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
