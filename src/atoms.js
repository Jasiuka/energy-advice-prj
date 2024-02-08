import { atom } from "jotai";

export const parametersAtom = atom([
  {
    show: true,
    label: "Temperatūra",
    name: "temperature",
    api_name: ["temperature_2m_max", "temperature_2m_min"],
  },
  {
    show: true,
    label: "Vėjo greitis",
    name: "wind",
    api_name: ["wind_speed_10m_max"],
  },
  {
    show: true,
    label: "Krituliai",
    name: "precipitation",
    api_name: ["precipitation_sum"],
  },
  {
    show: true,
    label: "Saulėlydis",
    name: "sunset",
    api_name: ["sunset"],
  },
  {
    show: true,
    label: "Saulėtekis",
    name: "sunrise",
    api_name: ["sunrise"],
  },
  {
    show: true,
    label: "Dienos ilgumas",
    name: "daylight",
    api_name: ["daylight_duration"],
  },
  {
    show: true,
    label: "Oro apibūdinimas",
    name: "weather",
    api_name: ["weather_code"],
  },
]);
export const markersAtom = atom([]);
export const datesAtom = atom([]);
