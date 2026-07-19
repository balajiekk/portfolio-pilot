import {
  DollarSign,
  Home,
  Landmark,
  LineChart,
  PieChart,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: "My IND", icon: Home },
  { label: "INDstocks", icon: Landmark },
  { label: "F&O", icon: LineChart },
  { label: "US Stocks", icon: DollarSign, active: true },
  { label: "Funds", icon: PieChart },
];

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand-lockup" aria-label="INDmoney">
        <TrendingUp aria-hidden="true" size={34} strokeWidth={3} />
        <span>IND</span>
        <small>money</small>
      </div>

      <nav className="side-nav">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`side-nav__item${active ? " side-nav__item--active" : ""}`}
            type="button"
          >
            <span className="side-nav__icon">
              <Icon aria-hidden="true" size={30} strokeWidth={2.4} />
            </span>
            <span className="side-nav__label">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
