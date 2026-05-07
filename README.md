# CryptoDash

[English](#english) · [Español](#español)

---

<a name="english"></a>
## English

Real-time cryptocurrency dashboard built with Next.js 15 and the CoinGecko public API. Displays live prices, interactive charts, and market statistics for the top cryptocurrencies.

🔗 **[Live demo](#)** ← *(update with Vercel link)*

### Visual overview

```
┌─────────────────────────────────────────────────────────┐
│  CryptoDash                               ● LIVE         │
├─────────────────────────────────────────────────────────┤
│  Total Market Cap   Volume 24h   BTC Dom.   Cryptos     │
│  $2.34T ▲1.2%       $98.5B       54.3%      15,234      │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Bitcoin  │ │Ethereum  │ │  Tether  │ │   BNB    │  │
│  │ $67,432  │ │ $3,521   │ │  $1.00   │ │  $412    │  │
│  │ ▲ 2.14% │ │ ▲ 1.87% │ │ ▲ 0.01% │ │ ▼ 0.53% │  │
│  │ ~~~~~~~~ │ │ ~~~~~~~~ │ │ ~~~~~~~~ │ │ ~~~~~~~~ │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
├─────────────────────────────────────────────────────────┤
│  Bitcoin (BTC)                          $67,432  ▲2.14% │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Interactive area chart                │   │
│  │    [24h]  [7d]  [30d]  [90d]                   │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  Full table: Top 20 cryptocurrencies                    │
│  # │ Coin │ Price │ 24h% │ Market Cap │ Volume          │
└─────────────────────────────────────────────────────────┘
```

### Features

- **Global stats** — total market cap, 24h volume, BTC/ETH dominance and active exchanges
- **Interactive cards** — top 10 coins with 7-day sparkline, current price and 24h change; click to open the detailed chart
- **Area chart** — historical prices with 24h, 7d, 30d and 90d periods; custom tooltip and automatic scaling
- **Full table** — top 20 with rank, price, percentage change, market cap, 24h volume and circulating supply
- **Dark mode design** — professional dark palette, fully responsive (mobile, tablet, desktop)
- **Live data** — automatic revalidation every 60 seconds via Next.js ISR

### Tech stack

| Technology | Role |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework with App Router and ISR |
| [TypeScript](https://www.typescriptlang.org/) | Static typing throughout the project |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling and responsive design |
| [Recharts](https://recharts.org/) | Area charts and sparklines |
| [CoinGecko API](https://www.coingecko.com/en/api) | Real-time market data (public, no API key required) |
| [clsx](https://github.com/lukeed/clsx) | Conditional CSS class composition |

### Running locally

**Prerequisites:** Node.js 18+

```bash
# Clone the repository
git clone https://github.com/EstefaniaMarloz/crypto-dashboard.git
cd crypto-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Available scripts**

```bash
npm run dev      # Development server with hot reload
npm run build    # Production build
npm run start    # Production server (requires build first)
npm run lint     # ESLint
```

> **Note:** The public CoinGecko API has a limit of ~30 requests per minute. If you see 429 errors, wait a few seconds and reload.

### Project structure

```
crypto-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with Header and Footer
│   ├── page.tsx            # Main page (Server Component)
│   └── globals.css         # Global styles and scrollbar
├── components/
│   ├── Header.tsx          # Navigation bar with live indicator
│   ├── Footer.tsx          # Footer with contact links
│   ├── MarketStats.tsx     # Global market statistics
│   ├── DashboardClient.tsx # Client orchestrator with selection state
│   ├── CryptoCard.tsx      # Coin card with sparkline
│   ├── Sparkline.tsx       # 7-day mini chart (Recharts)
│   ├── PriceChart.tsx      # Detailed area chart with time periods
│   └── CryptoTable.tsx     # Full top 20 table
├── lib/
│   └── api.ts              # CoinGecko fetch functions + format utilities
├── types/
│   └── crypto.ts           # TypeScript types for the API
└── instrumentation.ts      # localStorage polyfill for SSR
```

### Deployment

The easiest deployment is with [Vercel](https://vercel.com/):

1. Push the repository to GitHub
2. Import the project in Vercel
3. Deploy — no environment variables required

---

<a name="español"></a>
## Español

Dashboard de criptomonedas en tiempo real construido con Next.js 15 y la API pública de CoinGecko. Muestra precios, gráficas interactivas y estadísticas de mercado de las principales criptomonedas.

🔗 **[Ver demo en vivo](#)** ← *(actualizar con link de Vercel)*

### Vista general

```
┌─────────────────────────────────────────────────────────┐
│  CryptoDash                               ● EN VIVO      │
├─────────────────────────────────────────────────────────┤
│  Market Cap Total   Volumen 24h   Dom. BTC   Cryptos    │
│  $2.34T ▲1.2%       $98.5B        54.3%      15,234     │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Bitcoin  │ │Ethereum  │ │  Tether  │ │   BNB    │  │
│  │ $67,432  │ │ $3,521   │ │  $1.00   │ │  $412    │  │
│  │ ▲ 2.14% │ │ ▲ 1.87% │ │ ▲ 0.01% │ │ ▼ 0.53% │  │
│  │ ~~~~~~~~ │ │ ~~~~~~~~ │ │ ~~~~~~~~ │ │ ~~~~~~~~ │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
├─────────────────────────────────────────────────────────┤
│  Bitcoin (BTC)                          $67,432  ▲2.14% │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Gráfica de área interactiva             │   │
│  │    [24h]  [7d]  [30d]  [90d]                   │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  Tabla completa: Top 20 criptomonedas                   │
│  # │ Moneda │ Precio │ 24h% │ Market Cap │ Volumen      │
└─────────────────────────────────────────────────────────┘
```

### Funcionalidades

- **Stats globales** — market cap total, volumen 24h, dominancia BTC/ETH y número de exchanges activos
- **Cards interactivas** — top 10 monedas con sparkline de 7 días, precio actual y variación 24h; al hacer clic abre el gráfico detallado
- **Gráfica de área** — precios históricos con períodos de 24h, 7d, 30d y 90d; tooltip personalizado y escala automática
- **Tabla completa** — top 20 con rank, precio, cambio porcentual, market cap, volumen 24h y suministro circulante
- **Diseño dark mode** — paleta oscura profesional, totalmente responsive (mobile, tablet, desktop)
- **Datos en vivo** — revalidación automática cada 60 segundos vía ISR de Next.js

### Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 15](https://nextjs.org/) | Framework React con App Router e ISR |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático en todo el proyecto |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos utilitarios y diseño responsive |
| [Recharts](https://recharts.org/) | Gráficas de área y sparklines |
| [CoinGecko API](https://www.coingecko.com/en/api) | Datos de mercado en tiempo real (pública, sin API key) |
| [clsx](https://github.com/lukeed/clsx) | Composición condicional de clases CSS |

### Correr el proyecto localmente

**Requisitos previos:** Node.js 18 o superior

```bash
# Clonar el repositorio
git clone https://github.com/EstefaniaMarloz/crypto-dashboard.git
cd crypto-dashboard

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

**Scripts disponibles**

```bash
npm run dev      # Servidor de desarrollo con hot reload
npm run build    # Build de producción
npm run start    # Servidor de producción (requiere build previo)
npm run lint     # Linter con ESLint
```

> **Nota:** La API pública de CoinGecko tiene un límite de ~30 solicitudes por minuto. Si ves errores 429, espera unos segundos y recarga la página.

### Estructura del proyecto

```
crypto-dashboard/
├── app/
│   ├── layout.tsx          # Layout raíz con Header y Footer
│   ├── page.tsx            # Página principal (Server Component)
│   └── globals.css         # Estilos globales y scrollbar
├── components/
│   ├── Header.tsx          # Barra de navegación con indicador en vivo
│   ├── Footer.tsx          # Footer con links de contacto
│   ├── MarketStats.tsx     # Estadísticas globales del mercado
│   ├── DashboardClient.tsx # Orquestador cliente con estado de selección
│   ├── CryptoCard.tsx      # Card de moneda con sparkline
│   ├── Sparkline.tsx       # Mini gráfica de 7 días (Recharts)
│   ├── PriceChart.tsx      # Gráfica de área detallada con períodos
│   └── CryptoTable.tsx     # Tabla completa top 20
├── lib/
│   └── api.ts              # Funciones fetch hacia CoinGecko + utilidades de formato
├── types/
│   └── crypto.ts           # Tipos TypeScript para la API
└── instrumentation.ts      # Polyfill de localStorage para SSR
```

### Despliegue

El despliegue más sencillo es con [Vercel](https://vercel.com/):

1. Hacer push del repositorio a GitHub
2. Importar el proyecto en Vercel
3. Desplegar — no se requiere ninguna variable de entorno

---

## Desarrollado por · Developed by

**Francisca Estefania Martinez Lozano**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/estefaniaml)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/EstefaniaMarloz)
