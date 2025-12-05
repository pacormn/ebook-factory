"use client";

import { useEffect, useState } from "react";
import PrintClient from "../print-client";
import type { EbookStructure } from "@/types/ebook";

export default function EbookPrintPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const [ebook, setEbook] = useState<EbookStructure | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/ebook/${id}`);
      const json = await res.json();

      if (json?.ebook) {
        setEbook(json.ebook);
      }
    }

    if (id) load();
  }, [id]);

  if (!id) return <div>ID manquant</div>;
  if (!ebook) return <div>Chargement…</div>;

  return <PrintClient ebook={ebook} />;
}
