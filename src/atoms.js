import { atom } from "jotai";

export const parametersAtom = atom([
  {
    show: true,
    label: "Temperatūra",
    name: "temperature",
    api_name: ["temperature_2m"],
    id: 1,
  },
  {
    show: true,
    label: "Dregmė",
    name: "humidity",
    api_name: ["relative_humidity_2m"],
    id: 2,
  },
  {
    show: true,
    label: "Debesuotumas",
    name: "cloud_cover",
    api_name: ["cloud_cover"],
    id: 3,
  },
  {
    show: true,
    label: "Matomumas",
    name: "visibility",
    api_name: ["visibility"],
    id: 4,
  },
  {
    show: true,
    label: "Vėjo greitis",
    name: "wind",
    api_name: ["wind_speed_10m"],
    id: 5,
  },
]);
export const markersAtom = atom([]);
export const datesAtom = atom([]);
