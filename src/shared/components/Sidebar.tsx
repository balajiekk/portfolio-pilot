import {
  DollarSign,
  Home,
  Landmark,
  LineChart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import balaLogo from "../../assets/bala-wealth-logo.png";

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
];

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <NavLink className="brand-lockup" to="/my-bala" aria-label="Bala Wealth home">
        <span className="brand-lockup__mark" aria-hidden="true">
          <img src={balaLogo} alt="" />
        </span>
        <span className="brand-lockup__name">Bala</span>
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
