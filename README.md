# Portfolio Pilot

Portfolio Pilot is a React dashboard prototype inspired by the IndMoney US stocks experience. It focuses on a holdings-first view with market index movement, section tabs, portfolio navigation, searchable holdings, and responsive layouts for desktop and mobile screens.

## Features

- IndMoney-style US stocks dashboard at `/investments/us-stocks/my-us-stocks`.
- GitHub Pages-ready routing for direct nested URLs under `/portfolio-pilot`.
- Pill-style market index strip for Nasdaq Comp, Nasdaq 100, Dow Jones, and S&P 100 with color-coded movement badges.
- Holdings table with consistent circular stock avatars, latest price, invested amount, mini 7-day sparklines, current value, and returns.
- URL-backed stock search using the `q` query parameter.
- Suggested next steps card with contextual icons for portfolio review actions.
- Responsive sidebar, top navigation, holdings layout, and shared color tokens for brand, positive, and negative states.

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
      types/
  shared/
    components/
  styles/
```

## Notes

The current dashboard uses static sample portfolio data from `src/features/dashboard/data/portfolioData.ts`. It is ready to be connected to live portfolio, market index, or brokerage APIs when those services are available.

The Vite build uses `base: "/portfolio-pilot/"` and creates static SPA fallback files for known React Router paths so GitHub Pages can render nested pages when users open or refresh them directly. Pushes to `main` are built and published to the `gh-pages` branch by GitHub Actions.
