import { NavLink } from "react-router-dom";
import { UserRound } from "lucide-react";

const navigation = [
  { to: "/", label: "Overview", end: true },
  { to: "/events", label: "Events" },
];

export default function Layout({ children }) {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <NavLink className="brand" to="/">
            <span className="brand-name">GATHER</span>
          </NavLink>
          <nav aria-label="Primary navigation">
            {navigation.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className="nav-link">
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <p className="today">{today}</p>
            <button
              className="profile-button"
              type="button"
              aria-label="Administrator profile"
            >
              <UserRound size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
}
