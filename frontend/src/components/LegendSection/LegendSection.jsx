import "./LegendSection.css";

function LegendSection() {
  return (
    <div className="legend-section">
      <h3>Map Legend</h3>
      <div className="legend-items">
        <div className="legend-item">
          <span className="dot red"></span>
          <span>No Parking Zone</span>
        </div>
        <div className="legend-item">
          <span className="dot blue"></span>
          <span>Metered Parking</span>
        </div>
        <div className="legend-item">
          <span className="dot yellow"></span>
          <span>Loading Zone</span>
        </div>
        <div className="legend-item">
          <span className="dot green"></span>
          <span>Other / Free Parking</span>
        </div>
      </div>
    </div>
  );
}

export default LegendSection;
