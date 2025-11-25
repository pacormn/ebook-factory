// app/api/admin/ai-usage/summary/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase non configuré côté serveur." },
      { status: 500 }
    );
  }

  try {
    // Totaux globaux
    const { data: totalsRow, error: totalsError } = await supabaseAdmin
      .from("ai_usage")
      .select(
        `
        total_tokens: sum(total_tokens),
        total_cost_usd: sum(cost_usd),
        total_requests: count(*)
      `
      )
      .single();

    if (totalsError) throw totalsError;

    // Stats par modèle
    const { data: byModel, error: byModelError } = await supabaseAdmin
      .from("ai_usage")
      .select(
        `
        model,
        total_tokens: sum(total_tokens),
        total_cost_usd: sum(cost_usd),
        total_requests: count(*)
      `
      )
      .group("model");

    if (byModelError) throw byModelError;

    // Stats quotidiennes (30 derniers jours)
    const { data: daily, error: dailyError } = await supabaseAdmin
      .from("ai_usage")
      .select(
        `
        day: date_trunc('day', created_at),
        total_tokens: sum(total_tokens),
        total_cost_usd: sum(cost_usd),
        total_requests: count(*)
      `
      )
      .group("day")
      .order("day", { ascending: true })
      .limit(30);

    if (dailyError) throw dailyError;

    return NextResponse.json({
      totals: totalsRow || {
        total_tokens: 0,
        total_cost_usd: 0,
        total_requests: 0,
      },
      byModel: byModel || [],
      daily: daily || [],
    });
  } catch (e) {
    console.error("[/api/admin/ai-usage/summary] error", e);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des stats." },
      { status: 500 }
    );
  }
}
