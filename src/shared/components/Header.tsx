import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";

const tabs = ["Explore", "My US Stocks", "Orders", "Watchlist", "Wallet History"];

export default function Header() {
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

  return (
    <header className="topbar">
      <div className="topbar__tabs" aria-label="US stocks sections">
        {tabs.map((tab) => (
          <button
            key={tab}
            aria-current={tab === "My US Stocks" ? "page" : undefined}
            className={`topbar__tab${tab === "My US Stocks" ? " topbar__tab--active" : ""}`}
            type="button"
          >
            {tab}
          </button>
        ))}
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
