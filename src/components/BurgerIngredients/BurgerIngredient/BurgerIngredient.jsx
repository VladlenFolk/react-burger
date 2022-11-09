import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyle from "./BurgerIngredient.module.css";
import { useContext, useState } from "react";
import Modal from "../../Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import { IngredientContext } from "../../../services/ingredientsContext";
import { ingredientType } from "../../../utils/types";

const BurgerIngredient = ({ count, image, price, ingredient, id }) => {
  const ingredients = useContext(IngredientContext);

  const onClickImage = (e) => {
    setIngredientId(e.target.id);
    setModalActive(true);
  };

  const [ingredientId, setIngredientId] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  //Получаем массив с данными ингридиента, по которому кликнули
  const selectedIngredient = ingredients.find(
    (item) => item._id === ingredientId
  );

  return (
    <>
      <div className={burgerStyle.ingredientsComponent}>
        {/* count будет вычисляться */}
        <Counter count={count} size="default" />
        <img
          className={burgerStyle.image}
          src={image}
          onClick={onClickImage}
          alt={ingredient}
          id={id}
        ></img>
        <div className={burgerStyle.price}>
          <p className="text text_type_digits-default mr-2"> {price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-2">{ingredient}</p>
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

BurgerIngredient.propTypes = ingredientType;
