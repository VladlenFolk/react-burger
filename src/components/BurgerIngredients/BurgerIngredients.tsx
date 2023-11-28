import { useRef, useMemo, useEffect, useState } from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import burgerStyle from "./BurgerIngredients.module.css";
import { useAppSelector } from "../../hooks/typesHooks";
import { bunsAmount } from "../../utils/constants";

interface ICounter {
  [id: string]: number;
}

const BurgerIngredients = () => {

  // const window = useAppSelector((state) => state.windowSlice.windowSize);
  const [tab, setTab] = useState("1");

  // нахожу якоря для скрола в DOM
  const bun = useRef<HTMLHeadingElement>(null);
  const sauce = useRef<HTMLHeadingElement>(null);
  const main = useRef<HTMLHeadingElement>(null);
  const tabBun = useRef<HTMLDivElement>(null);
  const tabSauce = useRef<HTMLDivElement>(null);
  const tabMain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // Условие для проверки ширины окна
      if (windowWidth < 1060) {
        // Примените стили при ширине окна менее 1060px
        bun.current!.style.pointerEvents = "none";
        sauce.current!.style.pointerEvents = "none";
        sauce.current!.style.pointerEvents = "none";
      }
    };
    window.addEventListener("resize", handleResize);
    // Вызовите handleResize сразу после монтирования компонента
    handleResize();
    // Очистите обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //получаем ингридиенты из стора
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);

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

  //Функции перехода к элементам
  const handleBunClick = () => {
    setTab("1");
      bun.current!.scrollIntoView({ behavior: "smooth" });
  };

  const handleSauceClick = () => {
    setTab("2");
      sauce.current!.scrollIntoView({ behavior: "smooth" });
  };

  const handleMainClick = () => {
    setTab("3");
      main.current!.scrollIntoView({ behavior: "smooth" });
  };

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
      ? setTab('1')
      : Math.abs(menu - sauceSection) > Math.abs(menu - mainSection)
      ? setTab('3')
      : setTab('2');
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

  const bunTab =
    tab === "1" ? burgerStyle.tab_menu_type_current : burgerStyle.noselected;
  const sauceTab =
    tab === "2" ? burgerStyle.tab_menu_type_current : burgerStyle.noselected;
  const mainTab =
    tab === "3" ? burgerStyle.tab_menu_type_current : burgerStyle.noselected;


  return (
    <>
      <section className={burgerStyle.burgerIngredirnets}>
        <div id="menu" className={`${burgerStyle.tabs} ${bunTab}`}>
          <div
            className={`${burgerStyle.tab_menu} ${bunTab}`}
            onClick={handleBunClick}
            ref={tabBun}
          >
            <span className="text text_type_main-default">Булки</span>
          </div>
          <div
            className={`${burgerStyle.tab_menu} ${sauceTab}`}
            onClick={handleSauceClick}
            ref={tabSauce}
          >
            <span className="text text_type_main-default">Соусы</span>
          </div>
          <div
            className={`${burgerStyle.tab_menu} ${mainTab}`}
            onClick={handleMainClick}
            ref={tabMain}
          >
            <span className="text text_type_main-default">Начинки</span>
          </div>
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
