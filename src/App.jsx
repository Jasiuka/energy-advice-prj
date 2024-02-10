import "./base.css";
import MainView from "./view/main/main.view";
import { getFromLocal, fetchMultipleMarkers } from "./utils/helper";
import {
  markersAtom,
  datesAtom,
  parametersAtom,
  jotaiStore,
  authAtom,
} from "./atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useFetch } from "./utils/hooks/useFetch";
import Spinner from "./components/spinner";
function App() {
  const { fetchData } = useFetch();
  const [parameters] = useAtom(parametersAtom);
  const [_, setAuth] = useAtom(authAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // try to login

    async function authenticate() {
      const reponse = await fetch("api/v1/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await reponse.json();
      if (reponse.status === 200 && responseData.user) {
        setAuth(responseData.user);
      }
    }

    // Get and update data if saved in local
    async function getData() {
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
    }

    const handleAllAsync = async () => {
      try {
        await Promise.all([authenticate(), getData()]);
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    };

    handleAllAsync();
  }, []);

  return <>{loading ? <Spinner /> : <MainView />}</>;
}

export default App;
