import "./FilterSection.css";

function FilterSection({ filterType, onFilterChange, totalSigns }) {
  return (
    <div className="filter-section">
      <h3>Sign Type</h3>
      <div className="filter-options">
        <label className={`filter-option ${filterType === "all" ? "active" : ""}`}>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filterType === "all"}
            onChange={(e) => onFilterChange(e.target.value)}
          />
          <span className="filter-label">All Signs</span>
          <span className="filter-count">{totalSigns}</span>
        </label>

        <label className={`filter-option ${filterType === "no-parking" ? "active" : ""}`}>
          <input
            type="radio"
            name="filter"
            value="no-parking"
            checked={filterType === "no-parking"}
            onChange={(e) => onFilterChange(e.target.value)}
          />
          <span className="dot red"></span>
          <span className="filter-label">No Parking</span>
        </label>

        <label className={`filter-option ${filterType === "metered" ? "active" : ""}`}>
          <input
            type="radio"
            name="filter"
            value="metered"
            checked={filterType === "metered"}
            onChange={(e) => onFilterChange(e.target.value)}
          />
          <span className="dot blue"></span>
          <span className="filter-label">Metered Parking</span>
        </label>

        <label className={`filter-option ${filterType === "loading" ? "active" : ""}`}>
          <input
            type="radio"
            name="filter"
            value="loading"
            checked={filterType === "loading"}
            onChange={(e) => onFilterChange(e.target.value)}
          />
          <span className="dot yellow"></span>
          <span className="filter-label">Loading Zone</span>
        </label>

        <label className={`filter-option ${filterType === "other" ? "active" : ""}`}>
          <input
            type="radio"
            name="filter"
            value="other"
            checked={filterType === "other"}
            onChange={(e) => onFilterChange(e.target.value)}
          />
          <span className="dot green"></span>
          <span className="filter-label">Other / Free</span>
        </label>
      </div>
    </div>
  );
}

export default FilterSection;
