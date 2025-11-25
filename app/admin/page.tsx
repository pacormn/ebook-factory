"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BarChart2,
  Cpu,
  DollarSign,
  Loader2,
  RefreshCcw,
  Table,
  PieChart,
  Download,
} from "lucide-react";
import Link from "next/link";

// -------- Types -------- //
type SummaryResponse = {
  totals: {
    total_tokens: number;
    total_cost_usd: number;
    total_requests: number;
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
  latest?: {
    id: string;
    model: string;
    total_tokens: number;
    cost_usd: number;
    endpoint: string;
    created_at: string;
  }[];
};

// -------- Helper : format tokens -------- //
const formatTokens = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + " M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + " k";
  return n.toString();
};

export default function AdminPage() {
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // -------- Fetch function -------- //
  const fetchSummary = async () => {
    try {
      const res = await fetch("/api/admin/ai-usage/summary");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Erreur admin:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load on mount + refresh every 10s
  useEffect(() => {
    fetchSummary();
    const id = setInterval(fetchSummary, 10_000);
    return () => clearInterval(id);
  }, []);

  const totals = data?.totals;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 pb-24">
      {/* Header */}
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
              Dashboard OpenAI <Cpu className="h-4 w-4 text-emerald-400" />
            </h1>
          </div>
        </div>

        {/* Refresh */}
        <button
          onClick={() => {
            setRefreshing(true);
            fetchSummary();
          }}
          className="p-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800"
        >
          <RefreshCcw
            size={18}
            className={`transition ${refreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* loading */}
      {loading && (
        <div className="flex items-center justify-center mt-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      )}

      {!loading && data && (
        <section className="max-w-6xl mx-auto px-4 pt-6 space-y-10">

          {/* ---------- 3 Stat Cards ---------- */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* REQ */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Requêtes totales
              </p>
              <div className="mt-2 text-3xl font-semibold">
                {totals?.total_requests}
              </div>
            </div>

            {/* TOKENS */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Tokens consommés
              </p>
              <div className="mt-2 text-3xl font-semibold">
                {formatTokens(totals?.total_tokens ?? 0)}
              </div>
            </div>

            {/* COST */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500 flex items-center gap-1">
                Coût total estimé <DollarSign className="h-3 w-3 text-emerald-400" />
              </p>
              <div className="mt-2 text-3xl font-semibold">
                {(totals?.total_cost_usd ?? 0).toFixed(4)} $
              </div>
            </div>
          </div>

          {/* ---------- GRAPHIQUE JOURNALIER ---------- */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <h2 className="text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <BarChart2 size={14} className="text-blue-400" />
              Activité quotidienne (30 jours)
            </h2>

            <div className="flex items-end gap-2 h-40">
              {data.daily.map((d) => {
                const max = Math.max(...data.daily.map((x) => x.total_requests || 1));
                const heightPct = (d.total_requests / max) * 100;

                const dateObj = new Date(d.day);
                const label = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;

                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-full bg-gradient-to-t from-blue-500 to-purple-500 transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[9px] text-slate-500">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------- RÉPARTITION PAR MODÈLE ---------- */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <PieChart size={14} className="text-purple-400" />
              <h3 className="text-sm uppercase tracking-widest">Répartition par modèle</h3>
            </div>

            {data.byModel.length === 0 ? (
              <p className="text-xs text-slate-500">Aucune donnée pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {data.byModel.map((m) => {
                  const pct =
                    ((m.total_requests / (totals?.total_requests || 1)) * 100).toFixed(0);

                  return (
                    <div key={m.model} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">{m.model}</span>
                        <span className="text-slate-400">
                          {m.total_requests} req — {m.total_cost_usd.toFixed(4)} $
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------- TABLEAU DES DERNIÈRES REQUÊTES ---------- */}
          {data.latest && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Table size={14} className="text-emerald-400" />
                <h3 className="text-sm uppercase tracking-widest">Dernières requêtes</h3>
              </div>

              <table className="w-full text-sm">
                <thead className="text-slate-400 text-xs">
                  <tr>
                    <th className="py-2">Modèle</th>
                    <th>Endpoint</th>
                    <th>Tokens</th>
                    <th>Coût</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {data.latest.map((row) => (
                    <tr key={row.id} className="border-t border-slate-800/80">
                      <td className="py-2">{row.model}</td>
                      <td>{row.endpoint}</td>
                      <td>{formatTokens(row.total_tokens)}</td>
                      <td>{row.cost_usd.toFixed(4)} $</td>
                      <td>{new Date(row.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
