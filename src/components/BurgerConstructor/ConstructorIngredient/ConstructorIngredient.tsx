import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from "./ConstructorIngredient.module.css";
import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import { useDrag } from "react-dnd";
import { useAppDispatch } from "../../../hooks/typesHooks";
import { useRef } from "react";
import { deleteIngredient, sortIngredients } from "../../../services/reduxToolkit/constructorSlice";
import { TIngredient, TOtherIngredient } from "../../../types/types";

type TConstructorType = {
  text: string,
  price: number,
  thumbnail: string,
  id?: number,
  ingredient: TOtherIngredient,
  index: number,
  type?: string
}

const ConstructorIngredient: React.FC<TConstructorType> = ({
  text,
  price,
  thumbnail,
  ingredient,
  index,
  id,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);
  //удаление ингредиента конструктора
  const deletItem = (item:TOtherIngredient) => {
    dispatch(deleteIngredient(item));
  };
// console.log(index);

  const [, drop] = useDrop({
    accept: "container",
    hover(item: TIngredient) {
      if (!ref.current) {
        return;
      }
      if (item.index === index){ return}
      const dragIndex = item?.index;
      const hoverIndex = index;
      console.log(dragIndex);
      
      if (dragIndex) dispatch(sortIngredients({ dragIndex, hoverIndex }),
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
          handleClose={() => deletItem(ingredient)}
        />
      </div>
    </li>
  );
};

export default ConstructorIngredient;