// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Cpu,
  DollarSign,
  Loader2,
  Activity,
  TrendingUp,
  TrendingDown,
  ListOrdered,
} from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  CartesianGrid,
} from "recharts";

type DailyPoint = {
  day: string;
  total_tokens: number;
  total_cost_usd: number;
  total_requests: number;
};

type LastRequest = {
  id: string;
  endpoint: string | null;
  model: string | null;
  total_tokens: number;
  cost_usd: number;
  created_at: string;
};

type SummaryResponse = {
  totals: {
    total_tokens: number | null;
    total_cost_usd: number | null;
    total_requests: number | null;
  };
  daily: DailyPoint[];
  lastRequests: LastRequest[];
  stats: {
    avg_tokens_per_request: number;
    avg_cost_per_request: number;
    max_tokens: number;
    min_tokens: number;
    requests_today: number;
    requests_yesterday: number;
  };
  forecast: {
    monthly_cost_usd: number;
  };
};

export default function AdminPage() {
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/admin/ai-usage/summary");
        if (!res.ok) throw new Error("API ERROR");
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const totals = data?.totals;
  const stats = data?.stats;
  const daily = data?.daily || [];
  const lastRequests = data?.lastRequests || [];

  // ---- format tokens : millions ou milliers ----
  const totalTokens = totals?.total_tokens ?? 0;
  let tokensValue = "0.0";
  let tokensLabel = "k tokens";

  if (totalTokens >= 1_000_000) {
    tokensValue = (totalTokens / 1_000_000).toFixed(3);
    tokensLabel = "millions de tokens";
  } else {
    tokensValue = (totalTokens / 1_000).toFixed(1);
    tokensLabel = "k tokens";
  }

  // variation aujourd'hui vs hier
  const todayReq = stats?.requests_today ?? 0;
  const yesterdayReq = stats?.requests_yesterday ?? 0;
  const deltaReq =
    yesterdayReq === 0
      ? todayReq > 0
        ? 100
        : 0
      : ((todayReq - yesterdayReq) / yesterdayReq) * 100;

  const deltaReqRounded = Math.round(deltaReq);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-4 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/70 hover:bg-slate-800/90"
          >
            <ArrowLeft size={14} />
            Retour au site
          </Link>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Admin • Analytics
            </p>
            <h1 className="text-xl font-semibold mt-1 flex items-center gap-2">
              Dashboard OpenAI
              <Cpu className="h-4 w-4 text-emerald-400" />
            </h1>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 pb-16 pt-6">
        {loading && (
          <div className="flex items-center justify-center mt-20">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        )}

        {error && !loading && (
          <p className="mt-10 text-center text-sm text-red-400">{error}</p>
        )}

        {!loading && !error && data && (
          <>
            {/* TOP CARDS */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {/* Requêtes totales */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Requêtes totales
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">
                    {totals?.total_requests ?? 0}
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  Aujourd&apos;hui :{" "}
                  <span className="font-medium text-slate-200">
                    {todayReq}
                  </span>{" "}
                  / Hier :{" "}
                  <span className="text-slate-400">{yesterdayReq}</span>
                </p>
                <p className="mt-1 text-[11px] flex items-center gap-1">
                  {deltaReqRounded > 0 && (
                    <>
                      <TrendingUp className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">
                        +{deltaReqRounded}%
                      </span>
                    </>
                  )}
                  {deltaReqRounded < 0 && (
                    <>
                      <TrendingDown className="h-3 w-3 text-red-400" />
                      <span className="text-red-400">
                        {deltaReqRounded}%
                      </span>
                    </>
                  )}
                  {deltaReqRounded === 0 && (
                    <span className="text-slate-500">Stable</span>
                  )}
                </p>
              </div>

              {/* Tokens consommés */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Tokens consommés
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{tokensValue}</span>
                  <span className="text-xs text-slate-500">{tokensLabel}</span>
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  Moyenne / requête :{" "}
                  <span className="font-medium text-slate-200">
                    {Math.round(stats?.avg_tokens_per_request ?? 0)} tokens
                  </span>
                </p>
              </div>

              {/* Coût total */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500 flex items-center gap-1">
                  Coût total estimé
                  <DollarSign className="h-3 w-3 text-emerald-400" />
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">
                    {(totals?.total_cost_usd ?? 0).toFixed(4)}
                  </span>
                  <span className="text-xs text-slate-500">USD</span>
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  Coût moyen / requête :{" "}
                  <span className="font-medium text-slate-200">
                    {(stats?.avg_cost_per_request ?? 0).toFixed(6)} $
                  </span>
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Prévision fin de mois :{" "}
                  <span className="font-medium text-emerald-300">
                    {data.forecast.monthly_cost_usd.toFixed(3)} $
                  </span>
                </p>
              </div>
            </div>

            {/* GRAPH + STATS */}
            <div className="mt-10 grid gap-6 lg:grid-cols-[2fr,1.1fr]">
              {/* GRAPHE DAILY */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-4 w-4 text-blue-400" />
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Activité quotidienne (30 jours)
                  </p>
                </div>

                {daily.length === 0 && (
                  <p className="text-xs text-slate-500">
                    Pas encore de trafic enregistré.
                  </p>
                )}

                {daily.length > 0 && (
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={daily}>
                        <defs>
                          <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.75} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                        </defs>

                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1f2937"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
                          tickFormatter={(value) => {
                            const d = new Date(value);
                            return `${d.getDate()}/${d.getMonth() + 1}`;
                          }}
                          tick={{ fontSize: 10, fill: "#64748b" }}
                          axisLine={false}
                          tickLine={false}
                          interval="preserveStartEnd"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#020617",
                            border: "1px solid #1f2937",
                            borderRadius: 12,
                            fontSize: 11,
                          }}
                          formatter={(value: any) => [`${value} requêtes`, "Requêtes"]}
                          labelFormatter={(label) => {
                            const d = new Date(label);
                            return `${d.getDate()}/${d.getMonth() + 1}`;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="total_requests"
                          stroke="#60a5fa"
                          strokeWidth={2}
                          fill="url(#colorReq)"
                          dot={{ r: 2 }}
                          activeDot={{ r: 4 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* STATS AVANCÉES */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Statistiques avancées
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                    <p className="text-[10px] text-slate-500">Tokens max</p>
                    <p className="mt-1 text-sm font-semibold">
                      {stats?.max_tokens ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                    <p className="text-[10px] text-slate-500">Tokens min</p>
                    <p className="mt-1 text-sm font-semibold">
                      {stats?.min_tokens ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                    <p className="text-[10px] text-slate-500">
                      Cost / 100 requêtes
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {(
                        (stats?.avg_cost_per_request ?? 0) * 100
                      ).toFixed(4)}{" "}
                      $
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                    <p className="text-[10px] text-slate-500">Req / jour (moy.)</p>
                    <p className="mt-1 text-sm font-semibold">
                      {Math.round(
                        (totals?.total_requests ?? 0) /
                          Math.max(1, daily.filter((d) => d.total_requests > 0).length)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DERNIÈRES REQUÊTES */}
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ListOrdered className="h-4 w-4 text-blue-400" />
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Dernières requêtes
                  </p>
                </div>
              </div>

              {lastRequests.length === 0 && (
                <p className="text-xs text-slate-500">
                  Aucune requête enregistrée pour l&apos;instant.
                </p>
              )}

              {lastRequests.length > 0 && (
                <div className="mt-2 space-y-2 text-xs">
                  {lastRequests.map((r) => {
                    const d = new Date(r.created_at);
                    const label = `${d.getDate()}/${
                      d.getMonth() + 1
                    } ${d.getHours()}h${d
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`;

                    let icon = "⚡";
                    if (r.total_tokens > (stats?.avg_tokens_per_request ?? 0) * 2)
                      icon = "🔥";

                    return (
                      <div
                        key={r.id}
                        className="flex items-center justify-between rounded-xl bg-slate-900/80 border border-slate-800 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{icon}</span>
                          <div>
                            <p className="font-medium text-slate-100">
                              {r.endpoint || "endpoint inconnu"}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {label} • {r.model || "model ?"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-slate-300">
                            {r.total_tokens} tokens
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {r.cost_usd.toFixed(6)} $
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
