import { useState } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useKey from "../../hooks/useKey";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT_INFO } from "../../services/actions/ingredientInfo";
const modalRootElement = document.getElementById("reactModals");

const Modal = ({ onClose, children, title }) => {
  const dispatch = useDispatch();
  // Функция закрытия модального окна
  function close() {
    onClose(false);
    dispatch({ type: DELETE_INGREDIENT_INFO });
  }

  //Создаем анимацию
  const [animate, setAnimate] = useState(true);
  function closeModal() {
    setAnimate(false);
    setTimeout(close, 300);
  }

  //Слушатель нажатия кнопки
  useKey("Escape", closeModal);

  return createPortal(
    <div
      className={animate ? style.modal : style.modal_open}
      onClick={closeModal}
    >
      <ModalOverlay />
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.closeWrapper}>
          <CloseIcon type="primary" onClick={closeModal} />
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
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};