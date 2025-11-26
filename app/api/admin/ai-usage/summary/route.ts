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

    // ---- AGRÉGATIONS GLOBALES ----
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

    // ---- AGRÉGATION JOUR PAR JOUR ----
    const dayMap = new Map<
      string,
      { total_tokens: number; total_cost_usd: number; total_requests: number }
    >();

    const toDayKey = (d: string) => d.slice(0, 10); // "YYYY-MM-DD"

    rows.forEach((r) => {
      const key = toDayKey(r.created_at);
      const existing =
        dayMap.get(key) || { total_tokens: 0, total_cost_usd: 0, total_requests: 0 };
      existing.total_tokens += r.total_tokens ?? 0;
      existing.total_cost_usd += Number(r.cost_usd ?? 0);
      existing.total_requests += 1;
      dayMap.set(key, existing);
    });

    const daily: {
      day: string;
      total_tokens: number;
      total_cost_usd: number;
      total_requests: number;
    }[] = [];

    // on génère toutes les dates pour avoir un graphe continu
    for (let i = 0; i < 30; i++) {
      const d = new Date(from);
      d.setDate(from.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      const stats =
        dayMap.get(key) || {
          total_tokens: 0,
          total_cost_usd: 0,
          total_requests: 0,
        };

      daily.push({
        day: key,
        ...stats,
      });
    }

    // ---- STATS AVANCÉES ----
    const reqCount = totalRequests || 1;
    const avgTokensPerReq = totalTokens / reqCount;
    const avgCostPerReq = totalCost / reqCount;

    let maxTokens = 0;
    let minTokens = rows.length ? rows[0].total_tokens ?? 0 : 0;

    rows.forEach((r) => {
      const t = r.total_tokens ?? 0;
      if (t > maxTokens) maxTokens = t;
      if (t < minTokens) minTokens = t;
    });

    const todayKey = now.toISOString().slice(0, 10);
    const y = new Date();
    y.setDate(now.getDate() - 1);
    const yesterdayKey = y.toISOString().slice(0, 10);

    const todayStats =
      dayMap.get(todayKey) || {
        total_requests: 0,
        total_tokens: 0,
        total_cost_usd: 0,
      };

    const yesterdayStats =
      dayMap.get(yesterdayKey) || {
        total_requests: 0,
        total_tokens: 0,
        total_cost_usd: 0,
      };

    // Prévision coût fin de mois : moyenne journalière * nb de jours du mois
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    const daysWithData =
      daily.filter((d) => d.total_requests > 0).length || 1;
    const avgDailyCost = totalCost / daysWithData;
    const forecastMonthlyCostUsd = avgDailyCost * daysInMonth;

    const stats = {
      avg_tokens_per_request: avgTokensPerReq,
      avg_cost_per_request: avgCostPerReq,
      max_tokens: maxTokens,
      min_tokens: minTokens,
      requests_today: todayStats.total_requests,
      requests_yesterday: yesterdayStats.total_requests,
    };

    // ---- DERNIÈRES REQUÊTES ----
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

    const forecast = {
      monthly_cost_usd: forecastMonthlyCostUsd,
    };

    return NextResponse.json({
      totals,
      daily,
      lastRequests,
      stats,
      forecast,
    });
  } catch (err) {
    console.error("[admin/ai-usage/summary] error:", err);
    return NextResponse.json(
      { error: "Erreur lors du calcul des stats admin." },
      { status: 500 }
    );
  }
}
