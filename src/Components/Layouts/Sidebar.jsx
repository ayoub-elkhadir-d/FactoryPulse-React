import { NavLink } from "react-router-dom";
import "./Sidebar.css"
function Sidebar() {

  return (
    <aside className="sidebar">
      <h2> FactoryPulse  </h2>
      <nav>
        <NavLink to="/">
          Dashboard
        </NavLink>
        <NavLink to="/machines">
          Machines
        </NavLink>
     
      </nav>


    </aside>
    
  );
  
}

export default Sidebar();