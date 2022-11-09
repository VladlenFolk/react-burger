import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyle from "./BurgerIngredient.module.css";
import { useState, useMemo } from "react";
import Modal from "../../Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
// import { ingredientType } from "../../../utils/types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd/dist/hooks";
import { DELETE_CONSTRUCTOR_INGREDIENT } from "../../../services/actions/constructor";
import { useDispatch } from "react-redux";
const BurgerIngredient = ({ count, item }) => {
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const { ingredients } = useSelector((state) => state.ingredients);
 
  const onClickImage = () => {
    // setIngredientId(e.target.id);
    setModalActive(true);
  };


  const [modalActive, setModalActive] = useState(false);
  //Получаем массив с данными ингридиента, по которому кликнули
  const selectedIngredient = useMemo(() => {
    return ingredients.find((el) => el._id === item._id);
  }, [ingredients]);
  


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
      {modalActive && (
        <Modal onClose={setModalActive} title={"Детали ингредиента"}>
          <IngredientDetails selectedIngredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
};
export default BurgerIngredient;

// BurgerIngredient.propTypes = ingredientType;
