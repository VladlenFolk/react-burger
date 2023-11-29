import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyle from "./BurgerIngredientSmall.module.css";
import { TIngredient } from "../../../../types/types";
import { useAppDispatch } from "../../../../hooks/typesHooks";
import { addItem } from "../../../../utils/functions";

type TIngredientBurger = {
  count: number;
  item: TIngredient;
  id: string;
};

const BurgerIngredientSmall: React.FC<TIngredientBurger> = ({
  count,
  item,
}) => {

  const dispatch = useAppDispatch();
  const add = () =>{
    addItem(item, dispatch)
  }

  return (
    <div className={burgerStyle.container}>
      <div className={burgerStyle.cover}></div>
      <div
        className={burgerStyle.ingredientsComponentMin}
        onClick={add}
      >
        {count > 0 && <Counter count={count} size="small" />}
        <img className={burgerStyle.image} src={item.image_mobile} alt={item.name}></img>
        <div className={burgerStyle.price}>
          <p className="text text_type_digits-default mr-2"> {item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-2">{item.name}</p>
      </div>
    </div>
  );
};
export default BurgerIngredientSmall;
