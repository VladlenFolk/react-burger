import {
  ProfileIcon,
  BurgerIcon,
  ListIcon,
  ArrowUpIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuStile from "./ModalMenu.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/typesHooks";
import { fetchLogout } from "../../../services/reduxToolkit/userSlice";

const ModalMenu = () => {
  const dispatch = useAppDispatch();
  const logoutProfile = () => {
    dispatch(fetchLogout());
  };

  return (
    <section className={MenuStile.section}>
      <nav>
        <ul className={MenuStile.profileList}>
          <li className={MenuStile.profileContainer}>
            <div className={MenuStile.profile}>
              <ProfileIcon type={"primary"} />
              <p className={MenuStile.textProfile}> Личный кабинет</p>
              <ArrowUpIcon type={"primary"} />
            </div>
            <ul className={MenuStile.profileLinks}>
              <li>
                <Link to="/profile" className={MenuStile.profileNav}>
                  <p className={MenuStile.textNav}>Профиль</p>
                </Link>
              </li>
              <li>
                <Link to="/profile/orders" className={MenuStile.profileNav}>
                  <p className={MenuStile.textNav}>История заказов</p>
                </Link>
              </li>
              <li>
                <p className={MenuStile.textNav} onClick={logoutProfile}>
                  Выход
                </p>
              </li>
            </ul>
          </li>
          <li>
            <div>
              <Link
                to={{ pathname: `/` }}
                className={MenuStile.navLink}
              >
                <BurgerIcon type={"primary"} />
                <p className={MenuStile.text}>Конструктор бургеров</p>
              </Link>
            </div>
          </li>
          <li>
            <div className={MenuStile.orderList}>
              <Link
                to="/feed"
                className={MenuStile.navLink}
              >
                <ListIcon type={"primary"} />
                <p className={MenuStile.text}>Лента заказов</p>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default ModalMenu;
