// app/api/admin/ai-usage/summary/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase non configuré." },
      { status: 500 }
    );
  }

  try {
    // ---- TOTALS ----
    const { data: rows, error } = await supabaseAdmin
      .from("ai_usage")
      .select("*");

    if (error) throw error;

    const totals = {
      total_requests: rows.length,
      total_tokens: rows.reduce((a, r) => a + (r.total_tokens || 0), 0),
      total_cost_usd: rows.reduce((a, r) => a + (r.cost_usd || 0), 0),
    };

    // ---- BY MODEL ----
    const byModelMap: Record<string, any> = {};

    rows.forEach((r) => {
      if (!byModelMap[r.model]) {
        byModelMap[r.model] = {
          model: r.model,
          total_requests: 0,
          total_tokens: 0,
          total_cost_usd: 0,
        };
      }
      byModelMap[r.model].total_requests++;
      byModelMap[r.model].total_tokens += r.total_tokens || 0;
      byModelMap[r.model].total_cost_usd += r.cost_usd || 0;
    });

    const byModel = Object.values(byModelMap);

    // ---- DAILY STATS (30 jours) ----
    const today = new Date();
    const past30 = new Date();
    past30.setDate(today.getDate() - 30);

    const dailyMap: Record<string, any> = {};

    rows.forEach((r) => {
      const day = new Date(r.created_at).toISOString().split("T")[0];
      if (!dailyMap[day]) {
        dailyMap[day] = {
          day,
          total_requests: 0,
          total_tokens: 0,
          total_cost_usd: 0,
        };
      }
      dailyMap[day].total_requests++;
      dailyMap[day].total_tokens += r.total_tokens || 0;
      dailyMap[day].total_cost_usd += r.cost_usd || 0;
    });

    const daily = Object.values(dailyMap)
      .filter((d: any) => new Date(d.day) >= past30)
      .sort((a: any, b: any) => new Date(a.day) > new Date(b.day) ? 1 : -1);

    return NextResponse.json({
      totals,
      byModel,
      daily,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Erreur serveur admin summary." },
      { status: 500 }
    );
  }
}
