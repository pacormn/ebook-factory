// app/api/admin/ai-usage/summary/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    // Vérif de config
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase admin client non configuré (env manquantes)." },
        { status: 500 }
      );
    }

    // On récupère toutes les lignes nécessaires
    const { data, error } = await supabaseAdmin
      .from("ai_usage")
      .select("model, prompt_tokens, completion_tokens, total_tokens, cost_usd");

    if (error) throw error;
    if (!data || data.length === 0) {
      return NextResponse.json({
        total: {
          requests: 0,
          total_tokens: 0,
          total_cost_usd: 0,
        },
        by_model: [],
      });
    }

    // === TOTAL GLOBAL ===
    const total_requests = data.length;
    const total_tokens = data.reduce(
      (acc, row) => acc + (row.total_tokens || 0),
      0
    );
    const total_cost_usd = data.reduce(
      (acc, row) => acc + Number(row.cost_usd || 0),
      0
    );

    // === GROUP BY MODEL (en JS) ===
    const modelStats: Record<
      string,
      {
        model: string;
        requests: number;
        total_tokens: number;
        total_cost_usd: number;
      }
    > = {};

    for (const row of data) {
      const model = row.model || "unknown";

      if (!modelStats[model]) {
        modelStats[model] = {
          model,
          requests: 0,
          total_tokens: 0,
          total_cost_usd: 0,
        };
      }

      modelStats[model].requests += 1;
      modelStats[model].total_tokens += row.total_tokens || 0;
      modelStats[model].total_cost_usd += Number(row.cost_usd || 0);
    }

    return NextResponse.json({
      total: {
        requests: total_requests,
        total_tokens,
        total_cost_usd,
      },
      by_model: Object.values(modelStats),
    });
  } catch (err: any) {
    console.error("[AI USAGE SUMMARY ERROR]", err);
    return NextResponse.json(
      { error: err?.message || "Erreur interne" },
      { status: 500 }
    );
  }
}
