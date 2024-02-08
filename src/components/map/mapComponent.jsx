import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Marker,
  Popup,
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
        id: new Date().toISOString(),
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
  const mapRef = useRef(null);
  // const [markers, setMarkers] = useState([]);

  const addNewMarker = async (coords) => {
    setMarkers([
      ...markers,
      { lat: coords.lat, lng: coords.lng, id: coords.id },
    ]);
    const apiResponse = await fetchData({
      parameters,
      coords,
      date,
    });
    console.log(apiResponse);
  };

  const removeMarker = (id) => {
    const newMarkers = markers.filter((marker) => marker.id !== id);
    setMarkers(newMarkers);
  };

  return (
    <MapContainer
      center={[center.latitude, center.longitude]}
      zoom={10}
      ref={mapRef}
      style={{ height: "30dvh", width: "100dvw" }}
    >
      <MapEvent addNewMarker={addNewMarker} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            bubblingMouseEvents={false}
          >
            <Popup>
              <button
                role="button"
                title="Panaikinti"
                className="remove-marker"
                onClick={() => removeMarker(marker.id)}
              >
                Panaikinti žymeklį
              </button>
            </Popup>
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
