export const dynamic = "force-dynamic";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import PrintClient from "../print-client";
import type { EbookStructure } from "@/types/ebook";

// Typage 100% compatible Next.js 16
type PrintPageProps = {
  params: {
    id: string;
  };
};

export default async function EbookPrintPage({ params }: PrintPageProps) {
  console.log("PARAMS:", params);

  const id = params.id;

  if (!id) {
    return <div className="text-white p-10">ID manquant.</div>;
  }

  if (!supabaseAdmin) {
    console.error("SupabaseAdmin null");
    return <div className="text-white p-10">Supabase non configuré.</div>;
  }

  const { data, error } = await supabaseAdmin
    .from("ebooks")
    .select("data")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Erreur Supabase :", error);
    return <div className="text-white p-10">Ebook introuvable.</div>;
  }

  const ebook = data.data as EbookStructure;

  return <PrintClient ebook={ebook} />;
}
