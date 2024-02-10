import "./main.style.css";
import MapComponent from "../../components/map/mapComponent.jsx";
import ToolbarComponent from "../../components/toolbar/toolbarComponent.jsx";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  datesAtom,
  markersAtom,
  parametersAtom,
  authAtom,
} from "../../atoms.js";
import { createChartData } from "../../utils/helper.js";
import NotificationsList from "../../components/notifications/notificationsList.jsx";
// CHART
import ChartComponent from "../../components/chart/chartComponent.jsx";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import LoginComponent from "../../components/login/loginComponent.jsx";
const MainView = () => {
  const centerCoord = {
    latitude: 54.898521,
    longitude: 23.903597,
  };
  const [loginVisible, setLoginVisible] = useState(true);
  const closeLogin = () => {
    setLoginVisible(false);
  };
  const openLogin = () => {
    setLoginVisible(true);
  };

  const [parameters] = useAtom(parametersAtom);
  const [markers] = useAtom(markersAtom);
  const [dates] = useAtom(datesAtom);
  const [user] = useAtom(authAtom);

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

  return (
    <>
      <NotificationsList />
      {user ? (
        ""
      ) : (
        <LoginComponent handleClose={closeLogin} closeVisible={loginVisible} />
      )}
      <header className="header">
        <ToolbarComponent openLogin={openLogin} />
      </header>
      <main className="main">
        <MapComponent center={centerCoord} />
        <h2 className="date-range-title">
          {dates.length > 1
            ? `Laikotarpis: ${dates[0]} - ${dates[1]}`
            : `Norėdami pridėti žymeklį, pirmiau turite pasirinkti laikotarpį`}
        </h2>
        <section className="charts">
          {markers.map((marker, index) => (
            <ChartComponent
              parameters={parameters}
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
