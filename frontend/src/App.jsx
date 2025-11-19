import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";
import { getSignsInBounds } from "./api/supabaseClient";
import "./App.css";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [signs, setSigns] = useState([]);
  const [filteredSigns, setFilteredSigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  // Function to load signs based on map bounds
  const loadSignsInBounds = async (bounds) => {
    setLoading(true);
    try {
      const data = await getSignsInBounds(bounds, 5000);
      setSigns(data);
    } catch (error) {
      console.error("Error loading signs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial signs for NYC area
  useEffect(() => {
    const nycBounds = {
      north: 40.9176,
      south: 40.4774,
      east: -73.7004,
      west: -74.2591
    };
    loadSignsInBounds(nycBounds);
  }, []);

  useEffect(() => {
    let filtered = signs;

    // Filter by type - updated to match Supabase sign_code field
    if (filterType !== "all") {
      filtered = filtered.filter((sign) => {
        const desc = sign.sign_description?.toLowerCase() || "";
        if (filterType === "no-parking") return desc.includes("no parking");
        if (filterType === "metered") return desc.includes("metered");
        if (filterType === "loading") return desc.includes("loading");
        return !desc.includes("no parking") &&
               !desc.includes("metered") &&
               !desc.includes("loading");
      });
    }

    // Filter by search query - updated for Supabase fields
    if (searchQuery) {
      filtered = filtered.filter((sign) => {
        const desc = sign.sign_description?.toLowerCase() || "";
        const code = sign.sign_code?.toLowerCase() || "";
        const order = sign.order_number?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return desc.includes(query) || code.includes(query) || order.includes(query);
      });
    }

    setFilteredSigns(filtered);
  }, [filterType, searchQuery, signs]);

  if (!isLoaded) return <div className="loading">Loading NYC Parking Map...</div>;

  return (
    <div className="app-container">
      <Navbar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        signCount={filteredSigns.length}
      />

      <div className="main-content">
        <Sidebar
          isOpen={sidebarOpen}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterType={filterType}
          onFilterChange={setFilterType}
          totalSigns={signs.length}
        />

        <Map
          signs={filteredSigns}
          onBoundsChange={loadSignsInBounds}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
