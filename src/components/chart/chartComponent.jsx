import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import "./chartComponent.style.css";
import { useEffect, useState } from "react";
import { CHART_COLORS } from "../../utils/helper";

const ChartComponent = ({
  chartData,
  markerIndex,
  markerCoords,
  parameters,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleParams, setVisibleParams] = useState({
    temperature: true,
    humidity: true,
    visibility: true,
    cloud_cover: true,
    wind: true,
  });

  useEffect(() => {
    const changedParams = parameters.reduce((acc, param) => {
      if (param.show) {
        acc[param.name] = true;
      } else {
        acc[param.name] = false;
      }
      return acc;
    }, {});
    setVisibleParams(changedParams);
  }, [parameters]);

  useEffect(() => {
    const handleWindowChange = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowChange);

    return () => {
      window.removeEventListener("resize", handleWindowChange);
    };
  });

  return (
    <div className="chart-container">
      <h3>
        <span>{`( ${markerIndex} )  `}</span>
        {`| LAT:${markerCoords.lat.toFixed(4)}, LNG:${markerCoords.lng.toFixed(
          4
        )}`}
      </h3>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: windowWidth < 800 ? false : true,
          scales: {
            y1: {
              display: visibleParams.temperature || false,
              ticks: {
                color: CHART_COLORS[0],
              },
            },
            y2: {
              display: visibleParams.humidity || false,
              ticks: {
                color: CHART_COLORS[1],
              },
            },
            y3: {
              display: visibleParams.cloud_cover || false,
              ticks: {
                color: CHART_COLORS[2],
              },
            },
            y4: {
              display: visibleParams.visibility || false,
              ticks: {
                color: CHART_COLORS[3],
              },
            },
            y5: {
              display: visibleParams.wind || false,
              ticks: {
                color: CHART_COLORS[4],
              },
            },
          },
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: true,
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

ChartComponent.propTypes = {
  chartData: PropTypes.object,
  chartTitle: PropTypes.string,
  markerIndex: PropTypes.number,
  markerCoords: PropTypes.object,
  parameters: PropTypes.array,
};
export default ChartComponent;
