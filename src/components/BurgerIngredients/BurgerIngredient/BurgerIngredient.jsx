import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyle from "./BurgerIngredient.module.css";
import { useState, useCallback } from "react";
import Modal from "../../Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd/dist/hooks";
import {
  GET_INGREDIENT_INFO,
  DELETE_INGREDIENT_INFO,
} from "../../../services/actions/ingredientInfo";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ingredientType } from "../../../utils/types";

const BurgerIngredient = ({ count, item }) => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);
  const ingredient = useSelector((state) => state.ingredientInfo.item);
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const onClickImage = useCallback(() => {
    dispatch({ type: GET_INGREDIENT_INFO, item });
    setModalActive(true);
  }, [dispatch, item]);

  // Функция закрытия модального окна
  function onClose() {
    setModalActive(false);
    dispatch({ type: DELETE_INGREDIENT_INFO });
  }

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
      {modalActive && ingredient && (
        <Modal title={"Детали ингредиента"} onClose={onClose}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
export default BurgerIngredient;
BurgerIngredient.propTypes = {
  count: PropTypes.number,
  item: ingredientType,
};
