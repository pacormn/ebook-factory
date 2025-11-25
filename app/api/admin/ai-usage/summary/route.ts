import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    // Récupération brute de toutes les lignes
    const { data, error } = await supabaseAdmin
      .from("ai_usage")
      .select("model, tokens_input, tokens_output");

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "No data found" }, { status: 404 });

    // === TOTAL GLOBAL ===
    const total_requests = data.length;
    const total_tokens_input = data.reduce((acc, row) => acc + row.tokens_input, 0);
    const total_tokens_output = data.reduce((acc, row) => acc + row.tokens_output, 0);

    // === GROUP BY MODEL (fait en JS, propre et fiable) ===
    const modelStats: Record<string, any> = {};

    for (const row of data) {
      if (!modelStats[row.model]) {
        modelStats[row.model] = {
          model: row.model,
          requests: 0,
          tokens_input: 0,
          tokens_output: 0,
        };
      }

      modelStats[row.model].requests++;
      modelStats[row.model].tokens_input += row.tokens_input;
      modelStats[row.model].tokens_output += row.tokens_output;
    }

    return NextResponse.json({
      total: {
        requests: total_requests,
        tokens_input: total_tokens_input,
        tokens_output: total_tokens_output,
      },
      by_model: Object.values(modelStats),
    });

  } catch (err: any) {
    console.error("AI USAGE SUMMARY ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
