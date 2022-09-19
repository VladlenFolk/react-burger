import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import style from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const modalRootElement = document.querySelector("#reactModals");

const Modal = ({
  children,
  close,
  setAnimate,
  animate,
  closeIngridient,
  closePrice,
}) => {
  // Устанавливаем слушатель на нажатие esc
  function useKey(key, cb) {
    const callbackRef = useRef(cb);
    useEffect(() => {
      callbackRef.current = cb;
    });
    useEffect(() => {
      function handle(e) {
        if (e.code === key) {
          callbackRef.current(e);
        }
      }
      document.addEventListener("keydown", handle);
      return () => document.removeEventListener("keypress", handle);
    }, [key]);
  }

  function closet() {
    close(false);
    closeIngridient(false);
    closePrice(false);
  }
  function closeEsc() {
    setAnimate(false);
    setTimeout(closet, 300);
  }
  useKey("Escape", closeEsc);

  return createPortal(
    <div
      className={animate ? style.modal : style.modalOpen}
      onClick={() => {
        setAnimate(false);
        setTimeout(closet, 250);
      }}
    >
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.closeWrapper}>
          <CloseIcon
            type="primary"
            onClick={() => {
              setAnimate(false);
              setTimeout(closet, 300);
            }}
          />
        </div>
        {children}
      </div>
    </div>,
    modalRootElement
  );
};
export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  setAnimate: PropTypes.func.isRequired,
  animate: PropTypes.bool.isRequired,
  closeIngridient: PropTypes.func.isRequired,
  closePrice: PropTypes.func.isRequired,
};