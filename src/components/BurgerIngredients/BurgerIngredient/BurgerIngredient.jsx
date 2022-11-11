import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyle from "./BurgerIngredient.module.css";
import { useCallback } from "react";
import { useDrag } from "react-dnd/dist/hooks";
import {
  GET_INGREDIENT_INFO,
} from "../../../services/actions/ingredientInfo";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ingredientType } from "../../../utils/types";

const BurgerIngredient = ({ count, item, open }) => {
  const dispatch = useDispatch();
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const onClickImage = useCallback(() => {
    dispatch({ type: GET_INGREDIENT_INFO, item });
    open()
  }, [dispatch, item]);

  return (
    <>
      <div
        className={burgerStyle.ingredientsComponent}
        style={{ opacity }}
        draggable={true}
        ref={dragRef}
        onClick={onClickImage}
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
      </div>
    </>
  );
};
export default BurgerIngredient;
BurgerIngredient.propTypes = {
  count: PropTypes.number,
  item: ingredientType,
};