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
        <div className={headerStyle.constructor}>
          <BurgerIcon type="primary" />
          <div className={headerStyle.text}>Конструктор</div>
        </div>
        <div className={headerStyle.list}>
          <ListIcon type="secondary" />
          <p className={headerStyle.text_type_secondary}>Лента заказов</p>
        </div>
        <div className={headerStyle.logo}>
        <Logo />
        </div>
        <div className={headerStyle.profile}>
          <ProfileIcon type="secondary" />
          <p className={headerStyle.text_type_profile}>Личный кабинет</p>
        </div>
      </nav>
    </header>
  );
};
export default AppHeader;
