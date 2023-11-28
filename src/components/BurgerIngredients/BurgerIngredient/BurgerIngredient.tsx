import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";
import { useAppSelector } from "../../../hooks/typesHooks";
import burgerStyle from "./BurgerIngredient.module.css";
import { useDrag } from "react-dnd/dist/hooks";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../../types/types";
import { addBun, addOtherIngredient, countOpen } from "../../../services/reduxToolkit/constructorSlice";
import { useAppDispatch } from "../../../hooks/typesHooks";

type TIngredientBurger = {
  count: number;
  item: TIngredient;
  id: string;
};

const BurgerIngredient: React.FC<TIngredientBurger> = ({ count, item, id }) => {
  const location = useLocation();
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const { windowSize } = useAppSelector((state) => state.windowSlice);
 
  let src = windowSize > 900 ? item.image : item.image_mobile;
  const dispatch = useAppDispatch();
 //Функция добавления перемещенного элемента
 const addItem = (item: TIngredient) => {
  const ingredient = {
    item,
    id: nanoid(),
  };
  if (item.type === "bun") {
    dispatch(addBun(item));
    dispatch(countOpen())
  } else {
    dispatch(addOtherIngredient(ingredient));
    dispatch(countOpen())
  }
};


  return (
    <div className={burgerStyle.container}>
      <div className={burgerStyle.cover}></div>
      <Link
        to={{ pathname: `/ingredient/${id}`, state: { background: location } }}
        className={burgerStyle.ingredientsComponent}
        style={{ opacity }}
        draggable={true}
        ref={dragRef}
      >
        <div className={burgerStyle.ingredientsComponent}>
          {count > 0 && <Counter count={count} size="default" />}
          <img className={burgerStyle.image} src={src} alt={item.name}></img>
          <div className={burgerStyle.price}>
            <p className="text text_type_digits-default mr-2"> {item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-default mt-2">{item.name}</p>
        </div>
      </Link>
      <div className={burgerStyle.ingredientsComponentMin} onClick={()=>addItem(item)}>
        {count > 0 && <Counter count={count} size="small" />}
        <img className={burgerStyle.image} src={src} alt={item.name}></img>
        <div className={burgerStyle.price}>
          <p className="text text_type_digits-default mr-2"> {item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-2">{item.name}</p>
        <p className={`${"text text_type_secondary-default"} ${burgerStyle.add}`}>
        {"Добавить"}
        </p>
      </div>
    </div>
  );
};
export default BurgerIngredient;
