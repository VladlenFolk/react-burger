import { ReactNode, FC } from "react";
import MenuStile from "./ModalMobile.module.css";
import useKey from "../../hooks/useKey";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/typesHooks";
import { toggleMobileMenu } from "../../services/reduxToolkit/userSlice";
import {
  countModalClose,
  toggleAnimate,
  toggleBurger,
} from "../../services/reduxToolkit/utils";

type TModal = {
  title?: string;
  children?: ReactNode;
};

const modalRootElement = document.getElementById("reactModals") as HTMLElement;
const ModalMobile: FC<TModal> = ({ children, title }) => {
  const dispatch = useAppDispatch();
  const orderRequest = useAppSelector((state) => state.orderSlice.orderRequest);
  const burgerMenu = useAppSelector((state) => state.utils.burgerState);
  const { countModal } = useAppSelector((state) => state.utils);
  const { animate } = useAppSelector((state) => state.utils);

  const close = () => {
    if (burgerMenu && !countModal) {
      dispatch(toggleMobileMenu());
    } else if (burgerMenu && countModal) {
      dispatch(countModalClose());
    }
  };
  function closeModal() {
    dispatch(toggleAnimate());
    dispatch(toggleBurger());
    setTimeout(close, 300);
  }

  //Слушатель нажатия кнопки
  useKey("Escape", closeModal);

  return createPortal(
    <section className={animate ? MenuStile.section_open : MenuStile.section}>
      <div className={MenuStile.title}>
        <h2 className={`${"text text_type_main-medium"}`}>{title}</h2>
      </div>
      {!orderRequest && children}
    </section>,
    modalRootElement
  );
};

export default ModalMobile;
