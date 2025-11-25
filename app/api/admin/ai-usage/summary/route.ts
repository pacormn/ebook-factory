import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createClient();

  try {
    // 🔹 Total global
    const { data: totalData, error: totalError } = await supabase
      .from("ai_usage")
      .select("tokens_input, tokens_output");

    if (totalError) throw totalError;

    const total_requests = totalData.length;
    const total_tokens_input = totalData.reduce((t, r) => t + r.tokens_input, 0);
    const total_tokens_output = totalData.reduce((t, r) => t + r.tokens_output, 0);

    // 🔹 Regroupement par modèle — version JS, pas SQL
    const modelMap: Record<string, any> = {};

    for (const row of totalData) {
      if (!modelMap[row.model]) {
        modelMap[row.model] = {
          model: row.model,
          requests: 0,
          tokens_input: 0,
          tokens_output: 0,
        };
      }

      modelMap[row.model].requests++;
      modelMap[row.model].tokens_input += row.tokens_input;
      modelMap[row.model].tokens_output += row.tokens_output;
    }

    const by_model = Object.values(modelMap);

    return NextResponse.json({
      total: {
        requests: total_requests,
        tokens_input: total_tokens_input,
        tokens_output: total_tokens_output,
      },
      by_model,
    });
  } catch (error: any) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
