import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";
import burgerStyle from "./BurgerIngredientSmall.module.css";
import { TIngredient } from "../../../../types/types";
import {
  addBun,
  addOtherIngredient,
  countOpen,
} from "../../../../services/reduxToolkit/constructorSlice";
import { useAppDispatch } from "../../../../hooks/typesHooks";

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

  //Функция добавления перемещенного элемента
  const addItem = ( ) => {
    const ingredient = {
      item,
      id: nanoid(),
    };
    if (item.type === "bun") {
      dispatch(addBun(item));
      dispatch(countOpen());
    } else {
      dispatch(addOtherIngredient(ingredient));
      dispatch(countOpen());
    }
  };

  return (
    <div className={burgerStyle.container}>
      <div className={burgerStyle.cover}></div>
      <div
        className={burgerStyle.ingredientsComponentMin}
        onClick={addItem}
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
