import styleFeed from "./Feed.module.css";
import CardFeed from "./Card/CardFeed";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/typesHooks";
import {
  wsConnectionStart,
  wsClosed,
} from "../../services/reduxToolkit/webSocketSlice";
import CardOrders from "../../components/CardOrders/CardOrders";

function Feed() {
  const [tab, setTab] = useState("1");
  const handleOrdersClick = () => {
    setTab("1");
  };
  const handleStatisticClick = () => {
    setTab("2");
  };
  const dispatch = useAppDispatch();
  const { orders, total, totalToday } = useAppSelector(
    (state) => state.wsSlice
  );

  const feedUrl = "wss://norma.nomoreparties.space/orders/all";
  const tabOrders = useRef<HTMLDivElement>(null);
  const tabStatistic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(wsConnectionStart(feedUrl));
    return () => {
      dispatch(wsClosed());
    };
  }, []);

  const bunTab =
    tab === "1" ? styleFeed.tab_menu_type_current : styleFeed.noselected;
  const sauceTab =
    tab === "2" ? styleFeed.tab_menu_type_current : styleFeed.noselected;

  return (
    <section className={styleFeed.feed}>
      <div className={styleFeed.container}>
      <div className={styleFeed.titleMobile}>
        <h2 className="text text_type_main-large ml-20">Лента заказов</h2>
      </div>
        <div className={styleFeed.title}>
          <h2 className="text text_type_main-large ml-20">Лента заказов</h2>
        </div>
        <div id="menu" className={`${styleFeed.tabs} ${bunTab}`}>
          <div
            className={`${styleFeed.tab_menu} ${bunTab}`}
            onClick={handleOrdersClick}
            ref={tabOrders}
          >
            <span className="text text_type_main-default">Заказы</span>
          </div>
          <div
            className={`${styleFeed.tab_menu} ${sauceTab}`}
            onClick={handleStatisticClick}
            ref={tabStatistic}
          >
            <span className="text text_type_main-default">Статистика</span>
          </div>
        </div>
        <div className={styleFeed.scrollContainer}>
          <div className={styleFeed.title}>
            <h2 className="text text_type_main-large ml-20">Лента заказов</h2>
          </div>
          <div className={styleFeed.scroll}>
            <ul className={styleFeed.cardsList}>
              {orders.map((order) => (
                <CardOrders key={order._id} order={order} />
              ))}
            </ul>
          </div>
        </div>
        <div className={styleFeed.store}>
          <div className={styleFeed.orders}>
            <div className={styleFeed.done}>
              <p className="text text_type_main-medium">Готовы:</p>
              <div className={styleFeed.doneOrder}>
                {orders.map(
                  (order) =>
                    order.status === "done" && (
                      <p
                        key={order._id}
                        className="text text_type_digits-default"
                      >
                        {order.number}
                      </p>
                    )
                )}
              </div>
            </div>
            <div className={styleFeed.inProcess}>
              <p className="text text_type_main-medium"> В работе:</p>
              <div className={styleFeed.inProcessOrder}>
                {orders.map(
                  (order) =>
                    order.status === "pending" && (
                      <p
                        key={order.number}
                        className="text text_type_digits-default"
                      >
                        {order.number}
                      </p>
                    )
                )}
              </div>
            </div>
          </div>
          <div className={styleFeed.readyAlltime}>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div className={styleFeed.readyToday}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feed;
