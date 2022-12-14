import style from "./OrderDetails.module.css";
import done from "../../../images/done.svg";
import PropTypes from "prop-types";

const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={style.container}>
      <p className="text text_type_digits-large">{orderNumber}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img src={done} alt="готово" className={style.image} />
      <p className={style.text}>Ваш заказ начали готовить</p>
      <p className={style.text}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};