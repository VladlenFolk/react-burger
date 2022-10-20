import { useState } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useKey from "../../hooks/useKey";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
const modalRootElement = document.getElementById("reactModals");

const Modal = ({ onClose, children, title }) => {
  // Функция закрытия модального окна
  function close() {
    onClose(false);
  }

  //Создаем анимацию
  const [animate, setAnimate] = useState(true);
  function closeModal(time) {
    setAnimate(false);
    setTimeout(close, time);
  }

  //Слушатель нажатия кнопки
  useKey("Escape", () => closeModal(300));

  return createPortal(
    <div
      className={animate ? style.modal : style.modal_open}
      onClick={() => closeModal(300)}
    >
      <ModalOverlay />
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.closeWrapper}>
          <CloseIcon type="primary" onClick={() => closeModal(300)} />
        </div>
        {title && (
          <div className={style.title}>
            <h2 className="text text_type_main-large">{title}</h2>
          </div>
        )}
        {children}
      </div>
    </div>,
    modalRootElement
  );
};
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};