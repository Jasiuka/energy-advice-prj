import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import "./mapComponent.style.css";
import { parametersAtom, markersAtom, datesAtom } from "../../atoms";
import { useAtom } from "jotai";
import { useFetch } from "../../utils/hooks/useFetch";

const MapEvent = ({ addNewMarker }) => {
  useMapEvent("click", (e) => {
    const target = e.originalEvent.target;
    if (target.tagName !== "BUTTON") {
      const coords = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        id: Date.now() + Math.random(),
      };

      addNewMarker(coords);
    }
  });
};

const MapComponent = ({ center }) => {
  const [parameters] = useAtom(parametersAtom);
  const [markers, setMarkers] = useAtom(markersAtom);
  const [date] = useAtom(datesAtom);
  const { fetchData } = useFetch();

  const addNewMarker = async (coords) => {
    const apiResponse = await fetchData({
      parameters,
      coords,
      date,
    });
    const marker = { lat: coords.lat, lng: coords.lng, id: coords.id };
    if (apiResponse.status === 200) {
      // If date is chosen, set weather data to that marker
      if (date.length) {
        marker.data = apiResponse.data;
      } else {
        marker.data = null;
      }
    }

    setMarkers([...markers, marker]);
  };

  const removeMarker = (id) => {
    const newMarkers = markers.filter((marker) => marker.id !== id);
    setMarkers(newMarkers);
  };

  return (
    <MapContainer
      center={[center.latitude, center.longitude]}
      zoom={10}
      style={{ height: "30dvh", width: "100dvw" }}
    >
      <MapEvent addNewMarker={addNewMarker} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => {
        return (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            bubblingMouseEvents={false}
          >
            <Popup>
              <div className="popup-content">
                <span>
                  {marker.lat.toFixed(4)} {marker.lng.toFixed(4)}
                </span>
                <button
                  role="button"
                  title="Panaikinti"
                  className="remove-marker"
                  onClick={() => removeMarker(marker.id)}
                >
                  Panaikinti žymeklį
                </button>
              </div>
            </Popup>
            <Tooltip permanent={true} direction="bottom">
              <h4>{index + 1}</h4>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

MapComponent.propTypes = {
  center: PropTypes.object,
  sendMarkers: PropTypes.func,
};
export default MapComponent;
