import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useKey from "../../hooks/useKey";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { useAppSelector } from "../../hooks/typesHooks";

type TModal = {
  onClose: () => void;
  title?: string;
  children?: ReactNode;
};

const modalRootElement = document.getElementById("reactModals") as HTMLElement;

const Modal: React.FC<TModal> = ({ onClose, children, title }) => {
  //Создаем анимацию
  const [animate, setAnimate] = useState(true);
  function closeModal() {
    setAnimate(false);
    setTimeout(onClose, 300);
  }
  const orderRequest = useAppSelector((state) => state.orderSlice.orderRequest);

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
