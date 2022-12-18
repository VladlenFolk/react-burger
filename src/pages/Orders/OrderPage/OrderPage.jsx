import style from "./OrderPage.module.css";
import { useSelector } from "react-redux";
import CardOrders from "../Card/CardOrders";

function OrderPage() {
  const { orders } = useSelector((state) => state.wsSlice);
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
