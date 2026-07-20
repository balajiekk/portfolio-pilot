# Portfolio Pilot

Portfolio Pilot is a React dashboard prototype inspired by the IndMoney US stocks experience. It focuses on a holdings-first view with market index movement, section tabs, portfolio navigation, searchable holdings, and responsive layouts for desktop and mobile screens.

## Features

- IndMoney-style US stocks dashboard at `/investments/us-stocks/my-us-stocks`.
- GitHub Pages-ready routing for direct nested URLs under `/portfolio-pilot`.
- Market index strip for Nasdaq Comp, Nasdaq 100, Dow Jones, and S&P 100.
- Holdings table with company identity, latest price, invested amount, current value, and returns.
- URL-backed stock search using the `q` query parameter.
- Responsive sidebar, top navigation, and holdings layout.

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

The Vite build uses `base: "/portfolio-pilot/"` and creates a `dist/404.html` fallback so GitHub Pages can render React Router pages when users open or refresh nested routes directly. Pushes to `main` are built and published to the `gh-pages` branch by GitHub Actions.
