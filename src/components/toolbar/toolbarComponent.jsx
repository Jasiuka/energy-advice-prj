import "./toolbar.style.css";
import ParameterToggleComponent from "./parameterToggleComponent";
import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { parametersAtom, datesAtom, markersAtom, authAtom } from "../../atoms";
import { calculateDate } from "../../utils/helper";
import { createNotification } from "../../atoms";
import { isDateOlder, fetchMultipleMarkers } from "../../utils/helper";
import { useFetch } from "../../utils/hooks/useFetch";
import MenuIcon from "../icons/menu.icon";
import CloseIcon from "../icons/close.icon";
import CustomButton from "../customButton";

const ToolbarComponent = ({ user }) => {
  const [parameters, setParameters] = useAtom(parametersAtom);
  const [dates, setDates] = useAtom(datesAtom);
  const [markers, setMarkers] = useAtom(markersAtom);
  const [_, setAuth] = useAtom(authAtom);
  const [menuVisible, setMenuVisible] = useState(false);
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

  const handleMenuToggle = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    await fetch("api/v1/logout", { method: "GET" });
    setAuth(null);
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
          <input
            type="date"
            name="start_date"
            min={minDate}
            max={maxDate}
            id="start_date"
          />
          <label htmlFor="start_date">Nuo</label>
        </div>
        <div className="date-control">
          <input
            type="date"
            name="end_date"
            min={minDate}
            max={maxDate}
            id="end_date"
          />
          <label htmlFor="end_date">Iki</label>
        </div>
        <CustomButton
          role="button"
          title="Atnaujinti datą"
          type="submit"
          customClass="button-update"
          text={"Atnaujinti"}
        />
      </form>{" "}
      <CustomButton
        customClass={"mobile-button"}
        handleClick={handleMenuToggle}
        title={menuVisible ? "Uždaryti meniu" : "Atidaryti meniu"}
        text={
          !menuVisible ? (
            <MenuIcon customClass={"menu-icon"} />
          ) : (
            <CloseIcon customClass={"menu-icon"} />
          )
        }
      />
      <ul
        className={`parameters navigation-list ${menuVisible ? "" : "hidden"}`}
      >
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
        {user ? (
          ""
        ) : (
          <li className="button-logout__wrapper">
            <CustomButton
              role="button"
              title="Atsijungti"
              customClass={"button-logout"}
              text={"Atsijungti"}
              handleClick={handleLogout}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

ToolbarComponent.propTypes = {
  user: PropTypes.object,
};
export default ToolbarComponent;
