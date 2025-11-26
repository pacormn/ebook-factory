"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart2,
  Cpu,
  DollarSign,
  Loader2,
  Activity,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";

/* ============================
   TYPES
============================ */

type Totals = {
  total_tokens: number | null;
  total_cost_usd: number | null;
  total_requests: number | null;
};

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

type Stats = {
  avg_tokens_per_request: number;
  avg_cost_per_request: number;
  max_tokens: number;
  min_tokens: number;
  requests_today: number;
  requests_yesterday: number;
};

type Forecast = {
  monthly_cost_usd: number;
};

type SummaryResponse = {
  totals: Totals;
  daily: DailyPoint[];
  lastRequests: LastRequest[];
  stats: Stats;
  forecast: Forecast;
};

type AiUsageRow = {
  id: string;
  created_at: string;
  model: string | null;
  endpoint: string | null;
  total_tokens: number;
  prompt_tokens?: number | null;
  completion_tokens?: number | null;
  cost_usd: number;
};

type LatestResponse = {
  latest: AiUsageRow | null;
};

type ListResponse = {
  items: AiUsageRow[];
};

type SortField = "created_at" | "total_tokens" | "cost_usd" | "endpoint";
type SortDir = "asc" | "desc";

type NotificationItem = {
  id: string;
  message: string;
  subtitle?: string;
};


