import style from "./ModalOverlay.module.css";

const ModalOverlay = ({onClose}) => {
  return <div className={style.overlay} onClick={onClose}></div>;
};
export default ModalOverlay;