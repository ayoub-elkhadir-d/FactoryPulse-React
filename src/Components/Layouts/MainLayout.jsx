import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout({ isLoading, loadError, onRetry, pageData }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Header />
        <main className="header-content">
          {isLoading ? (
            <p className="panel loading-state" role="status">
              Chargement des machines…
            </p>
          ) : loadError ? (
            <div className="panel error-state" role="alert">
              <p>{loadError}</p>
              <button className="secondary-button" onClick={onRetry} type="button">
                Réessayer
              </button>
            </div>
          ) : (
            <Outlet context={pageData} />
          )}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;