function GraphActivityPro({ data }: { data: { day: string; total_requests: number }[] }) {
  const [hover, setHover] = useState<number | null>(null);

  const n = data.length;
  const maxValue = Math.max(...data.map((d) => d.total_requests), 1);

  // Convertir en points SVG normalisés
  const points = data.map((d, i) => {
    const x = n === 1 ? 50 : (i / (n - 1)) * 100;
    const y = 100 - (d.total_requests / maxValue) * 100;
    return { x, y, raw: d.total_requests, date: d.day };
  });

  // Spline lissée (Catmull-Rom)
  function spline(pts: any[], tension = 0.5) {
    let d = "";
    for (let i = 0; i < pts.length; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1] || pts[i];
      const p3 = pts[i + 2] || p2;

      const x1 = p1.x;
      const y1 = p1.y;

      const cp1x = x1 + ((p2.x - p0.x) * tension) / 6;
      const cp1y = y1 + ((p2.y - p0.y) * tension) / 6;

      const cp2x = p2.x - ((p3.x - p1.x) * tension) / 6;
      const cp2y = p2.y - ((p3.y - p1.y) * tension) / 6;

      if (i === 0) {
        d += `M ${x1},${y1} `;
      }

      if (i < pts.length - 1) {
        d += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} `;
      }
    }
    return d;
  }

  const path = spline(points);

  return (
    <div className="relative h-48 w-full">
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gradLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Zone (surface) */}
        <path
          d={`${path} L 100,100 L 0,100 Z`}
          fill="url(#gradArea)"
          opacity="0.3"
        />

        {/* Ligne */}
        <path
          d={path}
          fill="none"
          stroke="url(#gradLine)"
          strokeWidth="2.4"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Points interactifs */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hover === i ? 3.5 : 2}
            fill={hover === i ? "#93C5FD" : "#60A5FA"}
            className="cursor-pointer transition-all"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {hover !== null && (
        <div
          className="absolute px-2 py-1 text-[10px] bg-slate-900/90 border border-slate-700 rounded-lg pointer-events-none whitespace-nowrap"
          style={{
            left: `${points[hover].x}%`,
            top: `${points[hover].y}%`,
            transform: "translate(-50%, -120%)",
          }}
        >
          <p className="text-slate-300">
            {points[hover].raw} req
          </p>
          <p className="text-slate-500 text-[9px]">
            {new Date(points[hover].date).toLocaleDateString("fr-FR")}
          </p>
        </div>
      )}
    </div>
  );
}




/* ============================
   HELPERS
============================ */

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCost(cost: number) {
  if (!cost) return "0.0000 $";
  return `${cost.toFixed(4)} $`;
}

function formatTokens(tokens: number) {
  if (!tokens) return "0";
  if (tokens < 1000) return `${tokens} tokens`;
  return `${(tokens / 1000).toFixed(1)}k tokens`;
}

/* ============================
   COMPOSANT PRINCIPAL
============================ */

export default function AdminPage() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [errorSummary, setErrorSummary] = useState<string | null>(null);

  const [latest, setLatest] = useState<AiUsageRow | null>(null);
  const [lastSeenId, setLastSeenId] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const [rows, setRows] = useState<AiUsageRow[]>([]);
  const [loadingRows, setLoadingRows] = useState(true);
  const [errorRows, setErrorRows] = useState<string | null>(null);

  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const expensiveThresholdTokens = 800;
  const expensiveThresholdCost = 0.001;

  /* ============================
     1) Chargement du résumé
  ============================ */

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/admin/ai-usage/summary");
        if (!res.ok) throw new Error("API ERROR");
        const json = (await res.json()) as SummaryResponse;
        setSummary(json);
      } catch (e: any) {
        console.error("[admin summary fetch]", e);
        setErrorSummary(e?.message || "Erreur de chargement");
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, []);

  const totals = summary?.totals;
  const daily = summary?.daily ?? [];
  const lastRequestsSummary = summary?.lastRequests ?? [];
  const stats = summary?.stats;
  const forecast = summary?.forecast;

  /* ============================
     2) Live : dernière requête
  ============================ */

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    let isMounted = true;

    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/admin/ai-usage/latest");
        if (!res.ok) return;
        const json = (await res.json()) as LatestResponse;
        if (!isMounted) return;

        if (json.latest) {
          setLatest(json.latest);

          if (!lastSeenId) {
            // Première initialisation : on ne notifie pas
            setLastSeenId(json.latest.id);
          } else if (json.latest.id !== lastSeenId) {
            // Nouvelle requête → notif
            setLastSeenId(json.latest.id);

            const msg = `Nouvelle requête : ${json.latest.endpoint || "inconnu"}`;
            const subtitle = `${formatTokens(
              json.latest.total_tokens
            )} • ${formatCost(json.latest.cost_usd)}`;

            const notifId = json.latest.id;
            setNotifications((prev) => [
              ...prev,
              { id: notifId, message: msg, subtitle },
            ]);

            setTimeout(() => {
              setNotifications((prev) =>
                prev.filter((n) => n.id !== notifId)
              );
            }, 10000);
          }
        }
      } catch (e) {
        console.error("[admin latest fetch]", e);
      }
    };

    // première récupération
    fetchLatest();
    // puis toutes les 3 secondes
    interval = setInterval(fetchLatest, 3000);

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [lastSeenId]);

  const liveStatusText = useMemo(() => {
    if (!latest) return "En attente de la première requête...";
    return `Last : ${latest.endpoint ?? "inconnu"} • ${
      latest.total_tokens
    } tokens`;
  }, [latest]);

  const unreadCount = notifications.length;

  /* ============================
     3) Liste des requêtes + tri
  ============================ */

  async function fetchRows(field: SortField, dir: SortDir) {
    setLoadingRows(true);
    setErrorRows(null);
    try {
      const params = new URLSearchParams({
        sort: field,
        dir,
        limit: "20",
      });

      const res = await fetch(`/api/admin/ai-usage/list?${params.toString()}`);
      if (!res.ok) throw new Error("Erreur API list");
      const json = (await res.json()) as ListResponse;
      setRows(json.items || []);
    } catch (e: any) {
      console.error("[admin list fetch]", e);
      setErrorRows(e?.message || "Erreur de chargement");
    } finally {
      setLoadingRows(false);
    }
  }

  useEffect(() => {
    fetchRows(sortField, sortDir);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortField, sortDir]);

  const toggleSort = (field: SortField) => {
    setSortField((prevField) => {
      if (prevField === field) {
        setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
        return prevField;
      } else {
        setSortDir("desc");
        return field;
      }
    });
  };

  /* ============================
     4) Agrégations pour endpoint
  ============================ */

  const endpointDistribution = useMemo(() => {
    if (!lastRequestsSummary || lastRequestsSummary.length === 0) return [];

    const map = new Map<
      string,
      { total_cost: number; total_tokens: number; total_requests: number }
    >();

    lastRequestsSummary.forEach((req) => {
      const ep = req.endpoint ?? "inconnu";
      const base =
        map.get(ep) || {
          total_cost: 0,
          total_tokens: 0,
          total_requests: 0,
        };

      base.total_cost += req.cost_usd;
      base.total_tokens += req.total_tokens;
      base.total_requests += 1;

      map.set(ep, base);
    });

    return Array.from(map.entries()).map(([endpoint, value]) => ({
      endpoint,
      ...value,
    }));
  }, [lastRequestsSummary]);

  const totalRequestsForPct = totals?.total_requests || 1;

  /* ============================
     RENDER
  ============================ */

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
              <span className="relative inline-flex">
                <Cpu className="h-4 w-4 text-emerald-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                )}
              </span>
            </h1>
          </div>
        </div>

        {/* LIVE widget (desktop) */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1.5 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-slate-300">LIVE</span>
          <span className="text-slate-500">&mdash;</span>
          <span className="text-slate-400 truncate max-w-[220px]">
            {liveStatusText}
          </span>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 pb-20 pt-6 space-y-8">
        {/* LIVE widget (mobile) */}
        <div className="mt-4 md:hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-4 flex items-start gap-3">
          <div className="mt-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Requêtes en direct
            </p>
            {latest ? (
              <>
                <p className="text-sm text-slate-100">
                  {latest.endpoint ?? "inconnu"} — {latest.total_tokens} tokens
                </p>
                <p className="text-xs text-slate-500">
                  {formatDateTime(latest.created_at)} •{" "}
                  {formatCost(latest.cost_usd)}
                </p>
              </>
            ) : (
              <p className="text-xs text-slate-500">
                En attente de la première requête...
              </p>
            )}
          </div>
        </div>

        {/* RÉSUMÉ GLOBAL */}
        {loadingSummary && (
          <div className="flex items-center justify-center mt-10">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        )}

        {errorSummary && !loadingSummary && (
          <p className="mt-10 text-center text-sm text-red-400">
            {errorSummary}
          </p>
        )}

        {!loadingSummary && !errorSummary && summary && (
          <>
            {/* CARDS TOP */}
            <div className="grid gap-4 sm:grid-cols-4">
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
              </div>

              {/* Tokens consommés */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Tokens consommés
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">
                    {(totals?.total_tokens ?? 0) < 1000
                      ? totals?.total_tokens ?? 0
                      : ((totals?.total_tokens ?? 0) / 1000).toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {(totals?.total_tokens ?? 0) < 1000 ? "tokens" : "k tokens"}
                  </span>
                </div>
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
              </div>

              {/* Prévision mensuelle */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500 flex items-center gap-1">
                  Prévision fin de mois
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">
                    {(forecast?.monthly_cost_usd ?? 0).toFixed(3)}
                  </span>
                  <span className="text-xs text-slate-500">USD</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Basée sur l&apos;activité récente.
                </p>
              </div>
            </div>

            {/* STATS SECONDAIRES */}
            {stats && (
              <div className="grid gap-4 sm:grid-cols-3 mt-4 text-[11px] text-slate-400">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="uppercase tracking-[0.16em] text-slate-500 mb-1">
                    Moyenne / requête
                  </p>
                  <p>
                    {stats.avg_tokens_per_request.toFixed(1)} tokens •{" "}
                    {stats.avg_cost_per_request.toFixed(5)} $
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="uppercase tracking-[0.16em] text-slate-500 mb-1">
                    Min / Max tokens
                  </p>
                  <p>
                    {stats.min_tokens} &rarr; {stats.max_tokens}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="uppercase tracking-[0.16em] text-slate-500 mb-1">
                    Volume (hier → aujourd&apos;hui)
                  </p>
                  <p>
                    {stats.requests_yesterday} &rarr; {stats.requests_today}{" "}
                    requêtes
                  </p>
                </div>
              </div>
            )}

            {/* GRAPH + RÉPARTITION ENDPOINT */}
            <div className="grid gap-6 lg:grid-cols-2 mt-6">
{/* === Graphique d’activité quotidienne — Version PRO Max === */}
<div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
  <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-4">
    Activité quotidienne
    <span className="text-[10px] text-slate-500"> (30j)</span>
  </p>

  {daily.length === 0 && (
    <p className="text-xs text-slate-500">Pas de données.</p>
  )}

  {daily.length > 0 && <GraphActivityPro data={daily} />}
</div>


              {/* Répartition par endpoint */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-blue-400" />
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      Répartition par endpoint
                    </p>
                  </div>
                </div>

                {endpointDistribution.length === 0 && (
                  <p className="text-xs text-slate-500">
                    Aucune donnée encore. Génère au moins un titre 😊
                  </p>
                )}

                {endpointDistribution.length > 0 && (
                  <div className="space-y-3">
                    {endpointDistribution.map((ep) => {
                      const pct = Math.round(
                        (ep.total_requests / totalRequestsForPct) * 100
                      );

                      return (
                        <div key={ep.endpoint} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium">
                              {ep.endpoint ?? "inconnu"}
                            </span>
                            <span className="text-slate-400">
                              {ep.total_requests} req —{" "}
                              {(ep.total_cost || 0).toFixed(4)} $
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* LISTE DES DERNIÈRES REQUÊTES */}
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Dernières requêtes
                  </p>
                </div>
                <p className="text-[11px] text-slate-500">
                  Tri : {sortField} ({sortDir})
                </p>
              </div>

              {loadingRows && (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                </div>
              )}

              {errorRows && !loadingRows && (
                <p className="text-xs text-red-400">{errorRows}</p>
              )}

              {!loadingRows && !errorRows && rows.length === 0 && (
                <p className="text-xs text-slate-500">
                  Aucune requête enregistrée pour l&apos;instant.
                </p>
              )}

              {!loadingRows && !errorRows && rows.length > 0 && (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-xs md:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800/80 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                        <th className="py-2 px-2 text-left">
                          <button
                            onClick={() => toggleSort("created_at")}
                            className="inline-flex items-center gap-1 hover:text-slate-300"
                          >
                            Date
                            <ArrowUpDown className="h-3 w-3" />
                          </button>
                        </th>
                        <th className="py-2 px-2 text-left">
                          <button
                            onClick={() => toggleSort("endpoint")}
                            className="inline-flex items-center gap-1 hover:text-slate-300"
                          >
                            Endpoint
                            <ArrowUpDown className="h-3 w-3" />
                          </button>
                        </th>
                        <th className="py-2 px-2 text-right">
                          <button
                            onClick={() => toggleSort("total_tokens")}
                            className="inline-flex items-center gap-1 hover:text-slate-300"
                          >
                            Tokens
                            <ArrowUpDown className="h-3 w-3" />
                          </button>
                        </th>
                        <th className="py-2 px-2 text-right">
                          <button
                            onClick={() => toggleSort("cost_usd")}
                            className="inline-flex items-center gap-1 hover:text-slate-300"
                          >
                            Coût
                            <ArrowUpDown className="h-3 w-3" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => {
                        const isExpensive =
                          (r.total_tokens ?? 0) >= expensiveThresholdTokens ||
                          (r.cost_usd ?? 0) >= expensiveThresholdCost;

                        return (
                          <tr
                            key={r.id}
                            className={`border-b border-slate-900/70 hover:bg-slate-900/70 transition-colors ${
                              isExpensive ? "animate-pulse" : ""
                            }`}
                          >
                            <td className="py-2.5 px-2 whitespace-nowrap">
                              <span className="text-slate-100">
                                {formatDateTime(r.created_at)}
                              </span>
                            </td>
                            <td className="py-2.5 px-2">
                              <span className="inline-flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/70 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                                  {r.endpoint ?? "inconnu"}
                                </span>
                              </span>
                            </td>
                            <td className="py-2.5 px-2 text-right">
                              <span className="text-slate-100">
                                {r.total_tokens}
                              </span>
                            </td>
                            <td className="py-2.5 px-2 text-right">
                              <span className="text-slate-100">
                                {r.cost_usd.toFixed(5)} $
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* NOTIFICATIONS type playground */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 max-w-xs">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="text-xs px-3 py-2 rounded-xl shadow-lg border border-slate-700/60 bg-slate-900/95 text-slate-50"
            >
              <p className="font-medium flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {n.message}
              </p>
              {n.subtitle && (
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {n.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
