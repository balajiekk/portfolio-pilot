# Portfolio Pilot

Portfolio Pilot is a React dashboard prototype inspired by the IndMoney US stocks experience. It focuses on a holdings-first view with market index movement, section tabs, portfolio navigation, searchable holdings, and responsive layouts for desktop and mobile screens.

## Features

- IndMoney-style US stocks dashboard at `/investments/us-stocks/my-us-stocks`.
- GitHub Pages-ready routing for direct nested URLs under `/portfolio-pilot`.
- Pill-style market index strip for Nasdaq Comp, Nasdaq 100, Dow Jones, and S&P 100 with color-coded movement badges.
- Holdings table with consistent circular stock avatars, latest price, invested amount, mini 7-day sparklines, current value, and returns.
- Portfolio data access is isolated behind a `usePortfolio()` hook and service layer so static data can be swapped for live APIs without changing page components.
- Loading skeletons, retryable error states, and empty states for market indices and holdings.
- URL-backed stock search using the `q` query parameter with a 300ms debounce and ticker autocomplete suggestions.
- Sortable holdings returns column and pagination controls for larger portfolios.
- Bala Wealth branded sidebar with image-based logo and app links for My Bala, BalaStocks, F&O, and US Stocks.
- Wealth snapshot page styled with a dark rail, serif typography, cream surface, summary cards, and compact holdings rows.
- Centralized design tokens for colors, fonts, spacing, and radii in `src/styles/tokens.css`.
- Lazy-loaded feature routes and GitHub Pages SPA fallbacks for nested URLs.
- Strict shared portfolio types in `src/shared/types/portfolio.ts`.
- Responsive sidebar, holdings layout, and shared color tokens for brand, positive, and negative states.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for folder structure, data boundaries, and deployment notes.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- lucide-react icons
- Plain CSS with responsive media queries

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

```text
src/
  app/
    layouts/
    routes/
  features/
    dashboard/
      components/
      data/
      hooks/
      services/
      types/
  shared/
    components/
    utils/
  styles/
```

## Notes

The current dashboard still uses static sample portfolio data from `src/features/dashboard/data/portfolioData.ts`, but components now consume it through `src/features/dashboard/hooks/usePortfolio.ts` and `src/features/dashboard/services/portfolioService.ts`. Replace the service implementation to connect live portfolio, market index, or brokerage APIs.

Vitest and React Testing Library are the recommended next step for component coverage, especially for holdings filtering and returns sorting. They were not added in this pass because this workstation does not have `npm` available, and changing test dependencies without updating `package-lock.json` would break `npm ci` in GitHub Actions.

The Vite build uses `base: "/portfolio-pilot/"` and creates static SPA fallback files for known React Router paths so GitHub Pages can render nested pages when users open or refresh them directly. Pushes to `main` are built and published to the `gh-pages` branch by GitHub Actions.
