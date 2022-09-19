import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from "./ConstructorIngridient.module.css";

const ConstructorIngridient = ({ text, price, thumbnail }) => {
  return (
    <li className={constructorStyle.elementList}>
      <DragIcon type="primary" />
      <ConstructorElement text={text} price={price} thumbnail={thumbnail} />
    </li>
  );
};

export default ConstructorIngridient;

ConstructorIngridient.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
