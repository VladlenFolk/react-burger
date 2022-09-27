import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header>
      <nav className={headerStyle.header}>
        <a href="#" className={headerStyle.constructor}>
          <BurgerIcon type="primary" />
          <p className={headerStyle.text}>Конструктор</p>
        </a>
        <a href="#" className={headerStyle.list}>
          <ListIcon type="secondary" />
          <p className={headerStyle.text_type_secondary}>Лента заказов</p>
        </a>
        <div className={headerStyle.logo}>
          <Logo />
        </div>
        <a href="#" className={headerStyle.profile}>
          <ProfileIcon type="secondary" />
          <p className={headerStyle.text_type_profile}>Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
};
export default AppHeader;