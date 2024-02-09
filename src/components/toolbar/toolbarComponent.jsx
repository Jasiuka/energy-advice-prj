import "./toolbar.style.css";
import ParameterToggleComponent from "./parameterToggleComponent";
import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { parametersAtom, datesAtom } from "../../atoms";
import { calculateDate } from "../../utils/helper";

const ToolbarComponent = () => {
  const [parameters, setParameters] = useAtom(parametersAtom);
  const [dates, setDates] = useAtom(datesAtom);

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

  const handleDateSubmit = (e) => {
    e.preventDefault();
    const dateForm = e.target;
    setDates([dateForm.start_date.value, dateForm.end_date.value]);
  };
  const minDate = useMemo(() => calculateDate(-89), []);
  const maxDate = useMemo(() => calculateDate(16), []);

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
