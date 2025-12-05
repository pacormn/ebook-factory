import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

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
