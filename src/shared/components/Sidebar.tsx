import {
  DollarSign,
  Home,
  Landmark,
  LineChart,
  PieChart,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

const navItems: NavItem[] = [
  { label: "My Bala", icon: Home, to: "/my-bala" },
  { label: "BalaStocks", icon: Landmark, to: "/bala-stocks" },
  { label: "F&O", icon: LineChart, to: "/f-and-o" },
  {
    label: "US Stocks",
    icon: DollarSign,
    to: "/investments/us-stocks/my-us-stocks",
  },
  { label: "Funds", icon: PieChart, to: "/funds" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <NavLink className="brand-lockup" to="/" aria-label="Bala Money home">
        <TrendingUp aria-hidden="true" size={34} strokeWidth={3} />
        <span>Bala</span>
        <small>money</small>
      </NavLink>

      <nav className="side-nav">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
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
