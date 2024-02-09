import axios from "axios";
import { useState } from "react";
import { createNotification } from "../../atoms";
export function useFetch() {
  const api_server = axios.create({ baseURL: WEATHER_API });
  const createUrl = (coords, parameters, date) => {
    let newUrl = `forecast?latitude=${coords.lat}&longitude=${coords.lng}&hourly=`;
    const paramString = parameters.reduce((acc, param) => {
      param.api_name.forEach((name) => {
        acc += `${name},`;
      });

      return acc;
    }, "");
    return (
      newUrl +
      paramString.slice(0, -1) +
      `&start_date=${date[0]}&end_date=${date[1]}`
    );
  };

  const fetchData = async (options) => {
    try {
      const { coords, date, parameters } = options;
      const url = createUrl(coords, parameters, date);
      const response = await api_server.get(url);
      return response;
    } catch (error) {
      const errorMessage = error.response.data.reason;
      let notificationText = "";
      if (errorMessage.includes("out of allowed range")) {
        notificationText = "pabaigos data netinkama";
      }

      if (errorMessage.includes("End-date must be larger")) {
        notificationText = "pabaigos data negali būti senesnė už pradžios datą";
      }
      if (
        errorMessage.includes("Invalid date format") &&
        options.date.length < 2
      ) {
        notificationText = "nėra pasirinkto laikotarpio";
      }
      if (errorMessage.includes("Parameter 'start_date' and 'end_date'")) {
        notificationText = "nėra pasirinkta pradžios ar pabaigos data";
      }

      createNotification({
        text: `Klaida, ${notificationText}`,
        type: "error",
      });
    }
  };

  return { fetchData };
}
