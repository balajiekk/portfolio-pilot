import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { usePortfolio } from "../../features/dashboard/hooks/usePortfolio";

const usStocksPath = "/investments/us-stocks/my-us-stocks";

type HeaderTab =
  | { label: string; to: string }
  | { label: string; to?: never };

const tabs: HeaderTab[] = [
  { label: "Explore", to: "/explore" },
  { label: "My US Stocks", to: usStocksPath },
  { label: "Orders" },
  { label: "Watchlist" },
  { label: "Wallet History" },
];

export default function Header() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [draftQuery, setDraftQuery] = useState(query);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { data } = usePortfolio();
  const suggestions = useMemo(() => {
    const normalizedQuery = draftQuery.trim().toLowerCase();

    if (!normalizedQuery || !data) {
      return [];
    }

    return data.holdings
      .filter((holding) => {
        const companyName = holding.companyName.toLowerCase();
        const ticker = holding.ticker.toLowerCase();

        return companyName.includes(normalizedQuery) || ticker.includes(normalizedQuery);
      })
      .slice(0, 5);
  }, [data, draftQuery]);
  const showSuggestions = isSearchFocused && suggestions.length > 0;

  const commitQuery = useCallback((nextQuery: string, replace = false) => {
    const nextParams = new URLSearchParams(searchParams);
    const normalizedQuery = nextQuery.trim();

    if (normalizedQuery) {
      nextParams.set("q", normalizedQuery);
    } else {
      nextParams.delete("q");
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    setDraftQuery(query);
  }, [query]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      commitQuery(draftQuery, true);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [commitQuery, draftQuery]);

  function updateQuery(event: ChangeEvent<HTMLInputElement>) {
    setDraftQuery(event.target.value);
  }

  function clearQuery() {
    setDraftQuery("");
    commitQuery("");
  }

  function submitQuery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    commitQuery(draftQuery);
  }

  function selectSuggestion(ticker: string) {
    setDraftQuery(ticker);
    setIsSearchFocused(false);
    commitQuery(ticker);
  }

  function isTabActive(label: string, isActive: boolean) {
    return isActive || (label === "My US Stocks" && location.pathname === "/");
  }

  return (
    <header className="topbar">
      <div className="topbar__tabs" aria-label="US stocks sections">
        {tabs.map((tab) => {
          const to = tab.to;

          return to ? (
            <NavLink
              key={tab.label}
              aria-label={tab.label}
              className={({ isActive }) =>
                `topbar__tab${isTabActive(tab.label, isActive) ? " topbar__tab--active" : ""}`
              }
              to={to}
            >
              {tab.label}
            </NavLink>
          ) : (
            <button key={tab.label} className="topbar__tab" type="button">
              {tab.label}
            </button>
          );
        })}
      </div>

      <form className="search-field" role="search" onSubmit={submitQuery}>
        <Search aria-hidden="true" size={22} strokeWidth={2} />
        <input
          aria-label="Search stocks"
          type="search"
          placeholder="Search"
          value={draftQuery}
          onChange={updateQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 120)}
        />
        {draftQuery ? (
          <button
            aria-label="Clear search"
            className="search-field__clear"
            type="button"
            onClick={clearQuery}
          >
            <X aria-hidden="true" size={18} strokeWidth={2.4} />
          </button>
        ) : null}

        {showSuggestions ? (
          <div className="search-suggestions" role="listbox" aria-label="Stock suggestions">
            {suggestions.map((holding) => (
              <button
                key={holding.id}
                className="search-suggestions__item"
                type="button"
                role="option"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectSuggestion(holding.ticker)}
              >
                <span>{holding.ticker}</span>
                <small>{holding.companyName}</small>
              </button>
            ))}
          </div>
        ) : null}
      </form>
    </header>
  );
}
