export const calculateDate = (days) => {
  // Calculates a date in the future or in the past by a given number of days.
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};
export const calculateDaysBetween = (dates) => {
  // Parse the dates and create Date objects
  const date1 = new Date(dates[0]);
  const date2 = new Date(dates[1]);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = date2.getTime() - date1.getTime();

  // Convert the difference to days
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return diffInDays;
};

export const getAllDaysInRange = (datesArr) => {
  const startDate = new Date(datesArr[0]);
  const endDate = new Date(datesArr[1]);
  const dates = [];

  while (startDate <= endDate) {
    dates.push(startDate.toISOString().slice(0, 10)); // Format the date as YYYY-MM-DD
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
};

export const ChangeDateFormat = (dateToChange) => {
  const date = new Date(`${dateToChange}`);
  const fixedDate = date.toLocaleString("lt-LT");
  return fixedDate.slice(5, -1);
};

export const createChartData = (data, parameters) => {
  const dates = [].concat(...data.hourly.time);
  const labels = dates.map((date) => ChangeDateFormat(date));
  const datasets = [];
  Object.keys(data.hourly).forEach((key, index) => {
    if (key !== "time") {
      const foundParam = parameters.find((param) => param.api_name[0] === key);
      if (foundParam.show) {
        const dataset = {
          label: convertNames[key],
          data: [].concat(...data.hourly[key]),
          borderColor: CHART_COLORS[foundParam.id - 1],
          backgroundColor: CHART_COLORS[foundParam.id - 1],
          yAxisID: `y${index + 1}`,
        };
        datasets.push(dataset);
      }
    }
  });

  const chartData = {
    labels,
    datasets,
  };

  console.log(chartData);
  return chartData;
};

export const convertNames = {
  temperature_2m: "Temperatūra (°C)",
  relative_humidity_2m: "Dregmė (%)",
  cloud_cover: "Debesuotumas (%)",
  visibility: "Matomumas (m)",
  wind_speed_10m: "Vėjo greitis (km/h)",
};

export const CHART_COLORS = [
  "rgb(255,  165,  0)", // Orange
  "rgb(0,  128,  0)", // Green
  "rgb(128,  0,  128)", // Purple
  "rgb(139,  69,  19)", // Brown
  "rgb(255,  192,  203)", // Pink
];
