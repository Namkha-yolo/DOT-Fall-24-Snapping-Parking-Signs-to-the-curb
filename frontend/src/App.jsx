import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";
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

  useEffect(() => {
    fetch("/data/parking_signs_sample.json")
      .then((res) => res.json())
      .then((data) => {
        setSigns(data);
        setFilteredSigns(data);
      });
  }, []);

  useEffect(() => {
    let filtered = signs;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((sign) => {
        if (filterType === "no-parking") return sign.sign_type.includes("No Parking");
        if (filterType === "metered") return sign.sign_type.includes("Metered");
        if (filterType === "loading") return sign.sign_type.includes("Loading");
        return !sign.sign_type.includes("No Parking") &&
               !sign.sign_type.includes("Metered") &&
               !sign.sign_type.includes("Loading");
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((sign) =>
        sign.location_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.sign_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.sign_type.toLowerCase().includes(searchQuery.toLowerCase())
      );
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

        <Map signs={filteredSigns} />
      </div>
    </div>
  );
}

export default App;
