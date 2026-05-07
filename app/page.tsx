import Link from "next/link";
import { getTopCoins, getGlobalData } from "@/lib/api";
import MarketStats from "@/components/MarketStats";
import DashboardClient from "@/components/DashboardClient";

export const revalidate = 60;

export default async function Page() {
  let coins, globalData;

  try {
    [coins, globalData] = await Promise.all([getTopCoins(20), getGlobalData()]);
  } catch {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center text-center py-24 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-rose-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold">Error al cargar datos</h2>
          <p className="text-slate-400 max-w-md">
            No se pudieron obtener los datos de CoinGecko. La API pública tiene límites de uso. Intenta recargar la página en unos momentos.
          </p>
          <Link
            href="/"
            className="mt-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-colors text-sm"
          >
            Reintentar
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-white text-2xl font-bold mb-1">
          Mercado de Criptomonedas
        </h2>
        <p className="text-slate-400 text-sm">
          Precios actualizados cada minuto · Datos por{" "}
          <span className="text-violet-400 font-medium">CoinGecko API</span>
        </p>
      </div>

      <MarketStats data={globalData} />
      <DashboardClient coins={coins} />
    </main>
  );
}
