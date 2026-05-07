"use client";

import Image from "next/image";
import { Coin } from "@/types/crypto";
import { formatCurrency, formatPercent } from "@/lib/api";
import Sparkline from "./Sparkline";
import clsx from "clsx";

interface Props {
  coin: Coin;
  onClick: (coin: Coin) => void;
  isSelected: boolean;
}

export default function CryptoCard({ coin, onClick, isSelected }: Props) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <button
      onClick={() => onClick(coin)}
      className={clsx(
        "w-full text-left bg-slate-800/50 border rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl backdrop-blur-sm group",
        isSelected
          ? "border-violet-500 shadow-lg shadow-violet-500/20 bg-slate-800"
          : "border-slate-700/50 hover:border-slate-600"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={coin.image}
              alt={coin.name}
              width={40}
              height={40}
              className="rounded-full"
              unoptimized
            />
            <span className="absolute -bottom-1 -right-1 bg-slate-700 text-slate-300 text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-slate-600">
              {coin.market_cap_rank}
            </span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">{coin.name}</p>
            <p className="text-slate-400 text-xs uppercase mt-0.5">{coin.symbol}</p>
          </div>
        </div>
        <span
          className={clsx(
            "text-xs font-bold px-2 py-1 rounded-full",
            isPositive
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-rose-500/15 text-rose-400"
          )}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </span>
      </div>

      <div className="mb-2">
        <p className="text-white text-xl font-bold">{formatCurrency(coin.current_price)}</p>
        <p className={clsx("text-xs", isPositive ? "text-emerald-400" : "text-rose-400")}>
          {formatPercent(coin.price_change_24h)} hoy
        </p>
      </div>

      {coin.sparkline_in_7d && (
        <div className="my-2 -mx-1">
          <Sparkline data={coin.sparkline_in_7d.price} isPositive={isPositive} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-700/50">
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-wide">Market Cap</p>
          <p className="text-slate-300 text-xs font-medium mt-0.5">
            {formatCurrency(coin.market_cap, true)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-[10px] uppercase tracking-wide">Vol 24h</p>
          <p className="text-slate-300 text-xs font-medium mt-0.5">
            {formatCurrency(coin.total_volume, true)}
          </p>
        </div>
      </div>
    </button>
  );
}
