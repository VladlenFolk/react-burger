import { useAppSelector } from "../../../hooks/typesHooks";
import burgerStyle from "./BurgerIngredient.module.css";
import { TIngredient } from "../../../types/types";
import BurgerIngredientSmall from "./BurgerIngredientSmall/BurgerIngredientSmall";
import BurgerIngredientLarge from "./BurgerIngredientLarge/BurgerIngredientLarge";

type TIngredientBurger = {
  count: number;
  item: TIngredient;
  id: string;
};

const BurgerIngredient: React.FC<TIngredientBurger> = ({ count, item, id }) => {
  const { windowSize } = useAppSelector((state) => state.windowSlice);
  return (
    <div className={burgerStyle.container}>
      <div className={burgerStyle.cover}></div>
      {windowSize > 1060 ? <BurgerIngredientLarge count={count} item={item} id={id}/> : <BurgerIngredientSmall count={count} item={item} id={id}/>}
    </div>
  );
};
export default BurgerIngredient;
