export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import PrintClient from "./print-client";
import type { EbookStructure } from "@/types/ebook";

type PrintPageProps = {
  params: {
    id: string;
  };
};

export default async function EbookPrintPage({ params }: PrintPageProps) {
  if (!supabaseAdmin) {
    return <div className="text-white p-10">Supabase non configuré.</div>;
  }

  const { data, error } = await supabaseAdmin
    .from("ebooks")
    .select("data")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    console.error("Erreur Supabase :", error);
    return <div className="text-white p-10">Ebook introuvable.</div>;
  }

  const ebook = data.data as EbookStructure;

  return <PrintClient ebook={ebook} />;
}
