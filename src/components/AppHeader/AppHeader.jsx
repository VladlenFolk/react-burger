import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from "./AppHeader.module.css";
import { NavLink, useRouteMatch } from "react-router-dom";

const AppHeader = () => {
  const { isExact: constructorExact } = useRouteMatch();
  const currentPath = document.location.pathname;
  const profileExact = currentPath === "/profile";
  return (
    <header>
      <nav className={headerStyle.header}>
        <NavLink
          exact
          to={{ pathname: `/` }}
          className={headerStyle.constructor}
          activeClassName={headerStyle.active}
        >
          <BurgerIcon type={constructorExact ? "primary" : "secondary"} />
          <p className={headerStyle.text}>Конструктор</p>
        </NavLink>
        <NavLink
          to="#"
          className={headerStyle.list}
          activeClassName={headerStyle.active}
        >
          <ListIcon type={"secondary"} />
          <p className={headerStyle.text_type_secondary}>Лента заказов</p>
        </NavLink>
        <div className={headerStyle.logo}>
          <Logo />
        </div>
        <NavLink
          to={{ pathname: `/profile` }}
          className={profileExact ? headerStyle.active : headerStyle.profile}
        >
          <ProfileIcon type={profileExact ? "primary" : "secondary"} />
          <p className={headerStyle.text_type_profile}> Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};
export default AppHeader;