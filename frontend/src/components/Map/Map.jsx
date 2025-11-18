import { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import "./Map.css";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 40.7128,
  lng: -74.0060,
};

const mapOptions = {
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ],
  streetViewControl: false,
  mapTypeControl: true,
  fullscreenControl: true,
  zoomControl: true,
};

function Map({ signs }) {
  const [selectedSign, setSelectedSign] = useState(null);

  const getMarkerIcon = (type) => {
    if (type.includes("No Parking")) return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    if (type.includes("Metered")) return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    if (type.includes("Loading")) return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  };

  return (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
      >
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
            <div className="info-window">
              <h3 className="info-title">{selectedSign.sign_description}</h3>
              <div className="info-details">
                <div className="info-row">
                  <span className="info-label">Type:</span>
                  <span className="info-value">{selectedSign.sign_type}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Location:</span>
                  <span className="info-value">{selectedSign.location_description}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Order:</span>
                  <span className="info-value">#{selectedSign.sign_order}</span>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
