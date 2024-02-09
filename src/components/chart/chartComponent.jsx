import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import "./chartComponent.style.css";

const ChartComponent = ({ chartData, markerIndex, markerCoords }) => {
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
