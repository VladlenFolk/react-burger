import { useAppSelector } from "../../../hooks/typesHooks";
import burgerStyle from "./BurgerIngredient.module.css";
import { TIngredient } from "../../../types/types";
import BurgerIngredientSmall from "./BurgerIngredientSmall/BurgerIngredientSmall";
import BurgerIngredientLarge from "./BurgerIngredientLarge/BurgerIngredientLarge";
import { useDispatch } from "react-redux";
import { addItem } from "../../../utils/functions";

type TIngredientBurger = {
  count: number;
  item: TIngredient;
  id: string;
};

const BurgerIngredient: React.FC<TIngredientBurger> = ({ count, item, id }) => {
  const { windowSize } = useAppSelector((state) => state.utils);
  const dispatch = useDispatch();
  const add = () => {
    addItem(item, dispatch);
  };
  return (
    <div className={burgerStyle.container}>
      {windowSize > 1060 ? (
        <BurgerIngredientLarge count={count} item={item} id={id} />
      ) : (
        <BurgerIngredientSmall count={count} item={item} id={id} />
      )}
      <p
        className={`${"text text_type_secondary-default"} ${burgerStyle.add}`}
        onClick={add}
      >
        Добавить
      </p>
    </div>
  );
};
export default BurgerIngredient;
