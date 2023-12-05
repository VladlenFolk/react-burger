import { useAppDispatch, useAppSelector } from "../../../hooks/typesHooks";
import burgerStyle from "./HeaderBurger.module.css";
import { toggleMobileMenu } from "../../../services/reduxToolkit/userSlice";
import { toggleBurger } from "../../../services/reduxToolkit/utils";
import {
  countModalClose,
  toggleAnimate,
} from "../../../services/reduxToolkit/utils";

const HeaderBurger = () => {
  const dispatch = useAppDispatch();
  const burger = useAppSelector((state) => state.utils.burgerState);
  const { countModal } = useAppSelector((state) => state.utils);
  const toggleIcon = () => {
    if (!countModal) {
      dispatch(toggleMobileMenu());
    } else {
      dispatch(countModalClose());
    }
  };

  const click = () => {
    dispatch(toggleAnimate());
    dispatch(toggleBurger());
    setTimeout(toggleIcon, 100);
  };
  return (
    <div
      className={
        !burger
          ? burgerStyle.burger
          : burgerStyle.burger + " " + burgerStyle.active
      }
      onClick={click}
    >
      <span></span>
    </div>
  );
};

export default HeaderBurger;
