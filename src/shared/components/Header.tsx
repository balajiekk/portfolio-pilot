import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { ChevronDown, Clock3, ReceiptText, Search, WalletCards, X } from "lucide-react";
import { usePortfolio } from "../../features/dashboard/hooks/usePortfolio";
import BrandMark from "./BrandMark";

const usStocksPath = "/investments/us-stocks/my-us-stocks";

interface HeaderTab {
  label: string;
  to: string;
}

const tabs: HeaderTab[] = [
  { label: "My US Stocks", to: usStocksPath },
  { label: "Explore", to: "/explore" },
  { label: "Watchlist", to: "/watchlist" },
];

const historyLinks = [
  { label: "Orders", detail: "Recent buy and sell activity", to: "/orders", icon: ReceiptText },
  {
    label: "Wallet History",
    detail: "Deposits, withdrawals, and cash flow",
    to: "/wallet-history",
    icon: WalletCards,
  },
];

export default function Header() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [draftQuery, setDraftQuery] = useState(query);
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(query));
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const historyMenuRef = useRef<HTMLDivElement | null>(null);
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
    setIsSearchOpen(Boolean(query));
  }, [query]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      commitQuery(draftQuery, true);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [commitQuery, draftQuery]);

  useEffect(() => {
    if (!isHistoryOpen) {
      return undefined;
    }

    function closeOnOutsideClick(event: MouseEvent) {
      const target = event.target;

      if (target instanceof Node && !historyMenuRef.current?.contains(target)) {
        setIsHistoryOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsHistoryOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isHistoryOpen]);

  function updateQuery(event: ChangeEvent<HTMLInputElement>) {
    setDraftQuery(event.target.value);
  }

  function clearQuery() {
    setDraftQuery("");
    setIsSearchOpen(false);
    commitQuery("");
  }

  function submitQuery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    commitQuery(draftQuery);
  }

  function selectSuggestion(ticker: string) {
    setDraftQuery(ticker);
    setIsSearchOpen(true);
    setIsSearchFocused(false);
    commitQuery(ticker);
  }

  function isTabActive(label: string, isActive: boolean) {
    return isActive || (label === "My US Stocks" && location.pathname === "/");
  }

  const isHistoryActive = historyLinks.some((link) => link.to === location.pathname);

  return (
    <header className="topbar">
      <NavLink className="topbar-brand" to="/my-bala" aria-label="Wealth Pilot home">
        <span className="topbar-brand__mark">
          <BrandMark />
        </span>
        <span className="topbar-brand__copy">
          <strong>Wealth Pilot</strong>
          <small>PORTFOLIO, REFINED</small>
        </span>
      </NavLink>

      <div className="topbar__tabs" aria-label="US stocks sections">
        {tabs.map((tab) => {
          const to = tab.to;

          return (
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
          );
        })}
      </div>

      <div className="topbar-actions">
        <div className="history-menu" ref={historyMenuRef}>
          <button
            aria-expanded={isHistoryOpen}
            aria-haspopup="menu"
            aria-label="Open activity history menu"
            className={`history-menu__trigger${
              isHistoryOpen || isHistoryActive ? " history-menu__trigger--active" : ""
            }`}
            type="button"
            onClick={() => setIsHistoryOpen((current) => !current)}
          >
            <Clock3 aria-hidden="true" size={21} strokeWidth={2.4} />
            <ChevronDown aria-hidden="true" size={16} strokeWidth={2.6} />
          </button>

          {isHistoryOpen ? (
            <div className="history-menu__panel" role="menu" aria-label="Activity history">
              {historyLinks.map(({ label, detail, to, icon: Icon }) => (
                <NavLink
                  key={label}
                  className="history-menu__item"
                  role="menuitem"
                  to={to}
                  onClick={() => setIsHistoryOpen(false)}
                >
                  <span className="history-menu__item-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={2.4} />
                  </span>
                  <span>
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </span>
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>

        <form
          className={`search-field${isSearchOpen ? " search-field--open" : ""}`}
          role="search"
          onSubmit={submitQuery}
        >
          <button
            aria-label="Search stocks"
            className="search-field__trigger"
            type="button"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search aria-hidden="true" size={24} strokeWidth={2.4} />
          </button>
          <input
            aria-label="Search stocks"
            type="search"
            placeholder="Search"
            value={draftQuery}
            onChange={updateQuery}
            onFocus={() => {
              setIsSearchOpen(true);
              setIsSearchFocused(true);
            }}
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

        <NavLink className="profile-chip" to="/my-bala" aria-label="Open Wealth Pilot profile">
          W
        </NavLink>
      </div>
    </header>
  );
}
