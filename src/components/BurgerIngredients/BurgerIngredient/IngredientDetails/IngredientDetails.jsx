import style from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
  const { idCard } = useParams();
  const { ingredients } = useSelector((state) => state.ingredientsSlice);
  const ingredient = ingredients.find(
    (ingredient) => ingredient._id === idCard
  );
  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingredient;

  return (
    <>
      <img src={image_large} alt={name} className={style.image} />
      <div className={style.description}>
        <p className="text text_type_main-medium">{name}</p>
      </div>
      <div className={style.energy}>
        <div className={style.consistence}>
          <p className={style.consisText}>Калории,ккал</p>
          <p className="text text_type_digits-default">{calories}</p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Белки, г</p>
          <p className="text text_type_digits-default">{proteins} </p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Жиры, г</p>
          <p className="text text_type_digits-default">{fat}</p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Углеводы, г</p>
          <p className="text text_type_digits-default">{carbohydrates}</p>
        </div>
      </div>
    </>
  );
};
export default IngredientDetails;