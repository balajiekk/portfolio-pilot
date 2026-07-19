import type { ChangeEvent } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";

const usStocksPath = "/investments/us-stocks/my-us-stocks";

const tabs = [
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

  function updateQuery(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    if (nextQuery) {
      nextParams.set("q", nextQuery);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams);
  }

  function clearQuery() {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("q");
    setSearchParams(nextParams);
  }

  function isTabActive(label: string, isActive: boolean) {
    return isActive || (label === "My US Stocks" && location.pathname === "/");
  }

  return (
    <header className="topbar">
      <div className="topbar__tabs" aria-label="US stocks sections">
        {tabs.map((tab) =>
          "to" in tab ? (
            <NavLink
              key={tab.label}
              aria-label={tab.label}
              className={({ isActive }) =>
                `topbar__tab${isTabActive(tab.label, isActive) ? " topbar__tab--active" : ""}`
              }
              to={tab.to}
            >
              {tab.label}
            </NavLink>
          ) : (
            <button key={tab.label} className="topbar__tab" type="button">
              {tab.label}
            </button>
          ),
        )}
      </div>

      <div className="search-field" role="search">
        <Search aria-hidden="true" size={22} strokeWidth={2} />
        <input
          aria-label="Search stocks"
          type="search"
          placeholder="Search"
          value={query}
          onChange={updateQuery}
        />
        {query ? (
          <button
            aria-label="Clear search"
            className="search-field__clear"
            type="button"
            onClick={clearQuery}
          >
            <X aria-hidden="true" size={18} strokeWidth={2.4} />
          </button>
        ) : null}
      </div>
    </header>
  );
}
