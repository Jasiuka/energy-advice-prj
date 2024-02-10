import PropTypes from "prop-types";
const CustomButton = ({ customClass, text, title, handleClick }) => {
  const handleBtnClick = handleClick || (() => {});
  return (
    <button
      className={`btn ${customClass}`}
      role="button"
      title={title}
      onClick={() => handleBtnClick()}
    >
      {text}
    </button>
  );
};

CustomButton.propTypes = {
  customClass: PropTypes.string,
  text: PropTypes.any,
  title: PropTypes.string,
  handleClick: PropTypes.func,
};
export default CustomButton;
