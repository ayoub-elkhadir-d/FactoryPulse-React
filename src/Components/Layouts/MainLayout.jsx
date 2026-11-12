import Sidebar from "./Sidebar";
import Header from "./Header";
import Outlet from "react-router-dom";
import "./MAinLayot.css";
function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />

        <main className="page-content">
          
          <Outlet />
          
        </main>
      </div>
    </div>

      
    
   )

  
}

export default MainLayout;