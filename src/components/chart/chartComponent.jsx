import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import "./chartComponent.style.css";
import { useEffect, useState } from "react";

const ChartComponent = ({ chartData, markerIndex, markerCoords }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
          scales: {},
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
};
export default ChartComponent;
