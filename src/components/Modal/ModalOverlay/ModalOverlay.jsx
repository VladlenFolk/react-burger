import style from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  return <div className={style.overlay} onClick={onClose}></div>;
};
export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};