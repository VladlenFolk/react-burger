import style from "./ChoosenOrder.module.css";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { choosenOrder } from "../../services/reduxToolkit/orderSlice";
import { fetchGetChoosenOrder } from "../../services/reduxToolkit/orderSlice";
import { getObjWithCount, getPrice } from "../../utils/functions";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ChoosenOrder = () => {
  const dispatch = useDispatch();
  const id = useParams();

  useEffect(() => {
    dispatch(fetchGetChoosenOrder(id.number));
  }, [dispatch]);

  const  {order}  = useSelector((state) => state.orderSlice);
  const { ingredients } = useSelector((state) => state.ingredientsSlice);
  const el = order[0];
  const date = el?.createdAt;
  
  const orderIngredients = useMemo(() => {
    return ingredients.filter((item) => el?.ingredients.includes(item._id));
  }, [ingredients, el]);

  const ingredientsObj = getObjWithCount(el?.ingredients, orderIngredients);
  const price = getPrice(ingredientsObj);
  const status = el?.status === "done" ? "Выполнен" : "Готовится";

  return (
    <div className={style.container}>
      <p className={`text text_type_digits-default`}>#{id.number}</p>
      <h2 className={`text text_type_main-medium ${style.name}`}>{el?.name}</h2>
      <p
        className={`text text_type_main-default ${
          el?.status === "done" ? style.done : style.process
        }`}
      >
        {status}
      </p>
      <p className={`text text_type_main-medium ${style.contain}`}>Состав:</p>
      <div className={style.scroll}>
        <ul className={style.listContainer}>
          {ingredientsObj.map((el) => (
            <li className={style.list} key={el._id}>
              <div className={style.ingredient}>
                <img src={el.image} alt={el.name} className={style.image} />
              </div>
              <p className={`text text_type_main-default ${style.ingredients}`}>
                {el.name}
              </p>
              <div className={style.total}>
                <p className="text text_type_digits-default">{`${el.count} x ${el.price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(date)} /> i-GMT+3
        </p>
        <div className={style.total}>
          <p className="text text_type_digits-default">{`${price}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default ChoosenOrder;