import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyle from "./BurgerIngredient.module.css";
import { useDrag } from "react-dnd/dist/hooks";
import PropTypes from "prop-types";
import { ingredientType } from "../../../utils/types";
import { Link, useLocation } from "react-router-dom";

const BurgerIngredient = ({ count, item, id }) => {
  const location = useLocation();
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <>
      <Link
        to={{ pathname: `/ingredient/${id}`, state: { background: location } }}
        className={burgerStyle.ingredientsComponent}
        style={{ opacity }}
        draggable={true}
        ref={dragRef}
      >
        {count > 0 && <Counter count={count} size="default" />}
        <img
          className={burgerStyle.image}
          src={item.image}
          alt={item.name}
        ></img>
        <div className={burgerStyle.price}>
          <p className="text text_type_digits-default mr-2"> {item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-2">{item.name}</p>
      </Link>
    </>
  );
};
export default BurgerIngredient;
BurgerIngredient.propTypes = {
  count: PropTypes.number,
  item: ingredientType,
};