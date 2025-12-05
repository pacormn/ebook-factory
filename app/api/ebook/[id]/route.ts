import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = use(context.params);

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase non configuré" },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("ebooks")
    .select("data")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Ebook introuvable" }, { status: 404 });
  }

  return NextResponse.json({ ebook: data.data });
}
