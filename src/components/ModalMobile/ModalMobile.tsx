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
  orderModalClose,
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
  const { orderModal } = useAppSelector((state) => state.utils);

  const close = () => {
    if (burgerMenu && !countModal && !orderModal) {
      dispatch(toggleMobileMenu());
    } else if (burgerMenu && (countModal || orderModal)) {
      dispatch(countModalClose());
      dispatch(orderModalClose());
    }
  };
  function closeModal() {
    dispatch(toggleAnimate());
    dispatch(toggleBurger());
    setTimeout(close, 300);
  }
  const classModal = countModal
    ? animate
      ? MenuStile.section_count_open
      : MenuStile.section_count
    : animate
    ? MenuStile.section_open
    : MenuStile.section;

  //Слушатель нажатия кнопки
  useKey("Escape", closeModal);

  return createPortal(
    <section className={classModal}>
      <div className={MenuStile.title}>
        <h2 className={`${"text text_type_main-medium"}`}>{title}</h2>
      </div>
      {!orderRequest && children}
    </section>,
    modalRootElement
  );
};

export default ModalMobile;
