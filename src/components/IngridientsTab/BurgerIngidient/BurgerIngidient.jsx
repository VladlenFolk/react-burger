import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyle from "./BurgerIngidient.module.css";
import PropTypes from "prop-types";

const BurgerIngredient = ({
  count,
  image,
  price,
  ingridient,
  setingridientId,
  setOpen,
  openModal,
  id,
  setAnimate,
}) => {
  //Открываем модалку ингридиента по клику на картинку
  const onClickImage = (e) => {
    setingridientId(e.target.id);
    setOpen(true);
    openModal(true);
    setAnimate(true);
  };

  return (
    <div className={burgerStyle.ingridientsComponent}>
      {/* count будет вычисляться */}
      <Counter count={count} size="default" />
      <img
        className={burgerStyle.image}
        src={image}
        onClick={onClickImage}
        alt={ingridient}
        id={id}
      ></img>
      <div className={burgerStyle.price}>
        <p className="text text_type_digits-default mr-2"> {price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-2">{ingridient}</p>
    </div>
  );
};
export default BurgerIngredient;

BurgerIngredient.propTypes = {
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  ingridient: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  setingridientId: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  setAnimate: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};