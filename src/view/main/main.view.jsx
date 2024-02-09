import "./main.style.css";
import MapComponent from "../../components/map/mapComponent.jsx";
import ToolbarComponent from "../../components/toolbar/toolbarComponent.jsx";
import { useEffect, useState } from "react";
import { useFetch } from "../../utils/hooks/useFetch.jsx";
import { useAtom } from "jotai";
import { datesAtom, markersAtom, parametersAtom } from "../../atoms.js";
import { createChartData, getAllDaysInRange } from "../../utils/helper.js";
// CHART
import ChartComponent from "../../components/chart/chartComponent.jsx";
import { Chart as ChartJS } from "chart.js/auto";
const MainView = () => {
  const centerCoord = {
    latitude: 54.898521,
    longitude: 23.903597,
  };
  const [dateRange, setDateRange] = useState(0);

  useEffect(() => {});

  const [parameters] = useAtom(parametersAtom);
  const [markers] = useAtom(markersAtom);
  const [dates] = useAtom(datesAtom);
  const { fetchData } = useFetch();

  return (
    <>
      <header>
        <ToolbarComponent />
      </header>
      <main className="main">
        <MapComponent center={centerCoord} />
        <h2>
          Laikotarpis{" "}
          {dates.length > 1 ? `${dates[0]} - ${dates[1]}` : `Nėra pasirinkta`}
        </h2>
        {markers.map((marker, index) => (
          <ChartComponent
            key={marker.id}
            chartData={createChartData(marker.data, parameters)}
            markerIndex={index + 1}
            markerCoords={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </main>
    </>
  );
};

export default MainView;
