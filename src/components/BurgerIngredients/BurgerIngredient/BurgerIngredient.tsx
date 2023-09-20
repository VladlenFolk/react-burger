import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/typesHooks";
import burgerStyle from "./BurgerIngredient.module.css";
import { useDrag } from "react-dnd/dist/hooks";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../../types/types";
import { changedSize } from "../../../services/reduxToolkit/windowSlice";

type TIngredientBurger = {
  count: number;
  item: TIngredient;
  id: string
}

const BurgerIngredient: React.FC<TIngredientBurger> = ({ count, item, id }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const { windowSize } = useAppSelector(
    (state) => state.windowSlice
  );

  useEffect(()=>{
    if (windowSize === 0) {
      dispatch(changedSize(window.innerWidth))
    }
  })

  const handleResize = useCallback(() => {
    dispatch(changedSize(window.innerWidth));
  }, [dispatch]);

  useEffect(()=>{
    window.addEventListener('resize', handleResize, );
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

 console.log(windowSize);
 
  
  return (
    <>
      <Link
        to={{ pathname: `/ingredient/${id}`, state: { background: location } }}
        className={burgerStyle.ingredientsComponent}
        style={{ opacity }}
        draggable={true}
        ref={dragRef}
      >
        {count > 0 && <Counter count={count} size="default" />}
        <img
          className={burgerStyle.image}
          src={item.image}
          alt={item.name}
        ></img>
        <div className={burgerStyle.price}>
          <p className="text text_type_digits-default mr-2"> {item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-2">{item.name}</p>
      </Link>
    </>
  );
};
export default BurgerIngredient;