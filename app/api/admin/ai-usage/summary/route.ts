// app/api/admin/ai-usage/summary/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type AiUsageRow = {
  id: string;
  model: string | null;
  endpoint: string | null;
  total_tokens: number | null;
  cost_usd: number | string | null;
  created_at: string;
};

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase non configuré côté serveur." },
      { status: 500 }
    );
  }

  try {
    const now = new Date();
    const from = new Date();
    from.setDate(now.getDate() - 29); // 30 derniers jours

    const { data, error } = await supabaseAdmin
      .from("ai_usage")
      .select("id, model, endpoint, total_tokens, cost_usd, created_at")
      .gte("created_at", from.toISOString())
      .order("created_at", { ascending: true });

    if (error) throw error;

    const rows: AiUsageRow[] = data ?? [];

    // ---- GLOBAL STATS ----
    let totalTokens = 0;
    let totalCost = 0;
    let totalRequests = rows.length;

    rows.forEach((r) => {
      totalTokens += r.total_tokens ?? 0;
      totalCost += Number(r.cost_usd ?? 0);
    });

    const totals = {
      total_tokens: totalTokens,
      total_cost_usd: totalCost,
      total_requests: totalRequests,
    };

    // ---- GROUP BY MODEL (même si toujours le même) ----
    const modelMap = new Map<
      string,
      { total_tokens: number; total_cost_usd: number; total_requests: number }
    >();

    rows.forEach((r) => {
      const model = r.model ?? "unknown";
      const entry =
        modelMap.get(model) || {
          total_tokens: 0,
          total_cost_usd: 0,
          total_requests: 0,
        };
      entry.total_tokens += r.total_tokens ?? 0;
      entry.total_cost_usd += Number(r.cost_usd ?? 0);
      entry.total_requests += 1;
      modelMap.set(model, entry);
    });

    const byModel = [...modelMap.entries()].map(([model, vals]) => ({
      model,
      ...vals,
    }));

    // ---- DAILY STATS ----
    const dayKey = (d: string) => d.slice(0, 10);

    const dayMap = new Map<
      string,
      { total_tokens: number; total_cost_usd: number; total_requests: number }
    >();

    rows.forEach((r) => {
      const key = dayKey(r.created_at);
      const stats =
        dayMap.get(key) || {
          total_tokens: 0,
          total_cost_usd: 0,
          total_requests: 0,
        };
      stats.total_tokens += r.total_tokens ?? 0;
      stats.total_cost_usd += Number(r.cost_usd ?? 0);
      stats.total_requests += 1;
      dayMap.set(key, stats);
    });

    const daily = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(from);
      d.setDate(from.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      daily.push({
        day: key,
        ...(dayMap.get(key) || {
          total_tokens: 0,
          total_cost_usd: 0,
          total_requests: 0,
        }),
      });
    }

    // ---- ADVANCED STATS ----
    const reqCount = totalRequests || 1;

    const stats = {
      avg_tokens_per_request: totalTokens / reqCount,
      avg_cost_per_request: totalCost / reqCount,
      max_tokens: Math.max(...rows.map((r) => r.total_tokens ?? 0), 0),
      min_tokens: Math.min(...rows.map((r) => r.total_tokens ?? 0), 0),
      requests_today:
        dayMap.get(now.toISOString().slice(0, 10))?.total_requests ?? 0,
      requests_yesterday:
        dayMap.get(
          new Date(now.getTime() - 86400000).toISOString().slice(0, 10)
        )?.total_requests ?? 0,
    };

    // ---- LAST REQUESTS ----
    const lastRequests = [...rows]
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 12)
      .map((r) => ({
        id: r.id,
        endpoint: r.endpoint,
        model: r.model,
        total_tokens: r.total_tokens ?? 0,
        cost_usd: Number(r.cost_usd ?? 0),
        created_at: r.created_at,
      }));

    // ---- FORECAST ----
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    const daysWithData =
      daily.filter((d) => d.total_requests > 0).length || 1;

    const avgDailyCost = totalCost / daysWithData;

    const forecast = {
      monthly_cost_usd: avgDailyCost * daysInMonth,
    };

    // ---- FINAL JSON (SECURED) ----
    return NextResponse.json({
      totals,
      byModel: byModel ?? [], // <-- prevents UI crash
      daily,
      lastRequests,
      stats,
      forecast,
    });
  } catch (err) {
    console.error("[admin/ai-usage/summary] ERROR:", err);
    return NextResponse.json(
      { error: "Erreur lors du calcul des stats admin." },
      { status: 500 }
    );
  }
}
