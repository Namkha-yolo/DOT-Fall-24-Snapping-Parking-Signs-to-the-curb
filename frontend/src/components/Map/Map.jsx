import { useState, useCallback, useRef } from "react";
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

function Map({ signs, onBoundsChange }) {
  const [selectedSign, setSelectedSign] = useState(null);
  const mapRef = useRef(null);

  // Get marker color based on sign description
  const getMarkerIcon = (description = "") => {
    const desc = description.toLowerCase();
    if (desc.includes("no parking") || desc.includes("no standing")) {
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
    if (desc.includes("metered")) {
      return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }
    if (desc.includes("loading")) {
      return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    }
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  };

  // Handle map idle (after panning or zooming)
  const onIdle = useCallback(() => {
    if (mapRef.current && onBoundsChange) {
      const map = mapRef.current;
      const bounds = map.getBounds();
      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        onBoundsChange({
          north: ne.lat(),
          south: sw.lat(),
          east: ne.lng(),
          west: sw.lng()
        });
      }
    }
  }, [onBoundsChange]);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
        onLoad={onLoad}
        onIdle={onIdle}
      >
        {signs.map((sign) => (
          <Marker
            key={sign.id}
            position={{ lat: sign.latitude, lng: sign.longitude }}
            icon={getMarkerIcon(sign.sign_description)}
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
                  <span className="info-label">Code:</span>
                  <span className="info-value">{selectedSign.sign_code}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Order:</span>
                  <span className="info-value">{selectedSign.order_number}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Side:</span>
                  <span className="info-value">{selectedSign.side_of_street}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Type:</span>
                  <span className="info-value">{selectedSign.order_type}</span>
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
