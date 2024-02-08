import axios from "axios";
import { useState } from "react";
export function useFetch() {
  const api_server = axios.create({ baseURL: WEATHER_API });
  const createUrl = (coords, parameters, date) => {
    let newUrl = `forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=`;
    const paramString = parameters.reduce((acc, param) => {
      if (param.show) {
        param.api_name.forEach((name) => {
          acc += `${name},`;
        });
      }
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
      throw Error("Something went wrong");
    }
  };

  return { fetchData };
}
