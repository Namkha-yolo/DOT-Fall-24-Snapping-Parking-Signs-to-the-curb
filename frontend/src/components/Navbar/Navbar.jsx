import "./Navbar.css";

function Navbar({ onToggleSidebar, signCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1>NYC Parking Regulation Map</h1>
        <div className="navbar-stats">
          <span className="stat-badge">{signCount} Signs</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
