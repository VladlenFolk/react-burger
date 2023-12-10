import { useAppSelector } from "../../../hooks/typesHooks";
import style from "./FeedOrderPage.module.css";
import CardOrders from "../../../components/CardOrders/CardOrders";

const FeedOrderPage: React.FC = () => {
  const { orders } = useAppSelector((state) => state.wsSlice);
  return (
    <div className={style.feedOrderContainer}>
      <div className={style.scrollContainer}>
        <div className={style.scroll}>
          <ul className={style.cardsList}>
            {orders.map((order) => (
              <CardOrders key={order._id} order={order} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeedOrderPage;
