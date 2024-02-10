import PropTypes from "prop-types";

const MenuIcon = ({ customClass }) => {
  return (
    <svg
      className={customClass}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 512 351.67"
    >
      <path
        fillRule="nonzero"
        d="M0 0h512v23.91H0V0zm0 327.76h512v23.91H0v-23.91zm0-163.88h512v23.91H0v-23.91z"
      />
    </svg>
  );
};
MenuIcon.propTypes = {
  customClass: PropTypes.string,
};
export default MenuIcon;
