import { useState } from "react";
import { createPortal } from "react-dom";
import style from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useKey from "../../hooks/useKey";
const modalRootElement = document.querySelector("#reactModals");

const Modal = ({
  children,
  onClose,
  // closeIngredient,
  // closePrice,
}) => {

  function close() {
    onClose(false);
  }


  //Создаем анимацию
  const [animate, setAnimate] = useState(true);
  function closeModal() {
    setAnimate(false);
    setTimeout(close, 300);
  }


 
  useKey("Escape", closeModal);

  return createPortal(
    <div
      className={animate ? style.modal : style.modalOpen}
      onClick={closeModal}
    >
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.closeWrapper}>
          <CloseIcon
            type="primary"
            onClick={closeModal}
          />
        </div>
        {children}
      </div>
    </div>,
    modalRootElement
  );
};
export default Modal;

// Modal.propTypes = {
//   close: PropTypes.func.isRequired,
//   setAnimate: PropTypes.func.isRequired,
//   animate: PropTypes.bool.isRequired,
//   closeIngredient: PropTypes.func,
//   closePrice: PropTypes.func.isRequired,
// };