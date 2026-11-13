import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="sidebar-brand" to="/">
        <span className="brand-mark" aria-hidden="true">F</span>
        <span>FactoryPulse</span>
      </NavLink>
      <p className="sidebar-label">Espace de travail</p>
      <nav>
        <NavLink end to="/">
          <span className="sidebar-icon" aria-hidden="true">⌂</span>
          Tableau de bord
        </NavLink>
        <NavLink to="/machines">
          <span className="sidebar-icon" aria-hidden="true">▤</span>
          Machines
        </NavLink>
      </nav>
      <div className="sidebar-user">
        <span className="user-avatar" aria-hidden="true">AY</span>
        <div>
          <strong>Ayoub Elkhadir</strong>
          <span>Responsable</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;