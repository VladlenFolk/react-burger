import style from "./IngridientDetails.module.css";
import PropTypes from "prop-types";

const IngridientDetails = ({ data, ingridientOpen, ingridientId }) => {
  const currentId = data.filter((current) => {
    return current._id === ingridientId;
  })[0];

  if (ingridientOpen) {
    return (
      <>
        <div className={style.header}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
        </div>
        {data !== undefined && (
          <>
            <img
              src={currentId.image_large}
              alt={currentId.name}
              className={style.image}
            />
            <div className={style.description}>
              <p className="text text_type_main-medium">{currentId.name}</p>
            </div>
            <div className={style.energy}>
              <div className={style.consistence}>
                <p className={style.consisText}>Калории,ккал</p>
                <p className="text text_type_digits-default">
                  {currentId.calories}
                </p>
              </div>
              <div className={style.consistence}>
                <p className={style.consisText}>Белки, г</p>
                <p className="text text_type_digits-default">
                  {currentId.proteins}{" "}
                </p>
              </div>
              <div className={style.consistence}>
                <p className={style.consisText}>Жиры, г</p>
                <p className="text text_type_digits-default">{currentId.fat}</p>
              </div>
              <div className={style.consistence}>
                <p className={style.consisText}>Углеводы, г</p>
                <p className="text text_type_digits-default">
                  {currentId.carbohydrates}
                </p>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
};

export default IngridientDetails;

IngridientDetails.propTypes = {
  data: PropTypes.array.isRequired,
  ingridientOpen: PropTypes.bool.isRequired,
  ingridientId: PropTypes.string.isRequired,
};