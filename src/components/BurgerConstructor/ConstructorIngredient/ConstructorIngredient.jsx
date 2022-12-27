import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from "./ConstructorIngredient.module.css";
import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { ingredientType } from "../../../utils/types";
import { deleteIngredient, sortIngredients } from "../../../services/reduxToolkit/constructorSlice";

const ConstructorIngredient = ({
  text,
  price,
  thumbnail,
  ingredient,
  index,
  id,
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  //удаление ингредиента конструктора
  const deletItem = (item) => {
    dispatch(deleteIngredient(item));
  };

  const [, drop] = useDrop({
    accept: "container",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      dispatch(sortIngredients({ dragIndex, hoverIndex }),
      );
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: "container",
    item: { id, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });

  drag(drop(ref));

  return (
    <li
      className={constructorStyle.elementList}
      style={{ opacity }}
      draggable={true}
      ref={ref}
    >
      <div className={constructorStyle.wrapper}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={text}
          price={price}
          thumbnail={thumbnail}
          handleClose={() => deletItem(ingredient, ingredient.id)}
        />
      </div>
    </li>
  );
};

export default ConstructorIngredient;

ConstructorIngredient.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.number,
  ingredient: ingredientType,
  index: PropTypes.number.isRequired,
};