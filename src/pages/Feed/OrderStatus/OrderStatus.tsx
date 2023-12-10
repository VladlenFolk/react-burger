import style from "./OrderStatus.module.css";
import { useAppSelector } from "../../../hooks/typesHooks";

const OrderStatus = () => {
  const { orders, total, totalToday } = useAppSelector(
    (state) => state.wsSlice
  );
  const { windowSize } = useAppSelector((state) => state.utils);
  const order = orders.slice(0, 10);
  const orderMobile = orders.slice(0, 5);
  const doneQuantity = windowSize > 1060 ? order : orderMobile;

  return (
    <div className={style.store}>
      <div className={style.wrapper}>
        <div className={style.orders}>
          <div className={style.done}>
            <p className={`${"text text_type_main-medium"} ${style.doneText}`}>
              Готовы:
            </p>
            <div className={style.doneOrder}>
              {doneQuantity.map(
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
          <div className={style.inProcess}>
            <p className={`${"text text_type_main-medium"} ${style.doneText}`}>
              {" "}
              В работе:
            </p>
            <div className={style.inProcessOrder}>
              {doneQuantity.map(
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
        <div className={style.readyAlltime}>
          <p className={`${"text text_type_main-medium"} ${style.doneText}`}>
            Выполнено за все время:
          </p>
          <p className={`${"text text_type_digits-large"} ${style.digits}`}>
            {total}
          </p>
        </div>
        <div className={style.readyToday}>
          <p className={`${"text text_type_main-medium"} ${style.doneText}`}>
            Выполнено за сегодня:
          </p>
          <p className={`${"text text_type_digits-large"} ${style.digits}`}>
            {totalToday}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
