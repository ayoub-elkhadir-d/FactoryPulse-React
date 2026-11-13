function Header() {
  return (
    <header className="header">
      <div className="breadcrumb">
        FactoryPulse <span aria-hidden="true">/</span> Production
      </div>
      <div className="header-user">
        <span className="user-avatar" aria-hidden="true">AY</span>
        <span>Ayoub Elkhadir</span>
      </div>
    </header>
  );
}

export default Header;