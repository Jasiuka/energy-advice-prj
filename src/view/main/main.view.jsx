import "./main.style.css";
import MapComponent from "../../components/map/mapComponent.jsx";
import ToolbarComponent from "../../components/toolbar/toolbarComponent.jsx";
import { useEffect, useState } from "react";
import { useFetch } from "../../utils/hooks/useFetch.jsx";
import { useAtom } from "jotai";
import { datesAtom, markersAtom, parametersAtom } from "../../atoms.js";
import { createChartData, getAllDaysInRange } from "../../utils/helper.js";
import NotificationsList from "../../components/notifications/notificationsList.jsx";
// CHART
import ChartComponent from "../../components/chart/chartComponent.jsx";
import { Chart as ChartJS } from "chart.js/auto";
const MainView = () => {
  const centerCoord = {
    latitude: 54.898521,
    longitude: 23.903597,
  };

  const [parameters] = useAtom(parametersAtom);
  const [markers] = useAtom(markersAtom);
  const [dates] = useAtom(datesAtom);

  // Save data when markers and date length exist
  useEffect(() => {
    if (markers.length && dates.length) {
      const markersCopy = [...markers];
      const paramsCopy = [...parameters];
      // remove markers fetched data
      const editedMarkers = markersCopy.map((marker) => {
        return { ...marker, data: [] };
      });
      // remove unnecessary param data (save only param name if param is set to visible)
      const paramsToSave = [];
      paramsCopy.forEach((param) => {
        if (param.show) {
          paramsToSave.push(param.name);
        }
      });
      const dataToSave = {
        parameters: paramsToSave,
        markers: editedMarkers,
        date: { start_date: dates[0], end_date: dates[1] },
      };

      localStorage.setItem("savedData", JSON.stringify(dataToSave));
    }
  }, [parameters, markers, dates]);

  useEffect(() => {}, [markers]);

  return (
    <>
      <NotificationsList />
      <header className="header">
        <ToolbarComponent />
      </header>
      <main className="main">
        <MapComponent center={centerCoord} />
        <h2 className="date-range-title">
          Laikotarpis:{" "}
          {dates.length > 1 ? `${dates[0]} - ${dates[1]}` : `Nėra pasirinktas`}
        </h2>
        <section className="charts">
          {markers.map((marker, index) => (
            <ChartComponent
              key={marker.id}
              chartData={createChartData(marker.data, parameters)}
              markerIndex={index + 1}
              markerCoords={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default MainView;
