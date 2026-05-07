"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const update = () =>
      setLastUpdated(
        new Date().toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">CryptoDash</h1>
              <p className="text-slate-400 text-xs">Mercado en tiempo real</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1.5 border border-slate-700/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-300 text-xs font-medium">EN VIVO</span>
            </div>
            {lastUpdated && (
              <span className="text-slate-500 text-xs hidden md:block">
                Actualizado: {lastUpdated}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
