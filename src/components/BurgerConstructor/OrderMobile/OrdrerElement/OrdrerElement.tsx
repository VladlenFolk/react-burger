import {
  DragIcon,
  CurrencyIcon,
  DeleteIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState, useRef, TouchEvent, useEffect } from "react";
import orderElement from "./OrdrerElement.module.css";
import { TOtherIngredient } from "../../../../types/types";
import { useAppDispatch } from "../../../../hooks/typesHooks";
import { deleteIngredient } from "../../../../services/reduxToolkit/constructorSlice";

type TConstructorType = {
  text: string;
  price: number;
  src: string;
  id?: string;
  ingredient: TOtherIngredient;
  index: number;
  type?: string;
  key?: string;
};

const OrderElement: FC<TConstructorType> = ({
  src,
  text,
  price,
  ingredient,
}) => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleMouseDown = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleMouseUp = (e: TouchEvent) => {
    setEndX(e.changedTouches[0].clientX);
  };

  useEffect(() => {
    let point = endX - startX;
    if (point < -50) setDeleteVisible(true);
    if (point > 50) setDeleteVisible(false);
  }, [endX]);

  const deletItem = () => {
    dispatch(deleteIngredient(ingredient));
  };





  const ingredientStile = isDeleteVisible
    ? `${orderElement.container} ${orderElement.сontainerDelete}`
    : `${orderElement.container}`;
  return (
    <div
      className={orderElement.wrapper}
      ref={scrollableContainerRef}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <section
        className={ingredientStile}

      >
        <div className={orderElement.ingredientContainer}>
          <div className={orderElement.drag}>
            <DragIcon type="primary" />
          </div>
          <div className={orderElement.shadov}>
            <div className={orderElement.imgContainer}>
              <img className={orderElement.image} src={src} alt={text} />
            </div>
            <p className={orderElement.text}>{text}</p>
            <div className={orderElement.price}>
              <p className="text text_type_digits-small mr-2"> {price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </section>
      <div className={orderElement.delete} onClick={deletItem}>
        <DeleteIcon type={"primary"} />
      </div>
    </div>
  );
};

export default OrderElement;
