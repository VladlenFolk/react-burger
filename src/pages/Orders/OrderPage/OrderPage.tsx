import style from "./OrderPage.module.css";
import { useAppSelector } from "../../../hooks/typesHooks";
import CardOrders from "../Card/CardOrders";

const OrderPage =() => {
  const { orders } = useAppSelector((state) => state.wsSlice);
  const ordersList = [...orders].reverse().slice(0, 50);

  return (
    <div className={style.scroll}>
      <ul>
        {ordersList.map((order) => (
          <CardOrders key={order._id} order={order} />
        ))}
      </ul>
    </div>
  );
}

export default OrderPage;
