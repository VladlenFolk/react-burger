import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from "./AppHeader.module.css";
import { NavLink, useRouteMatch, Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/typesHooks";
import {FC} from 'react';
import HeaderBurger from "./HeaderBurger/HeaderBurger";


const AppHeader: FC = () => {
  const { isExact: constructorExact } = useRouteMatch();
  const currentPath = document.location.pathname;
  const profileExact =
  currentPath === "/profile" || currentPath === "/profile/orders";
  const feedExact = currentPath === "/feed";
  let {windowSize} = useAppSelector((state) => state.windowSlice)
console.log(windowSize);



  return (
    <header>
      <nav className={headerStyle.header}>
        <NavLink
          exact
          to={{ pathname: `/` }}
          className={headerStyle.constructors}
          activeClassName={headerStyle.active}
        >
          <BurgerIcon type={constructorExact ? "primary" : "secondary"} />
          <p className={headerStyle.text}>Конструктор</p>
        </NavLink>
        <NavLink
          to="/feed"
          className={headerStyle.list}
          activeClassName={headerStyle.active}
        >
          <ListIcon type={feedExact ? "primary" : "secondary"} />
          <p
            className={
              feedExact ? headerStyle.activeFeed : headerStyle.secondary
            }
          >
            Лента заказов
          </p>
        </NavLink>
        <Link to={{ pathname: `/` }} className={headerStyle.logo}>
          { windowSize > 1060 ? <Logo /> : <img className={headerStyle.img} src={require('./logo.png')} alt="logo"/>}
        </Link>
        <HeaderBurger />
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