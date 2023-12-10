import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyle from "./BurgerIngredientSmall.module.css";
import { TIngredient } from "../../../../types/types";
import { Link, useLocation } from "react-router-dom";


type TIngredientBurger = {
  count: number;
  item: TIngredient;
  id: string;
};

const BurgerIngredientSmall: React.FC<TIngredientBurger> = ({
  count,
  item,
  id
}) => {
  const location = useLocation();
  
  return (
    <div className={burgerStyle.container}>
      <Link
      to={{ pathname: `/ingredient/${id}`, state: { background: location } }}
        className={burgerStyle.ingredientsComponentMin}
      >
        {count > 0 && <Counter count={count} size="small" />}
        <img className={burgerStyle.image} src={item.image_mobile} alt={item.name}></img>
        <div className={burgerStyle.price}>
          <p className="text text_type_digits-default mr-2"> {item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-2">{item.name}</p>
      </Link>
    </div>
  );
};
export default BurgerIngredientSmall;
