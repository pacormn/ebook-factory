import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = use(context.params);

    console.log("API /ebook/[id] → ID =", id);

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      console.error("Supabase admin missing");
      return NextResponse.json({ error: "Supabase missing" }, { status: 500 });
    }

  const { data, error } = await supabaseAdmin
    .from("ebooks")
    .select("data")
    .eq("id", id)
    .single();

    console.log("SUPABASE RESULT:", { data, error });

  if (error || !data) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

    return NextResponse.json({ ebook: data.data });

  } catch (e) {
    console.error("API ERROR:", e);
    return NextResponse.json(
      { error: "Server error", details: String(e) },
      { status: 500 }
    );
  }
}
