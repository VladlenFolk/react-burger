import styleCard from "./CardOrders.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPrice, getObjWithCount } from "../../../utils/functions";
import { useMemo } from "react";

function CardOrders({ order }) {
  const location = useLocation();
  const ingredientsArr = order.ingredients;
  const date = order.createdAt;
  const { ingredients } = useSelector((state) => state.ingredientsSlice);

  const ingredientsOrder = useMemo(() => {
    return ingredients.filter((ingredient) =>
      ingredientsArr.includes(ingredient._id)
    );
  }, [ingredients, ingredientsArr]);

  const ingredientsObj = getObjWithCount(ingredientsArr, ingredientsOrder);
  const price = getPrice(ingredientsObj);

  const wisibleIngredients = ingredientsOrder.slice(0, 6);
  let count;
  ingredientsOrder.length > 6
    ? (count = ingredientsOrder.length - 6)
    : (count = 0);
  const number = order.number;
  const status = order.status === "done" ? "Готов" : "Создан";

  return (
    <Link
      className={styleCard.link}
      to={{
        pathname: `/profile/orders/${number}`,
        state: { background: location },
      }}
    >
      <li className={styleCard.card}>
        <div className={styleCard.cardHeader}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(date)} /> i-GMT+3
          </p>
        </div>
        <h3 className="text text_type_main-medium mt-6 ml-1">{order.name}</h3>
        <p className="text text_type_main-default mt-2 ml-1">{status}</p>
        <div className={styleCard.mainContainer}>
          <ul className={styleCard.list}>
            {wisibleIngredients.map((ingredient, index) => (
              <li
                className={styleCard.ingredient}
                style={{ zIndex: 6 - index }}
                key={index}
              >
                <img
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                  className={styleCard.image}
                />
                {count > 0 && index === 5 && (
                  <span
                    className={styleCard.countIngredients}
                  >{`+${count}`}</span>
                )}
              </li>
            ))}
          </ul>
          <div className={styleCard.total}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
}

export default CardOrders;