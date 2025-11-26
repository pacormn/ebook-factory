// app/api/admin/ai-usage/latest/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin non configuré" },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("ai_usage")
      .select(
        "id, created_at, model, endpoint, total_tokens, prompt_tokens, completion_tokens, cost_usd"
      )
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("[ai_usage/latest]", error);
      return NextResponse.json(
        { error: "Erreur Supabase" },
        { status: 500 }
      );
    }

    return NextResponse.json({ latest: data ?? null });
  } catch (e) {
    console.error("[ai_usage/latest] exception", e);
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}
