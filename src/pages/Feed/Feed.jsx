import styleFeed from "./Feed.module.css";
import CardFeed from "./Card/CardFeed";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionStart,
  wsClosed,
} from "../../services/reduxToolkit/toolkitSlice";

function Feed() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.wsSlice);

  const feedUrl = "wss://norma.nomoreparties.space/orders/all";

  useEffect(() => {
    dispatch(wsConnectionStart(feedUrl));
    return () => {
      dispatch(wsClosed());
    };
  }, []);

  return (
    <section className={styleFeed.feed}>
      <div className={styleFeed.container}>
        <div className={styleFeed.scrollContainer}>
          <div className={styleFeed.title}>
            <h2 className="text text_type_main-large ml-20">Лента заказов</h2>
          </div>
          <div className={styleFeed.scroll}>
            <ul className={styleFeed.cardsList}>
              {orders.map((order) => (
                <CardFeed key={order._id} order={order} />
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
                        key={order._id}
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
