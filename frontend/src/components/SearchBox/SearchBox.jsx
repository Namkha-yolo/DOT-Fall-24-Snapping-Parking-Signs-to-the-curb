import "./SearchBox.css";

function SearchBox({ searchQuery, onSearchChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search location, sign type..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <button className="clear-search" onClick={() => onSearchChange("")}>
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBox;
