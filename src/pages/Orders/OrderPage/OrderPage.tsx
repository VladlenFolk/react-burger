import style from "./OrderPage.module.css";
import { useAppSelector } from "../../../hooks/typesHooks";
import CardOrders from "../../../components/CardOrders/CardOrders";

const OrderPage =() => {
  const { orders } = useAppSelector((state) => state.wsSlice);
  const ordersList = [...orders].reverse().slice(0, 50);

  return (
    <div className={style.scroll}>
      <ul className={style.list}>
        {ordersList.map((order) => (
          <CardOrders key={order._id} order={order} />
        ))}
      </ul>
    </div>
  );
}

export default OrderPage;
