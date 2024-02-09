import PropTypes from "prop-types";

const MenuIcon = ({ customClass }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 96.91"
      enableBackground={"new 0 0 122.88 96.91"}
      xmlSpace="preserve"
      className={customClass}
    >
      <g>
        <path
          className="st0"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M122.88,0v20.05H33.2V0H122.88L122.88,0z M21.13,76.86v20.05H0V76.86H21.13L21.13,76.86z M21.13,38.43v20.05H0 V38.43H21.13L21.13,38.43z M21.13,0v20.05H0V0H21.13L21.13,0z M122.88,76.86v20.05H33.2V76.86H122.88L122.88,76.86z M122.88,38.43 v20.05H33.2V38.43H122.88L122.88,38.43z"
        />
      </g>
    </svg>
  );
};
MenuIcon.propTypes = {
  customClass: PropTypes.string,
};
export default MenuIcon;
