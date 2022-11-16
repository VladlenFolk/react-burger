import style from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const item = useSelector((state) => state.ingredientInfo.item);
  return (
    <>
      <img src={item.image_large} alt={item.name} className={style.image} />
      <div className={style.description}>
        <p className="text text_type_main-medium">{item.name}</p>
      </div>
      <div className={style.energy}>
        <div className={style.consistence}>
          <p className={style.consisText}>Калории,ккал</p>
          <p className="text text_type_digits-default">{item.calories}</p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Белки, г</p>
          <p className="text text_type_digits-default">{item.proteins} </p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Жиры, г</p>
          <p className="text text_type_digits-default">{item.fat}</p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Углеводы, г</p>
          <p className="text text_type_digits-default">{item.carbohydrates}</p>
        </div>
      </div>
    </>
  );
};
export default IngredientDetails;