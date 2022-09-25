import style from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

const ingredientDetails = ({ selectedIngredient }) => {
  return (
    <>
      <img
        src={selectedIngredient.image_large}
        alt={selectedIngredient.name}
        className={style.image}
      />
      <div className={style.description}>
        <p className="text text_type_main-medium">{selectedIngredient.name}</p>
      </div>
      <div className={style.energy}>
        <div className={style.consistence}>
          <p className={style.consisText}>Калории,ккал</p>
          <p className="text text_type_digits-default">
            {selectedIngredient.calories}
          </p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Белки, г</p>
          <p className="text text_type_digits-default">
            {selectedIngredient.proteins}{" "}
          </p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Жиры, г</p>
          <p className="text text_type_digits-default">
            {selectedIngredient.fat}
          </p>
        </div>
        <div className={style.consistence}>
          <p className={style.consisText}>Углеводы, г</p>
          <p className="text text_type_digits-default">
            {selectedIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
};
export default ingredientDetails;

ingredientDetails.propTypes = {
  selectedIngredient: PropTypes.shape({
    proteins: PropTypes.number,
    _id: PropTypes.string,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
  }).isRequired,
};