export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { EbookStructure } from "@/types/ebook";
import PrintClient from "./print-client";

type PrintPageProps = {
  searchParams: {
    id?: string;
  };
};

export default async function EbookPrintPage({ searchParams }: PrintPageProps) {
  const id = searchParams.id;

  console.log("DEBUG ID FROM SEARCHPARAMS:", id);

  if (!id) {
    console.error("Aucun ID reçu dans searchParams");
    return <div className="text-white p-10">ID manquant.</div>;
  }

  if (!supabaseAdmin) {
    console.error("SupabaseAdmin null");
    return (
      <div className="text-white p-10">
        Supabase non configuré.
      </div>
    );
  }

  const { data, error } = await supabaseAdmin
    .from("ebooks")
    .select("data")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Erreur Supabase :", error);
    return (
      <div className="text-white p-10">
        Ebook introuvable.
      </div>
    );
  }

  const ebook = data.data as EbookStructure;

  return <PrintClient ebook={ebook} />;
}
