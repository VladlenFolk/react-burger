import style from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

const ingredientDetails = ({ data, ingredientOpen, ingredientId }) => {
const currentIngredient = data.filter(current => current._id === ingredientId)[0];

  if (ingredientOpen) {
    return (
      <>
        <div className={style.header}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
        </div>
        {data !== undefined && (
          <>
            <img
              src={currentIngredient.image_large}
              alt={currentIngredient.name}
              className={style.image}
            />
            <div className={style.description}>
              <p className="text text_type_main-medium">{currentIngredient.name}</p>
            </div>
            <div className={style.energy}>
              <div className={style.consistence}>
                <p className={style.consisText}>Калории,ккал</p>
                <p className="text text_type_digits-default">
                  {currentIngredient.calories}
                </p>
              </div>
              <div className={style.consistence}>
                <p className={style.consisText}>Белки, г</p>
                <p className="text text_type_digits-default">
                  {currentIngredient.proteins}{" "}
                </p>
              </div>
              <div className={style.consistence}>
                <p className={style.consisText}>Жиры, г</p>
                <p className="text text_type_digits-default">{currentIngredient.fat}</p>
              </div>
              <div className={style.consistence}>
                <p className={style.consisText}>Углеводы, г</p>
                <p className="text text_type_digits-default">
                  {currentIngredient.carbohydrates}
                </p>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
};
export default ingredientDetails;

ingredientDetails.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    proteins: PropTypes.number,
    _id: PropTypes.string,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
  })).isRequired,
    ingredientId: PropTypes.string.isRequired,
    ingredientOpen: PropTypes.bool.isRequired
};