"use client";

import { use } from "react";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import PrintClient from "../print-client";
import type { EbookStructure } from "@/types/ebook";

export default function EbookPrintPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);

  if (!id) return <div>ID manquant</div>;

  async function load() {
    const { data, error } = await supabaseAdmin
      .from("ebooks")
      .select("data")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return data.data as EbookStructure;
  }

  const ebook = use(load());

  if (!ebook) return <div>Ebook introuvable</div>;

  return <PrintClient ebook={ebook} />;
}
