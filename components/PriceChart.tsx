"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Coin, ChartDataPoint } from "@/types/crypto";
import { getCoinChart, formatCurrency, formatPercent } from "@/lib/api";
import Image from "next/image";
import clsx from "clsx";

interface Props {
  coin: Coin;
}

const PERIODS = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 shadow-xl">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-white font-bold text-sm">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function PriceChart({ coin }: Props) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [activePeriod, setActivePeriod] = useState(7);
  const [loading, setLoading] = useState(true);

  const isPositive = coin.price_change_percentage_24h >= 0;
  const gradientId = `gradient-${coin.id}`;
  const strokeColor = isPositive ? "#10b981" : "#f43f5e";

  const loadChart = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCoinChart(coin.id, activePeriod);
      setChartData(data);
    } catch {
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, [coin.id, activePeriod]);

  useEffect(() => {
    loadChart();
  }, [loadChart]);

  const minPrice = chartData.length ? Math.min(...chartData.map((d) => d.price)) : 0;
  const maxPrice = chartData.length ? Math.max(...chartData.map((d) => d.price)) : 0;
  const priceRange = maxPrice - minPrice;
  const domainMin = minPrice - priceRange * 0.05;
  const domainMax = maxPrice + priceRange * 0.05;

  const ticks = chartData.length
    ? chartData.filter((_, i) => i % Math.floor(chartData.length / 6) === 0).map((d) => d.date)
    : [];

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Image
            src={coin.image}
            alt={coin.name}
            width={48}
            height={48}
            className="rounded-full"
            unoptimized
          />
          <div>
            <h2 className="text-white font-bold text-xl">{coin.name}</h2>
            <p className="text-slate-400 text-sm uppercase">{coin.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white text-2xl font-bold">{formatCurrency(coin.current_price)}</p>
          <p className={clsx("text-sm font-semibold", isPositive ? "text-emerald-400" : "text-rose-400")}>
            {formatPercent(coin.price_change_percentage_24h)} (24h)
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-4 bg-slate-900/50 rounded-xl p-1 w-fit">
        {PERIODS.map((p) => (
          <button
            key={p.days}
            onClick={() => setActivePeriod(p.days)}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150",
              activePeriod === p.days
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="h-64 sm:h-80">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            No se pudo cargar el gráfico
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="date"
                ticks={ticks}
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[domainMin, domainMax]}
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={70}
                tickFormatter={(v) => formatCurrency(v, v > 1000)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={strokeColor}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{ r: 4, fill: strokeColor, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-700/50">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Máx 24h</p>
          <p className="text-white text-sm font-semibold">{formatCurrency(coin.high_24h)}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Mín 24h</p>
          <p className="text-white text-sm font-semibold">{formatCurrency(coin.low_24h)}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">ATH</p>
          <p className="text-white text-sm font-semibold">{formatCurrency(coin.ath)}</p>
          <p className="text-rose-400 text-xs">{formatPercent(coin.ath_change_percentage)}</p>
        </div>
      </div>
    </div>
  );
}
