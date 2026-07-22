import {
  Calendar,
  DollarSign,
  Filter,
  Home,
  Landmark,
  LineChart,
  Percent,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import BrandMark from "./BrandMark";

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

const navItems: NavItem[] = [
  { label: "Overview", icon: Home, to: "/my-bala" },
  { label: "IN Stocks", icon: Landmark, to: "/bala-stocks" },
  { label: "F&O", icon: LineChart, to: "/f-and-o" },
  { label: "Screener", icon: Filter, to: "/screener" },
  { label: "Earnings", icon: Calendar, to: "/earnings" },
  { label: "Dividends", icon: Percent, to: "/dividends" },
  {
    label: "US Stocks",
    icon: DollarSign,
    to: "/investments/us-stocks/my-us-stocks",
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <NavLink className="brand-lockup" to="/my-bala" aria-label="Wealth Pilot home">
        <span className="brand-lockup__mark">
          <BrandMark />
        </span>
        <span className="brand-lockup__name">
          <strong>Wealth</strong>
          <small>PILOT</small>
        </span>
      </NavLink>

      <nav className="side-nav">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            aria-label={label}
            className={({ isActive }) =>
              `side-nav__item${isActive ? " side-nav__item--active" : ""}`
            }
            to={to}
          >
            <span className="side-nav__icon">
              <Icon aria-hidden="true" size={30} strokeWidth={2.4} />
            </span>
            <span className="side-nav__label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
