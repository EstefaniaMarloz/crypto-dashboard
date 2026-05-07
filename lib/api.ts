import { Coin, GlobalData, ChartDataPoint, MarketChartResponse } from "@/types/crypto";

const BASE_URL = "https://api.coingecko.com/api/v3";

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (res.ok) return res;
    if (res.status === 429 && i < retries - 1) {
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
      continue;
    }
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  throw new Error("Max retries exceeded");
}

export async function getTopCoins(limit = 20): Promise<Coin[]> {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`;
  const res = await fetchWithRetry(url);
  return res.json();
}

export async function getGlobalData(): Promise<GlobalData> {
  const res = await fetchWithRetry(`${BASE_URL}/global`);
  return res.json();
}

export async function getCoinChart(
  coinId: string,
  days: number = 7
): Promise<ChartDataPoint[]> {
  const url = `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=hourly`;
  const res = await fetchWithRetry(url);
  const data: MarketChartResponse = await res.json();
  return data.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
    date: new Date(timestamp).toLocaleDateString("es-MX", {
      month: "short",
      day: "numeric",
      hour: days <= 1 ? "2-digit" : undefined,
      minute: days <= 1 ? "2-digit" : undefined,
    }),
  }));
}

export function formatCurrency(value: number, compact = false): string {
  if (compact) {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}
