"use client";

import Image from "next/image";
import { Coin } from "@/types/crypto";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/api";
import clsx from "clsx";

interface Props {
  coins: Coin[];
  onSelect: (coin: Coin) => void;
  selectedId: string | null;
}

export default function CryptoTable({ coins, onSelect, selectedId }: Props) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
      <div className="px-5 py-4 border-b border-slate-700/50">
        <h2 className="text-white font-semibold text-base">Top Criptomonedas</h2>
        <p className="text-slate-400 text-xs mt-0.5">Haz clic en una fila para ver el gráfico</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700/30">
              <th className="text-left px-5 py-3 font-medium w-8">#</th>
              <th className="text-left px-5 py-3 font-medium">Moneda</th>
              <th className="text-right px-5 py-3 font-medium">Precio</th>
              <th className="text-right px-5 py-3 font-medium hidden sm:table-cell">24h %</th>
              <th className="text-right px-5 py-3 font-medium hidden md:table-cell">Market Cap</th>
              <th className="text-right px-5 py-3 font-medium hidden lg:table-cell">Volumen 24h</th>
              <th className="text-right px-5 py-3 font-medium hidden xl:table-cell">Suministro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {coins.map((coin) => {
              const isPositive = coin.price_change_percentage_24h >= 0;
              const isActive = selectedId === coin.id;
              return (
                <tr
                  key={coin.id}
                  onClick={() => onSelect(coin)}
                  className={clsx(
                    "cursor-pointer transition-colors duration-150",
                    isActive
                      ? "bg-violet-500/10"
                      : "hover:bg-slate-700/30"
                  )}
                >
                  <td className="px-5 py-3.5 text-slate-500 text-xs font-medium">
                    {coin.market_cap_rank}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={28}
                        height={28}
                        className="rounded-full flex-shrink-0"
                        unoptimized
                      />
                      <div>
                        <p className="text-white font-medium leading-none">{coin.name}</p>
                        <p className="text-slate-400 text-[11px] uppercase mt-0.5">{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-white font-semibold">
                      {formatCurrency(coin.current_price)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right hidden sm:table-cell">
                    <span
                      className={clsx(
                        "text-xs font-bold px-2 py-1 rounded-full",
                        isPositive
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-rose-500/15 text-rose-400"
                      )}
                    >
                      {formatPercent(coin.price_change_percentage_24h)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-slate-300 hidden md:table-cell">
                    {formatCurrency(coin.market_cap, true)}
                  </td>
                  <td className="px-5 py-3.5 text-right text-slate-300 hidden lg:table-cell">
                    {formatCurrency(coin.total_volume, true)}
                  </td>
                  <td className="px-5 py-3.5 text-right text-slate-400 text-xs hidden xl:table-cell">
                    {formatNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
