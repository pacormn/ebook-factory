export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // important pour fetch côté serveur

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { EbookRenderer } from "@/components/ebook/EbookRenderer";
import type { EbookStructure } from "@/types/ebook";

type Props = { params: { id: string } };

export default async function EbookPrintPage({ params }: Props) {
  if (!supabaseAdmin) {
    console.error("❌ supabaseAdmin est null (clé service_role manquante ?)");
    return (
      <div className="text-white p-10">
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
    console.error("❌ Erreur Supabase :", error);
    return (
      <div className="text-white p-10">
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
