import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyle from "./BurgerIngredientLarge.module.css";
import { useDrag } from "react-dnd/dist/hooks";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../../../types/types";

type TIngredientBurger = {
  count: number;
  item: TIngredient;
  id: string;
};

const BurgerIngredientLarge: React.FC<TIngredientBurger> = ({ count, item, id }) => {
  const location = useLocation();
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

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
        </div>
      </Link>
    </div>
  );
};
export default BurgerIngredientLarge;
