import styleProfile from "./Orders.module.css";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/typesHooks";
import { fetchLogout } from "../../services/reduxToolkit/userSlice";
import { NavLink } from "react-router-dom";
import OrderPage from "./OrderPage/OrderPage";
import { getCookie } from "../../utils/cookie";
import {
  wsConnectionStart,
  wsClosed,
} from "../../services/reduxToolkit/webSocketSlice";

const Orders = () =>{
  const [colorText, setColorText] = useState({
    name: "text_color_inactive",
    story: "text_color_active",
    logout: "text_color_inactive",
  });
  const colorName = () => {
    setColorText({
      name: "text_color_active",
      story: "text_color_inactive",
      logout: "text_color_inactive",
    });
  };
  const colorStory = () => {
    setColorText({
      name: "text_color_inactive",
      story: "text_color_active",
      logout: "text_color_inactive",
    });
  };

  //Логика работы с redux и api
  const dispatch = useAppDispatch();
  const logoutProfile = () => {
    dispatch(fetchLogout());
    setColorText({
      name: "text_color_inactive",
      story: "text_color_inactive",
      logout: "text_color_active",
    });
  };

  const userOrdersUrl = "wss://norma.nomoreparties.space/orders";
  const token = getCookie("token")?.split(" ")?.slice(1)?.join("");

  useEffect(() => {
    dispatch(wsConnectionStart(`${userOrdersUrl}?token=${token}`));
    return () => {
      dispatch(wsClosed());
    };
  }, []);

  return (
    <>
      <div className={styleProfile.container}>
        <h2 className={styleProfile.title}>История заказов</h2>
        <div className={styleProfile.links}>
          <NavLink to="/profile" className={styleProfile.list}>
            <p
              className={`text text_type_main-medium ${colorText.name} mt-5`}
              onClick={colorName}
            >
              Профиль
            </p>
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={styleProfile.list}
            activeClassName={styleProfile.active}
          >
            <p
              className={`text text_type_main-medium ${colorText.story} mt-8`}
              onClick={colorStory}
            >
              История заказов
            </p>
          </NavLink>
          <p
            className={`text text_type_main-medium ${colorText.logout} mt-9`}
            onClick={logoutProfile}
          >
            Выход
          </p>
          <div className={styleProfile.text}>
            <p className={styleProfile.string}>
              В этом разделе вы можете просмотреть&nbsp;свою историю заказов
            </p>
          </div>
        </div>
        <OrderPage />
      </div>
    </>
  );
}

export default Orders;