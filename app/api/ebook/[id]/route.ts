import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      console.error("❌ Supabase service role key missing !");
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("ebooks")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ebook: data });
  } catch (e) {
    console.error("🔥 API ERROR: ", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
