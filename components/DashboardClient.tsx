"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Coin } from "@/types/crypto";
import CryptoTable from "./CryptoTable";

const CryptoCard = dynamic(() => import("./CryptoCard"), { ssr: false });
const PriceChart = dynamic(() => import("./PriceChart"), { ssr: false });

interface Props {
  coins: Coin[];
}

export default function DashboardClient({ coins }: Props) {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(coins[0] ?? null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 animate-fade-in">
        {coins.slice(0, 10).map((coin) => (
          <CryptoCard
            key={coin.id}
            coin={coin}
            onClick={setSelectedCoin}
            isSelected={selectedCoin?.id === coin.id}
          />
        ))}
      </div>

      {selectedCoin && (
        <div className="animate-slide-up">
          <PriceChart coin={selectedCoin} />
        </div>
      )}

      <div className="animate-fade-in">
        <CryptoTable
          coins={coins}
          onSelect={setSelectedCoin}
          selectedId={selectedCoin?.id ?? null}
        />
      </div>
    </div>
  );
}
