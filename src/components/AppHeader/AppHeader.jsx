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
      <nav className={headerStyle.nav}>
        <div className={headerStyle.constructor}>
          <BurgerIcon type="primary" />
          <p className={headerStyle.text}>Конструктор</p>
        </div>
        <div className={headerStyle.list}>
          <ListIcon type="secondary" />
          <p className={headerStyle.text_type_secondary}>Лента заказов</p>
        </div>
        <Logo />
        <div className={headerStyle.profile}>
          <ProfileIcon type="secondary" />
          <p className={headerStyle.text_type_profile}>Личный кабинет</p>
        </div>
      </nav>
    </header>
  );
};
export default AppHeader;
