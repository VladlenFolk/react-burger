import { ReactNode, FC } from "react";
import MenuStile from "./ModalMobile.module.css";
import useKey from "../../hooks/useKey";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/typesHooks";
import { toggleMobileMenu } from "../../services/reduxToolkit/userSlice";

type TModal = {
  title?: string;
  children?: ReactNode;
};

const modalRootElement = document.getElementById("reactModals") as HTMLElement;
const ModalMobile: FC<TModal> = ({ children, title }) => {

  const dispatch = useAppDispatch();
  const  close = ( ) => {
    dispatch(toggleMobileMenu())
  }
  function closeModal() {
    setTimeout(close, 300)
  }
  const orderRequest = useAppSelector((state) => state.orderSlice.orderRequest);
  const mobileMenu = useAppSelector((state) => state.userSlice.mobileMenu)

  //Слушатель нажатия кнопки
  useKey("Escape", closeModal);

  return createPortal(
    <section className={mobileMenu ? MenuStile.section : MenuStile.section_open}>
      <div className={MenuStile.title}>
        <h2
          className={`${"text text_type_main-medium"}`}
        >
          {title}
        </h2>
      </div>
      {!orderRequest && children}
    </section>,
    modalRootElement
  );
};

export default ModalMobile;
