import styleFeed from "./Feed.module.css";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/typesHooks";
import {
  wsConnectionStart,
  wsClosed,
} from "../../services/reduxToolkit/webSocketSlice";
import FeedOrderPage from "./FeedOrderPage/FeedOrderPage";
import OrderStatus from "./OrderStatus/OrderStatus";

function Feed() {
  //загружаем заказы при переходе на страницу
  const dispatch = useAppDispatch();
  const feedUrl = "wss://norma.nomoreparties.space/orders/all";
  useEffect(() => {
    dispatch(wsConnectionStart(feedUrl));
    return () => {
      dispatch(wsClosed());
    };
  }, []);
  const { windowSize } = useAppSelector((state) => state.utils);

  //переключение между страницами
  const [tab, setTab] = useState("1");
  const handleOrdersClick = () => {
    setTab("1");
  };
  const handleStatisticClick = () => {
    setTab("2");
  };
  const tabOrders = useRef<HTMLDivElement>(null);
  const tabStatistic = useRef<HTMLDivElement>(null);
  const ordersTab =
    tab === "1" ? styleFeed.tab_menu_type_current : styleFeed.noselected;
  const listsTab =
    tab === "2" ? styleFeed.tab_menu_type_current : styleFeed.noselected;

  return (
    <section className={styleFeed.feed}>
      <div className={styleFeed.container}>
        <div className={styleFeed.titleMobile}>
          <h2 className="text text_type_main-large ml-20">Лента заказов</h2>
        </div>
        <div id="menu" className={`${styleFeed.tabs}`}>
          <div
            className={`${styleFeed.tab_menu} ${ordersTab}`}
            onClick={handleOrdersClick}
            ref={tabOrders}
          >
            <span className="text text_type_main-default">Заказы</span>
          </div>
          <div
            className={`${styleFeed.tab_menu} ${listsTab}`}
            onClick={handleStatisticClick}
            ref={tabStatistic}
          >
            <span className="text text_type_main-default">Статистика</span>
          </div>
        </div>
        {windowSize > 1060 && (
          <div className={styleFeed.feedOrderContainer}>
            <div className={styleFeed.title}>
              <h2 className="text text_type_main-large ml-20">Лента заказов</h2>
            </div>
            <div className={styleFeed.wrapper}>
              <FeedOrderPage />
              <OrderStatus />
            </div>
          </div>
        )}
        {windowSize < 1060 && tab === "1" && <FeedOrderPage />}
        {windowSize < 1060 && tab === "2" && <OrderStatus />}
      </div>
    </section>
  );
}

export default Feed;
