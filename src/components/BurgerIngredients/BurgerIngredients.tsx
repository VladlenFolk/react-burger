import { useRef, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import burgerStyle from "./BurgerIngredients.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/typesHooks";
import { bunsAmount } from "../../utils/constants";
import { chooseBun, chooseMain, chooseSauce } from "../../services/reduxToolkit/tabSlice";

interface ICounter {
  [id: string]: number; 
} 

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const ingredientType = useAppSelector((state) => state.tab.tab);
  // Активация для табов
  const setBun = () => {
    dispatch(chooseBun());
  };
  const setMain = () => {
    dispatch(chooseMain());
  };
  const setSauce = () => {
    dispatch(chooseSauce());
  };

  //получаем ингридиенты из стора
  const {  ingredients } = useAppSelector((state) => state.ingredientsSlice);

  //Фильтруем элементы, делаем массивы по типу
  const sauces = useMemo(() => {
    return ingredients.filter((current) => {
      return current.type === "sauce";
    });
  }, [ingredients]);

  const buns = useMemo(() => {
    return ingredients.filter((current) => {
      return current.type === "bun";
    });
  }, [ingredients]);

  const mains = useMemo(() => {
    return ingredients.filter((current) => {
      return current.type === "main";
    });
  }, [ingredients]);

  // нахожу якоря для скрола в DOM
  const bun = useRef<HTMLHeadingElement>(null);
  const sauce = useRef<HTMLHeadingElement>(null);
  const main = useRef<HTMLHeadingElement>(null);

  // функции для переключения по якорям на клавиши "таба"
  const goToBuns = () => bun.current?.scrollIntoView({ behavior: "smooth" });
  const goToSauce = () => sauce.current?.scrollIntoView({ behavior: "smooth" });
  const goToMain = () => main.current?.scrollIntoView({ behavior: "smooth" });

  //получаю координаты списков и активирую таб с помощью вычислений относительно меню табов
  function getPoints() {
    const menu = document.getElementById("menu")!.getBoundingClientRect().top;
    const bunSection = document
      .getElementById("bunsList")!
      .getBoundingClientRect().top;
    const sauceSection = document
      .getElementById("sauceList")!
      .getBoundingClientRect().top;
    const mainSection = document
      .getElementById("mainList")!
      .getBoundingClientRect().top;
    Math.abs(menu - bunSection) < Math.abs(menu - sauceSection)
      ? setBun()
      : Math.abs(menu - sauceSection) > Math.abs(menu - mainSection)
      ? setMain()
      : setSauce();
  }

  const burger = useAppSelector((state) => state.constructorSlice);
  const counterIngredients = useMemo(() => {
    const { bun, otherIngredients } = burger;
    
    
    const counters: ICounter = {};
    otherIngredients?.forEach((otherIngredient) => {
      if (!counters[otherIngredient.item._id])
        counters[otherIngredient.item._id] = 0;
      counters[otherIngredient.item._id] += 1;
    });
    if (bun) counters[bun._id] = bunsAmount;
    return counters;
  }, [burger]);

  return (
    <>
      <section className={burgerStyle.burgerIngredirnets}>
        <div id="menu" className={burgerStyle.tabs}>
          <Tab value="one" active={ingredientType === "one"} onClick={goToBuns}>
            Булки
          </Tab>
          <Tab
            value="two"
            active={ingredientType === "two"}
            onClick={goToSauce}
          >
            Соусы
          </Tab>
          <Tab
            value="three"
            active={ingredientType === "three"}
            onClick={goToMain}
          >
            Начинки
          </Tab>
        </div>
        <div onScroll={getPoints} className={burgerStyle.scroll}>
        <div className={burgerStyle.sauce}>
          <h2 className="text text_type_main-medium mb-1" ref={bun}>
            Булки
          </h2>
          </div>
          <div id="bunsList" className={burgerStyle.ingredientComposition}>
            {buns.map((bun) => (
              <BurgerIngredient
                key={bun._id}
                id={bun._id}
                item={bun}
                count={counterIngredients[bun._id]}
              />
            ))}
          </div>
          <div className={burgerStyle.sauce}>
          <h2 className="text text_type_main-medium mt-10 mb-6" ref={sauce}>
            Соусы
          </h2>
          </div>
          <div id="sauceList" className={burgerStyle.ingredientComposition}>
            {sauces.map((sauce) => (
              <BurgerIngredient
                key={sauce._id}
                id={sauce._id}
                item={sauce}
                count={counterIngredients[sauce._id]}
              />
            ))}
          </div>
          <div className={burgerStyle.sauce}>
          <h2 className="text text_type_main-medium mt-10 mb-6" ref={main}>
            Начинки
          </h2>
          </div>
          <div id="mainList" className={burgerStyle.ingredientComposition}>
            {mains.map((main) => (
              <BurgerIngredient
                key={main._id}
                id={main._id}
                item={main}
                count={counterIngredients[main._id]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BurgerIngredients;