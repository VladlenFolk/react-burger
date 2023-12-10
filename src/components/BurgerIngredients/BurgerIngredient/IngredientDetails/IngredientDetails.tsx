import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./IngredientDetails.module.css";
import { useAppSelector } from "../../../../hooks/typesHooks";
import { useParams } from "react-router-dom";
import { TIngredient, TParams } from "../../../../types/types";

type TModal = {
  onClose: () => void;
};

const IngredientDetails: React.FC<TModal> = ({ onClose }) => {
  const { idCard } = useParams<TParams>();
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);
  const ingredient = ingredients.find(
    (ingredient) => ingredient._id === idCard
  );
  console.log(ingredient);

  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingredient as TIngredient;

  return (
    <div className={style.container}>
      <div className={style.closeWrapper}>
        <CloseIcon type="primary" onClick={onClose} />
      </div>
      <div className={style.contentWrapper}>
        <div className={style.imageContainer}>
          <img src={image_large} alt={name} className={style.imageMobile} />
        </div>
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
      </div>
    </div>
  );
};
export default IngredientDetails;
