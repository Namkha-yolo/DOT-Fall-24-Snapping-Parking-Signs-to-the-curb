import { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import "./App.css";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 40.7128,
  lng: -74.0060,
};

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [signs, setSigns] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null);

  useEffect(() => {
    fetch("/data/parking_signs_sample.json")
      .then((res) => res.json())
      .then((data) => setSigns(data));
  }, []);

  const getMarkerIcon = (type) => {
    if (type.includes("No Parking")) return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    if (type.includes("Metered")) return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    if (type.includes("Loading")) return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  };

  if (!isLoaded) return <div className="loading">Loading NYC Parking Map...</div>;

  return (
    <div>
      <nav className="navbar">
        <h1>NYC Parking Regulation Map</h1>
      </nav>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {signs.map((sign, index) => (
          <Marker
            key={index}
            position={{ lat: sign.latitude, lng: sign.longitude }}
            icon={getMarkerIcon(sign.sign_type)}
            onClick={() => setSelectedSign(sign)}
          />
        ))}

        {selectedSign && (
          <InfoWindow
            position={{ lat: selectedSign.latitude, lng: selectedSign.longitude }}
            onCloseClick={() => setSelectedSign(null)}
          >
            <div>
              <h4>{selectedSign.sign_description}</h4>
              <p><strong>Type:</strong> {selectedSign.sign_type}</p>
              <p><strong>Location:</strong> {selectedSign.location_description}</p>
              <p><strong>Order:</strong> {selectedSign.sign_order}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <div className="legend">
        <p><span className="dot red"></span> No Parking</p>
        <p><span className="dot blue"></span> Metered Parking</p>
        <p><span className="dot yellow"></span> Loading Zone</p>
        <p><span className="dot green"></span> Other / Free Parking</p>
      </div>
    </div>
  );
}

export default App;
