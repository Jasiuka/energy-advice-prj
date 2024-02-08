import PropTypes from "prop-types";
const ParameterToggleComponent = ({ label, show, toggleParam, paramName }) => {
  return (
    <div className="parameter-control">
      <input
        className="control-input"
        onChange={() => toggleParam(paramName)}
        type="checkbox"
        checked={show}
        name={paramName}
        id={paramName}
      />
      <label htmlFor={paramName}>
        <span className="param-label">{label}</span>
        <div className="toggle-wrapper">
          <div title={show ? "Išjungti" : "Įjungti"} className="circle"></div>
        </div>
      </label>
    </div>
  );
};

ParameterToggleComponent.propTypes = {
  label: PropTypes.string,
  show: PropTypes.bool,
  toggleParam: PropTypes.func,
  paramName: PropTypes.string,
};
export default ParameterToggleComponent;
