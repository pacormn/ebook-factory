"use client";

import { useEffect, useState, use } from "react";
import PrintClient from "../print-client";
import type { EbookStructure } from "@/types/ebook";

export default function EbookPrintPage(props: { params: Promise<{ id: string }> }) {
  // 🔥 On garde ta technique : use() pour résoudre params
  let resolvedParams: { id?: string } = {};
  try {
    resolvedParams = use(props.params);
  } catch (e) {
    console.error("Erreur résolution params:", e);
  }

  const id = resolvedParams.id;

  const [ebook, setEbook] = useState<EbookStructure | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // évite appels inutiles

    async function load() {
      try {
        const res = await fetch(`/api/ebook/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("API Error:", res.status);
          return;
        }

        const json = await res.json();

        if (json?.ebook) {
          setEbook(json.ebook);
        }
      } catch (e) {
        console.error("Erreur fetch ebook:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  // 🧱 protection si params échoue
  if (!id) return <div>ID manquant</div>;

  // ⏳ encore en cours
  if (loading) return <div>Chargement…</div>;

  // ❌ aucun ebook trouvé
  if (!ebook) return <div>Ebook introuvable</div>;

  // 🎉 affichage final
  return <PrintClient ebook={ebook} />;
}
