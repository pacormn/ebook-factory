"use client";

type DayData = {
  day: string;
  total_requests: number;
};

export default function DailyActivityChart({ data }: { data: DayData[] }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-xs text-slate-500">
        Pas encore assez de données pour afficher un graphique.
      </p>
    );
  }

  // Convertir en points SVG
  const max = Math.max(...data.map((d) => d.total_requests || 1));

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100; // 0 → 100%
    const y = 100 - (d.total_requests / max) * 100; // 0 en bas → 100 en haut
    return `${x},${y}`;
  });

  const path = `M ${points.join(" L ")}`;

  return (
    <div className="w-full h-48 mt-3 relative">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        {/* Dégradé */}
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(56, 189, 248)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(56, 189, 248)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area */}
        <path
          d={`${path} L 100,100 L 0,100 Z`}
          fill="url(#chartFill)"
        />

        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke="rgb(56, 189, 248)"
          strokeWidth="1.5"
          className="drop-shadow-[0_0_4px_rgba(56,189,248,0.5)]"
        />

        {/* Points */}
        {points.map((p, i) => {
          const [x, y] = p.split(",");
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.4"
              fill="white"
              stroke="rgb(56,189,248)"
              strokeWidth="0.4"
            />
          );
        })}
      </svg>

      {/* Labels */}
      <div className="absolute bottom-[-12px] left-0 w-full flex justify-between text-[9px] text-slate-500">
        {data.map((d) => {
          const dateObj = new Date(d.day);
          const label = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
          return <span key={d.day}>{label}</span>;
        })}
      </div>
    </div>
  );
}
