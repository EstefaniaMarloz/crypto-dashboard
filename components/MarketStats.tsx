import { GlobalData } from "@/types/crypto";
import { formatCurrency, formatPercent } from "@/lib/api";
import clsx from "clsx";

interface Props {
  data: GlobalData;
}

export default function MarketStats({ data }: Props) {
  const { total_market_cap, total_volume, market_cap_percentage, market_cap_change_percentage_24h_usd, active_cryptocurrencies, markets } = data.data;

  const totalMarketCap = total_market_cap.usd;
  const totalVolume = total_volume.usd;
  const btcDominance = market_cap_percentage.btc;
  const ethDominance = market_cap_percentage.eth;
  const isPositive = market_cap_change_percentage_24h_usd >= 0;

  const stats = [
    {
      label: "Cap. de Mercado Total",
      value: formatCurrency(totalMarketCap, true),
      sub: formatPercent(market_cap_change_percentage_24h_usd),
      positive: isPositive,
    },
    {
      label: "Volumen 24h",
      value: formatCurrency(totalVolume, true),
      sub: `${((totalVolume / totalMarketCap) * 100).toFixed(2)}% del market cap`,
      positive: true,
    },
    {
      label: "Dominancia BTC",
      value: `${btcDominance.toFixed(1)}%`,
      sub: `ETH: ${ethDominance.toFixed(1)}%`,
      positive: null,
    },
    {
      label: "Criptomonedas Activas",
      value: active_cryptocurrencies.toLocaleString(),
      sub: `${markets} exchanges`,
      positive: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 backdrop-blur-sm"
        >
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
            {stat.label}
          </p>
          <p className="text-white text-xl font-bold mb-1">{stat.value}</p>
          <p
            className={clsx("text-xs font-medium", {
              "text-emerald-400": stat.positive === true,
              "text-rose-400": stat.positive === false,
              "text-slate-400": stat.positive === null,
            })}
          >
            {stat.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
