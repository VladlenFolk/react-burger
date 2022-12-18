import style from "./IngredientCard.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IngredientCard = () => {
  const { idCard } = useParams();
  const { ingredients } = useSelector((state) => state.ingredients);
  const ingredient =
    ingredients.length &&
    ingredients.find((ingredient) => ingredient._id === idCard);

  return (
    <div className={style.container}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={style.image}
      />
      <div className={style.description}>
        <p className="text text_type_main-medium">{ingredient.name}</p>
      </div>
      <div className={style.energy}>
        <div className={style.consistence}>
          <p className={style.consisText}>Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Белки, г</p>
          <p className="text text_type_digits-default">
            {ingredient.proteins}{" "}
          </p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Углеводы, г</p>
          <p className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};
export default IngredientCard;