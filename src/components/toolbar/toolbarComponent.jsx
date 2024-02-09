import "./toolbar.style.css";
import ParameterToggleComponent from "./parameterToggleComponent";
import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { parametersAtom, datesAtom, markersAtom } from "../../atoms";
import { calculateDate } from "../../utils/helper";
import { createNotification } from "../../atoms";
import { isDateOlder, fetchMultipleMarkers } from "../../utils/helper";
import { useFetch } from "../../utils/hooks/useFetch";

const ToolbarComponent = () => {
  const [parameters, setParameters] = useAtom(parametersAtom);
  const [dates, setDates] = useAtom(datesAtom);
  const [markers, setMarkers] = useAtom(markersAtom);
  const { fetchData } = useFetch();

  const toggleParam = (paramName) => {
    // Get param
    const newParams = parameters.map((param) => {
      if (param.name === paramName) {
        param.show = !param.show;
      }
      return param;
    });

    setParameters(newParams);
  };

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    const dateForm = e.target;
    const start_date = dateForm.start_date.value;
    const end_date = dateForm.end_date.value;
    let error = false;
    let notificationText = "";

    const startDateOlder = isDateOlder(start_date, end_date);
    const isEndDateNewerThanMax = isDateOlder(end_date, maxDate);
    const isStartDateNewerThanMax = isDateOlder(start_date, maxDate);
    const isMinDateOlderThanEndDate = isDateOlder(minDate, end_date);
    const isMinDateOlderThanStartDate = isDateOlder(minDate, start_date);
    if (startDateOlder) {
      error = true;
      notificationText = "pradžios data negali būti senesnė už pabaigos";
    }

    if (!start_date || !end_date) {
      error = true;
      notificationText = "nėra pasirinkta pradžios arba pabaigos datos";
    }

    if (
      isEndDateNewerThanMax ||
      isStartDateNewerThanMax ||
      isMinDateOlderThanEndDate ||
      isMinDateOlderThanStartDate
    ) {
      error = true;
      notificationText =
        "pabaigos ar pradžios data viršija limitą. max: į priekį 16d nuo šiandienos, min: atgal 90d nuo šiandienos";
    }

    if (error) {
      createNotification({
        text: `Klaida, ${notificationText}`,
        type: "error",
      });
      return;
    }

    setDates([start_date, end_date]);
    // IF MARKERS EXIST, UPDATE THEIR DATA WITH NEW DATE RANGE
    if (markers.length) {
      const newMarkers = await fetchMultipleMarkers(
        markers,
        parameters,
        dates[0],
        dates[1],
        fetchData
      );
      setMarkers(newMarkers);
    }
  };
  const minDate = useMemo(() => calculateDate(-89), []); // API gives archive of past 3 months
  const maxDate = useMemo(() => calculateDate(15), []); // API gives only up to 16 days forecasts

  return (
    <nav className="nav">
      <form className="date-control_wrapper" onSubmit={handleDateSubmit}>
        <div className="date-control">
          <input type="date" name="start_date" min={minDate} max={maxDate} />
          <label>Nuo</label>
        </div>
        <div className="date-control">
          <input type="date" name="end_date" min={minDate} max={maxDate} />
          <label>Iki</label>
        </div>
        <button
          role="button"
          title="Atnaujinti datą"
          type="submit"
          className="button-update"
        >
          Atnaujinti
        </button>
      </form>
      <ul className="parameters">
        {parameters.map((param) => {
          return (
            <li key={param.name}>
              <ParameterToggleComponent
                label={param.label}
                show={param.show}
                toggleParam={toggleParam}
                paramName={param.name}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

ToolbarComponent.propTypes = {
  sendParameters: PropTypes.func,
};
export default ToolbarComponent;
