// app/api/ai/log/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase non configuré" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const {
      model,
      prompt_tokens,
      completion_tokens,
      total_tokens,
      cost_usd,
    } = body;

    const { error } = await supabaseAdmin.from("ai_usage").insert({
      model,
      prompt_tokens,
      completion_tokens,
      total_tokens,
      cost_usd,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[AI LOG ERROR]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
