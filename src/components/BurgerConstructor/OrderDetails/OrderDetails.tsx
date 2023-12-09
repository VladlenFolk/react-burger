import style from "./OrderDetails.module.css";
import done from "../../../images/done.svg";

type TOrderNumber = {
  orderNumber: number;
};

const OrderDetails: React.FC<TOrderNumber> = ({ orderNumber }) => {
  return (
    <div className={style.container}>
      <p className={`${"text text_type_digits-large"} ${style.orderNumber}`}>
        {orderNumber}
      </p>
      <p className={`${"text text_type_main-medium mt-8"} ${style.orderText}`}>
        идентификатор заказа
      </p>
      <img src={done} alt="готово" className={style.image} />
      <div className={style.textContainer}>
        <p className={style.text}>Ваш заказ начали готовить</p>
        <p className={style.text}>
          Дождитесь готовности{"\n"}на орбитальной станции
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
