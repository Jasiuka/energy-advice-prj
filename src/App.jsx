import "./base.css";
import MainView from "./view/main/main.view";
import { getFromLocal, fetchMultipleMarkers } from "./utils/helper";
import { markersAtom, datesAtom, parametersAtom, jotaiStore } from "./atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useFetch } from "./utils/hooks/useFetch";
function App() {
  const { fetchData } = useFetch();
  const [parameters] = useAtom(parametersAtom);

  useEffect(() => {
    // Get and update data if saved in local

    (async function () {
      const savedData = getFromLocal("savedData");
      if (savedData) {
        const { parameters: savedParams, date, markers } = savedData;
        const newParams = [...parameters].map((param) => {
          if (!savedParams.includes(param.name)) {
            return { ...param, show: false };
          } else {
            return { ...param };
          }
        });
        const newMarkers = await fetchMultipleMarkers(
          markers,
          newParams,
          date.start_date,
          date.end_date,
          fetchData
        );
        jotaiStore.set(markersAtom, newMarkers);
        jotaiStore.set(parametersAtom, newParams);
        jotaiStore.set(datesAtom, [date.start_date, date.end_date]);
      }
    })();
  }, []);

  return (
    <>
      <MainView />
    </>
  );
}

export default App;
