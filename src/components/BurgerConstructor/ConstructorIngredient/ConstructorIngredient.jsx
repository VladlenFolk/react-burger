import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from "./ConstructorIngredient.module.css";
import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  SORT_INGREDIENTS,
} from "../../../services/actions/constructor";
import { useRef } from "react";

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
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      ...item,
    });
  };

  const [, drop] = useDrop({
    accept: "container",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      dispatch({
        type: SORT_INGREDIENTS,
        data: { dragIndex, hoverIndex },
      });
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
};
