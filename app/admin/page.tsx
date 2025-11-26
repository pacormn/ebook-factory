// app/admin/page.tsx
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

type SummaryResponse = {
  totals: {
    total_tokens: number | null;
    total_cost_usd: number | null;
    total_requests: number | null;
  };
  byModel: {
    model: string;
    total_tokens: number;
    total_cost_usd: number;
    total_requests: number;
  }[];
  daily: {
    day: string;
    total_tokens: number;
    total_cost_usd: number;
    total_requests: number;
  }[];
};

type AiUsageRow = {
  id: string;
  created_at: string;
  model: string;
  endpoint: string;
  total_tokens: number;
  prompt_tokens: number;
  completion_tokens: number;
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
  // si < 1000 → valeur brute ; sinon en milliers
  if (tokens < 1000) return `${tokens} tokens`;
  return `${(tokens / 1000).toFixed(1)}k tokens`;
}

export default function AdminPage() {
  const [data, setData] = useState<SummaryResponse | null>(null);
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

  // ============================
  // 1) Chargement du résumé
  // ============================
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/admin/ai-usage/summary");
        if (!res.ok) throw new Error("API ERROR");
        const json = (await res.json()) as SummaryResponse;
        setData(json);
      } catch (e: any) {
        setErrorSummary(e?.message || "Erreur de chargement");
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, []);

  const totals = data?.totals;

  // ============================
  // 2) Live : dernière requête
  // ============================
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let isMounted = true;

    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/admin/ai-usage/latest");
        if (!res.ok) return;
        const json = (await res.json()) as LatestResponse;
        if (!isMounted) return;

        if (json.latest) {
          setLatest(json.latest);

          // première fois : on enregistre l'id sans créer de notif
          if (!lastSeenId) {
            setLastSeenId(json.latest.id);
          } else if (json.latest.id !== lastSeenId) {
            // nouvelle requête détectée => notif
            setLastSeenId(json.latest.id);
            const msg = `Nouvelle requête : ${json.latest.endpoint}`;
            const subtitle = `${json.latest.total_tokens} tokens • ${json.latest.cost_usd.toFixed(
              5
            )} $`;

            const notifId = json.latest.id;
            setNotifications((prev) => [
              ...prev,
              { id: notifId, message: msg, subtitle },
            ]);

            // auto-dismiss après 3s
            setTimeout(() => {
              setNotifications((prev) =>
                prev.filter((n) => n.id !== notifId)
              );
            }, 6000);
          }
        }
      } catch (e) {
        // on log mais on ne casse pas la page
        console.error("[admin latest fetch]", e);
      }
    };

    // première récupération immédiate
    fetchLatest();
    // puis toutes les 3 secondes
    interval = setInterval(fetchLatest, 3000);

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSeenId]);

  const liveStatusText = useMemo(() => {
    if (!latest) return "En attente de la première requête...";
    return `Dernière requête : ${latest.endpoint} • ${latest.total_tokens} tokens`;
  }, [latest]);

  // ============================
  // 3) Liste des requêtes + tri
  // ============================
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
        // on inverse juste le sens
        setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
        return prevField;
      } else {
        // nouveau champ => desc par défaut
        setSortDir("desc");
        return field;
      }
    });
  };

  const expensiveThresholdTokens = 800;
  const expensiveThresholdCost = 0.001;

  const unreadCount = notifications.length;

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

        {/* Widget LIVE compact en haut */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1.5 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-slate-300">LIVE</span>
          <span className="text-slate-500">&mdash;</span>
          <span className="text-slate-400 truncate max-w-[210px]">
            {liveStatusText}
          </span>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 pb-20 pt-6 space-y-8">
        {/* WIDGET LIVE en version carte pour mobile */}
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
                  {latest.endpoint} — {latest.total_tokens} tokens
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

        {/* Résumé global */}
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

        {!loadingSummary && !errorSummary && data && (
          <>
            {/* CARDS TOP */}
            <div className="grid gap-4 sm:grid-cols-3">
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
                    {/* si très petit => en tokens, sinon en milliers */}
                    {(totals?.total_tokens ?? 0) < 1000
                      ? `${totals?.total_tokens ?? 0}`
                      : `${((totals?.total_tokens ?? 0) / 1000).toFixed(1)}k`}
                  </span>
                  <span className="text-xs text-slate-500">tokens</span>
                </div>
              </div>

              {/* Coût total estimé */}
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
            </div>

            {/* GRAPH + LISTES */}
            <div className="grid gap-6 lg:grid-cols-2 mt-6">
              {/* ACTIVITÉ QUOTIDIENNE */}
              {/* daily */}
{/* === Graphique d’activité quotidienne === */}
<div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
  <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-4">
    Activité quotidienne
    <span className="text-[10px] text-slate-500"> (30j)</span>
  </p>

  {!data?.daily?.length && (
    <p className="text-xs text-slate-500">Pas de données.</p>
  )}

  {data?.daily?.length > 0 && (
    <div className="relative h-40 w-full">
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {(() => {
          const maxRq = Math.max(...data.daily.map((d) => d.total_requests), 1);

          const points = data.daily
            .map((d, i) => {
              const x = (i / 29) * 100;
              const y = 100 - (d.total_requests / maxRq) * 100;
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <>
              {/* zone dégradée */}
              <polyline
                points={`0,100 ${points} 100,100`}
                fill="url(#activityGradient)"
                opacity="0.4"
              />

              {/* ligne */}
              <polyline
                points={points}
                fill="none"
                stroke="url(#activityGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          );
        })()}
      </svg>
    </div>
  )}
</div>


{/* === Répartition par endpoint === */}
<div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <BarChart2 className="h-4 w-4 text-blue-400" />
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
        Répartition par endpoint
      </p>
    </div>
  </div>

  {data.lastRequests.length === 0 && (
    <p className="text-xs text-slate-500">Aucune donnée encore.</p>
  )}

  {data.lastRequests.length > 0 && (
    <div className="space-y-3">
      {(() => {
        // regroupement des endpoints
        const map = new Map<
          string,
          { total_cost: number; total_tokens: number; total_requests: number }
        >();

        data.lastRequests.forEach((req) => {
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

        const totalReq = data.totals.total_requests || 1;

        return [...map.entries()].map(([ep, stats]) => {
          const pct = Math.round((stats.total_requests / totalReq) * 100);

          return (
            <div key={ep} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{ep}</span>
                <span className="text-slate-400">
                  {stats.total_requests} req —
                  {(stats.total_cost || 0).toFixed(4)} $
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
        });
      })()}
    </div>
  )}
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
                  Aucune requête enregistrée pour l’instant.
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
                        <th className="py-2 px-2 text-left">Endpoint</th>
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
                              isExpensive ? "expensive-row" : ""
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
                                  {r.endpoint}
                                </span>
                                {isExpensive && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-500/10 text-[10px] text-rose-300 border border-rose-500/40 animate-pulse-soft">
                                    🔥 chère
                                  </span>
                                )}
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

      {/* NOTIFICATIONS type playground, en bas à droite */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 max-w-xs">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="glass-notif text-xs px-3 py-2 rounded-xl shadow-lg border border-slate-700/60 bg-slate-900/90 text-slate-50 animate-slide-in-up"
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
