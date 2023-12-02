import {
  ProfileIcon,
  BurgerIcon,
  ListIcon,
  ArrowDownIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import MenuStile from "./ModalMenu.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/typesHooks";
import { fetchLogout } from "../../../services/reduxToolkit/userSlice";
import { toggleMobileMenu } from "../../../services/reduxToolkit/userSlice";

const ModalMenu = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
 



  const toggleMenu = () => {
    dispatch(toggleMobileMenu());
  };

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

const logoutProfile = () => {
    dispatch(fetchLogout());
    toggleMenu()
  };

  const menuStile = open
    ? `${MenuStile.profileLinks} ${MenuStile.active}`
    : MenuStile.profileLinks;

  const arrowIcon = open
    ? `${MenuStile.arrowIcon} ${MenuStile.active}`
    : MenuStile.arrowIcon;

  const navLinkProps = {
    className: MenuStile.profileNav,
    activeClassName: MenuStile.activeNav,
    onClick: toggleMenu,
  };

  return (
    <section className={MenuStile.section}>
      <nav>
        <ul className={MenuStile.profileList}>
          <li className={MenuStile.profileContainer}>
            <div className={MenuStile.profile} onClick={toggleOpen}>
              <ProfileIcon type={"primary"} />
              <p className={MenuStile.textProfile}> Личный кабинет</p>
              <div className={arrowIcon}>
                <ArrowDownIcon type={"primary"} />
              </div>
            </div>
            <ul className={menuStile}>
              <li  className={MenuStile.nav}>
                <NavLink
                  to="/profile"
                  exact
                  {...navLinkProps}
                >
                  Профиль
                </NavLink>
              </li>
              <li className={MenuStile.nav}>
                <NavLink to="/profile/orders" {...navLinkProps}>
                  История заказов
                </NavLink>
              </li>
              <li className={MenuStile.nav}>
                <p
                  className={MenuStile.textLogout}
                  onClick={logoutProfile}
                >
                  Выход
                </p>
              </li>
            </ul>
          </li>
          <li className={MenuStile.above}>
            <div onClick={toggleMenu}>
              <NavLink
                to={{ pathname: `/` }}
                exact
                className={MenuStile.navLink}
                activeClassName={MenuStile.navLinkActive}
              >
                <BurgerIcon
                  type={location.pathname === "/" ? "primary" : "secondary"}
                />
                <p className={MenuStile.text}>Конструктор бургеров</p>
              </NavLink>
            </div>
          </li>
          <li className={MenuStile.above}>
            <div className={MenuStile.orderList} onClick={toggleMenu}>
              <NavLink to="/feed" className={MenuStile.navLink} activeClassName={MenuStile.navLinkActive}>
                <ListIcon type={location.pathname === "/feed" ? "primary" : "secondary"} />
                <p className={MenuStile.text}>Лента заказов</p>
              </NavLink>
            </div>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default ModalMenu;
