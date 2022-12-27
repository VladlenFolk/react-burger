import { useState } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useKey from "../../hooks/useKey";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { useSelector } from "react-redux";
const modalRootElement = document.getElementById("reactModals");

const Modal = ({ onClose, children, title }) => {
  //Создаем анимацию
  const [animate, setAnimate] = useState(true);
  function closeModal() {
    setAnimate(false);
    setTimeout(onClose, 300);
  }
  const orderRequest = useSelector((state) => state.orderSlice.orderRequest);

  //Слушатель нажатия кнопки
  useKey("Escape", closeModal);

  return createPortal(
    <div className={animate ? style.modal : style.modal_open}>
      <ModalOverlay onClose={closeModal} />
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.closeWrapper}>
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        <div className={style.title}>
          <h2 className="text text_type_main-large">{title}</h2>
        </div>
        {!orderRequest && children}
      </div>
    </div>,
    modalRootElement
  );
};
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};