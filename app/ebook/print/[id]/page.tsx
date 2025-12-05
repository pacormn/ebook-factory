"use client";

import { useEffect, useState, use } from "react";
import PrintClient from "../print-client";
import type { EbookStructure } from "@/types/ebook";

export default function EbookPrintPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);

  const [ebook, setEbook] = useState<EbookStructure | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/ebook/${id}`);
        const json = await res.json();

        if (json?.ebook) {
          setEbook(json.ebook);
        }
      } catch (e) {
        console.error("Erreur chargement ebook:", e);
      }
    }

    if (id) load();
  }, [id]);

  if (!id) return <div>ID manquant</div>;
  if (!ebook) return <div>Chargement…</div>;

  return <PrintClient ebook={ebook} />;
}
