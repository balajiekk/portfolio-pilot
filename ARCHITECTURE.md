# Architecture

Portfolio Pilot is organized around feature folders with shared primitives for app-wide behavior.

## Folder Structure

- `src/app` owns layout and routing. Routes are lazy-loaded with `React.lazy` and wrapped in `Suspense` so new pages do not automatically inflate the initial bundle.
- `src/features` contains page-level product areas such as the US stocks dashboard, Overview (`my-bala`), IN Stocks (`bala-stocks`), F&O, funds, and explore. Feature folders can keep local components, hooks, services, and data close to the page that owns them.
- `src/shared` contains code that is intentionally reusable across feature boundaries, including navigation-adjacent components, formatters, dummy route pages, and portfolio domain types.
- `src/styles/tokens.css` is the design-token source of truth for colors, fonts, spacing, and radii. `src/styles/globals.css` consumes those tokens for layout and component styling.
- `scripts/create-spa-fallback.mjs` creates `404.html` and route-specific fallback files after the Vite build so direct GitHub Pages refreshes work for client-side routes.

## Data Boundaries

Portfolio data is accessed through `usePortfolio()` and `portfolioService`, even while the app uses local static data. That keeps components decoupled from the current data source and makes a future static-to-live API swap smaller.

Shared financial shapes live in `src/shared/types/portfolio.ts`. Feature-local type files should re-export or extend those contracts rather than redefining holdings, market indices, or portfolio snapshots.

## Deployment

The Vite app is configured with `base: "/portfolio-pilot/"` and `BrowserRouter` uses the matching `/portfolio-pilot` basename. GitHub Actions builds on every push to `main` and publishes `dist` to `gh-pages`.

## Future Extensions

- Keep API/server state separate from UI-only state. TanStack Query would be a good fit for fetched portfolio data, while a small store such as Zustand or Jotai can hold cross-route UI state if the app outgrows local state.
- Add Prettier and lint-staged when formatting churn becomes visible across contributors.
- Add an error boundary before connecting live data, then wire monitoring such as Sentry from a runtime-safe configuration path.
