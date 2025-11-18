import SearchBox from "../SearchBox/SearchBox";
import FilterSection from "../FilterSection/FilterSection";
import LegendSection from "../LegendSection/LegendSection";
import "./Sidebar.css";

function Sidebar({ isOpen, searchQuery, onSearchChange, filterType, onFilterChange, totalSigns }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2>Filters & Search</h2>
      </div>

      <SearchBox searchQuery={searchQuery} onSearchChange={onSearchChange} />

      <FilterSection
        filterType={filterType}
        onFilterChange={onFilterChange}
        totalSigns={totalSigns}
      />

      <LegendSection />
    </aside>
  );
}

export default Sidebar;
