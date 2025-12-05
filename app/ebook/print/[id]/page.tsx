export const runtime = "nodejs";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { EbookRenderer } from "@/components/ebook/EbookRenderer";
import type { EbookStructure } from "@/types/ebook";

type Props = { params: { id: string } };

export default async function EbookPrintPage({ params }: Props) {
  if (!supabaseAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Supabase non configuré.
      </div>
    );
  }

  const { data, error } = await supabaseAdmin
    .from("ebooks")
    .select("data")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    console.error("[print] Erreur Supabase fetch :", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Ebook introuvable.
      </div>
    );
  }

  const ebook = data.data as EbookStructure;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <EbookRenderer themeId={ebook.themeId} pages={ebook.pages} scale={1} />
    </div>
  );
}
