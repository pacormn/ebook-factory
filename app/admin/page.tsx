// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, BarChart2, Cpu, DollarSign, Loader2 } from "lucide-react";
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

export default function AdminPage() {
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/admin/ai-usage/summary");
        if (!res.ok) throw new Error("Erreur API");
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* header */}
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
          <p className="mt-10 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && data && (
          <>
            {/* cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
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

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Tokens consommés
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">
                    {((totals?.total_tokens ?? 0) / 1_000_000).toFixed(3)}
                  </span>
                  <span className="text-xs text-slate-500">millions</span>
                </div>
              </div>

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

            {/* by model + daily */}
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* by model */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-blue-400" />
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      Répartition par modèle
                    </p>
                  </div>
                </div>

                {data.byModel.length === 0 && (
                  <p className="text-xs text-slate-500">
                    Aucune donnée encore. Génère au moins un titre 😊
                  </p>
                )}

                {data.byModel.length > 0 && (
                  <div className="space-y-3">
                    {data.byModel.map((m) => {
                      const totalReq = totals?.total_requests ?? 1;
                      const pct = Math.round(
                        ((m.total_requests || 0) / totalReq) * 100
                      );

                      return (
                        <div key={m.model} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium">{m.model}</span>
                            <span className="text-slate-400">
                              {m.total_requests} req —{" "}
                              {(m.total_cost_usd ?? 0).toFixed(4)} $
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

              {/* daily */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-4 flex items-center gap-2">
                  Activité quotidienne
                  <span className="text-[10px] text-slate-500">
                    (30 derniers jours)
                  </span>
                </p>

                {data.daily.length === 0 && (
                  <p className="text-xs text-slate-500">
                    Pas encore de trafic enregistré.
                  </p>
                )}

                {data.daily.length > 0 && (
                  <div className="flex items-end gap-1 h-40">
                    {data.daily.map((d) => {
                      const maxReq = Math.max(
                        ...data.daily.map((x) => x.total_requests || 1)
                      );
                      const height = Math.max(
                        6,
                        (d.total_requests / maxReq) * 100
                      );

                      const dateObj = new Date(d.day);
                      const label = `${dateObj.getDate()}/${
                        dateObj.getMonth() + 1
                      }`;

                      return (
                        <div
                          key={d.day}
                          className="flex-1 flex flex-col items-center gap-1"
                        >
                          <div
                            className="w-full rounded-full bg-gradient-to-t from-blue-500 to-purple-500"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-[9px] text-slate-500">
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
