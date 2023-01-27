import styleCard from "./CardFeed.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../hooks/typesHooks";
import { useMemo } from "react";
import { getPrice, getObjWithCount } from "../../../utils/functions";
import { Link, useLocation } from "react-router-dom";
import { TOrders } from "../../../types/types";

type TCardProps = {
  order:  TOrders
}

  const CardFeed: React.FC<TCardProps> = ({ order }) => {
    console.log(order);
    
  const location = useLocation();
  const ingredientsArr = order.ingredients;
  const date = order.createdAt;
  const number = order.number;
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);

  const ingredientsOrder = useMemo(() => {
    return ingredients?.filter((ingredient) =>
      ingredientsArr?.includes(ingredient._id)
    );
  }, [ingredients, ingredientsArr]);

  const ingredientsObj = getObjWithCount(ingredientsArr, ingredientsOrder);
  const price = getPrice(ingredientsObj);

  const wisibleIngredients = ingredientsOrder.slice(0, 6);
  let count = 0;
  ingredientsOrder.length > 6
    ? (count = ingredientsOrder.length - 6)
    : (count = 0);

  return (
    <Link
      className={styleCard.card}
      to={{
        pathname: `/feed/${number}`,
        state: { background: location },
      }}
    >
      <div className={styleCard.cardHeader}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(date)} /> i-GMT+3
        </p>
      </div>
      <h3 className="text text_type_main-medium">{order.name}</h3>
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
    </Link>
  );
}

export default CardFeed;