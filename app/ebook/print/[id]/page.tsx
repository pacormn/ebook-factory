"use client";

import { useEffect, useState, use } from "react";
import PrintClient from "../print-client";
import type { EbookStructure } from "@/types/ebook";

export default function EbookPrintPage(props: { params: Promise<{ id: string }> }) {
  // ✔ TA méthode conservée
  let { id } = use(props.params);

  const [ebook, setEbook] = useState<EbookStructure | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/ebook/${id}`, { cache: "no-store" });
        const text = await res.text();

        if (!text) {
          setError("Réponse vide de l'API");
          return;
        }

        const json = JSON.parse(text);

        if (!json.ebook) {
          setError("Ebook introuvable");
          return;
        }

        setEbook(json.ebook);
      } catch (e) {
        console.error(e);
        setError("Erreur lors du chargement");
      }
    }

    load();
  }, [id]);

  if (!id) return <div>ID manquant (params vide)</div>;
  if (error) return <div>{error}</div>;
  if (!ebook) return <div>Chargement…</div>;

  return <PrintClient ebook={ebook} />;
}
