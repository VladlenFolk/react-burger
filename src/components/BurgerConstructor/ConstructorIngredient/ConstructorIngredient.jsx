import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from "./ConstructorIngredient.module.css";

const ConstructorIngredient = ({ text, price, thumbnail }) => {
  return (
    <li className={constructorStyle.elementList}>
      <DragIcon type="primary" />
      <ConstructorElement text={text} price={price} thumbnail={thumbnail} />
    </li>
  );
};

export default ConstructorIngredient;

ConstructorIngredient.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
