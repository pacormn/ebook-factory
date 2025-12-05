import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// 🚨 Toujours accepter ANY ici à cause de ton typage global qui force Promise<{id}>
export async function GET(
  req: Request,
  context: any
) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // 🚨 IMPORTANT : Vérifier supabaseAdmin
  if (!supabaseAdmin) {
    console.error("❌ SupabaseAdmin is NULL — CHECK YOUR ENV VARS");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("ebooks")
      .select("data")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ebook: data.data });
  } catch (e) {
    console.error("API ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
