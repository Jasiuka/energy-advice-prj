import "./main.style.css";
import MapComponent from "../../components/map/mapComponent.jsx";
import ToolbarComponent from "../../components/toolbar/toolbarComponent.jsx";
import { useEffect, useState } from "react";
import { useFetch } from "../../utils/hooks/useFetch.jsx";
import { useAtom } from "jotai";
import { markersAtom, parametersAtom } from "../../atoms.js";
const MainView = () => {
  const centerCoord = {
    latitude: 54.898521,
    longitude: 23.903597,
  };

  const [parameters] = useAtom(parametersAtom);
  const [markers] = useAtom(markersAtom);
  const { fetchData } = useFetch();
  // const [parameters, setParameters] = useState([]);
  // const [markers, setMarkers] = useState([]);

  // const getParameters = (params) => {
  //   setParameters(params);
  // };

  // const getMarkers = (markers) => {
  //   fetchData({ markers, date: ["2024-02-06", "2024-02-08"], parameters });
  //   setMarkers(markers);
  // };

  return (
    <>
      <header>
        <ToolbarComponent />
      </header>
      <main className="main">
        <MapComponent center={centerCoord} />
      </main>
    </>
  );
};

export default MainView;
